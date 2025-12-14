<script>
	import { onMount } from 'svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { themeStore } from '$lib/stores/theme.js';
	import { Moon, Sun } from 'lucide-svelte';
	
	let isScrolled = $state(false);
	let mobileMenuOpen = $state(false);
	let theme = $state('dark');
	const isLight = $derived(theme === 'light');
	const themeLabel = $derived(isLight ? 'Switch to dark mode' : 'Switch to light mode');

	const navShellClass = $derived(
		isScrolled
			? isLight
				? 'bg-white/90 backdrop-blur-xl border-b border-red-100/60 shadow-lg shadow-red-100/40'
				: 'bg-black/90 backdrop-blur-xl border-b border-red-900/30 shadow-lg shadow-red-900/10'
			: isLight
				? 'bg-white/70 backdrop-blur-xl border-b border-red-100/40'
				: 'bg-transparent'
	);
	
	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};
		
		window.addEventListener('scroll', handleScroll);
		
		const unsubscribe = themeStore.subscribe((value) => {
			theme = value;
		});
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			unsubscribe();
		};
	});
	
	function scrollToSection(id) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		mobileMenuOpen = false;
	}

	function toggleTheme() {
		toggleMobileMenu(false);
		themeStore.toggle();
	}

	function toggleMobileMenu(force) {
		if (typeof force === 'boolean') {
			mobileMenuOpen = force;
			return;
		}
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<!-- Navbar -->
<nav class={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${navShellClass}`}>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
		<div class="flex items-center justify-between">
			<a href="/" class="group flex items-center gap-2 sm:gap-3 cursor-pointer">
				<div class="relative">
					<!-- Animated red glow -->
					<div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
					<!-- Logo container -->
					<div class={`relative bg-gradient-to-br ${isLight ? 'from-white to-slate-100 border-red-100' : 'from-zinc-900 to-black border-red-900/50'} p-1.5 sm:p-2 rounded-lg group-hover:border-red-600 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-900/50`}>
						<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="h-5 w-5 sm:h-7 sm:w-7 rounded transform group-hover:rotate-6 transition-transform duration-500" />
					</div>
				</div>
				<div class="flex flex-col">
					<span class={`text-base sm:text-xl font-black tracking-tight transition-colors duration-300 ${isLight ? 'text-slate-900' : 'text-white'} group-hover:text-red-500`}>
						SPIKED<span class="text-red-600 group-hover:text-red-400 transition-colors">AI</span>
					</span>
					<span class={`text-[8px] sm:text-[10px] font-medium tracking-wider uppercase -mt-0.5 transition-colors ${isLight ? 'text-slate-500 group-hover:text-slate-600' : 'text-zinc-500 group-hover:text-zinc-400'}`}>Revenue Growth OS</span>
				</div>
			</a>
			
			<div class="hidden md:flex items-center gap-1">
				<a href="/" class={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 hover:scale-105 relative group ${isLight ? 'text-slate-600 hover:text-red-600' : 'text-zinc-400 hover:text-red-500'}`}>
					Home
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
				</a>
				<a href="/features" class={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 hover:scale-105 relative group ${isLight ? 'text-slate-600 hover:text-red-600' : 'text-zinc-400 hover:text-red-500'}`}>
					Features
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
				</a>
				<a href="https://spikedai.vercel.app/" target="_blank" rel="noopener noreferrer" class={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 hover:scale-105 relative group ${isLight ? 'text-slate-600 hover:text-red-600' : 'text-zinc-400 hover:text-red-500'}`}>
					Platform
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
				</a>
				<a href="/contact-sales" class={`px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-all duration-300 hover:scale-105 relative group ${isLight ? 'text-slate-600 hover:text-red-600' : 'text-zinc-400 hover:text-red-500'}`}>
					Contact Sales
					<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
				</a>
				
				<div class="ml-2 lg:ml-4 flex items-center gap-2 lg:gap-3">
					<button
						onclick={toggleTheme}
						class={`flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold rounded-lg border transition-all duration-300 hover:scale-105 ${isLight ? 'border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-200 bg-white/70' : 'border-zinc-800 text-white hover:text-red-500 bg-black/30'}`}
						aria-label={themeLabel}
						title={themeLabel}
					>
						{#if isLight}
							<Moon class="w-4 h-4" />
							<span>Dark</span>
						{:else}
							<Sun class="w-4 h-4" />
							<span>Light</span>
						{/if}
					</button>
					<button class={`px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold transition-all duration-300 hover:scale-105 ${isLight ? 'text-slate-700 hover:text-red-600' : 'text-white hover:text-red-500'}`}>
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
				onclick={() => toggleMobileMenu()}
				class={`md:hidden p-2 transition-all duration-300 hover:scale-110 hover:rotate-90 ${isLight ? 'text-slate-700 hover:text-red-600' : 'text-zinc-400 hover:text-red-500'}`}
				aria-label="Toggle mobile menu"
			>
				<svg class="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class={`md:hidden mt-4 pb-4 space-y-2 pt-4 animate-slide-down rounded-xl border ${isLight ? 'border-red-100 bg-white/95 shadow-lg shadow-red-100/40' : 'border-red-900/30 bg-black/80 backdrop-blur-xl'}`}>
				<a href="/" class={`block w-full text-left px-4 py-2.5 text-sm rounded transition-all duration-300 hover:translate-x-1 ${isLight ? 'text-slate-700 hover:text-red-600 hover:bg-red-50' : 'text-zinc-400 hover:text-red-500 hover:bg-red-950/30'}`}>Home</a>
				<a href="/features" class={`block w-full text-left px-4 py-2.5 text-sm rounded transition-all duration-300 hover:translate-x-1 ${isLight ? 'text-slate-700 hover:text-red-600 hover:bg-red-50' : 'text-zinc-400 hover:text-red-500 hover:bg-red-950/30'}`}>Features</a>
				<a href="https://spikedai.vercel.app/" target="_blank" rel="noopener noreferrer" class={`block w-full text-left px-4 py-2.5 text-sm rounded transition-all duration-300 hover:translate-x-1 ${isLight ? 'text-slate-700 hover:text-red-600 hover:bg-red-50' : 'text-zinc-400 hover:text-red-500 hover:bg-red-950/30'}`}>Platform</a>
				<a href="/contact-sales" class={`block w-full text-left px-4 py-2.5 text-sm rounded transition-all duration-300 hover:translate-x-1 ${isLight ? 'text-slate-700 hover:text-red-600 hover:bg-red-50' : 'text-zinc-400 hover:text-red-500 hover:bg-red-950/30'}`}>Contact Sales</a>
				<div class="pt-2 space-y-2">
					<button
						onclick={toggleTheme}
						class={`flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded border transition-all duration-300 ${isLight ? 'text-slate-700 border-slate-200 bg-white hover:text-red-600 hover:border-red-200' : 'text-white border-zinc-800 bg-black/40 hover:text-red-500'}`}
					>
						{#if isLight}
							<Moon class="w-4 h-4" />
							Dark mode
						{:else}
							<Sun class="w-4 h-4" />
							Light mode
						{/if}
					</button>
					<button class={`block w-full text-center px-4 py-2.5 text-sm font-semibold rounded transition-all duration-300 ${isLight ? 'text-slate-700 border border-slate-200 hover:text-red-600 hover:border-red-200 bg-white' : 'text-white hover:text-red-500 border border-zinc-800'}`}>
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

	/* Light mode navigation */
	:global([data-theme='light']) :global(nav) {
		background: rgba(255, 255, 255, 0.92) !important;
		backdrop-filter: blur(12px);
		border-color: rgba(226, 232, 240, 0.8) !important;
		box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
	}

	:global([data-theme='light']) :global(nav) :global(.text-white),
	:global([data-theme='light']) :global(nav) :global(a) {
		color: #0f172a !important;
	}

	:global([data-theme='light']) :global(nav) :global(a:hover) {
		color: #dc2626 !important;
	}

	:global([data-theme='light']) :global(nav) :global(.bg-gradient-to-r) {
		background: linear-gradient(90deg, #ef4444, #f97316) !important;
	}

	:global([data-theme='light']) :global(nav) :global(.border-zinc-800) {
		border-color: #e2e8f0 !important;
		background: #ffffff !important;
		color: #0f172a !important;
	}

	:global([data-theme='light']) :global(nav) :global(.border-zinc-800:hover) {
		border-color: #dc2626 !important;
	}
</style>
