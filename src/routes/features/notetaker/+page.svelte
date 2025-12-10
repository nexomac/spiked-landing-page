<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { MessageSquare, Activity, Users, Calendar, FileText, Brain, Sparkles, Mail, Download, Zap, Target, TrendingUp, Clock, CheckCircle, AlertCircle, Send, FileSearch, BarChart3, Lightbulb, Settings, Bot, Share, ArrowRight, CheckCircle2, Layers, RefreshCw, Plus } from 'lucide-svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let activeTab = $state('templates');
	let selectedTemplate = $state(null);
	let hoveredTemplate = $state(null);
	let selectedCustomGoal = $state('status of jira');
	let showAIChat = $state(false);
	
	// Parallax and animation states
	let mouseX = $state(0);
	let mouseY = $state(0);
	let scrollY = $state(0);
	let isAutoPlaying = $state(true);
	
	onMount(() => {
		selectedTemplate = templates[0];
		
		const interval = setInterval(() => {
			if (isAutoPlaying && templates.length > 0) {
				const currentIndex = templates.findIndex(t => t.id === selectedTemplate?.id);
				selectedTemplate = templates[(currentIndex + 1) % templates.length];
			}
		}, 5000);
		
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
			clearInterval(interval);
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// AI Templates
	const templates = [
		{
			id: 'summary',
			icon: FileText,
			title: 'Meeting Summary',
			description: 'Generate comprehensive meeting summaries with action items',
			color: 'from-blue-500 to-blue-600'
		},
		{
			id: 'stakeholder',
			icon: Users,
			title: 'Stakeholder Mapping',
			description: 'Map and analyze key stakeholder relationships',
			color: 'from-green-500 to-green-600'
		},
		{
			id: 'battle-card',
			icon: Target,
			title: 'Battle Card Intelligence',
			description: 'Competitive intelligence and positioning',
			color: 'from-red-500 to-red-600'
		},
		{
			id: 'playbook',
			icon: Brain,
			title: 'MEDDIC Framework',
			description: 'Qualification framework analysis',
			color: 'from-purple-500 to-purple-600'
		},
		{
			id: 'crm-sync',
			icon: Activity,
			title: 'CRM Sync Studio',
			description: 'Synchronize and optimize CRM data',
			color: 'from-cyan-500 to-cyan-600'
		},
		{
			id: 'deal-health',
			icon: TrendingUp,
			title: 'Deal Health Monitor',
			description: 'Track and monitor deal progression',
			color: 'from-orange-500 to-orange-600'
		},
		{
			id: 'followup',
			icon: Mail,
			title: 'Follow-Up Email',
			description: 'Craft personalized follow-up emails',
			color: 'from-pink-500 to-pink-600'
		},
		{
			id: 'executive',
			icon: FileSearch,
			title: 'Executive Briefing',
			description: 'Generate executive summaries and briefs',
			color: 'from-indigo-500 to-indigo-600'
		}
	];

	// Custom Goals
	const customGoals = [
		{ 
			id: 'status of jira',
			title: 'Jira Status Tracker',
			description: 'Monitor project status and ticket progress',
			triggers: ['jira', 'tickets', 'status']
		},
		{ 
			id: 'economic buyer',
			title: 'Economic Buyer Identification',
			description: 'Identify decision makers and budget holders',
			triggers: ['budget', 'decision', 'authority']
		},
		{ 
			id: 'dhruv chirag working',
			title: 'Team Activity Monitor',
			description: 'Track what team members are working on',
			triggers: ['working on', 'assigned', 'task']
		},
		{ 
			id: 'owner notetaker',
			title: 'Project Ownership',
			description: 'Identify project owners and stakeholders',
			triggers: ['owner', 'responsible', 'lead']
		}
	];
</script>

<svelte:head>
	<title>Smart Notetaker | SpikedAI</title>
	<meta name="description" content="Automatically capture, transcribe, and analyze every conversation with SpikedAI's intelligent notetaker powered by conversational AI." />
</svelte:head>

<style>
	/* Custom scrollbar for template list */
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.02);
		border-radius: 3px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(239, 68, 68, 0.3);
		border-radius: 3px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background: rgba(239, 68, 68, 0.5);
	}

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

	.glass-subtle {
		background: rgba(255, 255, 255, 0.02);
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.03);
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

	/* Tilt effect on hover */
	.tilt-hover {
		transform-style: preserve-3d;
		transition: transform 0.3s ease;
	}
	
	.tilt-hover:hover {
		transform: perspective(1000px) rotateX(2deg) rotateY(-2deg);
	}

	/* Particle background effect */
	.particle-bg {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
	}
</style>

<div class="min-h-screen bg-black text-white overflow-hidden">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="notetaker" />
	
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
	<section class="relative min-h-screen pt-32 pb-24">
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
						<MessageSquare class="w-4 h-4 text-red-500 animate-pulse" />
						<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">AI-Powered Notetaker</span>
					</div>

					<!-- Main Headline with shimmer effect -->
					<h1 
						class="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
						in:fly={{ y: 20, duration: 700, delay: 200 }}
					>
						<span class="text-white block mb-2">Your Meetings,</span>
						<span class="gradient-text block">Supercharged by AI</span>
					</h1>

					<!-- Three Feature Cards -->
					<div class="space-y-4 mb-10">
						<!-- Auto-generate reports -->
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
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Auto-generate executive summaries</h3>
									<p class="text-sm text-zinc-400">Transform transcripts into actionable insights instantly</p>
								</div>
							</div>
						</div>

						<!-- AI-powered analysis (highlighted) -->
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
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Run custom AI analysis</h3>
									<p class="text-sm text-zinc-400">Build frameworks tailored to your specific needs</p>
								</div>
							</div>
						</div>

						<!-- Automated actions -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden"
							in:fly={{ y: 20, duration: 600, delay: 500 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/50 transition-colors">
									<Zap class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Take automatic actions</h3>
									<p class="text-sm text-zinc-400">Send follow-ups, sync to CRM, track stakeholders</p>
								</div>
							</div>
						</div>
					</div>

					<!-- CTA Link with hover effect -->
					<a 
						href="/" 
						class="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium group"
						in:fly={{ y: 20, duration: 600, delay: 700 }}
					>
						<span>Get started with AI Notetaker</span>
						<ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
					</a>
				</div>

				<!-- Right Column - Product Showcase -->
				<div 
					class="relative tilt-hover"
					in:fly={{ x: 30, duration: 800, delay: 400 }}
					style="transform: perspective(1000px) rotateY({mouseX * -2}deg) rotateX({mouseY * 2}deg)"
				>
					<!-- Floating decorative elements -->
					<div class="absolute -top-8 -right-8 w-32 h-32 bg-red-500/20 rounded-full blur-3xl float"></div>
					<div class="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl float-slow"></div>
					<!-- Floating decorative elements -->
					<div class="absolute -top-8 -right-8 w-32 h-32 bg-red-500/20 rounded-full blur-3xl float"></div>
					<div class="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl float-slow"></div>
					
					<!-- Main Product Interface with enhanced depth -->
					<div class="animated-border rounded-2xl overflow-hidden depth-shadow">
						<!-- App Chrome -->
						<div class="bg-zinc-900/90 border-b border-zinc-800/50 px-4 py-3 flex items-center justify-between backdrop-blur-xl">
							<div class="flex items-center gap-3">
								<div class="flex gap-1.5">
									<div class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors cursor-pointer"></div>
									<div class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
									<div class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-green-500 transition-colors cursor-pointer"></div>
								</div>
								<div class="flex items-center gap-2 px-3 py-1 glass rounded-lg hover:bg-zinc-800/70 transition-colors">
									<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="w-4 h-4 rounded-sm object-contain" />
									<span class="text-sm font-black tracking-tight text-white">
										SPIKED<span class="text-red-500">AI</span>
									</span>
								</div>
							</div>
							<div class="flex items-center gap-2">
								<button class="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all shadow-lg shadow-red-500/20">
									<Download class="w-3.5 h-3.5" />
									Save PDF
								</button>
								<button class="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/20">
									<Share class="w-3.5 h-3.5" />
									Share
								</button>
							</div>
						</div>

						<!-- Main Content Area -->
						<div class="bg-gradient-to-br from-zinc-950 to-zinc-900 p-1 relative overflow-hidden">
							<!-- Animated gradient overlay -->
							<div class="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-50 animate-pulse"></div>
							
							<div class="grid grid-cols-[280px_1fr] h-[600px] relative z-10">
								
								<!-- Left Sidebar -->
								<div class="border-r border-zinc-800/50 p-4 space-y-6 backdrop-blur-sm">
									<!-- Logo & New Session -->
									<div class="flex items-center justify-between">
										<div class="flex items-center gap-2 group cursor-pointer">
											<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center glow-red group-hover:scale-110 transition-transform">
												<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="w-4 h-4 rounded-sm object-contain" />
											</div>
											<span class="text-sm font-black tracking-tight text-white group-hover:text-red-400 transition-colors">
												SPIKED<span class="text-red-500 group-hover:text-red-400">AI</span>
											</span>
										</div>
									</div>

									<button class="w-full flex items-center gap-2 px-3 py-2 glass rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20">
										<Sparkles class="w-4 h-4" />
										<span>New Analysis</span>
									</button>

									<!-- Tab Switcher -->
									<div class="space-y-1">
										<button 
											onclick={() => activeTab = 'templates'}
											class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm group {activeTab === 'templates' ? 'glass text-white shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}"
										>
											<Layers class="w-4 h-4 {activeTab === 'templates' ? 'text-red-500 animate-pulse' : ''} group-hover:scale-110 transition-transform" />
											<span>Templates</span>
										</button>
										<button 
											onclick={() => activeTab = 'custom'}
											class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm group {activeTab === 'custom' ? 'glass text-white shadow-lg' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}"
										>
											<Target class="w-4 h-4 {activeTab === 'custom' ? 'text-red-500 animate-pulse' : ''} group-hover:scale-110 transition-transform" />
											<span>Custom Goals ({customGoals.length})</span>
										</button>
									</div>

									<!-- Sessions -->
									<div>
										<p class="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider mb-2 px-1">Recent</p>
										<div class="space-y-1">
											<button class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all duration-300 group glass text-red-400 shadow-md">
												<BarChart3 class="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
												<span class="truncate">Q4 Analysis</span>
											</button>
											<button class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all duration-300 group text-zinc-500 hover:text-zinc-400 hover:bg-zinc-800/30">
												<FileText class="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
												<span class="truncate">Client Meeting</span>
											</button>
											<button class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all duration-300 group text-zinc-500 hover:text-zinc-400 hover:bg-zinc-800/30">
												<RefreshCw class="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
												<span class="truncate">Weekly Sync</span>
											</button>
										</div>
									</div>
								</div>

								<!-- Main Panel - Dynamic Content Based on Active Tab -->
								<div class="p-5 overflow-hidden relative">
									<!-- Background ambient glow -->
									<div class="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-30"></div>
									
									{#if activeTab === 'templates'}
										<!-- Templates View -->
										<div class="relative h-full flex flex-col">
											<div class="mb-4">
												<h3 class="text-sm font-semibold text-white mb-1">Template Library</h3>
												<p class="text-xs text-zinc-500">Choose a pre-built analysis template</p>
											</div>

											<div class="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
												{#each templates as template}
													<button
														onclick={() => selectedTemplate = template}
														class="w-full text-left p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02] {selectedTemplate?.id === template.id ? 'glass border border-red-500/30 shadow-lg shadow-red-500/10' : 'glass-subtle hover:glass'}"
													>
														<div class="flex items-start gap-3">
															<div class="w-10 h-10 rounded-lg bg-gradient-to-br {template.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
																{#if template.icon}
																	<template.icon class="w-5 h-5 text-white" />
																{/if}
															</div>
															<div class="flex-1 min-w-0">
																<div class="flex items-center gap-2 mb-1">
																	<h4 class="font-semibold text-white text-sm group-hover:text-red-400 transition-colors">{template.title}</h4>
																	{#if selectedTemplate?.id === template.id}
																		<CheckCircle2 class="w-4 h-4 text-red-500 animate-pulse" />
																	{/if}
																</div>
																<p class="text-xs text-zinc-400 leading-relaxed">{template.description}</p>
															</div>
														</div>
													</button>
												{/each}
											</div>
										</div>
									{:else}
										<!-- Custom Goals View -->
										<div class="relative h-full flex flex-col">
											<div class="mb-4">
												<h3 class="text-sm font-semibold text-white mb-1">Custom Analysis Goals</h3>
												<p class="text-xs text-zinc-500">Personalized objectives for your team</p>
											</div>

											<div class="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
												{#each customGoals as goal}
													<div class="p-4 glass-subtle rounded-xl border border-zinc-800/50 hover:border-red-500/20 transition-all duration-300 group hover:glass">
														<div class="flex items-start gap-3">
															<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
																<Target class="w-4 h-4 text-white" />
															</div>
															<div class="flex-1 min-w-0">
																<h4 class="font-semibold text-white text-sm mb-1 group-hover:text-red-400 transition-colors">{goal.title}</h4>
																<p class="text-xs text-zinc-400 leading-relaxed mb-2">{goal.description}</p>
																<div class="flex flex-wrap gap-1.5">
																	{#each goal.triggers as trigger}
																		<span class="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
																			{trigger}
																		</span>
																	{/each}
																</div>
															</div>
														</div>
													</div>
												{/each}

												<!-- Add New Goal Button -->
												<button class="w-full p-4 rounded-xl border-2 border-dashed border-zinc-800 hover:border-red-500/50 transition-all duration-300 group hover:bg-zinc-900/50">
													<div class="flex items-center justify-center gap-2 text-zinc-500 group-hover:text-red-400">
														<Plus class="w-5 h-5 group-hover:scale-110 transition-transform" />
														<span class="text-sm font-medium">Add Custom Goal</span>
													</div>
												</button>
											</div>
										</div>
									{/if}
							</div>

							<!-- Right Panel - Output Display -->
							<div class="flex flex-col h-full">
								<!-- Header -->
								<div class="p-4 border-b border-zinc-800/50 backdrop-blur-sm">
									<div class="flex items-center justify-between mb-2">
										<div class="flex items-center gap-2">
											<Brain class="w-4 h-4 text-red-500 animate-pulse" />
											<h3 class="text-sm font-semibold text-white">AI Analysis Output</h3>
										</div>
										<div class="flex items-center gap-2">
											<button class="px-3 py-1.5 glass rounded-lg text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
												<Download class="w-3.5 h-3.5" />
												<span>Export PDF</span>
											</button>
											<button class="px-3 py-1.5 glass rounded-lg text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5">
												<Share class="w-3.5 h-3.5" />
												<span>Share</span>
											</button>
										</div>
									</div>
									{#if selectedTemplate}
										<p class="text-xs text-zinc-500">Template: <span class="text-red-400">{selectedTemplate.title}</span></p>
									{/if}
								</div>

								<!-- Content -->
								<div class="flex-1 overflow-y-auto p-5 custom-scrollbar">
									{#if selectedTemplate}
										<!-- Template output content -->
										<div class="space-y-4">
											<!-- Summary Card -->
											<div class="glass rounded-xl p-4 border border-zinc-800/50">
												<div class="flex items-center gap-2 mb-3">
													<div class="w-8 h-8 rounded-lg bg-gradient-to-br {selectedTemplate.color} flex items-center justify-center">
														{#if selectedTemplate.icon}
															<selectedTemplate.icon class="w-4 h-4 text-white" />
														{/if}
													</div>
													<h4 class="font-semibold text-white text-sm">{selectedTemplate.title}</h4>
												</div>
												<p class="text-xs text-zinc-400 leading-relaxed mb-4">
													AI-generated analysis based on meeting transcript using the <span class="text-red-400">{selectedTemplate.title}</span> template framework.
												</p>

												<!-- Key Insights -->
												<div class="space-y-3">
													<div class="flex items-start gap-3">
														<div class="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
															<CheckCircle2 class="w-3.5 h-3.5 text-red-400" />
														</div>
														<div>
															<h5 class="text-xs font-semibold text-white mb-1">Key Discussion Points</h5>
															<p class="text-xs text-zinc-400 leading-relaxed">
																Product roadmap priorities for Q4, technical architecture review, and customer feedback integration strategy.
															</p>
														</div>
													</div>

													<div class="flex items-start gap-3">
														<div class="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
															<CheckCircle2 class="w-3.5 h-3.5 text-blue-400" />
														</div>
														<div>
															<h5 class="text-xs font-semibold text-white mb-1">Action Items</h5>
															<ul class="space-y-1.5">
																<li class="text-xs text-zinc-400 flex items-start gap-2">
																	<span class="text-red-500">•</span>
																	<span><strong class="text-white">John:</strong> Finalize API documentation by Friday</span>
																</li>
																<li class="text-xs text-zinc-400 flex items-start gap-2">
																	<span class="text-red-500">•</span>
																	<span><strong class="text-white">Sarah:</strong> Schedule follow-up with design team</span>
																</li>
																<li class="text-xs text-zinc-400 flex items-start gap-2">
																	<span class="text-red-500">•</span>
																	<span><strong class="text-white">Team:</strong> Review pricing strategy proposal</span>
																</li>
															</ul>
														</div>
													</div>

													<div class="flex items-start gap-3">
														<div class="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
															<CheckCircle2 class="w-3.5 h-3.5 text-green-400" />
														</div>
														<div>
															<h5 class="text-xs font-semibold text-white mb-1">Decisions Made</h5>
															<p class="text-xs text-zinc-400 leading-relaxed">
																Approved migration to new infrastructure Q4. Budget allocated for additional engineering resources. Go-live date set for October 15th.
															</p>
														</div>
													</div>

													<div class="flex items-start gap-3">
														<div class="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
															<Target class="w-3.5 h-3.5 text-purple-400" />
														</div>
														<div>
															<h5 class="text-xs font-semibold text-white mb-1">Next Steps</h5>
															<p class="text-xs text-zinc-400 leading-relaxed">
																Schedule technical deep-dive session next week. Prepare stakeholder presentation for board meeting. Update project timeline based on new requirements.
															</p>
														</div>
													</div>
												</div>
											</div>

											<!-- Stakeholder Analysis (if applicable) -->
											{#if selectedTemplate.id === 'stakeholder'}
												<div class="glass rounded-xl p-4 border border-zinc-800/50">
													<div class="flex items-center gap-2 mb-3">
														<Users class="w-4 h-4 text-green-500" />
														<h4 class="font-semibold text-white text-sm">Stakeholder Map</h4>
													</div>
													<div class="space-y-2">
														<div class="flex items-center gap-3 p-2 rounded-lg bg-zinc-900/50">
															<div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-xs font-bold text-white">
																JD
															</div>
															<div class="flex-1">
																<p class="text-xs font-semibold text-white">John Doe</p>
																<p class="text-[10px] text-zinc-500">Decision Maker • High Influence</p>
															</div>
														</div>
														<div class="flex items-center gap-3 p-2 rounded-lg bg-zinc-900/50">
															<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
																SM
															</div>
															<div class="flex-1">
																<p class="text-xs font-semibold text-white">Sarah Miller</p>
																<p class="text-[10px] text-zinc-500">Technical Champion • Medium Influence</p>
															</div>
														</div>
													</div>
												</div>
											{/if}

											<!-- Action Buttons -->
											<div class="flex gap-2">
												<button class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-semibold rounded-xl transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/40">
													<Mail class="w-4 h-4" />
													<span>Send Follow-Up</span>
												</button>
												<button class="flex-1 flex items-center justify-center gap-2 px-4 py-3 glass hover:bg-zinc-800/50 text-white text-xs font-semibold rounded-xl transition-all">
													<Activity class="w-4 h-4" />
													<span>Sync to CRM</span>
												</button>
											</div>
										</div>
									{:else}
										<!-- Empty state -->
										<div class="h-full flex items-center justify-center">
											<div class="text-center max-w-xs">
												<div class="w-16 h-16 rounded-2xl glass mx-auto mb-4 flex items-center justify-center">
													<FileText class="w-8 h-8 text-zinc-600" />
												</div>
												<h4 class="font-semibold text-white text-sm mb-2">No Template Selected</h4>
												<p class="text-xs text-zinc-500 leading-relaxed">
													Choose a template or custom goal from the sidebar to generate AI-powered insights.
												</p>
											</div>
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</section>

	<!-- Key Features Grid -->
	<section class="py-20 bg-zinc-950/50">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Beyond Basic Transcription</h2>
				<p class="text-lg text-zinc-400 max-w-2xl mx-auto">While others just record, SpikedAI transforms your meetings into actionable intelligence</p>
			</div>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<FileText class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">9+ Prebuilt AI Templates</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						One-click generation of executive summaries, stakeholder maps, battle cards, deal health reports, MEDDIC playbooks, and more. No manual work required.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-blue-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Target class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Custom Analysis Goals</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Create your own AI analysis templates. Track specific questions, detect evidence, monitor project status, or extract any custom insight from transcripts.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-purple-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Mail class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Agentic Email Composer</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						AI automatically drafts personalized follow-up emails with action items, key decisions, and next steps. Review and send in seconds.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-green-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Activity class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Auto-Sync to CRM</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Meeting insights automatically populate your CRM. Salesforce, HubSpot, monday.com, or custom systems—no manual data entry ever again.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-orange-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<BarChart3 class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Export Professional PDFs</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Generate beautifully formatted PDF reports with your selected templates. Perfect for sharing with executives and stakeholders.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-cyan-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Brain class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Conversational AI Assistant</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Ask questions about your meeting in natural language. "What did Sarah say about pricing?" AI finds and explains instantly.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-pink-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-600 to-pink-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Users class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Speaker Intelligence</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Automatic speaker identification, talk-time analytics, sentiment analysis per person, and participant-specific insights.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-indigo-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<TrendingUp class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Deal Health Monitoring</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Track deal progression automatically. AI detects buying signals, risks, champion engagement, and next-step commitments.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-teal-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Clock class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Real-Time Processing</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						All analysis happens during the call. The moment your meeting ends, insights, emails, and reports are ready to use.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Comparison Section -->
	<section class="py-20">
		<div class="max-w-6xl mx-auto px-6">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">SpikedAI vs. Other Notetakers</h2>
				<p class="text-lg text-zinc-400">See why teams are switching from Otter, Fireflies, and others</p>
			</div>

			<div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
				<table class="w-full">
					<thead class="bg-zinc-950 border-b border-zinc-800">
						<tr>
							<th class="px-6 py-4 text-left text-sm font-bold text-white">Feature</th>
							<th class="px-6 py-4 text-center text-sm font-bold text-white">
								<div class="flex items-center justify-center gap-2">
									<span class="w-6 h-6 rounded bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
										<Sparkles class="w-3.5 h-3.5 text-white" />
									</span>
									SpikedAI
								</div>
							</th>
							<th class="px-6 py-4 text-center text-sm font-semibold text-zinc-400">Otter</th>
							<th class="px-6 py-4 text-center text-sm font-semibold text-zinc-400">Fireflies</th>
							<th class="px-6 py-4 text-center text-sm font-semibold text-zinc-400">Others</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-800">
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">Real-time Transcription</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">9+ Prebuilt AI Templates</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">Custom Analysis Goals</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">AI Follow-Up Email Generation</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">Auto-Sync to CRM</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Limited</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Limited</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">Professional PDF Export</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">Conversational AI Assistant</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors bg-red-950/20">
							<td class="px-6 py-4 text-sm font-bold text-white">Agentic Actions (Take Action, Not Just Notes)</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-red-500 mx-auto animate-pulse" /></td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 bg-gradient-to-br from-red-950/20 to-zinc-950">
		<div class="max-w-4xl mx-auto px-6 text-center">
			<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-500/30">
				<Zap class="w-8 h-8 text-white" />
			</div>
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Stop Taking Notes.<br/>Start Taking Action.</h2>
			<p class="text-xl text-zinc-400 mb-8 leading-relaxed">
				While your competitors are still copying & pasting from Otter, you'll be auto-sending follow-ups, syncing CRM data, and generating executive reports—all powered by AI.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105">
					<Sparkles class="w-5 h-5" />
					Start Free Trial
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</a>
				<a href="/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-all border border-zinc-700 hover:border-zinc-600">
					<Calendar class="w-5 h-5" />
					Book a Demo
				</a>
			</div>
			<p class="text-sm text-zinc-500 mt-6">No credit card required • Set up in 5 minutes • Cancel anytime</p>
		</div>
	</section>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="notetaker" />
</div>
