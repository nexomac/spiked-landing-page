<script>
	import FeatureNav from '$lib/components/features/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/features/FeatureFooter.svelte';
	import FollowupShowcase from '$lib/components/features/FollowupShowcase.svelte';
	import { Calendar, CheckCircle2, Clock, TrendingUp, FileText, Users, Star, ArrowRight, Video, Mic, Brain, Sparkles, MessageSquare, Target, Zap, Activity, Radio, Waves, Cpu, Network, Database, Shield, Lock, Eye, Scan, Play, ChevronRight, BarChart3, Globe, Layers, RefreshCw } from 'lucide-svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { fly, fade, scale, slide, blur } from 'svelte/transition';
	import { quintOut, elasticOut, cubicOut, backOut, expoOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	// Active feature for showcase
	let activeFeature = $state(0);
	let isAutoPlaying = $state(true);
	
	// Parallax and animation states
	let mouseX = $state(0);
	let mouseY = $state(0);
	let scrollY = $state(0);

	// Features data matching the Writer.com style
	const features = [
		{
			id: 0,
			label: 'Smart Preparation',
			title: 'Never walk in unprepared',
			description: 'Automatically compile everything you need before every meeting'
		},
		{
			id: 1,
			label: 'Context Recall',
			title: 'Full relationship history',
			description: 'Instantly recall every past conversation, commitment, and detail'
		},
		{
			id: 2,
			label: 'Action Tracking',
			title: 'Never drop the ball',
			description: 'Track commitments automatically and get reminded before follow-ups'
		}
	];

	// Email and PDF briefing data
	const emailSections = [
		{ icon: Target, title: 'Key Objectives', content: 'Budget approved at $250K. Need to address data migration concerns and provide ROI projections.' },
		{ icon: CheckCircle2, title: 'Action Items', content: '• Send security compliance documentation\n• Prepare detailed ROI projections\n• Create technical migration roadmap' },
		{ icon: Users, title: 'Stakeholders', content: 'Sarah Chen (Champion), John Davis (CTO - Concerns), Lisa Park (CFO - Decision Maker)' },
		{ icon: TrendingUp, title: 'Next Steps', content: 'Follow up by EOD with compliance docs. Schedule technical deep-dive for next week.' }
	];

	const pdfSections = [
		{ title: 'Meeting Summary', items: ['32 min call with 4 participants', 'Budget approved: $250K', 'Timeline: Q1 implementation'] },
		{ title: 'Stakeholder Mapping', items: ['Sarah Chen - VP Sales (Champion)', 'John Davis - CTO (Technical Blocker)', 'Lisa Park - CFO (Economic Buyer)'] },
		{ title: 'Battle Card Intelligence', items: ['Competitor: Gong (mentioned 2x)', 'Key objection: Data migration timeline', 'Winning factors: ROI & Security'] },
		{ title: 'PLAYBOOK Command Center', items: ['Discovery Phase: 75% complete', 'Technical Validation: Pending', 'Business Case: In Progress'] }
	];

	onMount(() => {
		// Handle mouse movement for parallax
		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};
		
		// Handle scroll for parallax
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function selectFeature(index) {
		activeFeature = index;
		isAutoPlaying = false;
	}
</script>

<style>
	/* Smooth scrollbar */
	.scrollbar-thin::-webkit-scrollbar {
		width: 4px;
	}
	.scrollbar-thin::-webkit-scrollbar-track {
		background: transparent;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.1);
		border-radius: 2px;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.2);
	}

	/* Gradient text */
	.gradient-text {
		background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Enhanced glass morphism with depth */
	.glass {
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.05);
		box-shadow: 
			0 8px 32px 0 rgba(0, 0, 0, 0.37),
			inset 0 1px 1px 0 rgba(255, 255, 255, 0.05);
	}

	/* Enhanced hover lift with smooth shadows */
	.hover-lift {
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	.hover-lift:hover {
		transform: translateY(-4px) scale(1.01);
		box-shadow: 
			0 20px 60px rgba(0, 0, 0, 0.4),
			0 0 40px rgba(239, 68, 68, 0.1);
	}

	/* Feature selector active state with glow */
	.feature-active {
		background: linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 100%);
		border-left: 3px solid #ef4444;
		box-shadow: -8px 0 24px rgba(239, 68, 68, 0.2);
	}

	/* Animated gradient border with shimmer */
	.animated-border {
		position: relative;
		background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
		animation: borderShimmer 3s ease-in-out infinite;
	}
	.animated-border::before {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: inherit;
		padding: 1px;
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(239, 68, 68, 0.1), transparent, rgba(239, 68, 68, 0.2));
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		animation: rotateBorder 4s linear infinite;
	}

	@keyframes borderShimmer {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	@keyframes rotateBorder {
		0% { background-position: 0% 50%; }
		100% { background-position: 200% 50%; }
	}

	/* Pulse animation with ring */
	@keyframes pulse-ring {
		0% { transform: scale(1); opacity: 1; }
		100% { transform: scale(1.5); opacity: 0; }
	}
	.pulse-ring::before {
		content: '';
		position: absolute;
		inset: -2px;
		border-radius: 50%;
		border: 2px solid currentColor;
		animation: pulse-ring 1.5s ease-out infinite;
	}

	/* Floating animation for decorative elements */
	@keyframes float {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		33% { transform: translateY(-20px) rotate(5deg); }
		66% { transform: translateY(-10px) rotate(-5deg); }
	}
	
	@keyframes float-slow {
		0%, 100% { transform: translateY(0px) translateX(0px); }
		50% { transform: translateY(-30px) translateX(10px); }
	}

	.float {
		animation: float 6s ease-in-out infinite;
	}
	
	.float-slow {
		animation: float-slow 8s ease-in-out infinite;
	}

	/* Glow effect for icons and cards */
	.glow-red {
		box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
	}
	
	.glow-red:hover {
		box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
	}

	/* Shimmer effect for text */
	@keyframes shimmer {
		0% { background-position: -1000px 0; }
		100% { background-position: 1000px 0; }
	}
	
	.shimmer {
		background: linear-gradient(90deg, 
			rgba(255, 255, 255, 0) 0%, 
			rgba(255, 255, 255, 0.3) 50%, 
			rgba(255, 255, 255, 0) 100%);
		background-size: 1000px 100%;
		animation: shimmer 3s infinite;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Particle background effect */
	.particle-bg {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
	}

	/* Enhanced grid pattern with depth */
	.depth-grid {
		background-image: 
			linear-gradient(rgba(239, 68, 68, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(239, 68, 68, 0.03) 1px, transparent 1px);
		background-size: 50px 50px;
		mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
	}

	/* Layered shadows for depth */
	.depth-shadow {
		box-shadow:
			0 1px 2px rgba(0, 0, 0, 0.2),
			0 4px 8px rgba(0, 0, 0, 0.15),
			0 8px 16px rgba(0, 0, 0, 0.1),
			0 16px 32px rgba(0, 0, 0, 0.05);
	}

	/* Smooth transitions for all interactive elements */
	* {
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Tilt effect on hover */
	.tilt-hover {
		transform-style: preserve-3d;
		transition: transform 0.3s ease;
	}
	
	.tilt-hover:hover {
		transform: perspective(1000px) rotateX(2deg) rotateY(-2deg);
	}
</style>

<svelte:head>
	<title>Follow-Up Meeting Preparation - SpikedAI</title>
	<meta name="description" content="Never miss important follow-up details. Automated preparation for your next meetings with context-aware briefings." />
</svelte:head>
	<FeatureNav currentFeature="followup" />

<div class="min-h-screen bg-black text-white overflow-hidden">
	<!-- Feature Navigation -->
	
	<!-- Animated Background Layer -->
	<div class="particle-bg fixed inset-0">
		<!-- Dynamic gradient orbs -->
		<div 
			class="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl float"
			style="transform: translate({mouseX * 20}px, {mouseY * 20}px)"
		></div>
		<div 
			class="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl float-slow"
			style="transform: translate({mouseX * -15}px, {mouseY * -15}px)"
		></div>
		<div 
			class="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"
			style="transform: translate({mouseX * 25}px, {mouseY * 25}px)"
		></div>
		
		<!-- Grid overlay with parallax -->
		<div 
			class="depth-grid absolute inset-0"
			style="transform: translateY({scrollY * 0.1}px)"
		></div>
	</div>
	
	<!-- Hero Section - Writer.com Style Split Layout -->
	<section class="relative min-h-screen pt-10 pb-24">
		<!-- Background gradient -->
		<div class="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black"></div>
		
		<div class="relative max-w-7xl mx-auto px-6">
			<!-- Split Layout Container -->
			<div class="grid lg:grid-cols-2 gap-16 items-start">
				
				<!-- Left Column - Content -->
				<div class="lg:sticky lg:top-32 z-10">
					<!-- Label with subtle animation -->
					<div 
						class="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full mb-8 hover:scale-105 transition-transform"
						in:fly={{ y: -20, duration: 600, delay: 100 }}
					>
						<Calendar class="w-4 h-4 text-red-500 animate-pulse" />
						<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Follow-Up Prep</span>
					</div>

					<!-- Main Headline with shimmer effect -->
					<h1 
						class="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
						in:fly={{ y: 20, duration: 700, delay: 200 }}
					>
						<span class="gradient-text block mb-2">AI that prepares you</span>
						<span class="text-white block">for every meeting</span>
					</h1>

					<!-- Three Feature Cards from Screenshot -->
					<div class="space-y-4 mb-10">
						<!-- Never walk in unprepared -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden"
							in:fly={{ y: 20, duration: 600, delay: 300 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/50 transition-colors">
									<FileText class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Never walk in unprepared</h3>
									<p class="text-sm text-zinc-400">Automatically compile everything you need before every meeting</p>
								</div>
							</div>
						</div>

						<!-- Full relationship history (highlighted) -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden border-l-2 border-red-500"
							in:fly={{ y: 20, duration: 600, delay: 400 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-red-500/5 via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
									<Brain class="w-5 h-5 text-red-500" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Full relationship history</h3>
									<p class="text-sm text-zinc-400">Instantly recall every past conversation, commitment, and detail</p>
								</div>
							</div>
						</div>

						<!-- Never drop the ball -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden"
							in:fly={{ y: 20, duration: 600, delay: 500 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/50 transition-colors">
									<CheckCircle2 class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Never drop the ball</h3>
									<p class="text-sm text-zinc-400">Track commitments automatically and get reminded before follow-ups</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Feature Selector List - Writer.com Style -->
					<div class="space-y-1 mb-10 hidden">
						{#each features as feature, index}
							<button
								onclick={() => selectFeature(index)}
								class="w-full text-left px-5 py-4 rounded-xl transition-all duration-500 group relative overflow-hidden {activeFeature === index ? 'feature-active' : 'hover:bg-zinc-900/50'}"
								in:fly={{ x: -30, duration: 600, delay: 300 + index * 100 }}
							>
								<!-- Animated background on hover -->
								<div class="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								
								<div class="flex items-start gap-4 relative z-10">
									<div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 {activeFeature === index ? 'bg-red-500/20 glow-red scale-110' : 'bg-zinc-800/50 group-hover:bg-zinc-800 group-hover:scale-105'}">
										{#if index === 0}
											<FileText class="w-5 h-5 {activeFeature === index ? 'text-red-500' : 'text-zinc-500 group-hover:text-zinc-400'} transition-all duration-300" />
										{:else if index === 1}
											<Brain class="w-5 h-5 {activeFeature === index ? 'text-red-500' : 'text-zinc-500 group-hover:text-zinc-400'} transition-all duration-300" />
										{:else}
											<CheckCircle2 class="w-5 h-5 {activeFeature === index ? 'text-red-500' : 'text-zinc-500 group-hover:text-zinc-400'} transition-all duration-300" />
										{/if}
									</div>
									<div>
										<h3 class="text-lg font-semibold mb-1 transition-all duration-300 {activeFeature === index ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}">
											{feature.title}
										</h3>
										<p class="text-sm transition-all duration-300 {activeFeature === index ? 'text-zinc-400' : 'text-zinc-600 group-hover:text-zinc-500'}">
											{feature.description}
										</p>
									</div>
								</div>
							</button>
						{/each}
					</div>

					<!-- CTA Link with hover effect -->
					<a 
						href="#learn-more" 
						class="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium group"
						in:fly={{ y: 20, duration: 600, delay: 700 }}
					>
						<span>Learn more about follow-up preparation</span>
						<ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
					</a>
				</div>

				<!-- Right Column - Product Showcase -->
				<FollowupShowcase
					bind:activeFeature
					bind:isAutoPlaying
					{mouseX}
					{mouseY}
					height="500px"
					showAppChrome={true}
				/>
			</div>
		</div>
	</section>

	<!-- Automated Deliverables Section - Email & PDF Showcase -->
	<section class="py-24 px-6 relative overflow-hidden border-t border-zinc-900">
		<!-- Background effects -->
		<div class="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>
		<div class="depth-grid absolute inset-0 opacity-30"></div>
		
		<div class="max-w-7xl mx-auto relative z-10">
			<!-- Section Header -->
			<div 
				class="text-center mb-16"
				in:fly={{ y: 30, duration: 700 }}
			>
				<div class="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full mb-6">
					<Sparkles class="w-4 h-4 text-red-500 animate-pulse" />
					<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Automated Deliverables</span>
				</div>
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
					Professional Briefings, <span class="text-red-500">Instantly Generated</span>
				</h2>
				<p class="text-lg text-zinc-400 max-w-2xl mx-auto">
					Every meeting automatically generates follow-up emails and executive briefing PDFs
				</p>
			</div>

			<!-- Email & PDF Grid -->
			<div class="grid lg:grid-cols-2 gap-8 items-start">
				
				<!-- Email Preview -->
				<div 
					class="relative"
					in:fly={{ x: -30, duration: 800, delay: 200 }}
				>
					<div class="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl float"></div>
					
					<div class="animated-border rounded-2xl overflow-hidden depth-shadow">
						<!-- Email Header -->
						<div class="bg-zinc-900/90 border-b border-zinc-800/50 px-4 py-3 backdrop-blur-xl">
							<div class="flex items-center gap-3">
								<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
									<MessageSquare class="w-4 h-4 text-white" />
								</div>
								<div class="flex-1">
									<p class="text-sm font-semibold text-white">Follow-Up Email</p>
									<p class="text-xs text-zinc-500">Auto-sent after meeting ends</p>
								</div>
								<div class="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-xs text-green-400 font-medium">
									Sent
								</div>
							</div>
						</div>

						<!-- Email Content -->
						<div class="bg-gradient-to-br from-zinc-950 to-zinc-900 p-6">
							<!-- Email Meta -->
							<div class="mb-6 pb-4 border-b border-zinc-800/50">
								<div class="flex items-center gap-2 text-sm mb-2">
									<span class="text-zinc-500">To:</span>
									<span class="text-white">sarah.chen@enterprisecorp.com</span>
								</div>
								<div class="flex items-center gap-2 text-sm mb-2">
									<span class="text-zinc-500">Subject:</span>
									<span class="text-white font-medium">Q1 Implementation Discussion - Next Steps</span>
								</div>
								<div class="flex items-center gap-2 text-sm">
									<span class="text-zinc-500">Generated:</span>
									<span class="text-zinc-400">26 Nov 2025, 21:42:31</span>
								</div>
							</div>

							<!-- Email Body -->
							<div class="space-y-5">
								<div class="glass rounded-lg p-4">
									<p class="text-sm text-zinc-300 leading-relaxed">
										Hi Sarah,
										<br/><br/>
										Thank you for the productive call today regarding your Q1 implementation. Here's a summary of our discussion and next steps.
									</p>
								</div>

								{#each emailSections as section, i}
									{@const Icon = section.icon}
									<div 
										class="glass rounded-lg p-4 hover-lift group cursor-pointer relative overflow-hidden"
										in:fly={{ y: 15, delay: i * 100, duration: 400 }}
									>
										<div class="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
										
										<div class="flex items-start gap-3 relative z-10">
											<div class="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
												<Icon class="w-4 h-4 text-red-500" />
											</div>
											<div>
												<h4 class="text-sm font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">{section.title}</h4>
												<p class="text-xs text-zinc-400 leading-relaxed whitespace-pre-line">{section.content}</p>
											</div>
										</div>
									</div>
								{/each}

								<div class="glass rounded-lg p-4">
									<p class="text-sm text-zinc-300 leading-relaxed">
										Looking forward to moving this forward together.
										<br/><br/>
										Best regards,
										<br/>
										<span class="font-semibold text-white">Your SpikedAI Assistant</span>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- PDF Preview -->
				<div 
					class="relative"
					in:fly={{ x: 30, duration: 800, delay: 400 }}
				>
					<div class="absolute -top-6 -right-6 w-32 h-32 bg-red-500/10 rounded-full blur-3xl float-slow"></div>
					
					<div class="animated-border rounded-2xl overflow-hidden depth-shadow">
						<!-- PDF Header -->
						<div class="bg-zinc-900/90 border-b border-zinc-800/50 px-4 py-3 backdrop-blur-xl">
							<div class="flex items-center gap-3">
								<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
									<FileText class="w-4 h-4 text-white" />
								</div>
								<div class="flex-1">
									<p class="text-sm font-semibold text-white">Executive Briefing PDF</p>
									<p class="text-xs text-zinc-500">Comprehensive meeting intelligence</p>
								</div>
								<button class="px-3 py-1 glass rounded-lg text-xs text-white hover:bg-zinc-800/70 transition-colors font-medium flex items-center gap-1">
									<span>Download</span>
									<ArrowRight class="w-3 h-3" />
								</button>
							</div>
						</div>

						<!-- PDF Content -->
						<div class="bg-gradient-to-br from-zinc-950 to-zinc-900 p-6">
							<!-- PDF Cover -->
							<div class="glass rounded-xl p-6 mb-4 relative overflow-hidden">
								<div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-full"></div>
								<div class="relative z-10">
									<div class="flex items-center gap-3 mb-4">
										<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center glow-red">
											<Zap class="w-5 h-5 text-white" />
										</div>
										<div>
											<h3 class="text-xl font-bold text-white">SpikedAI</h3>
											<p class="text-xs text-zinc-500">Meeting Intelligence Report</p>
										</div>
									</div>
									<div class="space-y-2">
										<div class="flex justify-between text-sm">
											<span class="text-zinc-500">Account:</span>
											<span class="text-white font-medium">Enterprise Corp</span>
										</div>
										<div class="flex justify-between text-sm">
											<span class="text-zinc-500">Date:</span>
											<span class="text-white font-medium">26 Nov 2025</span>
										</div>
										<div class="flex justify-between text-sm">
											<span class="text-zinc-500">Duration:</span>
											<span class="text-white font-medium">32 minutes</span>
										</div>
									</div>
								</div>
							</div>

							<!-- PDF Sections with data from image -->
							<div class="space-y-3">
								{#each pdfSections as section, i}
									<div 
										class="glass rounded-lg p-4 hover-lift group cursor-pointer relative overflow-hidden"
										in:fly={{ y: 15, delay: i * 100, duration: 400 }}
									>
										<div class="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
										
										<div class="relative z-10">
											<h4 class="text-sm font-bold text-white mb-3 group-hover:text-red-400 transition-colors flex items-center gap-2">
												{#if section.title === 'Meeting Summary'}
													<FileText class="w-4 h-4" />
												{:else if section.title === 'Stakeholder Mapping'}
													<Users class="w-4 h-4" />
												{:else if section.title === 'Battle Card Intelligence'}
													<Shield class="w-4 h-4" />
												{:else}
													<Target class="w-4 h-4" />
												{/if}
												{section.title}
											</h4>
											<div class="space-y-2">
												{#each section.items as item}
													<div class="flex items-start gap-2 text-xs">
														<div class="w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
														<span class="text-zinc-400 group-hover:text-zinc-300 transition-colors">{item}</span>
													</div>
												{/each}
											</div>
										</div>
									</div>
								{/each}

								<!-- PDF Footer -->
								<div class="glass rounded-lg p-3 flex items-center justify-between">
									<span class="text-xs text-zinc-500">Generated by SpikedAI</span>
									<span class="text-xs text-zinc-600 font-mono">Page 1 of 4</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Feature Highlights -->
			<div 
				class="mt-16 grid md:grid-cols-3 gap-6"
				in:fly={{ y: 30, duration: 700, delay: 600 }}
			>
				<div class="glass rounded-xl p-6 hover-lift group text-center">
					<div class="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
						<Zap class="w-6 h-6 text-blue-500" />
					</div>
					<h4 class="font-semibold text-white mb-2">Instant Delivery</h4>
					<p class="text-sm text-zinc-400">Follow-up emails sent within 60 seconds of meeting end</p>
				</div>

				<div class="glass rounded-xl p-6 hover-lift group text-center">
					<div class="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
						<Brain class="w-6 h-6 text-red-500 animate-pulse" />
					</div>
					<h4 class="font-semibold text-white mb-2">AI-Powered Insights</h4>
					<p class="text-sm text-zinc-400">Every section auto-generated from conversation analysis</p>
				</div>

				<div class="glass rounded-xl p-6 hover-lift group text-center">
					<div class="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
						<CheckCircle2 class="w-6 h-6 text-green-500" />
					</div>
					<h4 class="font-semibold text-white mb-2">Fully Customizable</h4>
					<p class="text-sm text-zinc-400">Edit, approve, or auto-send based on your preferences</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Testimonial Quote Section -->
	<section class="py-20 px-6 border-t border-zinc-900 relative overflow-hidden">
		<!-- Background effects -->
		<div class="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>
		<div 
			class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/5 rounded-full blur-3xl"
			style="transform: translate(calc(-50% + {mouseX * 30}px), calc(-50% + {mouseY * 30}px))"
		></div>
		
		<div class="max-w-4xl mx-auto text-center relative z-10">
			<blockquote 
				class="text-2xl md:text-3xl font-medium text-zinc-300 leading-relaxed mb-8 hover:text-white transition-colors duration-500"
				in:fly={{ y: 30, duration: 800 }}
			>
				"SpikedAI transforms how our team prepares for meetings—from scrambling to find context to walking in fully prepared with every detail at our fingertips."
			</blockquote>
			<div 
				class="flex items-center justify-center gap-4"
				in:fly={{ y: 20, duration: 600, delay: 200 }}
			>
				<div class="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold glow-red hover:scale-110 transition-transform cursor-pointer">
					JM
				</div>
				<div class="text-left">
					<p class="font-semibold text-white">Jennifer Martinez</p>
					<p class="text-sm text-zinc-500">VP of Sales, TechScale Inc.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Grid Section -->
	<section id="learn-more" class="py-24 px-6 relative overflow-hidden">
		<!-- Animated background -->
		<div class="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-zinc-950"></div>
		<div class="depth-grid absolute inset-0 opacity-50"></div>
		
		<div class="max-w-7xl mx-auto relative z-10">
			<div 
				class="text-center mb-16"
				in:fly={{ y: 30, duration: 700 }}
			>
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Everything You Need to Stay Prepared</h2>
				<p class="text-lg text-zinc-400 max-w-2xl mx-auto">Stop scrambling before meetings. Let AI do the heavy lifting.</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each [
					{ icon: FileText, title: 'Auto-Generated Briefings', desc: 'Comprehensive meeting prep documents created automatically from your conversation history.', color: 'red' },
					{ icon: CheckCircle2, title: 'Action Item Tracking', desc: 'Never forget a commitment. Track and follow up on all action items automatically.', color: 'green' },
					{ icon: TrendingUp, title: 'Context Awareness', desc: 'AI understands the full relationship history and surfaces relevant insights.', color: 'blue' },
					{ icon: Star, title: 'Smart Recommendations', desc: 'Get AI-suggested talking points tailored to each prospect\'s specific needs.', color: 'amber' },
					{ icon: Clock, title: 'Meeting Timeline', desc: 'Visual timeline of all interactions to quickly understand the relationship stage.', color: 'purple' },
					{ icon: Users, title: 'Stakeholder Insights', desc: 'Track key contacts, their concerns, and engagement levels across meetings.', color: 'cyan' }
				] as feature, i}
					{@const Icon = feature.icon}
					<div 
						class="glass rounded-2xl p-6 hover-lift group relative overflow-hidden cursor-pointer"
						in:fly={{ y: 30, delay: i * 100, duration: 600 }}
					>
						<!-- Hover gradient overlay -->
						<div class="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
						
						<div class="relative z-10">
							<div class="w-12 h-12 rounded-xl bg-{feature.color}-500/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 {feature.color === 'red' ? 'group-hover:shadow-lg group-hover:shadow-red-500/30' : ''}">
								<Icon class="w-6 h-6 text-{feature.color}-500 group-hover:animate-pulse" />
							</div>
							<h3 class="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">{feature.title}</h3>
							<p class="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">{feature.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-24 px-6 relative overflow-hidden">
		<!-- Animated background with parallax -->
		<div class="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>
		<div 
			class="absolute top-1/2 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl float"
			style="transform: translate({mouseX * -20}px, {mouseY * -20}px)"
		></div>
		<div 
			class="absolute bottom-1/2 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl float-slow"
			style="transform: translate({mouseX * 15}px, {mouseY * 15}px)"
		></div>
		
		<div class="max-w-4xl mx-auto text-center relative z-10">
			<h2 
				class="text-4xl md:text-5xl font-bold text-white mb-6 hover:scale-105 transition-transform duration-300"
				in:fly={{ y: 30, duration: 700 }}
			>
				Ready to Never Miss a Beat?
			</h2>
			<p 
				class="text-xl text-zinc-400 mb-12"
				in:fly={{ y: 20, duration: 600, delay: 100 }}
			>
				Join sales teams using AI to prepare for every conversation
			</p>
			
			<div 
				class="flex flex-wrap gap-4 justify-center"
				in:fly={{ y: 20, duration: 600, delay: 200 }}
			>
				<button 
					onclick={onboardingStore.start}
					class="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-semibold hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 hover:scale-110 inline-flex items-center gap-2 glow-red group relative overflow-hidden"
				>
					<!-- Shimmer effect on hover -->
					<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
					<span class="relative z-10">Get Started Free</span>
					<ArrowRight class="w-5 h-5 relative z-10 group-hover:translate-x-2 transition-transform" />
				</button>
				<a 
					href="/features" 
					class="px-8 py-4 glass rounded-xl font-semibold border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:scale-110 hover-lift group"
				>
					<span class="group-hover:text-red-400 transition-colors">Explore All Features</span>
				</a>
			</div>
		</div>
	</section>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="followup" />
</div>
