<script>
	import { Briefcase, MapPin, Clock, ArrowRight, Users, Code, Zap, Heart, TrendingUp } from 'lucide-svelte';
	
	const photo = (file) => `/Photos/${encodeURIComponent(file)}`;

	const benefits = [
		{
			icon: Heart,
			title: 'Comprehensive Health',
			description: 'Medical, dental, and vision coverage for you and your family'
		},
		{
			icon: TrendingUp,
			title: 'Equity Package',
			description: 'Competitive equity grants to share in our success'
		},
		{
			icon: Zap,
			title: 'Flexible Hours',
			description: 'Work when you\'re most productive with flexible scheduling'
		},
		{
			icon: Users,
			title: 'Remote First',
			description: 'Work from anywhere with occasional team gatherings'
		}
	];

	const openRoles = [
		{
			title: 'Full Stack Developer',
			department: 'Engineering',
			location: 'Remote / San Francisco',
			type: 'Full-time',
			description: 'Build and ship features across our entire stack, from frontend experiences to backend infrastructure. You\'ll work with modern technologies like SvelteKit, Node.js, and AI APIs.',
			requirements: [
				'3+ years of experience with modern JavaScript/TypeScript',
				'Strong proficiency with frontend frameworks (React, Vue, or Svelte)',
				'Experience with backend development and APIs',
				'Understanding of database design and optimization',
				'Passion for building delightful user experiences'
			]
		},
		{
			title: 'AI/ML Engineer',
			department: 'Engineering',
			location: 'Remote / San Francisco',
			type: 'Full-time',
			description: 'Shape the future of AI-powered conversation intelligence. Work on cutting-edge LLM integrations, sentiment analysis, and predictive analytics that help sales teams close more deals.',
			requirements: [
				'4+ years of experience in machine learning or AI',
				'Strong Python skills and ML framework expertise (PyTorch, TensorFlow)',
				'Experience with LLMs and prompt engineering',
				'Understanding of NLP and conversation analysis',
				'Track record of shipping ML models to production'
			]
		},
		{
			title: 'Product Designer',
			department: 'Design',
			location: 'Remote / San Francisco',
			type: 'Full-time',
			description: 'Design beautiful, intuitive interfaces that make complex AI capabilities feel simple. You\'ll own the end-to-end design process from research to high-fidelity prototypes.',
			requirements: [
				'3+ years of product design experience',
				'Strong portfolio showcasing web and mobile design',
				'Proficiency with Figma and design systems',
				'Experience designing AI-powered products is a plus',
				'Excellent communication and collaboration skills'
			]
		},
		{
			title: 'Sales Development Representative',
			department: 'Sales',
			location: 'Remote / San Francisco',
			type: 'Full-time',
			description: 'Be the first point of contact for potential customers. You\'ll identify and engage with prospects, qualify leads, and set up meetings for our Account Executives.',
			requirements: [
				'1-2 years of SDR or similar sales experience',
				'Experience with CRM tools (Salesforce, HubSpot, etc.)',
				'Strong written and verbal communication skills',
				'Self-motivated with a track record of exceeding quotas',
				'Interest in SaaS and sales technology'
			]
		},
		{
			title: 'Customer Success Manager',
			department: 'Customer Success',
			location: 'Remote',
			type: 'Full-time',
			description: 'Partner with our customers to ensure they\'re getting maximum value from our platform. You\'ll own onboarding, training, and ongoing relationship management.',
			requirements: [
				'2+ years of customer success or account management experience',
				'Experience with SaaS products and B2B customers',
				'Strong analytical and problem-solving skills',
				'Excellent presentation and training skills',
				'Ability to build strong customer relationships'
			]
		},
		{
			title: 'DevOps Engineer',
			department: 'Engineering',
			location: 'Remote / San Francisco',
			type: 'Full-time',
			description: 'Build and maintain the infrastructure that powers our platform. You\'ll work on CI/CD pipelines, cloud infrastructure, monitoring, and security.',
			requirements: [
				'3+ years of DevOps or SRE experience',
				'Strong knowledge of cloud platforms (AWS, GCP, or Azure)',
				'Experience with containerization (Docker, Kubernetes)',
				'Proficiency with Infrastructure as Code (Terraform, CloudFormation)',
				'Understanding of security best practices'
			]
		}
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
	<meta name="description" content="Join Spiked and help build the future of AI-powered sales intelligence. View open positions and apply today." />
</svelte:head>

<!-- Hero Section -->
<section class="relative pt-32 pb-20 px-6 overflow-hidden">
	<div class="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none"></div>
	
	<div class="max-w-7xl mx-auto relative z-10">
		<div class="text-center max-w-3xl mx-auto">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
				<Briefcase class="w-4 h-4 text-purple-400" />
				<span class="text-sm font-medium text-purple-300">We're Hiring</span>
			</div>
			
			<h1 class="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
				Build the Future of Sales Intelligence
			</h1>
			
			<p class="text-xl text-gray-400 mb-8 leading-relaxed">
				Join a team of builders, designers, and innovators creating AI-powered tools that help sales teams close more deals. We're looking for talented people who want to make an impact.
			</p>

			<div class="flex items-center justify-center gap-4 text-sm text-gray-500">
				<div class="flex items-center gap-2">
					<Users class="w-4 h-4" />
					<span>Remote-first</span>
				</div>
				<div class="w-1 h-1 bg-gray-600 rounded-full"></div>
				<div class="flex items-center gap-2">
					<Heart class="w-4 h-4" />
					<span>Great benefits</span>
				</div>
				<div class="w-1 h-1 bg-gray-600 rounded-full"></div>
				<div class="flex items-center gap-2">
					<TrendingUp class="w-4 h-4" />
					<span>Equity for all</span>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Benefits Section -->
<section class="py-20 px-6">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold mb-4">Why Join Spiked?</h2>
			<p class="text-gray-400 max-w-2xl mx-auto">
				We believe in taking care of our team. Here are some of the benefits you'll enjoy.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each benefits as benefit}
				<div class="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl hover:border-purple-500/30 transition-all duration-300">
					<div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
						<svelte:component this={benefit.icon} class="w-6 h-6 text-purple-400" />
					</div>
					<h3 class="text-lg font-semibold mb-2">{benefit.title}</h3>
					<p class="text-sm text-gray-400">{benefit.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Open Positions Section -->
<section class="py-20 px-6">
	<div class="max-w-7xl mx-auto">
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold mb-4">Open Positions</h2>
			<p class="text-gray-400 max-w-2xl mx-auto">
				Explore our current openings and find your next opportunity.
			</p>
		</div>

		<div class="grid gap-6">
			{#each openRoles as role}
				<button
					onclick={() => openRole(role)}
					class="text-left p-8 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-xl hover:border-purple-500/30 transition-all duration-300 group"
				>
					<div class="flex items-start justify-between gap-4">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-3">
								<h3 class="text-2xl font-bold group-hover:text-purple-400 transition-colors">
									{role.title}
								</h3>
								<span class="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300">
									{role.department}
								</span>
							</div>
							
							<p class="text-gray-400 mb-4 leading-relaxed">
								{role.description}
							</p>

							<div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
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
							<div class="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
								<ArrowRight class="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
							</div>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Culture Section -->
<section class="py-20 px-6 bg-gradient-to-b from-purple-500/5 to-transparent">
	<div class="max-w-7xl mx-auto">
		<div class="grid lg:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-4xl font-bold mb-6">Our Culture</h2>
				<p class="text-gray-400 mb-6 leading-relaxed">
					We're building a company where great people can do their best work. Our culture is built on transparency, ownership, and continuous learning.
				</p>
				<ul class="space-y-4">
					<li class="flex items-start gap-3">
						<div class="w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
							<Code class="w-3 h-3 text-purple-400" />
						</div>
						<div>
							<div class="font-semibold mb-1">Ship Fast, Learn Faster</div>
							<div class="text-sm text-gray-400">We believe in rapid iteration and learning from real users.</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<div class="w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
							<Users class="w-3 h-3 text-purple-400" />
						</div>
						<div>
							<div class="font-semibold mb-1">Collaborate Openly</div>
							<div class="text-sm text-gray-400">Best ideas win, regardless of where they come from.</div>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<div class="w-6 h-6 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
							<TrendingUp class="w-3 h-3 text-purple-400" />
						</div>
						<div>
							<div class="font-semibold mb-1">Grow Together</div>
							<div class="text-sm text-gray-400">We invest in your development and celebrate your wins.</div>
						</div>
					</li>
				</ul>
			</div>
			
			<div class="relative">
				<div class="aspect-square bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl border border-white/10 p-8 backdrop-blur-sm">
					<div class="grid grid-cols-2 gap-4 h-full">
						<div class="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10 flex flex-col justify-center">
							<div class="text-4xl font-bold text-purple-400 mb-2">50+</div>
							<div class="text-sm text-gray-400">Team Members</div>
						</div>
						<div class="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10 flex flex-col justify-center">
							<div class="text-4xl font-bold text-purple-400 mb-2">12</div>
							<div class="text-sm text-gray-400">Countries</div>
						</div>
						<div class="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10 flex flex-col justify-center">
							<div class="text-4xl font-bold text-purple-400 mb-2">4.9★</div>
							<div class="text-sm text-gray-400">Glassdoor Rating</div>
						</div>
						<div class="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/10 flex flex-col justify-center">
							<div class="text-4xl font-bold text-purple-400 mb-2">95%</div>
							<div class="text-sm text-gray-400">Retention Rate</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 px-6">
	<div class="max-w-4xl mx-auto text-center">
		<h2 class="text-3xl font-bold mb-4">Don't See a Perfect Fit?</h2>
		<p class="text-gray-400 mb-8">
			We're always looking for talented people. Send us your resume and tell us what you're passionate about.
		</p>
		<a
			href="mailto:careers@spiked.com"
			class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
		>
			Get in Touch
			<ArrowRight class="w-5 h-5" />
		</a>
	</div>
</section>

<!-- Role Details Modal -->
{#if selectedRole}
	<div
		class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
		onclick={closeRole}
	>
		<div
			class="bg-gray-900 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="p-8">
				<div class="flex items-start justify-between mb-6">
					<div>
						<h2 class="text-3xl font-bold mb-2">{selectedRole.title}</h2>
						<div class="flex items-center gap-4 text-sm text-gray-400">
							<span class="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300">
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
						class="text-gray-400 hover:text-white transition-colors"
					>
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-semibold mb-3">About the Role</h3>
						<p class="text-gray-400 leading-relaxed">{selectedRole.description}</p>
					</div>

					<div>
						<h3 class="text-lg font-semibold mb-3">What We're Looking For</h3>
						<ul class="space-y-2">
							{#each selectedRole.requirements as requirement}
								<li class="flex items-start gap-3 text-gray-400">
									<div class="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
									<span>{requirement}</span>
								</li>
							{/each}
						</ul>
					</div>

					<div class="pt-6 border-t border-white/10">
						<a
							href="mailto:careers@spiked.com?subject=Application for {selectedRole.title}"
							class="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
						>
							Apply for This Position
							<ArrowRight class="w-5 h-5" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(body) {
		background: linear-gradient(to bottom, #0f0f1e 0%, #1a0b2e 100%);
	}
</style>