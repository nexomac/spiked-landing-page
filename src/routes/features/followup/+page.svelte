<script>
	import FeatureNav from "$lib/components/features/FeatureNav.svelte";
	import FeatureFooter from "$lib/components/features/FeatureFooter.svelte";
	import FollowupShowcase from "$lib/components/features/FollowupShowcase.svelte";
	import ThemeCard from "$lib/components/ui/ThemeCard.svelte";
	import ThemeSection from "$lib/components/ui/ThemeSection.svelte";
	import ThemeHeadline from "$lib/components/ui/ThemeHeadline.svelte";
	import {
		Mail,
		CheckSquare,
		Calendar,
		Clock,
		UserPlus,
		Zap,
		CheckCircle2,
		ArrowRight,
		Star,
		FileText,
		ListChecks,
		MessageSquare,
		Share2,
		Sparkles,
		Inbox,
		Brain,
		TrendingUp,
		Users,
		Target,
		Shield,
	} from "lucide-svelte";
	import { onboardingStore } from "$lib/stores/onboarding.js";
	import { fly, fade, scale, slide, blur } from "svelte/transition";
	import {
		quintOut,
		elasticOut,
		cubicOut,
		backOut,
		expoOut,
	} from "svelte/easing";
	import { onMount } from "svelte";

	// Active feature for showcase
	let activeFeature = $state(0);
	let isAutoPlaying = $state(true);

	// Parallax and animation states
	let mouseX = $state(0);
	let mouseY = $state(0);
	let scrollY = $state(0);

	// Features data matching the Writer.com style
	const features = [
		{
			id: 0,
			label: "Smart Preparation",
			title: "Never walk in unprepared",
			description:
				"Automatically compile everything you need before every meeting",
		},
		{
			id: 1,
			label: "Context Recall",
			title: "Full relationship history",
			description:
				"Instantly recall every past conversation, commitment, and detail",
		},
		{
			id: 2,
			label: "Action Tracking",
			title: "Never drop the ball",
			description:
				"Track commitments automatically and get reminded before follow-ups",
		},
	];

	// Email and PDF briefing data
	const emailSections = [
		{
			icon: Target,
			title: "Key Objectives",
			content:
				"Budget approved at $250K. Need to address data migration concerns and provide ROI projections.",
		},
		{
			icon: CheckSquare,
			title: "Action Items",
			content:
				"• Send security compliance documentation\n• Prepare detailed ROI projections\n• Create technical migration roadmap",
		},
		{
			icon: Users,
			title: "Stakeholders",
			content:
				"Sarah Chen (Champion), John Davis (CTO - Concerns), Lisa Park (CFO - Decision Maker)",
		},
		{
			icon: TrendingUp,
			title: "Next Steps",
			content:
				"Follow up by EOD with compliance docs. Schedule technical deep-dive for next week.",
		},
	];

	const pdfSections = [
		{
			title: "Meeting Summary",
			items: [
				"32 min call with 4 participants",
				"Budget approved: $250K",
				"Timeline: Q1 implementation",
			],
		},
		{
			title: "Stakeholder Mapping",
			items: [
				"Sarah Chen - VP Sales (Champion)",
				"John Davis - CTO (Technical Blocker)",
				"Lisa Park - CFO (Economic Buyer)",
			],
		},
		{
			title: "Battle Card Intelligence",
			items: [
				"Competitor: Gong (mentioned 2x)",
				"Key objection: Data migration timeline",
				"Winning factors: ROI & Security",
			],
		},
		{
			title: "PLAYBOOK Command Center",
			items: [
				"Discovery Phase: 75% complete",
				"Technical Validation: Pending",
				"Business Case: In Progress",
			],
		},
	];

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

	function selectFeature(index) {
		activeFeature = index;
		isAutoPlaying = false;
	}
</script>

```
<svelte:head>
	<title>Follow-Up Meeting Preparation - SpikedAI</title>
	<meta
		name="description"
		content="Never miss important follow-up details. Automated preparation for your next meetings with context-aware briefings."
	/>
</svelte:head>

<div class="min-h-screen bg-background text-foreground overflow-hidden">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="followup" />

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
					<Mail class="w-4 h-4 text-primary animate-pulse" />
					<span
						class="text-xs font-semibold text-primary uppercase tracking-wider"
						>Automated Follow-up</span
					>
				</div>

				<!-- Main Headline -->
				<ThemeHeadline variant="h1" class="leading-[1.1]">
					AI that prepares you<br />
					<span
						class="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
						>for every meeting</span
					>
				</ThemeHeadline>

				<!-- Three Feature Cards -->
				<div class="space-y-4">
					<!-- Before the meeting -->
					<ThemeCard
						class="p-4 flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer"
						delay={300}
					>
						<div
							class="w-10 h-10 rounded-lg bg-card-foreground/5 flex items-center justify-center flex-shrink-0"
						>
							<Calendar class="w-5 h-5 text-muted-foreground" />
						</div>
						<div>
							<h3
								class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
							>
								Before the meeting
							</h3>
							<p class="text-sm text-muted-foreground">
								Get a 2-minute briefing on previous conversations and open
								action items
							</p>
						</div>
					</ThemeCard>

					<!-- After the meeting (highlighted) -->
					<ThemeCard
						class="p-4 flex items-start gap-4 border-l-4 border-l-primary hover:border-r-primary/50 transition-colors cursor-pointer bg-primary/5"
						delay={400}
					>
						<div
							class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
						>
							<Mail class="w-5 h-5 text-primary" />
						</div>
						<div>
							<h3
								class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
							>
								After the meeting
							</h3>
							<p class="text-sm text-muted-foreground">
								Drafts personalized follow-up emails instantly based on what was
								discussed
							</p>
						</div>
					</ThemeCard>

					<!-- Never drop the ball -->
					<ThemeCard
						class="p-4 flex items-start gap-4 hover:border-primary/50 transition-colors cursor-pointer"
						delay={500}
					>
						<div
							class="w-10 h-10 rounded-lg bg-card-foreground/5 flex items-center justify-center flex-shrink-0"
						>
							<CheckSquare class="w-5 h-5 text-muted-foreground" />
						</div>
						<div>
							<h3
								class="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors"
							>
								Never drop the ball
							</h3>
							<p class="text-sm text-muted-foreground">
								Auto-detects next steps and syncs them to your CRM and calendar
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
					<span>Automate your workflow</span>
					<ArrowRight
						class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"
					/>
				</a>
			</div>

			<!-- Right Column - Product Showcase -->
			<FollowupShowcase
				bind:activeFeature
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
			<ThemeHeadline variant="h2">Your Personal AI Chief of Staff</ThemeHeadline
			>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				SpikedAI manages your admin work so you can focus on selling.
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each [{ title: "Smart Briefings", desc: "Receive a concise briefing 15 minutes before every call with context, last meeting notes, and open tasks.", icon: Brain, color: "text-blue-500", bg: "bg-blue-500/10" }, { title: "One-Click Follow-up", desc: "Review and send AI-drafted follow-up emails that reference specific points from the conversation.", icon: Mail, color: "text-red-500", bg: "bg-red-500/10" }, { title: "CRM Sync", desc: "Automatically update Salesforce or HubSpot with meeting notes, next steps, and deal sentiment.", icon: Inbox, color: "text-purple-500", bg: "bg-purple-500/10" }, { title: "Action Item Tracking", desc: "Never forget a promise. AI extracts action items and reminds you if they aren't completed by the due date.", icon: ListChecks, color: "text-green-500", bg: "bg-green-500/10" }, { title: "Deal Momentum", desc: "Track deal velocity. AI flags deals that are stalling based on follow-up responsiveness and key milestones.", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-500/10" }, { title: "Stakeholder Mapping", desc: "Automatically identify new stakeholders mentioned in calls and add them to your CRM contact map.", icon: UserPlus, color: "text-indigo-500", bg: "bg-indigo-500/10" }] as feature}
				<ThemeCard class="p-6 hover:border-primary/50 transition-all group">
					<div
						class="w-12 h-12 rounded-lg {feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
					>
						<svelte:component
							this={feature.icon}
							class="w-6 h-6 {feature.color}"
						/>
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

	<!-- Detailed Deliverables Section -->
	<ThemeSection background="default" class="py-20">
		<div class="text-center mb-16 space-y-4">
			<div
				class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 mb-6"
			>
				<Sparkles class="w-4 h-4 text-primary animate-pulse" />
				<span
					class="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
					>Automated Deliverables</span
				>
			</div>
			<ThemeHeadline variant="h2"
				>Professional Briefings, <span class="text-primary"
					>Instantly Generated</span
				></ThemeHeadline
			>
			<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
				Every meeting automatically generates follow-up emails and executive
				briefing PDFs
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-8 items-start">
			<!-- Email Preview -->
			<ThemeCard
				class="relative overflow-hidden p-0 border-zinc-800"
				delay={200}
			>
				<!-- Email Header -->
				<div
					class="bg-card/50 border-b border-border px-4 py-3 backdrop-blur-xl"
				>
					<div class="flex items-center gap-3">
						<div
							class="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center"
						>
							<MessageSquare class="w-4 h-4 text-blue-500" />
						</div>
						<div class="flex-1">
							<p class="text-sm font-semibold text-foreground">
								Follow-Up Email
							</p>
							<p class="text-xs text-muted-foreground">
								Auto-sent after meeting ends
							</p>
						</div>
						<div
							class="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-500 font-medium"
						>
							Sent
						</div>
					</div>
				</div>

				<!-- Email Content -->
				<div class="p-6 space-y-5">
					<!-- Email Meta -->
					<div class="mb-6 pb-4 border-b border-border">
						<div class="flex items-center gap-2 text-sm mb-2">
							<span class="text-muted-foreground">To:</span>
							<span class="text-foreground">sarah.chen@enterprisecorp.com</span>
						</div>
						<div class="flex items-center gap-2 text-sm mb-2">
							<span class="text-muted-foreground">Subject:</span>
							<span class="text-foreground font-medium"
								>Q1 Implementation Discussion - Next Steps</span
							>
						</div>
					</div>

					<!-- Email Body -->
					<div class="bg-card/30 rounded-lg p-4">
						<p class="text-sm text-muted-foreground leading-relaxed">
							Hi Sarah,<br /><br />
							Thank you for the productive call today regarding your Q1 implementation.
							Here's a summary of our discussion and next steps.
						</p>
					</div>

					{#each emailSections as section, i}
						<div class="bg-card/30 rounded-lg p-4 flex items-start gap-3">
							<div
								class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
							>
								<svelte:component
									this={section.icon}
									class="w-4 h-4 text-primary"
								/>
							</div>
							<div>
								<h4 class="text-sm font-semibold text-foreground mb-2">
									{section.title}
								</h4>
								<p
									class="text-xs text-muted-foreground leading-relaxed whitespace-pre-line"
								>
									{section.content}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</ThemeCard>

			<!-- PDF Preview -->
			<ThemeCard
				class="relative overflow-hidden p-0 border-zinc-800"
				delay={400}
			>
				<!-- PDF Header -->
				<div
					class="bg-card/50 border-b border-border px-4 py-3 backdrop-blur-xl"
				>
					<div class="flex items-center gap-3">
						<div
							class="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center"
						>
							<FileText class="w-4 h-4 text-primary" />
						</div>
						<div class="flex-1">
							<p class="text-sm font-semibold text-foreground">
								Executive Briefing PDF
							</p>
							<p class="text-xs text-muted-foreground">
								Comprehensive meeting intelligence
							</p>
						</div>
						<button
							class="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-lg text-xs text-foreground transition-colors font-medium flex items-center gap-1"
						>
							<span>Download</span>
							<ArrowRight class="w-3 h-3" />
						</button>
					</div>
				</div>

				<!-- PDF Content -->
				<div class="p-6 space-y-3">
					<!-- PDF Cover -->
					<div class="bg-card/30 rounded-xl p-6 mb-4 relative overflow-hidden">
						<div class="flex items-center gap-3 mb-4">
							<div
								class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"
							>
								<Zap class="w-5 h-5 text-primary-foreground" />
							</div>
							<div>
								<h3 class="text-xl font-bold text-foreground">SpikedAI</h3>
								<p class="text-xs text-muted-foreground">
									Meeting Intelligence Report
								</p>
							</div>
						</div>
						<div class="space-y-2">
							<div class="flex justify-between text-sm">
								<span class="text-muted-foreground">Account:</span>
								<span class="text-foreground font-medium">Enterprise Corp</span>
							</div>
							<div class="flex justify-between text-sm">
								<span class="text-muted-foreground">Date:</span>
								<span class="text-foreground font-medium">26 Nov 2025</span>
							</div>
							<div class="flex justify-between text-sm">
								<span class="text-muted-foreground">Duration:</span>
								<span class="text-foreground font-medium">32 minutes</span>
							</div>
						</div>
					</div>

					<!-- PDF Sections -->
					<div class="space-y-3">
						{#each pdfSections as section, i}
							<div class="bg-card/30 rounded-lg p-4">
								<h4
									class="text-sm font-bold text-foreground mb-3 flex items-center gap-2"
								>
									{section.title}
								</h4>
								<div class="space-y-2">
									{#each section.items as item}
										<div class="flex items-start gap-2 text-xs">
											<div
												class="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0"
											></div>
											<span class="text-muted-foreground">{item}</span>
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</ThemeCard>
		</div>
	</ThemeSection>

	<!-- Testimonial Section -->
	<ThemeSection background="alternate" class="py-20">
		<div class="max-w-4xl mx-auto text-center relative z-10">
			<blockquote
				class="text-2xl md:text-3xl font-medium text-foreground leading-relaxed mb-8"
			>
				"SpikedAI transforms how our team prepares for meetings—from scrambling
				to find context to walking in fully prepared with every detail at our
				fingertips."
			</blockquote>
			<div class="flex items-center justify-center gap-4">
				<div
					class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold"
				>
					JM
				</div>
				<div class="text-left">
					<p class="font-semibold text-foreground">Jennifer Martinez</p>
					<p class="text-sm text-muted-foreground">
						VP of Sales, TechScale Inc.
					</p>
				</div>
			</div>
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
			<ThemeHeadline variant="h2">Close the Loop, Close the Deal.</ThemeHeadline
			>
			<p class="text-xl text-muted-foreground leading-relaxed">
				Save 10+ hours per week on admin and keep every deal moving forward.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a
					href="/"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-2xl hover:shadow-primary/50 transition-all hover:scale-105"
				>
					<Sparkles class="w-5 h-5" />
					Start Automating
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
	<FeatureFooter currentFeature="followup" />
</div>
