<script>
	import {
		Briefcase,
		MapPin,
		Clock,
		ArrowRight,
		Users,
		Code,
		Zap,
		Heart,
		TrendingUp,
	} from "lucide-svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { themeStore } from "$lib/stores/theme.js";
	import ThemeCard from "$lib/components/ui/ThemeCard.svelte";
	import ThemeSection from "$lib/components/ui/ThemeSection.svelte";
	import ThemeHeadline from "$lib/components/ui/ThemeHeadline.svelte";

	const photo = (file) => `/Photos/${encodeURIComponent(file)}`;

	const benefits = [
		{
			icon: Heart,
			title: "Comprehensive Health",
			description:
				"Medical, dental, and vision coverage for you and your family",
		},
		{
			icon: TrendingUp,
			title: "Equity Package",
			description: "Competitive equity grants to share in our success",
		},
		{
			icon: Zap,
			title: "Flexible Hours",
			description: "Work when you're most productive with flexible scheduling",
		},
		{
			icon: Users,
			title: "Remote First",
			description: "Work from anywhere with occasional team gatherings",
		},
	];

	const openRoles = [
		{
			title: "Full Stack Developer",
			department: "Engineering",
			location: "Remote / San Francisco",
			type: "Full-time",
			description:
				"Build and ship features across our entire stack, from frontend experiences to backend infrastructure. You'll work with modern technologies like SvelteKit, Node.js, and AI APIs.",
			requirements: [
				"3+ years of experience with modern JavaScript/TypeScript",
				"Strong proficiency with frontend frameworks (React, Vue, or Svelte)",
				"Experience with backend development and APIs",
				"Understanding of database design and optimization",
				"Passion for building delightful user experiences",
			],
		},
		{
			title: "AI/ML Engineer",
			department: "Engineering",
			location: "Remote / San Francisco",
			type: "Full-time",
			description:
				"Shape the future of AI-powered conversation intelligence. Work on cutting-edge LLM integrations, sentiment analysis, and predictive analytics that help sales teams close more deals.",
			requirements: [
				"4+ years of experience in machine learning or AI",
				"Strong Python skills and ML framework expertise (PyTorch, TensorFlow)",
				"Experience with LLMs and prompt engineering",
				"Understanding of NLP and conversation analysis",
				"Track record of shipping ML models to production",
			],
		},
		{
			title: "Product Designer",
			department: "Design",
			location: "Remote / San Francisco",
			type: "Full-time",
			description:
				"Design beautiful, intuitive interfaces that make complex AI capabilities feel simple. You'll own the end-to-end design process from research to high-fidelity prototypes.",
			requirements: [
				"3+ years of product design experience",
				"Strong portfolio showcasing web and mobile design",
				"Proficiency with Figma and design systems",
				"Experience designing AI-powered products is a plus",
				"Excellent communication and collaboration skills",
			],
		},
		{
			title: "Sales Development Representative",
			department: "Sales",
			location: "Remote / San Francisco",
			type: "Full-time",
			description:
				"Be the first point of contact for potential customers. You'll identify and engage with prospects, qualify leads, and set up meetings for our Account Executives.",
			requirements: [
				"1-2 years of SDR or similar sales experience",
				"Experience with CRM tools (Salesforce, HubSpot, etc.)",
				"Strong written and verbal communication skills",
				"Self-motivated with a track record of exceeding quotas",
				"Interest in SaaS and sales technology",
			],
		},
		{
			title: "Customer Success Manager",
			department: "Customer Success",
			location: "Remote",
			type: "Full-time",
			description:
				"Partner with our customers to ensure they're getting maximum value from our platform. You'll own onboarding, training, and ongoing relationship management.",
			requirements: [
				"2+ years of customer success or account management experience",
				"Experience with SaaS products and B2B customers",
				"Strong analytical and problem-solving skills",
				"Excellent presentation and training skills",
				"Ability to build strong customer relationships",
			],
		},
		{
			title: "DevOps Engineer",
			department: "Engineering",
			location: "Remote / San Francisco",
			type: "Full-time",
			description:
				"Build and maintain the infrastructure that powers our platform. You'll work on CI/CD pipelines, cloud infrastructure, monitoring, and security.",
			requirements: [
				"3+ years of DevOps or SRE experience",
				"Strong knowledge of cloud platforms (AWS, GCP, or Azure)",
				"Experience with containerization (Docker, Kubernetes)",
				"Proficiency with Infrastructure as Code (Terraform, CloudFormation)",
				"Understanding of security best practices",
			],
		},
	];

	let selectedRole = $state(null);

	function openRole(role) {
		selectedRole = role;
	}

	function closeRole() {
		selectedRole = null;
	}
</script>

<svelte:head>
	<title>Careers - Join Our Team | Spiked</title>
	<meta
		name="description"
		content="Join Spiked and help build the future of AI-powered sales intelligence. View open positions and apply today."
	/>
</svelte:head>

<!-- Hero Section -->
<ThemeSection id="hero" background="default" class="text-center pt-32 pb-20">
	<div class="max-w-3xl mx-auto">
		<div
			class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6"
		>
			<Briefcase class="w-4 h-4 text-primary" />
			<span class="text-sm font-medium text-primary">We're Hiring</span>
		</div>

		<ThemeHeadline
			variant="h1"
			class="mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
		>
			Build the Future of Sales Intelligence
		</ThemeHeadline>

		<ThemeHeadline variant="sub" class="mb-8">
			Join a team of builders, designers, and innovators creating AI-powered
			tools that help sales teams close more deals. We're looking for talented
			people who want to make an impact.
		</ThemeHeadline>

		<div
			class="flex items-center justify-center gap-4 text-sm text-muted-foreground"
		>
			<div class="flex items-center gap-2">
				<Users class="w-4 h-4" />
				<span>Remote-first</span>
			</div>
			<div class="w-1 h-1 bg-muted-foreground rounded-full"></div>
			<div class="flex items-center gap-2">
				<Heart class="w-4 h-4" />
				<span>Great benefits</span>
			</div>
			<div class="w-1 h-1 bg-muted-foreground rounded-full"></div>
			<div class="flex items-center gap-2">
				<TrendingUp class="w-4 h-4" />
				<span>Equity for all</span>
			</div>
		</div>
	</div>
</ThemeSection>

<!-- Benefits Section -->
<ThemeSection id="benefits" background="default">
	<div class="text-center mb-12">
		<ThemeHeadline variant="h2" class="mb-4">Why Join Spiked?</ThemeHeadline>
		<ThemeHeadline variant="sub">
			We believe in taking care of our team. Here are some of the benefits
			you'll enjoy.
		</ThemeHeadline>
	</div>

	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		{#each benefits as benefit}
			{@const Icon = benefit.icon}
			<ThemeCard
				class="group p-6 hover:border-primary/50 transition-colors h-full"
			>
				<div
					class="relative w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300"
				>
					<Icon class="w-6 h-6 text-primary" />
				</div>
				<h3 class="text-lg font-semibold mb-2 text-foreground">
					{benefit.title}
				</h3>
				<p class="text-sm text-muted-foreground">
					{benefit.description}
				</p>
			</ThemeCard>
		{/each}
	</div>
</ThemeSection>

<!-- Open Positions Section -->
<ThemeSection id="positions" background="alternate">
	<div class="text-center mb-12">
		<ThemeHeadline variant="h2" class="mb-4">Open Positions</ThemeHeadline>
		<ThemeHeadline variant="sub">
			Explore our current openings and find your next opportunity.
		</ThemeHeadline>
	</div>

	<div class="grid gap-6">
		{#each openRoles as role}
			<button onclick={() => openRole(role)} class="block w-full text-left">
				<ThemeCard class="group p-8 hover:border-primary/50 transition-all">
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-3">
								<h3
									class="text-2xl font-bold text-foreground group-hover:text-primary transition-colors"
								>
									{role.title}
								</h3>
								<span
									class="px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded-full text-sm font-semibold"
								>
									{role.department}
								</span>
							</div>

							<p class="text-muted-foreground mb-4 leading-relaxed">
								{role.description}
							</p>

							<div
								class="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
							>
								<div class="flex items-center gap-2">
									<MapPin class="w-4 h-4" />
									<span>{role.location}</span>
								</div>
								<div class="flex items-center gap-2">
									<Clock class="w-4 h-4" />
									<span>{role.type}</span>
								</div>
							</div>
						</div>

						<div class="flex-shrink-0">
							<div
								class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-all"
							>
								<ArrowRight
									class="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform"
								/>
							</div>
						</div>
					</div>
				</ThemeCard>
			</button>
		{/each}
	</div>
</ThemeSection>

<!-- Culture Section -->
<ThemeSection id="culture" background="default">
	<div class="grid lg:grid-cols-2 gap-12 items-center">
		<div>
			<ThemeHeadline variant="h2" class="mb-6">Our Culture</ThemeHeadline>
			<ThemeHeadline variant="sub" class="mb-6 text-lg">
				We're building a company where great people can do their best work. Our
				culture is built on transparency, ownership, and continuous learning.
			</ThemeHeadline>
			<ul class="space-y-4">
				<li class="flex items-start gap-3 group">
					<div
						class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors"
					>
						<Code class="w-3 h-3 text-primary" />
					</div>
					<div>
						<div class="font-semibold mb-1 text-foreground">
							Ship Fast, Learn Faster
						</div>
						<div class="text-sm text-muted-foreground">
							We believe in rapid iteration and learning from real users.
						</div>
					</div>
				</li>
				<li class="flex items-start gap-3 group">
					<div
						class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors"
					>
						<Users class="w-3 h-3 text-primary" />
					</div>
					<div>
						<div class="font-semibold mb-1 text-foreground">
							Collaborate Openly
						</div>
						<div class="text-sm text-muted-foreground">
							Best ideas win, regardless of where they come from.
						</div>
					</div>
				</li>
				<li class="flex items-start gap-3 group">
					<div
						class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors"
					>
						<TrendingUp class="w-3 h-3 text-primary" />
					</div>
					<div>
						<div class="font-semibold mb-1 text-foreground">Grow Together</div>
						<div class="text-sm text-muted-foreground">
							We invest in your development and celebrate your wins.
						</div>
					</div>
				</li>
			</ul>
		</div>

		<ThemeCard class="aspect-square bg-card/50 p-8 border border-border/50">
			<div class="grid grid-cols-2 gap-4 h-full">
				{#each [{ val: "50+", label: "Team Members" }, { val: "12", label: "Countries" }, { val: "4.9★", label: "Glassdoor Rating" }, { val: "95%", label: "Retention Rate" }] as stat}
					<div
						class="bg-card rounded-xl p-6 border border-border flex flex-col justify-center hover:border-primary/50 transition-all hover:-translate-y-1"
					>
						<div class="text-4xl font-black text-primary mb-2">
							{stat.val}
						</div>
						<div class="text-sm text-muted-foreground font-semibold">
							{stat.label}
						</div>
					</div>
				{/each}
			</div>
		</ThemeCard>
	</div>
</ThemeSection>

<!-- CTA Section -->
<ThemeSection id="cta" background="alternate" class="text-center">
	<div class="max-w-4xl mx-auto">
		<ThemeHeadline variant="h2" class="mb-4"
			>Don't See a Perfect Fit?</ThemeHeadline
		>
		<ThemeHeadline variant="sub" class="mb-8 font-medium">
			We're always looking for talented people. Send us your resume and tell us
			what you're passionate about.
		</ThemeHeadline>

		<a
			href="mailto:careers@spiked.com"
			class="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold transition-all duration-300 hover:brightness-110 hover:scale-105 hover:-translate-y-1 relative overflow-hidden shadow-lg shadow-primary/20"
		>
			<span class="relative z-10"> Get in Touch </span>
			<ArrowRight
				class="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
			/>
		</a>
	</div>
</ThemeSection>

<Footer />

<!-- Role Details Modal -->
{#if selectedRole}
	<div
		class="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
		onclick={closeRole}
		onkeydown={(e) => e.key === "Escape" && closeRole()}
		role="button"
		tabindex="0"
		aria-label="Close modal"
	>
		<div
			class="{$themeStore === 'dark'
				? 'bg-[#030712] border-zinc-800'
				: 'bg-white border-zinc-200'} border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			tabindex="-1"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div class="p-8">
				<div class="flex items-start justify-between mb-6">
					<div>
						<h2
							id="modal-title"
							class="text-3xl font-black mb-2 tracking-tight {$themeStore ===
							'dark'
								? 'text-white'
								: 'text-zinc-900'}"
						>
							{selectedRole.title}
						</h2>
						<div
							class="flex items-center gap-4 text-sm {$themeStore === 'dark'
								? 'text-gray-400'
								: 'text-gray-600'}"
						>
							<span
								class="px-3 py-1 {$themeStore === 'dark'
									? 'bg-red-500/10 border-red-500/30 text-red-300'
									: 'bg-red-50 border-red-200 text-red-600'} rounded-full font-semibold"
							>
								{selectedRole.department}
							</span>
							<div class="flex items-center gap-2">
								<MapPin class="w-4 h-4" />
								<span>{selectedRole.location}</span>
							</div>
							<div class="flex items-center gap-2">
								<Clock class="w-4 h-4" />
								<span>{selectedRole.type}</span>
							</div>
						</div>
					</div>
					<button
						onclick={closeRole}
						class="{$themeStore === 'dark'
							? 'text-gray-400 hover:text-white'
							: 'text-gray-500 hover:text-black'} transition-colors"
						aria-label="Close role details"
					>
						<svg
							class="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div class="space-y-6">
					<div>
						<h3
							class="text-lg font-semibold mb-3 {$themeStore === 'dark'
								? 'text-white'
								: 'text-zinc-900'}"
						>
							About the Role
						</h3>
						<p
							class="{$themeStore === 'dark'
								? 'text-gray-400'
								: 'text-gray-600'} leading-relaxed"
						>
							{selectedRole.description}
						</p>
					</div>

					<div>
						<h3
							class="text-lg font-bold mb-3 {$themeStore === 'dark'
								? 'text-white'
								: 'text-zinc-900'}"
						>
							What We're Looking For
						</h3>
						<ul class="space-y-2">
							{#each selectedRole.requirements as requirement}
								<li
									class="flex items-start gap-3 {$themeStore === 'dark'
										? 'text-gray-400'
										: 'text-gray-600'}"
								>
									<div
										class="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"
									></div>
									<span>{requirement}</span>
								</li>
							{/each}
						</ul>
					</div>

					<div
						class="pt-6 border-t {$themeStore === 'dark'
							? 'border-zinc-800'
							: 'border-zinc-200'}"
					>
						<a
							href="mailto:careers@spiked.com?subject=Application for {selectedRole.title}"
							class="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-bold transition-all duration-300 shadow-xl shadow-red-500/25 hover:shadow-red-500/50 hover:scale-[1.02] relative overflow-hidden text-white"
						>
							<span class="relative z-10"> Apply for This Position </span>
							<ArrowRight
								class="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							></div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
