<script>
	import { onboardingStore } from '$lib/stores/onboarding.js';
	
	let name = $state('');
	let email = $state('');
	let company = $state('');
	
	function handleNext() {
		if (name && email) {
			onboardingStore.updateUserData({ name, email, company });
			onboardingStore.nextStep();
		}
	}
</script>

<div class="max-w-2xl mx-auto text-center">
	<!-- Welcome Animation -->
	<div class="mb-8">
		<div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl mb-6 animate-bounce-subtle">
			<svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
			</svg>
		</div>
	</div>
	
	<h1 class="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
		Welcome to <span class="text-red-500">SpikedAI</span>
	</h1>
	<p class="text-xl text-zinc-400 mb-12 max-w-xl mx-auto">
		Let's personalize your experience. This will only take 2 minutes.
	</p>
	
	<!-- Form -->
	<div class="space-y-4 text-left">
		<div>
			<label for="name" class="block text-sm font-semibold text-zinc-300 mb-2">
				Your Name <span class="text-red-500">*</span>
			</label>
			<input
				id="name"
				type="text"
				bind:value={name}
				placeholder="John Doe"
				class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
			/>
		</div>
		
		<div>
			<label for="email" class="block text-sm font-semibold text-zinc-300 mb-2">
				Work Email <span class="text-red-500">*</span>
			</label>
			<input
				id="email"
				type="email"
				bind:value={email}
				placeholder="john@company.com"
				class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
			/>
		</div>
		
		<div>
			<label for="company" class="block text-sm font-semibold text-zinc-300 mb-2">
				Company Name <span class="text-zinc-600">(optional)</span>
			</label>
			<input
				id="company"
				type="text"
				bind:value={company}
				placeholder="Acme Inc."
				class="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 outline-none transition-all"
			/>
		</div>
	</div>
	
	<button
		onclick={handleNext}
		disabled={!name || !email}
		class="group mt-8 w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-600/50 transition-all duration-300"
	>
		<span class="flex items-center justify-center gap-2">
			Continue
			<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
			</svg>
		</span>
	</button>
</div>

<style>
	@keyframes bounce-subtle {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}
	
	.animate-bounce-subtle {
		animation: bounce-subtle 2s infinite ease-in-out;
	}
</style>
