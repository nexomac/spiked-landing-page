<script>
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	
	import WelcomeStep from './onboarding/WelcomeStep.svelte';
	import RoleStep from './onboarding/RoleStep.svelte';
	import UseCaseStep from './onboarding/UseCaseStep.svelte';
	import TeamSizeStep from './onboarding/TeamSizeStep.svelte';
	import GoalsStep from './onboarding/GoalsStep.svelte';
	import IntegrationsStep from './onboarding/IntegrationsStep.svelte';
	import CompletionStep from './onboarding/CompletionStep.svelte';
	
	let { isActive, currentStep } = $derived($onboardingStore);
	
	const steps = [
		{ component: WelcomeStep, label: 'Welcome', progress: 0 },
		{ component: RoleStep, label: 'Your Role', progress: 16 },
		{ component: UseCaseStep, label: 'Use Cases', progress: 33 },
		{ component: TeamSizeStep, label: 'Team Size', progress: 50 },
		{ component: GoalsStep, label: 'Goals', progress: 66 },
		{ component: IntegrationsStep, label: 'Integrations', progress: 83 },
		{ component: CompletionStep, label: 'Complete', progress: 100 }
	];
	
	let CurrentComponent = $derived(steps[currentStep].component);
	
	let direction = $state(1); // 1 for forward, -1 for backward
	let previousStep = $state(0);
	
	$effect(() => {
		if (currentStep !== previousStep) {
			direction = currentStep > previousStep ? 1 : -1;
			previousStep = currentStep;
		}
	});
	
	function handleClose() {
		if (confirm('Are you sure you want to exit? Your progress will be lost.')) {
			onboardingStore.close();
		}
	}

	// Handle Escape key
	$effect(() => {
		if (!isActive) return;

		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				handleClose();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	});
</script>

{#if isActive}
	<!-- Overlay -->
	<div 
		class="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl"
		transition:fade={{ duration: 300 }}
	>
		<!-- Close Button -->
		<button
			type="button"
			on:click={handleClose}
			on:keydown={(e) => e.key === 'Enter' && handleClose()}
			class="fixed top-6 right-6 z-[60] p-3 bg-zinc-900 hover:bg-red-950 border border-zinc-800 hover:border-red-700 rounded-lg transition-all duration-300 group cursor-pointer hover:scale-110 active:scale-95"
			aria-label="Close onboarding modal"
		>
			<svg class="w-6 h-6 text-zinc-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
		
		<!-- Progress Bar -->
		<div class="fixed top-0 left-0 right-0 z-10">
			<div class="h-1 bg-zinc-900">
				<div 
					class="h-full bg-gradient-to-r from-red-600 to-red-700 transition-all duration-500 ease-out"
					style="width: {steps[currentStep].progress}%"
				></div>
			</div>
			
			<!-- Step Indicators -->
			<div class="max-w-5xl mx-auto px-6 py-6">
				<div class="flex items-center justify-between">
					{#each steps as step, i}
						{#if i < steps.length - 1}
							<div class="flex items-center gap-3">
								<div class="flex items-center gap-2">
									<div class="w-8 h-8 rounded-full border-2 {i < currentStep ? 'bg-red-600 border-red-600' : i === currentStep ? 'border-red-600' : 'border-zinc-800'} flex items-center justify-center transition-all duration-300">
										{#if i < currentStep}
											<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
											</svg>
										{:else}
											<span class="text-xs font-bold {i === currentStep ? 'text-red-500' : 'text-zinc-600'}">{i + 1}</span>
										{/if}
									</div>
									<span class="hidden md:block text-sm font-medium {i <= currentStep ? 'text-zinc-300' : 'text-zinc-600'} transition-colors">
										{step.label}
									</span>
								</div>
								{#if i < steps.length - 2}
									<div class="hidden md:block w-12 h-0.5 {i < currentStep ? 'bg-red-600' : 'bg-zinc-800'} transition-colors duration-300"></div>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
		
		<!-- Main Content -->
		<div class="flex items-center justify-center min-h-screen px-6 py-24">
			<div class="w-full max-w-5xl">
				{#key currentStep}
					<div
						in:fly={{ x: direction * 100, duration: 400, easing: cubicOut, delay: 200 }}
						out:fly={{ x: direction * -100, duration: 200, easing: cubicOut }}
					>
						<CurrentComponent />
					</div>
				{/key}
			</div>
		</div>
		
		<!-- Keyboard Navigation Hint -->
		<div class="fixed bottom-6 left-1/2 transform -translate-x-1/2">
			<div class="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg px-4 py-2 text-xs text-zinc-500">
				Press <kbd class="px-2 py-1 bg-zinc-800 rounded text-zinc-400 font-mono">Esc</kbd> to exit
			</div>
		</div>
	</div>
{/if}

<style>
	kbd {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}
</style>
