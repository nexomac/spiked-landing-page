<script>
	import { onMount } from 'svelte';
	import FeaturesShowcase from '$lib/components/FeaturesShowcase.svelte';
	import OnboardingFlow from '$lib/components/OnboardingFlow.svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	
	let isDark = $state(true); // Default to dark theme
	let isScrolled = $state(false);
	let mobileMenuOpen = $state(false);
	let activeTab = $state('realtime');
	let activeFeatureTab = $state('transcription');
	let activePricingTab = $state('monthly');
	let transcriptIndex = $state(0);
	let sentimentScore = $state(0);
	let buyingSignals = $state(0);
	let autoAnswerMode = $state(false);
	let mouseX = $state(0);
	let mouseY = $state(0);
	
	let visibleSections = $state({
		hero: false,
		products: false,
		features: false,
		demo: false,
		testimonials: false,
		pricing: false,
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
<nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-700 {isScrolled ? 'bg-black/90 backdrop-blur-xl border-b border-red-900/30' : 'bg-transparent'}">
	<div class="max-w-7xl mx-auto px-6 py-5">
		<div class="flex items-center justify-between">
			<div class="group flex items-center gap-3 cursor-pointer">
				<div class="relative">
					<!-- Animated red glow -->
					<div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
					<!-- Logo container -->
					<div class="relative bg-gradient-to-br from-zinc-900 to-black p-2 rounded-lg border border-red-900/50 group-hover:border-red-600 transition-all duration-500">
						<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="h-7 w-7 rounded transform group-hover:scale-110 transition-transform duration-500" />
					</div>
				</div>
				<div class="flex flex-col">
					<span class="text-xl font-black tracking-tight text-white group-hover:text-red-500 transition-colors duration-300">
						SPIKED<span class="text-red-600">AI</span>
					</span>
					<span class="text-[10px] text-zinc-500 font-medium tracking-wider uppercase -mt-0.5">Revenue Intelligence OS</span>
				</div>
			</div>
			
			<div class="hidden md:flex items-center gap-1">
				<button onclick={() => scrollToSection('products')} class="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-red-500 transition-colors duration-300">Products</button>
				<a href="/features" class="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-red-500 transition-colors duration-300">Features</a>
				<button onclick={() => scrollToSection('demo')} class="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-red-500 transition-colors duration-300">Platform</button>
				<button onclick={() => scrollToSection('pricing')} class="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-red-500 transition-colors duration-300">Pricing</button>
				
				<div class="ml-4 flex items-center gap-3">
					<button class="px-4 py-2 text-sm font-semibold text-white hover:text-red-500 transition-colors duration-300">
						Log In
					</button>
					<button 
						onclick={() => onboardingStore.start()}
						class="group relative px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded font-semibold text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
					>
						<span class="relative z-10">Get Started</span>
						<div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</button>
				</div>
			</div>

			<!-- Mobile Menu Button -->
			<button 
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
				class="md:hidden p-2 text-zinc-400 hover:text-red-500 transition-colors duration-300"
				aria-label="Toggle mobile menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden mt-4 pb-4 space-y-2 border-t border-red-900/30 pt-4">
				<button onclick={() => scrollToSection('products')} class="block w-full text-left px-4 py-2 text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300">Products</button>
				<a href="/features" class="block w-full text-left px-4 py-2 text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300">Features</a>
				<button onclick={() => scrollToSection('demo')} class="block w-full text-left px-4 py-2 text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300">Platform</button>
				<button onclick={() => scrollToSection('pricing')} class="block w-full text-left px-4 py-2 text-zinc-400 hover:text-red-500 hover:bg-red-950/30 rounded transition-all duration-300">Pricing</button>
			</div>
		{/if}
	</div>
</nav>

<!-- Hero Section -->
<section 
	data-section="hero" 
	class="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
>
	<!-- Animated Grid Background -->
	<div class="absolute inset-0">
		<div class="absolute inset-0 bg-gradient-to-b from-red-950/20 via-black to-black"></div>
		<div class="absolute inset-0" style="background-image: linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px); background-size: 50px 50px;"></div>
		
		<!-- Animated Red Orbs -->
		<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-float"></div>
		<div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl animate-float-delayed"></div>
		
		<!-- Scanning Line Effect -->
		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute h-px w-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-20 animate-scan"></div>
		</div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-6 py-32">
		<div class="transform transition-all duration-1000 {visibleSections.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<!-- Status Badge (Larger) -->
			<div class="inline-flex items-center gap-4 mb-8 px-6 py-3 bg-zinc-950/80 backdrop-blur-xl rounded-full border-2 border-red-900/50 group hover:border-red-600/50 transition-all duration-500 text-sm">
				<div class="relative flex items-center gap-3">
					<div class="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
					<span class="text-sm font-bold text-zinc-300 tracking-wider uppercase">Live Intelligence</span>
				</div>
				<div class="h-6 w-px bg-red-900/40"></div>
				<span class="text-sm font-bold text-red-500 tracking-wide">Real-Time Knowledge Agent™</span>
				<span class="text-sm text-zinc-500">Now available in Beta - <span class="underline">Join the waitlist</span></span>

			</div>
			<h1 class="text-7xl md:text-8xl lg:text-9xl font-black mb-8 leading-none tracking-tighter">
				<span class="block text-white">Sell Like</span>
				<span class="block bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
					a CEO
				</span>
			</h1>
			
			<p class="text-xl md:text-2xl text-zinc-400 mb-12 max-w-3xl leading-relaxed font-light">
				Transform every sales conversation with real-time AI intelligence. From live knowledge agents to automated follow-ups, <span class="text-red-500 font-medium">SpikedAI empowers sales and dev teams</span> with <span class="text-white font-medium">conversational intelligence that actually works.</span>
			</p>
			
			<div class="flex flex-col sm:flex-row gap-4 mb-16">
				<button 
					onclick={() => onboardingStore.start()}
					class="group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/50"
				>
					<span class="relative z-10 flex items-center gap-2">
						Start Now, Skip Demos
						<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
					</span>
					<div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
				</button>
				<button class="px-8 py-4 bg-transparent text-white rounded font-semibold text-lg border border-zinc-800 hover:border-red-600 hover:bg-red-950/20 transition-all duration-300">
					Contact Sales
				</button>
			</div>

			<!-- Feature Metrics Bar -->
			<div class="grid md:grid-cols-3 gap-6 max-w-4xl">
				{#each [
					{ 
						metric: '100%', 
						label: 'Meeting Coverage',
						icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
					},
					{ 
						metric: 'Real-Time', 
						label: 'AI Assistance',
						icon: 'M13 10V3L4 14h7v7l9-11h-7z'
					},
					{ 
						metric: 'Auto', 
						label: 'Follow-Up Planning',
						icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
					}
				] as feature, i}
					<div 
						class="group relative bg-zinc-950/50 backdrop-blur-sm p-6 rounded-lg border border-zinc-900 hover:border-red-900/50 transition-all duration-500 overflow-hidden"
						style="transition-delay: {i * 100}ms"
					>
						<div class="absolute inset-0 bg-gradient-to-br from-red-950/0 to-red-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
						<div class="relative">
							<div class="flex items-center gap-3 mb-3">
								<div class="p-2 bg-red-950/30 rounded border border-red-900/30">
									<svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={feature.icon} />
									</svg>
								</div>
								<span class="text-3xl font-black text-white">{feature.metric}</span>
							</div>
							<p class="text-sm text-zinc-500 font-medium tracking-wide uppercase">{feature.label}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
		<div class="w-6 h-10 border-2 border-zinc-800 rounded-full flex items-start justify-center p-2">
			<div class="w-1 h-2 bg-red-500 rounded-full animate-pulse"></div>
		</div>
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
				AI-Powered Sales<br />
				<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
					Intelligence Platform
				</span>
			</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
				From real-time meeting assistance to automated follow-ups and seamless CRM integration—everything your sales team needs in one intelligent platform.
			</p>
		</div>

		<!-- Agent Workflow Cards with Diagonal Layout -->
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each [
				{ 
					id: 'realtime',
					label: 'Knowledge Agent', 
					title: 'Real-Time AI Answers',
					description: 'Instant answers from your knowledge base during live calls',
					icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
				},
				{ 
					id: 'intelligence',
					label: 'Call Simulator', 
					title: 'Practice Sales Scenarios',
					description: 'AI-powered role-play to sharpen your pitch and objection handling',
					icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
				},
				{ 
					id: 'automation',
					label: 'Meeting AI', 
					title: 'Conversational Notetaker',
					description: 'Automatic transcription, summaries, and action items extraction',
					icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
				},
				{ 
					id: 'analytics',
					label: 'Follow-Up Planner', 
					title: 'Smart Task Automation',
					description: 'AI-generated follow-up sequences and task assignments',
					icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
				}
			] as workflow, i}
				<button
					type="button"
					onclick={() => activeTab = workflow.id}
					class="group relative bg-zinc-950 border border-zinc-900 hover:border-red-900/50 rounded-lg p-6 cursor-pointer transition-all duration-500 transform hover:-translate-y-1 {activeTab === workflow.id ? 'border-red-600 bg-gradient-to-br from-red-950/20 to-zinc-950' : ''} text-left w-full"
					style="transition-delay: {i * 50}ms"
					aria-pressed={activeTab === workflow.id}
					aria-label={workflow.title}
				>
					<div class="absolute inset-0 bg-gradient-to-br from-red-950/0 to-red-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
					
					<div class="relative">
						<div class="flex items-start justify-between mb-4">
							<div class="p-3 bg-zinc-900 rounded-lg border border-zinc-800 group-hover:border-red-900/50 transition-colors duration-500">
								<svg class="w-6 h-6 {activeTab === workflow.id ? 'text-red-500' : 'text-zinc-600'} group-hover:text-red-500 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={workflow.icon} />
								</svg>
							</div>
							<span class="text-xs font-bold {activeTab === workflow.id ? 'text-red-500' : 'text-zinc-600'} tracking-wider uppercase">{workflow.label}</span>
						</div>
						
						<h3 class="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors duration-300">{workflow.title}</h3>
						<p class="text-sm text-zinc-500 leading-relaxed">{workflow.description}</p>
						
						{#if activeTab === workflow.id}
							<div class="mt-4 pt-4 border-t border-red-900/30">
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
					class="group relative bg-zinc-950/50 border border-zinc-900 hover:border-red-900/30 rounded-lg p-6 transition-all duration-500 overflow-hidden"
					style="transition-delay: {i * 75}ms"
				>
					<div class="absolute inset-0 bg-gradient-to-br from-red-950/0 to-red-950/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
					
					<div class="relative flex items-center gap-4">
						<div class="p-2 bg-zinc-900 rounded border border-zinc-800 group-hover:border-red-900/50 transition-colors duration-500">
							<svg class="w-5 h-5 text-zinc-600 group-hover:text-red-500 transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={agent.icon} />
							</svg>
						</div>
						<div class="flex-1">
							<div class="text-xs font-bold text-zinc-600 tracking-wider uppercase mb-1">{agent.label}</div>
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
	
	<div class="text-center mb-16 transform transition-all duration-1000 {visibleSections.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
		<span class="text-sm font-bold text-red-500 tracking-widest uppercase">Trusted by Sales Leaders</span>
		<h2 class="text-5xl md:text-6xl font-black mt-4 mb-6 text-white tracking-tight">
			AI That Empowers<br />
			<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Sales & Dev Teams</span>
		</h2>
	</div>

	<!-- Testimonial Marquee -->
	<div class="relative">
		<div class="flex gap-6 animate-marquee">
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
					quote: "Automatic follow-up planning saves hours every week. CRM integration means zero manual data entry.",
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
				<div class="flex-shrink-0 w-96 bg-zinc-900 border border-zinc-800 rounded-lg p-6 hover:border-red-900/50 transition-all duration-500 group">
					<div class="flex items-start gap-4 mb-4">
						<div class="flex-shrink-0">
							<div class="w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold text-lg">
								{testimonial.author[0]}
							</div>
						</div>
						<div class="flex-1">
							<p class="font-bold text-white text-sm">{testimonial.author}</p>
							<p class="text-xs text-zinc-500">{testimonial.role}</p>
						</div>
						<div class="text-right">
							<div class="text-2xl font-black text-red-500">{testimonial.metric}</div>
							<div class="text-[10px] text-zinc-600 uppercase tracking-wider">{testimonial.metricLabel}</div>
						</div>
					</div>
					<p class="text-zinc-400 text-sm leading-relaxed">{testimonial.quote}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Enterprise Ready Badge -->
	<div class="mt-20 max-w-7xl mx-auto px-6">
		<div class="bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-red-900/30 rounded-lg p-8">
			<div class="text-center mb-8">
				<h3 class="text-2xl font-black text-white mb-2">Built for Sales & Dev Teams</h3>
				<p class="text-zinc-500">Powerful conversational AI that integrates with your entire workflow</p>
			</div>
			<div class="grid md:grid-cols-3 gap-8">
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
				] as feature}
					<div class="group relative">
						<div class="absolute -top-4 left-0 text-6xl font-black text-red-950 opacity-50 group-hover:opacity-100 transition-opacity">
							{feature.number}
						</div>
						<div class="relative pt-8">
							<h4 class="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors">{feature.title}</h4>
							<p class="text-sm text-zinc-500">{feature.description}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Pricing Section -->
<section id="pricing" data-section="pricing" class="py-32 bg-black relative overflow-hidden">
	<!-- Background Grid -->
	<div class="absolute inset-0" style="background-image: linear-gradient(rgba(220, 38, 38, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.03) 1px, transparent 1px); background-size: 40px 40px;"></div>
	
	<div class="max-w-7xl mx-auto px-6 relative z-10">
		<div class="text-center mb-16 transform transition-all duration-1000 {visibleSections.pricing ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<span class="text-sm font-bold text-red-500 tracking-widest uppercase">Flexible Pricing</span>
			<h2 class="text-6xl md:text-7xl font-black mt-4 mb-6 text-white tracking-tight">
				Plans for Every<br />
				<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
					Sales Team
				</span>
			</h2>
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
				Start free and scale with AI-powered conversational intelligence.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
			{#each [
				{
					name: 'Starter',
					price: null,
					period: 'Free Forever',
					description: 'For individual sales reps',
					features: [
						'5 hours meeting transcription/month',
						'Basic AI-powered insights',
						'Up to 10 knowledge documents',
						'7-day conversation history',
						'Email support'
					],
					cta: 'Get Started Free',
					highlight: false
				},
				{
					name: 'Professional',
					price: activePricingTab === 'monthly' ? 49 : 39,
					period: activePricingTab === 'monthly' ? '/month' : '/month',
					savings: activePricingTab === 'annual' ? 'Save $120/year' : null,
					description: 'For high-performing sales teams',
					features: [
						'Unlimited meeting transcription',
						'Real-time AI knowledge agent',
						'Unlimited knowledge base',
						'Call simulator & role-plays',
						'Auto follow-up planning',
						'MEDPIC framework tracking',
						'CRM integrations',
						'Priority support',
						'30-day history'
					],
					cta: 'Start Free Trial',
					highlight: true
				},
				{
					name: 'Enterprise',
					price: null,
					period: 'Custom',
					description: 'For enterprise sales organizations',
					features: [
						'Everything in Professional',
						'Unlimited team members',
						'Custom integrations (Jira, Asana)',
						'Dedicated account manager',
						'SLA guarantee',
						'Advanced analytics & reporting',
						'Enterprise security & SSO',
						'Unlimited history',
						'White-glove onboarding'
					],
					cta: 'Contact Sales',
					highlight: false
				}
			] as plan, i}
				<div 
					class="relative bg-zinc-950 border-2 {plan.highlight ? 'border-red-600' : 'border-zinc-900'} rounded-lg p-8 transition-all duration-500 transform hover:-translate-y-2 {visibleSections.pricing ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} {plan.highlight ? 'scale-105' : ''}"
					style="transition-delay: {i * 100}ms"
				>
					{#if plan.highlight}
						<div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
							<span class="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
								Most Popular
							</span>
						</div>
					{/if}
					
					<div class="mb-6">
						<h3 class="text-xl font-black text-white mb-1 tracking-tight">{plan.name}</h3>
						<p class="text-zinc-500 text-sm">{plan.description}</p>
					</div>
					
					<div class="mb-8">
						{#if plan.price !== null}
							<div class="flex items-baseline gap-2">
								<span class="text-5xl font-black text-white">
									${plan.price}
								</span>
								<span class="text-zinc-500">{plan.period}</span>
							</div>
							{#if plan.savings}
								<div class="mt-2 text-xs text-red-500 font-semibold">{plan.savings}</div>
							{/if}
						{:else}
							<div class="text-3xl font-black text-white">
								{plan.period}
							</div>
						{/if}
					</div>
					
					<ul class="space-y-3 mb-8">
						{#each plan.features as feature}
							<li class="flex items-start gap-3">
								<svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
								</svg>
								<span class="text-sm text-zinc-400">{feature}</span>
							</li>
						{/each}
					</ul>
					
					<button class="group w-full py-3.5 rounded font-bold text-sm transition-all duration-300 {plan.highlight ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:shadow-red-600/50' : 'bg-zinc-900 text-white hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700'}">
						<span class="flex items-center justify-center gap-2">
							{plan.cta}
							<svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
							</svg>
						</span>
					</button>
				</div>
			{/each}
		</div>

		<!-- Pricing Toggle -->
		<div class="flex justify-center mt-12">
			<div class="inline-flex bg-zinc-950 border border-zinc-900 rounded p-1">
				<button
					onclick={() => activePricingTab = 'monthly'}
					class="px-6 py-2 rounded font-semibold text-sm transition-all duration-300 {activePricingTab === 'monthly' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-white'}"
				>
					Monthly
				</button>
				<button
					onclick={() => activePricingTab = 'annual'}
					class="px-6 py-2 rounded font-semibold text-sm transition-all duration-300 flex items-center gap-2 {activePricingTab === 'annual' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-white'}"
				>
					Annual
					<span class="text-[10px] bg-green-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
				</button>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section data-section="cta" class="py-32 bg-gradient-to-br from-red-950 via-black to-black relative overflow-hidden border-t border-red-900/20">
	<!-- Animated Background -->
	<div class="absolute inset-0">
		<div class="absolute inset-0" style="background-image: linear-gradient(rgba(220, 38, 38, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.05) 1px, transparent 1px); background-size: 50px 50px;"></div>
		<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
	</div>
	
	<div class="relative z-10 max-w-4xl mx-auto px-6 text-center transform transition-all duration-1000 {visibleSections.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
		<h2 class="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight leading-none">
			Empower Your Sales Team<br />
			<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
				With AI Intelligence
			</span>
		</h2>
		<p class="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light">
			Join sales teams accelerating revenue with conversational AI. Real-time insights, automated follow-ups, and seamless integrations.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<button 
				onclick={() => onboardingStore.start()}
				class="group px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded font-bold text-lg hover:shadow-2xl hover:shadow-red-600/50 transition-all duration-300 overflow-hidden relative"
			>
				<span class="relative z-10 flex items-center justify-center gap-2">
					Start Free Trial
					<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</span>
				<div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
			</button>
			<button class="px-8 py-4 bg-transparent text-white rounded font-semibold text-lg border border-zinc-800 hover:border-red-600 hover:bg-red-950/20 transition-all duration-300">
				Contact Sales
			</button>
		</div>
		<p class="mt-6 text-zinc-600 text-sm">Free forever plan • No credit card required • Quick setup</p>
	</div>
</section>

<!-- Footer -->
<footer class="bg-black text-white py-16 border-t border-zinc-900">
	<div class="max-w-7xl mx-auto px-6">
		<div class="grid md:grid-cols-5 gap-12 mb-12">
			<div class="md:col-span-2">
				<div class="flex items-center gap-3 mb-4 group">
					<div class="relative">
						<div class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
						<div class="relative bg-gradient-to-br from-zinc-900 to-black p-1.5 rounded-lg border border-red-900/50">
							<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="h-6 w-6 rounded" />
						</div>
					</div>
					<span class="text-xl font-black tracking-tight">
						SPIKED<span class="text-red-600">AI</span>
					</span>
				</div>
				<p class="text-zinc-500 text-sm mb-6 max-w-xs">
					Conversational AI for Sales Teams. Empower your team with real-time intelligence and automated workflows.
				</p>
				<div class="flex gap-4">
					{#each [
						{ name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
						{ name: 'X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
					{ name: 'YouTube', icon: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }
				] as social}
					<button 
						class="p-2 bg-zinc-900 hover:bg-red-950 border border-zinc-800 hover:border-red-900/50 rounded transition-all duration-300 group"
						aria-label={`Follow us on ${social.name}`}
					>
						<svg class="w-4 h-4 fill-zinc-600 group-hover:fill-red-500 transition-colors" viewBox="0 0 24 24">
							<path d={social.icon} />
						</svg>
					</button>
				{/each}
				</div>
			</div>
			
			<div>
				<h4 class="font-bold text-white mb-4 text-sm tracking-wider uppercase">Features</h4>
				<ul class="space-y-2 text-zinc-500 text-sm">
					<li><button class="hover:text-red-500 transition-colors">Knowledge Agent</button></li>
					<li><button class="hover:text-red-500 transition-colors">Call Simulator</button></li>
					<li><button class="hover:text-red-500 transition-colors">Meeting AI</button></li>
					<li><button class="hover:text-red-500 transition-colors">Follow-Up Planner</button></li>
					<li><button class="hover:text-red-500 transition-colors">CRM Integrations</button></li>
					<li><button class="hover:text-red-500 transition-colors">Analytics</button></li>
				</ul>
			</div>
			
			<div>
				<h4 class="font-bold text-white mb-4 text-sm tracking-wider uppercase">Integrations</h4>
				<ul class="space-y-2 text-zinc-500 text-sm">
					<li><button class="hover:text-red-500 transition-colors">Salesforce</button></li>
					<li><button class="hover:text-red-500 transition-colors">HubSpot</button></li>
					<li><button class="hover:text-red-500 transition-colors">Jira</button></li>
					<li><button class="hover:text-red-500 transition-colors">Asana</button></li>
					<li><button class="hover:text-red-500 transition-colors">Slack</button></li>
					<li><button class="hover:text-red-500 transition-colors">Teams</button></li>
				</ul>
			</div>
			
			<div>
				<h4 class="font-bold text-white mb-4 text-sm tracking-wider uppercase">Company</h4>
				<ul class="space-y-2 text-zinc-500 text-sm">
					<li><button onclick={() => scrollToSection('pricing')} class="hover:text-red-500 transition-colors">Pricing</button></li>
					<li><button class="hover:text-red-500 transition-colors">Customers</button></li>
					<li><button class="hover:text-red-500 transition-colors">Security</button></li>
					<li><button class="hover:text-red-500 transition-colors">Docs</button></li>
					<li><button class="hover:text-red-500 transition-colors">Contact</button></li>
				</ul>
			</div>
		</div>
		
		<div class="border-t border-zinc-900 pt-8">
			<div class="flex flex-col md:flex-row justify-between items-center gap-4">
				<div class="text-center md:text-left text-zinc-600 text-sm">
					© 2025 SpikedAI. All rights reserved. <span class="hidden md:inline">• 251 Rhode Island St, Suite 205, San Francisco, CA 94103</span>
				</div>
				<div class="flex gap-6 text-xs text-zinc-600">
					<button class="hover:text-red-500 transition-colors">Privacy Policy</button>
					<button class="hover:text-red-500 transition-colors">Terms of Service</button>
					<button class="hover:text-red-500 transition-colors">Status</button>
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
</style>

<!-- Onboarding Flow Component -->
<OnboardingFlow />
