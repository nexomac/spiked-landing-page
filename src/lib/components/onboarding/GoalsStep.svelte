<script>
	import { onboardingStore } from '$lib/stores/onboarding.js';
	
	let selectedGoal = $state('');
	
	const goals = [
		{
			id: 'close_more',
			label: 'Close More Deals',
			icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
			description: 'Increase conversion rates and revenue'
		},
		{
			id: 'save_time',
			label: 'Save Time on Admin Work',
			icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
			description: 'Automate follow-ups and data entry'
		},
		{
			id: 'improve_skills',
			label: 'Improve Sales Skills',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z',
			description: 'Practice and learn from AI insights'
		},
		{
			id: 'better_insights',
			label: 'Get Better Insights',
			icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
			description: 'Understand customer sentiment and signals'
		},
		{
			id: 'team_collaboration',
			label: 'Improve Team Collaboration',
			icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
			description: 'Share knowledge and best practices'
		},
		{
			id: 'stay_organized',
			label: 'Stay Organized',
			icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
			description: 'Keep track of all your opportunities'
		}
	];
	
	function handleSelect(goalId) {
		selectedGoal = goalId;
		onboardingStore.updateUserData({ primaryGoal: goalId });
		setTimeout(() => {
			onboardingStore.nextStep();
		}, 300);
	}
</script>

<div class="max-w-3xl mx-auto">
	<div class="text-center mb-12">
		<h2 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
			What's your main goal?
		</h2>
		<p class="text-lg text-zinc-400">
			Choose your primary objective. You can always do more later.
		</p>
	</div>
	
	<div class="grid md:grid-cols-2 gap-4">
		{#each goals as goal}
			<button
				onclick={() => handleSelect(goal.id)}
				class="group relative bg-zinc-950 border-2 {selectedGoal === goal.id ? 'border-red-600' : 'border-zinc-900'} hover:border-red-900/50 rounded-xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/20"
			>
				<div class="flex items-start gap-4">
					<div class="flex-shrink-0 p-3 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-red-900/50 transition-colors">
						<svg class="w-6 h-6 {selectedGoal === goal.id ? 'text-red-500' : 'text-zinc-600'} group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={goal.icon} />
						</svg>
					</div>
					<div class="flex-1">
						<h3 class="text-lg font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
							{goal.label}
						</h3>
						<p class="text-sm text-zinc-500">
							{goal.description}
						</p>
					</div>
					{#if selectedGoal === goal.id}
						<div class="flex-shrink-0">
							<div class="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
								<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
							</div>
						</div>
					{/if}
				</div>
			</button>
		{/each}
	</div>
	
	<div class="mt-8">
		<button
			onclick={() => onboardingStore.prevStep()}
			class="px-8 py-4 bg-zinc-900 text-white rounded-lg font-semibold text-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
		>
			Back
		</button>
	</div>
</div>
