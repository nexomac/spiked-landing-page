<script>
	import FeatureNav from "$lib/components/features/FeatureNav.svelte";
	import FeatureFooter from "$lib/components/features/FeatureFooter.svelte";
	import AIAssistanceShowcase from "$lib/components/features/AIAssistanceShowcase.svelte";
	import ThemeCard from "$lib/components/ui/ThemeCard.svelte";
	import ThemeSection from "$lib/components/ui/ThemeSection.svelte";
	import ThemeHeadline from "$lib/components/ui/ThemeHeadline.svelte";
	import {
		Zap,
		Search,
		BookOpen,
		MessageSquare,
		Shield,
		ArrowRight,
		CheckCircle,
		Sparkles,
		Brain,
		Database,
		Lock,
		Terminal,
		Bot,
		LineChart,
		FileText,
		Globe,
		Users,
	} from "lucide-svelte";
	import { onboardingStore } from "$lib/stores/onboarding.js";
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";

	// Parallax and animation states
	let mouseX = $state(0);
	let mouseY = $state(0);
	let scrollY = $state(0);

	// Auto-rotate questions for demo
	let isAutoPlaying = $state(true);
	let activeTab = $state("roi");

	onMount(() => {
		// Handle mouse movement for parallax
		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};

		// Handle scroll for parallax
		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
		};
	});
</script>

<svelte:head>
	<title>Real-Time AI Assistance | SpikedAI</title>
	<meta
		name="description"
		content="Get instant, contextual answers during your sales calls with SpikedAI's real-time assistance based on your sales and solutions docs."
	/>
</svelte:head>

<div class="min-h-screen bg-background text-foreground overflow-hidden">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="ai-assistance" />

	<!-- Hero Section -->
	<ThemeSection id="hero" background="default" class="pt-32 pb-24 top-10">
		<div class="grid lg:grid-cols-2 gap-16 items-start">
			<!-- Left Column - Content -->
			<div class="lg:sticky lg:top-32 z-10 space-y-8">
				<!-- Label -->
				<div
					class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20"
					in:fly={{ y: -20, duration: 600, delay: 100 }}
				>
					<Sparkles class="w-4 h-4 text-primary animate-pulse" />
					<span
						class="text-xs font-semibold text-primary uppercase tracking-wider"
						>Real-Time Assistance</span
					>
				</div>

				<!-- Main Headline -->
				<ThemeHeadline variant="h1" class="leading-[1.1]">
					Real-time AI answers<br />
					<span
						class="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
						>from your sales docs</span
					>
				</ThemeHeadline>

				<!-- Three Feature Cards -->
				<div class="space-y-4">
					<!-- Instant answers -->
					<ThemeCard
						class="p-4 flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer"
						delay={300}
					>
						<div
							class="w-10 h-10 rounded-lg bg-card-foreground/5 flex items-center justify-center flex-shrink-0"
						>
							<Zap class="w-5 h-5 text-muted-foreground" />
						</div>
						<div>
							<h3
								class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
							>
								Instant answers during calls
							</h3>
							<p class="text-sm text-muted-foreground">
								No more "I'll get back to you on that"
							</p>
						</div>
					</ThemeCard>

					<!-- Powered by your knowledge base (highlighted) -->
					<ThemeCard
						class="p-4 flex items-start gap-4 border-l-4 border-l-primary hover:border-r-primary/50 transition-colors cursor-pointer bg-primary/5"
						delay={400}
					>
						<div
							class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
						>
							<Database class="w-5 h-5 text-primary" />
						</div>
						<div>
							<h3
								class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
							>
								Powered by your knowledge base
							</h3>
							<p class="text-sm text-muted-foreground">
								Connects to Notion, Google Drive, and PDFs
							</p>
						</div>
					</ThemeCard>

					<!-- Never miss a detail -->
					<ThemeCard
						class="p-4 flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer"
						delay={500}
					>
						<div
							class="w-10 h-10 rounded-lg bg-card-foreground/5 flex items-center justify-center flex-shrink-0"
						>
							<Shield class="w-5 h-5 text-muted-foreground" />
						</div>
						<div>
							<h3
								class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
							>
								Never miss a detail
							</h3>
							<p class="text-sm text-muted-foreground">
								Handle objections and technical questions with confidence
							</p>
						</div>
					</ThemeCard>
				</div>

				<!-- CTA Link -->
				<a
					href="/"
					class="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group text-lg"
					in:fly={{ y: 20, duration: 600, delay: 700 }}
				>
					<span>Get started with AI assistance</span>
					<ArrowRight
						class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
					/>
				</a>
			</div>

			<!-- Right Column - Product Showcase -->
			<AIAssistanceShowcase
				bind:activeTab
				bind:isAutoPlaying
				{mouseX}
				{mouseY}
				height="600px"
				showAppChrome={true}
			/>
		</div>
	</ThemeSection>

	<!-- Key Features Grid -->
	<ThemeSection background="alternate" class="py-20">
		<div class="text-center mb-12 space-y-4">
			<ThemeHeadline variant="h2"
				>Your Entire Knowledge Base, On Call</ThemeHeadline
			>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				SpikedAI indexes your sales materials and surfaces exactly what you
				need, when you need it.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each [{ title: "Connect Any Source", desc: "Sync with Notion, Google Drive, SharePoint, Confluence, or upload PDFs and sales decks directly.", icon: Globe, color: "text-blue-500", bg: "bg-blue-500/10" }, { title: "Context-Aware Retrieval", desc: "The AI listens to the conversation and retrieves relevant info based on the current topic, not just keywords.", icon: Brain, color: "text-purple-500", bg: "bg-purple-500/10" }, { title: "Objection Battlecards", desc: "Automatically surface the right competitive positioning and objection handling scripts in real-time.", icon: Shield, color: "text-red-500", bg: "bg-red-500/10" }, { title: "Technical FAQs", desc: "Answer complex technical questions instantly without needing a sales engineer on every call.", icon: Terminal, color: "text-green-500", bg: "bg-green-500/10" }, { title: "Pricing & Packaging", desc: "Pull up up-to-date pricing sheets and discounting policies instantly without searching through folders.", icon: LineChart, color: "text-orange-500", bg: "bg-orange-500/10" }, { title: "Secure & Private", desc: "Your data is encrypted and isolated. We are SOC2 compliant and never train public models on your data.", icon: Lock, color: "text-zinc-500", bg: "bg-zinc-500/10" }] as feature}
				<ThemeCard class="p-6 hover:border-primary/50 transition-all group">
					<div
						class="w-12 h-12 rounded-lg {feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
					>
						<feature.icon class="w-6 h-6 {feature.color}" />
					</div>
					<h3 class="text-lg font-bold text-foreground mb-2">
						{feature.title}
					</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						{feature.desc}
					</p>
				</ThemeCard>
			{/each}
		</div>
	</ThemeSection>

	<!-- CTA Section -->
	<ThemeSection background="default" class="py-20">
		<div class="max-w-4xl mx-auto px-6 text-center space-y-8">
			<div
				class="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto shadow-2xl shadow-primary/30"
			>
				<Zap class="w-8 h-8 text-primary-foreground" />
			</div>
			<ThemeHeadline variant="h2">Never Be Stumped Again.</ThemeHeadline>
			<p class="text-xl text-muted-foreground leading-relaxed">
				Empower your sales team with the collective intelligence of your
				organization on every single call.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all hover:scale-105"
				>
					<Sparkles class="w-5 h-5" />
					Get Genius on Calls
					<ArrowRight class="w-5 h-5 ml-2" />
				</a>
				<a
					href="/"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold rounded-xl transition-all border border-border"
				>
					<Users class="w-5 h-5" />
					Book a Demo
				</a>
			</div>
			<p class="text-sm text-muted-foreground mt-6">
				No credit card required • Set up in 5 minutes • Cancel anytime
			</p>
		</div>
	</ThemeSection>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="ai-assistance" />
</div>
```
