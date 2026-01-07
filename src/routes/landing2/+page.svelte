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
	import Footer from "$lib/components/Footer.svelte";
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
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page-shell bg-background">
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
		<!-- Minimalist Centered Hero Section -->
		<section
			data-section="hero"
			class="relative flex items-center justify-center overflow-hidden bg-background contextual-hero min-h-[90vh] py-20 sm:py-24 z-[10]"
		>
			<!-- Subtle Light Rays -->
			<div class="light-rays"></div>

			<!-- Background Arcs Decoration -->
			<div class="concentric-arcs">
				<div class="arc-1"></div>
				<div class="arc-2"></div>
				<div class="arc-3"></div>
			</div>
			
			<!-- Sophisticated Abstract Graphic System -->
			<div class="contextual-graphic" style={`transform: translate(calc(var(--base-x, -80%) + ${-mouseX * 0.02}px), calc(var(--base-y, -60%) + ${mouseY * 0.02}px));`}>
				<!-- Gradient Orbs for Depth -->
				<div class="gradient-orb orb-primary"></div>
				<div class="gradient-orb orb-secondary"></div>
				<div class="gradient-orb orb-tertiary"></div>
				
				<!-- Mesh Gradient Background -->
				<div class="mesh-gradient"></div>
				
				<!-- Iridescent Tubes with Enhanced Styling -->
				<div class="iridescent-tube tube-1"></div>
				<div class="iridescent-tube tube-2"></div>
				<div class="iridescent-tube tube-3"></div>
				<div class="iridescent-tube tube-4"></div>
				<div class="iridescent-tube tube-5"></div>
				<div class="iridescent-tube tube-6"></div>
				
				<!-- Geometric Accents -->
				<div class="geometric-accent accent-1"></div>
				<div class="geometric-accent accent-2"></div>
				<div class="geometric-accent accent-3"></div>
			</div>

			<!-- Content Container - Centered -->
			<div
				class="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 w-full hero-panel-inner text-center"
			>
				<div
					class="flex flex-col items-center justify-center hero-grid-shell"
				>
					<!-- Centered Text Content -->
					<div
						class="contextual-content max-w-4xl mx-auto transform transition-all duration-1000 {visibleSections.hero
							? 'translate-y-0 opacity-100'
							: 'translate-y-10 opacity-0'}"
					>
						<!-- Announcement Badge -->
						<div class="flex justify-center mb-8">
							<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-md">
								<span class="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
								<span class="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-red-500">SpikedAI is now generally available</span>
							</div>
						</div>

						<!-- Main Headline -->
						<h1 class="contextual-headline mb-6 lg:mb-8 font-serif italic text-6xl sm:text-7xl lg:text-9xl tracking-tight">
							Sell Like a <span class="text-red-600">CEO</span>
						</h1>

						<!-- Sub-headline -->
						<p
							class="contextual-subheadline mb-10 lg:mb-12 text-zinc-400 font-medium text-lg sm:text-xl tracking-tight leading-relaxed mx-auto max-w-3xl"
						>
							The rise of the singular rep starts here. <br class="hidden sm:block" />
							Real-time Intelligence. Fully Autonomous Follow-up. Total Control.
						</p>

						<!-- CTA Buttons -->
						<div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
							<a
								href="/contact-sales"
								class="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold text-sm transition-all duration-300 hover:scale-[1.02] hover:bg-zinc-100"
							>
								<span>Start Now, Skip Demos</span>
								<div class="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-black/10 transition-colors">
									<ArrowRight class="w-3.5 h-3.5" />
								</div>
							</a>
							<a
								href="/about-us"
								class="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-sm backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20"
							>
								Contact Sales
							</a>
						</div>

						<!-- Trust Bar -->
						<div class="pt-12 border-t border-white/5">
							<p class="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-8">AI Transformation Partner to the Best</p>
							<div class="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale group pb-4">
								<img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Couchbase_logo.svg" alt="Couchbase" class="h-6 sm:h-7" />
								<img src="https://upload.wikimedia.org/wikipedia/commons/3/39/Asana_logo.svg" alt="Asana" class="h-5 sm:h-6" />
								<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/Salesforce.com_logo.svg" alt="Salesforce" class="h-10 sm:h-12" />
								<img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" class="h-5 sm:h-6" />
								<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/HubSpot_Logo.svg" alt="HubSpot" class="h-6 sm:h-7" />
							</div>
						</div>

						<!-- Founder Quote - Centered -->
						<div
							class="bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-200 max-w-2xl mx-auto"
						>
							<div class="flex flex-col sm:flex-row gap-4 items-start">
								<!-- Photo -->
								<img
									src="/Photos/Avi Sahi.jpeg"
									alt="Avi Sahi"
									class="w-16 h-16 rounded-full object-cover border-2 border-border flex-shrink-0 mx-auto sm:mx-0"
								/>
								
								<!-- Quote Content -->
								<div class="flex-1 min-w-0 text-left">
									<blockquote>
										<p
											class="text-base sm:text-lg font-semibold text-foreground leading-relaxed mb-3"
										>
											AI that respects judgment, because revenue decisions are human decisions.
										</p>
										<p
											class="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3"
										>
											SpikedAI is built for leaders who make decisions in live customer moments, 
											not after the fact, not from dashboards, but turning conversations into conversions.
										</p>
									</blockquote>
									
									<div class="pt-3 border-t border-border">
										<p class="font-bold text-foreground text-sm">
											Avi Sahi
										</p>
										<p class="text-xs text-muted-foreground">
											Co-Founder & CEO, SpikedAI
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Smooth transition to next section -->
			<div class="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-background pointer-events-none z-20"></div>
		</section>

		<!-- Interactive Showcase Section -->
		<section
			id="showcase"
			data-section="showcase"
			class="z-10 pt-24 pb-24 sm:pt-32 sm:pb-32 bg-background relative overflow-hidden showcase-section transform transition-all duration-1000 {visibleSections.showcase
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
					class="text-center mb-16 sm:mb-20 transform transition-all duration-1000 {visibleSections.showcase
						? 'translate-y-0 opacity-100'
						: 'translate-y-10 opacity-0'}"
				>
					<span
						class="text-xs sm:text-sm font-bold text-red-500 tracking-widest uppercase"
						>All Features</span
					>
					<h2
						class="text-3xl sm:text-4xl md:text-5xl font-black mt-4 mb-6 text-foreground tracking-tight leading-tight"
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
													class="feature-card group relative bg-card rounded-xl p-4 border border-border transition-all duration-200 {feature.highlight
														? 'border-red-500 border-l-4 border-l-red-500'
														: ''} hover:border-primary"
													in:fly={{
														x: -30,
														duration: 600,
														delay: 300 + idx * 100,
													}}
												>

													<div
														class="flex items-start gap-3 relative z-10"
													>
														<div class="relative">
															<div
																class="w-10 h-10 rounded-lg {feature.highlight
																	? 'bg-red-500/10'
																	: 'bg-secondary'} flex items-center justify-center flex-shrink-0 transition-colors duration-200"
															>
																<FeatureIcon
																	class="w-5 h-5 {feature.highlight
																		? 'text-red-500'
																		: 'text-muted-foreground group-hover:text-foreground'} transition-colors duration-200"
																/>
															</div>
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
											class="relative bg-card rounded-3xl border border-border p-5 showcase-widget-container"
											in:fly={{
												x: 30,
												duration: 800,
												delay: 200,
											}}
										>

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
							class="group relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 ease-out {currentShowcaseIndex ===
							i
								? 'bg-red-500 text-white border-2 border-red-500'
								: 'text-zinc-500 dark:text-zinc-500 text-gray-600 hover:text-zinc-300 dark:hover:text-zinc-300 hover:text-gray-800 hover:bg-zinc-800/50 dark:hover:bg-zinc-800/50 hover:bg-gray-100/80 border-2 border-zinc-800/50 dark:border-zinc-800/50 border-gray-200/60 hover:border-zinc-700/60 dark:hover:border-zinc-700/60 hover:border-gray-300/70'}"
							aria-label={`Show ${showcase.name}`}
							title={showcase.name}
						>
							<div class="relative z-10">
								<IconComponent
									class="w-5 h-5 transition-colors duration-200 {currentShowcaseIndex ===
									i
										? 'text-white'
										: ''}"
								/>
							</div>
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
							role="group"
							aria-label={`Testimonial from ${testimonial.author}`}
							class="relative flex-shrink-0 w-96 bg-card border border-border rounded-xl p-6 hover:border-primary transition-all duration-200 group cursor-pointer"
						>
							<div class="flex items-start gap-4 mb-4 relative">
								<div class="flex-shrink-0">
									<div
										class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg transition-colors duration-200"
									>
										{testimonial.author[0]}
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
										class="text-2xl font-black text-primary transition-colors duration-200"
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
								class="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/90 transition-colors relative font-medium text-wrap"
							>
								{testimonial.quote}
							</p>
						</div>
					{/each}
				</div>
			</div>
			<div class="mt-20 max-w-7xl mx-auto px-6 relative z-20">
				<div
					class="bg-card border border-border rounded-2xl p-8 hover:border-primary transition-all duration-200 group"
				>
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
						class="group relative px-8 py-5 bg-primary text-primary-foreground rounded-xl font-bold text-lg transition-all duration-200 hover:bg-red-600"
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
					</button>
					<a
						href="/contact-sales"
						class="relative px-8 py-5 bg-transparent text-foreground rounded-xl font-semibold text-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 text-center"
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
		<Footer />
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
		background: var(--background);
		isolation: isolate;
		min-height: var(--hero-panel-height);
		overflow: hidden;
	}

	/* Subtle Light Rays - Fortune 500 Style - Emanating from Bottom Left */
	.light-rays {
		position: absolute;
		inset: 0;
		background: 
			linear-gradient(225deg, transparent 0%, rgba(239, 68, 68, 0.015) 50%, transparent 100%),
			linear-gradient(315deg, transparent 0%, rgba(168, 85, 247, 0.01) 50%, transparent 100%);
		opacity: 0.3;
		pointer-events: none;
		z-index: 0;
		animation: rays-shift 20s ease-in-out infinite;
	}

	@keyframes rays-shift {
		0%, 100% {
			opacity: 0.2;
			transform: translate(0, 0);
		}
		50% {
			opacity: 0.35;
			transform: translate(-15px, -15px);
		}
	}

	.hero-panel-inner {
		padding-block: var(--hero-panel-padding);
	}

	.hero-grid-shell {
		min-height: clamp(400px, 60vh, 700px);
	}

	/* Contextual Graphic Container - Centered to the Left - Enhanced */
	.contextual-graphic {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 1400px;
		height: 1400px;
		--base-x: -80%;
		--base-y: -60%;
		transform: translate(var(--base-x), var(--base-y));
		pointer-events: none;
		z-index: 1;
		filter: blur(1px);
		opacity: 0.85;
	}

	@media (max-width: 1024px) {
		.contextual-graphic {
			width: 1000px;
			height: 1000px;
			--base-x: -75%;
			opacity: 0.75;
		}
	}

	@media (max-width: 768px) {
		.contextual-graphic {
			width: 800px;
			height: 800px;
			--base-x: -70%;
			opacity: 0.65;
		}
	}

	/* Gradient Orbs - Fortune 500 Style */
	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.35;
		animation: orb-pulse 12s ease-in-out infinite;
	}

	.orb-primary {
		width: 450px;
		height: 450px;
		bottom: 5%;
		left: 10%;
		background: radial-gradient(
			circle at 30% 30%,
			rgba(239, 68, 68, 0.2) 0%,
			rgba(168, 85, 247, 0.15) 40%,
			rgba(59, 130, 246, 0.1) 70%,
			transparent 100%
		);
		animation-delay: 0s;
	}

	.orb-secondary {
		width: 350px;
		height: 350px;
		bottom: 15%;
		left: 25%;
		background: radial-gradient(
			circle at 50% 50%,
			rgba(236, 72, 153, 0.18) 0%,
			rgba(251, 146, 60, 0.12) 50%,
			transparent 100%
		);
		animation-delay: 2.5s;
	}

	.orb-tertiary {
		width: 300px;
		height: 300px;
		bottom: 25%;
		left: 5%;
		background: radial-gradient(
			circle at 40% 40%,
			rgba(59, 130, 246, 0.15) 0%,
			rgba(34, 197, 94, 0.1) 60%,
			transparent 100%
		);
		animation-delay: 5s;
	}

	@keyframes orb-pulse {
		0%, 100% {
			transform: scale(1);
			opacity: 0.35;
		}
		50% {
			transform: scale(1.08);
			opacity: 0.45;
		}
	}

	/* Mesh Gradient Background */
	.mesh-gradient {
		position: absolute;
		inset: 0;
		background: 
			radial-gradient(at 20% 20%, rgba(239, 68, 68, 0.08) 0px, transparent 50%),
			radial-gradient(at 80% 80%, rgba(168, 85, 247, 0.08) 0px, transparent 50%),
			radial-gradient(at 60% 40%, rgba(59, 130, 246, 0.05) 0px, transparent 50%);
		opacity: 0.5;
		filter: blur(60px);
		animation: mesh-shift 25s ease-in-out infinite;
	}

	@keyframes mesh-shift {
		0%, 100% {
			transform: translate(0, 0) scale(1);
		}
		33% {
			transform: translate(-15px, -15px) scale(1.05);
		}
		66% {
			transform: translate(10px, 10px) scale(0.98);
		}
	}

	/* Iridescent Tubes - Enhanced Fortune 500 Style */
	.iridescent-tube {
		position: absolute;
		border-radius: 100px;
		background: rgba(239, 24, 32, 0.05);
		border: 1px solid rgba(239, 24, 32, 0.1);
		animation: iridescent-float 15s ease-in-out infinite;
		opacity: 0.5;
		filter: blur(1px);
		backdrop-filter: blur(15px);
		box-shadow: 
			0 0 30px rgba(239, 68, 68, 0.06),
			inset 0 0 50px rgba(168, 85, 247, 0.03);
	}

	/* Iridescent Tube Positions - Enhanced Bottom Left Layout */
	.iridescent-tube.tube-1 {
		width: 300px;
		height: 950px;
		bottom: 8%;
		left: 12%;
		transform: rotate(-35deg);
		animation-delay: 0s;
		border-radius: 150px;
		background: linear-gradient(
			225deg,
			rgba(59, 130, 246, 0.35) 0%,
			rgba(168, 85, 247, 0.28) 25%,
			rgba(236, 72, 153, 0.25) 50%,
			rgba(239, 68, 68, 0.22) 75%,
			rgba(59, 130, 246, 0.3) 100%
		);
		--base-rotation: -35deg;
	}

	.iridescent-tube.tube-2 {
		width: 260px;
		height: 900px;
		bottom: 18%;
		left: 3%;
		transform: rotate(25deg);
		animation-delay: 2s;
		border-radius: 130px;
		background: linear-gradient(
			225deg,
			rgba(236, 72, 153, 0.35) 0%,
			rgba(251, 146, 60, 0.28) 30%,
			rgba(34, 197, 94, 0.25) 60%,
			rgba(236, 72, 153, 0.3) 100%
		);
		--base-rotation: 25deg;
	}

	.iridescent-tube.tube-3 {
		width: 340px;
		height: 850px;
		bottom: 3%;
		left: 22%;
		transform: rotate(-50deg);
		animation-delay: 4s;
		border-radius: 170px;
		background: linear-gradient(
			225deg,
			rgba(168, 85, 247, 0.38) 0%,
			rgba(59, 130, 246, 0.32) 25%,
			rgba(34, 197, 94, 0.28) 50%,
			rgba(168, 85, 247, 0.35) 100%
		);
		--base-rotation: -50deg;
	}

	.iridescent-tube.tube-4 {
		width: 220px;
		height: 920px;
		bottom: 12%;
		left: 38%;
		transform: rotate(40deg);
		animation-delay: 6s;
		border-radius: 110px;
		background: linear-gradient(
			225deg,
			rgba(251, 146, 60, 0.35) 0%,
			rgba(236, 72, 153, 0.28) 30%,
			rgba(168, 85, 247, 0.25) 60%,
			rgba(251, 146, 60, 0.32) 100%
		);
		--base-rotation: 40deg;
	}

	.iridescent-tube.tube-5 {
		width: 280px;
		height: 860px;
		bottom: 6%;
		left: 10%;
		transform: rotate(-20deg);
		animation-delay: 8s;
		border-radius: 140px;
		background: linear-gradient(
			225deg,
			rgba(34, 197, 94, 0.35) 0%,
			rgba(59, 130, 246, 0.28) 30%,
			rgba(168, 85, 247, 0.25) 60%,
			rgba(34, 197, 94, 0.32) 100%
		);
		--base-rotation: -20deg;
	}

	.iridescent-tube.tube-6 {
		width: 240px;
		height: 820px;
		bottom: 22%;
		left: 28%;
		transform: rotate(55deg);
		animation-delay: 10s;
		border-radius: 120px;
		background: linear-gradient(
			225deg,
			rgba(59, 130, 246, 0.35) 0%,
			rgba(251, 146, 60, 0.28) 30%,
			rgba(236, 72, 153, 0.25) 60%,
			rgba(59, 130, 246, 0.32) 100%
		);
		--base-rotation: 55deg;
	}

	/* Geometric Accents - Fortune 500 Style */
	.geometric-accent {
		position: absolute;
		border: 1px solid;
		opacity: 0.18;
		animation: geometric-rotate 30s linear infinite;
	}

	.accent-1 {
		width: 100px;
		height: 100px;
		bottom: 30%;
		left: 20%;
		border-color: rgba(239, 68, 68, 0.25);
		border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
		background: linear-gradient(
			315deg,
			rgba(239, 68, 68, 0.06) 0%,
			transparent 100%
		);
		animation-delay: 0s;
		filter: blur(2px);
	}

	.accent-2 {
		width: 70px;
		height: 70px;
		bottom: 35%;
		left: 8%;
		border-color: rgba(168, 85, 247, 0.25);
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(168, 85, 247, 0.08) 0%,
			transparent 70%
		);
		animation-delay: 10s;
		filter: blur(1.5px);
	}

	.accent-3 {
		width: 85px;
		height: 85px;
		bottom: 15%;
		left: 35%;
		border-color: rgba(59, 130, 246, 0.25);
		clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
		background: linear-gradient(
			225deg,
			rgba(59, 130, 246, 0.07) 0%,
			transparent 100%
		);
		animation-delay: 20s;
		filter: blur(1.8px);
	}

	@keyframes geometric-rotate {
		0% {
			transform: rotate(0deg) scale(1);
		}
		50% {
			transform: rotate(180deg) scale(1.05);
		}
		100% {
			transform: rotate(360deg) scale(1);
		}
	}

	@keyframes iridescent-float {
		0%,
		100% {
			transform: translateY(0) translateX(0) rotate(var(--base-rotation, 0deg));
			opacity: 0.5;
		}
		25% {
			transform: translateY(-12px) translateX(6px)
				rotate(calc(var(--base-rotation, 0deg) + 2deg));
			opacity: 0.55;
		}
		50% {
			transform: translateY(-6px) translateX(-3px) rotate(var(--base-rotation, 0deg));
			opacity: 0.52;
		}
		75% {
			transform: translateY(-15px) translateX(3px)
				rotate(calc(var(--base-rotation, 0deg) - 2deg));
			opacity: 0.58;
		}
	}


	/* Typography - Minimalist Centered */
	.contextual-headline {
		font-family: 'Instrument Serif', serif;
		font-size: clamp(3.5rem, 9vw, 9.5rem);
		font-weight: 500;
		line-height: 0.95;
		letter-spacing: -0.04em;
		color: var(--foreground);
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	.contextual-subheadline {
		font-size: clamp(1.25rem, 2.5vw, 1.5rem);
		font-weight: 400;
		line-height: 1.6;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
	}

	/* Background Decorative Arcs */
	.concentric-arcs {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
		opacity: 0.15;
	}

	.concentric-arcs div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50%;
	}

	.arc-1 { width: 1000px; height: 1000px; }
	.arc-2 { width: 1400px; height: 1400px; }
	.arc-3 { width: 1800px; height: 1800px; }

	/* ===== SHOWCASE SECTION ===== */

	.showcase-section {
		position: relative;
		overflow: hidden;
		background: var(--background);
	}

	.showcase-grid-pattern {
		display: none;
	}

	/* ===== CARD ANIMATIONS ===== */

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

	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}

	/* ===== ACCESSIBILITY ===== */

	@media (prefers-reduced-motion: reduce) {
		.iridescent-tube,
		.gradient-orb,
		.geometric-accent,
		.mesh-gradient,
		.light-rays,
		.animate-particle-float,
		.animate-fade-in-up {
			animation: none;
		}

		.contextual-graphic {
			transform: none !important;
		}
	}
</style>
