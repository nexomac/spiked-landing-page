<script>
	import { Sparkles, MessageSquare, Calendar, Users, GitBranch, BarChart3, Heart, Settings, ArrowLeft, Home } from 'lucide-svelte';
	
	export let currentFeature = '';
	
	const features = [
		{ id: 'ai-assistance', title: 'AI Assistance', icon: Sparkles, href: '/features/ai-assistance', color: 'red' },
		{ id: 'notetaker', title: 'Notetaker', icon: MessageSquare, href: '/features/notetaker', color: 'blue' },
		{ id: 'followup', title: 'Follow-Up', icon: Calendar, href: '/features/followup', color: 'green' },
		{ id: 'simulator', title: 'Simulator', icon: Users, href: '/features/simulator', color: 'purple' },
		{ id: 'dev-tools', title: 'Dev Tools', icon: GitBranch, href: '/features/dev-tools', color: 'orange' },
		{ id: 'crm', title: 'CRM', icon: BarChart3, href: '/features/crm', color: 'blue' },
		{ id: 'sentiment', title: 'Sentiment', icon: Heart, href: '/features/sentiment', color: 'pink' },
		{ id: 'custom-goals', title: 'Custom Goals', icon: Settings, href: '/features/custom-goals', color: 'gray' }
	];
	
	const currentIndex = features.findIndex(f => f.id === currentFeature);
	const prevFeature = currentIndex > 0 ? features[currentIndex - 1] : null;
	const nextFeature = currentIndex < features.length - 1 ? features[currentIndex + 1] : null;
</script>

<div class="bg-zinc-950/50 border-y border-zinc-800 sticky top-[72px] z-40 backdrop-blur-xl">
	<div class="max-w-7xl mx-auto px-6 py-4">
		<div class="flex items-center justify-between gap-4">
			<!-- Left: Back Navigation -->
			<div class="flex items-center gap-3">
				<a 
					href="/" 
					class="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-all group"
				>
					<Home class="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
					<span class="text-sm text-zinc-400 group-hover:text-white transition-colors">Home</span>
				</a>
				<a 
					href="/features" 
					class="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-all group"
				>
					<ArrowLeft class="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
					<span class="text-sm text-zinc-400 group-hover:text-white transition-colors">All Features</span>
				</a>
			</div>

			<!-- Center: Quick Feature Navigation (Desktop) -->
			<div class="hidden lg:flex items-center gap-2 flex-1 justify-center">
				{#each features as feature}
					<a 
						href={feature.href}
						class="p-2 rounded-lg transition-all {feature.id === currentFeature ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'}"
						title={feature.title}
					>
						<svelte:component this={feature.icon} class="w-4 h-4" />
					</a>
				{/each}
			</div>

			<!-- Right: Previous/Next Navigation -->
			<div class="flex items-center gap-2">
				{#if prevFeature}
					<a 
						href={prevFeature.href}
						class="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-all group"
						title={prevFeature.title}
					>
						<ArrowLeft class="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
						<span class="text-sm text-zinc-400 group-hover:text-white transition-colors hidden sm:inline">Previous</span>
					</a>
				{/if}
				{#if nextFeature}
					<a 
						href={nextFeature.href}
						class="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-all group"
						title={nextFeature.title}
					>
						<span class="text-sm text-zinc-400 group-hover:text-white transition-colors hidden sm:inline">Next</span>
						<svg class="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				{/if}
			</div>
		</div>

		<!-- Mobile: Feature Dropdown -->
		<div class="lg:hidden mt-3">
			<select 
				class="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white focus:outline-none focus:border-red-500"
				onchange={(e) => window.location.href = e.target.value}
			>
				<option value="" disabled>Jump to Feature...</option>
				{#each features as feature}
					<option value={feature.href} selected={feature.id === currentFeature}>
						{feature.title}
					</option>
				{/each}
			</select>
		</div>
	</div>
</div>
