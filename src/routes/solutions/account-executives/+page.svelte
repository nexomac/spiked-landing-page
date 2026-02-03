<script>
	import FeatureNav from "$lib/components/features/FeatureNav.svelte";
	import FeatureFooter from "$lib/components/features/FeatureFooter.svelte";
	import AIAssistanceShowcase from "$lib/components/features/AIAssistanceShowcase.svelte";
	import NotetakerShowcase from "$lib/components/features/NotetakerShowcase.svelte";
	import ThemeCard from "$lib/components/ui/ThemeCard.svelte";
	import ThemeSection from "$lib/components/ui/ThemeSection.svelte";
	import ThemeHeadline from "$lib/components/ui/ThemeHeadline.svelte";
	import {
		Sparkles,
		Zap,
		Clock,
		Target,
		ArrowRight,
		CheckCircle,
		Brain,
		MessageSquare,
		Database,
		Shield,
	} from "lucide-svelte";
	import { onboardingStore } from "$lib/stores/onboarding.js";
	import { fly, fade } from "svelte/transition";
	import { onMount } from "svelte";

	let activePhase = $state("live"); // prep, live, finish
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

	const phases = [
		{ id: "prep", label: "1. The Perfect Prep", icon: Clock },
		{ id: "live", label: "2. The Genius Call", icon: Sparkles },
		{ id: "finish", label: "3. The Zero-Admin Finish", icon: Zap },
	];
</script>

<svelte:head>
	<title>For Account Executives | SpikedAI</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground overflow-hidden">
	<FeatureNav />

	<!-- Hero -->
	<ThemeSection class="pt-32 pb-16">
		<div class="max-w-4xl mx-auto text-center space-y-6">
			<div
				class="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/10 rounded-full border border-red-500/20"
			>
				<Target class="w-4 h-4 text-red-500" />
				<span class="text-xs font-bold text-red-500 uppercase tracking-widest"
					>Built for High-Performers</span
				>
			</div>
			<ThemeHeadline variant="h1" class="text-5xl md:text-7xl">
				The AE's <span
					class="bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent italic"
					>Unfair Advantage</span
				>
			</ThemeHeadline>
			<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
				Spend more time selling and zero time on admin. SpikedAI is the sidekick
				that handles the busywork while you focus on the win.
			</p>
		</div>
	</ThemeSection>

	<!-- Phase Selector -->
	<section class="max-w-5xl mx-auto px-6 mb-12">
		<div class="flex flex-wrap justify-center gap-4">
			{#each phases as phase}
				<button
					onclick={() => (activePhase = phase.id)}
					class="px-6 py-3 rounded-2xl border-2 transition-all flex items-center gap-3 font-bold
						{activePhase === phase.id
						? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/30 scale-105'
						: 'bg-card border-zinc-800 text-muted-foreground hover:border-red-900/50 hover:text-foreground'}"
				>
					<phase.icon class="w-5 h-5" />
					{phase.label}
				</button>
			{/each}
		</div>
	</section>

	<!-- Main Interaction Area -->
	<ThemeSection
		background="alternate"
		class="py-12 min-h-[800px] flex items-center"
	>
		<div class="max-w-[1600px] mx-auto w-full">
			{#if activePhase === "prep"}
				<div
					in:fly={{ y: 20, duration: 500 }}
					class="grid lg:grid-cols-2 gap-12 items-center"
				>
					<div class="space-y-8">
						<ThemeHeadline variant="h2"
							>Research in Seconds, not Hours.</ThemeHeadline
						>
						<div class="space-y-4">
							<ThemeCard class="p-6">
								<div class="flex gap-4">
									<div
										class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center"
									>
										<Database class="w-6 h-6 text-blue-500" />
									</div>
									<div>
										<h3 class="font-bold text-lg mb-1">
											Unified Account Context
										</h3>
										<p class="text-muted-foreground">
											SpikedAI pulls previous call notes, CRM fields, and
											company research into one clean brief.
										</p>
									</div>
								</div>
							</ThemeCard>
							<ThemeCard class="p-6">
								<div class="flex gap-4">
									<div
										class="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center"
									>
										<Brain class="w-6 h-6 text-purple-500" />
									</div>
									<div>
										<h3 class="font-bold text-lg mb-1">
											AI-Generated Playbooks
										</h3>
										<p class="text-muted-foreground">
											Custom talk tracks tailored to the specific persona and
											pain points of the prospect.
										</p>
									</div>
								</div>
							</ThemeCard>
						</div>
					</div>
					<div class="relative group">
						<div
							class="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"
						></div>
						<div
							class="relative bg-card border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl p-8"
						>
							<div class="flex items-center gap-3 mb-6">
								<div class="w-3 h-3 rounded-full bg-red-500"></div>
								<div class="w-3 h-3 rounded-full bg-yellow-500"></div>
								<div class="w-3 h-3 rounded-full bg-green-500"></div>
								<span
									class="ml-2 text-xs font-bold text-zinc-500 uppercase tracking-widest"
									>Pre-Call Intelligence Brief</span
								>
							</div>
							<div class="space-y-6">
								<div class="pb-6 border-b border-zinc-800">
									<h4
										class="text-sm font-black text-red-500 uppercase tracking-widest mb-2"
									>
										Prospect
									</h4>
									<div class="flex items-center gap-4">
										<div class="w-12 h-12 rounded-full bg-zinc-800"></div>
										<div>
											<div class="text-lg font-bold">Sarah Jenkins</div>
											<div class="text-sm text-zinc-400">
												Director of Ops @ Linear
											</div>
										</div>
									</div>
								</div>
								<div class="space-y-4">
									<div
										class="p-4 bg-red-500/5 border border-red-500/20 rounded-xl"
									>
										<h5
											class="text-xs font-bold text-red-500 mb-2 uppercase italic"
										>
											Killer Insight
										</h5>
										<p class="text-sm text-zinc-300 italic">
											"Sarah mentioned scalability issues with their current
											stack in a recent podcast. Focus on our zero-lag
											architecture."
										</p>
									</div>
									<div class="space-y-2">
										<h5 class="text-xs font-bold text-zinc-500 uppercase">
											Top 3 Questions to Ask
										</h5>
										<div
											class="p-3 bg-zinc-900/50 rounded-lg text-xs text-zinc-400"
										>
											1. How is the current delay affecting your team's
											throughput?
										</div>
										<div
											class="p-3 bg-zinc-900/50 rounded-lg text-xs text-zinc-400"
										>
											2. Have you explored distributed intelligence models yet?
										</div>
										<div
											class="p-3 bg-zinc-900/50 rounded-lg text-xs text-zinc-400"
										>
											3. What's the cost of staying on legacy systems through
											Q4?
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			{:else if activePhase === "live"}
				<div
					in:fade={{ duration: 300 }}
					class="grid lg:grid-cols-2 gap-12 items-center"
				>
					<div class="space-y-8 order-2 lg:order-1">
						<AIAssistanceShowcase {mouseX} {mouseY} height="500px" />
					</div>
					<div class="space-y-8 order-1 lg:order-2">
						<ThemeHeadline variant="h2"
							>Your Intelligence Base, <span class="text-red-500">Live.</span
							></ThemeHeadline
						>
						<p class="text-lg text-muted-foreground">
							Never get stuck on a technical question or an objection again.
							SpikedAI listens and surfaces the exact battlecard or doc snippet
							you need.
						</p>
						<ul class="space-y-4">
							{#each ["Real-time objection handling", "Instant technical fact-checking", "Visual talk-tracks & prompts"] as item}
								<li class="flex items-center gap-3">
									<CheckCircle class="w-6 h-6 text-green-500" />
									<span class="font-bold">{item}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{:else if activePhase === "finish"}
				<div
					in:fly={{ y: 20, duration: 500 }}
					class="grid lg:grid-cols-2 gap-12 items-center"
				>
					<div class="space-y-8">
						<ThemeHeadline variant="h2">One-Click Follow Up.</ThemeHeadline>
						<p class="text-lg text-muted-foreground">
							The call ends, and your work is already done. SpikedAI summarizes
							the outcome, extracts tasks, and updates Salesforce automatically.
						</p>
						<div class="space-y-4">
							<ThemeCard class="p-6 border-l-4 border-red-600">
								<h3 class="font-bold text-xl mb-2">
									10 Minutes Saved per Call
								</h3>
								<p class="text-muted-foreground italic">
									"I haven't written a manual meeting summary in three months. I
									just review and hit send." — Top AE @ Vanta
								</p>
							</ThemeCard>
						</div>
					</div>
					<div class="space-y-8">
						<NotetakerShowcase {mouseX} {mouseY} height="500px" />
					</div>
				</div>
			{/if}
		</div>
	</ThemeSection>

	<!-- Call to Action -->
	<ThemeSection class="py-32">
		<div
			class="max-w-4xl mx-auto p-12 bg-gradient-to-br from-zinc-900 to-black rounded-[3rem] border border-zinc-800 text-center relative overflow-hidden"
		>
			<div
				class="absolute inset-0 bg-red-600/5 animate-pulse pointer-events-none"
			></div>
			<div class="relative z-10 space-y-8">
				<h2 class="text-4xl md:text-5xl font-black">
					Ready to scale your <span class="text-red-500">personal best?</span>
				</h2>
				<div class="flex flex-col sm:flex-row gap-4 justify-center">
					<button
						onclick={onboardingStore.start}
						class="px-10 py-5 bg-red-600 text-white font-black text-xl rounded-full hover:shadow-2xl hover:shadow-red-500/50 transition-all hover:-translate-y-1"
					>
						Start Free Trial
					</button>
					<button
						class="px-10 py-5 bg-zinc-800 text-white font-black text-xl rounded-full hover:bg-zinc-700 transition-all"
					>
						Watch Demo
					</button>
				</div>
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
