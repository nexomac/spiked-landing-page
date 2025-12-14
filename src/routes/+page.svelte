<script>
	import { onMount } from 'svelte';
	import FeaturesShowcase from '$lib/components/FeaturesShowcase.svelte';
	import OnboardingFlow from '$lib/components/OnboardingFlow.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ProductsSection from '$lib/components/ProductsSection.svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { innerWidth } from 'svelte/reactivity/window';
	
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
		const handleScroll = () => {
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

	function scrollToSection(id) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}

	function handleTilt(event, intensity = 8) {
		const card = event.currentTarget;
		const rect = card.getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width - 0.5) * intensity;
		const y = ((event.clientY - rect.top) / rect.height - 0.5) * intensity;

		card.style.setProperty('--tilt-x', `${-y}deg`);
		card.style.setProperty('--tilt-y', `${x}deg`);
		card.style.setProperty('--glow-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
		card.style.setProperty('--glow-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
	}

	function resetTilt(event) {
		const card = event.currentTarget;
		card.style.setProperty('--tilt-x', '0deg');
		card.style.setProperty('--tilt-y', '0deg');
		card.style.setProperty('--glow-x', '50%');
		card.style.setProperty('--glow-y', '50%');
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page-shell">
	<div class="page-bg">
		<div class="bg-layer grid-layer"></div>
		<div class="bg-layer vignette-top"></div>
		<div class="bg-layer vignette-bottom"></div>
		<div class="bg-layer orb orb-1"></div>
		<div class="bg-layer orb orb-2"></div>
		<div class="bg-layer orb orb-3"></div>
		<div class="bg-layer particles">
			{#each Array(36) as _, i}
				<div
					class="particle"
					style={`left:${Math.random() * 100}%; top:${Math.random() * 100}%; animation-delay:${Math.random() * 6}s; animation-duration:${10 + Math.random() * 8}s;`}
				></div>
			{/each}
		</div>
	</div>

	<div class="page-content relative z-10">
		<HeroSection
			visibleHero={visibleSections.hero}
			{scrollY}
			{mouseX}
			{mouseY}
			{handleTilt}
			{resetTilt}
			startOnboarding={onboardingStore.start}
		/>

		<ProductsSection
			activeTab={activeTab}
			setActiveTab={(id) => activeTab = id}
			visible={visibleSections.products}
			{handleTilt}
			{resetTilt}
		/>

		<FeaturesShowcase />

		<section id="testimonials" data-section="testimonials" class="py-24 sm:py-32 bg-zinc-950 relative overflow-hidden border-y border-red-900/20">
			<div class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none"></div>
			<div class="absolute inset-0 overflow-hidden">
				{#each Array(15) as _, i}
					<div 
						class="absolute w-1 h-1 bg-red-500/20 rounded-full animate-particle-float"
						style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 5}s; animation-duration: {10 + Math.random() * 5}s;"
					></div>
				{/each}
			</div>
			<div class="text-center mb-12 sm:mb-16 px-4 transform transition-all duration-1000 {visibleSections.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative z-20">
				<span class="text-xs sm:text-sm font-bold text-red-500 tracking-widest uppercase animate-fade-in-up">Trusted by Sales Leaders</span>
				<h2 class="text-3xl sm:text-4xl md:text-6xl font-black mt-4 mb-6 text-white tracking-tight animate-fade-in-up leading-tight" style="animation-delay: 0.1s;">
					AI That Empowers<br />
					<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Sales & Dev Teams</span>
				</h2>
			</div>
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
						<div 
							onmousemove={(event) => handleTilt(event, 6)}
							onmouseleave={resetTilt}
							class="tilt-card relative flex-shrink-0 w-96 bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-red-900/50 transition-all duration-500 group hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/20 cursor-pointer overflow-hidden" 
							style="transform: translate3d(0, 0, 0);"
						>
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
								description: 'Connects with Salesforce, HubSpot, monday.com, Jira, Asana, Slack, Teams & more'
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

		<section data-section="cta" class="py-24 sm:py-32 bg-gradient-to-br from-red-950 via-black to-black relative overflow-hidden border-t border-red-900/20">
			<div class="absolute inset-0">
				<div class="absolute inset-0 animate-grid-pulse" style="background-image: linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px); background-size: 50px 50px;"></div>
				<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
				<div class="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-2xl animate-float"></div>
				<div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-700/5 rounded-full blur-3xl animate-float-delayed"></div>
				{#each Array(25) as _, i}
					<div 
						class="absolute w-1 h-1 bg-red-500/20 rounded-full animate-particle-float"
						style="left: {Math.random() * 100}%; top: {Math.random() * 100}%; animation-delay: {Math.random() * 5}s; animation-duration: {12 + Math.random() * 6}s;"
					></div>
				{/each}
			</div>
			
			<div class="relative z-10 max-w-4xl mx-auto px-6 text-center transform transition-all duration-1000 {visibleSections.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
				<h2 class="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight sm:leading-none animate-fade-in-up">
					Empower Your Sales Team<br />
					<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent animate-gradient">
						With AI Intelligence
					</span>
				</h2>
				<p class="text-lg sm:text-xl text-zinc-400 mb-10 sm:mb-12 max-w-2xl mx-auto font-light animate-fade-in-up" style="animation-delay: 0.2s;">
					Join sales teams accelerating revenue with conversational AI. Real-time insights, automated follow-ups, and seamless integrations.
				</p>
				<div class="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up" style="animation-delay: 0.4s;">
					<button 
						onclick={onboardingStore.start}
						onmousemove={(event) => handleTilt(event, 12)}
						onmouseleave={resetTilt}
						class="tilt-card group relative px-8 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-1">
						<span class="relative z-10 flex items-center justify-center gap-2">
							Start Free Trial
							<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</span>
						<div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
						<div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
					</button>
					<a 
						href="/contact-sales" 
						onmousemove={(event) => handleTilt(event, 10)}
						onmouseleave={resetTilt}
						class="tilt-card relative px-8 py-5 bg-transparent text-white rounded-xl font-semibold text-lg border-2 border-zinc-800 hover:border-red-600 hover:bg-red-950/20 transition-all duration-300 text-center hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20 overflow-hidden">
						Contact Sales
					</a>
				</div>
				<p class="mt-6 text-zinc-600 text-sm animate-fade-in-up" style="animation-delay: 0.6s;">Free forever plan • No credit card required • Quick setup</p>
			</div>
		</section>

		<footer class="bg-black text-white py-16 border-t border-zinc-900 relative overflow-hidden">
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
									<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="h-6 w-6 object-contain" />
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
		<OnboardingFlow />
	</div>
</div>
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
	
	<div class="text-center mb-12 sm:mb-16 px-4 transform transition-all duration-1000 {visibleSections.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} relative z-20">
		<span class="text-xs sm:text-sm font-bold text-red-500 tracking-widest uppercase animate-fade-in-up">Trusted by Sales Leaders</span>
		<h2 class="text-3xl sm:text-4xl md:text-6xl font-black mt-4 mb-6 text-white tracking-tight animate-fade-in-up leading-tight" style="animation-delay: 0.1s;">
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
				<div 
					onmousemove={(event) => handleTilt(event, 6)}
					onmouseleave={resetTilt}
					class="tilt-card relative flex-shrink-0 w-96 bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-red-900/50 transition-all duration-500 group hover:-translate-y-1 hover:shadow-lg hover:shadow-red-900/20 cursor-pointer overflow-hidden" 
					style="transform: translate3d(0, 0, 0);"
				>
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
						description: 'Connects with Salesforce, HubSpot, monday.com, Jira, Asana, Slack, Teams & more'
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


<!-- CTA Section -->
<section data-section="cta" class="py-24 sm:py-32 bg-gradient-to-br from-red-950 via-black to-black relative overflow-hidden border-t border-red-900/20">
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
		<h2 class="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight sm:leading-none animate-fade-in-up">
			Empower Your Sales Team<br />
			<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent animate-gradient">
				With AI Intelligence
			</span>
		</h2>
		<p class="text-lg sm:text-xl text-zinc-400 mb-10 sm:mb-12 max-w-2xl mx-auto font-light animate-fade-in-up" style="animation-delay: 0.2s;">
			Join sales teams accelerating revenue with conversational AI. Real-time insights, automated follow-ups, and seamless integrations.
		</p>
		<div class="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-up" style="animation-delay: 0.4s;">
			<button 
				onclick={onboardingStore.start}
				onmousemove={(event) => handleTilt(event, 12)}
				onmouseleave={resetTilt}
				class="tilt-card group relative px-8 py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 overflow-hidden hover:scale-105 hover:-translate-y-1">
				<span class="relative z-10 flex items-center justify-center gap-2">
					Start Free Trial
					<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</span>
				<div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				<div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
			</button>
			<a 
				href="/contact-sales" 
				onmousemove={(event) => handleTilt(event, 10)}
				onmouseleave={resetTilt}
				class="tilt-card relative px-8 py-5 bg-transparent text-white rounded-xl font-semibold text-lg border-2 border-zinc-800 hover:border-red-600 hover:bg-red-950/20 transition-all duration-300 text-center hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/20 overflow-hidden">
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
							<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="h-6 w-6 object-contain" />
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
	.tilt-card {
		--tilt-x: 0deg;
		--tilt-y: 0deg;
		--glow-x: 50%;
		--glow-y: 50%;
		transform: perspective(900px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) translate3d(var(--tw-translate-x, 0), var(--tw-translate-y, 0), 0) scale3d(var(--tw-scale-x, 1), var(--tw-scale-y, 1), 1);
		transition: transform 300ms ease, box-shadow 300ms ease;
		will-change: transform;
	}

	.tilt-card::after {
		content: '';
		position: absolute;
		inset: -1px;
		background: radial-gradient(320px circle at var(--glow-x) var(--glow-y), rgba(248, 113, 113, 0.16), transparent 60%);
		opacity: 0;
		pointer-events: none;
		transition: opacity 300ms ease;
	}

	.tilt-card:hover::after {
		opacity: 1;
	}

	.tilt-card:hover {
		transform: perspective(900px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) translate3d(var(--tw-translate-x, 0), var(--tw-translate-y, 0), 10px) scale3d(var(--tw-scale-x, 1.02), var(--tw-scale-y, 1.02), 1);
	}

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

	/* Page-wide background */
	.page-shell {
		position: relative;
		min-height: 100vh;
		background: #000;
		overflow: hidden;
	}

	.page-bg {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
	}

	.page-bg .bg-layer {
		position: absolute;
		inset: 0;
	}

	.grid-layer {
		background-image: linear-gradient(rgba(220, 38, 38, 0.04) 1px, transparent 1px),
			linear-gradient(90deg, rgba(220, 38, 38, 0.04) 1px, transparent 1px);
		background-size: 60px 60px;
		opacity: 0.8;
		animation: grid-pulse 6s ease-in-out infinite;
	}

	.vignette-top {
		background: radial-gradient(600px circle at 50% 0%, rgba(248, 113, 113, 0.18), transparent 60%),
			radial-gradient(400px circle at 20% 10%, rgba(220, 38, 38, 0.12), transparent 55%);
	}

	.vignette-bottom {
		background: radial-gradient(700px circle at 50% 90%, rgba(190, 24, 24, 0.16), transparent 65%),
			radial-gradient(500px circle at 80% 80%, rgba(239, 68, 68, 0.12), transparent 60%);
	}

	.orb {
		filter: blur(120px);
		opacity: 0.6;
		mix-blend-mode: screen;
	}

	.orb-1 {
		width: 40%;
		height: 40%;
		background: radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.55), transparent 55%);
		top: -10%;
		left: -5%;
	}

	.orb-2 {
		width: 35%;
		height: 35%;
		background: radial-gradient(circle at 70% 50%, rgba(248, 113, 113, 0.45), transparent 60%);
		bottom: 5%;
		right: 10%;
	}

	.orb-3 {
		width: 30%;
		height: 30%;
		background: radial-gradient(circle at 50% 50%, rgba(248, 113, 113, 0.25), transparent 65%);
		top: 30%;
		right: -5%;
	}

	.particles .particle {
		position: absolute;
		width: 6px;
		height: 6px;
		border-radius: 999px;
		background: rgba(248, 113, 113, 0.25);
		animation: particle-float 12s infinite ease-out;
	}
</style>
