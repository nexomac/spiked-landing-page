<script>
	import FeatureNav from "$lib/components/features/FeatureNav.svelte";
	import FeatureFooter from "$lib/components/features/FeatureFooter.svelte";
	import CRMShowcase from "$lib/components/features/CRMShowcase.svelte";
	import CustomGoalsShowcase from "$lib/components/features/CustomGoalsShowcase.svelte";
	import ThemeCard from "$lib/components/ui/ThemeCard.svelte";
	import ThemeSection from "$lib/components/ui/ThemeSection.svelte";
	import ThemeHeadline from "$lib/components/ui/ThemeHeadline.svelte";
	import {
		Settings,
		Database,
		ShieldCheck,
		RefreshCw,
		ArrowRight,
		CheckCircle,
		GitBranch,
		Terminal,
		Lock,
		Zap,
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
	<title>For Sales Ops & Enablement | SpikedAI</title>
</svelte:head>

<div class="min-h-screen bg-background text-foreground overflow-hidden">
	<FeatureNav />

	<!-- Hero -->
	<ThemeSection class="pt-32 pb-20">
		<div class="max-w-4xl mx-auto text-center space-y-8">
			<div
				class="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20"
			>
				<ShieldCheck class="w-4 h-4 text-green-500" />
				<span class="text-xs font-bold text-green-500 uppercase tracking-widest"
					>Data Integrity Engine</span
				>
			</div>

			<ThemeHeadline variant="h1" class="text-5xl md:text-7xl">
				The End of <span
					class="bg-gradient-to-r from-green-500 to-emerald-800 bg-clip-text text-transparent italic"
					>Bad CRM Data</span
				>
			</ThemeHeadline>

			<p class="text-xl text-muted-foreground max-w-2xl mx-auto">
				Automatically sync every call insight to Salesforce or HubSpot. Enforce
				playbooks without nagging, and keep your revenue infrastructure
				spotless.
			</p>
		</div>
	</ThemeSection>

	<!-- Main Feature: CRM Sync -->
	<ThemeSection background="alternate" class="py-24">
		<div class="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
			<div class="space-y-8">
				<div
					class="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg shadow-green-600/20"
				>
					<Database class="w-8 h-8 text-white" />
				</div>
				<ThemeHeadline variant="h2">90% Coverage. 0% Maintenance.</ThemeHeadline
				>
				<p class="text-lg text-muted-foreground">
					SpikedAI doesn't just dump text into your CRM. It maps conversational
					insights directly to custom fields with staggering accuracy.
				</p>

				<div class="space-y-4">
					{#each [{ title: "Bi-directional Sync", desc: "Pull CRM context into the call and push insights back instantly." }, { title: "Custom Field Mapping", desc: "Map BANT, MEDDIC, or your own proprietary methodology." }, { title: "Automated Task Creation", desc: "Action items from the call become tasks in your CRM automatically." }] as item}
						<div
							class="flex gap-4 p-5 bg-card border border-zinc-800 rounded-2xl group hover:border-green-600/50 transition-all"
						>
							<CheckCircle class="w-6 h-6 text-green-500 flex-shrink-0" />
							<div>
								<h4 class="font-bold text-white mb-1">{item.title}</h4>
								<p class="text-sm text-muted-foreground">{item.desc}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="relative">
				<CRMShowcase {mouseX} {mouseY} height="550px" />
			</div>
		</div>
	</ThemeSection>

	<!-- Second Feature: Playbooks -->
	<ThemeSection class="py-24">
		<div class="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
			<div class="order-2 lg:order-1">
				<CustomGoalsShowcase {mouseX} {mouseY} height="550px" />
			</div>
			<div class="space-y-8 order-1 lg:order-2">
				<div
					class="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20"
				>
					<Settings class="w-8 h-8 text-white" />
				</div>
				<ThemeHeadline variant="h2">Enablement on Autopilot.</ThemeHeadline>
				<p class="text-lg text-muted-foreground">
					Stop wondering if reps are sticking to the playbook. SpikedAI guides
					them live on the call and flags adherence trends in your dashboard.
				</p>

				<div
					class="p-6 bg-zinc-900 rounded-3xl border border-zinc-800 space-y-4"
				>
					<div
						class="flex items-center justify-between border-b border-zinc-800 pb-4"
					>
						<span class="text-sm font-bold text-zinc-500 uppercase"
							>System Integrity</span
						>
						<span class="text-xs font-bold text-green-500">OPTIMAL</span>
					</div>
					<div class="space-y-3">
						<div class="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
							<div class="h-full bg-green-500" style="width: 94%"></div>
						</div>
						<div class="flex justify-between text-xs">
							<span class="text-muted-foreground italic"
								>Playbook Adherence: 94.2%</span
							>
							<span class="text-green-400">+12% vs last month</span>
						</div>
					</div>
				</div>

				<p class="text-muted-foreground">
					Upload your battlecards, objection scripts, and qualification
					criteria. SpikedAI ensures they are whispered into the rep's ear at
					the exact moment they are needed.
				</p>
			</div>
		</div>
	</ThemeSection>

	<!-- Tech Stack Integrations -->
	<ThemeSection background="alternate" class="py-24">
		<div class="text-center space-y-6 mb-16">
			<ThemeHeadline variant="h2"
				>Plays Nice with Your Tech Stack.</ThemeHeadline
			>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Enterprise-grade security and bi-directional integrations across the
				tools your team already uses.
			</p>
		</div>

		<div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto px-6">
			{#each [{ icon: Zap, label: "Salesforce" }, { icon: RefreshCw, label: "Hubspot" }, { icon: Terminal, label: "Slack" }, { icon: GitBranch, label: "Jira" }, { icon: Lock, label: "Okta / SSO" }, { icon: Database, label: "Redshift" }, { icon: ShieldCheck, label: "SOC2" }, { icon: Settings, label: "API / SDK" }] as tool}
				<div
					class="p-6 bg-card border border-zinc-800 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-green-600 transition-all cursor-pointer"
				>
					<tool.icon class="w-8 h-8 text-green-500" />
					<span class="font-bold text-sm text-foreground">{tool.label}</span>
				</div>
			{/each}
		</div>
	</ThemeSection>

	<!-- Call to Action -->
	<ThemeSection class="py-32">
		<div
			class="max-w-4xl mx-auto p-12 bg-gradient-to-br from-green-950/20 to-black rounded-[3rem] border border-green-900/30 text-center space-y-8"
		>
			<h2 class="text-4xl md:text-5xl font-black">
				Ready to automate your <span class="text-green-500"
					>revenue engine?</span
				>
			</h2>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<button
					onclick={onboardingStore.start}
					class="px-10 py-5 bg-green-600 text-white font-black text-xl rounded-full hover:shadow-2xl hover:shadow-green-500/50 transition-all hover:-translate-y-1"
				>
					Sync Your CRM
				</button>
				<button
					class="px-10 py-5 bg-zinc-800 text-white font-black text-xl rounded-full hover:bg-zinc-700 transition-all"
				>
					Talk to Solutions
				</button>
			</div>
		</div>
	</ThemeSection>

	<FeatureFooter />
</div>

<style>
	:global(body) {
		background-color: #030a05;
	}
</style>
