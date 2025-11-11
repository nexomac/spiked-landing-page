<script>
	import { onMount } from 'svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	
	let isScrolled = $state(false);
	let mobileMenuOpen = $state(false);
	
	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};
		
		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
	
	function scrollToSection(id) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		mobileMenuOpen = false;
	}
</script>

<!-- Navbar -->
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-700 {isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-red-900/30 shadow-lg shadow-red-900/10' : 'bg-transparent'}">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
		<div class="flex items-center justify-between">
			<a href="/" class="group flex items-center gap-2 sm:gap-3 cursor-pointer">
				<div class="relative">
					<!-- Animated red glow -->
					<div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
					<!-- Logo container -->
					<div class="relative bg-gradient-to-br from-zinc-900 to-black p-1.5 sm:p-2 rounded-lg border border-red-900/50 group-hover:border-red-600 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-900/50">
						<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="h-5 w-5 sm:h-7 sm:w-7 rounded transform group-hover:rotate-6 transition-transform duration-500" />
					</div>
				</div>
				<div class="flex flex-col">
					<span class="text-base sm:text-xl font-black tracking-tight text-white group-hover:text-red-500 transition-colors duration-300">
						SPIKED<span class="text-red-600 group-hover:text-red-400 transition-colors">AI</span>
					</span>
					<span class="text-[8px] sm:text-[10px] text-zinc-500 font-medium tracking-wider uppercase -mt-0.5 group-hover:text-zinc-400 transition-colors">Revenue Growth OS</span>
				</div>
			</a>
			
			<div class="hidden md:flex items-center gap-1">
				<a href="/" class="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-zinc-400 hover:text-red-500 transition-all duration-300 hover:scale-105 relative group">
					Home
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
				</a>
				<a href="/features" class="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-zinc-400 hover:text-red-500 transition-all duration-300 hover:scale-105 relative group">
					Features
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
				</a>
				<a href="https://spikedai.vercel.app/" target="_blank" rel="noopener noreferrer" class="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-zinc-400 hover:text-red-500 transition-all duration-300 hover:scale-105 relative group">
					Platform
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
				</a>
				<a href="/contact-sales" class="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-zinc-400 hover:text-red-500 transition-all duration-300 hover:scale-105 relative group">
					Contact Sales
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
				</a>
				
				<div class="ml-2 lg:ml-4 flex items-center gap-2 lg:gap-3">
					<button class="px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold text-white hover:text-red-500 transition-all duration-300 hover:scale-105">
						Log In
					</button>
					<button 
						onclick={onboardingStore.start}
						class="group relative px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded font-semibold text-xs lg:text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 hover:scale-105 hover:-translate-y-0.5"
					>
						<span class="relative z-10">Get Started</span>
						<div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						<div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
					</button>
				</div>
			</div>

			<!-- Mobile Menu Button -->
			<button 
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
				class="md:hidden p-2 text-zinc-400 hover:text-red-500 transition-all duration-300 hover:scale-110 hover:rotate-90"
				aria-label="Toggle mobile menu"
			>
				<svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden mt-4 pb-4 space-y-2 border-t border-red-900/30 pt-4 animate-slide-down">
				<a href="/" class="block w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300 hover:translate-x-1">Home</a>
				<a href="/features" class="block w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300 hover:translate-x-1">Features</a>
				<a href="https://spikedai.vercel.app/" target="_blank" rel="noopener noreferrer" class="block w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300 hover:translate-x-1">Platform</a>
				<a href="/contact-sales" class="block w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300 hover:translate-x-1">Contact Sales</a>
				<div class="pt-2 space-y-2">
					<button class="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white hover:text-red-500 border border-zinc-800 rounded transition-all duration-300">
						Log In
					</button>
					<button 
						onclick={onboardingStore.start}
						class="block w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
					>
						Get Started
					</button>
				</div>
			</div>
		{/if}
	</div>
</nav>

<style>
	@keyframes slide-down {
		0% {
			opacity: 0;
			transform: translateY(-20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}

	.animate-slide-down {
		animation: slide-down 0.6s ease-out forwards;
	}

	.animate-shimmer {
		animation: shimmer 2s infinite;
	}
</style>
