<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { BarChart3, Activity, Target, FileText } from 'lucide-svelte';
</script>

<svelte:head>
	<title>CRM Integration | SpikedAI</title>
</svelte:head>

<div class="min-h-screen bg-black">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="crm" />
	
	<section class="relative pt-32 pb-20">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-16">
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-red-950/30 border border-red-900/50 rounded-full mb-6">
					<BarChart3 class="w-4 h-4 text-red-500" />
					<span class="text-sm font-semibold text-red-400">CRM Integration</span>
				</div>
				<h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
					<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">CRM</span> Integration
				</h1>
				<p class="text-xl text-zinc-400 mb-8">Zoho, Salesforce, and More</p>
				<p class="text-lg text-zinc-500 max-w-2xl mx-auto">
					Keep your CRM updated automatically. Every conversation, insight, and action item is synced in real-time to your CRM, ensuring your sales data is always accurate and up-to-date.
				</p>
			</div>

			<div class="max-w-5xl mx-auto">
				<div class="grid md:grid-cols-2 gap-4 mb-8">
					<div class="p-6 bg-zinc-900 rounded-xl border-2 border-blue-900/50">
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
								<svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 17.5h-9v-11h9v11z"/>
								</svg>
							</div>
							<div>
								<h3 class="font-bold text-white">Salesforce</h3>
								<div class="flex items-center gap-1.5 mt-1">
									<div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
									<span class="text-xs text-green-400 font-bold">SYNCING</span>
								</div>
							</div>
						</div>
						<div class="space-y-2 text-sm">
							<div class="flex justify-between">
								<span class="text-zinc-400">Records Synced</span>
								<span class="text-white font-bold">1,247</span>
							</div>
						</div>
					</div>

					<div class="p-6 bg-zinc-900 rounded-xl border-2 border-orange-900/50">
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-700 rounded-xl flex items-center justify-center">
								<span class="text-white text-xl font-bold">Z</span>
							</div>
							<div>
								<h3 class="font-bold text-white">Zoho CRM</h3>
								<div class="flex items-center gap-1.5 mt-1">
									<div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
									<span class="text-xs text-green-400 font-bold">SYNCING</span>
								</div>
							</div>
						</div>
						<div class="space-y-2 text-sm">
							<div class="flex justify-between">
								<span class="text-zinc-400">Records Synced</span>
								<span class="text-white font-bold">892</span>
							</div>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-3 gap-4">
					<div class="p-6 bg-zinc-900 rounded-xl border border-red-900/50 text-center">
						<div class="text-3xl font-bold text-red-500 mb-2">247</div>
						<div class="text-sm text-zinc-400">Records Today</div>
					</div>
					<div class="p-6 bg-zinc-900 rounded-xl border border-green-900/50 text-center">
						<div class="text-3xl font-bold text-green-500 mb-2">100%</div>
						<div class="text-sm text-zinc-400">Success Rate</div>
					</div>
					<div class="p-6 bg-zinc-900 rounded-xl border border-blue-900/50 text-center">
						<div class="text-3xl font-bold text-blue-500 mb-2">2.4s</div>
						<div class="text-sm text-zinc-400">Avg Sync Time</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="py-20">
		<div class="max-w-4xl mx-auto px-6 text-center">
			<h2 class="text-4xl font-bold text-white mb-6">Keep Your CRM Perfect</h2>
			<a href="/" class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl">
				Connect Your CRM →
			</a>
		</div>
	</section>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="crm" />
</div>
