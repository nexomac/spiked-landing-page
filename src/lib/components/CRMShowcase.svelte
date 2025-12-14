<script>
	import { fly } from 'svelte/transition';

	let {
		mouseX = 0,
		mouseY = 0,
		showAppChrome = true
	} = $props();
</script>

<div 
	class="relative"
	in:fly={{ x: 30, duration: 800, delay: 400 }}
	style="transform: perspective(1000px) rotateY({mouseX * -2}deg) rotateX({mouseY * 2}deg)"
>
	<div class="bg-zinc-950/90 border border-zinc-800 rounded-2xl overflow-hidden">
		{#if showAppChrome}
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
		{/if}
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

