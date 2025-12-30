<script>
	import { onMount } from "svelte";
	import { fly, fade, crossfade } from "svelte/transition";
	import OnboardingFlow from "$lib/components/OnboardingFlow.svelte";
	import HeroSection from "$lib/components/HeroSection.svelte";
	import ProductsSection from "$lib/components/ProductsSection.svelte";
	import AIAssistanceShowcase from "$lib/components/AIAssistanceShowcase.svelte";
	import NotetakerShowcase from "$lib/components/NotetakerShowcase.svelte";
	import FollowupShowcase from "$lib/components/FollowupShowcase.svelte";
	import SimulatorShowcase from "$lib/components/SimulatorShowcase.svelte";
	import DevToolsShowcase from "$lib/components/DevToolsShowcase.svelte";
	import CRMShowcase from "$lib/components/CRMShowcase.svelte";
	import SentimentShowcase from "$lib/components/SentimentShowcase.svelte";
	import CustomGoalsShowcase from "$lib/components/CustomGoalsShowcase.svelte";
	import {
		Sparkles,
		MessageSquare,
		Brain,
		FileText,
		Users,
		Calendar,
		ArrowRight,
		Target,
		CheckCircle2,
		TrendingUp,
		GitBranch,
		BarChart3,
		Heart,
		Settings,
		Zap,
		Activity,
	} from "lucide-svelte";
	import { onboardingStore } from "$lib/stores/onboarding.js";
	import { themeStore } from "$lib/stores/theme.js";
	import { innerWidth } from "svelte/reactivity/window";

	let theme = $state("dark");

	let activeTab = $state("simulator");
	let activeFeatureTab = $state("transcription");
	let transcriptIndex = $state(0);
	let sentimentScore = $state(0);
	let buyingSignals = $state(0);
	let autoAnswerMode = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let scrollY = $state(0);

	// Showcase rotation state
	let currentShowcaseIndex = $state(0);
	let isTransitioning = $state(false);
	let isPaused = $state(false);
	let showcaseContainerRef = null;

	// State for showcase components that need bindings
	let aiSelectedQuestion = $state("roi");
	let aiIsAutoPlaying = $state(true);
	let notetakerActiveTab = $state("templates");
	let notetakerSelectedTemplate = $state(null);
	let notetakerIsAutoPlaying = $state(true);
	let followupActiveFeature = $state(0);
	let followupIsAutoPlaying = $state(true);
	let simulatorActive = $state(false);
	let simulatorPaused = $state(false);
	let simulatorScenario = $state("discovery");
	let simulatorDialogueIndex = $state(0);
	let simulatorShowCoaching = $state(true);
	let simulatorHoveredDialogue = $state(null);
	let sentimentCurrent = $state("positive");
	let sentimentShowcaseScore = $state(78);

	// Showcase components configuration with full info
	const showcases = [
		{
			id: "ai-assistance",
			name: "AI Assistance",
			label: "AI Assistance",
			title: "Real-time AI answers",
			subtitle: "from your sales docs",
			icon: Sparkles,
			features: [
				{
					icon: Brain,
					title: "Instant answers during calls",
					description:
						"Get contextual responses from your sales docs in real-time",
				},
				{
					icon: MessageSquare,
					title: "Powered by your knowledge base",
					description:
						"AI trained on your specific sales and solutions documentation",
					highlight: true,
				},
				{
					icon: FileText,
					title: "Never miss a detail",
					description:
						"Handle objections and technical questions with confidence",
				},
			],
		},
		{
			id: "notetaker",
			name: "Smart Notetaker",
			label: "Smart Notetaker",
			title: "Automatically capture",
			subtitle: "transcribe, and analyze every conversation",
			icon: MessageSquare,
			features: [
				{
					icon: FileText,
					title: "Smart transcription",
					description:
						"AI-powered transcription with speaker identification",
				},
				{
					icon: Brain,
					title: "Intelligent summaries",
					description:
						"Auto-generate meeting summaries and action items",
					highlight: true,
				},
				{
					icon: Zap,
					title: "Take automatic actions",
					description:
						"Send follow-ups, sync to CRM, track stakeholders",
				},
			],
		},
		{
			id: "followup",
			name: "Follow-Up Planner",
			label: "Follow-Up Preparation",
			title: "Never walk in unprepared",
			subtitle: "Automatically compile everything you need",
			icon: Calendar,
			features: [
				{
					icon: FileText,
					title: "Smart Preparation",
					description:
						"Automatically compile everything you need before every meeting",
				},
				{
					icon: Brain,
					title: "Context Recall",
					description:
						"Instantly recall every past conversation, commitment, and detail",
					highlight: true,
				},
				{
					icon: CheckCircle2,
					title: "Action Tracking",
					description:
						"Track commitments automatically and get reminded before follow-ups",
				},
			],
		},
		{
			id: "simulator",
			name: "Call Simulator",
			label: "Meeting Simulator",
			title: "Practice makes perfect",
			subtitle: "Run realistic sales simulations",
			icon: Users,
			features: [
				{
					icon: Users,
					title: "Realistic scenarios",
					description:
						"Practice with AI-powered prospects in various situations",
				},
				{
					icon: Target,
					title: "Practice Every Scenario",
					description:
						"Master discovery, demos, objections, and closing",
					highlight: true,
				},
				{
					icon: TrendingUp,
					title: "Live coaching feedback",
					description:
						"Get real-time insights and improvement suggestions",
				},
			],
		},
		{
			id: "dev-tools",
			name: "Dev Tools",
			label: "Developer Tools",
			title: "Seamlessly connect sales",
			subtitle: "with development workflow",
			icon: GitBranch,
			features: [
				{
					icon: GitBranch,
					title: "Jira & Asana Integration",
					description:
						"Sync sales conversations with development tickets",
				},
				{
					icon: Activity,
					title: "Automated workflows",
					description:
						"Create tickets and track progress automatically",
					highlight: true,
				},
				{
					icon: Settings,
					title: "Custom integrations",
					description:
						"Connect with your existing dev tools and workflows",
				},
			],
		},
		{
			id: "crm",
			name: "CRM Integration",
			label: "CRM Integration",
			title: "Keep your CRM updated",
			subtitle: "automatically in real-time",
			icon: BarChart3,
			features: [
				{
					icon: BarChart3,
					title: "Salesforce & HubSpot",
					description:
						"Seamless integration with major CRM platforms",
				},
				{
					icon: Zap,
					title: "Auto-sync everything",
					description:
						"Contacts, deals, and activities updated automatically",
					highlight: true,
				},
				{
					icon: TrendingUp,
					title: "Real-time updates",
					description:
						"Never miss a beat with instant CRM synchronization",
				},
			],
		},
		{
			id: "sentiment",
			name: "Sentiment Analysis",
			label: "Sentiment Analysis",
			title: "Understand customer emotions",
			subtitle: "in real-time during calls",
			icon: Heart,
			features: [
				{
					icon: Heart,
					title: "Real-time sentiment",
					description:
						"Track emotional tone and engagement throughout calls",
				},
				{
					icon: TrendingUp,
					title: "Buying signals",
					description:
						"Identify positive signals and buying intent automatically",
					highlight: true,
				},
				{
					icon: Activity,
					title: "Sentiment timeline",
					description:
						"Visualize sentiment changes over the conversation",
				},
			],
		},
		{
			id: "custom-goals",
			name: "Custom Goals",
			label: "Custom Goals",
			title: "Track what matters",
			subtitle: "to your business",
			icon: Target,
			features: [
				{
					icon: Target,
					title: "Custom metrics",
					description:
						"Define and track goals specific to your sales process",
				},
				{
					icon: Settings,
					title: "Flexible configuration",
					description:
						"Set up goals that align with your business objectives",
					highlight: true,
				},
				{
					icon: TrendingUp,
					title: "Progress tracking",
					description:
						"Monitor progress toward your custom goals in real-time",
				},
			],
		},
	];

	// Reactive breakpoints using Svelte 5 $derived
	let isMobile = $derived(
		innerWidth.current ? innerWidth.current < 768 : false,
	);
	let isTablet = $derived(
		innerWidth.current
			? innerWidth.current >= 768 && innerWidth.current < 1024
			: false,
	);
	let isDesktop = $derived(
		innerWidth.current ? innerWidth.current >= 1024 : true,
	);

	let visibleSections = $state({
		hero: false,
		products: false,
		features: false,
		showcase: false,
		demo: false,
		testimonials: false,
		cta: false,
	});

	// Sample transcript data for demo
	const transcriptMessages = [
		{
			speaker: "Client",
			text: "How does your platform handle real-time data?",
			time: "0:23",
			sentiment: "curious",
		},
		{
			speaker: "You",
			text: "Great question! Our platform uses Server-Sent Events for instant streaming...",
			time: "0:25",
			sentiment: "confident",
		},
		{
			speaker: "Client",
			text: "That sounds impressive. What about pricing?",
			time: "0:42",
			sentiment: "interested",
		},
		{
			speaker: "You",
			text: "We have flexible plans starting at $49/month...",
			time: "0:44",
			sentiment: "positive",
		},
	];

	onMount(() => {
		// Initialize theme
		themeStore.init();
		const unsubscribeTheme = themeStore.subscribe((value) => {
			theme = value;
		});

		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		const handleMouseMove = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleSections[entry.target.dataset.section] = true;
						entry.target.classList.add("visible");
					}
				});
			},
			{ threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
		);

		document.querySelectorAll("[data-section]").forEach((el) => {
			observer.observe(el);
		});
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("mousemove", handleMouseMove);

		// Trigger hero animation immediately
		visibleSections.hero = true;

		// Animated counter for demo
		const sentimentInterval = setInterval(() => {
			sentimentScore = Math.min(sentimentScore + 1, 87);
			buyingSignals = Math.min(buyingSignals + 1, 12);
		}, 100);

		// Transcript cycling
		const transcriptInterval = setInterval(() => {
			transcriptIndex = (transcriptIndex + 1) % transcriptMessages.length;
		}, 3000);

		// Showcase rotation every 5 seconds (only when not paused)
		let showcaseInterval = null;
		const startShowcaseRotation = () => {
			if (showcaseInterval) clearInterval(showcaseInterval);
			showcaseInterval = setInterval(() => {
				if (!isPaused && !isTransitioning) {
					isTransitioning = true;
					setTimeout(() => {
						currentShowcaseIndex =
							(currentShowcaseIndex + 1) % showcases.length;
						setTimeout(() => {
							isTransitioning = false;
						}, 300);
					}, 200);
				}
			}, 5000);
		};
		startShowcaseRotation();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("mousemove", handleMouseMove);
			observer.disconnect();
			clearInterval(sentimentInterval);
			clearInterval(transcriptInterval);
			if (showcaseInterval) clearInterval(showcaseInterval);
			unsubscribeTheme();
		};
	});

	function scrollToSection(id) {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	}

	function handleTilt(event, intensity = 8) {
		const card = event.currentTarget;
		const rect = card.getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width - 0.5) * intensity;
		const y = ((event.clientY - rect.top) / rect.height - 0.5) * intensity;

		card.style.setProperty("--tilt-x", `${-y}deg`);
		card.style.setProperty("--tilt-y", `${x}deg`);
		card.style.setProperty(
			"--glow-x",
			`${((event.clientX - rect.left) / rect.width) * 100}%`,
		);
		card.style.setProperty(
			"--glow-y",
			`${((event.clientY - rect.top) / rect.height) * 100}%`,
		);
	}

	function resetTilt(event) {
		const card = event.currentTarget;
		card.style.setProperty("--tilt-x", "0deg");
		card.style.setProperty("--tilt-y", "0deg");
		card.style.setProperty("--glow-x", "50%");
		card.style.setProperty("--glow-y", "50%");
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page-shell">
	<div class="page-bg">
		<!-- Background layers for other sections (not hero) -->
		<div class="bg-layer grid-layer"></div>
		<div class="bg-layer vignette-top"></div>
		<div class="bg-layer vignette-bottom"></div>
		<div class="bg-layer orb orb-1"></div>
		<div class="bg-layer orb orb-2"></div>
		<div class="bg-layer orb orb-3"></div>
	</div>

	<div class="page-content relative z-10">
		<!-- Contextual AI Style Hero Section -->
		<section
			data-section="hero"
			class="relative flex items-center overflow-hidden bg-background contextual-hero"
		>
			<!-- Abstract Iridescent Graphic (Right Side) -->
			<div
				class="contextual-graphic"
				style={`transform: translate(${mouseX * 0.008}px, ${mouseY * 0.008}px);`}
			>
				<div class="iridescent-tube tube-1"></div>
				<div class="iridescent-tube tube-2"></div>
				<div class="iridescent-tube tube-3"></div>
				<div class="iridescent-tube tube-4"></div>
				<div class="iridescent-tube tube-5"></div>
				<div class="iridescent-tube tube-6"></div>
			</div>
			<div class="glass-loop-container" aria-hidden="true">
				<div class="glass-loop base"></div>
				<div class="glass-loop highlight"></div>
				<div class="glass-loop sheen"></div>
			</div>

			<!-- Content Container -->
			<div
				class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full hero-panel-inner"
			>
				<div
					class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center hero-grid-shell"
				>
					<!-- Left Column: Text Content -->
					<div
						class="contextual-content max-w-2xl lg:max-w-3xl mx-auto lg:mx-0 transform transition-all duration-1000 {visibleSections.hero
							? 'translate-y-0 opacity-100'
							: 'translate-y-10 opacity-0'}"
					>
						<!-- Main Headline -->
						<h1 class="contextual-headline mb-8 lg:mb-10">
							<span class="block">Sell Like a CEO</span>
						</h1>

						<!-- Sub-headline -->
						<p
							class="contextual-subheadline mb-10 lg:mb-12 text-muted-foreground leading-relaxed max-w-[540px]"
						>
							The rise of the singular rep starts here
						</p>

						<!-- CTA Button -->
						<a
							href="/contact-sales"
							onmousemove={(event) => handleTilt(event, 8)}
							onmouseleave={resetTilt}
							class="tilt-card contextual-cta group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-base transition-all duration-300 hover:scale-[1.02] overflow-hidden"
						>
							<span class="relative z-10">Request a Demo</span>
							<span
								class="cta-icon relative z-10 grid place-items-center"
							>
								<ArrowRight
									class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
								/>
							</span>
						</a>
					</div>

					<!-- Right Column: Abstract Graphic (Mobile: Hidden, shown in background) -->
					<div class="hidden lg:block relative h-full min-h-[600px]">
						<!-- Graphic is positioned absolutely in contextual-graphic -->
					</div>
				</div>
			</div>

			<!-- Smooth transition to next section -->
			<div
				class="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background pointer-events-none z-20"
			></div>
		</section>

		<!-- Interactive Showcase Section -->
		<section
			id="showcase"
			data-section="showcase"
			class="py-24 sm:py-32 bg-background relative overflow-hidden showcase-section transform transition-all duration-1000 {visibleSections.showcase
				? 'translate-y-0 opacity-100'
				: 'translate-y-10 opacity-0'}"
		>
			<!-- Enhanced Background effects -->
			<div class="absolute inset-0 overflow-hidden">
				<!-- Grid pattern overlay -->
				<div
					class="absolute inset-0 showcase-grid-pattern opacity-20"
				></div>
			</div>

			<div class="relative z-10 max-w-7xl mx-auto px-6">
				<!-- Header -->
				<div
					class="text-center mb-8 transform transition-all duration-1000 {visibleSections.showcase
						? 'translate-y-0 opacity-100'
						: 'translate-y-10 opacity-0'}"
				>
					<span
						class="text-xs sm:text-sm font-bold text-red-500 tracking-widest uppercase"
						>All Features</span
					>
					<h2
						class="text-3xl sm:text-4xl md:text-5xl font-black mt-4 mb-4 text-foreground tracking-tight leading-tight"
					>
						Experience Every Feature
					</h2>
					<p
						class="text-base text-muted-foreground max-w-2xl mx-auto"
					>
						Explore our complete suite of AI-powered features with
						interactive demos.
					</p>
				</div>

				<!-- Split Layout Showcase Container -->
				<div
					class="relative h-[1100px] lg:h-[650px] showcase-overlap-grid"
					role="region"
					aria-label="Interactive feature showcase"
					onmouseenter={() => (isPaused = true)}
					onmouseleave={() => (isPaused = false)}
					bind:this={showcaseContainerRef}
				>
					{#each showcases as showcase, i}
						{#if currentShowcaseIndex === i}
							{@const IconComponent = showcase.icon}
							<div
								class="showcase-split-container"
								in:fade={{ duration: 400 }}
								out:fade={{ duration: 300 }}
							>
								<!-- Desktop Layout: Split -->
								<div
									class="hidden lg:grid lg:grid-cols-2 gap-10 items-center h-full"
								>
									<!-- Left Column - Feature Info -->
									<div
										class="space-y-6 showcase-left-content"
									>
										<!-- Label Badge -->
										<div
											class="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 backdrop-blur-md rounded-full border border-red-500/20 shadow-lg shadow-red-500/10 showcase-badge"
											in:fly={{
												x: -20,
												duration: 600,
												delay: 100,
											}}
										>
											<div class="relative">
												<IconComponent
													class="w-4 h-4 text-red-400 relative z-10"
												/>
												<div
													class="absolute inset-0 bg-red-500/20 rounded-full blur-md animate-pulse"
												></div>
											</div>
											<span
												class="text-xs font-bold text-red-300 uppercase tracking-wider"
												>{showcase.label}</span
											>
										</div>

										<!-- Title -->
										<h3
											class="text-3xl md:text-4xl lg:text-5xl font-black leading-tight showcase-title"
											in:fly={{
												x: -20,
												duration: 700,
												delay: 200,
											}}
										>
											<span
												class="text-foreground block mb-2"
												>{showcase.title}</span
											>
											<span
												class="text-foreground block font-bold"
												>{showcase.subtitle}</span
											>
										</h3>

										<!-- Feature Cards -->
										<div
											class="space-y-3 showcase-features"
										>
											{#each showcase.features as feature, idx}
												{@const FeatureIcon =
													feature.icon}
												<div
													class="feature-card group relative bg-card/60 backdrop-blur-md rounded-xl p-4 border border-border/50 transition-all duration-500 {feature.highlight
														? 'border-red-500/40 border-l-4 border-l-red-500 shadow-lg shadow-red-500/10'
														: ''} hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
													in:fly={{
														x: -30,
														duration: 600,
														delay: 300 + idx * 100,
													}}
												>
													<!-- Animated background gradient -->
													<div
														class="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
													></div>

													<div
														class="flex items-start gap-3 relative z-10"
													>
														<div class="relative">
															<div
																class="w-10 h-10 rounded-lg {feature.highlight
																	? 'bg-red-500/20'
																	: 'bg-secondary/60'} flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
															>
																<FeatureIcon
																	class="w-5 h-5 {feature.highlight
																		? 'text-red-400'
																		: 'text-muted-foreground group-hover:text-foreground'} transition-colors duration-300"
																/>
															</div>
															{#if feature.highlight}
																<div
																	class="absolute -inset-1 bg-red-500/20 dark:bg-red-500/20 bg-red-400/30 rounded-lg blur-sm animate-pulse"
																></div>
															{/if}
														</div>
														<div
															class="flex-1 min-w-0"
														>
															<h4
																class="font-bold text-foreground mb-1.5 text-sm group-hover:text-primary-foreground transition-colors duration-300"
															>
																{feature.title}
															</h4>
															<p
																class="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300"
															>
																{feature.description}
															</p>
														</div>
													</div>
												</div>
											{/each}
										</div>

										<!-- CTA -->
										<a
											href="/features/{showcase.id}"
											class="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold group text-sm showcase-cta relative overflow-hidden"
											in:fly={{
												x: -20,
												duration: 600,
												delay: 600,
											}}
										>
											<span class="relative z-10"
												>Learn more about {showcase.name.toLowerCase()}</span
											>
											<ArrowRight
												class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300 relative z-10"
											/>
											<div
												class="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"
											></div>
										</a>
									</div>

									<!-- Right Column - Showcase Widget -->
									<div class="relative showcase-widget">
										<div
											class="relative bg-card/90 backdrop-blur-2xl rounded-3xl border border-border/60 p-5 shadow-2xl showcase-widget-container"
											in:fly={{
												x: 30,
												duration: 800,
												delay: 200,
											}}
										>
											<!-- Multi-layer glow effects -->
											<div
												class="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-red-500/10 to-blue-600/20 rounded-3xl blur-2xl opacity-60 animate-pulse"
											></div>
											<div
												class="absolute -inset-0.5 bg-gradient-to-r from-red-500/10 via-transparent to-blue-500/10 rounded-3xl blur-xl"
											></div>

											<!-- Animated border -->
											<div
												class="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-red-500/20 via-transparent to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"
												style="mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; padding: 2px;"
											></div>

											<div class="relative z-10">
												{#if showcase.id === "ai-assistance"}
													<AIAssistanceShowcase
														bind:selectedQuestion={
															aiSelectedQuestion
														}
														bind:isAutoPlaying={
															aiIsAutoPlaying
														}
														mouseX={0}
														mouseY={0}
														height="500px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "notetaker"}
													<NotetakerShowcase
														bind:activeTab={
															notetakerActiveTab
														}
														bind:selectedTemplate={
															notetakerSelectedTemplate
														}
														bind:isAutoPlaying={
															notetakerIsAutoPlaying
														}
														mouseX={0}
														mouseY={0}
														height="500px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "followup"}
													<FollowupShowcase
														bind:activeFeature={
															followupActiveFeature
														}
														bind:isAutoPlaying={
															followupIsAutoPlaying
														}
														mouseX={0}
														mouseY={0}
														height="500px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "simulator"}
													<SimulatorShowcase
														bind:simulationActive={
															simulatorActive
														}
														bind:isPaused={
															simulatorPaused
														}
														bind:selectedScenario={
															simulatorScenario
														}
														bind:currentDialogueIndex={
															simulatorDialogueIndex
														}
														bind:showCoaching={
															simulatorShowCoaching
														}
														bind:hoveredDialogue={
															simulatorHoveredDialogue
														}
														mouseX={0}
														mouseY={0}
														height="500px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "dev-tools"}
													<DevToolsShowcase
														mouseX={0}
														mouseY={0}
														height="500px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "crm"}
													<CRMShowcase
														mouseX={0}
														mouseY={0}
														height="500px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "sentiment"}
													<SentimentShowcase
														bind:currentSentiment={
															sentimentCurrent
														}
														bind:sentimentScore={
															sentimentShowcaseScore
														}
														mouseX={0}
														mouseY={0}
														height="500px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "custom-goals"}
													<CustomGoalsShowcase
														mouseX={0}
														mouseY={0}
														height="500px"
														showAppChrome={true}
													/>
												{/if}
											</div>
										</div>
									</div>
								</div>

								<!-- Mobile Layout: Stacked -->
								<div
									class="lg:hidden space-y-6 showcase-mobile-content"
								>
									<!-- Mobile: Widget First -->
									<div
										class="relative showcase-widget-mobile"
									>
										<div
											class="relative bg-gradient-to-br from-card/90 via-card/80 to-card/90 backdrop-blur-2xl rounded-2xl border border-border/60 p-4 shadow-2xl"
										>
											<div
												class="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-red-500/10 to-blue-600/20 rounded-2xl blur-xl opacity-50"
											></div>
											<div class="relative z-10">
												{#if showcase.id === "ai-assistance"}
													<AIAssistanceShowcase
														bind:selectedQuestion={
															aiSelectedQuestion
														}
														bind:isAutoPlaying={
															aiIsAutoPlaying
														}
														mouseX={0}
														mouseY={0}
														height="400px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "notetaker"}
													<NotetakerShowcase
														bind:activeTab={
															notetakerActiveTab
														}
														bind:selectedTemplate={
															notetakerSelectedTemplate
														}
														bind:isAutoPlaying={
															notetakerIsAutoPlaying
														}
														mouseX={0}
														mouseY={0}
														height="400px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "followup"}
													<FollowupShowcase
														bind:activeFeature={
															followupActiveFeature
														}
														bind:isAutoPlaying={
															followupIsAutoPlaying
														}
														mouseX={0}
														mouseY={0}
														height="400px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "simulator"}
													<SimulatorShowcase
														bind:simulationActive={
															simulatorActive
														}
														bind:isPaused={
															simulatorPaused
														}
														bind:selectedScenario={
															simulatorScenario
														}
														bind:currentDialogueIndex={
															simulatorDialogueIndex
														}
														bind:showCoaching={
															simulatorShowCoaching
														}
														bind:hoveredDialogue={
															simulatorHoveredDialogue
														}
														mouseX={0}
														mouseY={0}
														height="400px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "dev-tools"}
													<DevToolsShowcase
														mouseX={0}
														mouseY={0}
														height="400px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "crm"}
													<CRMShowcase
														mouseX={0}
														mouseY={0}
														height="400px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "sentiment"}
													<SentimentShowcase
														bind:currentSentiment={
															sentimentCurrent
														}
														bind:sentimentScore={
															sentimentShowcaseScore
														}
														mouseX={0}
														mouseY={0}
														height="400px"
														showAppChrome={true}
													/>
												{:else if showcase.id === "custom-goals"}
													<CustomGoalsShowcase
														mouseX={0}
														mouseY={0}
														height="400px"
														showAppChrome={true}
													/>
												{/if}
											</div>
										</div>
									</div>

									<!-- Mobile: Info Below -->
									<div class="space-y-4">
										<!-- Label Badge -->
										<div
											class="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent backdrop-blur-md rounded-full border border-red-500/20"
										>
											<IconComponent
												class="w-3.5 h-3.5 text-red-400"
											/>
											<span
												class="text-[10px] font-bold text-red-300 uppercase tracking-wider"
												>{showcase.label}</span
											>
										</div>

										<!-- Title -->
										<h3
											class="text-2xl font-black leading-tight"
										>
											<span
												class="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent block mb-1"
												>{showcase.title}</span
											>
											<span
												class="text-foreground block text-lg"
												>{showcase.subtitle}</span
											>
										</h3>

										<!-- Feature Cards (Compact) -->
										<div class="space-y-2">
											{#each showcase.features as feature, idx}
												{@const FeatureIcon =
													feature.icon}
												<div
													class="bg-card/60 backdrop-blur-sm rounded-lg p-3 border {feature.highlight
														? 'border-primary/30 border-l-2 border-l-primary'
														: 'border-border/50'}"
												>
													<div
														class="flex items-start gap-2.5"
													>
														<div
															class="w-8 h-8 rounded-lg {feature.highlight
																? 'bg-primary/10'
																: 'bg-secondary/50'} flex items-center justify-center flex-shrink-0"
														>
															<FeatureIcon
																class="w-4 h-4 {feature.highlight
																	? 'text-primary'
																	: 'text-muted-foreground'}"
															/>
														</div>
														<div
															class="flex-1 min-w-0"
														>
															<h4
																class="font-bold text-foreground mb-0.5 text-xs"
															>
																{feature.title}
															</h4>
															<p
																class="text-[10px] text-muted-foreground leading-relaxed"
															>
																{feature.description}
															</p>
														</div>
													</div>
												</div>
											{/each}
										</div>

										<!-- CTA -->
										<a
											href="/features/{showcase.id}"
											class="inline-flex items-center gap-2 text-red-400 hover:text-red-300 font-semibold text-xs"
										>
											<span>Learn more</span>
											<ArrowRight class="w-3.5 h-3.5" />
										</a>
									</div>
								</div>
							</div>
						{/if}
					{/each}
				</div>

				<!-- Navigation Icons - Desktop -->
				<div
					class="hidden md:flex justify-center gap-2 mt-10 showcase-navigation"
				>
					{#each showcases as showcase, i}
						{@const IconComponent = showcase.icon}
						<button
							onclick={() => {
								if (
									currentShowcaseIndex !== i &&
									!isTransitioning
								) {
									isTransitioning = true;
									setTimeout(() => {
										currentShowcaseIndex = i;
										setTimeout(() => {
											isTransitioning = false;
										}, 300);
									}, 400);
								}
							}}
							class="group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-500 ease-out {currentShowcaseIndex ===
							i
								? 'bg-gradient-to-br from-red-500/30 to-red-600/20 dark:from-red-500/30 dark:to-red-600/20 from-red-100 to-red-50 text-red-300 dark:text-red-300 text-red-700 border-2 border-red-500/50 dark:border-red-500/50 border-red-400/60 shadow-lg shadow-red-500/30 dark:shadow-red-500/30 shadow-red-200/40 scale-110'
								: 'text-zinc-500 dark:text-zinc-500 text-gray-600 hover:text-zinc-300 dark:hover:text-zinc-300 hover:text-gray-800 hover:bg-zinc-800/60 dark:hover:bg-zinc-800/60 hover:bg-gray-100/80 border-2 border-zinc-800/50 dark:border-zinc-800/50 border-gray-200/60 hover:border-zinc-700/70 dark:hover:border-zinc-700/70 hover:border-gray-300/80 hover:scale-105'} backdrop-blur-md"
							aria-label={`Show ${showcase.name}`}
							title={showcase.name}
						>
							<div class="relative z-10">
								<IconComponent
									class="w-5 h-5 transition-all duration-300 {currentShowcaseIndex ===
									i
										? 'text-red-400 scale-110'
										: 'group-hover:rotate-12 group-hover:scale-110'}"
								/>
								{#if currentShowcaseIndex === i}
									<div
										class="absolute inset-0 bg-red-500/40 rounded-full blur-lg animate-ping"
									></div>
									<div
										class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"
									></div>
								{/if}
							</div>
							<!-- Hover glow effect -->
							<div
								class="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/15 to-red-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
							></div>
						</button>
					{/each}
				</div>

				<!-- Navigation Icons - Mobile (Scrollable) -->
				<div class="md:hidden mt-8 showcase-navigation-mobile">
					<div
						class="flex gap-2 overflow-x-auto pb-2 px-2 -mx-2 scrollbar-hide"
					>
						{#each showcases as showcase, i}
							{@const IconComponent = showcase.icon}
							<button
								onclick={() => {
									if (
										currentShowcaseIndex !== i &&
										!isTransitioning
									) {
										isTransitioning = true;
										setTimeout(() => {
											currentShowcaseIndex = i;
											setTimeout(() => {
												isTransitioning = false;
											}, 300);
										}, 400);
									}
								}}
								class="group relative flex-shrink-0 w-14 h-14 flex flex-col items-center justify-center rounded-xl transition-all duration-500 ease-out {currentShowcaseIndex ===
								i
									? 'bg-gradient-to-br from-red-500/30 to-red-600/20 dark:from-red-500/30 dark:to-red-600/20 from-red-100 to-red-50 text-red-300 dark:text-red-300 text-red-700 border-2 border-red-500/50 dark:border-red-500/50 border-red-400/60 shadow-lg shadow-red-500/30 dark:shadow-red-500/30 shadow-red-200/40 scale-105'
									: 'text-zinc-500 dark:text-zinc-500 text-gray-600 hover:text-zinc-300 dark:hover:text-zinc-300 hover:text-gray-800 bg-zinc-800/40 dark:bg-zinc-800/40 bg-gray-100/80 border-2 border-zinc-800/50 dark:border-zinc-800/50 border-gray-200/60'} backdrop-blur-md"
								aria-label={`Show ${showcase.name}`}
							>
								<div class="relative">
									<IconComponent
										class="w-5 h-5 transition-all duration-300 {currentShowcaseIndex ===
										i
											? 'text-red-400 dark:text-red-400 text-red-600 scale-110'
											: 'group-hover:scale-110'}"
									/>
									{#if currentShowcaseIndex === i}
										<div
											class="absolute inset-0 bg-red-500/40 dark:bg-red-500/40 bg-red-400/50 rounded-full blur-lg animate-pulse"
										></div>
									{/if}
								</div>
								<span
									class="text-[9px] font-semibold mt-1 text-center leading-tight {currentShowcaseIndex ===
									i
										? 'text-red-300 dark:text-red-300 text-red-700'
										: 'text-zinc-500 dark:text-zinc-500 text-gray-600'}"
								>
									{showcase.name.split(" ")[0]}
								</span>
							</button>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<section
			id="testimonials"
			data-section="testimonials"
			class="py-24 sm:py-32 bg-background relative overflow-hidden transform transition-all duration-1000 {visibleSections.testimonials
				? 'translate-y-0 opacity-100'
				: 'translate-y-10 opacity-0'}"
		>
			<div
				class="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background dark:from-background dark:via-transparent dark:to-background from-transparent via-transparent to-transparent z-10 pointer-events-none"
			></div>
			<div class="absolute inset-0 overflow-hidden">
				{#each Array(15) as _, i}
					<div
						class="absolute w-1 h-1 bg-red-500/20 dark:bg-red-500/20 bg-red-500/10 rounded-full animate-particle-float"
						style="left: {Math.random() *
							100}%; top: {Math.random() *
							100}%; animation-delay: {Math.random() *
							5}s; animation-duration: {10 + Math.random() * 5}s;"
					></div>
				{/each}
			</div>
			<div
				class="text-center mb-12 sm:mb-16 px-4 transform transition-all duration-1000 {visibleSections.testimonials
					? 'translate-y-0 opacity-100'
					: 'translate-y-10 opacity-0'} relative z-20"
			>
				<span
					class="text-xs sm:text-sm font-bold text-red-500 dark:text-red-500 tracking-widest uppercase animate-fade-in-up"
					>Trusted by Sales Leaders</span
				>
				<h2
					class="text-3xl sm:text-4xl md:text-6xl font-black mt-4 mb-6 text-foreground tracking-tight animate-fade-in-up leading-tight"
					style="animation-delay: 0.1s;"
				>
					AI That Empowers<br />
					<span
						class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
						>Sales & Dev Teams</span
					>
				</h2>
			</div>
			<div class="relative overflow-hidden group/marquee">
				<!-- Fade gradients for seamless edges -->
				<div
					class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
				></div>
				<div
					class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
				></div>

				<div
					class="flex gap-6 py-4 animate-marquee hover:pause whitespace-nowrap"
				>
					{#each [{ quote: "The real-time knowledge agent gives me instant answers during calls. No more fumbling through docs mid-pitch.", author: "Alex Rivera", role: "Senior Sales Engineer", metric: "5x", metricLabel: "Faster Responses" }, { quote: "Call simulator helped our team practice objection handling. We're closing 40% more deals since implementation.", author: "Sarah Thompson", role: "Sales Director", metric: "40%", metricLabel: "More Deals Closed" }, { quote: "Automatic FOLLOW-UP & PLANNING saves hours every week. CRM integration means zero manual data entry.", author: "Michael Chen", role: "Account Executive", metric: "15hrs", metricLabel: "Saved Weekly" }, { quote: "The insight engine identified budget issues early. We stopped wasting time on deals that wouldn't close.", author: "Jessica Lee", role: "VP of Sales", metric: "25%", metricLabel: "Efficiency Gain" }, { quote: "The real-time knowledge agent gives me instant answers during calls. No more fumbling through docs mid-pitch.", author: "Alex Rivera", role: "Senior Sales Engineer", metric: "5x", metricLabel: "Faster Responses" }, { quote: "Call simulator helped our team practice objection handling. We're closing 40% more deals since implementation.", author: "Sarah Thompson", role: "Sales Director", metric: "40%", metricLabel: "More Deals Closed" }, { quote: "Automatic FOLLOW-UP & PLANNING saves hours every week. CRM integration means zero manual data entry.", author: "Michael Chen", role: "Account Executive", metric: "15hrs", metricLabel: "Saved Weekly" }, { quote: "The insight engine identified budget issues early. We stopped wasting time on deals that wouldn't close.", author: "Jessica Lee", role: "VP of Sales", metric: "25%", metricLabel: "Efficiency Gain" }] as testimonial, i}
						<div
							onmousemove={(event) => handleTilt(event, 6)}
							onmouseleave={resetTilt}
							role="group"
							aria-label={`Testimonial from ${testimonial.author}`}
							class="tilt-card relative flex-shrink-0 w-96 bg-card border border-border rounded-lg p-6 hover:border-primary/50 hover:border-primary transition-all duration-500 group hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20 cursor-pointer overflow-hidden"
							style="transform: translate3d(0, 0, 0);"
						>
							<div
								class="absolute inset-0 bg-gradient-to-br from-red-950/0 to-red-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
							></div>
							<div class="flex items-start gap-4 mb-4 relative">
								<div class="flex-shrink-0">
									<div
										class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 relative"
									>
										{testimonial.author[0]}
										<div
											class="absolute inset-0 bg-red-500 rounded-full opacity-0 group-hover:opacity-20 animate-ping"
										></div>
									</div>
								</div>
								<div class="flex-1">
									<p
										class="font-bold text-foreground text-sm group-hover:text-primary-foreground transition-colors"
									>
										{testimonial.author}
									</p>
									<p
										class="text-xs text-muted-foreground font-semibold"
									>
										{testimonial.role}
									</p>
								</div>
								<div class="text-right">
									<div
										class="text-2xl font-black text-primary group-hover:scale-110 transition-transform duration-300"
									>
										{testimonial.metric}
									</div>
									<div
										class="text-[10px] text-muted-foreground uppercase tracking-wider"
									>
										{testimonial.metricLabel}
									</div>
								</div>
							</div>
							<p
								class="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/90 transition-colors relative font-medium"
							>
								{testimonial.quote}
							</p>
						</div>
					{/each}
				</div>
			</div>
			<div class="mt-20 max-w-7xl mx-auto px-6 relative z-20">
				<div
					class="bg-card border border-border/30 rounded-lg p-8 hover:border-border/50 hover:border-primary/60 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 group"
					style="transform: translate3d(0, 0, 0); backdrop-filter: blur(24px) saturate(200%) brightness(1.05);"
				>
					<div
						class="absolute inset-0 bg-gradient-to-br from-red-950/0 to-red-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
					></div>
					<div class="text-center mb-8 relative">
						<h3
							class="text-2xl font-black text-foreground mb-2 group-hover:text-primary transition-colors"
						>
							Built for Sales & Dev Teams
						</h3>
						<p
							class="text-muted-foreground group-hover:text-muted-foreground/80 transition-colors font-semibold"
						>
							Powerful conversational AI that integrates with your
							entire workflow
						</p>
					</div>
					<div class="grid md:grid-cols-3 gap-8 relative">
						{#each [{ number: "01", title: "Universal Integrations", description: "Connects with Salesforce, HubSpot, monday.com, Jira, Asana, Slack, Teams & more" }, { number: "02", title: "Real-Time Intelligence", description: "AI-powered insights during every sales conversation" }, { number: "03", title: "Auto Follow-Up & Tracking", description: "Never miss a task with intelligent automation and CRM sync" }] as feature, i}
							<div
								class="group/item relative animate-fade-in-up"
								style="animation-delay: {i * 0.1}s;"
							>
								<div
									class="absolute -top-4 left-0 text-6xl font-black text-primary/20 opacity-50 group-hover/item:opacity-100 group-hover/item:text-primary/40 group-hover/item:text-primary transition-all duration-500 group-hover/item:scale-110"
								>
									{feature.number}
								</div>
								<div class="relative pt-8">
									<h4
										class="text-lg font-bold text-foreground mb-2 group-hover/item:text-primary transition-colors"
									>
										{feature.title}
									</h4>
									<p
										class="text-sm text-muted-foreground group-hover/item:text-muted-foreground transition-colors font-semibold"
									>
										{feature.description}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</section>

		<section
			data-section="cta"
			class="py-24 sm:py-32 bg-background relative overflow-hidden transform transition-all duration-1000 {visibleSections.cta
				? 'translate-y-0 opacity-100'
				: 'translate-y-10 opacity-0'}"
		>
			<div class="absolute inset-0">
				<div
					class="absolute inset-0 animate-grid-pulse"
					style="background-image: linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px); background-size: 50px 50px;"
				></div>
				<div
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 dark:bg-red-600/10 bg-red-500/5 rounded-full blur-3xl animate-pulse"
				></div>
				<div
					class="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 dark:bg-red-500/5 bg-red-400/3 rounded-full blur-2xl animate-float"
				></div>
				<div
					class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-700/5 dark:bg-red-700/5 bg-red-500/3 rounded-full blur-3xl animate-float-delayed"
				></div>
				{#each Array(25) as _, i}
					<div
						class="absolute w-1 h-1 bg-red-500/20 dark:bg-red-500/20 bg-red-500/10 rounded-full animate-particle-float"
						style="left: {Math.random() *
							100}%; top: {Math.random() *
							100}%; animation-delay: {Math.random() *
							5}s; animation-duration: {12 + Math.random() * 6}s;"
					></div>
				{/each}
			</div>

			<div
				class="relative z-10 max-w-4xl mx-auto px-6 text-center transform transition-all duration-1000 {visibleSections.cta
					? 'translate-y-0 opacity-100'
					: 'translate-y-10 opacity-0'}"
			>
				<h2
					class="text-4xl sm:text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tight leading-tight sm:leading-none animate-fade-in-up"
				>
					Empower Your Sales Team<br />
					<span class="text-red-500"> With AI Intelligence </span>
				</h2>
				<p
					class="text-lg sm:text-xl text-muted-foreground mb-10 sm:mb-12 max-w-2xl mx-auto font-semibold animate-fade-in-up"
					style="animation-delay: 0.2s;"
				>
					Join sales teams accelerating revenue with conversational
					AI. Real-time insights, automated follow-ups, and seamless
					integrations.
				</p>
				<div
					class="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up"
					style="animation-delay: 0.4s;"
				>
					<button
						onclick={onboardingStore.start}
						onmousemove={(event) => handleTilt(event, 12)}
						onmouseleave={resetTilt}
						class="tilt-card group relative px-8 py-5 bg-gradient-to-r from-primary to-red-700 text-primary-foreground rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-1"
					>
						<span
							class="relative z-10 flex items-center justify-center gap-2"
						>
							Start Free Trial
							<svg
								class="w-5 h-5 group-hover:translate-x-1 transition-transform"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
						</span>
						<div
							class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						></div>
						<div
							class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"
						></div>
					</button>
					<a
						href="/contact-sales"
						onmousemove={(event) => handleTilt(event, 10)}
						onmouseleave={resetTilt}
						class="tilt-card relative px-8 py-5 bg-transparent text-foreground rounded-xl font-semibold text-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 text-center hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 overflow-hidden"
					>
						Contact Sales
					</a>
				</div>
				<p
					class="mt-6 text-muted-foreground text-sm animate-fade-in-up font-semibold"
					style="animation-delay: 0.6s;"
				>
					Free forever plan • No credit card required • Quick setup
				</p>
			</div>
		</section>

		<footer
			class="bg-background text-foreground py-16 border-t border-border relative overflow-hidden"
		>
			<div class="absolute inset-0 opacity-30">
				<div
					class="absolute inset-0"
					style="background-image: linear-gradient(rgba(220, 38, 38, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.02) 1px, transparent 1px); background-size: 30px 30px;"
				></div>
			</div>

			<div class="max-w-7xl mx-auto px-6 relative z-10">
				<div class="grid md:grid-cols-5 gap-12 mb-12">
					<div class="md:col-span-2">
						<div
							class="flex items-center gap-3 mb-4 group cursor-pointer"
						>
							<div class="relative">
								<div
									class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"
								></div>
								<div
									class="relative bg-background p-1.5 rounded-lg border border-border group-hover:border-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
								>
									<img
										src="/Spiked.ai-white-logo-icon-only.png"
										alt="SpikedAI Logo"
										class="h-6 w-6 object-contain"
									/>
								</div>
							</div>
							<span
								class="text-xl font-black tracking-tight group-hover:text-red-500 transition-colors duration-300"
							>
								SPIKED<span
									class="text-red-600 group-hover:text-red-400 transition-colors"
									>AI</span
								>
							</span>
						</div>
						<p
							class="text-muted-foreground text-sm mb-6 max-w-xs hover:text-foreground transition-colors"
						>
							Conversational AI for Sales Teams. Empower your team
							with real-time intelligence and automated workflows.
						</p>
						<div class="flex gap-4">
							<a
								href="https://www.linkedin.com/company/spiked-ai"
								target="_blank"
								rel="noopener noreferrer"
								class="p-2 bg-secondary hover:bg-primary/20 border border-border hover:border-primary/50 rounded transition-all duration-300 group hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
								aria-label="Follow us on LinkedIn"
							>
								<svg
									class="w-4 h-4 fill-muted-foreground group-hover:fill-primary transition-colors"
									viewBox="0 0 24 24"
								>
									<path
										d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
									/>
								</svg>
							</a>
						</div>
					</div>

					<div class="group">
						<h4
							class="font-bold text-foreground mb-4 text-sm tracking-wider uppercase group-hover:text-primary transition-colors"
						>
							Features
						</h4>
						<ul class="space-y-2 text-muted-foreground text-sm">
							<li>
								<button
									class="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
									>Call Simulator</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Knowledge Agent</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Meeting AI</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Follow-Up Planner</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>CRM Integrations</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Analytics</button
								>
							</li>
						</ul>
					</div>

					<div class="group">
						<h4
							class="font-bold text-foreground mb-4 text-sm tracking-wider uppercase group-hover:text-primary transition-colors"
						>
							Integrations
						</h4>
						<ul class="space-y-2 text-muted-foreground text-sm">
							<li>
								<button
									class="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
									>Salesforce</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>HubSpot</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Jira</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Asana</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Slack</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Teams</button
								>
							</li>
						</ul>
					</div>

					<div class="group">
						<h4
							class="font-bold text-foreground mb-4 text-sm tracking-wider uppercase group-hover:text-primary transition-colors"
						>
							Company
						</h4>
						<ul class="space-y-2 text-muted-foreground text-sm">
							<li>
								<button
									onclick={() => scrollToSection("pricing")}
									class="hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
									>Pricing</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Customers</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Security</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Docs</button
								>
							</li>
							<li>
								<button
									class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block"
									>Contact</button
								>
							</li>
						</ul>
					</div>
				</div>

				<div class="border-t border-border pt-8">
					<div
						class="flex flex-col md:flex-row justify-between items-center gap-4"
					>
						<div
							class="text-center md:text-left text-muted-foreground text-sm hover:text-foreground transition-colors"
						>
							© 2025 SpikedAI. All rights reserved. <span
								class="hidden md:inline"
								>• 251 Rhode Island St, Suite 205, San
								Francisco, CA 94103</span
							>
						</div>
						<div class="flex gap-6 text-xs text-muted-foreground">
							<button
								class="hover:text-primary transition-all duration-300 hover:scale-105"
								>Privacy Policy</button
							>
							<button
								class="hover:text-red-500 transition-all duration-300 hover:scale-105"
								>Terms of Service</button
							>
							<button
								class="hover:text-red-500 transition-all duration-300 hover:scale-105"
								>Status</button
							>
						</div>
					</div>
				</div>
			</div>
		</footer>
		<OnboardingFlow />
	</div>
</div>

<style>
	/* ===== CONTEXTUAL AI HERO STYLES ===== */

	:global(:root) {
		--nav-height: 80px;
		--hero-panel-height: clamp(600px, calc(100dvh - var(--nav-height)), 1040px);
		--hero-panel-padding: clamp(2.5rem, 9vh, 6.5rem);
	}

	@supports not (height: 100dvh) {
		:global(:root) {
			--hero-panel-height: clamp(600px, calc(100vh - var(--nav-height)), 1040px);
		}
	}

	@media (max-height: 860px) {
		:global(:root) {
			--hero-panel-padding: clamp(2.25rem, 8vh, 5.75rem);
		}
	}

	/* Hero Background */
	.contextual-hero {
		position: relative;
		background-color: var(--background);
		isolation: isolate;
		min-height: var(--hero-panel-height);
	}

	.hero-panel-inner {
		padding-block: var(--hero-panel-padding);
	}

	.hero-grid-shell {
		min-height: clamp(520px, 70vh, 860px);
	}

	/* Contextual Graphic Container */
	.contextual-graphic {
		position: absolute;
		top: 50%;
		right: 5%;
		width: 600px;
		height: 600px;
		transform: translateY(-50%);
		opacity: 0.5;
		pointer-events: none;
		z-index: 1;
	}

	@media (max-width: 1024px) {
		.contextual-graphic {
			width: 400px;
			height: 400px;
			right: -10%;
			opacity: 0.3;
		}
	}

	@media (max-width: 768px) {
		.contextual-graphic {
			display: none;
		}
	}

	/* Iridescent Tubes */
	.iridescent-tube {
		position: absolute;
		border-radius: 100px;
		background: linear-gradient(
			135deg,
			rgba(59, 130, 246, 0.4) 0%,
			rgba(168, 85, 247, 0.4) 20%,
			rgba(236, 72, 153, 0.4) 40%,
			rgba(251, 146, 60, 0.4) 60%,
			rgba(34, 197, 94, 0.4) 80%,
			rgba(59, 130, 246, 0.4) 100%
		);
		backdrop-filter: blur(40px);
		border: 1.5px solid rgba(255, 255, 255, 0.3);
		box-shadow:
			0 20px 60px rgba(59, 130, 246, 0.2),
			0 10px 30px rgba(168, 85, 247, 0.15),
			inset 0 2px 4px rgba(255, 255, 255, 0.4),
			inset 0 -2px 4px rgba(0, 0, 0, 0.1);
		animation: iridescent-float 12s ease-in-out infinite;
		filter: blur(0.5px);
		opacity: 0.85;
	}

	/* Iridescent Tube Positions */
	.iridescent-tube.tube-1 {
		width: 140px;
		height: 500px;
		top: 15%;
		right: 20%;
		transform: rotate(35deg);
		animation-delay: 0s;
		border-radius: 70px;
		background: linear-gradient(
			135deg,
			rgba(59, 130, 246, 0.5) 0%,
			rgba(168, 85, 247, 0.4) 30%,
			rgba(236, 72, 153, 0.4) 60%,
			rgba(59, 130, 246, 0.5) 100%
		);
	}

	.iridescent-tube.tube-2 {
		width: 120px;
		height: 450px;
		top: 25%;
		right: 5%;
		transform: rotate(-25deg);
		animation-delay: 2s;
		border-radius: 60px;
		background: linear-gradient(
			135deg,
			rgba(236, 72, 153, 0.5) 0%,
			rgba(251, 146, 60, 0.4) 30%,
			rgba(34, 197, 94, 0.4) 60%,
			rgba(236, 72, 153, 0.5) 100%
		);
	}

	.iridescent-tube.tube-3 {
		width: 160px;
		height: 420px;
		top: 40%;
		right: 15%;
		transform: rotate(50deg);
		animation-delay: 4s;
		border-radius: 80px;
		background: linear-gradient(
			135deg,
			rgba(168, 85, 247, 0.5) 0%,
			rgba(59, 130, 246, 0.4) 30%,
			rgba(34, 197, 94, 0.4) 60%,
			rgba(168, 85, 247, 0.5) 100%
		);
	}

	.iridescent-tube.tube-4 {
		width: 100px;
		height: 480px;
		top: 10%;
		right: 35%;
		transform: rotate(-40deg);
		animation-delay: 6s;
		border-radius: 50px;
		background: linear-gradient(
			135deg,
			rgba(251, 146, 60, 0.5) 0%,
			rgba(236, 72, 153, 0.4) 30%,
			rgba(168, 85, 247, 0.4) 60%,
			rgba(251, 146, 60, 0.5) 100%
		);
	}

	.iridescent-tube.tube-5 {
		width: 130px;
		height: 460px;
		top: 50%;
		right: 8%;
		transform: rotate(20deg);
		animation-delay: 8s;
		border-radius: 65px;
		background: linear-gradient(
			135deg,
			rgba(34, 197, 94, 0.5) 0%,
			rgba(59, 130, 246, 0.4) 30%,
			rgba(168, 85, 247, 0.4) 60%,
			rgba(34, 197, 94, 0.5) 100%
		);
	}

	.iridescent-tube.tube-6 {
		width: 110px;
		height: 440px;
		top: 30%;
		right: 25%;
		transform: rotate(-55deg);
		animation-delay: 10s;
		border-radius: 55px;
		background: linear-gradient(
			135deg,
			rgba(59, 130, 246, 0.5) 0%,
			rgba(251, 146, 60, 0.4) 30%,
			rgba(236, 72, 153, 0.4) 60%,
			rgba(59, 130, 246, 0.5) 100%
		);
	}

	@keyframes iridescent-float {
		0%,
		100% {
			transform: translateY(0) rotate(var(--base-rotation, 0deg));
			filter: hue-rotate(0deg) blur(0.5px);
		}
		25% {
			transform: translateY(-15px)
				rotate(calc(var(--base-rotation, 0deg) + 3deg));
			filter: hue-rotate(30deg) blur(0.5px);
		}
		50% {
			transform: translateY(-8px) rotate(var(--base-rotation, 0deg));
			filter: hue-rotate(60deg) blur(0.5px);
		}
		75% {
			transform: translateY(-20px)
				rotate(calc(var(--base-rotation, 0deg) - 3deg));
			filter: hue-rotate(90deg) blur(0.5px);
		}
	}

	/* Glass Loop Container */
	.glass-loop-container {
		position: absolute;
		top: 50%;
		right: 10%;
		width: 400px;
		height: 400px;
		transform: translateY(-50%);
		opacity: 0;
		pointer-events: none;
		z-index: 2;
	}

	.glass-loop {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		animation: loop-rotate 20s linear infinite;
	}

	.glass-loop.base {
		border: 3px solid rgba(255, 255, 255, 0.1);
		box-shadow:
			0 0 60px rgba(59, 130, 246, 0.3),
			inset 0 0 40px rgba(168, 85, 247, 0.2);
	}

	.glass-loop.highlight {
		border: 2px solid rgba(255, 255, 255, 0.2);
		transform: scale(0.85);
		animation-delay: -5s;
	}

	.glass-loop.sheen {
		background: linear-gradient(
			135deg,
			transparent 0%,
			rgba(255, 255, 255, 0.1) 45%,
			rgba(255, 255, 255, 0.2) 50%,
			rgba(255, 255, 255, 0.1) 55%,
			transparent 100%
		);
		transform: scale(0.7);
		animation-delay: -10s;
	}

	@keyframes loop-rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* Typography */
	.contextual-headline {
		font-size: clamp(2.5rem, 8vw, 5.5rem);
		font-weight: 900;
		line-height: 1.05;
		letter-spacing: -0.03em;
		color: var(--foreground);
		text-shadow: 0 20px 80px rgba(59, 130, 246, 0.3);
	}

	.contextual-subheadline {
		font-size: clamp(1.125rem, 2vw, 1.375rem);
		font-weight: 500;
		line-height: 1.6;
	}

	/* CTA Button */
	.contextual-cta {
		background: linear-gradient(145deg, #ef4444, #dc2626);
		color: var(--foreground);
		border: 1.5px solid rgba(239, 68, 68, 0.5);
		box-shadow:
			0 20px 60px rgba(239, 68, 68, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.2);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.contextual-cta:hover {
		box-shadow:
			0 30px 80px rgba(239, 68, 68, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.3);
		transform: translateY(-2px) scale(1.02);
	}

	.cta-icon {
		width: 2rem;
		height: 2rem;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 9999px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* ===== SHOWCASE SECTION ===== */

	.showcase-section {
		position: relative;
		overflow: hidden;
	}

	.showcase-section::before {
		content: "";
		position: absolute;
		inset: 0;
		background: radial-gradient(
				circle at 20% 50%,
				rgba(239, 68, 68, 0.1),
				transparent 50%
			),
			radial-gradient(
				circle at 80% 50%,
				rgba(168, 85, 247, 0.08),
				transparent 50%
			);
		pointer-events: none;
		z-index: 0;
	}

	.showcase-grid-pattern {
		background-image: linear-gradient(
				rgba(239, 68, 68, 0.03) 1px,
				transparent 1px
			),
			linear-gradient(90deg, rgba(239, 68, 68, 0.03) 1px, transparent 1px);
		background-size: 50px 50px;
		animation: grid-pulse 4s ease-in-out infinite;
	}

	@keyframes grid-pulse {
		0%,
		100% {
			opacity: 0.2;
		}
		50% {
			opacity: 0.4;
		}
	}

	/* ===== CARD ANIMATIONS ===== */

	.tilt-card {
		transition:
			transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
			box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		will-change: transform;
	}

	.tilt-card:hover {
		transform: translate3d(var(--tilt-x, 0), var(--tilt-y, 0), 0)
			scale(1.02);
	}

	/* ===== ANIMATIONS ===== */

	@keyframes particle-float {
		0% {
			transform: translateY(0) translateX(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateY(-100vh) translateX(20px);
			opacity: 0;
		}
	}

	.animate-particle-float {
		animation: particle-float linear infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%) translateY(-100%) rotate(45deg);
		}
		100% {
			transform: translateX(100%) translateY(100%) rotate(45deg);
		}
	}

	.animate-shimmer {
		animation: shimmer 2s infinite;
	}

	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
	}

	/* ===== ACCESSIBILITY ===== */

	@media (prefers-reduced-motion: reduce) {
		.iridescent-tube,
		.glass-loop,
		.animate-particle-float,
		.animate-shimmer,
		.animate-fade-in-up {
			animation: none;
		}

		.contextual-graphic {
			transform: none !important;
		}
	}
</style>
