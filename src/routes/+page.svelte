<script>
	import { onMount } from "svelte";
	import { fade, fly, slide } from "svelte/transition";
	import {
		ChevronRight,
		Search,
		Globe,
		User,
		Menu,
		X,
		ChevronDown,
		Play,
	} from "lucide-svelte";

	// State
	let scrolled = $state(false);
	let currentSloganIndex = $state(0);
	const slogans = [
		{
			type: "slogan",
			text: "Sell Like a CEO",
			sponsors: [
				{
					label: "Member of",
					src: "/landing/nvidiainception.png",
					alt: "NVIDIA",
				},
				{
					label: "Powered by",
					src: "/landing/googlecloud.png",
					alt: "Partner 2",
				},
			],
		},
		{
			type: "quote",
			text: "AI that respects judgment, because revenue decisions are human decisions.",
			author: "Avi Sahi",
			role: "Co-Founder & CEO",
		},
	];

	const strategicTabs = [
		{
			id: "message-01",
			label: "Cognitive Edge",
			category: "Cognitive Edge",
			title: "Replaces cognitive overload with amplified cognitive ability",
			description:
				"Signal consolidation into a single focused result. For every rep, before, during, and after the conversation.",
			cta: "Learn More",
			ctaLink: "/features/ai-assistance",
			image: "/landing/cognitiveedge.webp",
			dark: true,
		},
		{
			id: "message-02",
			label: "Singular Rep",
			category: "Singular Rep",
			title: "Rise of the Singular Rep",
			description:
				"From crowded effort to one augmented rep. Fewer teams required, sharper execution, tighter accountability.",
			cta: "Learn More",
			ctaLink: "/features/ai-assistance",
			image: "/landing/singularrep.jpeg",
			dark: true,
		},
		{
			id: "message-03",
			label: "One-Shot Selling",
			category: "One-Shot Selling",
			title: "One-shot selling",
			description:
				"Checklist condensed into one clean result. Confidence and clarity at the level of a CEO.",
			cta: "Learn More",
			ctaLink: "/features/simulator",
			image: "/landing/oneshotselling.png",
			dark: true,
		},
		{
			id: "message-04",
			label: "Unified Actions",
			category: "Unified Actions",
			title: "Unified customer actions",
			description:
				"Multiple systems merged into one unified stream. Every motion aligned, every outcome intentional.",
			cta: "Learn More",
			ctaLink: "/features/crm",
			image: "/landing/unifiedactions.png",
			dark: true,
		},
		{
			id: "enterprise",
			label: "Enterprise",
			category: "Scale & Security",
			title: "Enterprise-Grade Sales Intelligence",
			description:
				"Built for scale with enterprise security, compliance, and dedicated support. Deploy across your entire revenue organization.",
			cta: "Contact Sales",
			ctaLink: "/contact-sales",
			image: "/landing/enterpriseselling.png",
			dark: true,
		},
	];

	const productTabs = [
		{
			id: "ai-platform",
			label: "AI Platform",
			category: "Cognitive Intelligence",
			title: "AI to Supercharge Sales Productivity and Close More Deals",
			description:
				"Real-time conversational intelligence powered by advanced AI. Transform every sales conversation with instant insights and guidance.",
			cta: "Learn More",
			ctaLink: "/features/ai-assistance",
			image: "/landing/aiassistance.png",
			dark: true,
		},
		{
			id: "knowledge-agent",
			label: "Knowledge Agent",
			category: "Real-Time Intelligence",
			title: "Instant Answers from Your Knowledge Base",
			description:
				"Get AI-powered responses from your sales docs in real-time during customer calls. Never fumble for information again.",
			cta: "Explore Knowledge Agent",
			ctaLink: "/features/ai-assistance",
			image: "/landing/knowledgeagent.png",
			dark: true,
		},
		{
			id: "call-simulator",
			label: "Call Simulator",
			category: "Training & Practice",
			title: "Master Your Pitch with AI-Powered Practice",
			description:
				"Practice with realistic AI prospects. Build confidence in discovery, demos, objection handling, and closing techniques.",
			cta: "Try Simulator",
			ctaLink: "/features/simulator",
			image: "/landing/callsimulator.png",
			dark: true,
		},
		{
			id: "analytics",
			label: "Analytics",
			category: "Performance Insights",
			title: "Advanced Revenue Analytics and Deal Intelligence",
			description:
				"AI-powered analytics to predict deal outcomes, track sentiment, and gain complete visibility into your pipeline health.",
			cta: "Discover Analytics",
			ctaLink: "/features/sentiment",
			image: "/landing/analytics.png",
			dark: true,
		},
		{
			id: "integrations",
			label: "Integrations",
			category: "Seamless Workflow",
			title: "Native CRM and Tool Integrations",
			description:
				"Connect with Salesforce, HubSpot, and your entire tech stack. Automatic sync means zero manual data entry.",
			cta: "View Integrations",
			ctaLink: "/features/crm",
			image: "/landing/integrations.png",
			dark: true,
		},
	];

	let activeHeroTab = $state("message-01");
	let activeProductTab = $state("ai-platform");
	let openDropdown = $state(null);
	let mobileMenuOpen = $state(false);

	const aiFeatures = [
		{
			tag: "Agentic AI | Platform",
			title: "Real-Time Knowledge Agent",
			description:
				"AI-powered document intelligence helps sales teams access the right information at the right moment.",
			image:
				"https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80",
			link: "/features/ai-assistance",
		},
		{
			tag: "Agentic AI | Feature",
			title: "Intelligent Call Coaching",
			description:
				"Get real-time guidance during live customer conversations with contextual suggestions.",
			image:
				"https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
			link: "/features/simulator",
		},
		{
			tag: "Analytics | Dashboard",
			title: "Sentiment Analysis Pipeline",
			description:
				"Understand customer emotions and buying signals in real-time with AI-powered analysis.",
			image:
				"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
			link: "/features/sentiment",
		},
	];

	const simulationFeatures = [
		{
			tag: "Simulation | Product",
			title: "AI Call Simulator Pro",
			description:
				"Practice with realistic AI prospects. Master discovery, demos, objections, and closing.",
			image:
				"https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80",
			link: "/features/simulator",
		},
		{
			tag: "Simulation | Training",
			title: "Custom Scenario Builder",
			description:
				"Create training scenarios based on your real deals and customer personas.",
			image:
				"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
			link: "/features/simulator",
		},
	];

	const gamingFeatures = [
		{
			tag: "CRM | Integration",
			title: "Salesforce & HubSpot Native Sync",
			description:
				"Bi-directional sync with automatic field mapping. Zero manual data entry required.",
			image:
				"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
			link: "/features/crm",
		},
		{
			tag: "Automation | Feature",
			title: "Smart Follow-Up Engine",
			description:
				"Never miss a follow-up. AI automatically schedules and drafts personalized outreach.",
			image:
				"https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
			link: "/features/followup",
		},
	];

	let currentSlide = $state({ ai: 0, sim: 0, gaming: 0 });

	function nextSlide(section) {
		const max =
			section === "ai"
				? aiFeatures.length - 1
				: section === "sim"
					? simulationFeatures.length - 1
					: gamingFeatures.length - 1;
		currentSlide[section] =
			currentSlide[section] >= max ? 0 : currentSlide[section] + 1;
	}

	function prevSlide(section) {
		const max =
			section === "ai"
				? aiFeatures.length - 1
				: section === "sim"
					? simulationFeatures.length - 1
					: gamingFeatures.length - 1;
		currentSlide[section] =
			currentSlide[section] <= 0 ? max : currentSlide[section] - 1;
	}

	let dropdownTimeout = null;

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 10;
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (dropdownTimeout) clearTimeout(dropdownTimeout);
		};
	});

	function handleMouseEnter(name) {
		if (dropdownTimeout) clearTimeout(dropdownTimeout);
		openDropdown = name;
	}

	function handleMouseLeave() {
		dropdownTimeout = setTimeout(() => {
			openDropdown = null;
		}, 150);
	}

	$effect(() => {
		const interval = setInterval(() => {
			currentSloganIndex = (currentSloganIndex + 1) % slogans.length;
		}, 6000);

		// Auto-rotate hero tabs
		const heroInterval = setInterval(() => {
			const currentIndex = strategicTabs.findIndex(
				(t) => t.id === activeHeroTab,
			);
			const nextIndex = (currentIndex + 1) % strategicTabs.length;
			activeHeroTab = strategicTabs[nextIndex].id;
		}, 8000);

		// Auto-rotate product tabs
		const productInterval = setInterval(() => {
			const currentIndex = productTabs.findIndex(
				(t) => t.id === activeProductTab,
			);
			const nextIndex = (currentIndex + 1) % productTabs.length;
			activeProductTab = productTabs[nextIndex].id;
		}, 8000);

		return () => {
			clearInterval(interval);
			clearInterval(heroInterval);
			clearInterval(productInterval);
		};
	});
</script>

<svelte:head>
	<title>Spiked AI | AI-Powered Sales Intelligence Platform</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="nvidia-page font-sans antialiased bg-white">
	<div class="bg-black py-6">
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<!-- Full-width Slogan Bar with Pulsing Gold Background -->
			<div
				class="relative h-[120px] lg:h-[100px] w-full bg-[#1a1410]/80 backdrop-blur-xl border border-amber-900/40 rounded-[2.5rem] shadow-2xl overflow-hidden flex items-center"
			>
				<!-- Pulsing Glow Effect -->
				<div
					class="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-500/20 to-amber-500/5 animate-pulse"
				></div>

				{#each slogans as slogan, i}
					{#if currentSloganIndex === i}
						<div
							class="absolute inset-0 flex items-center justify-between px-8 lg:px-16"
							in:fly={{ y: 20, duration: 800, delay: 100 }}
							out:fly={{ y: -20, duration: 800 }}
						>
							{#if slogan.type === "slogan"}
								<div
									class="flex flex-col lg:flex-row items-center justify-between w-full gap-6"
								>
									<p
										class="text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none text-center lg:text-left"
									>
										Sell Like <span class="text-[#ef4444]">a CEO</span>
									</p>
									<div class="flex items-center gap-6 lg:gap-12 opacity-90">
										{#each slogan.sponsors as sponsor}
											<div
												class="flex flex-col items-center lg:items-start group"
											>
												<span
													class="text-[9px] font-bold text-amber-500/80 uppercase tracking-widest mb-1"
													>{sponsor.label}</span
												>
												<div
													class="h-10 w-auto min-w-[80px] flex items-center bg-white/0 scale-150 px-3 py-1 rounded-md overflow-hidden"
												>
													{#if sponsor.src}
														<img
															src={sponsor.src}
															alt={sponsor.alt}
															class="h-full w-auto object-contain"
														/>
													{:else}
														<span
															class="text-[9px] font-bold text-zinc-400 italic uppercase"
															>Attach Image</span
														>
													{/if}
												</div>
											</div>
										{/each}
									</div>
								</div>
							{:else}
								<div class="flex items-center gap-8 w-full max-w-6xl mx-auto">
									<div
										class="hidden sm:block w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500/30 flex-shrink-0 shadow-lg"
									>
										<img
											src="/Photos/Avi_Sahi-removebg-preview.png"
											alt="Avi Sahi"
											class="w-full h-full object-cover bg-black/40"
										/>
									</div>
									<div class="flex-1">
										<p
											class="text-white text-lg lg:text-2xl font-medium leading-tight italic text-[#d4ad85]"
										>
											"{slogan.text}"
										</p>
										<div class="flex items-center gap-3 mt-2">
											<span
												class="text-amber-500 font-bold text-xs lg:text-sm uppercase tracking-widest"
												>{slogan.author}</span
											>
											<span
												class="text-white/40 text-[10px] lg:text-xs uppercase tracking-tighter"
												>— {slogan.role}</span
											>
										</div>
									</div>
								</div>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>

	<!-- Strategic Hero Section -->
	<section class="relative bg-black">
		{#each strategicTabs as tab}
			{#if activeHeroTab === tab.id}
				<div
					class="relative transition-colors duration-500"
					class:bg-zinc-50={!tab.dark}
					class:bg-black={tab.dark}
					in:fade={{ duration: 400 }}
				>
					<div
						class="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24"
					>
						<div
							class="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center min-h-[500px] lg:min-h-[580px]"
						>
							<!-- Content -->
							<div class="max-w-2xl relative">
								<span
									class="text-[11px] font-bold uppercase tracking-[0.2em] mb-5 block {!tab.dark
										? 'text-zinc-600'
										: 'text-zinc-400'}"
								>
									{tab.category}
								</span>
								<h1
									class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.08] mb-6 tracking-tight text-white"
								>
									{#if tab.id === "message-01"}
										Replaces cognitive overload <span class="text-red-600"
											>with amplified cognitive ability</span
										>
									{:else if tab.id === "message-02"}
										Rise of the <span class="text-red-600">Singular Rep</span>
									{:else if tab.id === "message-03"}
										One-shot <span class="text-red-600">selling</span>
									{:else if tab.id === "message-04"}
										Unified customer <span class="text-red-600">actions</span>
									{:else}
										{tab.title}
									{/if}
								</h1>
								<p
									class="text-base lg:text-lg xl:text-xl mb-10 leading-[1.6] max-w-xl {!tab.dark
										? 'text-zinc-700'
										: 'text-zinc-300'}"
								>
									{tab.description}
								</p>
								<a
									href={tab.ctaLink}
									class="inline-flex items-center gap-2 bg-[#ef4444] text-white font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#dc2626] transition-all duration-200 hover:gap-3 rounded-sm shadow-lg shadow-red-900/20 hover:shadow-red-900/30"
								>
									{tab.cta}
									<ChevronRight class="w-4 h-4" />
								</a>
							</div>

							<!-- Image -->
							<div class="relative lg:pl-8 group">
								{#if !tab.dark}
									<div
										class="absolute -inset-4 bg-gradient-to-r from-[#ef4444]/20 to-orange-500/20 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-70 transition-opacity duration-700"
									></div>
								{:else}
									<div
										class="absolute -inset-4 bg-gradient-to-r from-[#ef4444]/10 to-blue-500/10 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-50 transition-opacity duration-700"
									></div>
								{/if}

								<div
									class="aspect-video lg:aspect-[4/3] overflow-hidden rounded-2xl"
									style="mask-image: linear-gradient(to bottom, black 80%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);"
								>
									<img
										src={tab.image}
										alt=""
										class="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
									/>
									<!-- Overlay for better text diffusion if needed, or just atmosphere -->
									<div
										class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent opacity-50"
									></div>
								</div>
							</div>
						</div>
					</div>

					<!-- Tab Navigation -->
					<div
						class="border-t {!tab.dark
							? 'border-zinc-200 bg-zinc-50/80'
							: 'border-zinc-800 bg-zinc-950/50'}"
					>
						<div class="max-w-[1920px] mx-auto">
							<div
								class="flex flex-wrap lg:flex-nowrap w-full justify-between items-center"
							>
								{#each strategicTabs as navTab}
									<button
										onclick={() => (activeHeroTab = navTab.id)}
										class="flex-1 min-w-[50%] sm:min-w-[33.33%] md:min-w-[20%] lg:min-w-0 px-1 lg:px-1.5 xl:px-4 py-4 text-[9px] sm:text-[10px] lg:text-[10px] xl:text-[12px] font-bold uppercase tracking-tighter lg:tracking-tight xl:tracking-wider transition-all duration-200 relative whitespace-nowrap border-b-2 text-center {activeHeroTab ===
										navTab.id
											? 'border-[#ef4444]'
											: 'border-transparent'}"
										class:text-zinc-900={!tab.dark &&
											activeHeroTab === navTab.id}
										class:text-zinc-500={!tab.dark &&
											activeHeroTab !== navTab.id}
										class:hover:text-zinc-700={!tab.dark &&
											activeHeroTab !== navTab.id}
										class:text-white={tab.dark && activeHeroTab === navTab.id}
										class:text-zinc-400={tab.dark &&
											activeHeroTab !== navTab.id}
										class:hover:text-zinc-200={tab.dark &&
											activeHeroTab !== navTab.id}
									>
										{navTab.label}
									</button>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</section>

	<!-- Value Proposition Banner -->
	<section
		class="bg-gradient-to-r from-zinc-50 to-white py-12 lg:py-16 border-y border-zinc-100"
	>
		<div class="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12">
			<div
				class="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
			>
				<div class="flex-1 text-center lg:text-left">
					<h2
						class="text-2xl lg:text-3xl xl:text-4xl font-bold text-zinc-900 mb-4 leading-tight"
					>
						Transform Every Sales Conversation with AI
					</h2>
					<p class="text-base lg:text-lg text-zinc-600 leading-relaxed mb-6">
						Spiked AI brings real-time intelligence, automated workflows, and
						performance insights to your entire revenue team. Close more deals,
						faster.
					</p>
					<div
						class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
					>
						<a
							href="/contact-sales"
							class="inline-flex items-center justify-center gap-2 bg-[#ef4444] text-black font-bold px-8 py-3.5 text-sm uppercase tracking-wide hover:bg-[#dc2626] transition-all"
						>
							Get Started Free
							<ChevronRight class="w-4 h-4" />
						</a>
						<a
							href="/pricing"
							class="inline-flex items-center justify-center gap-2 bg-white text-zinc-900 font-bold px-8 py-3.5 text-sm uppercase tracking-wide border-2 border-zinc-300 hover:border-[#ef4444] transition-all"
						>
							View Pricing
							<ChevronRight class="w-4 h-4" />
						</a>
					</div>
				</div>
				<div class="flex-shrink-0">
					<div class="grid grid-cols-2 gap-6">
						<div class="text-center">
							<div class="text-4xl lg:text-5xl font-black text-[#ef4444] mb-2">
								15hrs
							</div>
							<div class="text-sm font-semibold text-zinc-600">
								Saved Weekly Per Rep
							</div>
						</div>
						<div class="text-center">
							<div class="text-4xl lg:text-5xl font-black text-[#ef4444] mb-2">
								40%
							</div>
							<div class="text-sm font-semibold text-zinc-600">
								Increase in Win Rate
							</div>
						</div>
						<div class="text-center">
							<div class="text-4xl lg:text-5xl font-black text-[#ef4444] mb-2">
								10M+
							</div>
							<div class="text-sm font-semibold text-zinc-600">
								Calls Analyzed
							</div>
						</div>
						<div class="text-center">
							<div class="text-4xl lg:text-5xl font-black text-[#ef4444] mb-2">
								500+
							</div>
							<div class="text-sm font-semibold text-zinc-600">
								Teams Powered
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Platform in Action - Dashboard Showcase -->
	<section
		class="relative bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 py-20 lg:py-32 overflow-hidden"
	>
		<div class="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
			<!-- Header -->
			<div class="text-center mb-16">
				<p
					class="text-[#ef4444] text-xs font-bold uppercase tracking-[0.3em] mb-4"
				>
					Platform Overview
				</p>
				<h2
					class="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight"
				>
					Intelligence You Can See
				</h2>
				<p class="text-zinc-400 text-lg max-w-3xl mx-auto">
					Real-time insights, actionable intelligence, and complete visibility
					into every deal. This is what winning looks like.
				</p>
			</div>

			<!-- Dashboard Screenshots Grid -->
			<div class="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
				<!-- Dashboard 1 -->
				<div class="group relative">
					<div
						class="relative bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 overflow-hidden hover:border-[#ef4444]/50 transition-all duration-300"
					>
						<div class="aspect-[4/3] relative">
							<img
								src="/landing/analytics.png"
								alt="MEDDIC Qualification and Live Sentiment Dashboard"
								class="w-full h-full object-cover"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
							></div>
						</div>
						<div class="p-6 bg-zinc-900/80 backdrop-blur-sm">
							<h3 class="text-2xl font-bold text-white mb-3">
								Deal Intelligence Hub
							</h3>
							<p class="text-zinc-400">
								Track MEDDIC qualification, live sentiment, meeting summaries,
								and file insights—all in one unified dashboard.
							</p>
						</div>
					</div>
				</div>

				<!-- Dashboard 2 -->
				<div class="group relative">
					<div
						class="relative bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 overflow-hidden hover:border-[#ef4444]/50 transition-all duration-300"
					>
						<div class="aspect-[4/3] relative">
							<img
								src="/landing/knowledgeagent.png"
								alt="Strategic Risk Analysis and Pipeline Coverage"
								class="w-full h-full object-cover"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
							></div>
						</div>
						<div class="p-6 bg-zinc-900/80 backdrop-blur-sm">
							<h3 class="text-2xl font-bold text-white mb-3">
								AI-Powered Insights
							</h3>
							<p class="text-zinc-400">
								Strategic risk analysis, AI insights summary, next steps
								recommendations, and advanced pipeline coverage analytics.
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Feature Highlights -->
			<div
				class="mt-16 grid md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto"
			>
				<div class="text-center">
					<div
						class="w-12 h-12 mx-auto mb-3 bg-[#ef4444]/10 rounded-lg flex items-center justify-center"
					>
						<svg
							class="w-6 h-6 text-[#ef4444]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							/>
						</svg>
					</div>
					<h4 class="text-sm font-semibold text-white mb-1">MEDDIC Tracking</h4>
					<p class="text-xs text-zinc-500">Real-time qualification</p>
				</div>

				<div class="text-center">
					<div
						class="w-12 h-12 mx-auto mb-3 bg-[#ef4444]/10 rounded-lg flex items-center justify-center"
					>
						<svg
							class="w-6 h-6 text-[#ef4444]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h4 class="text-sm font-semibold text-white mb-1">Live Sentiment</h4>
					<p class="text-xs text-zinc-500">Emotion analysis</p>
				</div>

				<div class="text-center">
					<div
						class="w-12 h-12 mx-auto mb-3 bg-[#ef4444]/10 rounded-lg flex items-center justify-center"
					>
						<svg
							class="w-6 h-6 text-[#ef4444]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
					</div>
					<h4 class="text-sm font-semibold text-white mb-1">Meeting Notes</h4>
					<p class="text-xs text-zinc-500">Auto-summarized</p>
				</div>

				<div class="text-center">
					<div
						class="w-12 h-12 mx-auto mb-3 bg-[#ef4444]/10 rounded-lg flex items-center justify-center"
					>
						<svg
							class="w-6 h-6 text-[#ef4444]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
					</div>
					<h4 class="text-sm font-semibold text-white mb-1">Risk Analysis</h4>
					<p class="text-xs text-zinc-500">AI-powered alerts</p>
				</div>

				<div class="text-center">
					<div
						class="w-12 h-12 mx-auto mb-3 bg-[#ef4444]/10 rounded-lg flex items-center justify-center"
					>
						<svg
							class="w-6 h-6 text-[#ef4444]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							/>
						</svg>
					</div>
					<h4 class="text-sm font-semibold text-white mb-1">Pipeline View</h4>
					<p class="text-xs text-zinc-500">Coverage metrics</p>
				</div>

				<div class="text-center">
					<div
						class="w-12 h-12 mx-auto mb-3 bg-[#ef4444]/10 rounded-lg flex items-center justify-center"
					>
						<svg
							class="w-6 h-6 text-[#ef4444]"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
					</div>
					<h4 class="text-sm font-semibold text-white mb-1">Smart Tasks</h4>
					<p class="text-xs text-zinc-500">Auto-prioritized</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Product Hero Section -->
	<section class="relative border-t border-zinc-800">
		{#each productTabs as tab}
			{#if activeProductTab === tab.id}
				<div
					class="relative transition-colors duration-500"
					class:bg-zinc-50={!tab.dark}
					class:bg-black={tab.dark}
					in:fade={{ duration: 400 }}
				>
					<div
						class="max-w-[1920px] mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-24"
					>
						<div
							class="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center min-h-[500px] lg:min-h-[580px]"
						>
							<!-- Content -->
							<div class="max-w-2xl relative">
								<span
									class="text-[11px] font-bold uppercase tracking-[0.2em] mb-5 block {!tab.dark
										? 'text-zinc-600'
										: 'text-zinc-400'}"
								>
									{tab.category}
								</span>
								<h1
									class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.08] mb-6 tracking-tight text-white"
								>
									{tab.title}
								</h1>
								<p
									class="text-base lg:text-lg xl:text-xl mb-10 leading-[1.6] max-w-xl {!tab.dark
										? 'text-zinc-700'
										: 'text-zinc-300'}"
								>
									{tab.description}
								</p>
								<a
									href={tab.ctaLink}
									class="inline-flex items-center gap-2 bg-[#ef4444] text-white font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#dc2626] transition-all duration-200 hover:gap-3 rounded-sm shadow-lg shadow-red-900/20 hover:shadow-red-900/30"
								>
									{tab.cta}
									<ChevronRight class="w-4 h-4" />
								</a>
							</div>

							<!-- Image -->
							<div class="relative lg:pl-8 group">
								{#if !tab.dark}
									<div
										class="absolute -inset-4 bg-gradient-to-r from-[#ef4444]/20 to-orange-500/20 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-70 transition-opacity duration-700"
									></div>
								{:else}
									<div
										class="absolute -inset-4 bg-gradient-to-r from-[#ef4444]/10 to-blue-500/10 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-50 transition-opacity duration-700"
									></div>
								{/if}

								<div
									class="aspect-video lg:aspect-[4/3] overflow-hidden rounded-2xl"
									style="mask-image: linear-gradient(to bottom, black 80%, transparent 100%); -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);"
								>
									<img
										src={tab.image}
										alt=""
										class="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
									/>
									<div
										class="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 to-transparent opacity-50"
									></div>
								</div>
							</div>
						</div>
					</div>

					<!-- Tab Navigation -->
					<div
						class="border-t {!tab.dark
							? 'border-zinc-200 bg-zinc-50/80'
							: 'border-zinc-800 bg-zinc-950/50'}"
					>
						<div class="max-w-[1920px] mx-auto">
							<div
								class="flex flex-wrap lg:flex-nowrap w-full justify-between items-center"
							>
								{#each productTabs as navTab}
									<button
										onclick={() => (activeProductTab = navTab.id)}
										class="flex-1 min-w-[50%] sm:min-w-[33.33%] md:min-w-[20%] lg:min-w-0 px-1 lg:px-1.5 xl:px-4 py-4 text-[9px] sm:text-[10px] lg:text-[10px] xl:text-[12px] font-bold uppercase tracking-tighter lg:tracking-tight xl:tracking-wider transition-all duration-200 relative whitespace-nowrap border-b-2 text-center {activeProductTab ===
										navTab.id
											? 'border-[#ef4444]'
											: 'border-transparent'}"
										class:text-zinc-900={!tab.dark &&
											activeProductTab === navTab.id}
										class:text-zinc-500={!tab.dark &&
											activeProductTab !== navTab.id}
										class:hover:text-zinc-700={!tab.dark &&
											activeProductTab !== navTab.id}
										class:text-white={tab.dark &&
											activeProductTab === navTab.id}
										class:text-zinc-400={tab.dark &&
											activeProductTab !== navTab.id}
										class:hover:text-zinc-200={tab.dark &&
											activeProductTab !== navTab.id}
									>
										{navTab.label}
									</button>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</section>

	<!-- AI Section (Light) -->
	<section class="bg-zinc-50 py-16 lg:py-24">
		<div class="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
			<div class="flex flex-col lg:flex-row gap-12">
				<!-- Left Content -->
				<div class="lg:w-1/3">
					<h2 class="text-3xl lg:text-4xl font-bold text-zinc-900 mb-6">
						AI-Powered Sales Intelligence
					</h2>
					<p class="text-zinc-600 leading-relaxed mb-8">
						Transform every customer interaction with AI that provides real-time
						answers, automated follow-ups, and intelligent insights. Spiked AI
						empowers your revenue teams to sell with confidence and close more
						deals faster.
					</p>
					<button
						class="flex items-center gap-2 text-zinc-900 font-semibold hover:text-[#ef4444] transition-colors"
					>
						<ChevronDown class="w-4 h-4" />
						Quick Links
					</button>
				</div>

				<!-- Cards Carousel -->
				<div class="lg:w-2/3">
					<div class="flex items-center justify-end gap-2 mb-6">
						<button
							onclick={() => prevSlide("ai")}
							class="w-10 h-10 rounded border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 transition-colors"
						>
							<ChevronRight class="w-5 h-5 rotate-180 text-zinc-900" />
						</button>
						<button
							onclick={() => nextSlide("ai")}
							class="w-10 h-10 rounded border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 transition-colors"
						>
							<ChevronRight class="w-5 h-5 text-zinc-900" />
						</button>
					</div>

					<div class="grid md:grid-cols-2 gap-6">
						{#each aiFeatures.slice(currentSlide.ai, currentSlide.ai + 2) as feature}
							<a
								href={feature.link}
								class="group block bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
							>
								<div class="aspect-video overflow-hidden">
									<img
										src={feature.image}
										alt={feature.title}
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								</div>
								<div class="p-6">
									<span class="text-xs text-zinc-500 mb-2 block"
										>{feature.tag}</span
									>
									<h3
										class="text-lg font-bold text-zinc-900 mb-2 group-hover:text-[#ef4444] transition-colors"
									>
										{feature.title}
									</h3>
									<p class="text-sm text-zinc-600">{feature.description}</p>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Simulation Section (Dark) -->
	<section class="bg-black py-16 lg:py-24">
		<div class="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
			<div class="flex flex-col lg:flex-row gap-12">
				<!-- Left Content -->
				<div class="lg:w-1/3">
					<h2 class="text-3xl lg:text-4xl font-bold text-white mb-6">
						Practice & Training
					</h2>
					<p class="text-zinc-400 leading-relaxed mb-8">
						Master your sales skills with AI-powered call simulation. Practice
						objection handling, discovery questions, and closing techniques in a
						risk-free environment with realistic AI prospects that adapt to your
						approach.
					</p>
					<button
						class="flex items-center gap-2 text-white font-semibold hover:text-[#ef4444] transition-colors"
					>
						<ChevronDown class="w-4 h-4" />
						Quick Links
					</button>
				</div>

				<!-- Cards Carousel -->
				<div class="lg:w-2/3">
					<div class="flex items-center justify-end gap-2 mb-6">
						<button
							onclick={() => prevSlide("sim")}
							class="w-10 h-10 rounded border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition-colors text-white"
						>
							<ChevronRight class="w-5 h-5 rotate-180" />
						</button>
						<button
							onclick={() => nextSlide("sim")}
							class="w-10 h-10 rounded border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition-colors text-white"
						>
							<ChevronRight class="w-5 h-5" />
						</button>
					</div>

					<div class="grid md:grid-cols-2 gap-6">
						{#each simulationFeatures as feature}
							<a
								href={feature.link}
								class="group block bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors"
							>
								<div class="aspect-video overflow-hidden">
									<img
										src={feature.image}
										alt={feature.title}
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								</div>
								<div class="p-6">
									<span class="text-xs text-zinc-500 mb-2 block"
										>{feature.tag}</span
									>
									<h3
										class="text-lg font-bold text-white mb-2 group-hover:text-[#ef4444] transition-colors"
									>
										{feature.title}
									</h3>
									<p class="text-sm text-zinc-400">{feature.description}</p>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CRM Section (Light) -->
	<section class="bg-zinc-50 py-16 lg:py-24">
		<div class="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
			<div class="flex flex-col lg:flex-row gap-12">
				<!-- Left Content -->
				<div class="lg:w-1/3">
					<h2 class="text-3xl lg:text-4xl font-bold text-zinc-900 mb-6">
						Seamless Integrations
					</h2>
					<p class="text-zinc-600 leading-relaxed mb-8">
						Connect Spiked AI with your entire tech stack. Native bi-directional
						sync with Salesforce, HubSpot, and leading CRM platforms means zero
						manual data entry and automatic workflow automation.
					</p>
					<button
						class="flex items-center gap-2 text-zinc-900 font-semibold hover:text-[#ef4444] transition-colors"
					>
						<ChevronDown class="w-4 h-4" />
						Quick Links
					</button>
				</div>

				<!-- Cards Carousel -->
				<div class="lg:w-2/3">
					<div class="flex items-center justify-end gap-2 mb-6">
						<button
							onclick={() => prevSlide("gaming")}
							class="w-10 h-10 rounded border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 transition-colors"
						>
							<ChevronRight class="w-5 h-5 rotate-180 text-zinc-900" />
						</button>
						<button
							onclick={() => nextSlide("gaming")}
							class="w-10 h-10 rounded border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 transition-colors"
						>
							<ChevronRight class="w-5 h-5 text-zinc-900" />
						</button>
					</div>

					<div class="grid md:grid-cols-2 gap-6">
						{#each gamingFeatures as feature}
							<a
								href={feature.link}
								class="group block bg-white border border-zinc-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
							>
								<div class="aspect-video overflow-hidden">
									<img
										src={feature.image}
										alt={feature.title}
										class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
								</div>
								<div class="p-6">
									<span class="text-xs text-zinc-500 mb-2 block"
										>{feature.tag}</span
									>
									<h3
										class="text-lg font-bold text-zinc-900 mb-2 group-hover:text-[#ef4444] transition-colors"
									>
										{feature.title}
									</h3>
									<p class="text-sm text-zinc-600">{feature.description}</p>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Featured Products Grid (Dark) -->
	<section class="bg-zinc-900 py-16 lg:py-24">
		<div class="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
			<h2 class="text-3xl lg:text-4xl font-bold text-white mb-12">
				Featured Products
			</h2>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				<!-- Product Card 1 -->
				<div
					class="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-[#ef4444]/50 transition-colors"
				>
					<div class="p-8">
						<div
							class="w-12 h-12 bg-[#ef4444] rounded-lg flex items-center justify-center mb-6"
						>
							<span class="text-black font-black text-lg">AI</span>
						</div>
						<h3 class="text-xl font-bold text-white mb-3">Spiked AI Core</h3>
						<p class="text-zinc-400 mb-6">
							Complete sales intelligence platform with real-time AI assistance,
							call analysis, and automated workflows.
						</p>
						<a
							href="/features"
							class="inline-flex items-center gap-2 text-[#ef4444] font-semibold hover:gap-3 transition-all"
						>
							Learn More <ChevronRight class="w-4 h-4" />
						</a>
					</div>
					<div
						class="absolute bottom-0 right-0 w-32 h-32 bg-[#ef4444]/10 rounded-tl-full"
					></div>
				</div>

				<!-- Product Card 2 -->
				<div
					class="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-[#ef4444]/50 transition-colors"
				>
					<div class="p-8">
						<div
							class="w-12 h-12 bg-[#ef4444] rounded-lg flex items-center justify-center mb-6"
						>
							<Play class="w-6 h-6 text-black" />
						</div>
						<h3 class="text-xl font-bold text-white mb-3">Call Simulator</h3>
						<p class="text-zinc-400 mb-6">
							AI-powered practice environment. Train on realistic scenarios, get
							instant feedback, and build confidence.
						</p>
						<a
							href="/features/simulator"
							class="inline-flex items-center gap-2 text-[#ef4444] font-semibold hover:gap-3 transition-all"
						>
							Try Simulator <ChevronRight class="w-4 h-4" />
						</a>
					</div>
					<div
						class="absolute bottom-0 right-0 w-32 h-32 bg-[#ef4444]/10 rounded-tl-full"
					></div>
				</div>

				<!-- Product Card 3 -->
				<div
					class="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg overflow-hidden border border-zinc-800 hover:border-[#ef4444]/50 transition-colors"
				>
					<div class="p-8">
						<div
							class="w-12 h-12 bg-[#ef4444] rounded-lg flex items-center justify-center mb-6"
						>
							<span class="text-black font-black text-lg">K</span>
						</div>
						<h3 class="text-xl font-bold text-white mb-3">Knowledge Agent</h3>
						<p class="text-zinc-400 mb-6">
							Real-time answers from your sales docs during live calls. Never
							fumble for information again.
						</p>
						<a
							href="/features/ai-assistance"
							class="inline-flex items-center gap-2 text-[#ef4444] font-semibold hover:gap-3 transition-all"
						>
							Explore Agent <ChevronRight class="w-4 h-4" />
						</a>
					</div>
					<div
						class="absolute bottom-0 right-0 w-32 h-32 bg-[#ef4444]/10 rounded-tl-full"
					></div>
				</div>
			</div>
		</div>
	</section>

	<!-- Resources Section (Light) -->
	<section class="bg-zinc-50 py-16 lg:py-24">
		<div class="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16">
			<div class="flex items-center justify-between mb-12">
				<h2 class="text-3xl lg:text-4xl font-bold text-zinc-900">Resources</h2>
				<a
					href="/resources"
					class="text-zinc-900 font-semibold hover:text-[#ef4444] transition-colors flex items-center gap-2"
				>
					View All <ChevronRight class="w-4 h-4" />
				</a>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				<a
					href="/blog"
					class="group block bg-zinc-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
				>
					<div
						class="aspect-video bg-gradient-to-br from-[#ef4444] to-[#5a9000] flex items-center justify-center"
					>
						<span class="text-4xl font-black text-white">Blog</span>
					</div>
					<div class="p-6">
						<h3
							class="font-bold text-zinc-900 group-hover:text-[#ef4444] transition-colors"
						>
							Spiked AI Blog
						</h3>
						<p class="text-sm text-zinc-500 mt-1">
							Latest insights on sales intelligence and AI
						</p>
					</div>
				</a>

				<a
					href="/resources"
					class="group block bg-zinc-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
				>
					<div
						class="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center"
					>
						<span class="text-4xl font-black text-white">Docs</span>
					</div>
					<div class="p-6">
						<h3
							class="font-bold text-zinc-900 group-hover:text-[#ef4444] transition-colors"
						>
							Documentation
						</h3>
						<p class="text-sm text-zinc-500 mt-1">
							Technical guides and API reference
						</p>
					</div>
				</a>

				<a
					href="/customers"
					class="group block bg-zinc-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
				>
					<div
						class="aspect-video bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center"
					>
						<span class="text-4xl font-black text-white">Case</span>
					</div>
					<div class="p-6">
						<h3
							class="font-bold text-zinc-900 group-hover:text-[#ef4444] transition-colors"
						>
							Case Studies
						</h3>
						<p class="text-sm text-zinc-500 mt-1">
							See how teams succeed with Spiked AI
						</p>
					</div>
				</a>

				<a
					href="/contact-sales"
					class="group block bg-zinc-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
				>
					<div
						class="aspect-video bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center"
					>
						<span class="text-4xl font-black text-white">Demo</span>
					</div>
					<div class="p-6">
						<h3
							class="font-bold text-zinc-900 group-hover:text-[#ef4444] transition-colors"
						>
							Request Demo
						</h3>
						<p class="text-sm text-zinc-500 mt-1">See Spiked AI in action</p>
					</div>
				</a>
			</div>
		</div>
	</section>

	<!-- Pricing Section -->
	<section
		class="relative bg-gradient-to-br from-zinc-950 via-black to-zinc-950 py-20 lg:py-32 overflow-hidden"
	>
		<!-- Background effects -->
		<div class="absolute inset-0">
			<div
				class="absolute top-0 left-1/4 w-96 h-96 bg-[#ef4444]/5 rounded-full blur-3xl"
			></div>
			<div
				class="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ef4444]/5 rounded-full blur-3xl"
			></div>
		</div>

		<div class="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
			<!-- Header -->
			<div class="text-center mb-16">
				<p
					class="text-[#ef4444] text-xs font-bold uppercase tracking-[0.3em] mb-4"
				>
					Accelerate Everything
				</p>
				<h2
					class="text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 tracking-tight"
				>
					FUEL YOUR<br />
					<span class="text-[#ef4444]">REVENUE GROWTH</span>
				</h2>
				<p class="text-zinc-400 text-lg mt-6">
					Intelligence for those who close.
				</p>
			</div>

			<!-- Pricing Cards -->
			<div class="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
				<!-- Starter Plan -->
				<div
					class="relative bg-zinc-950/50 rounded-xl border border-zinc-800/50 backdrop-blur-sm overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
				>
					<div class="p-8">
						<!-- Icon -->
						<div class="flex items-center gap-3 mb-8">
							<div
								class="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center"
							>
								<User class="w-5 h-5 text-zinc-400" />
							</div>
							<span
								class="text-xs font-bold uppercase tracking-wider text-zinc-500"
								>Starter</span
							>
						</div>

						<!-- Price -->
						<div class="mb-2">
							<span class="text-5xl font-black text-white">$0</span>
							<span class="text-zinc-500 text-lg">/month</span>
						</div>
						<p
							class="text-[#ef4444] text-xs font-bold uppercase tracking-wide mb-8"
						>
							Individuals For Free
						</p>

						<!-- Description -->
						<p class="text-zinc-400 text-sm leading-relaxed mb-8">
							For individuals just starting to sell with authority and improve
							revenue with the first conversation.
						</p>

						<!-- Capabilities -->
						<div class="mb-10">
							<h4
								class="text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-4"
							>
								Capabilities Included:
							</h4>
							<ul class="space-y-3">
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-2 flex-shrink-0"
									></div>
									<span>Includes 600 minutes</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-2 flex-shrink-0"
									></div>
									<span>3x minute live product setup</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-2 flex-shrink-0"
									></div>
									<span>Access to all core features</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-2 flex-shrink-0"
									></div>
									<span>Cognitive & Conversation capabilities</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-2 flex-shrink-0"
									></div>
									<span>48 hour response time support</span>
								</li>
							</ul>
						</div>

						<!-- CTA Button -->
						<a href="/contact-sales" class="block w-full">
							<button
								class="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold text-sm uppercase tracking-wide hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
							>
								<span>Get Started</span>
								<ChevronRight
									class="w-5 h-5 group-hover:translate-x-1 transition-transform"
								/>
							</button>
						</a>
						<p
							class="text-[10px] text-zinc-600 text-center mt-4 uppercase tracking-wide"
						>
							Individuals + Curious About Selling With Confidence
						</p>
					</div>
				</div>

				<!-- Core Plan -->
				<div
					class="relative bg-zinc-950/50 rounded-xl border border-zinc-800/50 backdrop-blur-sm overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
				>
					<div class="p-8">
						<!-- Icon -->
						<div class="flex items-center gap-3 mb-8">
							<div
								class="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center"
							>
								<div class="w-5 h-5 border-2 border-zinc-400 rounded"></div>
							</div>
							<span
								class="text-xs font-bold uppercase tracking-wider text-zinc-500"
								>Core</span
							>
						</div>

						<!-- Price -->
						<div class="mb-2">
							<span class="text-5xl font-black text-white">$65</span>
							<span class="text-zinc-500 text-lg">/month</span>
						</div>
						<p
							class="text-[#ef4444] text-xs font-bold uppercase tracking-wide mb-8"
						>
							Unlock Your Process
						</p>

						<!-- Description -->
						<p class="text-zinc-400 text-sm leading-relaxed mb-8">
							Best for sales professionals managing multiple accounts. Designed
							for scaling pipeline revenue and team systems performance.
						</p>

						<!-- Capabilities -->
						<div class="mb-10">
							<h4
								class="text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-4"
							>
								Capabilities Included:
							</h4>
							<ul class="space-y-3">
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-2 flex-shrink-0"
									></div>
									<span>Includes 1,200 minutes</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-2 flex-shrink-0"
									></div>
									<span>Two custom value sessions</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-2 flex-shrink-0"
									></div>
									<span>5 pre-selections of insights</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-2 flex-shrink-0"
									></div>
									<span>Up to 10 users</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-[#ef4444] mt-2 flex-shrink-0"
									></div>
									<span>6-24 hour response time support</span>
								</li>
							</ul>
						</div>

						<!-- CTA Button -->
						<a href="/contact-sales" class="block w-full">
							<button
								class="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white font-bold text-sm uppercase tracking-wide hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
							>
								<span>Start Scaling</span>
								<ChevronRight
									class="w-5 h-5 group-hover:translate-x-1 transition-transform"
								/>
							</button>
						</a>
						<p
							class="text-[10px] text-zinc-600 text-center mt-4 uppercase tracking-wide"
						>
							Sales Professionals and Small Teams
						</p>
					</div>
				</div>

				<!-- Enterprise Plan -->
				<div
					class="relative bg-gradient-to-br from-zinc-950/80 to-zinc-950/60 rounded-xl border-2 border-amber-500/30 backdrop-blur-sm overflow-hidden group hover:border-amber-500/50 transition-all duration-300"
				>
					<!-- Badge -->
					<div class="absolute top-6 right-6">
						<span
							class="inline-block px-3 py-1 bg-amber-500 text-black text-[9px] font-black uppercase tracking-wider rounded-sm"
						>
							Most Advanced
						</span>
					</div>

					<div class="p-8">
						<!-- Icon -->
						<div class="flex items-center gap-3 mb-8">
							<div
								class="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 flex items-center justify-center"
							>
								<div class="w-5 h-5 border-2 border-amber-500 rounded"></div>
							</div>
							<span
								class="text-xs font-bold uppercase tracking-wider text-amber-500"
								>Enterprise</span
							>
						</div>

						<!-- Price -->
						<div class="mb-2">
							<span class="text-4xl font-black text-white">Contact Sales</span>
						</div>
						<p
							class="text-amber-500 text-xs font-bold uppercase tracking-wide mb-8"
						>
							Tailored For Scale
						</p>

						<!-- Description -->
						<p class="text-zinc-400 text-sm leading-relaxed mb-8">
							Built for large teams and portfolios scaling retention of scale.
							Designed to reduce revenue cycles, improve pipeline accuracy, and
							lower cognitive overhead across teams.
						</p>

						<!-- Capabilities -->
						<div class="mb-10">
							<h4
								class="text-[10px] font-bold uppercase tracking-wider text-zinc-600 mb-4"
							>
								Capabilities Included:
							</h4>
							<ul class="space-y-3">
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"
									></div>
									<span>Tailored deployment & onboarding</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"
									></div>
									<span>Org-wise strategized focus</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"
									></div>
									<span>Consistent high-quality conversations</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"
									></div>
									<span>Scalable cognitive augmentation</span>
								</li>
								<li class="flex items-start gap-3 text-sm text-zinc-300">
									<div
										class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"
									></div>
									<span>Priority 2-6 hour support</span>
								</li>
							</ul>
						</div>

						<!-- CTA Button -->
						<a href="/contact-sales" class="block w-full">
							<button
								class="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg text-black font-black text-sm uppercase tracking-wide hover:from-amber-600 hover:to-amber-700 transition-all group shadow-lg shadow-amber-500/20"
							>
								<span>Get In Touch</span>
								<ChevronRight
									class="w-5 h-5 group-hover:translate-x-1 transition-transform"
								/>
							</button>
						</a>
						<p
							class="text-[10px] text-zinc-600 text-center mt-4 uppercase tracking-wide"
						>
							Large Sales Organizations and Leaders
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section (Dark) -->
	<section class="bg-black py-16 lg:py-24">
		<div class="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 text-center">
			<h2 class="text-3xl lg:text-5xl font-bold text-white mb-6">
				Ready to Transform Your Sales?
			</h2>
			<p class="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
				Join hundreds of revenue teams using Spiked AI to close more deals,
				faster.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/contact-sales"
					class="inline-flex items-center justify-center gap-2 bg-[#ef4444] text-black font-bold px-8 py-4 text-sm hover:bg-[#dc2626] transition-colors"
				>
					Contact Sales
					<ChevronRight class="w-4 h-4" />
				</a>
				<a
					href="/features"
					class="inline-flex items-center justify-center gap-2 border border-white text-white font-bold px-8 py-4 text-sm hover:bg-white hover:text-black transition-colors"
				>
					Explore Features
					<ChevronRight class="w-4 h-4" />
				</a>
			</div>
		</div>
	</section>
</div>

<style>
	.nvidia-page {
		font-family:
			"Inter",
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			Roboto,
			sans-serif;
	}

	/* Smooth transitions for hero */
	:global(.nvidia-page) {
		scroll-behavior: smooth;
	}
</style>
