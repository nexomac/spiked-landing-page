<script>
	import FeatureNav from "$lib/components/features/FeatureNav.svelte";
	import FeatureFooter from "$lib/components/features/FeatureFooter.svelte";
	import SentimentShowcase from "$lib/components/features/SentimentShowcase.svelte";
	import NotetakerShowcase from "$lib/components/features/NotetakerShowcase.svelte";
	import ThemeCard from "$lib/components/ui/ThemeCard.svelte";
	import ThemeSection from "$lib/components/ui/ThemeSection.svelte";
	import ThemeHeadline from "$lib/components/ui/ThemeHeadline.svelte";
	import {
		LineChart,
		TrendingUp,
		Target,
		Zap,
		ArrowRight,
		CheckCircle,
		Brain,
		Users,
		ShieldCheck,
		Globe,
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
	<title>For Revenue Leaders & CROs | SpikedAI</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground overflow-hidden">
	<FeatureNav />

	<!-- Hero -->
	<ThemeSection class="pt-32 pb-24 relative overflow-hidden">
		<!-- Background decorative elements -->
		<div class="absolute inset-0 pointer-events-none">
			<div
				class="absolute top-0 right-0 w-[40rem] h-[40rem] bg-red-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"
			></div>
			<div
				class="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-blue-600/5 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4"
			></div>
		</div>

		<div class="max-w-5xl mx-auto px-6 text-center space-y-10 relative z-10">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 bg-foreground/5 rounded-full border border-border"
			>
				<LineChart class="w-5 h-5 text-red-500" />
				<span
					class="text-xs font-black text-foreground uppercase tracking-widest"
					>The Revenue Execution Platform</span
				>
			</div>

			<ThemeHeadline variant="h1" class="text-6xl md:text-8xl leading-tight">
				True <span
					class="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent italic"
					>Pipeline Clarity</span
				><br />
				From Word One.
			</ThemeHeadline>

			<p class="text-xl text-muted-foreground max-w-3xl mx-auto">
				Eliminate the gap between what's in the CRM and what's happening on the
				ground. SpikedAI provides ground-truth intelligence into every deal
				journey.
			</p>

			<div class="flex justify-center pt-4">
				<button
					onclick={onboardingStore.start}
					class="px-12 py-6 bg-gradient-to-r from-red-600 to-red-700 text-white font-black text-2xl rounded-full shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 transition-all hover:-translate-y-1 flex items-center gap-4"
				>
					Modernize Revenue Ops
					<ArrowRight class="w-6 h-6" />
				</button>
			</div>
		</div>
	</ThemeSection>

	<!-- Market Map / Insight Grid -->
	<ThemeSection background="alternate" class="py-24">
		<div class="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
			{#each [{ icon: Zap, title: "Operational Speed", desc: "Reduce the time between call-end and CRM-update to milliseconds." }, { icon: Target, title: "Forecast Accuracy", desc: "Ground your forecast in actual buying signals, not rep intuition." }, { icon: ShieldCheck, title: "Revenue Protection", desc: "Identify churn signals and deal risks weeks before they become issues." }] as item}
				<div
					class="p-8 bg-card border border-zinc-800 rounded-[2.5rem] space-y-4 hover:border-red-600/50 transition-all group group-hover:-translate-y-2"
				>
					<div
						class="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform"
					>
						<item.icon class="w-8 h-8" />
					</div>
					<h3 class="text-2xl font-black">{item.title}</h3>
					<p class="text-muted-foreground">{item.desc}</p>
				</div>
			{/each}
		</div>
	</ThemeSection>

	<!-- Deal Intelligence Section -->
	<ThemeSection class="py-24">
		<div class="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
			<div class="space-y-8">
				<ThemeHeadline variant="h2"
					>The Ground Truth of Your Revenue.</ThemeHeadline
				>
				<p class="text-lg text-muted-foreground">
					Stop relying on self-reported data. SpikedAI analyzes the sentiment
					and engagement of your prospects across the entire deal cycle.
				</p>

				<div class="space-y-6">
					<div class="flex gap-4">
						<div
							class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white flex-shrink-0 mt-1"
						>
							<CheckCircle class="w-5 h-5" />
						</div>
						<div>
							<h4 class="text-xl font-bold">Engagement Scoring</h4>
							<p class="text-muted-foreground">
								Quantify buyer intent based on specific questions asked,
								participation levels, and sentiment shifts.
							</p>
						</div>
					</div>
					<div class="flex gap-4">
						<div
							class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white flex-shrink-0 mt-1"
						>
							<CheckCircle class="w-5 h-5" />
						</div>
						<div>
							<h4 class="text-xl font-bold">Risk Identification</h4>
							<p class="text-muted-foreground">
								Automatically flag deals where key competitors are mentioned or
								where decision-makers expressed hesitation.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="relative">
				<SentimentShowcase {mouseX} {mouseY} height="550px" />
			</div>
		</div>
	</ThemeSection>

	<!-- Global Visibility -->
	<ThemeSection background="alternate" class="py-24">
		<div class="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
			<div class="order-2 lg:order-1">
				<NotetakerShowcase {mouseX} {mouseY} height="550px" />
			</div>
			<div class="space-y-8 order-1 lg:order-2">
				<div
					class="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center"
				>
					<Globe class="w-8 h-8 text-red-500" />
				</div>
				<ThemeHeadline variant="h2"
					>Visibility Across Every Geography.</ThemeHeadline
				>
				<p class="text-lg text-muted-foreground">
					Whether your team is in one room or across the globe, SpikedAI
					provides a unified lens into how your product is being pitched and
					received.
				</p>

				<div
					class="p-8 bg-zinc-950 rounded-[3rem] border border-zinc-800 space-y-6"
				>
					<div class="flex items-center justify-between">
						<h4 class="text-lg font-black italic">Sales Performance Hub</h4>
						<span
							class="px-3 py-1 bg-red-600/10 text-red-500 text-xs font-bold rounded-full"
							>REAL-TIME FEED</span
						>
					</div>
					<div class="space-y-3">
						<div class="flex items-center justify-between text-sm">
							<span class="text-zinc-400 italic">Total Call Hours Analyzed</span
							>
							<span class="font-bold">14,302</span>
						</div>
						<div class="flex items-center justify-between text-sm">
							<span class="text-zinc-400 italic">Buying Signals Detected</span>
							<span class="font-bold text-green-500">+12% Wow</span>
						</div>
						<div class="flex items-center justify-between text-sm">
							<span class="text-zinc-400 italic">Competitor Displacement %</span
							>
							<span class="font-bold text-blue-500">28.4%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</ThemeSection>

	<!-- Final CTA -->
	<ThemeSection class="py-40 flex justify-center text-center">
		<div class="max-w-4xl space-y-12">
			<ThemeHeadline variant="h2" class="text-7xl font-black"
				>Ready to own your <span class="text-red-500 italic"
					>revenue future?</span
				></ThemeHeadline
			>
			<p class="text-2xl text-muted-foreground">
				Join the world's most sophisticated sales organizations running on
				SpikedAI ground-truth intelligence.
			</p>

			<div class="flex flex-col sm:flex-row gap-6 justify-center">
				<button
					onclick={onboardingStore.start}
					class="px-12 py-6 bg-red-600 text-white font-black text-2xl rounded-full hover:shadow-2xl hover:shadow-red-600/50 transition-all hover:-translate-y-2"
				>
					Request Vision Demo
				</button>
				<button
					class="px-12 py-6 bg-transparent border border-zinc-800 text-white font-bold text-2xl rounded-full hover:bg-zinc-900 transition-all"
				>
					Read Whitepaper
				</button>
			</div>
		</div>
	</ThemeSection>

	<FeatureFooter />
</div>

<style>
	:global(body) {
		background-color: #000;
	}
</style>
