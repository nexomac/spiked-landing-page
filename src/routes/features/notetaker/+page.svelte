<script>
	import FeatureNav from "$lib/components/features/FeatureNav.svelte";
	import FeatureFooter from "$lib/components/features/FeatureFooter.svelte";
	import NotetakerShowcase from "$lib/components/features/NotetakerShowcase.svelte";
	import ThemeCard from "$lib/components/ui/ThemeCard.svelte";
	import ThemeSection from "$lib/components/ui/ThemeSection.svelte";
	import ThemeHeadline from "$lib/components/ui/ThemeHeadline.svelte";
	import {
		MessageSquare,
		FileText,
		Brain,
		Zap,
		ArrowRight,
		Target,
		Mail,
		Activity,
		BarChart3,
		Users,
		TrendingUp,
		Clock,
		Sparkles,
		CheckCircle,
		Calendar,
	} from "lucide-svelte";
	import { onboardingStore } from "$lib/stores/onboarding.js";
	import { fly } from "svelte/transition";
	import { onMount } from "svelte"; // Parallax and animation states
	let activeTab = $state("templates");
	let selectedTemplate = $state(null);
	let isAutoPlaying = $state(true); // Added missing state if needed for Showcase properties
</script>

<svelte:head>
	<title>Smart Notetaker | SpikedAI</title>
	<meta
		name="description"
		content="Automatically capture, transcribe, and analyze every conversation with SpikedAI's intelligent notetaker powered by conversational AI."
	/>
</svelte:head>

<div class="min-h-screen bg-background text-foreground overflow-hidden">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="notetaker" />

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
					<MessageSquare class="w-4 h-4 text-primary animate-pulse" />
					<span
						class="text-xs font-semibold text-primary uppercase tracking-wider"
						>AI-Powered Notetaker</span
					>
				</div>

				<!-- Main Headline -->
				<ThemeHeadline variant="h1" class="leading-[1.1]">
					Your Meetings,<br />
					<span
						class="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
						>Supercharged by AI</span
					>
				</ThemeHeadline>

				<!-- Three Feature Cards -->
				<div class="space-y-4">
					<!-- Auto-generate reports -->
					<ThemeCard
						class="p-4 flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer"
						delay={300}
					>
						<div
							class="w-10 h-10 rounded-lg bg-card-foreground/5 flex items-center justify-center flex-shrink-0"
						>
							<FileText class="w-5 h-5 text-muted-foreground" />
						</div>
						<div>
							<h3
								class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
							>
								Auto-generate executive summaries
							</h3>
							<p class="text-sm text-muted-foreground">
								Transform transcripts into actionable insights instantly
							</p>
						</div>
					</ThemeCard>

					<!-- AI-powered analysis (highlighted) -->
					<ThemeCard
						class="p-4 flex items-start gap-4 border-l-4 border-l-primary hover:border-r-primary/50 transition-colors cursor-pointer bg-primary/5"
						delay={400}
					>
						<div
							class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
						>
							<Brain class="w-5 h-5 text-primary" />
						</div>
						<div>
							<h3
								class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
							>
								Run custom AI analysis
							</h3>
							<p class="text-sm text-muted-foreground">
								Build frameworks tailored to your specific needs
							</p>
						</div>
					</ThemeCard>

					<!-- Automated actions -->
					<ThemeCard
						class="p-4 flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer"
						delay={500}
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
								Take automatic actions
							</h3>
							<p class="text-sm text-muted-foreground">
								Send follow-ups, sync to CRM, track stakeholders
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
					<span>Get started with AI Notetaker</span>
					<ArrowRight
						class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
					/>
				</a>
			</div>

			<!-- Right Column - Product Showcase -->
			<NotetakerShowcase
				bind:activeTab
				bind:selectedTemplate
				bind:isAutoPlaying
				mouseX={0}
				mouseY={0}
				height="600px"
				showAppChrome={true}
			/>
		</div>
	</ThemeSection>

	<!-- Key Features Grid -->
	<ThemeSection background="alternate" class="py-20">
		<div class="text-center mb-12 space-y-4">
			<ThemeHeadline variant="h2">Beyond Basic Transcription</ThemeHeadline>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				While others just record, SpikedAI transforms your meetings into
				actionable intelligence
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each [{ title: "9+ Prebuilt AI Templates", desc: "One-click generation of executive summaries, stakeholder maps, battle cards, deal health reports, MEDDIC playbooks, and more.", icon: FileText, color: "text-red-500", bg: "bg-red-500/10" }, { title: "Custom Analysis Goals", desc: "Create your own AI analysis templates. Track specific questions, detect evidence, monitor project status, or extract any custom insight.", icon: Target, color: "text-blue-500", bg: "bg-blue-500/10" }, { title: "Agentic Email Composer", desc: "AI automatically drafts personalized follow-up emails with action items, key decisions, and next steps. Review and send in seconds.", icon: Mail, color: "text-purple-500", bg: "bg-purple-500/10" }, { title: "Auto-Sync to CRM", desc: "Meeting insights automatically populate your CRM. Salesforce, HubSpot, monday.com, or custom systems—no manual data entry ever again.", icon: Activity, color: "text-green-500", bg: "bg-green-500/10" }, { title: "Export Professional PDFs", desc: "Generate beautifully formatted PDF reports with your selected templates. Perfect for sharing with executives and stakeholders.", icon: BarChart3, color: "text-orange-500", bg: "bg-orange-500/10" }, { title: "Conversational AI Assistant", desc: 'Ask questions about your meeting in natural language. "What did Sarah say about pricing?" AI finds and explains instantly.', icon: Brain, color: "text-cyan-500", bg: "bg-cyan-500/10" }, { title: "Speaker Intelligence", desc: "Automatic speaker identification, talk-time analytics, sentiment analysis per person, and participant-specific insights.", icon: Users, color: "text-pink-500", bg: "bg-pink-500/10" }, { title: "Deal Health Monitoring", desc: "Track deal progression automatically. AI detects buying signals, risks, champion engagement, and next-step commitments.", icon: TrendingUp, color: "text-indigo-500", bg: "bg-indigo-500/10" }, { title: "Real-Time Processing", desc: "All analysis happens during the call. The moment your meeting ends, insights, emails, and reports are ready to use.", icon: Clock, color: "text-teal-500", bg: "bg-teal-500/10" }] as feature}
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

	<!-- Comparison Section -->
	<ThemeSection background="default" class="py-20">
		<div class="text-center mb-12 space-y-4">
			<ThemeHeadline variant="h2">SpikedAI vs. Other Notetakers</ThemeHeadline>
			<p class="text-lg text-muted-foreground">
				See why teams are switching from Otter, Fireflies, and others
			</p>
		</div>

		<ThemeCard class="overflow-hidden p-0">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-card-foreground/5 border-b border-border">
						<tr>
							<th class="px-6 py-4 text-left text-sm font-bold text-foreground"
								>Feature</th
							>
							<th
								class="px-6 py-4 text-center text-sm font-bold text-foreground"
							>
								<div class="flex items-center justify-center gap-2">
									<span
										class="w-6 h-6 rounded bg-primary flex items-center justify-center"
									>
										<Sparkles class="w-3.5 h-3.5 text-primary-foreground" />
									</span>
									SpikedAI
								</div>
							</th>
							<th
								class="px-6 py-4 text-center text-sm font-semibold text-muted-foreground"
								>Otter</th
							>
							<th
								class="px-6 py-4 text-center text-sm font-semibold text-muted-foreground"
								>Fireflies</th
							>
							<th
								class="px-6 py-4 text-center text-sm font-semibold text-muted-foreground"
								>Others</th
							>
						</tr>
					</thead>
					<tbody class="divide-y divide-border">
						{#each [{ name: "Real-time Transcription", spiked: true, otter: true, fireflies: true, others: true }, { name: "9+ Prebuilt AI Templates", spiked: true, otter: false, fireflies: false, others: false }, { name: "Custom Analysis Goals", spiked: true, otter: false, fireflies: false, others: false }, { name: "AI Follow-Up Email Generation", spiked: true, otter: false, fireflies: "Basic", others: false }, { name: "Auto-Sync to CRM", spiked: true, otter: "Limited", fireflies: true, others: "Limited" }, { name: "Professional PDF Export", spiked: true, otter: "Limited", fireflies: "Basic", others: "Basic" }, { name: "Conversational AI Assistant", spiked: true, otter: true, fireflies: "Basic", others: "Basic" }] as row}
							<tr class="hover:bg-card-foreground/5 transition-colors">
								<td class="px-6 py-4 text-sm text-foreground/80">{row.name}</td>
								<td class="px-6 py-4 text-center"
									><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td
								>
								<td class="px-6 py-4 text-center text-sm text-muted-foreground">
									{#if row.otter === true}<CheckCircle
											class="w-5 h-5 text-green-500 mx-auto"
										/>{:else if row.otter === false}—{:else}{row.otter}{/if}
								</td>
								<td class="px-6 py-4 text-center text-sm text-muted-foreground">
									{#if row.fireflies === true}<CheckCircle
											class="w-5 h-5 text-green-500 mx-auto"
										/>{:else if row.fireflies === false}—{:else}{row.fireflies}{/if}
								</td>
								<td class="px-6 py-4 text-center text-sm text-muted-foreground">
									{#if row.others === true}<CheckCircle
											class="w-5 h-5 text-green-500 mx-auto"
										/>{:else if row.others === false}—{:else}{row.others}{/if}
								</td>
							</tr>
						{/each}
						<tr class="hover:bg-primary/5 transition-colors bg-primary/5">
							<td class="px-6 py-4 text-sm font-bold text-foreground"
								>Agentic Actions (Take Action, Not Just Notes)</td
							>
							<td class="px-6 py-4 text-center"
								><CheckCircle
									class="w-5 h-5 text-primary mx-auto animate-pulse"
								/></td
							>
							<td class="px-6 py-4 text-center text-muted-foreground">—</td>
							<td class="px-6 py-4 text-center text-muted-foreground">—</td>
							<td class="px-6 py-4 text-center text-muted-foreground">—</td>
						</tr>
					</tbody>
				</table>
			</div>
		</ThemeCard>
	</ThemeSection>

	<!-- CTA Section -->
	<ThemeSection background="alternate" class="py-20">
		<div class="max-w-4xl mx-auto px-6 text-center space-y-8">
			<div
				class="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto shadow-2xl shadow-primary/30"
			>
				<Zap class="w-8 h-8 text-primary-foreground" />
			</div>
			<ThemeHeadline variant="h2"
				>Stop Taking Notes.<br />Start Taking Action.</ThemeHeadline
			>
			<p class="text-xl text-muted-foreground leading-relaxed">
				While your competitors are still copying & pasting from Otter, you'll be
				auto-sending follow-ups, syncing CRM data, and generating executive
				reports—all powered by AI.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all hover:scale-105"
				>
					<Sparkles class="w-5 h-5" />
					Start Free Trial
					<svg
						class="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14 5l7 7m0 0l-7 7m7-7H3"
						/>
					</svg>
				</a>
				<a
					href="/"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-semibold rounded-xl transition-all border border-border"
				>
					<Calendar class="w-5 h-5" />
					Book a Demo
				</a>
			</div>
			<p class="text-sm text-muted-foreground mt-6">
				No credit card required • Set up in 5 minutes • Cancel anytime
			</p>
		</div>
	</ThemeSection>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="notetaker" />
</div>
