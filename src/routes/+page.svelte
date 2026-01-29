<script>
	import { onMount } from "svelte";
	import { fade, fly, slide } from "svelte/transition";
	import { themeStore } from "$lib/stores/theme.js";
	import {
		Users,
		ArrowRight,
		Sparkles,
		MessageSquare,
		CheckCircle2,
		Brain,
		Target,
		FileText,
		TrendingUp,
		Zap,
		Calendar,
		GitBranch,
		BarChart3,
		Heart,
		Settings,
		Activity,
	} from "lucide-svelte";

	// Components
	import AIAssistanceShowcase from "$lib/components/AIAssistanceShowcase.svelte";
	import NotetakerShowcase from "$lib/components/NotetakerShowcase.svelte";
	import FollowupShowcase from "$lib/components/FollowupShowcase.svelte";
	import SimulatorShowcase from "$lib/components/SimulatorShowcase.svelte";
	import DevToolsShowcase from "$lib/components/DevToolsShowcase.svelte";
	import CRMShowcase from "$lib/components/CRMShowcase.svelte";
	import SentimentShowcase from "$lib/components/SentimentShowcase.svelte";
	import CustomGoalsShowcase from "$lib/components/CustomGoalsShowcase.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import OnboardingFlow from "$lib/components/OnboardingFlow.svelte";
	import { innerWidth } from "svelte/reactivity/window";

	// State
	let scrollY = $state(0);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let isPaused = $state(false);
	let isTransitioning = $state(false);
	let currentShowcaseIndex = $state(0);
	let activeTab = $state("simulator");
	let showcaseProgress = $state(0);
	const SHOWCASE_INTERVAL = 8000; // 8 seconds for slower, more obvious scroll

	let visibleSections = $state({
		hero: false,
		products: false,
		showcase: false,
		testimonials: false,
		cta: false,
		quote: true,
	});

	const showcases = [
		{
			id: "ai-assistance",
			name: "AI Assistance",
			label: "Contextual Intelligence",
			title: "Real-time AI answers",
			subtitle: "from your knowledge base",
			icon: Sparkles,
			link: "/features/ai-assistance",
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
			label: "Conversation Capture",
			title: "Capture every detail",
			subtitle: "transcribe and summarize",
			icon: MessageSquare,
			link: "/features/notetaker",
			features: [
				{
					icon: FileText,
					title: "Smart transcription",
					description: "AI-powered transcription with speaker identification",
				},
				{
					icon: Brain,
					title: "Intelligent summaries",
					description: "Auto-generate meeting summaries and action items",
					highlight: true,
				},
				{
					icon: Zap,
					title: "Take automatic actions",
					description: "Send follow-ups, sync to CRM, track stakeholders",
				},
			],
		},
		{
			id: "followup",
			name: "Follow-Up Planner",
			label: "Strategic Preparation",
			title: "Never walk in cold",
			subtitle: "Auto-compile preparation docs",
			icon: Calendar,
			link: "/features/followup",
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
			label: "Performance Coaching",
			title: "Master the pitch",
			subtitle: "Practice with AI prospects",
			icon: Users,
			link: "/features/simulator",
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
					description: "Master discovery, demos, objections, and closing",
					highlight: true,
				},
				{
					icon: TrendingUp,
					title: "Live coaching feedback",
					description: "Get real-time insights and improvement suggestions",
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
			link: "/features/dev-tools",
			features: [
				{
					icon: GitBranch,
					title: "Jira & Asana Integration",
					description: "Sync sales conversations with development tickets",
				},
				{
					icon: Activity,
					title: "Automated workflows",
					description: "Create tickets and track progress automatically",
					highlight: true,
				},
				{
					icon: Settings,
					title: "Custom integrations",
					description: "Connect with your existing dev tools and workflows",
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
			link: "/features/crm",
			features: [
				{
					icon: BarChart3,
					title: "Salesforce & HubSpot",
					description: "Seamless integration with major CRM platforms",
				},
				{
					icon: Zap,
					title: "Auto-sync everything",
					description: "Contacts, deals, and activities updated automatically",
					highlight: true,
				},
				{
					icon: TrendingUp,
					title: "Real-time updates",
					description: "Never miss a beat with instant CRM synchronization",
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
			link: "/features/sentiment",
			features: [
				{
					icon: Heart,
					title: "Real-time sentiment",
					description: "Track emotional tone and engagement throughout calls",
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
					description: "Visualize sentiment changes over the conversation",
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
			link: "/features/custom-goals",
			features: [
				{
					icon: Target,
					title: "Custom metrics",
					description: "Define and track goals specific to your sales process",
				},
				{
					icon: Settings,
					title: "Flexible configuration",
					description: "Set up goals that align with your business objectives",
					highlight: true,
				},
				{
					icon: TrendingUp,
					title: "Progress tracking",
					description: "Monitor progress toward your custom goals in real-time",
				},
			],
		},
	];

	const testimonials = [
		{
			quote:
				"The real-time knowledge agent gives me instant answers during calls. No more fumbling.",
			author: "Alex Rivera",
			role: "Senior Sales Engineer",
			metric: "5x",
			metricLabel: "Faster Responses",
		},
		{
			quote:
				"Call simulator helped our team practice objection handling. We're closing more deals.",
			author: "Sarah Thompson",
			role: "Sales Director",
			metric: "40%",
			metricLabel: "More Deals",
		},
		{
			quote:
				"Automatic FOLLOW-UP & PLANNING saves hours every week. CRM integration means zero manual work.",
			author: "Michael Chen",
			role: "Account Executive",
			metric: "15hrs",
			metricLabel: "Saved Weekly",
		},
		{
			quote:
				"The insight engine identified budget issues early. We stopped wasting time on dead deals.",
			author: "Jessica Lee",
			role: "VP of Sales",
			metric: "25%",
			metricLabel: "Efficiency",
		},
	];

	const impactItems = [
		{
			id: "01",
			title: "Replaces cognitive overload with amplified cognitive ability",
			description: "For every rep, before, during, and after the conversation.",
			darkBg: "bg-[#0A1A12]",
			darkBorder: "border-green-900/20",
			lightBg: "bg-[#F2FBF6]",
		},
		{
			id: "02",
			title: "Rise of the Singular Rep",
			description:
				"Fewer teams required, sharper execution, tighter accountability.",
			darkBg: "bg-[#1A1A0A]",
			darkBorder: "border-yellow-900/20",
			lightBg: "bg-[#FEFBF2]",
		},
		{
			id: "03",
			title: "One-shot selling",
			description: "Confidence and clarity at the level of a CEO.",
			darkBg: "bg-[#1A0A0A]",
			darkBorder: "border-red-900/20",
			lightBg: "bg-[#FFF2F2]",
		},
		{
			id: "04",
			title: "Unified customer actions",
			description: "Every motion aligned, every outcome intentional.",
			darkBg: "bg-[#0A0F1A]",
			darkBorder: "border-blue-900/20",
			lightBg: "bg-[#F2F6FF]",
		},
	];

	onMount(() => {
		themeStore.init();
		const handleScroll = () => (scrollY = window.scrollY);
		const handleMouseMove = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleSections[entry.target.dataset.section] = true;
					}
				});
			},
			{ threshold: 0.1 },
		);

		document
			.querySelectorAll("[data-section]")
			.forEach((el) => observer.observe(el));
		window.addEventListener("scroll", handleScroll);
		window.addEventListener("mousemove", handleMouseMove);

		visibleSections.hero = true;

		let lastTime = Date.now();
		let showcaseInterval = setInterval(() => {
			if (!isPaused && !isTransitioning) {
				const now = Date.now();
				const delta = now - lastTime;
				lastTime = now;

				showcaseProgress += (delta / SHOWCASE_INTERVAL) * 100;

				if (showcaseProgress >= 100) {
					showcaseProgress = 0;
					if (innerWidth.current >= 1024) {
						goToNextShowcase();
					}
				}
			} else {
				lastTime = Date.now();
			}
		}, 50);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("mousemove", handleMouseMove);
			observer.disconnect();
			clearInterval(showcaseInterval);
		};
	});

	function goToNextShowcase() {
		if (isTransitioning) return;
		isTransitioning = true;
		showcaseProgress = 0; // Reset progress on manual click
		// Reduced delay to feel snappier
		setTimeout(() => {
			currentShowcaseIndex = (currentShowcaseIndex + 1) % showcases.length;
			isTransitioning = false;
		}, 150);
	}

	function selectShowcase(index) {
		if (currentShowcaseIndex === index || isTransitioning) return;
		isTransitioning = true;
		isPaused = true;
		showcaseProgress = 0;
		setTimeout(() => {
			currentShowcaseIndex = index;
			isTransitioning = false;
		}, 150);
	}
</script>

<svelte:head>
	<title>SpikedAI | Next-Gen Revenue Intelligence</title>
</svelte:head>

<div class="page-shell min-h-screen transition-colors duration-500 font-sans selection:bg-red-500/30 overflow-x-hidden {$themeStore === 'dark' ? 'bg-[#030712] text-zinc-100' : 'bg-white text-zinc-900'}">
	<main class="relative z-10 w-full overflow-hidden max-w-[1900px] mx-auto bg-transparent">
		<!-- BIG HERO -->
		<section
			data-section="hero"
			class="relative w-full flex flex-col justify-center
			{$themeStore === 'dark' ? 'bg-[#030712]' : 'bg-white'}"
			style="padding: clamp(2.5rem, 6vw, 5rem);"
		>
			<div class="w-full relative z-10 pt-[clamp(7rem,14vh,11rem)]">
			<!-- Body Text Above Headline -->
			<p
				class="font-medium mb-8 max-w-3xl
				{$themeStore === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}"
				style="font-size: clamp(1.1rem, 2.5vw, 1.5rem); line-height: 1.5;"
			>
				Sales doesn't fail from lack of skill. It fails from cognitive overload.<br />
				SpikedAI is the Executive Cognition System that turns every seller into a Singular Rep.
			</p>

			<!-- HUGE HEADLINE -->
			<h1
				class="font-black tracking-tighter mb-6
				{$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}"
				style="
					font-size: clamp(3.75rem, 10vw, 11rem);
					line-height: 0.88;
					letter-spacing: -0.04em;
				"
			>
				Sell like <span class="text-red-600 block sm:inline">a CEO.</span>
			</h1>

			<!-- SUBTEXT -->
			<p
				class="font-medium max-w-3xl
				{$themeStore === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}"
				style="font-size: clamp(1.2rem, 3.5vw, 1.9rem);"
			>
				The rise of the singular rep starts here.
			</p>

			<!-- Additional Subtext -->
			<p
				class="font-medium mt-6 max-w-3xl
				{$themeStore === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}"
				style="font-size: clamp(1rem, 2.2vw, 1.3rem); line-height: 1.6;"
			>
				Real-time conversational, contextual, and computational intelligence.<br />
				One-shot selling. Unified customer actions. No cognitive drag.
		</p>

		<!-- Book Demo Button -->
		<a
			href="/contact-sales"
			class="mt-10 mb-16 contextual-cta group relative inline-flex items-center gap-3
			px-[clamp(1.75rem,4.5vw,3.25rem)]
			py-[clamp(1.05rem,2.8vw,1.5rem)]
			rounded-full font-semibold transition-all duration-200"
		>
			<span class="relative z-10 text-[clamp(1.05rem,2.2vw,1.35rem)]">
				Book a Demo
			</span>
			<span class="cta-icon relative z-10 grid place-items-center">
				<ArrowRight
					class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
				/>
			</span>
		</a>
	</div>
</section>
				<!-- 1. The Asymmetrical Problem Box -->
				<div
					class="rounded-[3rem] p-12 sm:p-20 flex flex-col lg:flex-row items-center gap-16 transition-all duration-300
                    {$themeStore === 'dark'
						? 'bg-[#121214] border border-zinc-800'
						: 'bg-[#F9F9FB] shadow-sm'}"
				>
					<div class="lg:w-2/3 space-y-10">
						<h2
							class="font-black leading-[1.0] tracking-tight {$themeStore ===
							'dark'
								? 'text-white'
								: 'text-zinc-900'}"
							style="font-size: clamp(3rem, 6vw, 6rem);"
						>
							Companies leave millions <br class="hidden xl:block" />on the
							table every year.
						</h2>
						<p
							class="font-medium leading-relaxed max-w-2xl
                            {$themeStore === 'dark'
								? 'text-zinc-400'
								: 'text-zinc-600'}"
							style="font-size: clamp(1.4rem, 1.8vw, 2rem);"
						>
							Sales has outgrown human working memory, and teams are drowning in
							cognitive overload.
						</p>
					</div>
					<div class="lg:w-1/3 flex lg:justify-end w-full">
						<div
							class="text-6xl lg:text-8xl font-black text-red-600 leading-[0.9] tracking-tighter"
						>
							SpikedAI <br />solves <br />this.
						</div>
					</div>
				</div>

				<!-- 2. Split Visual & Quote (Variated) -->
				<div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
					<!-- Visual Side -->
					<div
						class="lg:col-span-8 relative group overflow-hidden rounded-[3rem] bg-zinc-900 aspect-[4/5] sm:aspect-video lg:aspect-auto"
					>
						<img
							src="/clarity_visual.png"
							alt="Clarity from Chaos"
							class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 sm:p-12 flex flex-col justify-end"
						>
							<div class="max-w-2xl">
								<div
									class="mb-6 w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center"
								>
									<Sparkles class="w-6 h-6 text-white" />
								</div>
								<p
									class="text-white font-bold leading-tight"
									style="font-size: clamp(1.8rem, 2.5vw, 3rem);"
								>
									We bring clarity into the chaos, supporting every kind of
									seller to perform at their highest potential.
								</p>
							</div>
						</div>
					</div>

					<!-- Quote Side (Non-boxed style) -->
					<div
						class="lg:col-span-4 flex flex-col justify-center space-y-10 p-4"
					>
						<div class="space-y-6">
							<span
								class="text-4xl lg:text-6xl font-serif text-red-600 italic opacity-50 inline"
								>“</span
							>
							<h3
								class="font-bold leading-tight {$themeStore === 'dark'
									? 'text-zinc-100'
									: 'text-zinc-900'} relative z-10"
								style="font-size: clamp(1.6rem, 2.2vw, 2.4rem);"
							>
								AI that respects judgment, because revenue decisions are human
								decisions.
							</h3>
							<p
								class="font-medium leading-relaxed {$themeStore === 'dark'
									? 'text-zinc-400'
									: 'text-zinc-500'}"
								style="font-size: 1.25rem;"
							>
								Built for leaders who make decisions in live customer moments,
								turning conversations into conversions.
							</p>
						</div>

						<div
							class="flex items-center gap-5 pt-6 border-t border-zinc-500/20"
						>
							<div
								class="w-16 h-16 rounded-2xl overflow-hidden border border-red-500/30"
							>
								<img
									src="/Photos/Avi Sahi.jpeg"
									alt="Avi Sahi"
									class="w-full h-full object-cover"
								/>
							</div>
							<div>
								<div
									class="font-black text-lg {$themeStore === 'dark'
										? 'text-white'
										: 'text-zinc-900'}"
								>
									Avi Sahi
								</div>
								<div
									class="text-red-500 font-bold tracking-widest text-[10px] uppercase"
								>
									Co-Founder & CEO, SpikedAI
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 3. Horizontal Divider Line -->
				<div
					class="w-full h-px bg-gradient-to-r from-transparent via-zinc-500/20 to-transparent my-12"
				></div>

				<!-- 4. Impact Grid (3 Column) -->
				<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
					{#each impactItems as item}
						<div
							class="rounded-[2.5rem] p-10 transition-all duration-300
								{$themeStore === 'dark'
								? `border ${item.darkBg} ${item.darkBorder}`
								: item.lightBg}"
						>
							<div class="text-4xl font-black text-red-600 mb-6">{item.id}</div>
							<h4
								class="text-2xl font-black mb-4 {$themeStore === 'dark'
									? 'text-white'
									: 'text-zinc-900'}"
							>
								{item.title}
							</h4>
							<p
								class="font-medium {$themeStore === 'dark'
									? 'text-zinc-400'
									: 'text-zinc-600'}"
							>
								{item.description}
							</p>
						</div>
					{/each}
				</div>

				<div class="pt-8 text-center">
					<div
						class="inline-block px-8 py-4 rounded-full border border-red-500/30 text-red-600 font-black uppercase tracking-widest text-sm"
					>
						And SpikedAI delivers.
					</div>
				</div>
			</div>


		<!-- EXPANDED SHOWCASE (Reduced Padding, Bigger Text, Progress Bar) -->
		<section
			data-section="showcase"
			class="w-full relative {$themeStore === 'dark'
				? 'bg-[#030712]'
				: 'bg-white'}"
			style="padding: 2rem 0;"
		>
			<div class="px-[clamp(2rem,4vw,5rem)] mb-[clamp(2rem,6vh,6rem)]">
				<span
					class="block font-bold text-red-600 uppercase tracking-[0.3em] mb-4"
					>All Features</span
				>
				<h2
					class="font-black leading-none {$themeStore === 'dark'
						? 'text-white'
						: 'text-zinc-900'}"
					style="font-size: clamp(3rem, 8vw, 8rem);"
				>
					Experience<br />Every Feature.
				</h2>
				<!-- sub text big visible -->
				<p
					class="font-medium leading-relaxed max-w-4xl pt-10
                    {$themeStore === 'dark'
						? 'text-zinc-400'
						: 'text-zinc-500'}"
					style="font-size: clamp(1.1rem, 1.5vw, 2rem);"
				>
					Explore our complete suite of AI-powered features with interactive
					demos.
				</p>
			</div>

			<div
				class="flex flex-col lg:flex-row gap-8 w-full min-h-[1000px] px-[clamp(1rem,2vw,3rem)]"
			>
				<!-- Navigation / Detail Panel -->
				<div
					class="lg:w-5/12 flex flex-col h-full overflow-y-auto no-scrollbar pr-2 sm:pr-4"
				>
					<div class="flex flex-col">
						{#each showcases as showcase, i}
							<div class="border-b border-zinc-800/20 last:border-0 relative">
								<!-- Progress Bar if active -->
								{#if currentShowcaseIndex === i && !isPaused}
									<div
										class="absolute bottom-0 left-0 h-[2px] bg-red-500 transition-all duration-100 ease-linear z-10"
										style="width: {showcaseProgress}%"
									></div>
								{/if}

								<button
									onclick={() => selectShowcase(i)}
									class="w-full text-left py-6 group flex items-start gap-4 transition-all duration-300"
								>
									<!-- Number/Icon Indicator -->
									<div class="flex-shrink-0 pt-1">
										{#if currentShowcaseIndex === i}
											<div
												class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold"
												in:fade
											>
												{i + 1}
											</div>
										{:else}
											<div
												class="text-zinc-500 font-mono text-base group-hover:text-red-500 transition-colors pl-2"
											>
												{(i + 1).toString().padStart(2, "0")}
											</div>
										{/if}
									</div>

									<div class="flex-1">
										<!-- Header (Always Visible) -->
										<h3
											class="font-bold uppercase tracking-widest transition-colors duration-300
                                            {currentShowcaseIndex === i
												? 'text-red-500 mb-4'
												: 'text-zinc-500 group-hover:text-zinc-300'}"
											style="font-size: {currentShowcaseIndex === i
												? '1.5rem'
												: '1.1rem'};"
										>
											{showcase.name}
										</h3>

										<!-- Expanded Content -->
										{#if currentShowcaseIndex === i}
											<div class="space-y-8" in:slide={{ duration: 300 }}>
												<!-- Main Title & Subtitle -->
												<div>
													<h4
														class="text-3xl sm:text-4xl font-bold leading-tight mb-3 {$themeStore ===
														'dark'
															? 'text-white'
															: 'text-zinc-900'}"
													>
														{showcase.title}
													</h4>
													<p class="text-xl sm:text-2xl text-zinc-500">
														{showcase.subtitle}
													</p>
												</div>

												<!-- 3 Points System - INCREASED SIZE -->
												<div
													class="space-y-8 pl-6 border-l-2 border-zinc-800/50"
												>
													{#each showcase.features as feature}
														<div>
															<div class="flex items-center gap-3 mb-2">
																<feature.icon class="w-5 h-5 text-red-500" />
																<span
																	class="font-bold text-base uppercase tracking-wide {$themeStore ===
																	'dark'
																		? 'text-zinc-200'
																		: 'text-zinc-800'}">{feature.title}</span
																>
															</div>
															<!-- Subtext increased to text-lg/xl for readability -->
															<p
																class="text-lg sm:text-xl text-zinc-400 leading-relaxed font-medium"
															>
																{feature.description}
															</p>
														</div>
													{/each}
												</div>

												<a
													href={showcase.link}
													class="text-red-500 font-bold uppercase text-sm tracking-widest hover:text-red-400 transition-colors flex items-center gap-2 pt-4"
												>
													Learn more about {showcase.name.toLowerCase()}
													<ArrowRight class="w-4 h-4" />
												</a>
											</div>
										{/if}
									</div>
								</button>
							</div>
						{/each}
					</div>
				</div>

				<!-- Visual (Right Side - Sticky/Fixed) -->
				<!-- Increased min-height to accommodate Notetaker content -->
				<div
					class="lg:w-7/12 h-[1000px] lg:h-auto min-h-[1000px] sticky top-8 rounded-[2rem] overflow-hidden border-4
                    {$themeStore === 'dark'
						? 'bg-zinc-900 border-zinc-800'
						: 'bg-white border-zinc-200'}"
				>
					{#each showcases as showcase, i}
						{#if currentShowcaseIndex === i}
							<div
								class="absolute inset-0 w-full h-full"
								in:fade={{ duration: 400 }}
							>
								<div
									class="w-full h-full p-1 sm:p-4 md:p-8 flex items-center justify-center bg-zinc-50/5 dark:bg-zinc-900/50 overflow-hidden"
								>
									<div
										class="interactive-scaler w-full h-full flex items-center justify-center"
									>
										<!-- Enforce 100% height boundaries on children -->
										{#if showcase.id === "ai-assistance"}
											<AIAssistanceShowcase
												showAppChrome={true}
												height="100%"
											/>
										{:else if showcase.id === "notetaker"}
											<NotetakerShowcase showAppChrome={true} height="100%" />
										{:else if showcase.id === "followup"}
											<FollowupShowcase showAppChrome={true} height="100%" />
										{:else if showcase.id === "simulator"}
											<SimulatorShowcase showAppChrome={true} height="100%" />
										{:else if showcase.id === "dev-tools"}
											<DevToolsShowcase showAppChrome={true} height="100%" />
										{:else if showcase.id === "crm"}
											<CRMShowcase showAppChrome={true} height="100%" />
										{:else if showcase.id === "sentiment"}
											<SentimentShowcase showAppChrome={true} height="100%" />
										{:else if showcase.id === "custom-goals"}
											<CustomGoalsShowcase showAppChrome={true} height="100%" />
										{/if}
									</div>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</section>

		<!-- PROVEN IMPACT & FEATURES (Redesigned Layout) -->
		<section
			class="w-full relative py-32 {$themeStore === 'dark'
				? 'bg-[#030712]'
				: 'bg-white'}"
			overflow-hidden
			id="testimonials"
		>
			<!-- Centered Header -->
			<div class="text-center mb-20 px-4">
				<span
					class="text-red-600 font-bold tracking-[0.2em] text-xs sm:text-sm uppercase mb-6 block"
					>Trusted by Sales Leaders</span
				>
				<h2
					class="text-6xl sm:text-8xl font-black tracking-tight mb-4 {$themeStore ===
					'dark'
						? 'text-white'
						: 'text-zinc-900'}"
				>
					AI That Eliminates
				</h2>
				<h2 class="text-6xl sm:text-8xl font-black tracking-tight text-red-600">
					Cognitive Overload
				</h2>
				<p class="text-xl sm:text-2xl text-zinc-500 mt-4">
					CROs, Sales, and Technical Sales Teams can finally think clearly.
				</p>
			</div>

			<div class="w-full overflow-hidden pb-12 mb-12 px-[clamp(2rem,6vw,6rem)]">
				<div class="marquee-wrapper">
					<div class="marquee-track">
						{#each testimonials as t}
							<div
								class="w-[350px] sm:w-[450px] p-8 rounded-2xl border transition-all hover:border-red-500/30 group
                             {$themeStore === 'dark'
									? 'bg-[#050915] border-zinc-800'
									: 'bg-white border-zinc-200'}"
							>
								<div class="flex items-center justify-between mb-8">
									<div class="flex items-center gap-3">
										<div
											class="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-sm"
										>
											{t.author[0]}
										</div>
										<div>
											<div
												class="font-bold text-sm text-white pointer-events-none"
											>
												{t.author}
											</div>
											<div
												class="text-xs text-zinc-500 uppercase tracking-wider"
											>
												{t.role}
											</div>
										</div>
									</div>
									<div class="text-2xl font-black text-red-600">{t.metric}</div>
								</div>
								<p
									class="text-base sm:text-lg leading-relaxed font-medium
                                 {$themeStore === 'dark'
										? 'text-zinc-300'
										: 'text-zinc-600'}"
								>
									"{t.quote}"
								</p>
								<div
									class="mt-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right"
								>
									{t.metricLabel}
								</div>
							</div>
						{/each}
					</div>

					<div class="marquee-track">
						{#each testimonials as t}
							<div
								class="w-[350px] sm:w-[450px] p-8 rounded-2xl border transition-all hover:border-red-500/30 group
                             {$themeStore === 'dark'
									? 'bg-[#050915] border-zinc-800'
									: 'bg-white border-zinc-200'}"
							>
								<div class="flex items-center justify-between mb-8">
									<div class="flex items-center gap-3">
										<div
											class="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-sm"
										>
											{t.author[0]}
										</div>
										<div>
											<div
												class="font-bold text-sm text-white pointer-events-none"
											>
												{t.author}
											</div>
											<div
												class="text-xs text-zinc-500 uppercase tracking-wider"
											>
												{t.role}
											</div>
										</div>
									</div>
									<div class="text-2xl font-black text-red-600">{t.metric}</div>
								</div>
								<p
									class="text-base sm:text-lg leading-relaxed font-medium
                                 {$themeStore === 'dark'
										? 'text-zinc-300'
										: 'text-zinc-600'}"
								>
									"{t.quote}"
								</p>
								<div
									class="mt-4 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right"
								>
									{t.metricLabel}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<!-- Built For ... Feature Box (Centered) -->
			<div class="max-w-[90vw] mx-auto">
				<div
					class="rounded-[2.5rem] p-8 sm:p-16 border relative overflow-hidden
                     {$themeStore === 'dark'
						? 'bg-[#050915] border-zinc-800'
						: 'bg-zinc-50 border-zinc-200'}"
				>
					<div class="text-center mb-16">
						<h3
							class="text-2xl font-bold mb-2 {$themeStore === 'dark'
								? 'text-white'
								: 'text-zinc-900'}"
						>
							Built for Revenue Teams
						</h3>
						<p
							class="text-sm uppercase tracking-widest {$themeStore === 'dark'
								? 'text-zinc-500'
								: 'text-zinc-500'}"
						>
							Empowering every role to perform with unparalleled clarity
						</p>
					</div>

					<div
						class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left"
					>
						<!-- 01 -->
						<div class="relative group">
							<span
								class="text-6xl font-black absolute -top-12 -left-2 z-0 group-hover:text-red-900/20 transition-colors
                                {$themeStore === 'dark'
									? 'text-zinc-800/50'
									: 'text-zinc-200'}">01</span
							>
							<div class="relative z-10">
								<h4
									class="text-xl font-bold mb-4 {$themeStore === 'dark'
										? 'text-white'
										: 'text-zinc-900'}"
								>
									CROs & Revenue Leaders
								</h4>
								<p
									class="leading-relaxed {$themeStore === 'dark'
										? 'text-zinc-400'
										: 'text-zinc-600'}"
								>
									Gain ultimate visibility into pipeline health and performance
									with AI-driven analytics and forecasting.
								</p>
							</div>
						</div>
						<!-- 02 -->
						<div class="relative group">
							<span
								class="text-6xl font-black absolute -top-12 -left-2 z-0 group-hover:text-red-900/20 transition-colors
                                {$themeStore === 'dark'
									? 'text-zinc-800/50'
									: 'text-zinc-200'}">02</span
							>
							<div class="relative z-10">
								<h4
									class="text-xl font-bold mb-4 {$themeStore === 'dark'
										? 'text-white'
										: 'text-zinc-900'}"
								>
									Sales & Account Executives
								</h4>
								<p
									class="leading-relaxed {$themeStore === 'dark'
										? 'text-zinc-400'
										: 'text-zinc-600'}"
								>
									Focus on closing while AI handles the grunt work—real-time
									coaching, instant follow-ups, and CRM automation.
								</p>
							</div>
						</div>
						<!-- 03 -->
						<div class="relative group">
							<span
								class="text-6xl font-black absolute -top-12 -left-2 z-0 group-hover:text-red-900/20 transition-colors
                                {$themeStore === 'dark'
									? 'text-zinc-800/50'
									: 'text-zinc-200'}">03</span
							>
							<div class="relative z-10">
								<h4
									class="text-xl font-bold mb-4 {$themeStore === 'dark'
										? 'text-white'
										: 'text-zinc-900'}"
								>
									Technical Sales Teams
								</h4>
								<p
									class="leading-relaxed {$themeStore === 'dark'
										? 'text-zinc-400'
										: 'text-zinc-600'}"
								>
									Dominate complex deals with instant access to technical specs
									and automated tracking of solution commitments.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA - UPDATED TEXT -->
		<section
			class="w-full relative overflow-hidden flex flex-col justify-center items-center text-center
            {$themeStore === 'dark' ? 'bg-[#030712]' : 'bg-zinc-50'}"
			style="padding: clamp(6rem, 12vh, 12rem) clamp(2rem, 4vw, 4rem);"
		>
			<h2
				class="font-black leading-[0.85] tracking-tighter mb-8 max-w-5xl
                {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}"
				style="font-size: clamp(3.5rem, 8vw, 8rem);"
			>
				Empower Your Revenue Team With<br />
				<span class="text-red-600 block sm:inline">AI Intelligence</span>
			</h2>

			<p
				class="text-xl sm:text-2xl font-medium mb-12 max-w-3xl leading-relaxed
                {$themeStore === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}"
			>
				Join revenue teams accelerating performance with conversational AI.
				Real-time insights, automated follow-ups, and seamless integrations.
			</p>

			<div
				class="flex flex-col items-center gap-6 w-full max-w-3xl justify-center z-10"
			>
				<a
					href="/contact-sales"
					class="bg-red-600 text-white font-bold rounded-full hover:bg-red-700 hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-xl"
					style="height: clamp(3.5rem, 5vw, 5rem); padding: 0 clamp(3rem, 6vw, 6rem); font-size: clamp(1rem, 1.3vw, 1.5rem);"
				>
					Contact Sales
					<ArrowRight class="w-5 h-5" />
				</a>
				<div class="text-sm sm:text-base font-medium text-zinc-500">
					Free forever plan • No credit card required • Quick setup
				</div>
			</div>

			<!-- Background Decoration -->
			<div class="absolute inset-0 opacity-20 pointer-events-none">
				<div
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(128,128,128,0.2)_0%,transparent_60%)]"
				></div>
			</div>
		</section>


	<Footer />


<style>
	/* Utility for hiding scrollbar but allowing scroll */
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
	.marquee-wrapper {
		display: flex;
		width: max-content;
		animation: marquee 40s linear infinite;
		gap: 2rem;
	}

	.marquee-wrapper:hover {
		animation-play-state: paused;
	}

	.marquee-track {
		display: flex;
		gap: 2rem;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}
	/* CTA Button */
	.contextual-cta {
		background: #ef4444;
		color: var(--foreground);
		border: 2px solid #ef4444;
		transition: all 0.2s ease;
	}

	.contextual-cta:hover {
		background: #dc2626;
		border-color: #dc2626;
	}

	.cta-icon {
		width: 2rem;
		height: 2rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 9999px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		transition: all 0.2s ease;
	}

	.interactive-scaler {
		transition: transform 0.3s ease;
		transform-origin: center center;
		flex-shrink: 0;
	}

	@media (max-width: 1280px) {
		.interactive-scaler {
			transform: scale(0.85);
		}
	}

	@media (max-width: 1024px) {
		.interactive-scaler {
			transform: scale(1); /* Reset for mobile stack view */
			width: 100% !important;
			height: 100% !important;
		}
	}

	@media (max-width: 768px) {
		.interactive-scaler {
			transform: scale(0.6);
			width: 166% !important; /* Compensate for scale: 1/0.6 = 1.66 */
			height: 166% !important;
		}
	}

	@media (max-width: 480px) {
		.interactive-scaler {
			transform: scale(0.45);
			width: 222% !important; /* 1/0.45 = 2.22 */
			height: 222% !important;
		}
	}
</style>
