<script>
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { onMount } from 'svelte';
	
	let confettiActive = $state(false);
	let showContent = $state(false);
	
	onMount(() => {
		setTimeout(() => {
			confettiActive = true;
		}, 300);
		setTimeout(() => {
			showContent = true;
		}, 600);
	});
	
	function handleComplete() {
		onboardingStore.complete();
		// Here you would typically redirect to dashboard or send data to backend
		window.location.href = '/dashboard'; // Update with your actual dashboard route
	}
	
	function handleBack() {
		onboardingStore.prevStep();
	}
</script>

<div class="max-w-3xl mx-auto text-center">
	<!-- Success Animation -->
	<div class="mb-8 relative">
		<div class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full mb-6 {confettiActive ? 'animate-success-pop' : 'scale-0 opacity-0'} transition-all duration-500">
			<svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
			</svg>
		</div>
		
		<!-- Confetti Effect -->
		{#if confettiActive}
			<div class="absolute inset-0 pointer-events-none">
				{#each Array(12) as _, i}
					<div 
						class="absolute w-2 h-2 bg-red-500 rounded-full animate-confetti"
						style="left: 50%; top: 50%; animation-delay: {i * 0.1}s; animation-duration: {1 + Math.random()}s;"
					></div>
				{/each}
			</div>
		{/if}
	</div>
	
	<div class="transform transition-all duration-700 {showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
		<h1 class="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
			You're All Set! 🎉
		</h1>
		<p class="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
			Your personalized SpikedAI workspace is ready. Let's start closing more deals with AI-powered intelligence.
		</p>
		
		<!-- Summary Cards -->
		<div class="grid md:grid-cols-3 gap-4 mb-12 text-left">
			<div class="bg-zinc-950 border border-zinc-900 rounded-xl p-6">
				<div class="flex items-center gap-3 mb-3">
					<div class="p-2 bg-red-950/30 rounded-lg">
						<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h3 class="text-lg font-bold text-white">Quick Setup</h3>
				</div>
				<p class="text-sm text-zinc-500">Your workspace is configured based on your preferences</p>
			</div>
			
			<div class="bg-zinc-950 border border-zinc-900 rounded-xl p-6">
				<div class="flex items-center gap-3 mb-3">
					<div class="p-2 bg-red-950/30 rounded-lg">
						<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</div>
					<h3 class="text-lg font-bold text-white">AI Ready</h3>
				</div>
				<p class="text-sm text-zinc-500">Real-time assistance and insights are active</p>
			</div>
			
			<div class="bg-zinc-950 border border-zinc-900 rounded-xl p-6">
				<div class="flex items-center gap-3 mb-3">
					<div class="p-2 bg-red-950/30 rounded-lg">
						<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
						</svg>
					</div>
					<h3 class="text-lg font-bold text-white">Integrations</h3>
				</div>
				<p class="text-sm text-zinc-500">Connect your tools in settings anytime</p>
			</div>
		</div>
		
		<!-- Next Steps -->
		<div class="bg-gradient-to-br from-red-950/20 to-zinc-950/50 border border-red-900/30 rounded-xl p-8 mb-12">
			<h3 class="text-2xl font-bold text-white mb-6">Next Steps to Get Started</h3>
			<div class="grid md:grid-cols-2 gap-4 text-left">
				{#each [
					{
						step: '1',
						title: 'Upload Your Knowledge Base',
						description: 'Add sales decks, product docs, and FAQs',
						icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
					},
					{
						step: '2',
						title: 'Practice Your First Call',
						description: 'Try the AI call simulator',
						icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
					},
					{
						step: '3',
						title: 'Join Your First Meeting',
						description: 'Test real-time AI assistance',
						icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
					},
					{
						step: '4',
						title: 'Explore the Dashboard',
						description: 'View your analytics and insights',
						icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
					}
				] as nextStep}
					<div class="flex items-start gap-4 bg-zinc-950/50 rounded-lg p-4">
						<div class="flex-shrink-0">
							<div class="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
								{nextStep.step}
							</div>
						</div>
						<div class="flex-1">
							<h4 class="text-base font-bold text-white mb-1">{nextStep.title}</h4>
							<p class="text-sm text-zinc-500">{nextStep.description}</p>
						</div>
						<div class="flex-shrink-0">
							<svg class="w-5 h-5 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={nextStep.icon} />
							</svg>
						</div>
					</div>
				{/each}
			</div>
		</div>
		
		<!-- Action Buttons -->
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<button
				onclick={handleBack}
				class="px-8 py-4 bg-zinc-900 text-white rounded-lg font-semibold text-lg border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
			>
				← Review Settings
			</button>
			<button
				onclick={handleComplete}
				class="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300"
			>
				<span class="flex items-center justify-center gap-2">
					Go to Dashboard
					<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</span>
			</button>
		</div>
		
		<p class="mt-8 text-sm text-zinc-600">
			Need help? Check out our <a href="/docs" class="text-red-500 hover:text-red-400 underline">documentation</a> or <a href="/support" class="text-red-500 hover:text-red-400 underline">contact support</a>
		</p>
	</div>
</div>

<style>
	@keyframes success-pop {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
	
	@keyframes confetti {
		0% {
			transform: translate(0, 0) rotate(0deg);
			opacity: 1;
		}
		100% {
			transform: translate(var(--x), var(--y)) rotate(720deg);
			opacity: 0;
		}
	}
	
	.animate-success-pop {
		animation: success-pop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
	}
	
	.animate-confetti {
		--x: calc((50 - 50) * 1vw);
		--y: calc(100px + 50vh);
		animation: confetti forwards;
	}
	
	.animate-confetti:nth-child(1) { --x: -100px; --y: 200px; }
	.animate-confetti:nth-child(2) { --x: 100px; --y: 180px; }
	.animate-confetti:nth-child(3) { --x: -80px; --y: 220px; }
	.animate-confetti:nth-child(4) { --x: 80px; --y: 190px; }
	.animate-confetti:nth-child(5) { --x: -120px; --y: 210px; }
	.animate-confetti:nth-child(6) { --x: 120px; --y: 200px; }
	.animate-confetti:nth-child(7) { --x: -60px; --y: 230px; }
	.animate-confetti:nth-child(8) { --x: 60px; --y: 170px; }
	.animate-confetti:nth-child(9) { --x: -140px; --y: 195px; }
	.animate-confetti:nth-child(10) { --x: 140px; --y: 215px; }
	.animate-confetti:nth-child(11) { --x: -90px; --y: 185px; }
	.animate-confetti:nth-child(12) { --x: 90px; --y: 225px; }
</style>
