<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { Sparkles, MessageSquare, Brain, FileText, Users, Calendar, ArrowRight, Zap, Target, CheckCircle2, TrendingUp, Clock, BarChart3 } from 'lucide-svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	// Track selected question - default to 'roi'
	let selectedQuestion = $state('roi');
	// Track hovered question for preview
	let hoveredQuestion = $state(null);
	
	// Parallax and animation states
	let mouseX = $state(0);
	let mouseY = $state(0);
	let scrollY = $state(0);

	// Auto-rotate questions for demo
	let isAutoPlaying = $state(true);
	
	onMount(() => {
		const questionTypes = ['roi', 'pricing', 'security', 'customization', 'integrations'];
		const interval = setInterval(() => {
			if (isAutoPlaying) {
				const currentIndex = questionTypes.indexOf(selectedQuestion);
				selectedQuestion = questionTypes[(currentIndex + 1) % questionTypes.length];
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

	// Dialogue data with questions and AI responses
	const dialogues = [
		{
			id: 1,
			speaker: 'Sarah Peterson',
			initials: 'SP',
			time: '10:30 AM',
			text: 'Hi! Thanks for taking the time to speak with me today.',
			isUser: false,
			color: 'blue'
		},
		{
			id: 2,
			speaker: 'You',
			initials: 'ME',
			time: '10:30 AM',
			text: 'Of course! I\'m excited to learn more about your team and see how we can help.',
			isUser: true,
			color: 'green'
		},
		{
			id: 3,
			speaker: 'Sarah Peterson',
			initials: 'SP',
			time: '10:31 AM',
			text: 'So we\'re a Series B company with about 50 sales reps, and we\'re looking to scale our sales operations. Right now, our biggest challenge is consistency across the team.',
			isUser: false,
			color: 'blue'
		},
		{
			id: 4,
			speaker: 'You',
			initials: 'ME',
			time: '10:31 AM',
			text: 'That\'s a common challenge at your stage. What does inconsistency look like for your team specifically?',
			isUser: true,
			color: 'green'
		},
		{
			id: 5,
			speaker: 'Sarah Peterson',
			initials: 'SP',
			time: '10:32 AM',
			text: 'Well, our top performers close at 28%, but most of the team is around 12-15%. We think it\'s because newer reps just don\'t have the product knowledge yet.',
			isUser: false,
			color: 'blue'
		},
		{
			id: 6,
			speaker: 'You',
			initials: 'ME',
			time: '10:32 AM',
			text: 'That makes sense. How long does it typically take for a new rep to ramp up?',
			isUser: true,
			color: 'green'
		},
		{
			id: 7,
			speaker: 'Sarah Peterson',
			initials: 'SP',
			time: '10:33 AM',
			text: 'About 4-5 months before they\'re really productive. Which is honestly too long.',
			isUser: false,
			color: 'blue'
		},
		{
			id: 8,
			speaker: 'You',
			initials: 'ME',
			time: '10:33 AM',
			text: 'Definitely. Our customers typically see ramp time cut in half with real-time AI assistance during calls.',
			isUser: true,
			color: 'green'
		},
		{
			id: 9,
			speaker: 'Sarah Peterson',
			initials: 'SP',
			time: '10:34 AM',
			text: 'That sounds promising. We\'re actually evaluating a few different tools. Can you walk me through how your pricing compares to Gong or Chorus?',
			isUser: false,
			color: 'blue',
			isQuestion: true,
			questionType: 'pricing'
		},
		{
			id: 10,
			speaker: 'You',
			initials: 'ME',
			time: '10:34 AM',
			text: 'Great question. Let me pull up our competitive comparison for you...',
			isUser: true,
			color: 'green'
		},
		{
			id: 11,
			speaker: 'Sarah Peterson',
			initials: 'SP',
			time: '10:35 AM',
			text: 'Also, what kind of ROI are your customers typically seeing?',
			isUser: false,
			color: 'blue',
			isQuestion: true,
			questionType: 'roi'
		},
		{
			id: 12,
			speaker: 'You',
			initials: 'ME',
			time: '10:35 AM',
			text: 'Let me share some specific data on that...',
			isUser: true,
			color: 'green'
		},
		{
			id: 13,
			speaker: 'Sarah Peterson',
			initials: 'SP',
			time: '10:36 AM',
			text: 'Interesting. How does the onboarding process work? I want to make sure we don\'t disrupt our team too much.',
			isUser: false,
			color: 'blue'
		},
		{
			id: 14,
			speaker: 'You',
			initials: 'ME',
			time: '10:36 AM',
			text: 'The onboarding is actually very lightweight. Most teams are up and running within a week.',
			isUser: true,
			color: 'green'
		},
		{
			id: 15,
			speaker: 'Sarah Peterson',
			initials: 'SP',
			time: '10:37 AM',
			text: 'What about data security? We handle sensitive customer information.',
			isUser: false,
			color: 'blue',
			isQuestion: true,
			questionType: 'security'
		},
		{
			id: 16,
			speaker: 'You',
			initials: 'ME',
			time: '10:37 AM',
			text: 'Security is a top priority for us. Let me explain our compliance...',
			isUser: true,
			color: 'green'
		},
		{
			id: 17,
			speaker: 'Sarah Peterson',
			initials: 'SP',
			time: '10:38 AM',
			text: 'Good to know. Can the AI handle industry-specific terminology? We\'re in healthcare tech.',
			isUser: false,
			color: 'blue',
			isQuestion: true,
			questionType: 'customization'
		},
		{
			id: 18,
			speaker: 'You',
			initials: 'ME',
			time: '10:39 AM',
			text: 'Absolutely, we have several healthcare customers. The AI learns your specific terminology.',
			isUser: true,
			color: 'green'
		},
		{
			id: 19,
			speaker: 'Sarah Peterson',
			initials: 'SP',
			time: '10:40 AM',
			text: 'What kind of integrations do you offer? We use Salesforce and Slack.',
			isUser: false,
			color: 'blue',
			isQuestion: true,
			questionType: 'integrations'
		},
		{
			id: 20,
			speaker: 'You',
			initials: 'ME',
			time: '10:40 AM',
			text: 'Perfect, we integrate with both of those natively.',
			isUser: true,
			color: 'green'
		}
	];

	// AI Response data for each question type
	const aiResponses = {
		pricing: {
			question: 'How does pricing compare to Gong or Chorus?',
			title: 'Competitive Pricing Comparison',
			description: 'Based on our competitive pricing analysis:',
			points: [
				{ label: 'SpikedAI pricing', value: '$90/user/month (annual)' },
				{ label: 'Gong pricing', value: '$120-150/user/month' },
				{ label: 'Chorus.ai pricing', value: '$100-130/user/month' },
				{ label: 'Our advantage', value: '25-40% cost savings + more features' }
			],
			source: 'Competitive_Pricing_Analysis_2025.pdf',
			timestamp: '10:34 AM'
		},
		roi: {
			question: 'What ROI are customers typically seeing?',
			title: 'Enterprise Customer ROI Results',
			description: 'Based on our 2025 enterprise customer case studies:',
			points: [
				{ label: 'Average deal size increase', value: '23% within first 6 months' },
				{ label: 'Sales cycle reduction', value: '31% shorter time to close' },
				{ label: 'Rep productivity', value: '2.7x more deals per rep per quarter' },
				{ label: 'Ramp time improvement', value: '50% faster time to productivity' }
			],
			source: 'Enterprise_ROI_CaseStudies_2025.pdf',
			timestamp: '10:35 AM'
		},
		security: {
			question: 'What about data security and compliance?',
			title: 'Security & Compliance Overview',
			description: 'Our comprehensive security infrastructure includes:',
			points: [
				{ label: 'Certifications', value: 'SOC 2 Type II, GDPR, HIPAA compliant' },
				{ label: 'Data encryption', value: 'AES-256 at rest, TLS 1.3 in transit' },
				{ label: 'Data residency', value: 'Choose US, EU, or AU data centers' },
				{ label: 'Access controls', value: 'SSO, MFA, role-based permissions' }
			],
			source: 'Security_Compliance_Documentation.pdf',
			timestamp: '10:37 AM'
		},
		customization: {
			question: 'Can AI handle industry-specific terminology?',
			title: 'Custom Industry Training',
			description: 'Our AI customization capabilities include:',
			points: [
				{ label: 'Training approach', value: 'Upload docs, AI learns terminology in 24hrs' },
				{ label: 'Healthcare clients', value: '15+ healthcare tech companies' },
				{ label: 'Accuracy rate', value: '97% with custom terminology' },
				{ label: 'Update frequency', value: 'Real-time sync with knowledge base' }
			],
			source: 'Healthcare_Customer_Success_Stories.pdf',
			timestamp: '10:39 AM'
		},
		integrations: {
			question: 'What integrations do you offer?',
			title: 'Native Integrations Available',
			description: 'Seamless connections with your existing tech stack:',
			points: [
				{ label: 'CRM platforms', value: 'Salesforce, HubSpot, monday.com' },
				{ label: 'Communication', value: 'Slack, MS Teams, Zoom' },
				{ label: 'Setup time', value: 'OAuth connection in under 5 minutes' },
				{ label: 'Custom API', value: 'REST API for custom integrations' }
			],
			source: 'Integration_Documentation.pdf',
			timestamp: '10:40 AM'
		}
	};

	function selectQuestion(questionType) {
		selectedQuestion = questionType;
		isAutoPlaying = false;
	}

	function handleMouseEnter(questionType) {
		if (questionType) {
			hoveredQuestion = questionType;
		}
	}

	function handleMouseLeave() {
		hoveredQuestion = null;
	}
</script>

<svelte:head>
	<title>Real-Time AI Assistance | SpikedAI</title>
	<meta name="description" content="Get instant, contextual answers during your sales calls with SpikedAI's real-time assistance based on your sales and solutions docs." />
</svelte:head>

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
	<FeatureNav currentFeature="ai-assistance" />
	
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
						<Sparkles class="w-4 h-4 text-red-500 animate-pulse" />
						<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">AI Assistance</span>
					</div>

					<!-- Main Headline with shimmer effect -->
					<h1 
						class="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
						in:fly={{ y: 20, duration: 700, delay: 200 }}
					>
						<span class="gradient-text block mb-2">Real-time AI answers</span>
						<span class="text-white block">from your sales docs</span>
					</h1>

					<!-- Three Feature Cards -->
					<div class="space-y-4 mb-10">
						<!-- Instant answers during calls -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden"
							in:fly={{ y: 20, duration: 600, delay: 300 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/50 transition-colors">
									<Brain class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Instant answers during calls</h3>
									<p class="text-sm text-zinc-400">Get contextual responses from your sales docs in real-time</p>
								</div>
							</div>
						</div>

						<!-- Powered by your knowledge base (highlighted) -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden border-l-2 border-red-500"
							in:fly={{ y: 20, duration: 600, delay: 400 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-red-500/5 via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
									<MessageSquare class="w-5 h-5 text-red-500" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Powered by your knowledge base</h3>
									<p class="text-sm text-zinc-400">AI trained on your specific sales and solutions documentation</p>
								</div>
							</div>
						</div>

						<!-- Never miss a detail -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden"
							in:fly={{ y: 20, duration: 600, delay: 500 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/50 transition-colors">
									<FileText class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Never miss a detail</h3>
									<p class="text-sm text-zinc-400">Handle objections and technical questions with confidence</p>
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
						<span>Get started with AI assistance</span>
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
								<div class="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/40 border border-amber-900/50 rounded-full">
									<div class="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
									<span class="text-xs font-medium text-amber-400">LISTENING</span>
								</div>
							</div>
						</div>

						<!-- Main Content Area -->
						<div class="bg-gradient-to-br from-zinc-950 to-zinc-900 p-1 relative overflow-hidden">
							<!-- Animated gradient overlay -->
							<div class="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-50 animate-pulse"></div>
							
							<div class="grid grid-cols-[1fr_1.2fr] h-[600px] relative z-10">
								
								<!-- Left Panel: Live Transcription -->
								<div class="border-r border-zinc-800/50 flex flex-col bg-zinc-950/50">
									<div class="px-3 py-2 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
										<div class="flex items-center gap-2">
											<MessageSquare class="w-4 h-4 text-blue-400" />
											<span class="text-xs font-semibold text-white">Live Transcription</span>
										</div>
										<span class="text-xs text-zinc-500">Real-time</span>
									</div>
									
									<div class="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
										<!-- Show only the last few relevant dialogues -->
										{#each dialogues.slice(-8) as dialogue, i}
											<button
												onclick={() => dialogue.isQuestion && selectQuestion(dialogue.questionType)}
												class="flex gap-2 group p-2 rounded-lg transition-all w-full text-left relative {dialogue.isQuestion ? 'bg-blue-950/20 border border-blue-900/50 hover:bg-blue-950/40 hover:border-blue-800/70 cursor-pointer hover:scale-[1.02]' : 'bg-zinc-800/20 hover:bg-zinc-800/30 cursor-default'} {selectedQuestion === dialogue.questionType ? 'ring-2 ring-red-500/50 bg-blue-950/30' : ''}"
												in:fly={{ y: 10, delay: i * 50, duration: 300 }}
											>
												<div class="w-6 h-6 rounded-full bg-gradient-to-br {dialogue.isUser ? 'from-green-600 to-green-700' : 'from-blue-600 to-blue-700'} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
													{dialogue.initials}
												</div>
												<div class="flex-1 min-w-0">
													<div class="flex items-center gap-2 mb-0.5">
														<span class="text-xs font-semibold text-white">{dialogue.speaker}</span>
														<span class="text-[10px] text-zinc-600">{dialogue.time}</span>
														{#if dialogue.isQuestion}
															<span class="px-1.5 py-0.5 bg-blue-600/40 border border-blue-500/50 text-[9px] font-bold text-blue-300 rounded animate-pulse">QUESTION</span>
														{/if}
													</div>
													<p class="text-xs {dialogue.isQuestion ? 'text-zinc-200 font-medium' : 'text-zinc-400'} leading-relaxed">{dialogue.text}</p>
												</div>
												{#if dialogue.isQuestion}
													<div class="absolute -right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
														<Sparkles class="w-4 h-4 text-red-500 animate-pulse" />
													</div>
												{/if}
											</button>
										{/each}
									</div>
								</div>

								<!-- Right Panel: AI Copilot -->
								<div class="flex flex-col bg-gradient-to-br from-zinc-950 to-zinc-900">
									<div class="px-3 py-2 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
										<div class="flex items-center gap-2">
											<Sparkles class="w-4 h-4 text-red-500 animate-pulse" />
											<span class="text-xs font-semibold text-white">AI Copilot</span>
										</div>
										<div class="flex items-center gap-1.5 px-2 py-1 glass rounded-full">
											<Brain class="w-3 h-3 text-red-400" />
											<span class="text-[10px] font-medium text-red-400">Auto-Answer: ON</span>
										</div>
									</div>

									<div class="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
										<!-- Question Selector Tabs -->
										<div class="flex gap-1.5 flex-wrap mb-3">
											<button 
												onclick={() => selectQuestion('roi')}
												class="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all {selectedQuestion === 'roi' ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50' : 'glass text-zinc-500 hover:text-zinc-300'}"
											>
												ROI
											</button>
											<button 
												onclick={() => selectQuestion('pricing')}
												class="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all {selectedQuestion === 'pricing' ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50' : 'glass text-zinc-500 hover:text-zinc-300'}"
											>
												Pricing
											</button>
											<button 
												onclick={() => selectQuestion('security')}
												class="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all {selectedQuestion === 'security' ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50' : 'glass text-zinc-500 hover:text-zinc-300'}"
											>
												Security
											</button>
											<button 
												onclick={() => selectQuestion('customization')}
												class="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all {selectedQuestion === 'customization' ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50' : 'glass text-zinc-500 hover:text-zinc-300'}"
											>
												Custom
											</button>
											<button 
												onclick={() => selectQuestion('integrations')}
												class="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all {selectedQuestion === 'integrations' ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50' : 'glass text-zinc-500 hover:text-zinc-300'}"
											>
												Integrations
											</button>
										</div>

										<!-- AI Response Card -->
										{#if aiResponses[selectedQuestion]}
											{@const response = aiResponses[selectedQuestion]}
											<div class="glass rounded-xl p-3 hover-lift relative overflow-hidden" in:fade={{ duration: 300 }}>
												<div class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-50"></div>
												
												<div class="relative z-10">
													<!-- Question Header -->
													<div class="flex items-start gap-2 mb-3 pb-2 border-b border-zinc-800/50">
														<Target class="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
														<div class="flex-1">
															<p class="text-xs font-semibold text-white mb-1">{response.question}</p>
															<p class="text-[10px] text-zinc-500">AI-generated from knowledge base</p>
														</div>
													</div>

													<!-- Response Title -->
													<h4 class="text-xs font-bold text-red-400 mb-2">{response.title}</h4>
													<p class="text-[10px] text-zinc-400 mb-3">{response.description}</p>

													<!-- Data Points -->
													<div class="space-y-2">
														{#each response.points as point, i}
															<div 
																class="glass rounded-lg p-2 group hover:bg-zinc-800/50 transition-all cursor-pointer"
																in:fly={{ x: -10, delay: i * 50, duration: 300 }}
															>
																<div class="flex items-start justify-between gap-2">
																	<span class="text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors">{point.label}</span>
																	<span class="text-[10px] font-semibold text-white flex-shrink-0">{point.value}</span>
																</div>
															</div>
														{/each}
													</div>

													<!-- Source Footer -->
													<div class="flex items-center gap-2 mt-3 pt-2 border-t border-zinc-800/50">
														<FileText class="w-3 h-3 text-zinc-600" />
														<span class="text-[9px] text-zinc-600">{response.source}</span>
														<span class="ml-auto text-[9px] text-zinc-700">{response.timestamp}</span>
													</div>
												</div>
											</div>
										{/if}

										<!-- Quick Actions -->
										<div class="grid grid-cols-2 gap-2 mt-3">
											<button class="glass rounded-lg p-2 text-[10px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all flex items-center justify-center gap-1.5 group">
												<CheckCircle2 class="w-3 h-3 group-hover:scale-110 transition-transform" />
												Copy to Clipboard
											</button>
											<button class="glass rounded-lg p-2 text-[10px] font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all flex items-center justify-center gap-1.5 group">
												<TrendingUp class="w-3 h-3 group-hover:scale-110 transition-transform" />
												View Full Report
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="py-20 bg-zinc-950/50">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-16">
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Why Sales Teams Love AI Assistance</h2>
				<p class="text-lg text-zinc-400 max-w-2xl mx-auto">Transform every rep into your top performer with instant access to perfect answers</p>
			</div>
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-900/50 transition-colors">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-4">
						<Sparkles class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Instant Knowledge Retrieval</h3>
					<p class="text-zinc-400 text-sm">Get answers from your entire knowledge base in under 2 seconds. Product specs, pricing, case studies, competitor intel—everything at your fingertips.</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-900/50 transition-colors">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4">
						<Brain class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Context-Aware Intelligence</h3>
					<p class="text-zinc-400 text-sm">AI understands what's happening in the conversation and surfaces the most relevant information automatically. No more searching through docs mid-call.</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-900/50 transition-colors">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mb-4">
						<FileText class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Always Up-to-Date</h3>
					<p class="text-zinc-400 text-sm">Your knowledge base automatically syncs. New product updates, pricing changes, or competitive intel? Your AI assistant knows about it immediately.</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-900/50 transition-colors">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mb-4">
						<Users class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Onboard Reps Faster</h3>
					<p class="text-zinc-400 text-sm">New reps sound like veterans from day one. AI gives them instant access to the same knowledge your top performers use.</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-900/50 transition-colors">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center mb-4">
						<MessageSquare class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Handle Any Objection</h3>
					<p class="text-zinc-400 text-sm">AI instantly surfaces battle cards, ROI calculators, and competitive comparisons exactly when prospects push back.</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-900/50 transition-colors">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-700 flex items-center justify-center mb-4">
						<Calendar class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Win More Deals</h3>
					<p class="text-zinc-400 text-sm">Confidence closes deals. When reps have perfect answers instantly, they build trust faster and win more often.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20">
			<div class="max-w-4xl mx-auto px-6 text-center">
				<h2 class="text-4xl font-semibold text-white mb-6">Stop Winging It. Start Winning.</h2>
				<p class="text-xl text-zinc-400 mb-8">Give your team instant access to perfect answers and watch your close rates soar.</p>
				<button 
					onclick={onboardingStore.start}
					class="btn-primary"
				>
				Get Started Free
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
				</svg>
				</button>
		</div>
	</section>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="ai-assistance" />
</div>
