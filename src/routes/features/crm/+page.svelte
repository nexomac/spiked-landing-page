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
	
	<section class="relative min-h-screen pt-32 pb-24">
		<!-- Background -->
		<div class="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black"></div>
		<div class="fixed inset-0 pointer-events-none">
			<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
			<div class="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" style="animation-delay: 1s"></div>
		</div>

		<div class="max-w-7xl mx-auto px-6 relative">
			<div class="grid lg:grid-cols-2 gap-16 items-start">
				<!-- Left Column -->
				<div class="lg:sticky lg:top-32 z-10">
					<div class="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-full mb-8">
						<BarChart3 class="w-4 h-4 text-red-500 animate-pulse" />
						<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">CRM Integration</span>
					</div>

					<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8">
						<span class="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent block mb-2">Auto-sync your CRM</span>
						<span class="text-white block">in real-time</span>
					</h1>

					<div class="space-y-4 mb-10">
						<div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all">
							<div class="flex items-start gap-4">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
									<Activity class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1">Automatic data sync</h3>
									<p class="text-sm text-zinc-400">Every conversation and insight synced to your CRM instantly</p>
								</div>
							</div>
						</div>

						<div class="bg-zinc-900/50 border-l-2 border-red-500 rounded-xl p-4 hover:bg-red-500/5 transition-all">
							<div class="flex items-start gap-4">
								<div class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
									<Target class="w-5 h-5 text-red-500" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1">Works with your tools</h3>
									<p class="text-sm text-zinc-400">Salesforce, HubSpot, monday.com, Zoho, and all major CRM platforms</p>
								</div>
							</div>
						</div>

						<div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all">
							<div class="flex items-start gap-4">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
									<FileText class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1">Always accurate data</h3>
									<p class="text-sm text-zinc-400">No more manual data entry or outdated records</p>
								</div>
							</div>
						</div>
					</div>

					<a href="/" class="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium group">
						<span>Connect your CRM</span>
						<svg class="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
						</svg>
					</a>
				</div>

				<!-- Right Column -->
				<div class="relative">

					<div class="bg-zinc-950/90 border border-zinc-800 rounded-2xl overflow-hidden">
						<div class="bg-zinc-900/90 border-b border-zinc-800/50 px-4 py-3 flex items-center justify-between">
							<div class="flex items-center gap-3">
								<div class="flex gap-1.5">
									<div class="w-3 h-3 rounded-full bg-zinc-700"></div>
									<div class="w-3 h-3 rounded-full bg-zinc-700"></div>
									<div class="w-3 h-3 rounded-full bg-zinc-700"></div>
								</div>
								<span class="text-sm font-medium text-white">CRM Integration</span>
							</div>
							<div class="flex items-center gap-2">
								<span class="relative flex h-2 w-2">
									<span class="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 animate-ping"></span>
									<span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
								</span>
								<span class="text-xs text-zinc-500">Synced</span>
							</div>
						</div>
						<div class="p-6">
							<div class="grid md:grid-cols-2 gap-4 mb-8">
								<div class="p-6 bg-zinc-900 rounded-xl border-2 border-blue-900/50">
									<div class="flex items-center gap-3 mb-4">
										<div class="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-blue-600/20">
											<img src="/Salesforce.com_logo.svg.png" alt="Salesforce logo" class="h-10 w-10 object-contain" />
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
										<div class="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-orange-600/20">
											<img src="/hubspot.png" alt="HubSpot logo" class="h-9 w-9 object-contain" />
										</div>
										<div>
											<h3 class="font-bold text-white">HubSpot</h3>
											<div class="flex items-center gap-1.5 mt-1">
												<div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
												<span class="text-xs text-green-400 font-bold">SYNCING</span>
											</div>
										</div>
									</div>
									<div class="space-y-2 text-sm">
										<div class="flex justify-between">
											<span class="text-zinc-400">Records Synced</span>
											<span class="text-white font-bold">940</span>
										</div>
									</div>
								</div>

								<div class="p-6 bg-zinc-900 rounded-xl border-2 border-emerald-900/50">
									<div class="flex items-center gap-3 mb-4">
										<div class="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-emerald-500/15">
											<img src="/monday.svg" alt="monday.com logo" class="h-8 w-10 object-contain" />
										</div>
										<div>
											<h3 class="font-bold text-white">monday.com</h3>
											<div class="flex items-center gap-1.5 mt-1">
												<div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
												<span class="text-xs text-green-400 font-bold">SYNCING</span>
											</div>
										</div>
									</div>
									<div class="space-y-2 text-sm">
										<div class="flex justify-between">
											<span class="text-zinc-400">Records Synced</span>
											<span class="text-white font-bold">618</span>
										</div>
									</div>
								</div>

								<div class="p-6 bg-zinc-900 rounded-xl border-2 border-orange-900/50">
									<div class="flex items-center gap-3 mb-4">
										<div class="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-orange-600/20">
											<img src="/Zoho.png" alt="Zoho CRM logo" class="h-8 w-10 object-contain" />
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
