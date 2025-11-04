<script>
	import { onboardingStore } from '$lib/stores/onboarding.js';
	
	let selectedSize = $state('');
	
	const teamSizes = [
		{
			id: 'solo',
			label: 'Just Me',
			icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
			description: 'Individual user',
			recommended: false
		},
		{
			id: 'small',
			label: '2-10 people',
			icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
			description: 'Small team',
			recommended: true
		},
		{
			id: 'medium',
			label: '11-50 people',
			icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
			description: 'Growing team',
			recommended: false
		},
		{
			id: 'large',
			label: '51-200 people',
			icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
			description: 'Large organization',
			recommended: false
		},
		{
			id: 'enterprise',
			label: '200+ people',
			icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
			description: 'Enterprise scale',
			recommended: false
		}
	];
	
	function handleSelect(sizeId) {
		selectedSize = sizeId;
		onboardingStore.updateUserData({ teamSize: sizeId });
		setTimeout(() => {
			onboardingStore.nextStep();
		}, 300);
	}
</script>

<div class="max-w-3xl mx-auto">
	<div class="text-center mb-12">
		<h2 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
			How big is your team?
		</h2>
		<p class="text-lg text-zinc-400">
			We'll tailor collaboration features to your team size
		</p>
	</div>
	
	<div class="grid md:grid-cols-2 gap-4">
		{#each teamSizes as size}
			<button
				onclick={() => handleSelect(size.id)}
				class="group relative bg-zinc-950 border-2 {selectedSize === size.id ? 'border-red-600' : 'border-zinc-900'} hover:border-red-900/50 rounded-xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/20"
			>
				{#if size.recommended}
					<div class="absolute -top-3 right-4">
						<span class="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
							Popular
						</span>
					</div>
				{/if}
				
				<div class="flex items-start gap-4">
					<div class="flex-shrink-0 p-3 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-red-900/50 transition-colors">
						<svg class="w-6 h-6 {selectedSize === size.id ? 'text-red-500' : 'text-zinc-600'} group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={size.icon} />
						</svg>
					</div>
					<div class="flex-1">
						<h3 class="text-lg font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
							{size.label}
						</h3>
						<p class="text-sm text-zinc-500">
							{size.description}
						</p>
					</div>
					{#if selectedSize === size.id}
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
