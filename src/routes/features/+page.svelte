<script>
	import FeaturesShowcase from '$lib/components/FeaturesShowcase.svelte';
	import OnboardingFlow from '$lib/components/OnboardingFlow.svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { Sparkles, MessageSquare, Calendar, Users, GitBranch, BarChart3, Heart, Settings } from 'lucide-svelte';

	const features = [
		{
			id: 'ai-assistance',
			title: 'Real-Time AI Assistance',
			subtitle: 'Based on Your Sales and Solutions Docs',
			description: 'Get instant, contextual answers during your sales calls.',
			icon: Sparkles,
			color: 'red',
			href: '/features/ai-assistance'
		},
		{
			id: 'notetaker',
			title: 'Smart Notetaker',
			subtitle: 'With Spiked AI Conversational Intelligence',
			description: 'Automatically capture, transcribe, and analyze every conversation.',
			icon: MessageSquare,
			color: 'blue',
			href: '/features/notetaker'
		},
		{
			id: 'followup',
			title: 'Follow-Up Preparation',
			subtitle: 'Using Spiked AI Memory and RAG',
			description: 'Never walk into a meeting unprepared.',
			icon: Calendar,
			color: 'green',
			href: '/features/followup'
		},
		{
			id: 'simulator',
			title: 'Meeting Simulator & Coaching',
			subtitle: 'Practice Makes Perfect',
			description: 'Run realistic sales simulations with AI-powered feedback.',
			icon: Users,
			color: 'purple',
			href: '/features/simulator'
		},
		{
			id: 'dev-tools',
			title: 'Developer Tools Integration',
			subtitle: 'Jira, Asana for Dev Teams',
			description: 'Seamlessly connect sales with development workflow.',
			icon: GitBranch,
			color: 'orange',
			href: '/features/dev-tools'
		},
		{
			id: 'crm',
			title: 'CRM Integration',
			subtitle: 'Zoho, Salesforce, and More',
			description: 'Keep your CRM updated automatically in real-time.',
			icon: BarChart3,
			color: 'blue',
			href: '/features/crm'
		},
		{
			id: 'sentiment',
			title: 'Sentiment Analysis',
			subtitle: 'Real-Time Feedback on Performance',
			description: 'Read the room with AI-powered sentiment analysis.',
			icon: Heart,
			color: 'pink',
			href: '/features/sentiment'
		},
		{
			id: 'custom',
			title: 'Custom Goals',
			subtitle: 'Advanced Configuration',
			description: 'Tailor SpikedAI to your unique sales process.',
			icon: Settings,
			color: 'gray',
			href: '/features/custom-goals'
		}
	];

	const colorClasses = {
		red: 'from-red-600 to-red-700 border-red-900/50 hover:border-red-700',
		blue: 'from-blue-600 to-blue-700 border-blue-900/50 hover:border-blue-700',
		green: 'from-green-600 to-green-700 border-green-900/50 hover:border-green-700',
		purple: 'from-purple-600 to-purple-700 border-purple-900/50 hover:border-purple-700',
		orange: 'from-orange-600 to-orange-700 border-orange-900/50 hover:border-orange-700',
		pink: 'from-pink-600 to-pink-700 border-pink-900/50 hover:border-pink-700',
		gray: 'from-gray-600 to-gray-700 border-gray-900/50 hover:border-gray-700'
	};
</script>

<svelte:head>
	<title>Features | SpikedAI</title>
	<meta name="description" content="Explore all SpikedAI features - AI Assistance, Smart Notetaker, CRM Integration, and more." />
</svelte:head>

<div class="min-h-screen bg-black">
	<!-- Hero -->
	<section class="relative pt-32 pb-20">
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
			<div class="absolute bottom-1/4 -right-48 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
		</div>

		<div class="max-w-7xl mx-auto px-6 relative">
			<div class="text-center mb-16">
				<h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
					SpikedAI <span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Features</span>
				</h1>
				<p class="text-xl text-zinc-400 max-w-3xl mx-auto">
					Discover how SpikedAI transforms your sales process with AI-powered tools and integrations.
				</p>
			</div>
		</div>
	</section>

	<!-- Interactive Features Showcase -->
	<FeaturesShowcase />

	<!-- All Features Grid -->
	<section class="py-20 bg-zinc-950/50">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">All Features at a Glance</h2>
				<p class="text-lg text-zinc-400">Quick access to detailed information about each feature</p>
			</div>

			<!-- Features Grid -->
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
				{#each features as feature}
					<a 
						href={feature.href}
						class="group relative p-6 bg-zinc-900 rounded-xl border-2 {colorClasses[feature.color]} transition-all hover:shadow-lg hover:scale-105"
					>
						<div class="mb-4">
							<div class="w-14 h-14 rounded-xl bg-gradient-to-br {colorClasses[feature.color].split(' ')[0]} flex items-center justify-center shadow-lg">
								<svelte:component this={feature.icon} class="w-7 h-7 text-white" />
							</div>
						</div>
						<h3 class="text-xl font-bold text-white mb-2">{feature.title}</h3>
						<p class="text-sm text-zinc-400 mb-3">{feature.subtitle}</p>
						<p class="text-sm text-zinc-500">{feature.description}</p>
						
						<div class="mt-4 flex items-center gap-2 text-red-500 group-hover:gap-3 transition-all">
							<span class="text-sm font-semibold">Learn More</span>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
							</svg>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="py-20 bg-zinc-950/50">
		<div class="max-w-4xl mx-auto px-6 text-center">
			<h2 class="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
			<p class="text-xl text-zinc-400 mb-8">Transform your sales process with SpikedAI today.</p>
			<button 
				onclick={() => onboardingStore.start()}
				class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all"
			>
				Get Started
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
			</button>
		</div>
	</section>
</div>

<!-- Onboarding Flow -->
<OnboardingFlow />
