<script>
	import { onboardingStore } from '$lib/stores/onboarding.js';
	
	let selectedIntegrations = $state([]);
	
	const integrations = [
		{
			id: 'salesforce',
			label: 'Salesforce',
			category: 'CRM',
			logo: '☁️'
		},
		{
			id: 'hubspot',
			label: 'HubSpot',
			category: 'CRM',
			logo: '🟠'
		},
		{
			id: 'pipedrive',
			label: 'Pipedrive',
			category: 'CRM',
			logo: '🟢'
		},
		{
			id: 'zoom',
			label: 'Zoom',
			category: 'Video',
			logo: '📹'
		},
		{
			id: 'teams',
			label: 'Microsoft Teams',
			category: 'Video',
			logo: '💬'
		},
		{
			id: 'meet',
			label: 'Google Meet',
			category: 'Video',
			logo: '🎥'
		},
		{
			id: 'slack',
			label: 'Slack',
			category: 'Communication',
			logo: '💬'
		},
		{
			id: 'jira',
			label: 'Jira',
			category: 'Project Mgmt',
			logo: '📋'
		},
		{
			id: 'asana',
			label: 'Asana',
			category: 'Project Mgmt',
			logo: '✅'
		},
		{
			id: 'none',
			label: "I'll set this up later",
			category: 'Skip',
			logo: '⏭️'
		}
	];
	
	function toggleIntegration(integrationId) {
		if (integrationId === 'none') {
			selectedIntegrations = ['none'];
		} else {
			const filtered = selectedIntegrations.filter(id => id !== 'none');
			if (filtered.includes(integrationId)) {
				selectedIntegrations = filtered.filter(id => id !== integrationId);
			} else {
				selectedIntegrations = [...filtered, integrationId];
			}
		}
	}
	
	function handleNext() {
		onboardingStore.updateUserData({ integrations: selectedIntegrations });
		onboardingStore.nextStep();
	}
</script>

<div class="max-w-4xl mx-auto">
	<div class="text-center mb-12">
		<h2 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
			Connect your tools
		</h2>
		<p class="text-lg text-zinc-400">
			Select the tools you use. We'll help you integrate them.
		</p>
	</div>
	
	<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
		{#each integrations as integration}
			<button
				onclick={() => toggleIntegration(integration.id)}
				class="group relative bg-zinc-950 border-2 {selectedIntegrations.includes(integration.id) ? 'border-red-600' : 'border-zinc-900'} hover:border-red-900/50 rounded-xl p-5 text-center transition-all duration-300 transform hover:-translate-y-1 {integration.id === 'none' ? 'col-span-2 md:col-span-3' : ''}"
			>
				<div class="flex flex-col items-center gap-3">
					<div class="text-4xl">{integration.logo}</div>
					<div>
						<h3 class="text-base font-bold text-white group-hover:text-red-500 transition-colors">
							{integration.label}
						</h3>
						<p class="text-xs text-zinc-600 mt-1">{integration.category}</p>
					</div>
					{#if selectedIntegrations.includes(integration.id)}
						<div class="absolute top-2 right-2">
							<div class="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
								<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
						</div>
					{/if}
				</div>
			</button>
		{/each}
	</div>
	
	<div class="flex gap-4">
		<button
			onclick={() => onboardingStore.prevStep()}
			class="px-8 py-4 bg-zinc-900 text-white rounded-lg font-semibold text-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
		>
			Back
		</button>
		<button
			onclick={handleNext}
			class="group flex-1 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold text-lg hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300"
		>
			<span class="flex items-center justify-center gap-2">
				{selectedIntegrations.length > 0 ? `Continue with ${selectedIntegrations.length} selected` : 'Continue'}
				<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</span>
		</button>
	</div>
</div>
