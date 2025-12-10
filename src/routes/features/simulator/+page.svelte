<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { 
		Users, Zap, TrendingUp, Target, Sparkles, Brain, MessageSquare, 
		Play, Pause, RotateCcw, Award, AlertCircle, CheckCircle, 
		BarChart3, Lightbulb, Shield, Clock, Star, TrendingDown,
		ThumbsUp, ThumbsDown, FileText, Video, Mic, Activity, 
		Circle, Send, Settings, Bot, ArrowRight, Calendar, Trophy
	} from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let simulationActive = $state(false);
	let isPaused = $state(false);
	let selectedScenario = $state('discovery');
	let currentDialogueIndex = $state(0);
	let showCoaching = $state(true);
	let hoveredDialogue = $state(null);
	
	// Parallax states
	let mouseX = $state(0);
	let mouseY = $state(0);
	let scrollY = $state(0);
	
	onMount(() => {
		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};
		
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

	// Simulation Scenarios
	const scenarios = [
		{
			id: 'discovery',
			name: 'Discovery Call',
			description: 'First meeting with a prospect - understand their needs',
			difficulty: 'Beginner',
			duration: '15 min',
			color: 'blue',
			icon: Users
		},
		{
			id: 'demo',
			name: 'Product Demo',
			description: 'Present your solution and handle technical questions',
			difficulty: 'Intermediate',
			duration: '30 min',
			color: 'purple',
			icon: Video
		},
		{
			id: 'objection',
			name: 'Objection Handling',
			description: 'Navigate pricing concerns and competitive comparisons',
			difficulty: 'Advanced',
			duration: '20 min',
			color: 'orange',
			icon: Shield
		},
		{
			id: 'closing',
			name: 'Deal Closing',
			description: 'Navigate final negotiations and secure commitment',
			difficulty: 'Advanced',
			duration: '25 min',
			color: 'green',
			icon: Trophy
		}
	];

	// Simulated conversation for Discovery Call
	const discoveryDialogue = [
		{
			id: 1,
			speaker: 'AI Prospect - Jennifer Chen',
			initials: 'JC',
			role: 'VP of Sales',
			company: 'TechCorp Inc.',
			time: '00:00',
			text: 'Hi! Thanks for reaching out. I saw your email about improving our sales process.',
			isAI: true,
			sentiment: 'neutral',
			coachingPoints: []
		},
		{
			id: 2,
			speaker: 'You',
			initials: 'ME',
			time: '00:15',
			text: 'Thanks for taking the time, Jennifer! Before I dive in, I\'d love to understand more about your current sales operations.',
			isAI: false,
			score: 85,
			feedback: 'Good opening! You\'re focusing on discovery first.',
			strengths: ['Active listening setup', 'Consultative approach'],
			improvements: []
		},
		{
			id: 3,
			speaker: 'AI Prospect - Jennifer Chen',
			initials: 'JC',
			role: 'VP of Sales',
			company: 'TechCorp Inc.',
			time: '00:30',
			text: 'Well, we have a team of 25 reps. Our biggest issue is that new hires take forever to ramp up—usually 5-6 months before they\'re productive.',
			isAI: true,
			sentiment: 'concerned',
			coachingPoints: [
				{
					type: 'opportunity',
					text: 'Pain point identified: Long ramp time (5-6 months)',
					action: 'Dig deeper: Ask about the cost of slow ramp time'
				}
			]
		},
		{
			id: 4,
			speaker: 'You',
			initials: 'ME',
			time: '00:50',
			text: 'That\'s significant. Have you calculated what that ramp time is costing you in terms of lost opportunities?',
			isAI: false,
			score: 92,
			feedback: 'Excellent! You\'re quantifying the pain.',
			strengths: ['Value-based questioning', 'Probing for impact'],
			improvements: []
		},
		{
			id: 5,
			speaker: 'AI Prospect - Jennifer Chen',
			initials: 'JC',
			role: 'VP of Sales',
			company: 'TechCorp Inc.',
			time: '01:10',
			text: 'Honestly, no. But I know we\'re leaving money on the table. Each rep should be closing at least 3-4 deals per quarter, but new reps barely hit 1.',
			isAI: true,
			sentiment: 'frustrated',
			coachingPoints: [
				{
					type: 'critical',
					text: 'Key metric revealed: 3-4 deals per quarter target vs 1 actual',
					action: 'Calculate ROI: Help them see the financial impact'
				}
			]
		},
		{
			id: 6,
			speaker: 'You',
			initials: 'ME',
			time: '01:35',
			text: 'So if we could cut that ramp time in half and get new reps to 2-3 deals in their first few months, what would that mean for your team?',
			isAI: false,
			score: 88,
			feedback: 'Strong hypothetical value proposition!',
			strengths: ['Painting the vision', 'Quantifiable outcome'],
			improvements: ['Could ask about average deal size to calculate exact ROI']
		},
		{
			id: 7,
			speaker: 'AI Prospect - Jennifer Chen',
			initials: 'JC',
			role: 'VP of Sales',
			company: 'TechCorp Inc.',
			time: '01:55',
			text: 'That would be huge. Our average deal is around $50K. If we could accelerate that... we\'re talking about significant revenue.',
			isAI: true,
			sentiment: 'interested',
			coachingPoints: [
				{
					type: 'success',
					text: 'Deal size captured: $50K average',
					action: 'Next step: Present your solution\'s ROI using these numbers'
				}
			]
		},
		{
			id: 8,
			speaker: 'You',
			initials: 'ME',
			time: '02:15',
			text: 'Exactly. So with 25 reps, if even half of them could close just one extra deal per quarter thanks to faster ramp time, that\'s over $600K in additional revenue per quarter.',
			isAI: false,
			score: 95,
			feedback: 'Excellent ROI calculation! This creates urgency.',
			strengths: ['Quantified value', 'Clear business case', 'Used their numbers'],
			improvements: []
		},
		{
			id: 9,
			speaker: 'AI Prospect - Jennifer Chen',
			initials: 'JC',
			role: 'VP of Sales',
			company: 'TechCorp Inc.',
			time: '02:35',
			text: 'Wow, I hadn\'t thought about it that way. How exactly does your solution help with ramp time?',
			isAI: true,
			sentiment: 'engaged',
			coachingPoints: [
				{
					type: 'buying_signal',
					text: 'Buying signal detected: Asking about solution details',
					action: 'Perfect time to transition to your product capabilities'
				}
			]
		},
		{
			id: 10,
			speaker: 'You',
			initials: 'ME',
			time: '02:50',
			text: 'Great question! Our AI gives new reps real-time assistance during calls—it\'s like having your best performer whispering in their ear. They get instant access to product knowledge, competitive intel, and objection handling scripts.',
			isAI: false,
			score: 90,
			feedback: 'Good product positioning tied to their pain point.',
			strengths: ['Connected solution to pain', 'Clear value proposition'],
			improvements: ['Could have asked permission before presenting']
		},
		{
			id: 11,
			speaker: 'AI Prospect - Jennifer Chen',
			initials: 'JC',
			role: 'VP of Sales',
			company: 'TechCorp Inc.',
			time: '03:15',
			text: 'Interesting. What kind of results are other companies seeing? Do you have any case studies?',
			isAI: true,
			sentiment: 'interested',
			coachingPoints: [
				{
					type: 'opportunity',
					text: 'Request for social proof',
					action: 'Share specific customer success story with similar profile'
				}
			]
		},
		{
			id: 12,
			speaker: 'You',
			initials: 'ME',
			time: '03:35',
			text: 'Absolutely. We work with a SaaS company similar to yours—30 rep team, similar deal sizes. They cut ramp time from 6 months to 2.5 months and saw a 47% increase in new rep productivity within the first quarter.',
			isAI: false,
			score: 93,
			feedback: 'Perfect! Specific, relevant case study with metrics.',
			strengths: ['Relevant social proof', 'Specific metrics', 'Similar company profile'],
			improvements: []
		}
	];

	// Real-time coaching insights
	const liveCoachingInsights = {
		discovery: {
			title: 'Live Coaching Dashboard',
			overallScore: 91,
			sentiment: 'Positive',
			strengths: [
				'Strong discovery questions',
				'Effective value quantification',
				'Good active listening',
				'Relevant case study usage'
			],
			improvements: [
				'Ask permission before presenting solution',
				'Dig deeper on budget and timeline',
				'Identify other stakeholders early'
			],
			keyMetrics: [
				{ label: 'Talk/Listen Ratio', value: '35/65', status: 'good', target: '30/70' },
				{ label: 'Questions Asked', value: '8', status: 'good', target: '6-10' },
				{ label: 'Value Statements', value: '3', status: 'average', target: '4+' },
				{ label: 'Pain Points Identified', value: '2', status: 'good', target: '2-3' }
			],
			nextSteps: [
				'Schedule technical demo with their team',
				'Send ROI calculator with their specific numbers',
				'Introduce to customer success manager',
				'Identify decision-making process and timeline'
			]
		}
	};

	function startSimulation() {
		simulationActive = true;
		currentDialogueIndex = 0;
	}

	function pauseSimulation() {
		isPaused = !isPaused;
	}

	function resetSimulation() {
		simulationActive = false;
		isPaused = false;
		currentDialogueIndex = 0;
	}

	function selectScenario(scenarioId) {
		selectedScenario = scenarioId;
		resetSimulation();
	}

	function advanceDialogue() {
		if (currentDialogueIndex < discoveryDialogue.length - 1) {
			currentDialogueIndex++;
		}
	}

	let visibleDialogue = $derived(discoveryDialogue.slice(0, currentDialogueIndex + 1));
	let currentCoaching = $derived(liveCoachingInsights[selectedScenario]);
</script>

<svelte:head>
	<title>Meeting Simulator & Coaching | SpikedAI</title>
	<meta name="description" content="Practice sales conversations with AI-powered prospects and get real-time coaching to master your pitch, objection handling, and closing techniques." />
</svelte:head>

<style>
	/* Custom scrollbar styles */
	.scrollbar-thin::-webkit-scrollbar {
		width: 6px;
	}

	.scrollbar-thin::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.02);
		border-radius: 3px;
	}

	.scrollbar-thin::-webkit-scrollbar-thumb {
		background: rgba(239, 68, 68, 0.3);
		border-radius: 3px;
	}

	.scrollbar-thin::-webkit-scrollbar-thumb:hover {
		background: rgba(239, 68, 68, 0.5);
	}

	/* Gradient text */
	.gradient-text {
		background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Glass morphism */
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

	/* Hover lift */
	.hover-lift {
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	.hover-lift:hover {
		transform: translateY(-4px) scale(1.01);
		box-shadow: 
			0 20px 60px rgba(0, 0, 0, 0.4),
			0 0 40px rgba(239, 68, 68, 0.1);
	}

	/* Animated border */
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
	}

	@keyframes borderShimmer {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	/* Floating animations */
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

	/* Depth shadow */
	.depth-shadow {
		box-shadow:
			0 1px 2px rgba(0, 0, 0, 0.2),
			0 4px 8px rgba(0, 0, 0, 0.15),
			0 8px 16px rgba(0, 0, 0, 0.1),
			0 16px 32px rgba(0, 0, 0, 0.05);
	}

	/* Fade in animation */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.3s ease-out;
	}

	/* Typing indicator */
	@keyframes typing {
		0%, 100% { opacity: 0.2; }
		50% { opacity: 1; }
	}

	.typing-dot {
		animation: typing 1.4s infinite;
	}

	.typing-dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.typing-dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	/* Glow effect */
	.glow-red {
		box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
	}
	
	.glow-red:hover {
		box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
	}
</style>

<div class="min-h-screen bg-black">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="simulator" />
	
	<!-- Hero Section -->
	<section class="relative pt-32 pb-20 overflow-hidden">
		<!-- Animated background orbs -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/20 rounded-full blur-3xl float"></div>
			<div class="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl float-slow"></div>
			<div class="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl float" style="animation-delay: 2s"></div>
		</div>

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
						<Users class="w-4 h-4 text-red-500 animate-pulse" />
						<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">AI Meeting Simulator</span>
					</div>

					<!-- Main Headline -->
					<h1 
						class="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
						in:fly={{ y: 20, duration: 700, delay: 200 }}
					>
						<span class="text-white block mb-2">Practice with AI,</span>
						<span class="gradient-text block">Perform Like a Pro</span>
					</h1>

					<!-- Three Feature Cards -->
					<div class="space-y-4 mb-10">
						<!-- Real-time coaching -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden border-l-2 border-red-500"
							in:fly={{ y: 20, duration: 600, delay: 300 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-red-500/5 via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
									<Brain class="w-5 h-5 text-red-500" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Real-Time AI Coaching</h3>
									<p class="text-sm text-zinc-400">Get instant feedback on questions, talk-time ratio, and sales methodology</p>
								</div>
							</div>
						</div>

						<!-- Hyper-realistic prospects -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden"
							in:fly={{ y: 20, duration: 600, delay: 400 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/50 transition-colors">
									<Bot class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Hyper-Realistic AI Prospects</h3>
									<p class="text-sm text-zinc-400">Practice with AI that responds naturally and throws realistic objections</p>
								</div>
							</div>
						</div>

						<!-- Multiple scenarios -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden"
							in:fly={{ y: 20, duration: 600, delay: 500 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/50 transition-colors">
									<Target class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Practice Every Scenario</h3>
									<p class="text-sm text-zinc-400">Master discovery, demos, objections, and closing with custom difficulty</p>
								</div>
							</div>
						</div>
					</div>

					<!-- CTA Link -->
					<a 
						href="/" 
						class="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium group"
						in:fly={{ y: 20, duration: 600, delay: 700 }}
					>
						<span>Start training with AI simulator</span>
						<ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
					</a>
				</div>

				<!-- Right Column - Product Showcase -->
				<div 
					class="relative"
					in:fly={{ x: 30, duration: 800, delay: 400 }}
					style="transform: perspective(1000px) rotateY({mouseX * -2}deg) rotateX({mouseY * 2}deg)"
				>
					<!-- Floating decorative elements -->
					<div class="absolute -top-8 -right-8 w-32 h-32 bg-red-500/20 rounded-full blur-3xl float"></div>
					<div class="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl float-slow"></div>
					
					<!-- Main Product Interface -->
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
									<div class="flex items-center gap-2">
										<span class="text-sm font-black tracking-tight text-white">
											SPIKED<span class="text-red-500">AI</span>
										</span>
										<span class="text-[11px] text-zinc-400 uppercase tracking-wide">Simulator</span>
									</div>
								</div>
							</div>
							<div class="flex items-center gap-2">
								{#if simulationActive}
									<div class="flex items-center gap-1.5 px-3 py-1.5 bg-green-950/40 border border-green-900/50 rounded-full">
										<div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
										<span class="text-xs font-medium text-green-400">ACTIVE</span>
									</div>
									<button 
										onclick={pauseSimulation}
										class="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-semibold rounded-lg transition-all"
									>
										{#if isPaused}
											<Play class="w-3.5 h-3.5" />
										{:else}
											<Pause class="w-3.5 h-3.5" />
										{/if}
									</button>
									<button 
										onclick={resetSimulation}
										class="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all shadow-lg shadow-red-500/20"
									>
										<RotateCcw class="w-3.5 h-3.5" />
									</button>
								{:else}
									<button class="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs font-semibold rounded-lg transition-all">
										<Settings class="w-3.5 h-3.5" />
									</button>
								{/if}
							</div>
						</div>

						<!-- Main Content Area -->
						<div class="bg-gradient-to-br from-zinc-950 to-zinc-900 p-1 relative overflow-hidden">
							<!-- Animated gradient overlay -->
							<div class="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 opacity-50 animate-pulse"></div>
							
							<div class="h-[600px] relative z-10">
								{#if !simulationActive}
									<!-- Scenario Selection -->
									<div class="p-6 h-full overflow-y-auto scrollbar-thin">
										<div class="text-center mb-6">
											<h3 class="text-xl font-bold text-white mb-2">Choose Training Scenario</h3>
											<p class="text-xs text-zinc-400">Select a scenario to practice</p>
										</div>

										<div class="grid grid-cols-2 gap-3 mb-6">
											{#each scenarios as scenario}
												<button
													onclick={() => selectScenario(scenario.id)}
													class="group flex flex-col items-start gap-3 p-4 rounded-xl border transition-all text-left {selectedScenario === scenario.id ? 'glass border-red-500/30 shadow-lg shadow-red-500/10' : 'glass-subtle hover:glass'}"
												>
													<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-{scenario.color}-600 to-{scenario.color}-700 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
														{#if scenario.icon === Users}
															<Users class="w-5 h-5 text-white" />
														{:else if scenario.icon === Video}
															<Video class="w-5 h-5 text-white" />
														{:else if scenario.icon === Shield}
															<Shield class="w-5 h-5 text-white" />
														{:else if scenario.icon === Trophy}
															<Trophy class="w-5 h-5 text-white" />
														{/if}
													</div>
													<div class="flex-1">
														<div class="flex items-center gap-2 mb-1">
															<h4 class="text-sm font-bold text-white">{scenario.name}</h4>
															{#if selectedScenario === scenario.id}
																<CheckCircle class="w-3.5 h-3.5 text-red-500 animate-pulse" />
															{/if}
														</div>
														<p class="text-xs text-zinc-400 mb-2 leading-relaxed">{scenario.description}</p>
														<div class="flex items-center gap-2">
															<span class="px-2 py-0.5 glass rounded text-[10px] font-semibold text-zinc-400">
																{scenario.difficulty}
															</span>
															<span class="flex items-center gap-1 text-[10px] text-zinc-500">
																<Clock class="w-3 h-3" />
																{scenario.duration}
															</span>
														</div>
													</div>
												</button>
											{/each}
										</div>

										<div class="text-center">
											<button 
												onclick={startSimulation}
												class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105"
											>
												<Play class="w-4 h-4" />
												<span>Start Simulation</span>
											</button>
										</div>
									</div>
								{:else}
						<!-- Active Simulation Interface -->
						<div class="h-[600px] p-1">
							<div class="grid grid-cols-[1fr_1.3fr] h-full">
							<!-- Left Panel: Live Conversation -->
							<div class="border-r border-zinc-800/50 glass-subtle flex flex-col">
								<!-- Prospect Info Header -->
								<div class="px-3 py-2.5 border-b border-zinc-800/50 glass">
									<div class="flex items-center gap-2.5">
										<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
											JC
										</div>
										<div class="flex-1">
											<h5 class="text-xs font-bold text-white">Jennifer Chen</h5>
											<p class="text-[10px] text-zinc-400">VP of Sales • TechCorp Inc.</p>
										</div>
										<div class="flex items-center gap-1 px-2 py-0.5 glass border border-green-500/30 rounded-full">
											<Circle class="w-1.5 h-1.5 fill-green-500 text-green-500" />
											<span class="text-[9px] font-semibold text-green-400">ENGAGED</span>
										</div>
									</div>
								</div>

								<!-- Conversation Feed -->
								<div class="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
									{#each visibleDialogue as dialogue}
										<div 
											class="animate-fadeIn group"
											onmouseenter={() => hoveredDialogue = dialogue.id}
											onmouseleave={() => hoveredDialogue = null}
											role="listitem"
										>
											<div class="flex gap-2 {dialogue.isAI ? '' : 'flex-row-reverse'}">
												{#if dialogue.isAI}
													<div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 shadow-md">
														{dialogue.initials}
													</div>
												{:else}
													<div class="w-6 h-6 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 shadow-md">
														{dialogue.initials}
													</div>
												{/if}

												<div class="flex-1 max-w-[85%]">
													<div class="flex items-center gap-1.5 mb-1 {dialogue.isAI ? '' : 'flex-row-reverse'}">
														<span class="text-[10px] font-semibold text-white">{dialogue.speaker}</span>
														<span class="text-[9px] text-zinc-600">{dialogue.time}</span>
														{#if dialogue.sentiment}
															<span class="px-1.5 py-0.5 glass rounded text-[8px] text-zinc-400">
																{dialogue.sentiment}
															</span>
														{/if}
													</div>
													
													<div class="p-2.5 rounded-lg {dialogue.isAI ? 'glass border border-zinc-800/50' : 'glass border border-green-500/30 shadow-sm shadow-green-500/10'}">
														<p class="text-[11px] text-zinc-300 leading-relaxed">{dialogue.text}</p>
														
														{#if !dialogue.isAI && dialogue.score}
															<div class="mt-2 pt-2 border-t border-zinc-800/50">
																<div class="flex items-center justify-between mb-1">
																	<span class="text-[9px] font-semibold text-zinc-400">Your Score</span>
																	<span class="text-xs font-bold text-green-500">{dialogue.score}/100</span>
																</div>
																<div class="flex items-start gap-1 text-[9px] text-zinc-500">
																	<CheckCircle class="w-2.5 h-2.5 text-green-500 flex-shrink-0 mt-0.5" />
																	<span>{dialogue.feedback}</span>
																</div>
															</div>
														{/if}
													</div>

													<!-- Coaching Points for AI Messages -->
													{#if dialogue.coachingPoints && dialogue.coachingPoints.length > 0}
														<div class="mt-1.5 space-y-1">
															{#each dialogue.coachingPoints as point}
																<div class="p-2 rounded-lg {point.type === 'success' ? 'glass border border-green-500/30' : point.type === 'critical' ? 'glass border border-red-500/30' : point.type === 'buying_signal' ? 'glass border border-blue-500/30' : 'glass border border-orange-500/30'}">
																	<div class="flex items-start gap-1.5">
																		{#if point.type === 'success'}
																			<CheckCircle class="w-2.5 h-2.5 text-green-500 flex-shrink-0 mt-0.5" />
																		{:else if point.type === 'critical'}
																			<AlertCircle class="w-2.5 h-2.5 text-red-500 flex-shrink-0 mt-0.5" />
																		{:else if point.type === 'buying_signal'}
																			<Sparkles class="w-2.5 h-2.5 text-blue-500 flex-shrink-0 mt-0.5" />
																		{:else}
																			<Lightbulb class="w-2.5 h-2.5 text-orange-500 flex-shrink-0 mt-0.5" />
																		{/if}
																		<div class="flex-1">
																			<p class="text-[9px] font-semibold text-white mb-0.5">{point.text}</p>
																			<p class="text-[8px] text-zinc-400">{point.action}</p>
																		</div>
																	</div>
																</div>
															{/each}
														</div>
													{/if}
												</div>
											</div>
										</div>
									{/each}

									{#if !isPaused && currentDialogueIndex < discoveryDialogue.length - 1}
										<!-- Typing Indicator -->
										<div class="flex gap-2 items-center">
											<div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-[9px] font-bold shadow-md">
												JC
											</div>
											<div class="px-3 py-2 glass border border-zinc-800/50 rounded-lg flex gap-1">
												<div class="w-1.5 h-1.5 bg-zinc-600 rounded-full typing-dot"></div>
												<div class="w-1.5 h-1.5 bg-zinc-600 rounded-full typing-dot"></div>
												<div class="w-1.5 h-1.5 bg-zinc-600 rounded-full typing-dot"></div>
											</div>
										</div>
									{/if}
								</div>

								<!-- Response Input -->
								<div class="p-2.5 border-t border-zinc-800/50 glass">
									<div class="flex gap-2">
										<input 
											type="text" 
											placeholder="Type your response or use voice..."
											class="flex-1 px-3 py-2 glass-subtle border border-zinc-800/50 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
											disabled={isPaused}
										/>
										<button 
											onclick={advanceDialogue}
											disabled={isPaused}
											class="px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-zinc-700 disabled:to-zinc-700 text-white rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-red-500/20"
										>
											<Mic class="w-3.5 h-3.5" />
											<Send class="w-3.5 h-3.5" />
										</button>
									</div>
								</div>
							</div>

							<!-- Right Panel: Live Coaching -->
							<div class="flex flex-col glass-subtle">
								<!-- Coaching Header -->
								<div class="px-3 py-2.5 border-b border-zinc-800/50 flex items-center justify-between glass">
									<div class="flex items-center gap-1.5">
										<Brain class="w-3.5 h-3.5 text-red-500" />
										<h5 class="text-xs font-bold text-white">Live AI Coaching</h5>
									</div>
									<button 
										onclick={() => showCoaching = !showCoaching}
										class="text-[10px] text-zinc-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-zinc-800/50"
									>
										{showCoaching ? 'Hide' : 'Show'}
									</button>
								</div>

								{#if showCoaching}
									<div class="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin">
										<!-- Overall Performance Score -->
										<div class="glass border border-red-500/30 rounded-xl p-3 shadow-sm shadow-red-500/10">
											<div class="flex items-center justify-between mb-2">
												<div class="flex items-center gap-2">
													<div class="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
														<Award class="w-3.5 h-3.5 text-white" />
													</div>
													<div>
														<h6 class="text-[10px] font-bold text-white">Overall Performance</h6>
														<p class="text-[8px] text-red-400">Real-time analysis</p>
													</div>
												</div>
												<div class="text-right">
													<div class="text-xl font-bold text-white">{currentCoaching.overallScore}</div>
													<div class="text-[8px] text-zinc-400">/ 100</div>
												</div>
											</div>
											<div class="flex items-center gap-2">
												<div class="flex-1 h-1.5 bg-zinc-900/50 rounded-full overflow-hidden">
													<div class="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all" style="width: {currentCoaching.overallScore}%"></div>
												</div>
												<span class="text-[10px] font-semibold text-green-500">{currentCoaching.sentiment}</span>
											</div>
										</div>

										<!-- Key Metrics -->
										<div class="glass border border-zinc-800/50 rounded-xl p-3">
											<h6 class="text-[10px] font-bold text-white mb-2 flex items-center gap-1.5">
												<BarChart3 class="w-3.5 h-3.5 text-blue-500" />
												Key Metrics
											</h6>
											<div class="space-y-1.5">
												{#each currentCoaching.keyMetrics as metric}
													<div class="flex items-center justify-between p-2 glass-subtle rounded-lg border border-zinc-800/30">
														<div class="flex-1">
															<div class="flex items-center gap-1.5 mb-0.5">
																<span class="text-[9px] font-semibold text-white">{metric.label}</span>
																{#if metric.status === 'good'}
																	<CheckCircle class="w-2.5 h-2.5 text-green-500" />
																{:else}
																	<AlertCircle class="w-2.5 h-2.5 text-orange-500" />
																{/if}
															</div>
															<div class="text-[8px] text-zinc-500">Target: {metric.target}</div>
														</div>
														<div class="text-xs font-bold {metric.status === 'good' ? 'text-green-500' : 'text-orange-500'}">
															{metric.value}
														</div>
													</div>
												{/each}
											</div>
										</div>

										<!-- Strengths -->
										<div class="glass border border-green-500/30 rounded-xl p-3">
											<h6 class="text-[10px] font-bold text-white mb-2 flex items-center gap-1.5">
												<ThumbsUp class="w-3.5 h-3.5 text-green-500" />
												What You're Doing Well
											</h6>
											<ul class="space-y-1">
												{#each currentCoaching.strengths as strength}
													<li class="flex items-start gap-1.5 text-[10px] text-zinc-300">
														<CheckCircle class="w-2.5 h-2.5 text-green-500 flex-shrink-0 mt-0.5" />
														<span>{strength}</span>
													</li>
												{/each}
											</ul>
										</div>

										<!-- Areas for Improvement -->
										<div class="glass border border-orange-500/30 rounded-xl p-3">
											<h6 class="text-[10px] font-bold text-white mb-2 flex items-center gap-1.5">
												<Lightbulb class="w-3.5 h-3.5 text-orange-500" />
												Areas to Improve
											</h6>
											<ul class="space-y-1">
												{#each currentCoaching.improvements as improvement}
													<li class="flex items-start gap-1.5 text-[10px] text-zinc-300">
														<AlertCircle class="w-2.5 h-2.5 text-orange-500 flex-shrink-0 mt-0.5" />
														<span>{improvement}</span>
													</li>
												{/each}
											</ul>
										</div>

										<!-- Recommended Next Steps -->
										<div class="glass border border-blue-500/30 rounded-xl p-3">
											<h6 class="text-[10px] font-bold text-white mb-2 flex items-center gap-1.5">
												<Target class="w-3.5 h-3.5 text-blue-500" />
												Recommended Next Steps
											</h6>
											<ul class="space-y-1">
												{#each currentCoaching.nextSteps as step}
													<li class="flex items-start gap-1.5 text-[10px] text-zinc-300">
														<ArrowRight class="w-2.5 h-2.5 text-blue-500 flex-shrink-0 mt-0.5" />
														<span>{step}</span>
													</li>
												{/each}
											</ul>
										</div>
									</div>
								{/if}
							</div>
						</div>
						</div>
					{/if}
				</div>
			</div>
			<!-- Close Right Column -->
			</div>
			<!-- Close Split Layout Container -->
			</div>
			<!-- Close max-w-7xl container -->
		</div>
		</div>
	</section>

	<!-- Key Features Grid -->
	<section class="py-20 bg-zinc-950/50">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Master Every Sales Scenario</h2>
				<p class="text-lg text-zinc-400 max-w-2xl mx-auto">Train like an athlete. Get instant feedback. Close more deals.</p>
			</div>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Bot class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Hyper-Realistic AI Prospects</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Practice with AI personas that respond naturally, ask tough questions, and throw realistic objections—just like real buyers.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-blue-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Brain class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Real-Time AI Coaching</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Get instant feedback on your questions, talk-time ratio, value statements, and sales methodology—as the conversation happens.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-purple-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Target class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Multiple Scenarios</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Practice discovery calls, product demos, objection handling, negotiation, and deal closing—all with custom difficulty levels.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-green-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<BarChart3 class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Performance Analytics</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Track your improvement over time. See how your scores improve across scenarios, questions quality, and objection handling.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-orange-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Activity class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Framework Coaching</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Get coached on MEDDIC, BANT, Challenger Sale, SPIN Selling, or custom sales methodologies your team uses.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-cyan-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<TrendingUp class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Accelerate Onboarding</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						New reps can practice hundreds of scenarios before their first real call. Cut ramp time in half with AI training.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-pink-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-600 to-pink-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<FileText class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Detailed Session Reports</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Get comprehensive post-simulation reports with transcripts, scoring breakdown, and specific improvement recommendations.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-indigo-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Shield class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Practice Tough Objections</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Master handling pricing objections, competitive comparisons, security concerns, and implementation questions.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-teal-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Trophy class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Leaderboards & Achievements</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Gamify your practice sessions. Compete with teammates, unlock achievements, and see who masters each scenario first.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Results Section -->
	<section class="py-20">
		<div class="max-w-6xl mx-auto px-6">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Proven Results from AI Coaching</h2>
				<p class="text-lg text-zinc-400">See how teams transform their performance with simulator training</p>
			</div>

			<div class="grid md:grid-cols-4 gap-6 mb-12">
				<div class="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
					<div class="text-4xl font-bold text-green-500 mb-2">2.5x</div>
					<div class="text-sm text-zinc-400">Faster Ramp Time</div>
				</div>
				<div class="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
					<div class="text-4xl font-bold text-blue-500 mb-2">47%</div>
					<div class="text-sm text-zinc-400">Higher Close Rate</div>
				</div>
				<div class="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
					<div class="text-4xl font-bold text-red-500 mb-2">65%</div>
					<div class="text-sm text-zinc-400">Better Objection Handling</div>
				</div>
				<div class="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
					<div class="text-4xl font-bold text-purple-500 mb-2">91%</div>
					<div class="text-sm text-zinc-400">Rep Confidence Score</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 bg-gradient-to-br from-red-950/20 to-zinc-950">
		<div class="max-w-4xl mx-auto px-6 text-center">
			<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-500/30">
				<Users class="w-8 h-8 text-white" />
			</div>
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Stop Learning on Real Deals.<br/>Practice with AI First.</h2>
			<p class="text-xl text-zinc-400 mb-8 leading-relaxed">
				Your competitors' reps are winging it on live calls. Yours will be trained, coached, and ready to close from day one.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<button 
					onclick={startSimulation}
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
				>
					<Play class="w-5 h-5" />
					Try Simulator Now
					<ArrowRight class="w-5 h-5" />
				</button>
				<a href="/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-all border border-zinc-700 hover:border-zinc-600">
					<Calendar class="w-5 h-5" />
					Book a Demo
				</a>
			</div>
			<p class="text-sm text-zinc-500 mt-6">No credit card required • Unlimited practice sessions • Track your improvement</p>
		</div>
	</section>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="simulator" />
</div>
