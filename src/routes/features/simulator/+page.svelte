<script>
	import FeatureNav from "$lib/components/features/FeatureNav.svelte";
	import FeatureFooter from "$lib/components/features/FeatureFooter.svelte";
	import SimulatorShowcase from "$lib/components/features/SimulatorShowcase.svelte";
	import ThemeCard from "$lib/components/ui/ThemeCard.svelte";
	import ThemeSection from "$lib/components/ui/ThemeSection.svelte";
	import ThemeHeadline from "$lib/components/ui/ThemeHeadline.svelte";
	import {
		MessageSquare,
		Mic,
		Users,
		Activity,
		Award,
		FileText,
		Trophy,
		Calendar,
		Zap,
		ArrowRight,
		BarChart3,
		Brain,
		Shield,
		Target,
		TrendingUp,
		PlayCircle,
		Sparkles,
	} from "lucide-svelte";
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";

	let simulationActive = $state(false);
	let isPaused = $state(false);
	let selectedScenario = $state("discovery");
	let currentDialogueIndex = $state(0);
	let showCoaching = $state(true);
	let hoveredDialogue = $state(null);

	function startSimulation() {
		simulationActive = true;
		isPaused = false;
	}

	// Parallax states
	let mouseX = $state(0);
	let mouseY = $state(0);
	let scrollY = $state(0);

	onMount(() => {
		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};

		const handleScroll = () => {
			scrollY = window.scrollY;
		};
np
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("scroll", handleScroll);
		};
	});

	// New state for SimulatorShowcase
	let activeFeature = $state("simulator");
	let isAutoPlaying = $state(false);
</script>

```
<svelte:head>
	<title>Meeting Simulator & Coaching | SpikedAI</title>
	<meta
		name="description"
		content="Practice sales conversations with AI-powered prospects and get real-time coaching to master your pitch, objection handling, and closing techniques."
	/>
</svelte:head>

<div class="min-h-screen bg-background text-foreground overflow-hidden">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="simulator" />

	<!-- Hero Section -->
	<ThemeSection id="hero" background="default" class="pt-32 pb-20">
		<div class="grid lg:grid-cols-2 gap-16 items-start">
			<!-- Left Column - Content -->
			<div class="lg:sticky lg:top-32 z-10 space-y-8">
				<!-- Label -->
				<div
					class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20"
					in:fly={{ y: -20, duration: 600, delay: 100 }}
				>
					<Users class="w-4 h-4 text-primary animate-pulse" />
					<span
						class="text-xs font-semibold text-primary uppercase tracking-wider"
						>AI Roleplay Simulator</span
					>
				</div>

				<!-- Main Headline -->
				<ThemeHeadline variant="h1" class="leading-[1.1]">
					Practice with AI,<br />
					<span
						class="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
						>Perform Like a Pro</span
					>
				</ThemeHeadline>

				<!-- Three Feature Cards -->
				<div class="space-y-4">
					<!-- Real-time coaching -->
					<ThemeCard
						class="p-4 flex items-start gap-4 border-l-4 border-l-primary hover:border-r-primary/50 transition-colors cursor-pointer bg-primary/5"
						delay={300}
					>
						<div
							class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
						>
							<Mic class="w-5 h-5 text-primary" />
						</div>
						<div>
							<h3
								class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
							>
								Real-time coaching
							</h3>
							<p class="text-sm text-muted-foreground">
								Get instant feedback on your pitch, tone, and pacing
							</p>
						</div>
					</ThemeCard>

					<!-- Hyper-realistic prospects -->
					<ThemeCard
						class="p-4 flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer"
						delay={400}
					>
						<div
							class="w-10 h-10 rounded-lg bg-card-foreground/5 flex items-center justify-center flex-shrink-0"
						>
							<Users class="w-5 h-5 text-muted-foreground" />
						</div>
						<div>
							<h3
								class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
							>
								Hyper-realistic prospects
							</h3>
							<p class="text-sm text-muted-foreground">
								Practice with AI personas that react like real buyers
							</p>
						</div>
					</ThemeCard>

					<!-- Multiple scenarios -->
					<ThemeCard
						class="p-4 flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer"
						delay={500}
					>
						<div
							class="w-10 h-10 rounded-lg bg-card-foreground/5 flex items-center justify-center flex-shrink-0"
						>
							<Target class="w-5 h-5 text-muted-foreground" />
						</div>
						<div>
							<h3
								class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
							>
								Multiple scenarios
							</h3>
							<p class="text-sm text-muted-foreground">
								Master discovery, demos, objections, and closing with custom
								difficulty
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
					<span>Start training with AI simulator</span>
					<ArrowRight
						class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
					/>
				</a>
			</div>

			<!-- Right Column - Simulator Showcase -->
			<SimulatorShowcase
				bind:activeFeature
				bind:isAutoPlaying
				{mouseX}
				{mouseY}
			/>
		</div>
	</ThemeSection>

	<!-- Key Features Grid -->
	<!-- Key Features Grid -->
	<ThemeSection background="alternate" class="py-20">
		<div class="text-center mb-12 space-y-4">
			<ThemeHeadline variant="h2">Master Every Scenario</ThemeHeadline>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Train like an athlete. Get instant feedback. Close more deals.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each [{ title: "Hyper-Realistic AI Prospects", desc: "Practice with AI personas that respond naturally, ask tough questions, and throw realistic objections—just like real buyers.", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" }, { title: "Real-Time AI Coaching", desc: "Get instant feedback on your questions, talk-time ratio, value statements, and sales methodology—as the conversation happens.", icon: Brain, color: "text-red-500", bg: "bg-red-500/10" }, { title: "Multiple Scenarios", desc: "Practice discovery calls, product demos, objection handling, negotiation, and deal closing—all with custom difficulty levels.", icon: Target, color: "text-purple-500", bg: "bg-purple-500/10" }, { title: "Performance Analytics", desc: "Track your improvement over time. See how your scores improve across scenarios, questions quality, and objection handling.", icon: BarChart3, color: "text-green-500", bg: "bg-green-500/10" }, { title: "Framework Coaching", desc: "Get coached on MEDDIC, BANT, Challenger Sale, SPIN Selling, or custom sales methodologies your team uses.", icon: Activity, color: "text-orange-500", bg: "bg-orange-500/10" }, { title: "Accelerate Onboarding", desc: "New reps can practice hundreds of scenarios before their first real call. Cut ramp time in half with AI training.", icon: TrendingUp, color: "text-cyan-500", bg: "bg-cyan-500/10" }, { title: "Detailed Session Reports", desc: "Get comprehensive post-simulation reports with transcripts, scoring breakdown, and specific improvement recommendations.", icon: FileText, color: "text-pink-500", bg: "bg-pink-500/10" }, { title: "Practice Tough Objections", desc: "Master handling pricing objections, competitive comparisons, security concerns, and implementation questions.", icon: Shield, color: "text-indigo-500", bg: "bg-indigo-500/10" }, { title: "Leaderboards & Achievements", desc: "Gamify your practice sessions. Compete with teammates, unlock achievements, and see who masters each scenario first.", icon: Trophy, color: "text-teal-500", bg: "bg-teal-500/10" }] as feature}
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

	<!-- Results Section -->
	<ThemeSection background="default" class="py-20">
		<div class="max-w-6xl mx-auto px-6">
			<div class="text-center mb-12 space-y-4">
				<ThemeHeadline variant="h2"
					>Proven Results from AI Coaching</ThemeHeadline
				>
				<p class="text-lg text-muted-foreground">
					See how teams transform their performance with simulator training
				</p>
			</div>

			<div class="grid md:grid-cols-4 gap-6">
				{#each [{ value: "2.5x", label: "Faster Ramp Time", color: "text-green-500" }, { value: "47%", label: "Higher Close Rate", color: "text-blue-500" }, { value: "65%", label: "Better Objection Handling", color: "text-red-500" }, { value: "91%", label: "Rep Confidence Score", color: "text-purple-500" }] as stat}
					<ThemeCard class="text-center p-6 border-zinc-800">
						<div class="text-4xl font-bold {stat.color} mb-2">{stat.value}</div>
						<div class="text-sm text-muted-foreground">{stat.label}</div>
					</ThemeCard>
				{/each}
			</div>
		</div>
	</ThemeSection>

	<!-- CTA Section -->
	<ThemeSection background="alternate" class="py-20">
		<div class="max-w-4xl mx-auto px-6 text-center space-y-8">
			<div
				class="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto shadow-2xl shadow-primary/30"
			>
				<Users class="w-8 h-8 text-primary-foreground" />
			</div>
			<ThemeHeadline variant="h2"
				>Stop Learning on Real Deals.<br />Practice with AI First.</ThemeHeadline
			>
			<p class="text-xl text-muted-foreground leading-relaxed">
				Your competitors' reps are winging it on live calls. Yours will be
				trained, coached, and ready to close from day one.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<button
					onclick={startSimulation}
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all hover:scale-105"
				>
					<PlayCircle class="w-5 h-5" />
					Try Simulator Now
					<ArrowRight class="w-5 h-5 ml-2" />
				</button>
				<a
					href="/"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold rounded-xl transition-all border border-border"
				>
					<Calendar class="w-5 h-5" />
					Book a Demo
				</a>
			</div>
			<p class="text-sm text-muted-foreground mt-6">
				No credit card required • Unlimited practice sessions • Track your
				improvement
			</p>
		</div>
	</ThemeSection>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="simulator" />
</div>
