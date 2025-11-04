<script>
	import { onboardingStore } from '$lib/stores/onboarding.js';
	
	let selectedUseCases = $state([]);
	
	const useCases = [
		{
			id: 'realtime_assistance',
			label: 'Real-Time Call Assistance',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z',
			description: 'Get instant answers during live calls'
		},
		{
			id: 'call_practice',
			label: 'Sales Call Practice',
			icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
			description: 'Practice with AI-powered role-play'
		},
		{
			id: 'meeting_notes',
			label: 'Automated Meeting Notes',
			icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
			description: 'Transcribe and summarize meetings'
		},
		{
			id: 'followup',
			label: 'Follow-Up Automation',
			icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
			description: 'Auto-generate follow-up tasks'
		},
		{
			id: 'sentiment',
			label: 'Sentiment Analysis',
			icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
			description: 'Track customer sentiment in real-time'
		},
		{
			id: 'crm_sync',
			label: 'CRM Integration',
			icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
			description: 'Sync with Salesforce, HubSpot & more'
		},
		{
			id: 'analytics',
			label: 'Sales Analytics',
			icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
			description: 'Deep insights into sales performance'
		},
		{
			id: 'custom_goals',
			label: 'Custom Goal Tracking',
			icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
			description: 'Track MEDPIC and custom frameworks'
		}
	];
	
	function toggleUseCase(useCaseId) {
		if (selectedUseCases.includes(useCaseId)) {
			selectedUseCases = selectedUseCases.filter(id => id !== useCaseId);
		} else {
			selectedUseCases = [...selectedUseCases, useCaseId];
		}
	}
	
	function handleNext() {
		if (selectedUseCases.length > 0) {
			onboardingStore.updateUserData({ useCases: selectedUseCases });
			onboardingStore.nextStep();
		}
	}
</script>

<div class="max-w-4xl mx-auto">
	<div class="text-center mb-12">
		<h2 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
			What do you want to achieve?
		</h2>
		<p class="text-lg text-zinc-400">
			Select all that apply. We'll prioritize these features for you.
		</p>
	</div>
	
	<div class="grid md:grid-cols-2 gap-4 mb-8">
		{#each useCases as useCase}
			<button
				onclick={() => toggleUseCase(useCase.id)}
				class="group relative bg-zinc-950 border-2 {selectedUseCases.includes(useCase.id) ? 'border-red-600' : 'border-zinc-900'} hover:border-red-900/50 rounded-xl p-5 text-left transition-all duration-300 transform hover:-translate-y-1"
			>
				<div class="flex items-start gap-4">
					<div class="flex-shrink-0 p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-red-900/50 transition-colors">
						<svg class="w-5 h-5 {selectedUseCases.includes(useCase.id) ? 'text-red-500' : 'text-zinc-600'} group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={useCase.icon} />
						</svg>
					</div>
					<div class="flex-1">
						<h3 class="text-base font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
							{useCase.label}
						</h3>
						<p class="text-sm text-zinc-500">
							{useCase.description}
						</p>
					</div>
					<div class="flex-shrink-0">
						<div class="w-6 h-6 rounded-full border-2 {selectedUseCases.includes(useCase.id) ? 'border-red-600 bg-red-600' : 'border-zinc-800'} flex items-center justify-center transition-all">
							{#if selectedUseCases.includes(useCase.id)}
								<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							{/if}
						</div>
					</div>
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
			disabled={selectedUseCases.length === 0}
			class="group flex-1 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300"
		>
			<span class="flex items-center justify-center gap-2">
				Continue ({selectedUseCases.length} selected)
				<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</span>
		</button>
	</div>
</div>
