<script>
	import { ArrowRight } from 'lucide-svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	
	export let currentFeature = '';
	
	const features = [
		{ id: 'ai-assistance', title: 'AI Assistance', href: '/features/ai-assistance' },
		{ id: 'notetaker', title: 'Notetaker', href: '/features/notetaker' },
		{ id: 'followup', title: 'Follow-Up', href: '/features/followup' },
		{ id: 'simulator', title: 'Simulator', href: '/features/simulator' },
		{ id: 'dev-tools', title: 'Dev Tools', href: '/features/dev-tools' },
		{ id: 'crm', title: 'CRM', href: '/features/crm' },
		{ id: 'sentiment', title: 'Sentiment', href: '/features/sentiment' },
		{ id: 'custom-goals', title: 'Custom Goals', href: '/features/custom-goals' }
	];
	
	const otherFeatures = features.filter(f => f.id !== currentFeature);
</script>

<footer class="bg-zinc-950 border-t border-zinc-800">
	<div class="max-w-7xl mx-auto px-6 py-16">
		<!-- Explore Other Features -->
		<div class="mb-12">
			<h3 class="text-2xl font-bold text-white mb-6">Explore Other Features</h3>
			<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{#each otherFeatures.slice(0, 4) as feature}
					<a 
						href={feature.href}
						class="group p-4 bg-zinc-900 rounded-lg border border-zinc-800 hover:border-red-500 transition-all hover:shadow-lg hover:shadow-red-500/10"
					>
						<div class="flex items-center justify-between">
							<span class="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors">{feature.title}</span>
							<ArrowRight class="w-4 h-4 text-zinc-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
						</div>
					</a>
				{/each}
			</div>
		</div>

		<!-- CTA Section -->
		<div class="bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-2xl p-8 md:p-12 border border-zinc-800 text-center">
			<h3 class="text-3xl md:text-4xl font-bold text-white mb-4">
				Ready to Transform Your Sales Process?
			</h3>
			<p class="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
				Join thousands of sales professionals using SpikedAI to close more deals and work smarter.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<button 
					onclick={onboardingStore.start}
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all hover:scale-105 group"
				>
					<span>Get Started Free</span>
					<ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
				</button>
				<a 
					href="/features"
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 text-white font-semibold rounded-xl hover:bg-zinc-700 transition-all hover:scale-105"
				>
					<span>View All Features</span>
				</a>
			</div>
		</div>

		<!-- Footer Links -->
		<div class="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
			<div class="flex items-center gap-2">
				<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI" class="h-6 w-6 rounded" />
				<span class="text-sm text-zinc-500">© 2025 SpikedAI. All rights reserved.</span>
			</div>
			<div class="flex items-center gap-6">
				<a href="/" class="text-sm text-zinc-400 hover:text-red-500 transition-colors">Home</a>
				<a href="/features" class="text-sm text-zinc-400 hover:text-red-500 transition-colors">Features</a>
				<a href="/#pricing" class="text-sm text-zinc-400 hover:text-red-500 transition-colors">Pricing</a>
			</div>
		</div>
	</div>
</footer>
