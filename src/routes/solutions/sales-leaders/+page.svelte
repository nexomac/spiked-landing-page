<script>
	import FeatureNav from "$lib/components/features/FeatureNav.svelte";
	import FeatureFooter from "$lib/components/features/FeatureFooter.svelte";
	import SimulatorShowcase from "$lib/components/features/SimulatorShowcase.svelte";
	import SentimentShowcase from "$lib/components/features/SentimentShowcase.svelte";
	import ThemeCard from "$lib/components/ui/ThemeCard.svelte";
	import ThemeSection from "$lib/components/ui/ThemeSection.svelte";
	import ThemeHeadline from "$lib/components/ui/ThemeHeadline.svelte";
	import {
		Users,
		TrendingUp,
		Search,
		Zap,
		ArrowRight,
		CheckCircle,
		Brain,
		BarChart3,
		PlayCircle,
		ShieldCheck,
	} from "lucide-svelte";
	import { onboardingStore } from "$lib/stores/onboarding.js";
	import { fly, fade } from "svelte/transition";
	import { onMount } from "svelte";

	let mouseX = $state(0);
	let mouseY = $state(0);

	onMount(() => {
		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	});
</script>

<svelte:head>
	<title>For Sales Leaders & Managers | SpikedAI</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground overflow-hidden">
	<FeatureNav />

	<!-- Hero -->
	<ThemeSection class="pt-32 pb-24 relative">
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-indigo-500/10 rounded-full blur-[120px]"
			></div>
		</div>

		<div class="max-w-5xl mx-auto px-6 relative z-10 text-center space-y-8">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20"
			>
				<Users class="w-5 h-5 text-indigo-400" />
				<span
					class="text-xs font-black text-indigo-400 uppercase tracking-widest"
					>Built for High-Growth Teams</span
				>
			</div>

			<ThemeHeadline variant="h1" class="text-6xl md:text-8xl">
				Coach <span class="text-indigo-500">at Scale</span><br />
				Without the Burnout.
			</ThemeHeadline>

			<p class="text-xl text-muted-foreground max-w-3xl mx-auto">
				Stop sitting in on every Zoom call. SpikedAI surfaces the coaching
				moments that matter, identifies top-performer patterns, and helps you
				replicate them across your whole team.
			</p>
		</div>
	</ThemeSection>

	<!-- Feature Row: Visibility -->
	<ThemeSection background="alternate" class="py-24">
		<div class="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
			<div class="space-y-8">
				<div
					class="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20"
				>
					<BarChart3 class="w-8 h-8 text-white" />
				</div>
				<ThemeHeadline variant="h2"
					>Visibility Into Every Conversation.</ThemeHeadline
				>
				<p class="text-lg text-muted-foreground">
					Get a high-level pulse on deal health and sentiment across all team
					interactions. No more asking "how did it go?" — just look at the
					dashboard.
				</p>

				<div class="grid sm:grid-cols-2 gap-4">
					{#each ["Sentiment Tracking", "Deal Risk Alerts", "Topic Coverage", "Competitor Mentions"] as feature}
						<div
							class="flex items-center gap-3 p-4 bg-card border border-zinc-800 rounded-xl"
						>
							<CheckCircle class="w-5 h-5 text-indigo-500" />
							<span class="font-bold text-sm">{feature}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="relative">
				<SentimentShowcase {mouseX} {mouseY} height="550px" />
			</div>
		</div>
	</ThemeSection>

	<!-- Feature Row: Training -->
	<ThemeSection class="py-24">
		<div class="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
			<div class="order-2 lg:order-1">
				<SimulatorShowcase {mouseX} {mouseY} height="550px" />
			</div>
			<div class="space-y-8 order-1 lg:order-2">
				<div
					class="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20"
				>
					<PlayCircle class="w-8 h-8 text-white" />
				</div>
				<ThemeHeadline variant="h2">Train Without the Time Sync.</ThemeHeadline>
				<p class="text-lg text-muted-foreground">
					Let your reps practice objection handling and pitch delivery against
					an AI that mimics your real buyers. They get better, you get your time
					back.
				</p>

				<div class="space-y-4">
					<ThemeCard class="p-6">
						<h4
							class="text-sm font-black text-indigo-400 uppercase tracking-widest mb-2"
						>
							Replicate Top Performers
						</h4>
						<p class="text-muted-foreground">
							Upload your best calls and SpikedAI will model its simulations and
							coaching based on what actually works for your top 1% AE.
						</p>
					</ThemeCard>
				</div>
			</div>
		</div>
	</ThemeSection>

	<!-- Testimonial Section -->
	<ThemeSection background="alternate" class="py-24">
		<div class="max-w-4xl mx-auto">
			<div
				class="relative p-12 bg-card rounded-[3rem] border border-zinc-800 shadow-2xl overflow-hidden"
			>
				<div
					class="absolute -top-12 -right-12 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"
				></div>
				<div class="relative z-10 space-y-6">
					<div class="flex gap-1">
						{#each [1, 2, 3, 4, 5] as _}
							<Zap class="w-5 h-5 fill-indigo-500 text-indigo-500" />
						{/each}
					</div>
					<p class="text-2xl md:text-3xl font-bold italic leading-tight">
						"SpikedAI has essentially given me an extra 10 hours a week. I don't
						have to listen to 50 calls anymore to find the one where the rep
						struggled. The AI flags it for me, and I can jump right into
						coaching."
					</p>
					<div class="flex items-center gap-4 pt-4">
						<div class="w-12 h-12 rounded-full bg-zinc-800"></div>
						<div>
							<div class="font-black text-lg text-foreground">
								Marcus Thorne
							</div>
							<div class="text-sm text-muted-foreground font-bold">
								VP of Sales @ CloudScale
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</ThemeSection>

	<!-- Call to Action -->
	<ThemeSection class="py-32 flex justify-center">
		<div class="text-center space-y-10">
			<ThemeHeadline variant="h2" class="text-5xl md:text-6xl"
				>Ready to turn every rep into an elite performer?</ThemeHeadline
			>
			<div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
				<button
					onclick={onboardingStore.start}
					class="px-12 py-6 bg-indigo-600 text-white font-black text-2xl rounded-full hover:shadow-2xl hover:shadow-indigo-500/40 transition-all hover:scale-105"
				>
					Start Scaling Now
				</button>
				<a
					href="/pricing"
					class="px-8 py-4 bg-transparent text-white font-bold text-lg hover:text-indigo-400 transition-colors flex items-center gap-2 group"
				>
					View Enterprise Pricing
					<ArrowRight
						class="w-5 h-5 group-hover:translate-x-2 transition-transform"
					/>
				</a>
			</div>
		</div>
	</ThemeSection>

	<FeatureFooter />
</div>

<style>
	:global(body) {
		background-color: #0b0f1a;
	}
</style>
