<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { Calendar, CheckCircle2, Clock, TrendingUp, FileText, Users, Star, ArrowRight, Video, Mic, Brain, Sparkles, MessageSquare, Target, Zap, Activity, Radio, Waves, Cpu, Network, Database, Shield, Lock, Eye, Scan } from 'lucide-svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { fly, fade, scale, slide, blur } from 'svelte/transition';
	import { quintOut, elasticOut, cubicOut, backOut, expoOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	// Story progression states
	let currentStage = $state(0);
	let autoPlay = $state(true);
	let showMeetingEnd = $state(false);
	let showTranscription = $state(false);
	let showProcessing = $state(false);
	let showSummary = $state(false);
	let showFollowUp = $state(false);
	
	// Advanced animation states
	let transcriptLines = $state([]);
	let processingSteps = $state([]);
	let summaryItems = $state([]);
	let actionItems = $state([]);
	let scanProgress = $state(0);
	let aiConfidence = $state(0);
	let dataPoints = $state(0);
	let systemStatus = $state('INITIALIZING');
	let neuralActivity = $state([]);
	let waveformData = $state([]);
	
	// Holographic UI elements
	let hologramRotation = $state(0);
	let energyLevel = $state(0);
	
	// Meeting transcript data with enhanced metadata
	const fullTranscript = [
		{ speaker: "Sarah (Sales)", text: "Thanks everyone for joining. Let's discuss the Q1 implementation plan.", time: "0:00", sentiment: 0.85, confidence: 0.94 },
		{ speaker: "John (CTO)", text: "We're concerned about the data migration timeline. Can we get more details?", time: "2:15", sentiment: 0.35, confidence: 0.91 },
		{ speaker: "Sarah", text: "Absolutely. We can provide a detailed technical roadmap next week.", time: "2:45", sentiment: 0.92, confidence: 0.96 },
		{ speaker: "Lisa (CFO)", text: "Budget is approved at $250K. We need to see ROI projections.", time: "5:30", sentiment: 0.78, confidence: 0.98 },
		{ speaker: "Sarah", text: "Perfect! I'll prepare those for our next meeting.", time: "6:00", sentiment: 0.95, confidence: 0.97 },
		{ speaker: "John", text: "Also, can you send us the security compliance documentation?", time: "8:20", sentiment: 0.65, confidence: 0.89 },
		{ speaker: "Sarah", text: "Yes, I'll send that over by end of day.", time: "8:45", sentiment: 0.88, confidence: 0.95 }
	];

	const processingData = [
		{ id: 1, title: "Neural Network Initialization", subtitle: "Loading conversation matrix", icon: Cpu, bgColor: "bg-cyan-500/20", textColor: "text-cyan-400", progress: 100 },
		{ id: 2, title: "Deep Context Analysis", subtitle: "Processing 2,847 data points", icon: Brain, bgColor: "bg-purple-500/20", textColor: "text-purple-400", progress: 100 },
		{ id: 3, title: "Sentiment Mapping", subtitle: "Analyzing emotional patterns", icon: Activity, bgColor: "bg-pink-500/20", textColor: "text-pink-400", progress: 100 },
		{ id: 4, title: "Decision Point Detection", subtitle: "Identifying critical moments", icon: Target, bgColor: "bg-blue-500/20", textColor: "text-blue-400", progress: 100 },
		{ id: 5, title: "Action Item Extraction", subtitle: "Cross-referencing commitments", icon: CheckCircle2, bgColor: "bg-green-500/20", textColor: "text-green-400", progress: 100 },
		{ id: 6, title: "Predictive Analysis", subtitle: "Forecasting next steps", icon: Sparkles, bgColor: "bg-yellow-500/20", textColor: "text-yellow-400", progress: 100 }
	];

	const summaryData = [
		{ title: "Budget Approved", detail: "$250K for Q1 implementation", type: "success", confidence: 98, priority: "critical" },
		{ title: "Technical Concern", detail: "Data migration timeline needs clarification", type: "warning", confidence: 91, priority: "high" },
		{ title: "Documentation Requested", detail: "Security compliance papers needed", type: "info", confidence: 95, priority: "medium" },
		{ title: "Next Steps", detail: "ROI projections and technical roadmap", type: "action", confidence: 96, priority: "high" }
	];

	const actionData = [
		{ text: "Send security compliance documentation", priority: "critical", due: "Today", status: "pending", assignee: "Sarah", risk: "high" },
		{ text: "Prepare detailed ROI projections", priority: "high", due: "Next week", status: "pending", assignee: "Finance Team", risk: "medium" },
		{ text: "Create technical migration roadmap", priority: "high", due: "Next week", status: "pending", assignee: "John", risk: "medium" },
		{ text: "Schedule technical deep-dive session", priority: "medium", due: "Within 2 weeks", status: "ready", assignee: "Sarah", risk: "low" }
	];

	// Story progression logic
	function startStory() {
		currentStage = 0;
		showMeetingEnd = false;
		showTranscription = false;
		showProcessing = false;
		showSummary = false;
		showFollowUp = false;
		transcriptLines = [];
		processingSteps = [];
		summaryItems = [];
		actionItems = [];
		scanProgress = 0;
		aiConfidence = 0;
		dataPoints = 0;
		systemStatus = 'INITIALIZING';
		neuralActivity = [];
		energyLevel = 0;
		
		// Generate neural activity
		generateNeuralActivity();
		
		// Stage 1: Meeting ends with scan
		setTimeout(() => {
			showMeetingEnd = true;
			currentStage = 1;
			systemStatus = 'SCANNING';
			animateScan();
		}, 500);

		// Stage 2: Transcription appears
		setTimeout(() => {
			showTranscription = true;
			currentStage = 2;
			systemStatus = 'TRANSCRIBING';
			animateTranscript();
		}, 4000);

		// Stage 3: Processing begins
		setTimeout(() => {
			showProcessing = true;
			currentStage = 3;
			systemStatus = 'PROCESSING';
			animateProcessing();
		}, 9000);

		// Stage 4: Summary generated
		setTimeout(() => {
			showSummary = true;
			currentStage = 4;
			systemStatus = 'ANALYZING';
			animateSummary();
		}, 16000);

		// Stage 5: Follow-up briefing ready
		setTimeout(() => {
			showFollowUp = true;
			currentStage = 5;
			systemStatus = 'COMPLETE';
			animateActions();
		}, 21000);
	}

	function animateScan() {
		const interval = setInterval(() => {
			scanProgress += 2;
			if (scanProgress >= 100) {
				clearInterval(interval);
			}
		}, 30);
	}

	function animateTranscript() {
		fullTranscript.forEach((line, index) => {
			setTimeout(() => {
				transcriptLines = [...transcriptLines, line];
				dataPoints += 127;
			}, index * 500);
		});
	}

	function animateProcessing() {
		processingData.forEach((step, index) => {
			setTimeout(() => {
				processingSteps = [...processingSteps, step];
				aiConfidence = Math.min(99, aiConfidence + 16);
			}, index * 700);
		});
	}

	function animateSummary() {
		summaryData.forEach((item, index) => {
			setTimeout(() => {
				summaryItems = [...summaryItems, item];
			}, index * 500);
		});
	}

	function animateActions() {
		actionData.forEach((item, index) => {
			setTimeout(() => {
				actionItems = [...actionItems, item];
				energyLevel = Math.min(100, energyLevel + 25);
			}, index * 400);
		});
	}

	function generateNeuralActivity() {
		neuralActivity = Array.from({ length: 50 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			delay: Math.random() * 2000
		}));
	}

	function generateWaveform() {
		waveformData = Array.from({ length: 100 }, (_, i) => ({
			x: i,
			y: Math.sin(i * 0.1 + Date.now() * 0.001) * 20 + 50
		}));
	}

	onMount(() => {
		if (autoPlay) {
			startStory();
		}
		
		// Hologram rotation
		const rotationInterval = setInterval(() => {
			hologramRotation = (hologramRotation + 1) % 360;
		}, 50);
		
		// Waveform animation
		const waveInterval = setInterval(() => {
			generateWaveform();
		}, 50);
		
		return () => {
			clearInterval(rotationInterval);
			clearInterval(waveInterval);
		};
	});
</script>

<style>
	@keyframes scan-line {
		0% { transform: translateY(-100%); }
		100% { transform: translateY(100%); }
	}

	@keyframes pulse-glow {
		0%, 100% { opacity: 1; filter: brightness(1); }
		50% { opacity: 0.6; filter: brightness(1.5); }
	}

	@keyframes circuit-flow {
		0% { stroke-dashoffset: 1000; }
		100% { stroke-dashoffset: 0; }
	}

	@keyframes hologram-flicker {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.8; }
	}

	@keyframes data-stream {
		0% { transform: translateY(0) scaleY(0); opacity: 0; }
		50% { opacity: 1; }
		100% { transform: translateY(20px) scaleY(1); opacity: 0; }
	}

	.scan-line {
		animation: scan-line 2s linear infinite;
	}

	.pulse-glow {
		animation: pulse-glow 2s ease-in-out infinite;
	}

	.circuit-flow {
		animation: circuit-flow 3s linear infinite;
	}

	.hologram-flicker {
		animation: hologram-flicker 0.1s steps(2, end) infinite;
	}

	.data-stream {
		animation: data-stream 2s ease-out infinite;
	}

	.hexagon {
		clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
	}

	.neural-grid {
		background-image: 
			linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
		background-size: 20px 20px;
	}

	.holographic-border {
		background: linear-gradient(45deg, transparent 30%, rgba(139, 92, 246, 0.3) 50%, transparent 70%);
		background-size: 200% 200%;
		animation: hologram-sweep 3s linear infinite;
	}

	@keyframes hologram-sweep {
		0% { background-position: 0% 0%; }
		100% { background-position: 200% 200%; }
	}
</style>

<svelte:head>
	<title>Follow-Up Meeting Preparation - SpikedAI</title>
	<meta name="description" content="Never miss important follow-up details. Automated preparation for your next meetings with context-aware briefings." />
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="followup" />
	
	<!-- Hero Section -->
	<div class="relative overflow-hidden bg-gradient-to-b from-purple-950/20 to-black pt-32 pb-24">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
		
		<div class="relative max-w-7xl mx-auto px-6">
			<div class="text-center max-w-4xl mx-auto">
				<div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 mb-8">
					<Calendar class="w-10 h-10 text-purple-500" strokeWidth={1.5} />
				</div>
				
				<h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
					Follow-Up Meeting Preparation
				</h1>
				
				<p class="text-xl md:text-2xl text-zinc-400 mb-12">
					Never walk into a meeting unprepared. Get AI-powered briefings with all the context you need.
				</p>
				
				<div class="flex flex-wrap gap-4 justify-center">
					<a href="#demo" class="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
						See It In Action
					</a>
					<a href="/" class="px-8 py-4 bg-zinc-900 rounded-xl font-semibold border border-zinc-800 hover:border-purple-500 transition-all duration-300 hover:scale-105">
						Back to Features
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Interactive Story Section -->
	<div id="demo" class="py-24 px-6 bg-gradient-to-b from-black to-zinc-950">
		<div class="max-w-7xl mx-auto">
			<!-- Story Header -->
			<div class="text-center mb-12">
				<h2 class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
					Watch the Magic Happen
				</h2>
				<p class="text-xl text-zinc-400 mb-8">From meeting end to follow-up ready in seconds</p>
				<button 
					onclick={startStory}
					class="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
				>
					Replay Story
				</button>
			</div>

			<!-- Story Stages -->
			<div class="relative">
				<!-- Stage Indicator -->
				<div class="flex justify-center gap-3 mb-12">
					{#each [1, 2, 3, 4, 5] as stage}
						<div 
							class="w-3 h-3 rounded-full transition-all duration-300"
							class:bg-purple-500={currentStage >= stage}
							class:bg-zinc-700={currentStage < stage}
							class:scale-125={currentStage === stage}
						></div>
					{/each}
				</div>

				<!-- Stage 1: Meeting Ends -->
				{#if showMeetingEnd}
					<div 
						class="mb-12"
						in:fly={{ y: 50, duration: 800, easing: quintOut }}
					>
						<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800 overflow-hidden">
							<div class="flex items-center justify-between mb-6">
								<div class="flex items-center gap-3">
									<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 flex items-center justify-center">
										<Video class="w-6 h-6 text-red-500" />
									</div>
									<div>
										<h3 class="text-2xl font-semibold text-white">Meeting Just Ended</h3>
										<p class="text-zinc-400">Enterprise Corp - Q1 Planning Discussion</p>
									</div>
								</div>
								<div class="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-lg border border-red-500/30">
									<div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
									<span class="text-red-400 text-sm font-medium">Recording Ended</span>
								</div>
							</div>
							
							<div class="grid grid-cols-3 gap-4 mt-6">
								<div class="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
									<Clock class="w-5 h-5 text-purple-400 mb-2" />
									<p class="text-2xl font-bold text-white">32:45</p>
									<p class="text-sm text-zinc-400">Duration</p>
								</div>
								<div class="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
									<Users class="w-5 h-5 text-purple-400 mb-2" />
									<p class="text-2xl font-bold text-white">4</p>
									<p class="text-sm text-zinc-400">Participants</p>
								</div>
								<div class="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
									<Mic class="w-5 h-5 text-purple-400 mb-2" />
									<p class="text-2xl font-bold text-white">127</p>
									<p class="text-sm text-zinc-400">Exchanges</p>
								</div>
							</div>
						</div>
					</div>
				{/if}

				<!-- Stage 2: Transcription -->
				{#if showTranscription}
					<div 
						class="mb-12"
						in:fly={{ y: 50, duration: 800, easing: quintOut }}
					>
						<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
							<div class="flex items-center gap-3 mb-6">
								<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
									<FileText class="w-6 h-6 text-blue-500" />
								</div>
								<div>
									<h3 class="text-2xl font-semibold text-white">Transcribing Conversation</h3>
									<p class="text-zinc-400">Converting audio to text with speaker identification</p>
								</div>
							</div>
							
							<div class="bg-zinc-900 rounded-lg p-6 max-h-80 overflow-y-auto">
								{#each transcriptLines as line, i (i)}
									<div 
										class="mb-4 pb-4 border-b border-zinc-800 last:border-0"
										in:fly={{ x: -20, duration: 400, easing: cubicOut }}
									>
										<div class="flex items-start gap-3">
											<span class="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded font-mono">
												{line.time}
											</span>
											<div class="flex-1">
												<p class="text-sm font-semibold text-purple-400 mb-1">{line.speaker}</p>
												<p class="text-zinc-300">{line.text}</p>
											</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/if}

				<!-- Stage 3: AI Processing -->
				{#if showProcessing}
					<div 
						class="mb-12"
						in:fly={{ y: 50, duration: 800, easing: quintOut }}
					>
						<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
							<div class="flex items-center gap-3 mb-6">
								<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center animate-pulse">
									<Brain class="w-6 h-6 text-purple-500" />
								</div>
								<div>
									<h3 class="text-2xl font-semibold text-white">AI Processing in Action</h3>
									<p class="text-zinc-400">Understanding context, extracting insights</p>
								</div>
							</div>
							
							<div class="space-y-3">
								{#each processingSteps as step (step.id)}
									{@const Icon = step.icon}
									<div 
										class="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg border border-zinc-800"
										in:fly={{ x: -30, duration: 500, easing: elasticOut }}
									>
										<div class="w-10 h-10 rounded-lg {step.bgColor} flex items-center justify-center flex-shrink-0">
											<Icon class="w-5 h-5 {step.textColor}" />
										</div>
										<div class="flex-1">
											<p class="text-white font-medium">{step.title}</p>
										</div>
										<CheckCircle2 class="w-5 h-5 text-green-500" />
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/if}

				<!-- Stage 4: Meeting Summary -->
				{#if showSummary}
					<div 
						class="mb-12"
						in:fly={{ y: 50, duration: 800, easing: quintOut }}
					>
						<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
							<div class="flex items-center gap-3 mb-6">
								<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 flex items-center justify-center">
									<Sparkles class="w-6 h-6 text-green-500" />
								</div>
								<div>
									<h3 class="text-2xl font-semibold text-white">Meeting Summary Generated</h3>
									<p class="text-zinc-400">Key insights and decisions identified</p>
								</div>
							</div>
							
							<div class="grid md:grid-cols-2 gap-4">
								{#each summaryItems as item, i (i)}
									<div 
										class="p-5 rounded-lg border transition-all duration-300 {item.type === 'success' ? 'bg-green-500/10 border-green-500/30' : item.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' : item.type === 'info' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-purple-500/10 border-purple-500/30'}"
										in:scale={{ duration: 500, easing: elasticOut, start: 0.8 }}
									>
										<h4 class="font-semibold text-white mb-2">{item.title}</h4>
										<p class="text-sm text-zinc-300">{item.detail}</p>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/if}

				<!-- Stage 5: Follow-up Briefing Ready -->
				{#if showFollowUp}
					<div 
						in:fly={{ y: 50, duration: 800, easing: quintOut }}
					>
						<div class="bg-gradient-to-br from-purple-950/50 to-pink-950/50 rounded-2xl p-8 border-2 border-purple-500/50 relative overflow-hidden">
							<!-- Animated background -->
							<div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
							
							<div class="relative">
								<div class="flex items-center gap-3 mb-6">
									<div class="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
										<Zap class="w-7 h-7 text-white" />
									</div>
									<div>
										<h3 class="text-3xl font-bold text-white">Follow-up Briefing Ready!</h3>
										<p class="text-purple-300">Your next meeting prep is complete</p>
									</div>
								</div>
								
								<div class="bg-black/50 rounded-xl p-6 backdrop-blur-sm">
									<h4 class="text-sm font-semibold text-purple-400 mb-4 uppercase tracking-wide">Action Items for Next Meeting</h4>
									<div class="space-y-3">
										{#each actionItems as item, i (i)}
											<div 
												class="flex items-start gap-4 p-4 bg-zinc-900/80 rounded-lg border border-zinc-700 hover:border-purple-500/50 transition-all duration-300"
												in:fly={{ x: -20, duration: 400, delay: i * 100, easing: cubicOut }}
											>
												<div class="flex-shrink-0 mt-1">
													<div 
														class="w-5 h-5 rounded border-2 flex items-center justify-center {item.priority === 'high' ? 'border-red-500 bg-red-500/20' : 'border-yellow-500 bg-yellow-500/20'}"
													>
														{#if item.priority === 'high'}
															<span class="text-red-500 text-xs">!</span>
														{/if}
													</div>
												</div>
												<div class="flex-1">
													<p class="text-white font-medium mb-1">{item.text}</p>
													<div class="flex items-center gap-3">
														<span 
															class="text-xs px-2 py-1 rounded {item.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}"
														>
															{item.priority.toUpperCase()}
														</span>
														<span class="text-xs text-zinc-400 flex items-center gap-1">
															<Clock class="w-3 h-3" />
															{item.due}
														</span>
													</div>
												</div>
											</div>
										{/each}
									</div>
									
									<div class="mt-6 pt-6 border-t border-zinc-700">
										<div class="flex items-center justify-between">
											<p class="text-zinc-400">
												<span class="text-green-400 font-semibold">Ready</span> for your next meeting
											</p>
											<button class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
												<span>Open Full Briefing</span>
												<ArrowRight class="w-4 h-4" />
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Key Features -->
	<div class="py-24 px-6 bg-zinc-950">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold mb-4">Never Miss Important Context</h2>
				<p class="text-xl text-zinc-400">Everything you need to prepare for success</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<FileText class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Auto-Generated Briefings</h3>
					<p class="text-zinc-400">Comprehensive meeting prep documents created automatically from your conversation history.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<CheckCircle2 class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Action Item Tracking</h3>
					<p class="text-zinc-400">Never forget a commitment. Track and follow up on all action items automatically.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<TrendingUp class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Context Awareness</h3>
					<p class="text-zinc-400">AI understands the full relationship history and surfaces relevant insights.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<Star class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Smart Recommendations</h3>
					<p class="text-zinc-400">Get AI-suggested talking points tailored to each prospect's specific needs.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<Clock class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Meeting Timeline</h3>
					<p class="text-zinc-400">Visual timeline of all interactions to quickly understand the relationship stage.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<Users class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Stakeholder Insights</h3>
					<p class="text-zinc-400">Track key contacts, their concerns, and engagement levels across meetings.</p>
				</div>
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	<div class="py-24 px-6">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to Never Miss a Beat?</h2>
			<p class="text-xl text-zinc-400 mb-12">Join sales teams using AI to prepare for every conversation</p>
			
			<div class="flex flex-wrap gap-4 justify-center">
				<button 
					onclick={onboardingStore.start}
					class="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
				>
					<span>Get Started Free</span>
					<ArrowRight class="w-5 h-5" />
				</button>
				<a href="/features" class="px-8 py-4 bg-zinc-900 rounded-xl font-semibold border border-zinc-800 hover:border-purple-500 transition-all duration-300 hover:scale-105">
					Explore All Features
				</a>
			</div>
		</div>
	</div>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="followup" />
</div>
