<script>
	import ShareButton from "$lib/components/ShareButton.svelte";
	import VoicePlayer from "$lib/components/VoicePlayer.svelte";
	import { themeStore } from "$lib/stores/theme.js";
	import { Download, FileText, Loader2 } from "lucide-svelte";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	let html2pdf;
	onMount(async () => {
		try {
			const mod = await import("html2pdf.js");
			html2pdf = mod.default || mod;
		} catch (e) {
			console.warn(
				"Failed to import html2pdf.js dynamically, checking window...",
				e,
			);
			if (window.html2pdf) {
				html2pdf = window.html2pdf;
			} else {
				console.error(
					"html2pdf.js could not be loaded. Please ensure it is installed correctly.",
				);
			}
		}
	});

	let { data } = $props();

	// Helper to generate HTML for a specific field data

	function extractTextFromTiptap(node) {
		if (!node) return "";
		if (node.type === "text") return node.text;
		if (node.type === "hardBreak") return "\n";
		if (node.content) {
			return node.content.map((child) => extractTextFromTiptap(child)).join("");
		}
		return "";
	}

	function getYoutubeId(url) {
		if (!url) return null;
		const regExp =
			/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
		const match = url.match(regExp);
		return match && match[2].length === 11 ? match[2] : null;
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
					if (b.type === "richtext" || b.type === "header") {
						return {
							id: b.id,
							type: "richtext",
							value: b.data?.html || b.data, // fallback for header data
							renderedHtml: b.renderedHtml,
						};
					}

					if (b.type === "text") {
						return {
							id: b.id,
							type: "string_fallback",
							value: b.data?.content || "",
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

					if (b.type === "link") {
						return {
							id: b.id,
							type: "link",
							value: b.data?.value || "",
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
		if (block.type === "link") return getYoutubeId(block.value) ? 8.0 : 1.5;
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
			if (block.type === "richtext" && block.renderedNodes) {
				// Split Tiptap doc into individual top-level nodes for granular control
				for (const atom of block.renderedNodes) {
					const nodeWeight = estimateWeight({
						type: "richtext",
						value: atom.node,
					});
					atoms.push({
						type: "richtext_atom",
						value: atom.node,
						renderedHtml: atom.html,
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
			document.body.removeChild(clone);
		} catch (error) {
			console.error("PDF Generation Error:", error);
		} finally {
			isGeneratingPDF = false;
		}
	}
</script>

<!-- Outer container -->
<div
	class="min-h-screen transition-colors duration-500 font-sans pt-24 pb-24 px-4 sm:px-6 lg:px-8
    {$themeStore === 'dark' ? 'bg-black text-white' : 'bg-white text-zinc-900'}"
>
	<article class="max-w-4xl mx-auto">
		<!-- Navigation & Meta Header -->
		<header class="mb-12 lg:mb-16">
			<nav
				class="flex items-center gap-4 text-[11px] uppercase tracking-[0.3em] font-semibold text-red-500 mb-8"
			>
				<a href="/blog" class="hover:opacity-70 transition-opacity"
					>Spiked Journal</a
				>
				<span class="opacity-30">|</span>
				<span>{formattedDate}</span>
			</nav>

			<h1
				class="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-8"
			>
				{data.post.title || data.post.data?.title}
			</h1>

			<div
				class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-8 border-y {$themeStore ===
				'dark'
					? 'border-zinc-800'
					: 'border-zinc-200'}"
			>
				<div class="flex items-center gap-4">
					<div
						class="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500"
					>
						<FileText size={20} />
					</div>
					<div>
						<p class="text-xs uppercase tracking-widest font-bold text-red-500">
							Author
						</p>
						<p class="text-sm font-medium">
							{data.post.author || "Editorial Staff"}
						</p>
					</div>
				</div>

				<div class="flex flex-wrap items-center gap-4">
					<VoicePlayer blocks={contentBlocks} content={rest || {}} />

					<button
						onclick={downloadPDF}
						disabled={isGeneratingPDF}
						class="flex items-center gap-2 px-6 py-2 rounded-full border border-zinc-800 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all disabled:opacity-50 text-[11px] uppercase tracking-widest font-bold"
					>
						{#if isGeneratingPDF}
							<Loader2 size={14} class="animate-spin" />
						{:else}
							<Download size={14} />
						{/if}
						<span>PDF</span>
					</button>

					<ShareButton
						title={data.post.title}
						text={`Read "${data.post.title}" on SpikedAI.`}
					/>
				</div>
			</div>
		</header>

		<!-- Hero Image (Optional) -->
		{#if data.post.coverImage || data.post.data?.coverImage}
			<div class="mb-16">
				<div
					class="aspect-[16/9] rounded-3xl overflow-hidden border {$themeStore ===
					'dark'
						? 'border-zinc-800 bg-zinc-950'
						: 'border-zinc-200 bg-zinc-50'} shadow-2xl"
				>
					<img
						src={data.post.coverImage || data.post.data?.coverImage}
						alt={data.post.title}
						class="w-full h-full object-cover"
					/>
				</div>
			</div>
		{/if}

		<!-- Reading Progress / Meta -->
		<div
			class="flex items-center gap-6 mb-12 text-[10px] uppercase tracking-[0.3em] {$themeStore ===
			'dark'
				? 'text-zinc-500'
				: 'text-zinc-400'}"
		>
			<span>{readingTime}</span>
			<span>|</span>
			<span>Vol. {new Date().getFullYear()}</span>
			<span>|</span>
			<span>Signal Verified</span>
		</div>

		<!-- Main Content -->
		<div
			class="tiptap-content prose prose-lg max-w-none {$themeStore === 'dark'
				? 'prose-invert'
				: ''}"
		>
			{#each contentBlocks as block (block.id)}
				<div class="mb-12">
					{#if block.type === "richtext"}
						<div
							class="text-left leading-relaxed {$themeStore === 'dark'
								? 'text-zinc-300'
								: 'text-zinc-700'}"
						>
							{@html block.renderedHtml || ""}
						</div>
					{:else if block.type === "image"}
						<div class="my-12">
							<div
								class="rounded-2xl overflow-hidden border {$themeStore ===
								'dark'
									? 'border-zinc-800'
									: 'border-zinc-200'} shadow-lg group"
							>
								<img
									src={block.value}
									alt={block.name}
									class="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
								/>
								{#if block.name}
									<p
										class="px-6 py-4 text-xs italic text-zinc-500 border-t {$themeStore ===
										'dark'
											? 'border-zinc-800 bg-zinc-950'
											: 'border-zinc-200 bg-zinc-50'}"
									>
										{block.name}
									</p>
								{/if}
							</div>
						</div>
					{:else if block.type === "quote"}
						<div
							class="my-16 pl-8 border-l-4 border-red-500 bg-red-500/5 py-10 px-10 rounded-r-3xl"
						>
							<p
								class="text-3xl font-semibold italic leading-snug mb-8 {$themeStore ===
								'dark'
									? 'text-white'
									: 'text-zinc-900'}"
							>
								"{block.value}"
							</p>
							{#if block.author}
								<cite
									class="not-italic text-sm font-bold uppercase tracking-widest text-red-500"
								>
									{#if block.authorUrl}
										<a
											href={block.authorUrl}
											target="_blank"
											class="hover:underline">— {block.author}</a
										>
									{:else}
										— {block.author}
									{/if}
								</cite>
							{/if}
						</div>
					{:else if block.type === "statistic"}
						{@const [label, val] = (block.value || "").split("|")}
						<div
							class="my-12 p-10 rounded-2xl border text-center flex flex-col items-center gap-4 {$themeStore ===
							'dark'
								? 'border-zinc-800 bg-zinc-950'
								: 'border-zinc-200 bg-zinc-50'}"
						>
							<div class="text-6xl font-bold text-red-500">{val}</div>
							<div
								class="text-sm uppercase tracking-[0.3em] font-bold text-zinc-500"
							>
								{label}
							</div>
						</div>
					{:else if block.type === "link"}
						<div class="my-12">
							{#if getYoutubeId(block.value)}
								<div
									class="aspect-video rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 bg-black"
								>
									<iframe
										width="100%"
										height="100%"
										src="https://www.youtube.com/embed/{getYoutubeId(
											block.value,
										)}"
										title="YouTube video player"
										frameborder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
										allowfullscreen
									></iframe>
								</div>
							{:else}
								<a
									href={block.value}
									target="_blank"
									class="inline-flex items-center gap-2 text-xl font-semibold text-red-500 hover:gap-4 transition-all"
								>
									{block.value.replace(/^https?:\/\//, "")} <span>→</span>
								</a>
							{/if}
						</div>
					{:else if block.type === "string_fallback"}
						<p
							class="leading-relaxed {$themeStore === 'dark'
								? 'text-zinc-300'
								: 'text-zinc-700'}"
						>
							{block.value}
						</p>
					{/if}
				</div>
			{/each}
		</div>

		<!-- Footer Mark -->
		<div class="flex justify-center mt-24">
			<div class="h-px w-24 bg-red-500/20 relative">
				<div class="absolute inset-0 flex items-center justify-center">
					<div class="w-2 h-2 bg-red-500 rotate-45"></div>
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
				<span class="logo-sub">Cognitive Intelligence INTELLIGENCE</span>
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
								{@html block.renderedHtml || ""}
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
							{:else if block.type === "link"}
								<div
									style="margin: 5mm 0; border-bottom: 1px solid #dc2626; padding-bottom: 2mm;"
								>
									<span
										style="color: #dc2626; font-weight: bold; font-size: 10pt;"
										>LINK:</span
									>
									<span style="font-size: 10pt; color: #1a1a1a;"
										>{block.value}</span
									>
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
	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	:global(.tiptap-content p) {
		margin-bottom: 1.5rem;
	}

	:global(.tiptap-content ul) {
		list-style-type: none;
		padding-left: 0;
		margin-bottom: 2rem;
	}

	:global(.tiptap-content li) {
		position: relative;
		padding-left: 1.5rem;
		margin-bottom: 0.5rem;
	}

	:global(.tiptap-content li::before) {
		content: "•";
		position: absolute;
		left: 0;
		color: #ef4444; /* red-500 */
		font-weight: bold;
	}

	:global(.tiptap-content a) {
		color: #ef4444;
		text-decoration: underline;
		text-underline-offset: 4px;
		font-weight: 600;
	}

	:global(.tiptap-content h2) {
		font-size: 1.5rem;
		font-weight: 700;
		margin-top: 3rem;
		margin-bottom: 1rem;
	}

	:global(.tiptap-content h3) {
		font-size: 1.25rem;
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 0.75rem;
	}

	:global(body) {
		transition: background-color 0.5s ease;
	}

	:global(html.dark body) {
		background-color: #000000 !important;
	}
	:global(html:not(.dark) body) {
		background-color: #ffffff !important;
	}
</style>
