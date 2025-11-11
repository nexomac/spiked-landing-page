<script>
	import { onMount } from 'svelte';
	import FeaturesShowcase from '$lib/components/FeaturesShowcase.svelte';
	import OnboardingFlow from '$lib/components/OnboardingFlow.svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { innerWidth } from 'svelte/reactivity/window';
	
	let isDark = $state(true); // Default to dark theme
	let isScrolled = $state(false);
	let mobileMenuOpen = $state(false);
	let activeTab = $state('simulator');
	let activeFeatureTab = $state('transcription');
	let transcriptIndex = $state(0);
	let sentimentScore = $state(0);
	let buyingSignals = $state(0);
	let autoAnswerMode = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let scrollY = $state(0);
	
	// Reactive breakpoints using Svelte 5 $derived
	let isMobile = $derived(innerWidth.current ? innerWidth.current < 768 : false);
	let isTablet = $derived(innerWidth.current ? innerWidth.current >= 768 && innerWidth.current < 1024 : false);
	let isDesktop = $derived(innerWidth.current ? innerWidth.current >= 1024 : true);
	
	let visibleSections = $state({
		hero: false,
		products: false,
		features: false,
		demo: false,
		testimonials: false,
		cta: false
	});

	// Sample transcript data for demo
	const transcriptMessages = [
		{ speaker: 'Client', text: 'How does your platform handle real-time data?', time: '0:23', sentiment: 'curious' },
		{ speaker: 'You', text: 'Great question! Our platform uses Server-Sent Events for instant streaming...', time: '0:25', sentiment: 'confident' },
		{ speaker: 'Client', text: 'That sounds impressive. What about pricing?', time: '0:42', sentiment: 'interested' },
		{ speaker: 'You', text: 'We have flexible plans starting at $49/month...', time: '0:44', sentiment: 'positive' }
	];

	onMount(() => {
		// Force dark theme
		document.documentElement.classList.add('dark');

		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
			scrollY = window.scrollY;
		};

		const handleMouseMove = (e) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						visibleSections[entry.target.dataset.section] = true;
					}
				});
			},
			{ threshold: 0.1 }
		);

		document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
		window.addEventListener('scroll', handleScroll);
		window.addEventListener('mousemove', handleMouseMove);

		// Trigger hero animation immediately
		visibleSections.hero = true;

		// Animated counter for demo
		const sentimentInterval = setInterval(() => {
			sentimentScore = Math.min(sentimentScore + 1, 87);
			buyingSignals = Math.min(buyingSignals + 1, 12);
		}, 100);

		// Transcript cycling
		const transcriptInterval = setInterval(() => {
			transcriptIndex = (transcriptIndex + 1) % transcriptMessages.length;
		}, 3000);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('mousemove', handleMouseMove);
			observer.disconnect();
			clearInterval(sentimentInterval);
			clearInterval(transcriptInterval);
		};
	});

	function toggleTheme() {
		// Theme locked to dark mode
		return;
	}

	function scrollToSection(id) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
		mobileMenuOpen = false;
	}
</script>

<!-- Navbar -->
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-700 {isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-red-900/30 shadow-lg shadow-red-900/10' : 'bg-transparent'}">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
		<div class="flex items-center justify-between">
			<div class="group flex items-center gap-2 sm:gap-3 cursor-pointer">
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
			</div>
			
		<div class="hidden md:flex items-center gap-1">
			<button onclick={() => scrollToSection('products')} class="px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-zinc-400 hover:text-red-500 transition-all duration-300 hover:scale-105 relative group">
				Products
				<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
			</button>
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
						onclick={() => onboardingStore.start()}
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
			<button onclick={() => scrollToSection('products')} class="block w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300 hover:translate-x-1">Products</button>
			<a href="/features" class="block w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300 hover:translate-x-1">Features</a>
			<a href="https://spikedai.vercel.app/" target="_blank" rel="noopener noreferrer" class="block w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300 hover:translate-x-1">Platform</a>
			<a href="/contact-sales" class="block w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300 hover:translate-x-1">Contact Sales</a>
			<div class="pt-2 space-y-2">
				<button class="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white hover:text-red-500 border border-zinc-800 rounded transition-all duration-300">
					Log In
				</button>
				<button 
					onclick={() => onboardingStore.start()}
					class="block w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
				>
					Get Started
				</button>
			</div>
		</div>
	{/if}
	</div>
</nav>

<!-- Hero Section -->
<section 
	data-section="hero" 
	class="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
>
	<!-- Enhanced Animated Grid Background with Parallax -->
	<div class="absolute inset-0" style="transform: translateY({scrollY * 0.5}px);">
		<div class="absolute inset-0 bg-gradient-to-b from-red-950/30 via-black via-50% to-black"></div>
		<div class="absolute inset-0 animate-grid-pulse" style="background-image: linear-gradient(rgba(220, 38, 38, 0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(220, 38, 38, 0.08) 1.5px, transparent 1.5px); background-size: 60px 60px;"></div>
		
		<!-- Enhanced Animated Red Orbs with Mouse Interaction -->
		<div 
			class="absolute w-[600px] h-[600px] bg-red-600/25 rounded-full blur-3xl animate-float transition-transform duration-1000"
			style="top: 15%; left: 20%; transform: translate({mouseX * 0.03}px, {mouseY * 0.03}px);"
		></div>
		<div 
			class="absolute w-[500px] h-[500px] bg-red-800/15 rounded-full blur-3xl animate-float-delayed transition-transform duration-1000"
			style="bottom: 15%; right: 20%; transform: translate({-mouseX * 0.02}px, {-mouseY * 0.02}px);"
		></div>
		
		<!-- Additional floating orbs with better positioning -->
		<div class="absolute top-1/3 left-1/4 w-80 h-80 bg-red-500/15 rounded-full blur-3xl animate-float" style="animation-delay: 2s;"></div>
		<div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-700/20 rounded-full blur-3xl animate-float-delayed" style="animation-delay: 1s;"></div>
		
		<!-- Multiple Scanning Line Effects -->
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-30 animate-scan"></div>
			<div class="absolute h-px w-full bg-gradient-to-r from-transparent via-red-400/20 to-transparent opacity-20 animate-scan" style="animation-delay: 3s; animation-duration: 10s;"></div>
		</div>
		
		<!-- Enhanced Particle grid -->
		<div class="absolute inset-0">
			{#each Array(30) as _, i}
				<div 
					class="absolute w-1.5 h-1.5 bg-red-500/40 rounded-full animate-particle-float"
					style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 5}s; animation-duration: {8 + Math.random() * 4}s;"
				></div>
			{/each}
		</div>
		
		<!-- Radial gradient spotlight -->
		<div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-32">
		<div class="transform transition-all duration-1000 {visibleSections.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<!-- Enhanced Status Badge with better visual hierarchy -->
			<div class="inline-flex flex-col gap-2 sm:gap-3 mb-8 sm:mb-10 animate-slide-down">
				<div class="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-zinc-950/90 backdrop-blur-xl rounded-full border border-red-900/50 group hover:border-red-600/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/30">
					<div class="relative flex items-center gap-1.5 sm:gap-2.5">
						<div class="relative">
							<div class="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-pulse"></div>
							<div class="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-ping"></div>
						</div>
						<span class="text-sm sm:text-base md:text-lg font-extrabold text-zinc-300 tracking-wider sm:tracking-widest uppercase leading-tight">Revenue AI Agents built for the Fortune 2000</span>
					</div>
				</div>
				<div class="px-4 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-red-950/30 via-red-950/20 to-red-950/30 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-red-900/30 hover:border-red-800/50 transition-all duration-500 hover:shadow-lg hover:shadow-red-900/20">
					<span class="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-red-400 tracking-wide leading-relaxed block">Combining conversational, computational, and contextual intelligence to drive reasoning, speed, and measurable ROI</span>
				</div>
			</div>

			<!-- Enhanced Headline with better spacing and effects -->
			<div class="mb-6 sm:mb-8 md:mb-10">
				<h1 class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-black leading-[0.9] tracking-tighter animate-fade-in-up">
					<span class="inline-block text-white mb-2 hover:scale-[1.02] transition-transform duration-300">Sell Like</span>
					<span class="inline-block bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent hover:scale-[1.02] transition-transform duration-300 animate-gradient bg-[length:200%_auto]">
						a CEO
					</span>
				</h1>
			</div>
			
			<!-- Enhanced Description with better typography -->
			<p class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-zinc-400 mb-10 sm:mb-12 md:mb-14 max-w-4xl leading-[1.6] font-light animate-fade-in-up px-2 sm:px-0" style="animation-delay: 0.2s;">
				AI-Powered Revenue Generation Platform, <span class="text-red-400 font-semibold hover:text-red-300 transition-colors">Human and AI Revenue Agents, built to reason, act, and close.</span> <span class="text-white font-medium">Together, they transform every conversation into measurable growth.</span>
			</p>
			
			<!-- Enhanced CTA Buttons -->
			<div class="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-16 sm:mb-20 animate-fade-in-up px-2 sm:px-0" style="animation-delay: 0.4s;">
				<button 
					onclick={() => onboardingStore.start()}
					class="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-base sm:text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/60 hover:scale-[1.05] hover:-translate-y-1"
				>
					<span class="relative z-10 flex items-center justify-center gap-2">
						Start Now, Skip Demos
						<svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
					</span>
					<div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					<div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
					<div class="absolute inset-0 rounded-xl ring-2 ring-red-500/0 group-hover:ring-red-500/50 transition-all duration-300"></div>
				</button>
				<a href="/contact-sales" class="px-8 sm:px-10 py-4 sm:py-5 bg-zinc-950/50 backdrop-blur-sm text-white rounded-xl font-semibold text-base sm:text-lg border-2 border-zinc-800 hover:border-red-600 hover:bg-red-950/30 transition-all duration-300 text-center hover:scale-[1.05] hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/30">
					Contact Sales
				</a>
			</div>

			<!-- Enhanced Feature Metrics Bar with better design -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl px-2 sm:px-0">
				{#each [
					{ 
						metric: '100%', 
						label: 'Every meeting is captured 100%',
						icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
					},
					{ 
						metric: 'Real-Time', 
						label: 'AI Assistance in Real Time',
						icon: 'M13 10V3L4 14h7v7l9-11h-7z'
					},
					{ 
						metric: 'Auto', 
						label: 'FOLLOW-UP & PLANNING',
						icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
					}
				] as feature, i}
					<div 
						class="group relative bg-gradient-to-br from-zinc-950/80 to-zinc-950/50 backdrop-blur-xl p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl border-2 border-zinc-900 hover:border-red-900/60 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/30 animate-fade-in-up cursor-pointer"
						style="animation-delay: {0.6 + i * 0.1}s; transform: translate3d(0, 0, 0);"
					>
						<div class="absolute inset-0 bg-gradient-to-br from-red-950/0 via-red-950/10 to-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
						<div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/15 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
						<div class="relative">
							<div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
								<div class="p-2 sm:p-3 bg-gradient-to-br from-red-950/50 to-red-950/30 rounded-lg sm:rounded-xl border border-red-900/40 group-hover:border-red-600/60 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-red-900/20">
									<svg class="w-5 h-5 sm:w-6 sm:h-6 text-red-500 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d={feature.icon} />
									</svg>
								</div>
								<span class="text-3xl sm:text-4xl font-black text-white group-hover:text-red-400 transition-colors duration-300">{feature.metric}</span>
							</div>
							<p class="text-xs sm:text-sm text-zinc-500 font-bold tracking-wider uppercase group-hover:text-zinc-300 transition-colors leading-relaxed">{feature.label}</p>
						</div>
						<!-- Corner accent -->
						<div class="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600/0 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Enhanced Scroll Indicator -->
	<div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
		<div class="w-7 h-12 border-2 border-zinc-800 rounded-full flex items-start justify-center p-2 hover:border-red-500 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-red-900/30">
			<div class="w-1.5 h-3 bg-red-500 rounded-full animate-scroll-indicator group-hover:bg-red-400 shadow-lg shadow-red-500/50"></div>
		</div>
		<p class="text-xs text-zinc-600 text-center mt-2 font-medium">Scroll to explore</p>
	</div>
</section>

<!-- Products Section -->
<section id="products" data-section="products" class="py-32 bg-black relative overflow-hidden">
	<!-- Background Grid -->
	<div class="absolute inset-0" style="background-image: linear-gradient(rgba(220, 38, 38, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.03) 1px, transparent 1px); background-size: 40px 40px;"></div>
	
	<div class="max-w-7xl mx-auto px-6 relative z-10">
		<div class="text-center mb-20 transform transition-all duration-1000 {visibleSections.products ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<div class="inline-block mb-6">
				<span class="text-sm font-bold text-red-500 tracking-widest uppercase">Core Platform Features</span>
			</div>
			<h2 class="text-6xl md:text-7xl font-black mb-6 text-white leading-none tracking-tighter">
				AI-Powered<br />
				<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
					Revenue Generation Platform
				</span>
			</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
				Built to support revenue teams from the first conversation to the final follow-up. It combines real-time intelligence, automated meeting assistance, and CRM-ready insights into one platform so sellers don’t just talk,  they convert.
			</p>
		</div>

		<!-- Agent Workflow Cards with Diagonal Layout -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each [
				{ 
					id: 'simulator',
					label: 'CALL SIMULATOR', 
					title: 'Call AI Sales Simulator',
					description: 'AI role-play to practice sales plays, objection handling, and selling methodologies.',
					icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
				},
				{ 
					id: 'knowledge',
					label: 'KNOWLEDGE AGENT', 
					title: 'Knowledge Agent – Real-Time Answers',
					description: 'AI gives instant answers during live calls from you\'re A to Z knowledge base.',
					icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
				},
				{ 
					id: 'meeting',
					label: 'MEETING AI', 
					title: 'Meeting AI – Conversational Notetaker',
					description: 'Auto-transcription, key takeaways, action items extraction, and CRM sync.',
					icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
				},
				{ 
					id: 'followup',
					label: 'FOLLOW-UP PLANNER', 
					title: 'Follow-Up AI – Smart Task Automation',
					description: 'Real time follow-up, and task assignments so nothing gets missed.',
					icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
				}
			] as workflow, i}
				<button
					type="button"
					onclick={() => activeTab = workflow.id}
					class="group relative bg-zinc-950 border border-zinc-900 hover:border-red-900/50 rounded-lg p-6 cursor-pointer transition-all duration-500 transform hover:-translate-y-1 hover:shadow-lg {activeTab === workflow.id ? 'border-red-600 bg-gradient-to-br from-red-950/20 to-zinc-950 shadow-xl shadow-red-900/20' : ''} text-left w-full animate-fade-in-up hover:shadow-2xl hover:shadow-red-900/30"
					style="animation-delay: {i * 0.1}s; transform: translate3d(0, 0, 0);"
					aria-pressed={activeTab === workflow.id}
					aria-label={workflow.title}
				>
					<div class="absolute inset-0 bg-gradient-to-br from-red-950/0 to-red-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
					<div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-lg"></div>
					
					<div class="relative">
						<div class="flex items-start justify-between mb-4">
							<div class="p-3 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-red-900/50 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
								<svg class="w-6 h-6 {activeTab === workflow.id ? 'text-red-500' : 'text-zinc-600'} group-hover:text-red-500 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={workflow.icon} />
								</svg>
							</div>
							<span class="text-xs font-bold {activeTab === workflow.id ? 'text-red-500' : 'text-zinc-600'} tracking-wider uppercase group-hover:text-red-400 transition-colors">{workflow.label}</span>
						</div>
						
						<h3 class="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">{workflow.title}</h3>
						<p class="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">{workflow.description}</p>
						
						{#if activeTab === workflow.id}
							<div class="mt-4 pt-4 border-t border-red-900/30 animate-fade-in">
								<span class="text-xs font-semibold text-red-500 hover:text-red-400 flex items-center gap-1 group/btn cursor-pointer">
									Watch Demo
									<svg class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
									</svg>
								</span>
							</div>
						{/if}
					</div>
				</button>
			{/each}
		</div>

		<!-- Additional Agent Types -->
		<div class="mt-16 grid md:grid-cols-3 gap-6">
			{#each [
				{
					label: 'CRM Integration',
					title: 'Salesforce • HubSpot • Pipedrive',
					icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
				},
				{
					label: 'Project Management',
					title: 'Jira • Asana • Monday.com',
					icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
				},
				{
					label: 'Communication',
					title: 'Slack • Teams • Zoom',
					icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
				}
			] as agent, i}
				<div 
					class="group relative bg-zinc-950/50 border border-zinc-900 hover:border-red-900/30 rounded-lg p-6 transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/20 animate-fade-in-up cursor-pointer"
					style="animation-delay: {0.5 + i * 0.1}s; transform: translate3d(0, 0, 0);"
				>
					<div class="absolute inset-0 bg-gradient-to-br from-red-950/0 to-red-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					<div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
					
					<div class="relative flex items-center gap-4">
						<div class="p-2 bg-zinc-900 rounded border border-zinc-800 group-hover:border-red-900/50 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
							<svg class="w-5 h-5 text-zinc-600 group-hover:text-red-500 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={agent.icon} />
							</svg>
						</div>
						<div class="flex-1">
							<div class="text-xs font-bold text-zinc-600 tracking-wider uppercase mb-1 group-hover:text-zinc-500 transition-colors">{agent.label}</div>
							<div class="text-sm font-semibold text-white group-hover:text-red-500 transition-colors duration-300">{agent.title}</div>
						</div>
						<svg class="w-5 h-5 text-zinc-800 group-hover:text-red-500 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Features Showcase Section with Tabs -->
<FeaturesShowcase />

<!-- Testimonials Section with Marquee -->
<section id="testimonials" data-section="testimonials" class="py-32 bg-zinc-950 relative overflow-hidden border-y border-red-900/20">
	<div class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>
	
	<!-- Animated background particles -->
	<div class="absolute inset-0 overflow-hidden">
		{#each Array(15) as _, i}
			<div 
				class="absolute w-1 h-1 bg-red-500/20 rounded-full animate-particle-float"
				style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 5}s; animation-duration: {10 + Math.random() * 5}s;"
			></div>
		{/each}
	</div>
	
	<div class="text-center mb-16 transform transition-all duration-1000 {visibleSections.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative z-20">
		<span class="text-sm font-bold text-red-500 tracking-widest uppercase animate-fade-in-up">Trusted by Sales Leaders</span>
		<h2 class="text-5xl md:text-6xl font-black mt-4 mb-6 text-white tracking-tight animate-fade-in-up" style="animation-delay: 0.1s;">
			AI That Empowers<br />
			<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Sales & Dev Teams</span>
		</h2>
	</div>

	<!-- Testimonial Marquee -->
	<div class="relative">
		<div class="flex gap-6 animate-marquee hover:pause">
			{#each [
				{
					quote: "The real-time knowledge agent gives me instant answers during calls. No more fumbling through docs mid-pitch.",
					author: "Alex Rivera",
					role: "Senior Sales Engineer",
					metric: "5x",
					metricLabel: "Faster Responses"
				},
				{
					quote: "Call simulator helped our team practice objection handling. We're closing 40% more deals since implementation.",
					author: "Sarah Thompson",
					role: "Sales Director",
					metric: "40%",
					metricLabel: "More Deals Closed"
				},
				{
					quote: "Automatic FOLLOW-UP & PLANNING saves hours every week. CRM integration means zero manual data entry.",
					author: "Michael Chen",
					role: "Account Executive",
					metric: "15hrs",
					metricLabel: "Saved Weekly"
				},
				{
					quote: "The real-time knowledge agent gives me instant answers during calls. No more fumbling through docs mid-pitch.",
					author: "Alex Rivera",
					role: "Senior Sales Engineer",
					metric: "5x",
					metricLabel: "Faster Responses"
				},
				{
					quote: "Call simulator helped our team practice objection handling. We're closing 40% more deals since implementation.",
					author: "Sarah Thompson",
					role: "Sales Director",
					metric: "40%",
					metricLabel: "More Deals Closed"
				}
			] as testimonial, i}
				<div class="flex-shrink-0 w-96 bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-red-900/50 transition-all duration-500 group hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/20 cursor-pointer" style="transform: translate3d(0, 0, 0);">
					<div class="absolute inset-0 bg-gradient-to-br from-red-950/0 to-red-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
					<div class="flex items-start gap-4 mb-4 relative">
						<div class="flex-shrink-0">
							<div class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300 relative">
								{testimonial.author[0]}
								<div class="absolute inset-0 bg-red-500 rounded-full opacity-0 group-hover:opacity-20 animate-ping"></div>
							</div>
						</div>
						<div class="flex-1">
							<p class="font-bold text-white text-sm group-hover:text-red-400 transition-colors">{testimonial.author}</p>
							<p class="text-xs text-zinc-500">{testimonial.role}</p>
						</div>
						<div class="text-right">
							<div class="text-2xl font-black text-red-500 group-hover:scale-110 transition-transform duration-300">{testimonial.metric}</div>
							<div class="text-[10px] text-zinc-600 uppercase tracking-wider">{testimonial.metricLabel}</div>
						</div>
					</div>
					<p class="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors relative">{testimonial.quote}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Enterprise Ready Badge -->
	<div class="mt-20 max-w-7xl mx-auto px-6 relative z-20">
			<div class="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-red-900/30 rounded-lg p-8 hover:border-red-900/50 transition-all duration-500 hover:shadow-lg hover:shadow-red-900/20 group" style="transform: translate3d(0, 0, 0);">
				<div class="absolute inset-0 bg-gradient-to-br from-red-950/0 to-red-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
			<div class="text-center mb-8 relative">
				<h3 class="text-2xl font-black text-white mb-2 group-hover:text-red-500 transition-colors">Built for Sales & Dev Teams</h3>
				<p class="text-zinc-500 group-hover:text-zinc-400 transition-colors">Powerful conversational AI that integrates with your entire workflow</p>
			</div>
			<div class="grid md:grid-cols-3 gap-8 relative">
				{#each [
					{
						number: '01',
						title: 'Universal Integrations',
						description: 'Connects with Salesforce, HubSpot, Jira, Asana, Slack, Teams & more'
					},
					{
						number: '02',
						title: 'Real-Time Intelligence',
						description: 'AI-powered insights during every sales conversation'
					},
					{
						number: '03',
						title: 'Auto Follow-Up & Tracking',
						description: 'Never miss a task with intelligent automation and CRM sync'
					}
				] as feature, i}
					<div class="group/item relative animate-fade-in-up" style="animation-delay: {i * 0.1}s;">
						<div class="absolute -top-4 left-0 text-6xl font-black text-red-950 opacity-50 group-hover/item:opacity-100 group-hover/item:text-red-900 transition-all duration-500 group-hover/item:scale-110">
							{feature.number}
						</div>
						<div class="relative pt-8">
							<h4 class="text-lg font-bold text-white mb-2 group-hover/item:text-red-500 transition-colors">{feature.title}</h4>
							<p class="text-sm text-zinc-500 group-hover/item:text-zinc-400 transition-colors">{feature.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section data-section="cta" class="py-32 bg-gradient-to-br from-red-950 via-black to-black relative overflow-hidden border-t border-red-900/20">
	<!-- Animated Background -->
	<div class="absolute inset-0">
		<div class="absolute inset-0 animate-grid-pulse" style="background-image: linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px); background-size: 50px 50px;"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
		<div class="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-2xl animate-float"></div>
		<div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-700/5 rounded-full blur-3xl animate-float-delayed"></div>
		
		<!-- Particle effects -->
		{#each Array(25) as _, i}
			<div 
				class="absolute w-1 h-1 bg-red-500/20 rounded-full animate-particle-float"
				style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 5}s; animation-duration: {12 + Math.random() * 6}s;"
			></div>
		{/each}
	</div>
	
	<div class="relative z-10 max-w-4xl mx-auto px-6 text-center transform transition-all duration-1000 {visibleSections.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
		<h2 class="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none animate-fade-in-up">
			Empower Your Sales Team<br />
			<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent animate-gradient">
				With AI Intelligence
			</span>
		</h2>
		<p class="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light animate-fade-in-up" style="animation-delay: 0.2s;">
			Join sales teams accelerating revenue with conversational AI. Real-time insights, automated follow-ups, and seamless integrations.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style="animation-delay: 0.4s;">
			<button 
				onclick={() => onboardingStore.start()}
				class="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded font-bold text-lg hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-1"
			>
				<span class="relative z-10 flex items-center justify-center gap-2">
					Start Free Trial
					<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</span>
				<div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
			</button>
			<a href="/contact-sales" class="px-8 py-4 bg-transparent text-white rounded font-semibold text-lg border border-zinc-800 hover:border-red-600 hover:bg-red-950/20 transition-all duration-300 text-center hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20">
				Contact Sales
			</a>
		</div>
		<p class="mt-6 text-zinc-600 text-sm animate-fade-in-up" style="animation-delay: 0.6s;">Free forever plan • No credit card required • Quick setup</p>
	</div>
</section>

<!-- Footer -->
<footer class="bg-black text-white py-16 border-t border-zinc-900 relative overflow-hidden">
	<!-- Subtle background animation -->
	<div class="absolute inset-0 opacity-30">
		<div class="absolute inset-0" style="background-image: linear-gradient(rgba(220, 38, 38, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.02) 1px, transparent 1px); background-size: 30px 30px;"></div>
	</div>
	
	<div class="max-w-7xl mx-auto px-6 relative z-10">
		<div class="grid md:grid-cols-5 gap-12 mb-12">
			<div class="md:col-span-2">
				<div class="flex items-center gap-3 mb-4 group cursor-pointer">
					<div class="relative">
						<div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
						<div class="relative bg-gradient-to-br from-zinc-900 to-black p-1.5 rounded-lg border border-red-900/50 group-hover:border-red-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
							<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="h-6 w-6 rounded" />
						</div>
					</div>
					<span class="text-xl font-black tracking-tight group-hover:text-red-500 transition-colors duration-300">
						SPIKED<span class="text-red-600 group-hover:text-red-400 transition-colors">AI</span>
					</span>
				</div>
				<p class="text-zinc-500 text-sm mb-6 max-w-xs hover:text-zinc-400 transition-colors">
					Conversational AI for Sales Teams. Empower your team with real-time intelligence and automated workflows.
				</p>
				<div class="flex gap-4">
					<a
						href="https://www.linkedin.com/company/spiked-ai"
						target="_blank"
						rel="noopener noreferrer"
						class="p-2 bg-zinc-900 hover:bg-red-950 border border-zinc-800 hover:border-red-900/50 rounded transition-all duration-300 group hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/30"
						aria-label="Follow us on LinkedIn"
					>
						<svg class="w-4 h-4 fill-zinc-600 group-hover:fill-red-500 transition-colors" viewBox="0 0 24 24">
							<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
						</svg>
					</a>
				</div>
			</div>
			
			<div class="group">
				<h4 class="font-bold text-white mb-4 text-sm tracking-wider uppercase group-hover:text-red-500 transition-colors">Features</h4>
				<ul class="space-y-2 text-zinc-500 text-sm">
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Call Simulator</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Knowledge Agent</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Meeting AI</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Follow-Up Planner</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">CRM Integrations</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Analytics</button></li>
				</ul>
			</div>
			
			<div class="group">
				<h4 class="font-bold text-white mb-4 text-sm tracking-wider uppercase group-hover:text-red-500 transition-colors">Integrations</h4>
				<ul class="space-y-2 text-zinc-500 text-sm">
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Salesforce</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">HubSpot</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Jira</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Asana</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Slack</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Teams</button></li>
				</ul>
			</div>
			
			<div class="group">
				<h4 class="font-bold text-white mb-4 text-sm tracking-wider uppercase group-hover:text-red-500 transition-colors">Company</h4>
				<ul class="space-y-2 text-zinc-500 text-sm">
					<li><button onclick={() => scrollToSection('pricing')} class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Pricing</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Customers</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Security</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Docs</button></li>
					<li><button class="hover:text-red-500 transition-all duration-300 hover:translate-x-1 inline-block">Contact</button></li>
				</ul>
			</div>
		</div>
		
		<div class="border-t border-zinc-900 pt-8">
			<div class="flex flex-col md:flex-row justify-between items-center gap-4">
				<div class="text-center md:text-left text-zinc-600 text-sm hover:text-zinc-500 transition-colors">
					© 2025 SpikedAI. All rights reserved. <span class="hidden md:inline">• 251 Rhode Island St, Suite 205, San Francisco, CA 94103</span>
				</div>
				<div class="flex gap-6 text-xs text-zinc-600">
					<button class="hover:text-red-500 transition-all duration-300 hover:scale-105">Privacy Policy</button>
					<button class="hover:text-red-500 transition-all duration-300 hover:scale-105">Terms of Service</button>
					<button class="hover:text-red-500 transition-all duration-300 hover:scale-105">Status</button>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	@keyframes float {
		0%, 100% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(30px, -30px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	@keyframes float-delayed {
		0%, 100% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(-30px, 30px) scale(1.1);
		}
		66% {
			transform: translate(20px, -20px) scale(0.9);
		}
	}

	@keyframes scan {
		0% {
			transform: translateY(-100vh);
		}
		100% {
			transform: translateY(100vh);
		}
	}

	@keyframes pulse-glow {
		0%, 100% {
			box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
		}
		50% {
			box-shadow: 0 0 40px rgba(220, 38, 38, 0.6);
		}
	}

	@keyframes marquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	@keyframes fade-in-up {
		0% {
			opacity: 0;
			transform: translateY(30px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

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

	@keyframes gradient {
		0%, 100% {
			background-position: 0% 50%;
		}
		50% {
			background-position: 100% 50%;
		}
	}

	@keyframes bounce-slow {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	@keyframes scroll-indicator {
		0%, 100% {
			transform: translateY(0);
			opacity: 1;
		}
		50% {
			transform: translateY(8px);
			opacity: 0.5;
		}
	}

	@keyframes particle-float {
		0%, 100% {
			transform: translate(0, 0);
			opacity: 0;
		}
		10% {
			opacity: 0.3;
		}
		50% {
			transform: translate(calc(var(--tx, 0) * 50px), calc(var(--ty, 0) * -100px));
			opacity: 0.8;
		}
		90% {
			opacity: 0.3;
		}
		100% {
			transform: translate(calc(var(--tx, 0) * 100px), calc(var(--ty, 0) * -200px));
			opacity: 0;
		}
	}

	@keyframes grid-pulse {
		0%, 100% {
			opacity: 0.3;
		}
		50% {
			opacity: 0.6;
		}
	}
	
	.animate-float {
		animation: float 20s infinite ease-in-out;
	}

	.animate-float-delayed {
		animation: float-delayed 25s infinite ease-in-out;
	}

	.animate-scan {
		animation: scan 8s linear infinite;
	}

	.animate-marquee {
		animation: marquee 30s linear infinite;
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.8s ease-out forwards;
		opacity: 0;
	}

	.animate-fade-in {
		animation: fade-in 0.5s ease-out forwards;
	}

	.animate-slide-down {
		animation: slide-down 0.6s ease-out forwards;
	}

	.animate-shimmer {
		animation: shimmer 2s infinite;
	}

	.animate-gradient {
		background-size: 200% 200%;
		animation: gradient 3s ease infinite;
	}

	.animate-bounce-slow {
		animation: bounce-slow 2s infinite ease-in-out;
	}

	.animate-scroll-indicator {
		animation: scroll-indicator 2s infinite ease-in-out;
	}

	.animate-particle-float {
		animation: particle-float 10s infinite ease-out;
	}

	.animate-grid-pulse {
		animation: grid-pulse 4s infinite ease-in-out;
	}
	
	/* Custom scrollbar */
	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	::-webkit-scrollbar-track {
		background: #000;
	}

	::-webkit-scrollbar-thumb {
		background: #DC2626;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #B91C1C;
	}

	/* Smooth hover transitions */
	* {
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Pause animation on hover */
	.hover\:pause:hover {
		animation-play-state: paused;
	}

	/* Add smooth perspective for 3D effects */
	.perspective-1000 {
		perspective: 1000px;
	}
</style>

<!-- Onboarding Flow Component -->
<OnboardingFlow />
