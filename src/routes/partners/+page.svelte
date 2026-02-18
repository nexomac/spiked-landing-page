<script>
	import { themeStore } from "$lib/stores/theme.js";

	const partners = [
		{
			id: "nvidia",
			name: "NVIDIA Inception",
			category: "AI Infrastructure Partner",
			tagline: "Accelerating AI at the Hardware Level",
			description:
				"Spiked AI is a proud member of NVIDIA Inception — a program designed to nurture startups revolutionizing industries with AI. Through this partnership, we gain access to cutting-edge GPU infrastructure, technical expertise, and go-to-market support that powers our real-time AI reasoning engine.",
			logo: "/landing/nvidiainception.png",
			logoAlt: "NVIDIA Inception Program",
			heroImage: "/landing/cognitiveedge.jpeg",
			accentColor: "#76b900",
			accentColorDark: "#4d7a00",
			benefits: [
				{
					title: "GPU-Accelerated Inference",
					desc: "Access to NVIDIA's latest GPU architectures for blazing-fast AI model inference.",
				},
				{
					title: "Technical Co-Engineering",
					desc: "Direct collaboration with NVIDIA engineers to optimize our AI pipeline.",
				},
				{
					title: "Inception Network",
					desc: "Access to a global network of 17,000+ AI startups and enterprise partners.",
				},
				{
					title: "Go-to-Market Support",
					desc: "Joint marketing opportunities and enterprise customer introductions.",
				},
			],
			stats: [
				{ value: "17,000+", label: "Inception Members" },
				{ value: "10x", label: "Faster Inference" },
				{ value: "2024", label: "Member Since" },
			],
			link: "https://www.nvidia.com/en-us/startups/",
			linkLabel: "Learn About NVIDIA Inception",
			quote:
				"NVIDIA Inception helps us push the boundaries of what's possible with real-time AI — giving our customers the fastest, most accurate sales intelligence on the market.",
			quoteAuthor: "Spiked AI Engineering Team",
		},
		{
			id: "google",
			name: "Google for Startups",
			category: "Cloud & AI Partner",
			tagline: "Built on Google Cloud Infrastructure",
			description:
				"As a Google for Startups portfolio company, Spiked AI leverages Google Cloud's world-class infrastructure, Vertex AI, and the full suite of Google AI tools. This partnership accelerates our product development and gives our customers enterprise-grade reliability and scalability.",
			logo: "/landing/googlecloud.png",
			logoAlt: "Google for Startups",
			heroImage: "/landing/enterpriseselling.png",
			accentColor: "#4285f4",
			accentColorDark: "#1a56c4",
			benefits: [
				{
					title: "Vertex AI Access",
					desc: "Powered by Google's Vertex AI platform for state-of-the-art model training and deployment.",
				},
				{
					title: "Cloud Credits",
					desc: "Significant Google Cloud credits enabling rapid scaling without infrastructure constraints.",
				},
				{
					title: "Startup Ecosystem",
					desc: "Access to Google's global startup ecosystem, mentors, and enterprise customer network.",
				},
				{
					title: "AI Research Pipeline",
					desc: "Early access to Google DeepMind research and cutting-edge AI capabilities.",
				},
			],
			stats: [
				{ value: "99.99%", label: "Uptime SLA" },
				{ value: "Gemini", label: "AI Backbone" },
				{ value: "Global", label: "Infrastructure" },
			],
			link: "https://startup.google.com/",
			linkLabel: "Learn About Google for Startups",
			quote:
				"Google Cloud gives us the foundation to build AI that scales — from a single rep to an entire enterprise sales organization without missing a beat.",
			quoteAuthor: "Spiked AI Infrastructure Team",
		},
	];
</script>

<svelte:head>
	<title>Spiked AI | Partners — NVIDIA Inception & Google for Startups</title>
	<meta
		name="description"
		content="Spiked AI is backed by NVIDIA Inception and Google for Startups — two of the world's most prestigious AI startup programs. Learn how these partnerships power our platform."
	/>
</svelte:head>

<div
	class="min-h-screen transition-colors duration-500 font-sans pt-24 pb-24
	{$themeStore === 'dark' ? 'bg-black text-white' : 'bg-white text-zinc-900'}"
>
	<div class="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
		<!-- Header -->
		<header class="mb-14 lg:mb-20">
			<p
				class="text-[11px] uppercase tracking-[0.3em] font-semibold text-red-500"
			>
				Ecosystem
			</p>
			<h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold mt-3">
				Our Partners
			</h1>
			<p
				class="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed {$themeStore ===
				'dark'
					? 'text-zinc-400'
					: 'text-zinc-600'}"
			>
				Spiked AI is backed by the world's leading AI infrastructure programs.
				These partnerships give us the compute, cloud, and community to build
				the future of revenue intelligence.
			</p>
			<div
				class="mt-8 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.3em] {$themeStore ===
				'dark'
					? 'text-zinc-500'
					: 'text-zinc-400'}"
			>
				<span>Enterprise-grade infrastructure</span>
				<span class="hidden sm:inline">|</span>
				<span>AI-first architecture</span>
				<span class="hidden sm:inline">|</span>
				<span>Startup ecosystem</span>
			</div>
		</header>

		<!-- Partner Logos Strip -->
		<div
			class="mb-16 lg:mb-24 border-y py-10 {$themeStore === 'dark'
				? 'border-zinc-800'
				: 'border-zinc-200'}"
		>
			<p
				class="text-center text-[10px] uppercase tracking-[0.4em] mb-8 {$themeStore ===
				'dark'
					? 'text-zinc-600'
					: 'text-zinc-400'}"
			>
				Proud member of
			</p>
			<div class="flex flex-wrap items-center justify-center gap-12 lg:gap-20">
				{#each partners as partner}
					<a
						href={partner.link}
						target="_blank"
						rel="noopener noreferrer"
						class="group flex items-center gap-4 transition-opacity hover:opacity-80"
					>
						<img
							src={partner.logo}
							alt={partner.logoAlt}
							class="h-10 sm:h-12 object-contain {$themeStore === 'dark'
								? 'brightness-100'
								: 'brightness-0'} group-hover:brightness-100 transition-all duration-300"
						/>
					</a>
				{/each}
			</div>
		</div>

		<!-- Partner Deep-Dives -->
		<section class="space-y-0">
			{#each partners as partner, index}
				<article
					class="py-16 md:py-24 border-b {$themeStore === 'dark'
						? 'border-zinc-800'
						: 'border-zinc-200'} last:border-b-0"
				>
					<div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
						<!-- Content -->
						<div class={index % 2 === 1 ? "lg:order-2" : "lg:order-1"}>
							<!-- Category tag -->
							<p
								class="text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold mb-4"
							>
								{partner.category}
							</p>

							<!-- Partner logo inline -->
							<div class="mb-6">
								<img
									src={partner.logo}
									alt={partner.logoAlt}
									class="h-8 sm:h-10 object-contain {$themeStore === 'dark'
										? 'brightness-100'
										: 'brightness-0'}"
								/>
							</div>

							<h2
								class="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight"
							>
								{partner.tagline}
							</h2>

							<p
								class="mt-6 text-base sm:text-lg leading-relaxed {$themeStore ===
								'dark'
									? 'text-zinc-400'
									: 'text-zinc-600'}"
							>
								{partner.description}
							</p>

							<!-- Stats row -->
							<div class="mt-10 grid grid-cols-3 gap-6">
								{#each partner.stats as stat}
									<div>
										<div class="text-2xl sm:text-3xl font-bold text-red-500">
											{stat.value}
										</div>
										<div
											class="mt-1 text-[10px] uppercase tracking-[0.25em] {$themeStore ===
											'dark'
												? 'text-zinc-500'
												: 'text-zinc-400'}"
										>
											{stat.label}
										</div>
									</div>
								{/each}
							</div>

							<!-- Benefits list -->
							<ul class="mt-10 space-y-5">
								{#each partner.benefits as benefit}
									<li class="flex items-start gap-4">
										<span
											class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"
										></span>
										<div>
											<span
												class="text-sm font-semibold {$themeStore === 'dark'
													? 'text-white'
													: 'text-zinc-900'}"
											>
												{benefit.title}
											</span>
											<span
												class="text-sm leading-relaxed {$themeStore === 'dark'
													? 'text-zinc-400'
													: 'text-zinc-600'}"
											>
												— {benefit.desc}
											</span>
										</div>
									</li>
								{/each}
							</ul>

							<!-- CTA -->
							<div
								class="mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.25em]"
							>
								<a
									href={partner.link}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-2 border rounded-full px-6 py-3 font-semibold transition-colors {$themeStore ===
									'dark'
										? 'border-zinc-700 text-white hover:border-red-500 hover:text-red-400'
										: 'border-zinc-300 text-zinc-700 hover:border-red-500 hover:text-red-600'}"
								>
									{partner.linkLabel}
									<svg
										class="w-3 h-3"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</a>
							</div>
						</div>

						<!-- Visual Column -->
						<div class={index % 2 === 1 ? "lg:order-1" : "lg:order-2"}>
							<!-- Hero image -->
							<div
								class="aspect-[16/10] sm:aspect-[4/3] rounded-3xl overflow-hidden border shadow-2xl {$themeStore ===
								'dark'
									? 'border-zinc-800 bg-zinc-950'
									: 'border-zinc-200 bg-zinc-50'}"
							>
								<img
									src={partner.heroImage}
									alt="{partner.name} partnership"
									class="w-full h-full object-cover"
								/>
							</div>

							<!-- Quote card -->
							<div
								class="mt-6 rounded-2xl p-6 border {$themeStore === 'dark'
									? 'border-zinc-800 bg-zinc-950'
									: 'border-zinc-200 bg-zinc-50'}"
							>
								<p
									class="text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold mb-3"
								>
									From the team
								</p>
								<blockquote
									class="text-sm sm:text-base leading-relaxed italic {$themeStore ===
									'dark'
										? 'text-zinc-300'
										: 'text-zinc-700'}"
								>
									"{partner.quote}"
								</blockquote>
								<p
									class="mt-4 text-[10px] uppercase tracking-[0.25em] {$themeStore ===
									'dark'
										? 'text-zinc-500'
										: 'text-zinc-400'}"
								>
									— {partner.quoteAuthor}
								</p>
							</div>
						</div>
					</div>
				</article>
			{/each}
		</section>

		<!-- What This Means For You section -->
		<section
			class="mt-20 py-16 border-t {$themeStore === 'dark'
				? 'border-zinc-800'
				: 'border-zinc-200'}"
		>
			<div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
				<div>
					<p
						class="text-[11px] uppercase tracking-[0.3em] text-red-500 font-semibold"
					>
						What This Means For You
					</p>
					<h2
						class="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 leading-tight"
					>
						Enterprise-grade AI, startup speed.
					</h2>
					<p
						class="mt-6 text-base sm:text-lg leading-relaxed {$themeStore ===
						'dark'
							? 'text-zinc-400'
							: 'text-zinc-600'}"
					>
						These partnerships aren't just logos on a page. They translate
						directly into faster inference, more reliable uptime, and access to
						the latest AI breakthroughs — all delivered to your sales team in
						real time.
					</p>

					<ul class="mt-8 space-y-4">
						{#each ["Sub-100ms AI response times powered by NVIDIA GPUs", "99.99% uptime backed by Google Cloud global infrastructure", "Access to the latest LLMs via Vertex AI and NVIDIA NIM", "Enterprise security and compliance built in from day one"] as point}
							<li class="flex items-start gap-3">
								<span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"
								></span>
								<span
									class="text-sm sm:text-base leading-relaxed {$themeStore ===
									'dark'
										? 'text-zinc-300'
										: 'text-zinc-600'}"
								>
									{point}
								</span>
							</li>
						{/each}
					</ul>

					<div class="mt-10">
						<a
							href="/contact-sales"
							class="inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs uppercase tracking-[0.3em] font-semibold transition-colors {$themeStore ===
							'dark'
								? 'bg-white text-black hover:bg-red-500 hover:text-white'
								: 'bg-black text-white hover:bg-red-500'}"
						>
							Talk to Sales
						</a>
					</div>
				</div>

				<!-- Partner logos grid -->
				<div class="grid grid-cols-2 gap-6">
					{#each partners as partner}
						<div
							class="aspect-square rounded-3xl border flex flex-col items-center justify-center p-8 group hover:border-red-500/40 transition-all duration-300 {$themeStore ===
							'dark'
								? 'border-zinc-800 bg-zinc-950 hover:bg-zinc-900'
								: 'border-zinc-200 bg-zinc-50 hover:bg-white'}"
						>
							<img
								src={partner.logo}
								alt={partner.logoAlt}
								class="w-full max-w-[140px] object-contain mb-4 {$themeStore ===
								'dark'
									? 'brightness-100'
									: 'brightness-0'} group-hover:brightness-100 transition-all duration-300"
							/>
							<p
								class="text-[10px] uppercase tracking-[0.25em] text-center {$themeStore ===
								'dark'
									? 'text-zinc-600'
									: 'text-zinc-400'}"
							>
								{partner.category}
							</p>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Explore More -->
		<section class="mt-20">
			<div
				class="border-t pt-10 {$themeStore === 'dark'
					? 'border-zinc-800'
					: 'border-zinc-200'}"
			>
				<h2 class="text-xl sm:text-2xl font-semibold">Explore More</h2>
				<p
					class="mt-3 text-sm {$themeStore === 'dark'
						? 'text-zinc-400'
						: 'text-zinc-600'}"
				>
					Dive deeper into Spiked AI — product, features, and proof.
				</p>
				<div class="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
					{#each [{ label: "Features", href: "/features" }, { label: "Customers", href: "/customers" }, { label: "Blog", href: "/blog" }, { label: "Pricing", href: "/pricing" }, { label: "About", href: "/about-us" }, { label: "Contact", href: "/contact-sales" }] as link}
						<a
							href={link.href}
							class="text-xs uppercase tracking-[0.25em] font-semibold py-3 border rounded-full text-center transition-colors {$themeStore ===
							'dark'
								? 'border-zinc-800 text-zinc-200 hover:border-red-500 hover:text-red-400'
								: 'border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600'}"
						>
							{link.label}
						</a>
					{/each}
				</div>
			</div>
		</section>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		transition: background-color 0.5s ease;
	}

	:global(html.dark body) {
		background-color: #000000 !important;
	}
	:global(html:not(.dark) body) {
		background-color: #ffffff !important;
	}
</style>
