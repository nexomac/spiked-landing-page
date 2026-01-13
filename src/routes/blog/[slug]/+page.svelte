<script>
	import { generateHTML } from "@tiptap/html";
	import StarterKit from "@tiptap/starter-kit";
	import Image from "@tiptap/extension-image";
	import Link from "@tiptap/extension-link";
	import ShareButton from "$lib/components/ShareButton.svelte";
	import VoicePlayer from "$lib/components/VoicePlayer.svelte";
	import { themeStore } from "$lib/stores/theme.js";
	import { Download, FileText } from "lucide-svelte";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	let html2pdf;
	onMount(async () => {
		try {
			const mod = await import("html2pdf.js");
			html2pdf = mod.default || mod;
			console.log("PDF library loaded successfully via import");
		} catch (e) {
			console.warn(
				"Failed to import html2pdf.js dynamically, checking window...",
				e,
			);
			if (window.html2pdf) {
				html2pdf = window.html2pdf;
				console.log("PDF library found on window object");
			} else {
				console.error(
					"html2pdf.js could not be loaded. Please ensure it is installed correctly.",
				);
			}
		}
	});

	let { data } = $props();

	// Helper to generate HTML for a specific field data
	function getFieldHtml(fieldData) {
		try {
			if (
				fieldData &&
				typeof fieldData === "object" &&
				fieldData.type === "doc"
			) {
				return generateHTML(fieldData, [StarterKit, Image, Link]);
			}
			return "";
		} catch (e) {
			console.error(e);
			return "";
		}
	}

	function extractTextFromTiptap(node) {
		if (!node) return "";
		if (node.type === "text") return node.text;
		if (node.type === "hardBreak") return "\n";
		if (node.content) {
			return node.content.map((child) => extractTextFromTiptap(child)).join("");
		}
		return "";
	}

	// Format date format: "Friday, December 12, 2025"
	let formattedDate = $derived(
		new Date(data.post.publishedDate || data.post.createdAt).toLocaleDateString(
			"en-US",
			{
				weekday: "long",
				month: "long",
				day: "numeric",
				year: "numeric",
			},
		),
	);

	const { Slug, ...rest } = data.post.data || {};

	// Calculate reading time
	let readingTime = $derived.by(() => {
		let textContent = "";

		// 1. Check new blocks
		if (data.post.content && Array.isArray(data.post.content)) {
			for (const b of data.post.content) {
				if (b.type === "text") textContent += b.data?.content + " ";
				if (b.type === "richtext" && b.data?.html)
					textContent += extractTextFromTiptap(b.data.html) + " ";
				if (b.type === "quote") textContent += b.data?.text + " ";
			}
		}

		// 2. Check legacy data
		if (data.post.data) {
			for (const [key, value] of Object.entries(data.post.data)) {
				if (
					[
						"title",
						"slug",
						"status",
						"coverImage",
						"author",
						"publishedDate",
					].includes(key)
				)
					continue;

				if (value && typeof value === "object" && value.type === "doc") {
					textContent += extractTextFromTiptap(value) + " ";
				} else if (
					typeof value === "string" &&
					!value.startsWith("data:image")
				) {
					textContent += value + " ";
				}
			}
		}

		if (!textContent.trim()) return "2 min read";
		const words = textContent.trim().split(/\s+/).length;
		const minutes = Math.ceil(words / 200);
		return `${minutes} min read`;
	});

	// Process blocks for rendering
	let contentBlocks = $derived.by(() => {
		// 0. New Editor "Content" Blocks
		if (
			data.post.content &&
			Array.isArray(data.post.content) &&
			data.post.content.length > 0
		) {
			return data.post.content
				.map((b) => {
					if (b.type === "header") {
						const level = b.data?.level || 2;
						return {
							id: b.id,
							type: "richtext",
							value: {
								type: "doc",
								content: [
									{
										type: "heading",
										attrs: { level },
										content: [{ type: "text", text: b.data?.text || "" }],
									},
								],
							},
						};
					}

					if (b.type === "text") {
						return {
							id: b.id,
							type: "string_fallback",
							value: b.data?.content || "",
						};
					}

					if (b.type === "richtext") {
						return {
							id: b.id,
							type: "richtext",
							value: b.data?.html,
						};
					}

					if (b.type === "quote") {
						return {
							id: b.id,
							type: "quote",
							value: b.data?.text || "",
							author: b.data?.author,
							authorUrl: b.data?.authorUrl,
						};
					}

					if (b.type === "statistics") {
						return {
							id: b.id,
							type: "statistic",
							value: `${b.data?.label || "Metric"}|${b.data?.value || "0"}`,
						};
					}

					if (b.type === "image") {
						return {
							id: b.id,
							type: "image",
							value: b.data?.url,
							name: b.data?.caption || "Image",
						};
					}

					return null;
				})
				.filter(Boolean);
		}

		// 1. Fallback to Legacy model fields or data object
		const blocks = [];
		const ignoredKeys = [
			"title",
			"slug",
			"status",
			"coverImage",
			"author",
			"publishedDate",
			"publishDate",
			"publish_date",
			"published_date",
			"date",
			"newsletters",
			"Cover Image",
			"Featured Image",
			"FeaturedImage",
			"featured-image",
			"Image",
			"image",
			"Thumbnail",
			"thumbnail",
		];
		const isIgnored = (k) =>
			ignoredKeys.some((ignored) => k.toLowerCase() === ignored.toLowerCase());
		const processed = new Set();

		if (data.modelFields) {
			for (const field of data.modelFields) {
				const val = data.post.data[field.slug] || data.post.data[field.name];
				if (val && !isIgnored(field.slug || field.name)) {
					blocks.push({
						id: `field-${field.slug || field.name}`,
						type: field.type,
						value: val,
						name: field.name,
						slug: field.slug,
					});
					processed.add(field.slug);
					if (field.name) processed.add(field.name);
				}
			}
		}

		if (data.post.data) {
			for (const [k, v] of Object.entries(data.post.data)) {
				if (
					!processed.has(k) &&
					!isIgnored(k) &&
					typeof v === "string" &&
					v.length > 0
				) {
					blocks.push({
						id: `fallback-${k}`,
						type: "string_fallback",
						value: v,
						name: k,
					});
				}
			}
		}
	});

	// --- MANUAL PDF PAGINATION LOGIC ---
	const MAX_LINES_PER_PAGE = 22; // Calibrated for A4 with current styling

	function estimateWeight(block) {
		const node =
			block.type === "richtext" || block.type === "richtext_atom"
				? block.value
				: null;

		if (node && node.type) {
			if (node.type === "heading") {
				if (node.attrs?.level === 2) return 2.2;
				if (node.attrs?.level === 3) return 1.5;
				return 0.8;
			}
			if (node.type === "blockquote") {
				const text = extractTextFromTiptap(node);
				// Calculate lines based on a narrower width (70 chars) and add exactly 1 line for padding
				const lines = text
					.split("\n")
					.reduce((acc, line) => acc + Math.max(1, line.length / 70), 0);
				return lines + 1.0;
			}
			if (node.type === "bulletList" || node.type === "orderedList") {
				const items = node.content?.length || 0;
				return items * 0.85;
			}
			if (node.type === "horizontalRule") return 0.7;
			if (node.type === "hardBreak") return 0.7;

			const text = extractTextFromTiptap(node);
			// If it's a paragraph node but has no text content, count it as one line
			if (node.type === "paragraph" && !text.trim()) return 0.5;

			// Split by newlines (from hardBreaks) and calculate weight per visual line
			const visualLines = text.split("\n");
			return visualLines.reduce(
				(acc, line) => acc + Math.max(1, line.length / 85),
				0,
			);
		}

		if (block.type === "quote") return 2.0;
		if (block.type === "image") return 8.0;
		if (block.type === "statistic") return 7.5;
		if (block.type === "highlight") return 2.0;
		if (block.type === "string_fallback") {
			return Math.max(1, block.value.length / 85);
		}
		return 2.0;
	}

	let pdfPages = $derived.by(() => {
		const atoms = [];
		// Flatten blocks into atomic units (e.g. splitting richtext into paragraphs if needed,
		// but for simplicity we'll keep them as blocks and just calculate their weights)
		for (const block of contentBlocks) {
			if (block.type === "richtext" && block.value?.content) {
				// Split Tiptap doc into individual top-level nodes for granular control
				for (const node of block.value.content) {
					const nodeWeight = estimateWeight({ type: "richtext", value: node });
					atoms.push({
						type: "richtext_atom",
						value: { type: "doc", content: [node] },
						weight: nodeWeight,
					});
				}
			} else {
				atoms.push({
					...block,
					weight: estimateWeight(block),
				});
			}
		}

		const pages = [];
		let currentPage = [];
		let currentWeight = 0;

		for (const atom of atoms) {
			if (
				currentWeight + atom.weight > MAX_LINES_PER_PAGE &&
				currentPage.length > 0
			) {
				pages.push(currentPage);
				currentPage = [atom];
				currentWeight = atom.weight;
			} else {
				currentPage.push(atom);
				currentWeight += atom.weight;
			}
		}
		if (currentPage.length > 0) pages.push(currentPage);
		return pages;
	});

	let isGeneratingPDF = $state(false);

	async function downloadPDF() {
		if (typeof window === "undefined") return;

		console.log("Download PDF triggered, html2pdf status:", !!html2pdf);
		if (!html2pdf) {
			console.error("html2pdf library not loaded yet.");
			alert(
				"The PDF generator is still loading. Please try again in a few seconds.",
			);
			return;
		}
		isGeneratingPDF = true;

		const element = document.getElementById("blog-pdf-template");
		if (!element) {
			console.error("PDF template element not found!");
			isGeneratingPDF = false;
			return;
		}

		console.log("Generating PDF for element:", element);

		const opt = {
			margin: 0, // Set to 0 to allow full-bleed background on cover page and internal margin management
			filename: `${data.post.slug || "spikedai-blog"}.pdf`,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: {
				scale: 2,
				useCORS: true,
				letterRendering: true,
				logging: true,
			},
			jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
			pagebreak: { mode: ["css"] }, // Using 'css' only for more predictable behavior with Tailwind 4
		};

		try {
			// CREATE A CLONE FOR CLEANING
			const clone = element.cloneNode(true);
			document.body.appendChild(clone);

			// MANUALLY CLEAN OKLCH COLORS
			// (Recursively find all elements and convert computed oklch to hex)
			const allElements = clone.querySelectorAll("*");
			[clone, ...allElements].forEach((el) => {
				const style = window.getComputedStyle(el);
				["color", "backgroundColor", "borderColor"].forEach((prop) => {
					const val = style[prop];
					if (val && val.includes("oklch")) {
						// Simple fallback: replace oklch with black or white or a generic red
						// since oklch parsing is complex, we just want to avoid the crash.
						if (prop === "color") el.style[prop] = "#1a1a1a";
						else if (prop === "backgroundColor") el.style[prop] = "transparent";
						else if (prop === "borderColor") el.style[prop] = "#e5e7eb";
					}
				});
				// Also specifically fix the logo and titles which we know use red
				if (
					el.classList.contains("logo-alt") ||
					el.classList.contains("pdf-title") ||
					el.classList.contains("logo-main")
				) {
					if (!el.style.color)
						el.style.color = el.classList.contains("logo-main")
							? "#ffffff"
							: "#dc2626";
				}
			});

			await html2pdf()
				.set(opt)
				.from(clone)
				.toPdf()
				.get("pdf")
				.then(function (pdf) {
					const totalPages = pdf.internal.getNumberOfPages();
					const pageWidth = pdf.internal.pageSize.getWidth();
					const pageHeight = pdf.internal.pageSize.getHeight();

					for (let i = 1; i <= totalPages; i++) {
						pdf.setPage(i);

						// Skip cover page for standardized header/footer
						if (i > 1) {
							// Header Text
							pdf.setFontSize(8);
							pdf.setTextColor(156, 163, 175); // Gray-400
							pdf.text("SpikedAI Intelligence Brief", 25, 12);

							// Truncate title if too long for header
							const displayTitle =
								data.post.title.length > 60
									? data.post.title.substring(0, 57) + "..."
									: data.post.title;
							pdf.text(displayTitle, pageWidth - 25, 12, { align: "right" });

							// Top Header Line
							pdf.setDrawColor(229, 231, 235); // #e5e7eb
							pdf.setLineWidth(0.2);
							pdf.line(25, 15, pageWidth - 25, 15);

							// Bottom Footer Line
							pdf.line(25, pageHeight - 15, pageWidth - 25, pageHeight - 15);

							// Footer Content
							pdf.text(
								"Source: spiked.ai/blog/" + data.post.slug,
								25,
								pageHeight - 10,
							);

							pdf.text(
								"Page " + i + " of " + totalPages,
								pageWidth - 25,
								pageHeight - 10,
								{ align: "right" },
							);
						}
					}
				})
				.save();
			console.log("PDF generation successful");
			document.body.removeChild(clone);
		} catch (error) {
			console.error("PDF Generation Error:", error);
		} finally {
			isGeneratingPDF = false;
		}
	}
</script>

{#snippet renderBlock(block)}
	{#if block.type === "richtext"}
		<div class="mb-10 theme-prose-colors">
			{@html getFieldHtml(block.value)}
		</div>
	{:else if block.type === "image" || (typeof block.value === "string" && (block.value.startsWith("data:image") || block.value.match(/\.(jpeg|jpg|gif|png|webp)$/i)))}
		<div
			class="mb-10 border-2 p-1 transition-colors
            {$themeStore === 'dark'
				? 'bg-[#0f0f0f] border-red-900/30'
				: 'bg-gray-100 border-black'}"
		>
			<img
				src={block.value}
				alt={block.name}
				class="w-full h-auto grayscale contrast-125 block hover:grayscale-0 transition-all"
			/>
		</div>
	{:else if block.type === "quote"}
		<div
			class="my-10 p-10 border-l-[6px] border-red-600 transition-colors text-left
            {$themeStore === 'dark'
				? 'bg-red-950/20 text-white/90'
				: 'bg-red-50 text-black'}"
		>
			<p class="text-2xl md:text-3xl font-black italic leading-snug mb-6">
				"{block.value}"
			</p>
			{#if block.author}
				<div
					class="text-sm font-sans font-bold uppercase tracking-widest text-red-600"
				>
					{#if block.authorUrl}
						<a
							href={block.authorUrl}
							target="_blank"
							class="hover:underline hover:text-red-500 transition-all"
						>
							— {block.author}
						</a>
					{:else}
						— {block.author}
					{/if}
				</div>
			{/if}
		</div>
	{:else if block.type === "highlight"}
		<div
			class="my-10 p-8 shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] transition-colors
            {$themeStore === 'dark'
				? 'bg-red-950/20 border-l-4 border-red-600'
				: 'bg-black text-white'}"
		>
			<p
				class="font-sans font-bold uppercase tracking-widest text-xs mb-3 text-red-600"
			>
				Intelligence Brief
			</p>
			<p class="text-2xl font-bold leading-snug">
				{block.value}
			</p>
		</div>
	{:else if block.type === "callout"}
		<div
			class="my-8 p-6 border-2 border-dashed transition-colors
            {$themeStore === 'dark'
				? 'border-red-900/40 bg-red-900/5'
				: 'border-black bg-gray-50'}"
		>
			<div class="flex items-start gap-4">
				<span class="text-4xl">📢</span>
				<p class="text-xl font-medium italic">{block.value}</p>
			</div>
		</div>
	{:else if block.type === "link"}
		<div class="mb-8 font-sans">
			<a
				href={block.value}
				target="_blank"
				class="group inline-flex items-center gap-2 text-xl font-bold border-b-4 border-red-600 hover:bg-red-600 hover:text-white transition-all px-2 py-1"
			>
				<span class="group-hover:text-white">
					{block.value.replace(/^https?:\/\//, "")}
				</span>
				<span class="group-hover:text-white">↗</span>
			</a>
		</div>
	{:else if block.type === "statistic"}
		{@const [statLabel, statVal] = (block.value || "").split("|")}
		<div
			class="my-10 flex flex-col items-center gap-4 p-8 border transition-colors text-center
            {$themeStore === 'dark'
				? 'border-red-900/30 bg-[#0a0a0a]'
				: 'border-black bg-gray-50'}"
		>
			<div class="w-32 h-32 shrink-0 relative flex items-center justify-center">
				<svg viewBox="0 0 32 32" class="w-full h-full rotate-[-90deg]">
					<circle
						r="16"
						cx="16"
						cy="16"
						fill="transparent"
						stroke="currentColor"
						stroke-width="32"
						stroke-dasharray="100 100"
						class="opacity-10"
					/>
					<circle
						r="16"
						cx="16"
						cy="16"
						fill="transparent"
						stroke="#dc2626"
						stroke-width="32"
						stroke-dasharray="{parseFloat(statVal) || 75} 100"
					/>
				</svg>
				<div
					class="absolute inset-0 flex items-center justify-center text-xl font-black"
				>
					{statVal || ""}
				</div>
			</div>
			<div
				class="text-sm font-sans font-bold uppercase tracking-widest opacity-60"
			>
				{statLabel || "Metric"}
			</div>
		</div>
	{:else if block.type === "divider"}
		<div class="my-12 flex justify-center items-center gap-4">
			<div class="h-0.5 flex-1 bg-red-600/30"></div>
			<div class="text-red-600 rotate-45 text-xs">◆</div>
			<div class="h-0.5 flex-1 bg-red-600/30"></div>
		</div>
	{:else if block.type === "string_fallback" || typeof block.value === "string"}
		<p class="mb-6 font-serif text-xl leading-relaxed">{block.value}</p>
	{/if}
{/snippet}

<!-- Outer background -->
<div
	class="min-h-screen transition-colors duration-500 font-serif pt-24 pb-20 px-4 flex justify-center selection:bg-red-500/30
    {$themeStore === 'dark'
		? 'bg-[#0f0f0f] text-white/90'
		: 'bg-[#f8f8f0] text-black'}"
>
	<!-- The "Vertical Newspaper Strip" Container -->
	<article
		class="w-full max-w-5xl border-x shadow-2xl min-h-[80vh] flex flex-col items-center transition-colors duration-500
        {$themeStore === 'dark'
			? 'bg-[#1a1a1a] border-red-900/20'
			: 'bg-white border-black/10'}"
	>
		<!-- Strip Header / Metaline -->
		<header
			class="w-full border-b mb-8 px-8 pt-8 pb-4 text-center transition-colors
            {$themeStore === 'dark' ? 'border-red-900/30' : 'border-black'}"
		>
			<nav
				class="flex justify-between items-center text-xs font-sans font-bold uppercase tracking-widest mb-6 border-b pb-2
                {$themeStore === 'dark'
					? 'border-red-900/10 text-red-600/60'
					: 'border-black/5 text-gray-500'}"
			>
				<a
					href="/blog"
					class="flex items-center gap-1 transition-colors group {$themeStore ===
					'dark'
						? 'hover:text-red-500'
						: 'hover:text-black'}"
				>
					<span class="group-hover:-translate-x-1 transition-transform">←</span>
					Research and News
				</a>
				<span
					class="hidden md:block transition-colors {$themeStore === 'dark'
						? 'text-gray-500'
						: 'text-gray-400'}"
				>
					The SpikedAI Times
				</span>
				<span class="flex items-center gap-2">
					{formattedDate}
					<span class="opacity-30">/</span>
					{readingTime}
				</span>
				<span class="hidden sm:block">Vol. {new Date().getFullYear()}</span>
			</nav>

			<h1
				class="text-4xl md:text-6xl font-black leading-tight mb-6 font-serif transition-colors
                {$themeStore === 'dark' ? 'text-white' : 'text-black'}"
			>
				{data.post.title || data.post.data?.title || data.post.data?.Title}
			</h1>

			<div
				class="flex flex-col items-center justify-center gap-4 font-sans text-sm font-bold border-t pt-4 w-full px-4
                {$themeStore === 'dark'
					? 'border-red-900/10 text-gray-500'
					: 'border-black/10 text-gray-600'}"
			>
				<span class="flex items-center gap-2">
					<span class="w-1.5 h-1.5 bg-red-600 rotate-45"></span>
					By {data.post.author ||
						data.post.data?.author ||
						data.post.data?.Author ||
						"Editorial Staff"}
					<span class="w-1.5 h-1.5 bg-red-600 rotate-45"></span>
				</span>

				<div class="flex items-center gap-8">
					<VoicePlayer blocks={contentBlocks} content={rest || {}} />
					<button
						onclick={downloadPDF}
						disabled={isGeneratingPDF}
						class="flex items-center gap-2 px-10 py-1.5 rounded-lg border border-red-900/10 hover:bg-red-600 hover:text-white transition-all disabled:opacity-50"
						title="Download as PDF"
					>
						{#if isGeneratingPDF}
							<span class="animate-spin text-xs">◌</span>
						{:else}
							<Download size={16} />
						{/if}
						<span class="text-xs uppercase tracking-wider font-bold">PDF</span>
					</button>

					<ShareButton
						title={data.post.title}
						text={`Read "${data.post.title}" on SpikedAI.`}
					/>
				</div>
			</div>
		</header>

		<!-- Main Content Column -->
		<div
			class="w-full px-8 md:px-16 pb-12 transition-colors {$themeStore ===
			'dark'
				? 'bg-[#1a1a1a]'
				: 'bg-white'}"
		>
			<!-- Optional Cover Image -->
			{#if data.post.coverImage || data.post.data?.coverImage || data.post.data?.["Cover Image"]}
				<div class="mb-8 p-1 transition-colors">
					<img
						src={data.post.coverImage ||
							data.post.data?.coverImage ||
							data.post.data?.["Cover Image"]}
						alt={data.post.title}
						class="w-full h-auto grayscale contrast-125 block hover:grayscale-0 transition-all duration-700"
					/>
				</div>
			{/if}

			<!-- Text Content -->
			<div
				class="text-justify tiptap-content prose prose-lg prose-serif max-w-none transition-colors
                 {$themeStore === 'dark' ? 'text-white/80' : 'text-black'}"
			>
				{#each contentBlocks as block (block.id)}
					{@render renderBlock(block)}
				{/each}
			</div>

			<!-- End Mark -->
			<div class="flex justify-center mt-12 mb-8">
				<div
					class="text-2xl transition-colors {$themeStore === 'dark'
						? 'text-red-900'
						: 'text-black'}"
				>
					❦
				</div>
			</div>
		</div>
	</article>
</div>

<!-- HIDDEN PDF TEMPLATE CONTAINER (Off-screen for capture) -->
<div
	style="position: absolute; left: -9999px; top: -9999px; opacity: 0; pointer-events: none;"
>
	<div id="blog-pdf-template" class="pdf-export-container">
		<!-- COVER PAGE -->
		<div class="pdf-cover-page">
			<div class="pdf-cover-background"></div>
			<a
				href="https://spiked.ai"
				class="pdf-logo"
				style="text-decoration: none;"
			>
				<span class="logo-main">SPIKED<span class="logo-alt">AI</span></span>
				<span class="logo-sub">REVENUE ACCELERATION INTELLIGENCE</span>
			</a>

			<div class="pdf-cover-content">
				<div class="pdf-metadata-top">
					<span class="pdf-vol" style="color: white"
						>RESEARCH BRIEF Vol. {new Date().getFullYear()}</span
					>
					<span class="pdf-date" style="color: white">{formattedDate}</span>
				</div>

				<a
					href="https://spikedai.com/blog/{data.post.slug}"
					style="text-decoration: none;"
				>
					<h1 class="pdf-title">{data.post.title || data.post.data?.title}</h1>
				</a>

				<div class="pdf-author-strip">
					<div class="pdf-author-label">AUTHOR</div>
					<div class="pdf-author-name">
						{data.post.author || data.post.data?.author || "Editorial Staff"}
					</div>
				</div>
			</div>

			<div class="pdf-footer-brand">
				© {new Date().getFullYear()} SpikedAI Technologies. All Rights Reserved.
			</div>
			<!-- Manual break after cover -->
			<div style="page-break-after: always;"></div>
		</div>

		<!-- CONTENT PAGES CONTAINER -->
		{#each pdfPages as pageBlocks, idx}
			<div class="pdf-main-body">
				<div class="pdf-content-prose">
					{#each pageBlocks as block}
						<div class="pdf-block pdf-block-{block.type}">
							{#if block.type === "richtext" || block.type === "richtext_atom"}
								{@html getFieldHtml(block.value)}
							{:else if block.type === "quote"}
								<blockquote class="pdf-quote">
									"{block.value}"
									{#if block.author}
										<cite>— {block.author}</cite>
									{/if}
								</blockquote>
							{:else if block.type === "image" || (typeof block.value === "string" && (block.value.startsWith("data:image") || block.value.match(/\.(jpeg|jpg|gif|png|webp)$/i)))}
								<img src={block.value} alt={block.name} class="pdf-image" />
							{:else if block.type === "highlight"}
								<div class="pdf-highlight">
									<strong>BRIEFING:</strong>
									{block.value}
								</div>
							{:else if block.type === "statistic"}
								{@const [label, val] = (block.value || "").split("|")}
								<div class="pdf-stat">
									<span class="pdf-stat-val">{val}</span>
									<span class="pdf-stat-label">{label}</span>
								</div>
							{:else if block.type === "string_fallback" || typeof block.value === "string"}
								<p>{block.value}</p>
							{/if}
						</div>
					{/each}
				</div>
			</div>
			{#if idx < pdfPages.length - 1}
				<div style="page-break-after: always;"></div>
			{/if}
		{/each}
	</div>
</div>

<style>
	/* PDF SPECIFIC STYLES - Forced for the export container */
	.pdf-export-container {
		all: initial; /* Reset all inherited styles to avoid oklch from Tailwind 4 */
		font-family: "Inter", system-ui, sans-serif;
		color: #1a1a1a !important;
		background: white !important;
		width: 210mm; /* A4 width */
		margin: 0;
		padding: 0;
		line-height: 1.5;
		display: block !important;
		text-align: left;
	}

	.pdf-export-container * {
		box-sizing: border-box;
		color: #1a1a1a; /* Force standard color */
	}

	.pdf-cover-page {
		height: 296mm;
		width: 210mm;
		background: #030712;
		color: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 30mm 25mm 20mm;
		position: relative;
		overflow: hidden;
	}

	.pdf-cover-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #030712;
		z-index: -1;
	}

	.pdf-logo {
		display: flex;
		flex-direction: column;
	}

	.logo-main {
		font-size: 32px;
		font-weight: 900;
		letter-spacing: -1px;
		color: white !important;
	}

	.logo-alt {
		color: #dc2626;
	}

	.logo-sub {
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 4px;
		color: #9ca3af;
		margin-top: 4px;
	}

	.pdf-title {
		font-size: 48px;
		font-weight: 900;
		line-height: 1.1;
		margin: 20mm 0;
		font-family: serif;
		color: white !important;
	}

	.pdf-metadata-top {
		display: flex;
		justify-content: space-between;
		font-size: 12px;
		font-weight: 700;
		color: #dc2626 !important;
		border-bottom: 2px solid rgba(220, 38, 38, 0.3);
		padding-bottom: 10px;
	}

	.pdf-author-strip {
		border-left: 4px solid #dc2626;
		padding-left: 15px;
		margin-top: 20mm;
	}

	.pdf-author-label {
		font-size: 10px;
		font-weight: 800;
		color: #9ca3af;
		letter-spacing: 2px;
	}

	.pdf-author-name {
		font-size: 18px;
		font-weight: 700;
		color: white !important;
	}

	.pdf-footer-brand {
		font-size: 10px;
		color: #4b5563;
		text-align: center;
	}

	.pdf-main-body {
		padding: 20mm 25mm;
		background: white;
		height: 296mm;
		position: relative;
		overflow: hidden;
	}

	.pdf-content-prose {
		font-size: 12pt;
		line-height: 1.6;
		color: #1f2937;
	}

	.pdf-block {
		margin-bottom: 6mm; /* Tighter layout to avoid orphan quotes and empty space */
		page-break-inside: auto;
	}

	.pdf-block-quote,
	.pdf-block-statistic,
	.pdf-block-image,
	.pdf-block-highlight {
		page-break-inside: avoid; /* These specific blocks should not split */
	}

	.pdf-content-prose p {
		margin-bottom: 4mm; /* Tighter spacing */
		page-break-inside: avoid;
	}

	:global(.pdf-content-prose h2) {
		font-size: 18pt;
		font-weight: 800;
		color: #dc2626;
		margin-top: 10mm;
		margin-bottom: 4mm;
		border-bottom: 1px solid #dc2626;
		padding-bottom: 2mm;
		page-break-after: avoid;
	}

	:global(.pdf-content-prose h3) {
		font-size: 14pt;
		font-weight: 700;
		margin-top: 8mm;
		margin-bottom: 2mm;
		page-break-after: avoid;
	}

	.pdf-quote,
	:global(.pdf-content-prose blockquote) {
		background: #fdf2f2 !important;
		border-left: 4px solid #dc2626 !important;
		padding: 6mm 8mm !important;
		font-style: italic !important;
		font-size: 13pt !important;
		margin: 4mm 0 !important;
		page-break-inside: avoid !important;
		display: block !important;
	}

	:global(.pdf-content-prose blockquote p) {
		margin-bottom: 0 !important;
	}

	.pdf-quote cite {
		display: block;
		font-style: normal;
		font-weight: 700;
		font-size: 10pt;
		color: #dc2626;
		margin-top: 5mm;
	}

	.pdf-image {
		width: 100%;
		margin: 10mm 0;
		border: 4px solid #f3f4f6;
	}

	.pdf-highlight {
		background: #111827;
		color: white;
		padding: 8mm;
		border-radius: 4px;
		margin: 10mm 0;
	}

	.pdf-stat {
		text-align: center;
		background: #f9fafb;
		padding: 10mm;
		border: 1px solid #e5e7eb;
		margin: 10mm 0;
	}

	.pdf-stat-val {
		display: block;
		font-size: 36pt;
		font-weight: 900;
		color: #dc2626;
	}

	.pdf-stat-label {
		font-size: 10pt;
		font-weight: 700;
		text-transform: uppercase;
		color: #6b7280;
	}

	.footer-flex {
		display: flex;
		justify-content: space-between;
		font-size: 8pt;
		color: #9ca3af;
	}

	/* Custom Typography Tweaks for the 'Sherwood' feel */
	:global(.tiptap-content p) {
		margin-bottom: 2em;
		text-indent: 0;
	}
	/* Specific selector to target ONLY top-level paragraphs, not lists or others */
	:global(.tiptap-content > p:first-of-type::first-letter) {
		float: left;
		font-size: 4em;
		line-height: 0.8;
		font-weight: bold;
		margin-right: 0.15em;
		margin-top: 0.05em;
		color: #dc2626; /* Spiked Red Dropcap */
		font-family: serif;
	}
	:global(.theme-dark .tiptap-content p) {
		color: rgba(255, 255, 255, 0.8);
	}

	/* Headers: Smaller and more elegant as requested */
	:global(.tiptap-content h2) {
		font-family: sans-serif;
		text-transform: uppercase;
		font-size: 1.1em;
		font-weight: 900;
		letter-spacing: 0.15em;
		border-bottom: 2px solid #dc2626; /* Red border for headers */
		padding-bottom: 0.3em;
		margin-top: 3em;
		margin-bottom: 1.5em;
		color: inherit;
		display: inline-block;
	}

	:global(.tiptap-content h3) {
		font-family: sans-serif;
		text-transform: uppercase;
		font-size: 0.9em;
		font-weight: 700;
		letter-spacing: 0.1em;
		margin-top: 2.5em;
		margin-bottom: 1em;
		color: #dc2626;
	}

	/* Fix Bold Text in Dark Mode */
	:global(html.dark .tiptap-content strong),
	:global(html.dark .tiptap-content b) {
		color: inherit;
	}

	:global(.tiptap-content blockquote) {
		border-left: 6px solid #dc2626;
		padding-left: 1.5em;
		font-style: italic;
		font-weight: 700;
		background: rgba(220, 38, 38, 0.03);
		padding: 2em;
		margin: 3em 0;
		font-size: 1.25em;
		color: inherit; /* Respect parent color */
	}

	:global(.theme-dark .tiptap-content blockquote) {
		background: rgba(220, 38, 38, 0.07);
		color: rgba(255, 255, 255, 0.9) !important;
	}

	:global(.tiptap-content a) {
		color: #dc2626;
		text-decoration: underline;
		text-underline-offset: 4px;
		font-weight: bold;
	}

	:global(.tiptap-content ul) {
		list-style-type: none;
		padding-left: 0;
		margin-bottom: 2em;
	}
	:global(.tiptap-content li) {
		position: relative;
		padding-left: 1.5em;
		margin-bottom: 0.5em;
	}
	:global(.tiptap-content li::before) {
		content: "◆";
		position: absolute;
		left: 0;
		color: #dc2626;
		font-size: 0.8em;
		top: 0.2em;
	}

	/* Handle prose colors in dark mode better than default Tailwind prose */
	.theme-prose-colors :global(p),
	.theme-prose-colors :global(li) {
		color: inherit;
	}

	:global(body) {
		transition: background-color 0.5s ease;
	}

	:global(html.dark body) {
		background-color: #0f0f0f !important;
	}
	:global(html:not(.dark) body) {
		background-color: #f8f8f0 !important;
	}
</style>
