<script>
	import { onMount } from 'svelte';
	import FeaturesShowcase from '$lib/components/FeaturesShowcase.svelte';
	import OnboardingFlow from '$lib/components/OnboardingFlow.svelte';
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
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Hero Section -->
<section 
	data-section="hero" 
	class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-zinc-950 via-black to-black"
>
	<!-- Refined Background -->
	<div class="absolute inset-0" style="transform: translateY({scrollY * 0.3}px);">
		<!-- Subtle gradient overlay -->
		<div class="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-black to-black"></div>
		
		<!-- Minimal grid -->
		<div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(rgba(161, 161, 170, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(161, 161, 170, 0.03) 1px, transparent 1px); background-size: 80px 80px;"></div>
		
		<!-- Sophisticated light effects -->
		<div 
			class="absolute w-[800px] h-[800px] bg-gradient-radial from-red-950/15 to-transparent rounded-full blur-3xl"
			style="top: -20%; left: -10%; transform: translate({mouseX * 0.02}px, {mouseY * 0.02}px);"
		></div>
		<div 
			class="absolute w-[600px] h-[600px] bg-gradient-radial from-red-900/10 to-transparent rounded-full blur-3xl"
			style="bottom: -10%; right: -10%; transform: translate({-mouseX * 0.015}px, {-mouseY * 0.015}px);"
		></div>
		
		<!-- Subtle scan line -->
		<div class="absolute inset-0 overflow-hidden opacity-30">
			<div class="absolute h-px w-full bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent animate-scan-slow"></div>
		</div>
		
		<!-- Radial spotlight -->
		<div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32 md:py-40">
		<div class="transform transition-all duration-1000 {visibleSections.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<!-- Refined badge -->
			<div class="inline-flex items-center gap-3 mb-16 animate-fade-in">
				<div class="flex items-center gap-2.5 px-5 py-2.5 bg-zinc-900/80 backdrop-blur-sm rounded-full border border-zinc-800/50">
					<div class="relative flex items-center gap-2">
						<div class="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
						<span class="text-sm font-medium text-zinc-300 tracking-wide">Revenue AI Agents built for the Fortune 2000</span>
					</div>
				</div>
			</div>

			<!-- Hero title -->
			<div class="mb-12">
				<h1 class="hero-title mb-8">
					Sell Like a CEO<br />
					<span class="hero-gradient">The rise of the singular rep starts here.</span>
				</h1>
				<div class="max-w-3xl">
					<p class="hero-subtitle">
						Redefining the sales workforce with AI-powered intelligence for every conversation. Revenue AI Agents built for the Fortune 2000 deliver real-time insights, automated execution, and seamless workflow integration that empowers your revenue team to operate at the highest level.
					</p>
				</div>
			</div>
			
			<!-- CTA buttons -->
			<div class="flex flex-col sm:flex-row gap-4 mb-24 animate-fade-in" style="animation-delay: 0.2s;">
				<button 
					onclick={onboardingStore.start}
					class="group relative px-8 py-4 bg-white text-black rounded-lg font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/10"
				>
					<span class="relative z-10 flex items-center justify-center gap-2">
						Start Free Trial
						<svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
					</span>
				</button>
				<a href="/contact-sales" class="px-8 py-4 bg-zinc-900/50 backdrop-blur-sm text-white rounded-lg font-semibold text-base border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300 text-center">
					Contact Sales
				</a>
			</div>

			<!-- Stats cards -->
			<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
				{#each [
					{ 
						metric: '100%', 
						label: 'Meeting coverage with AI-powered transcription',
						detail: 'Zero manual note-taking'
					},
					{ 
						metric: '<200ms', 
						label: 'Real-time AI assistance during live calls',
						detail: 'Instant intelligence'
					},
					{ 
						metric: 'Auto', 
						label: 'CRM sync and task automation',
						detail: 'Complete workflow automation'
					}
				] as feature, i}
					<div 
						class="group relative bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-500 animate-fade-in-up"
						style="animation-delay: {0.4 + i * 0.1}s;"
					>
						<div class="mb-4">
							<div class="text-4xl font-light text-white mb-2">{feature.metric}</div>
							<div class="h-px w-12 bg-gradient-to-r from-red-500 to-transparent"></div>
						</div>
						<p class="text-sm font-medium text-zinc-300 mb-1">{feature.label}</p>
						<p class="text-xs text-zinc-500">{feature.detail}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Minimal scroll indicator -->
	<div class="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-subtle opacity-40">
		<div class="w-5 h-8 border border-zinc-700 rounded-full flex items-start justify-center p-1">
			<div class="w-1 h-2 bg-zinc-600 rounded-full animate-scroll-indicator"></div>
		</div>
	</div>
</section>

<!-- Products Section -->
<section id="products" data-section="products" class="py-32 md:py-40 bg-black relative overflow-hidden">
	<!-- Minimal background -->
	<div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(161, 161, 170, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(161, 161, 170, 0.03) 1px, transparent 1px); background-size: 60px 60px;"></div>
	
	<div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
		<div class="text-center mb-24 transform transition-all duration-1000 {visibleSections.products ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<div class="inline-block mb-6">
				<span class="text-xs font-semibold text-zinc-500 tracking-[0.2em] uppercase">Platform Capabilities</span>
			</div>
			<h2 class="section-title mb-8">
				AI-Powered Revenue<br />
				<span class="section-gradient">Intelligence Suite</span>
			</h2>
			<p class="section-subtitle max-w-3xl mx-auto">
				Enterprise-grade AI that transforms how revenue teams operate. From preparation to execution, 
				every interaction is enhanced with real-time intelligence and automated follow-through.
			</p>
		</div>

		<!-- Product cards -->
		<div class="grid md:grid-cols-2 gap-6 mb-16">
			{#each [
				{ 
					id: 'simulator',
					number: '01',
					title: 'AI Sales Simulator',
					description: 'Practice sales methodologies and objection handling with AI-powered role-play scenarios.',
					icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
				},
				{ 
					id: 'knowledge',
					number: '02',
					title: 'Real-Time Knowledge Agent',
					description: 'Instant AI-powered answers during live calls from your complete knowledge base.',
					icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
				},
				{ 
					id: 'meeting',
					number: '03',
					title: 'Conversational Intelligence',
					description: 'Automatic transcription, insights extraction, and CRM synchronization for every meeting.',
					icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
				},
				{ 
					id: 'followup',
					number: '04',
					title: 'Automated Workflow Engine',
					description: 'Smart task automation and follow-up orchestration that ensures nothing falls through the cracks.',
					icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
				}
			] as product, i}
				<button
					type="button"
					onclick={() => activeTab = product.id}
					class="group relative bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 text-left transition-all duration-500 hover:bg-zinc-900/50 hover:border-zinc-700/50 {activeTab === product.id ? 'bg-zinc-900/50 border-zinc-700' : ''} animate-fade-in-up"
					style="animation-delay: {i * 0.1}s;"
				>
					<div class="flex items-start justify-between mb-6">
						<div class="text-6xl font-extralight text-zinc-800 group-hover:text-zinc-700 transition-colors">{product.number}</div>
						<div class="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50 group-hover:border-zinc-600/50 transition-all">
							<svg class="w-5 h-5 text-zinc-400 group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={product.icon} />
							</svg>
						</div>
					</div>
					
					<h3 class="text-xl font-semibold text-white mb-3 group-hover:text-zinc-100 transition-colors">{product.title}</h3>
					<p class="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{product.description}</p>
				</button>
			{/each}
		</div>

		<!-- Integration showcase -->
		<div class="relative bg-zinc-900/20 backdrop-blur-sm border border-zinc-800/30 rounded-2xl p-12 overflow-hidden">
			<div class="relative z-10">
				<div class="text-center mb-12">
					<span class="text-xs font-semibold text-zinc-500 tracking-[0.2em] uppercase mb-4 block">Enterprise Integrations</span>
					<h3 class="text-3xl font-semibold text-white mb-4">Seamlessly Integrated</h3>
					<p class="text-zinc-400 max-w-2xl mx-auto">Connect with your existing tech stack for a unified revenue intelligence platform</p>
				</div>
				
				<div class="grid grid-cols-2 md:grid-cols-4 gap-6">
					{#each [
						{ name: 'Salesforce', category: 'CRM' },
						{ name: 'HubSpot', category: 'CRM' },
						{ name: 'Slack', category: 'Communication' },
						{ name: 'Zoom', category: 'Meetings' },
						{ name: 'Jira', category: 'Project Mgmt' },
						{ name: 'Asana', category: 'Project Mgmt' },
						{ name: 'Teams', category: 'Communication' },
						{ name: 'Monday.com', category: 'Workflow' }
					] as integration, i}
						<div class="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-6 text-center hover:border-zinc-700/50 hover:bg-zinc-900/70 transition-all duration-300 animate-fade-in" style="animation-delay: {0.5 + i * 0.05}s;">
							<div class="text-sm font-medium text-white mb-1">{integration.name}</div>
							<div class="text-xs text-zinc-500">{integration.category}</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Showcase Section -->
<FeaturesShowcase />

<!-- Testimonials Section -->
<section id="testimonials" data-section="testimonials" class="py-32 md:py-40 bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
	<div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
		<div class="text-center mb-20 transform transition-all duration-1000 {visibleSections.testimonials ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
			<span class="text-xs font-semibold text-zinc-500 tracking-[0.2em] uppercase mb-4 block">Client Success</span>
			<h2 class="section-title mb-8">
				Trusted by Revenue<br />
				<span class="section-gradient">Leaders Worldwide</span>
			</h2>
		</div>

		<!-- Testimonial grid -->
		<div class="grid md:grid-cols-3 gap-8">
			{#each [
				{
					quote: "The real-time intelligence during calls has transformed how our team operates. Response accuracy improved dramatically.",
					author: "Sarah Mitchell",
					role: "VP of Sales",
					company: "Enterprise SaaS Co.",
					metric: "89%",
					metricLabel: "Close Rate Increase"
				},
				{
					quote: "Automated follow-up and CRM sync eliminated hours of manual work. Our team focuses on selling, not admin tasks.",
					author: "David Chen",
					role: "Sales Director",
					company: "Tech Solutions Inc.",
					metric: "20hrs",
					metricLabel: "Saved Per Week"
				},
				{
					quote: "AI-powered objection handling practice prepared our reps for real conversations. Deal velocity increased significantly.",
					author: "Maria Garcia",
					role: "Head of Revenue",
					company: "Growth Partners",
					metric: "3.2x",
					metricLabel: "Faster Ramp Time"
				}
			] as testimonial, i}
				<div class="bg-zinc-900/30 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 hover:bg-zinc-900/50 hover:border-zinc-700/50 transition-all duration-500 animate-fade-in-up" style="animation-delay: {i * 0.1}s;">
					<div class="mb-6">
						<div class="text-3xl font-light text-white mb-1">{testimonial.metric}</div>
						<div class="text-xs text-zinc-500 uppercase tracking-wider">{testimonial.metricLabel}</div>
					</div>
					<p class="text-zinc-300 text-sm leading-relaxed mb-8">"{testimonial.quote}"</p>
					<div class="pt-6 border-t border-zinc-800">
						<div class="font-medium text-white text-sm">{testimonial.author}</div>
						<div class="text-xs text-zinc-500">{testimonial.role}, {testimonial.company}</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Enterprise proof points -->
		<div class="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
			{#each [
				{ value: '500+', label: 'Enterprise customers' },
				{ value: '2M+', label: 'Conversations analyzed' },
				{ value: '99.9%', label: 'Platform uptime' },
				{ value: 'SOC 2', label: 'Type II certified' }
			] as stat, i}
				<div class="animate-fade-in-up" style="animation-delay: {0.6 + i * 0.1}s;">
					<div class="text-4xl font-light text-white mb-2">{stat.value}</div>
					<div class="text-sm text-zinc-500">{stat.label}</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section data-section="cta" class="py-32 md:py-40 bg-black relative overflow-hidden">
	<div class="absolute inset-0 opacity-10" style="background-image: linear-gradient(rgba(161, 161, 170, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(161, 161, 170, 0.03) 1px, transparent 1px); background-size: 60px 60px;"></div>
	
	<div class="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center transform transition-all duration-1000 {visibleSections.cta ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
		<h2 class="section-title mb-8">
			Ready to Transform<br />
			<span class="section-gradient">Your Revenue Operations?</span>
		</h2>
		<p class="section-subtitle mb-12 max-w-2xl mx-auto">
			Join leading enterprises that have modernized their revenue teams with AI-powered intelligence.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
			<button 
				onclick={onboardingStore.start}
				class="px-8 py-4 bg-white text-black rounded-lg font-semibold text-base hover:shadow-2xl hover:shadow-white/10 transition-all duration-300"
			>
				Start Free Trial
			</button>
			<a href="/contact-sales" class="px-8 py-4 bg-zinc-900/50 backdrop-blur-sm text-white rounded-lg font-semibold text-base border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300">
				Contact Sales
			</a>
		</div>
		<p class="text-sm text-zinc-500">Free 14-day trial • No credit card required • Enterprise support included</p>
	</div>
</section>

<!-- Footer -->
<footer class="bg-black text-white py-20 border-t border-zinc-900 relative overflow-hidden">
	<div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
		<div class="grid md:grid-cols-5 gap-12 mb-16">
			<div class="md:col-span-2">
				<div class="flex items-center gap-3 mb-6">
					<div class="bg-zinc-900 p-2 rounded-lg border border-zinc-800">
						<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="h-5 w-5 object-contain" />
					</div>
					<span class="text-lg font-semibold tracking-tight">
						SPIKED<span class="text-zinc-400">AI</span>
					</span>
				</div>
				<p class="text-sm text-zinc-500 mb-6 max-w-xs leading-relaxed">
					Enterprise revenue intelligence platform powered by AI. Transform how your team sells with real-time insights and automation.
				</p>
				<a
					href="https://www.linkedin.com/company/spiked-ai"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
				>
					<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
						<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
					</svg>
					Follow us on LinkedIn
				</a>
			</div>
			
			<div>
				<h4 class="font-semibold text-white mb-4 text-sm">Platform</h4>
				<ul class="space-y-3 text-sm text-zinc-500">
					<li><button class="hover:text-white transition-colors">Features</button></li>
					<li><button class="hover:text-white transition-colors">Integrations</button></li>
					<li><button class="hover:text-white transition-colors">Security</button></li>
					<li><button class="hover:text-white transition-colors">Documentation</button></li>
				</ul>
			</div>
			
			<div>
				<h4 class="font-semibold text-white mb-4 text-sm">Company</h4>
				<ul class="space-y-3 text-sm text-zinc-500">
					<li><button class="hover:text-white transition-colors">About</button></li>
					<li><button class="hover:text-white transition-colors">Customers</button></li>
					<li><button class="hover:text-white transition-colors">Pricing</button></li>
					<li><button class="hover:text-white transition-colors">Contact</button></li>
				</ul>
			</div>
			
			<div>
				<h4 class="font-semibold text-white mb-4 text-sm">Resources</h4>
				<ul class="space-y-3 text-sm text-zinc-500">
					<li><button class="hover:text-white transition-colors">Blog</button></li>
					<li><button class="hover:text-white transition-colors">Case Studies</button></li>
					<li><button class="hover:text-white transition-colors">Help Center</button></li>
					<li><button class="hover:text-white transition-colors">API Reference</button></li>
				</ul>
			</div>
		</div>
		
		<div class="border-t border-zinc-900 pt-8">
			<div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
				<div>© 2025 SpikedAI. All rights reserved.</div>
				<div class="flex gap-6">
					<button class="hover:text-white transition-colors">Privacy</button>
					<button class="hover:text-white transition-colors">Terms</button>
					<button class="hover:text-white transition-colors">Security</button>
				</div>
			</div>
		</div>
	</div>
</footer>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
	
	* {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.hero-title {
		font-size: clamp(3rem, 7vw, 5.5rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.1;
		color: #ffffff;
	}

	.hero-gradient {
		background: linear-gradient(135deg, #e5e5e5 0%, #a1a1aa 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.hero-subtitle {
		font-size: clamp(1.1rem, 1.5vw, 1.25rem);
		font-weight: 400;
		color: #a1a1aa;
		line-height: 1.7;
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.15;
		color: #ffffff;
	}

	.section-gradient {
		background: linear-gradient(135deg, #e5e5e5 0%, #a1a1aa 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.section-subtitle {
		font-size: 1.125rem;
		font-weight: 400;
		color: #71717a;
		line-height: 1.7;
	}

	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-stops));
	}

	@keyframes scan-slow {
		0% {
			transform: translateY(-100vh);
		}
		100% {
			transform: translateY(100vh);
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

	@keyframes fade-in-up {
		0% {
			opacity: 0;
			transform: translateY(20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes bounce-subtle {
		0%, 100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-6px);
		}
	}

	@keyframes scroll-indicator {
		0%, 100% {
			transform: translateY(0);
			opacity: 1;
		}
		50% {
			transform: translateY(4px);
			opacity: 0.5;
		}
	}
	
	.animate-scan-slow {
		animation: scan-slow 20s linear infinite;
	}

	.animate-fade-in {
		animation: fade-in 0.6s ease-out forwards;
		opacity: 0;
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.7s ease-out forwards;
		opacity: 0;
	}

	.animate-bounce-subtle {
		animation: bounce-subtle 3s infinite ease-in-out;
	}

	.animate-scroll-indicator {
		animation: scroll-indicator 2s infinite ease-in-out;
	}

	/* Custom scrollbar */
	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}

	::-webkit-scrollbar-track {
		background: #000;
	}

	::-webkit-scrollbar-thumb {
		background: #27272a;
		border-radius: 3px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #3f3f46;
	}
</style>

<OnboardingFlow />
