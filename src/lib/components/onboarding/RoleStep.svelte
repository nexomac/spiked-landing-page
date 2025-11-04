<script>
	import { onboardingStore } from '$lib/stores/onboarding.js';
	
	let selectedRole = $state('');
	
	const roles = [
		{
			id: 'sales_rep',
			label: 'Sales Representative',
			icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
			description: 'Individual contributor closing deals'
		},
		{
			id: 'sales_manager',
			label: 'Sales Manager',
			icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
			description: 'Leading a sales team'
		},
		{
			id: 'sales_engineer',
			label: 'Sales Engineer',
			icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
			description: 'Technical sales expert'
		},
		{
			id: 'founder',
			label: 'Founder / CEO',
			icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
			description: 'Running the company'
		},
		{
			id: 'operations',
			label: 'Sales Operations',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
			description: 'Optimizing sales processes'
		},
		{
			id: 'other',
			label: 'Other',
			icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
			description: 'Another role'
		}
	];
	
	function handleSelect(roleId) {
		selectedRole = roleId;
		onboardingStore.updateUserData({ role: roleId });
		setTimeout(() => {
			onboardingStore.nextStep();
		}, 300);
	}
</script>

<div class="max-w-3xl mx-auto">
	<div class="text-center mb-12">
		<h2 class="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
			What's your role?
		</h2>
		<p class="text-lg text-zinc-400">
			We'll customize your experience based on your needs
		</p>
	</div>
	
	<div class="grid md:grid-cols-2 gap-4">
		{#each roles as role}
			<button
				onclick={() => handleSelect(role.id)}
				class="group relative bg-zinc-950 border-2 {selectedRole === role.id ? 'border-red-600' : 'border-zinc-900'} hover:border-red-900/50 rounded-xl p-6 text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/20"
			>
				<div class="flex items-start gap-4">
					<div class="flex-shrink-0 p-3 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-red-900/50 transition-colors">
						<svg class="w-6 h-6 {selectedRole === role.id ? 'text-red-500' : 'text-zinc-600'} group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={role.icon} />
						</svg>
					</div>
					<div class="flex-1">
						<h3 class="text-lg font-bold text-white mb-1 group-hover:text-red-500 transition-colors">
							{role.label}
						</h3>
						<p class="text-sm text-zinc-500">
							{role.description}
						</p>
					</div>
					{#if selectedRole === role.id}
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
</div>
