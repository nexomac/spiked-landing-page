<script>
	import FeatureCard from './FeatureCard.svelte';
	import FeatureGridCard from './FeatureGridCard.svelte';
	import { Sparkles, MessageSquare, Calendar, Users, GitBranch, BarChart3, Heart, Settings, TrendingUp, Activity, Zap, FileText, Brain, Target } from 'lucide-svelte';
	
	let selectedFeature = $state('ai-assistance');
	let showContent = $state(true);
	let isTransitioning = $state(false);
	
	// Smooth content transition with fade and slide
	$effect(() => {
		if (selectedFeature) {
			isTransitioning = true;
			showContent = false;
			setTimeout(() => {
				showContent = true;
				setTimeout(() => isTransitioning = false, 50);
			}, 300);
		}
	});

	const features = [
		{
			id: 'ai-assistance',
			title: 'AI Assistance',
			icon: Sparkles,
			fullTitle: 'Real-Time Spiked AI Assistance',
			subtitle: 'Based on Your Sales and Solutions Docs',
			description: 'Get instant, contextual answers during your sales calls. Our AI analyzes your product documentation, case studies, and sales materials in real-time to provide accurate responses exactly when you need them.',
			features: [
				'Instant answers from your knowledge base',
				'Context-aware suggestions during conversations',
				'Semantic search across all documents',
				'Auto-generated talking points',
				'Real-time fact-checking and validation'
			],
			href: '/features/ai-assistance'
		},
		{
			id: 'notetaker',
			title: 'Notetaker',
			icon: MessageSquare,
			fullTitle: 'Smart Notetaker',
			subtitle: 'With Spiked AI Conversational Intelligence',
			description: 'Automatically capture, transcribe, and analyze every conversation. Our AI-powered notetaker identifies key moments, action items, and insights while you focus on building relationships.',
			features: [
				'Real-time transcription with speaker identification',
				'Automatic action item extraction',
				'Key moment highlighting and tagging',
				'Conversational analytics and insights',
				'Smart search across all meetings'
			],
			href: '/features/notetaker'
		},
		{
			id: 'followup',
			title: 'Follow-Up',
			icon: Calendar,
			fullTitle: 'Follow-Up Meeting Preparation',
			subtitle: 'Using Spiked AI Memory and RAG',
			description: 'Never walk into a meeting unprepared. Spiked AI remembers every detail from past conversations and automatically prepares personalized briefings for your follow-up meetings.',
			features: [
				'Automatic meeting summaries and action items',
				'Contextual briefings for follow-ups',
				'Historical conversation analysis',
				'Smart reminder system',
				'Personalized preparation materials'
			],
			href: '/features/followup'
		},
		{
			id: 'simulator',
			title: 'Simulator',
			icon: Users,
			fullTitle: 'Meeting Simulator and Coaching',
			subtitle: 'Practice Makes Perfect',
			description: 'Run realistic sales simulations with AI-powered prospect personas and get instant feedback on your pitch, objection handling, and closing techniques.',
			features: [
				'AI-powered prospect simulations',
				'Real-time performance feedback',
				'Objection handling practice',
				'Personalized coaching insights',
				'Progress tracking and analytics'
			],
			href: '/features/simulator'
		},
		{
			id: 'dev-integrations',
			title: 'Dev Tools',
			icon: GitBranch,
			fullTitle: 'Developer Tools Integration',
			subtitle: 'Jira, Asana for Dev Teams',
			description: 'Seamlessly connect your sales conversations with your development workflow. Automatically create tickets, sync timelines, and keep technical teams aligned with customer needs.',
			features: [
				'Direct Jira and Asana integration',
				'Auto-create tickets from customer requests',
				'Sync project timelines with sales commitments',
				'Technical requirement extraction',
				'Development status updates in meetings'
			],
			href: '/features/dev-tools'
		},
		{
			id: 'crm-integrations',
			title: 'CRM',
			icon: BarChart3,
			fullTitle: 'CRM Integration',
			subtitle: 'Zoho, Salesforce, and More',
			description: 'Keep your CRM updated automatically. Every conversation, insight, and action item is synced in real-time to your CRM, ensuring your sales data is always accurate and up-to-date.',
			features: [
				'Bi-directional sync with major CRMs',
				'Automatic contact and deal updates',
				'Meeting notes and transcripts in CRM',
				'AI-generated next steps and tasks',
				'Custom field mapping and workflows'
			],
			href: '/features/crm'
		},
		{
			id: 'sentiment',
			title: 'Sentiment',
			icon: Heart,
			fullTitle: 'Real-Time Sentiment Analysis',
			subtitle: 'And Feedback on Sales Performance',
			description: 'Read the room with AI-powered sentiment analysis. Get instant feedback on how your prospect is feeling, identify buying signals, and know exactly when to push or when to address concerns.',
			features: [
				'Real-time emotion detection',
				'Buying signal identification',
				'Objection and concern alerts',
				'Engagement level tracking',
				'Post-call sentiment reports'
			],
			href: '/features/sentiment'
		},
		{
			id: 'custom',
			title: 'Custom Goals',
			icon: Settings,
			fullTitle: 'Custom Meeting Goals',
			subtitle: 'And Advanced Configuration',
			description: 'Tailor Spiked AI to your unique sales process. Set custom goals, create personalized playbooks, and configure the AI to match your team\'s methodology and terminology.',
			features: [
				'Custom goal templates and tracking',
				'Personalized sales playbooks',
				'Custom AI training on your methodology',
				'Configurable alerts and notifications',
				'White-label options for enterprise'
			],
			href: '/features/custom-goals'
		}
	];

	const currentFeature = $derived(features.find(f => f.id === selectedFeature) || features[0]);
	let hoveredFeature = $state(null);
	
	// Determine if content should be blurred
	const isBlurred = $derived(hoveredFeature !== null && hoveredFeature !== selectedFeature);
</script>

<section id="features-showcase" class="relative py-32 bg-black overflow-hidden transition-colors duration-500">
	<!-- Animated Background -->
	<div class="absolute inset-0 overflow-hidden pointer-events-none">
		<div class="absolute top-1/4 -left-20 w-96 h-96 bg-red-950 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
		<div class="absolute top-1/3 -right-20 w-96 h-96 bg-red-900 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
		<div class="absolute -bottom-20 left-1/2 w-96 h-96 bg-red-950 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
	</div>
	
	<!-- Grid Background -->
	<div class="absolute inset-0" style="background-image: linear-gradient(rgba(220, 38, 38, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.03) 1px, transparent 1px); background-size: 40px 40px;"></div>

	<div class="relative max-w-7xl mx-auto px-6">
		<!-- Section Header -->
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-6 py-3 bg-zinc-950 backdrop-blur-sm rounded-full border border-red-900/50 shadow-lg mb-6">
				<Sparkles class="w-5 h-5 text-red-500" />
				<span class="text-sm font-semibold text-red-500">
					Enterprise-Grade Features
				</span>
			</div>
			
			<h2 class="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
				<span class="text-white">What would you like</span>
				<br />
				<span class="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
					to explore?
				</span>
			</h2>
			
			<p class="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
				Explore a feature to see how Spiked AI transforms your sales process
			</p>
		</div>

		<!-- Main Content Area: Description on Left, Grid on Right -->
		<div class="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start max-w-6xl mx-auto mb-16">
			<!-- Left Side: Feature Description & Preview -->
			<div class="transition-all duration-500 ease-out {isBlurred ? 'blur-sm opacity-50' : 'blur-0 opacity-100'}" style="transform: translate3d(0, 0, 0);">
				<div class="sticky top-24">
					<!-- Feature Title & Description -->
					<div class="mb-8 transition-all duration-700 ease-out {showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}">
						<h3 class="text-3xl md:text-4xl font-bold mb-4 text-white">
							{currentFeature.fullTitle}
						</h3>
						<p class="text-lg text-red-500 font-semibold mb-4">
							{currentFeature.subtitle}
						</p>
						<p class="text-base text-zinc-400 leading-relaxed mb-6">
							{currentFeature.description}
						</p>
						
						<!-- Feature List -->
						<ul class="space-y-3 mb-8">
							{#each currentFeature.features as feature, i}
								<li class="flex items-start gap-3 transition-all duration-500 ease-out {showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}" style="transition-delay: {i * 80}ms">
									<svg class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
									</svg>
									<span class="text-sm text-zinc-300">{feature}</span>
								</li>
							{/each}
						</ul>

						<!-- Learn More Button -->
						{#if currentFeature.href}
							<a 
								href={currentFeature.href}
								class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105 group"
							>
								<span>Learn More</span>
								<svg class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</a>
						{/if}
					</div>

					<!-- Feature Preview/Demo UI -->
					<div class="transition-all duration-700 ease-out {showContent ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}">
						<div class="bg-zinc-950 backdrop-blur-sm rounded-2xl border border-zinc-900 shadow-xl overflow-hidden p-6">
							{#if selectedFeature === 'ai-assistance'}
								<div class="space-y-3">
									<!-- App Header Bar -->
									<div class="bg-gradient-to-r from-zinc-900 to-zinc-950 rounded-t-xl border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
										<div class="flex items-center gap-2">
											<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
												<Sparkles class="w-4 h-4 text-white" />
											</div>
											<div>
												<h4 class="text-sm font-bold text-white">SpikedAI</h4>
												<p class="text-xs text-zinc-500">Conversational AI Platform</p>
											</div>
										</div>
										<div class="flex items-center gap-2">
											<div class="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/40 border border-amber-900/50 rounded-full">
												<div class="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></div>
												<span class="text-xs font-medium text-amber-400">LISTENING</span>
											</div>
											<button class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-lg shadow-red-500/20">
												Stop Bot
											</button>
										</div>
									</div>

									<!-- Main Content Area with Two Panels -->
									<div class="bg-zinc-950 rounded-b-xl border border-t-0 border-zinc-800 overflow-hidden">
										<div class="grid grid-cols-[1fr_1.2fr] h-[420px]">
											<!-- Left Panel: Live Transcription -->
											<div class="border-r border-zinc-800 flex flex-col bg-zinc-950/50">
												<div class="px-3 py-2 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
													<div class="flex items-center gap-2">
														<MessageSquare class="w-4 h-4 text-zinc-400" />
														<h5 class="text-xs font-bold text-white">Live Transcription</h5>
													</div>
													<span class="text-xs text-zinc-500">Real-time meeting insights</span>
												</div>
												
												<div class="flex-1 overflow-y-auto p-3 space-y-2">
													<!-- Transcription Entry 1 -->
													<div class="flex gap-2 group hover:bg-zinc-900/30 p-2 rounded-lg transition-colors">
														<div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
															SC
														</div>
														<div class="flex-1 min-w-0">
															<div class="flex items-center gap-2 mb-0.5">
																<span class="text-xs font-semibold text-white">Sarah Chen</span>
																<span class="text-[10px] text-zinc-600">10:23 AM</span>
															</div>
															<p class="text-xs text-zinc-400 leading-relaxed">
																Thanks for walking me through the demo. I'm curious about your enterprise security features - we have strict compliance requirements for SOC 2 and GDPR.
															</p>
														</div>
													</div>

													<!-- Transcription Entry 2 -->
													<div class="flex gap-2 group hover:bg-zinc-900/30 p-2 rounded-lg transition-colors">
														<div class="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
															YOU
														</div>
														<div class="flex-1 min-w-0">
															<div class="flex items-center gap-2 mb-0.5">
																<span class="text-xs font-semibold text-white">CHIRAG CHINTAAL</span>
																<span class="text-[10px] text-zinc-600">10:23 AM</span>
															</div>
															<p class="text-xs text-zinc-400 leading-relaxed">
																Great question! We're fully SOC 2 Type II certified and GDPR compliant. All data is encrypted at rest and in transit, and we offer SSO integration with Azure AD and Okta...
															</p>
														</div>
													</div>

													<!-- Transcription Entry 3 -->
													<div class="flex gap-2 group hover:bg-zinc-900/30 p-2 rounded-lg transition-colors">
														<div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
															SC
														</div>
														<div class="flex-1 min-w-0">
															<div class="flex items-center gap-2 mb-0.5">
																<span class="text-xs font-semibold text-white">Sarah Chen</span>
																<span class="text-[10px] text-zinc-600">10:24 AM</span>
															</div>
															<p class="text-xs text-zinc-400 leading-relaxed">
																Perfect. What about data residency? Our legal team requires all data to be stored in the EU.
															</p>
														</div>
													</div>

													<!-- Transcription Entry 4 - Active -->
													<div class="flex gap-2 group bg-blue-950/20 border border-blue-900/50 p-2 rounded-lg">
														<div class="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
															YOU
														</div>
														<div class="flex-1 min-w-0">
															<div class="flex items-center gap-2 mb-0.5">
																<span class="text-xs font-semibold text-white">CHIRAG CHINTAAL</span>
																<span class="text-[10px] text-zinc-600">10:24 AM</span>
															</div>
															<p class="text-xs text-zinc-300 leading-relaxed font-medium">
																Absolutely, we have data centers in Frankfurt and Dublin. You can choose your preferred region during setup...
															</p>
														</div>
													</div>
												</div>
											</div>

											<!-- Right Panel: AI Copilot -->
											<div class="flex flex-col bg-gradient-to-br from-zinc-950 to-zinc-900">
												<div class="px-3 py-2 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
													<div class="flex items-center gap-2">
														<Brain class="w-4 h-4 text-red-500" />
														<h5 class="text-xs font-bold text-white">AI Copilot</h5>
													</div>
													<div class="flex items-center gap-2">
														<button class="px-2 py-1 text-[10px] font-medium text-zinc-400 hover:text-white border border-zinc-700 rounded hover:border-zinc-600 transition-colors">
															Manual Mode: OFF
														</button>
														<button class="px-2 py-1 text-[10px] font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors">
															Auto-Answer: ON
														</button>
													</div>
												</div>

												<div class="flex-1 overflow-y-auto p-3 space-y-2.5">
													<!-- Suggested Question -->
													<div class="group">
														<div class="flex items-center gap-1.5 mb-1">
															<div class="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center">
																<span class="text-[10px] font-bold text-zinc-400">?</span>
															</div>
															<span class="text-[10px] font-semibold text-zinc-500 uppercase tracking-wide">Click mic to speak</span>
														</div>
													</div>

													<!-- Active AI Response Card -->
													<div class="bg-gradient-to-br from-red-950/40 to-red-900/20 border border-red-900/60 rounded-xl p-3 shadow-xl">
														<div class="flex items-start gap-2 mb-2">
															<div class="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center flex-shrink-0 shadow-lg">
																<Sparkles class="w-4 h-4 text-white" />
															</div>
															<div class="flex-1">
																<div class="flex items-center gap-2 mb-1">
																	<span class="text-xs font-bold text-white">Copilot</span>
																	<span class="px-1.5 py-0.5 bg-red-600/40 border border-red-500/50 text-[9px] font-bold text-red-300 rounded">JUST NOW</span>
																</div>
																<p class="text-xs font-semibold text-red-300 mb-2">
																	Your Question: Data residency options for EU customers?
																</p>
															</div>
														</div>

														<!-- AI Generated Answer -->
														<div class="bg-zinc-900/80 rounded-lg p-3 border border-zinc-800 space-y-2">
															<h6 class="text-xs font-bold text-white mb-1.5">EU Data Residency Options</h6>
															<p class="text-xs text-zinc-300 leading-relaxed mb-2">
																For enterprise customers with EU data residency requirements:
															</p>
															
															<ul class="space-y-1 text-[11px] text-zinc-400">
																<li class="flex items-start gap-1.5">
																	<span class="text-red-500 mt-0.5">•</span>
																	<span><span class="text-white font-semibold">EU Data Centers:</span> Frankfurt (Germany) and Dublin (Ireland) available</span>
																</li>
																<li class="flex items-start gap-1.5">
																	<span class="text-red-500 mt-0.5">•</span>
																	<span><span class="text-white font-semibold">Data Processing:</span> All data stays within EU boundaries - no cross-border transfers</span>
																</li>
																<li class="flex items-start gap-1.5">
																	<span class="text-red-500 mt-0.5">•</span>
																	<span><span class="text-white font-semibold">Compliance:</span> Full GDPR compliance with DPA available</span>
																</li>
																<li class="flex items-start gap-1.5">
																	<span class="text-red-500 mt-0.5">•</span>
																	<span><span class="text-white font-semibold">Setup:</span> Region selection during onboarding, can be changed anytime</span>
																</li>
																<li class="flex items-start gap-1.5">
																	<span class="text-red-500 mt-0.5">•</span>
																	<span><span class="text-white font-semibold">Pricing:</span> No additional cost for EU residency on Enterprise plans</span>
																</li>
															</ul>

															<!-- Source Reference -->
															<div class="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between">
																<div class="flex items-center gap-1.5 text-[10px] text-red-400">
																	<FileText class="w-3 h-3" />
																	<span class="font-medium">Enterprise_Security_Guide.pdf</span>
																</div>
																<button class="flex items-center gap-1 px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-semibold rounded transition-colors">
																	<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
																	</svg>
																	Use
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>

										<!-- Bottom Stats Bar -->
										<div class="border-t border-zinc-800 bg-zinc-900/50 px-4 py-2">
											<div class="flex items-center justify-between">
												<div class="text-[10px] font-semibold text-zinc-500 uppercase tracking-wide">Knowledge Base Active</div>
												<div class="flex gap-2">
													<!-- Compact knowledge-base summary to avoid visual overlap on small screens -->
													<span class="px-3 py-1 bg-zinc-900/30 text-zinc-300 text-[11px] font-medium rounded-full border border-zinc-800">
														Knowledge Base
														<span class="ml-2 text-white font-bold">55 assets</span>
													</span>
												</div>
											</div>
										</div>

										<!-- Performance Metrics Footer -->
										<div class="border-t border-zinc-800 bg-zinc-950 grid grid-cols-3 divide-x divide-zinc-800">
											<div class="px-3 py-2 text-center">
												<div class="text-lg font-bold text-green-500">98%</div>
												<div class="text-[10px] text-zinc-500 font-medium">Accuracy</div>
											</div>
											<div class="px-3 py-2 text-center">
												<div class="text-lg font-bold text-blue-500">&lt;2s</div>
												<div class="text-[10px] text-zinc-500 font-medium">Response Time</div>
											</div>
											<div class="px-3 py-2 text-center">
												<div class="text-lg font-bold text-red-500">142</div>
												<div class="text-[10px] text-zinc-500 font-medium">Questions Answered</div>
											</div>
										</div>
									</div>
								</div>
							{:else if selectedFeature === 'notetaker'}
								<div class="space-y-3">
									<!-- Premium Recording Header -->
									<div class="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 rounded-xl border border-zinc-800 p-4 shadow-2xl">
										<div class="flex items-center justify-between mb-3">
											<div class="flex items-center gap-3">
												<div class="relative">
													<div class="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-xl shadow-red-500/30">
														<div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
													</div>
													<div class="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center border-2 border-zinc-900">
														<span class="text-[8px] font-bold text-white">REC</span>
													</div>
												</div>
												<div>
													<div class="flex items-center gap-2 mb-0.5">
														<span class="text-sm font-bold text-white">Smart Notetaker Active</span>
														<div class="px-2 py-0.5 bg-red-950/50 text-red-400 text-[10px] font-bold rounded-full border border-red-900/50 animate-pulse">
															● LIVE
														</div>
													</div>
													<p class="text-xs text-zinc-500">AI agents analyzing conversation in real-time</p>
												</div>
											</div>
											<div class="text-right">
												<div class="text-2xl font-bold font-mono text-white mb-0.5">42:15</div>
												<div class="text-[10px] text-zinc-500 font-medium">Recording Time</div>
											</div>
										</div>
										
										<!-- Advanced Progress Bar -->
										<div class="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
											<div class="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 rounded-full animate-pulse shadow-lg shadow-red-500/50" style="width: 68%"></div>
											<div class="absolute inset-0 flex items-center justify-between px-2">
												<div class="flex gap-1">
													<div class="w-1 h-1 bg-white/80 rounded-full"></div>
													<div class="w-1 h-1 bg-white/80 rounded-full"></div>
													<div class="w-1 h-1 bg-white/80 rounded-full"></div>
												</div>
											</div>
										</div>

										<!-- Live AI Agents Status -->
										<div class="grid grid-cols-3 gap-2 mt-3">
											<div class="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-950 rounded-lg border border-zinc-800">
												<div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
												<span class="text-[10px] font-semibold text-zinc-400">Transcribing</span>
											</div>
											<div class="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-950 rounded-lg border border-zinc-800">
												<div class="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
												<span class="text-[10px] font-semibold text-zinc-400">Extracting Actions</span>
											</div>
											<div class="flex items-center gap-1.5 px-2 py-1.5 bg-zinc-950 rounded-lg border border-zinc-800">
												<div class="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
												<span class="text-[10px] font-semibold text-zinc-400">Analyzing Sentiment</span>
											</div>
										</div>
									</div>

									<!-- Live Transcript with Smart Detection -->
									<div class="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
										<div class="px-3 py-2 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between">
											<div class="flex items-center gap-2">
												<MessageSquare class="w-4 h-4 text-red-500" />
												<h5 class="text-xs font-bold text-white">Live Conversation Intelligence</h5>
											</div>
											<div class="flex items-center gap-2">
												<span class="text-[10px] text-zinc-500 font-medium">4 Speakers Identified</span>
												<div class="flex -space-x-1">
													<div class="w-5 h-5 rounded-full bg-gradient-to-br from-red-600 to-red-700 border-2 border-zinc-900 flex items-center justify-center text-[8px] font-bold text-white">JD</div>
													<div class="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-zinc-900 flex items-center justify-center text-[8px] font-bold text-white">SA</div>
													<div class="w-5 h-5 rounded-full bg-gradient-to-br from-green-600 to-green-700 border-2 border-zinc-900 flex items-center justify-center text-[8px] font-bold text-white">You</div>
													<div class="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 border-2 border-zinc-900 flex items-center justify-center text-[8px] font-bold text-white">AM</div>
												</div>
											</div>
										</div>

										<div class="p-3 space-y-2.5 max-h-72 overflow-hidden relative">
											<!-- Transcript Entry 1 -->
											<div class="group hover:bg-zinc-900/30 p-2.5 rounded-lg transition-all duration-200">
												<div class="flex gap-2.5">
													<div class="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg">
														JD
													</div>
													<div class="flex-1 min-w-0">
														<div class="flex items-center gap-2 mb-1">
															<span class="text-sm font-bold text-white">John Doe</span>
															<span class="px-1.5 py-0.5 bg-blue-950/40 text-blue-400 text-[10px] font-bold rounded border border-blue-900/50">CLIENT</span>
															<span class="text-[10px] text-zinc-600 font-mono">2:34 PM</span>
														</div>
														<p class="text-sm text-zinc-300 leading-relaxed">
															What's your implementation timeline? We need this up and running by Q2.
														</p>
														<div class="flex items-center gap-2 mt-2">
															<div class="flex items-center gap-1 text-[10px] text-amber-500">
																<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
																	<path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
																</svg>
																<span class="font-semibold">Urgent Question Detected</span>
															</div>
														</div>
													</div>
												</div>
											</div>

											<!-- Smart Action Detection Card -->
											<div class="relative overflow-hidden bg-gradient-to-br from-blue-950/40 via-blue-900/20 to-transparent rounded-xl border border-blue-900/60 shadow-xl">
												<div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
												<div class="relative p-3">
													<div class="flex items-start gap-2.5">
														<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg">
															<Activity class="w-4 h-4 text-white" />
														</div>
														<div class="flex-1">
															<div class="flex items-center gap-2 mb-1.5">
																<span class="text-xs font-bold text-blue-400">ACTION ITEM DETECTED</span>
																<span class="px-1.5 py-0.5 bg-blue-600/30 text-blue-300 text-[9px] font-bold rounded border border-blue-500/50">HIGH PRIORITY</span>
															</div>
															<p class="text-sm text-white font-semibold mb-2">
																Send implementation roadmap and timeline estimate
															</p>
															<div class="flex items-center gap-2 text-[10px] text-zinc-400 mb-3">
																<Calendar class="w-3 h-3" />
																<span>Due: Before next meeting</span>
																<span class="text-zinc-600">•</span>
																<Users class="w-3 h-3" />
																<span>Assign to: You</span>
															</div>
															<div class="flex gap-2">
																<button class="flex-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-blue-600/20">
																	Create Task
																</button>
																<button class="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold rounded-lg transition-colors border border-zinc-700">
																	Dismiss
																</button>
															</div>
														</div>
													</div>
												</div>
											</div>

											<!-- Transcript Entry 2 -->
											<div class="group hover:bg-zinc-900/30 p-2.5 rounded-lg transition-all duration-200">
												<div class="flex gap-2.5">
													<div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg">
														You
													</div>
													<div class="flex-1 min-w-0">
														<div class="flex items-center gap-2 mb-1">
															<span class="text-sm font-bold text-white">You</span>
															<span class="px-1.5 py-0.5 bg-green-950/40 text-green-400 text-[10px] font-bold rounded border border-green-900/50">SALES REP</span>
															<span class="text-[10px] text-zinc-600 font-mono">2:35 PM</span>
														</div>
														<p class="text-sm text-zinc-300 leading-relaxed">
															Absolutely! We can have you up and running in 4-6 weeks. I'll send over our implementation roadmap right after this call.
														</p>
														<div class="flex items-center gap-2 mt-2">
															<div class="flex items-center gap-1 text-[10px] text-green-500">
																<svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
																	<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
																</svg>
																<span class="font-semibold">Commitment Made</span>
															</div>
														</div>
													</div>
												</div>
											</div>

											<!-- Transcript Entry 3 -->
											<div class="group hover:bg-zinc-900/30 p-2.5 rounded-lg transition-all duration-200">
												<div class="flex gap-2.5">
													<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-lg">
														SA
													</div>
													<div class="flex-1 min-w-0">
														<div class="flex items-center gap-2 mb-1">
															<span class="text-sm font-bold text-white">Sarah Anderson</span>
															<span class="px-1.5 py-0.5 bg-purple-950/40 text-purple-400 text-[10px] font-bold rounded border border-purple-900/50">DECISION MAKER</span>
															<span class="text-[10px] text-zinc-600 font-mono">2:36 PM</span>
														</div>
														<p class="text-sm text-zinc-300 leading-relaxed">
															That sounds great. Can you also include case studies from similar implementations in the financial sector?
														</p>
													</div>
												</div>
											</div>

											<!-- Gradient Fade Overlay -->
											<div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none"></div>
										</div>
									</div>

									<!-- Smart Analytics Dashboard -->
									<div class="grid grid-cols-3 gap-2">
										<div class="relative overflow-hidden bg-gradient-to-br from-red-950/30 to-red-900/10 rounded-xl border border-red-900/50 p-3 text-center group hover:scale-105 transition-transform">
											<div class="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full blur-2xl"></div>
											<div class="relative">
												<div class="text-2xl font-bold text-red-500 mb-1">4</div>
												<div class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Speakers</div>
												<div class="text-[9px] text-red-400/70 mt-0.5">Identified</div>
											</div>
										</div>
										<div class="relative overflow-hidden bg-gradient-to-br from-green-950/30 to-green-900/10 rounded-xl border border-green-900/50 p-3 text-center group hover:scale-105 transition-transform">
											<div class="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-2xl"></div>
											<div class="relative">
												<div class="text-2xl font-bold text-green-500 mb-1">7</div>
												<div class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Action Items</div>
												<div class="text-[9px] text-green-400/70 mt-0.5">Auto-detected</div>
											</div>
										</div>
										<div class="relative overflow-hidden bg-gradient-to-br from-blue-950/30 to-blue-900/10 rounded-xl border border-blue-900/50 p-3 text-center group hover:scale-105 transition-transform">
											<div class="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl"></div>
											<div class="relative">
												<div class="text-2xl font-bold text-blue-500 mb-1">12</div>
												<div class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Key Moments</div>
												<div class="text-[9px] text-blue-400/70 mt-0.5">Tagged</div>
											</div>
										</div>
									</div>

									<!-- AI Templates & Analysis Panel -->
									<div class="bg-gradient-to-br from-zinc-950 to-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl">
										<!-- Header -->
										<div class="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
											<div class="flex items-center gap-2">
												<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
													<FileText class="w-4 h-4 text-white" />
												</div>
												<div>
													<h5 class="text-sm font-bold text-white">AI Templates</h5>
													<p class="text-[10px] text-zinc-500">Analysis Frameworks</p>
												</div>
											</div>
											<span class="text-[10px] text-zinc-500 font-medium">Last Analysis: 9:15:22 AM</span>
										</div>

										<!-- Analysis Summary Card -->
										<div class="p-4 bg-gradient-to-br from-red-950/20 via-zinc-950 to-zinc-950 border-b border-zinc-800">
											<div class="flex items-start gap-3 mb-3">
												<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/20">
													<Brain class="w-5 h-5 text-white" />
												</div>
												<div class="flex-1">
													<h6 class="text-sm font-bold text-white mb-1">Detailed AI Analysis</h6>
													<p class="text-xs text-zinc-400 leading-relaxed">
														Goal: Jira integration need the demo on Saturday <span class="text-red-400 font-semibold">Status: In Progress</span>
													</p>
												</div>
											</div>
											<div class="bg-zinc-900/60 rounded-lg p-3 border border-zinc-800 space-y-2">
												<p class="text-xs text-zinc-300 leading-relaxed">
													<span class="font-bold text-white">Summary/Analysis:</span> Chirag Achintaal provided an update on Jira integration, mentioning they have an account for Bhumi AI and are working to expedite integrations.
												</p>
												<div class="pt-2 border-t border-zinc-800">
													<p class="text-[11px] text-zinc-400 mb-2">
														<span class="font-semibold text-zinc-300">Evidence List:</span>
													</p>
													<div class="space-y-1.5">
														<div class="flex items-start gap-2 text-[11px]">
															<span class="text-red-500 mt-0.5">•</span>
															<p class="text-zinc-400">"<span class="text-zinc-300 font-medium">[undefined] CHIRAG ACHINTAAL:</span> Yeah, so we got an account for Bhumi AI and we are trying to get it to work..."</p>
														</div>
														<div class="flex items-start gap-2 text-[11px]">
															<span class="text-red-500 mt-0.5">•</span>
															<p class="text-zinc-400">"<span class="text-zinc-300 font-medium">[undefined] CHIRAG ACHINTAAL:</span> Hmm. Yes, I think it can solve a lot of problems that is causing delays."</p>
														</div>
													</div>
												</div>
											</div>
										</div>

										<!-- Issue Detection Card -->
										<div class="p-4 bg-zinc-950/50 border-b border-zinc-800">
											<div class="flex items-start gap-3 mb-2">
												<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center shadow-lg">
													<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
														<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
													</svg>
												</div>
												<div class="flex-1">
													<h6 class="text-sm font-bold text-amber-400 mb-1">Custom goals disappear at times</h6>
													<div class="flex items-center gap-2 mb-2">
														<span class="px-2 py-0.5 bg-red-950/50 text-red-400 text-[10px] font-bold rounded-full border border-red-900/50">Status</span>
														<span class="text-[10px] text-zinc-500">No detected evidence</span>
													</div>
												</div>
											</div>
										</div>

										<!-- Preset Templates List -->
										<div class="p-3 bg-zinc-950/30">
											<div class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">Preset Templates</div>
											<div class="space-y-1.5">
												<!-- Summary Template -->
												<div class="group flex items-center gap-3 p-2.5 bg-zinc-900/40 hover:bg-zinc-900/80 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer">
													<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-md flex-shrink-0">
														<FileText class="w-4 h-4 text-white" />
													</div>
													<div class="flex-1 min-w-0">
														<h6 class="text-xs font-bold text-white mb-0.5">Summary</h6>
														<p class="text-[10px] text-zinc-500">Quickly summarize the meeting highlights, action items, and next steps.</p>
													</div>
													<svg class="w-4 h-4 text-zinc-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
													</svg>
												</div>

												<!-- Stakeholder Mapper Template -->
												<div class="group flex items-center gap-3 p-2.5 bg-zinc-900/40 hover:bg-zinc-900/80 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer">
													<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-md flex-shrink-0">
														<Users class="w-4 h-4 text-white" />
													</div>
													<div class="flex-1 min-w-0">
														<h6 class="text-xs font-bold text-white mb-0.5">Stakeholder Mapper</h6>
														<p class="text-[10px] text-zinc-500">Map and analyze key stakeholder relationships</p>
													</div>
													<svg class="w-4 h-4 text-zinc-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
													</svg>
												</div>

												<!-- Battle Card Intelligence Template -->
												<div class="group flex items-center gap-3 p-2.5 bg-zinc-900/40 hover:bg-zinc-900/80 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer">
													<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-md flex-shrink-0">
														<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
														</svg>
													</div>
													<div class="flex-1 min-w-0">
														<h6 class="text-xs font-bold text-white mb-0.5">Battle Card Intelligence</h6>
														<p class="text-[10px] text-zinc-500">Competitive intelligence and positioning</p>
													</div>
													<svg class="w-4 h-4 text-zinc-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
													</svg>
												</div>

												<!-- More Templates -->
												<div class="group flex items-center gap-3 p-2.5 bg-zinc-900/40 hover:bg-zinc-900/80 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer">
													<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-md flex-shrink-0">
														<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
														</svg>
													</div>
													<div class="flex-1 min-w-0">
														<h6 class="text-xs font-bold text-white mb-0.5">PLAYBOOK Command Center</h6>
														<p class="text-[10px] text-zinc-500">MEDOC qualification framework</p>
													</div>
													<svg class="w-4 h-4 text-zinc-600 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
													</svg>
												</div>
											</div>
										</div>
									</div>
								</div>
							{:else if selectedFeature === 'followup'}
								<div class="space-y-4">
									<!-- Meeting Context Card -->
									<div class="p-4 bg-gradient-to-r from-red-950/30 to-red-950/20 rounded-xl border border-red-900/50 shadow-lg">
										<div class="flex items-center justify-between mb-3">
											<div class="flex items-center gap-2">
												<Calendar class="w-5 h-5 text-red-500" />
												<span class="text-sm font-bold text-white">Next Meeting Brief</span>
											</div>
											<span class="px-2 py-1 bg-red-950/50 text-red-400 text-xs rounded-full font-semibold border border-red-900/50">Tomorrow 2PM</span>
										</div>
										
										<!-- Previous Meeting Context -->
										<div class="space-y-2 text-sm mb-4">
											<div class="flex items-start gap-2 p-2 bg-zinc-900 rounded-lg border border-zinc-800">
												<div class="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
													<span class="text-white text-xs">1</span>
												</div>
												<div class="flex-1">
													<p class="text-zinc-300 font-medium">CFO concerned about ROI timeline & integration costs</p>
													<p class="text-xs text-gray-500">Last meeting • Oct 18, 2025</p>
												</div>
											</div>
											<div class="flex items-start gap-2 p-2 bg-zinc-900 rounded-lg border border-zinc-800">
												<div class="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
													<span class="text-white text-xs">2</span>
												</div>
												<div class="flex-1">
													<p class="text-zinc-300 font-medium">Promised: Financial services case studies + pilot proposal</p>
													<p class="text-xs text-gray-500">Committed for this meeting</p>
												</div>
											</div>
											<div class="flex items-start gap-2 p-2 bg-zinc-900 rounded-lg border border-zinc-800">
												<div class="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
													<span class="text-white text-xs">3</span>
												</div>
												<div class="flex-1">
													<p class="text-zinc-300 font-medium">Key stakeholder: Michael Torres (VP Sales) - Strong advocate</p>
													<p class="text-xs text-gray-500">Mentioned 40% time savings as key metric</p>
												</div>
											</div>
										</div>

										<!-- AI Recommendations -->
										<div class="p-3 bg-blue-950/30 rounded-lg border border-blue-900/50">
											<div class="flex items-center gap-2 mb-2">
												<Brain class="w-4 h-4 text-blue-500" />
												<span class="text-xs font-semibold text-blue-400">AI RECOMMENDATIONS</span>
											</div>
											<ul class="space-y-1 text-xs text-zinc-300">
												<li class="flex items-center gap-1">
													<span class="text-blue-500">•</span>
													<span>Lead with financial services case study (similar company size & use case)</span>
												</li>
												<li class="flex items-center gap-1">
													<span class="text-blue-500">•</span>
													<span>Present 90-day pilot plan with clear success metrics</span>
												</li>
												<li class="flex items-center gap-1">
													<span class="text-blue-500">•</span>
													<span>Address CFO's integration concerns with IT involvement plan</span>
												</li>
											</ul>
										</div>
									</div>

									<!-- Quick Stats -->
									<div class="grid grid-cols-3 gap-2">
										<div class="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
											<div class="text-lg font-bold text-red-500">3</div>
											<div class="text-xs text-zinc-500">Past Meetings</div>
										</div>
										<div class="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
											<div class="text-lg font-bold text-green-500">5</div>
											<div class="text-xs text-zinc-500">Open Actions</div>
										</div>
										<div class="p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
											<div class="text-lg font-bold text-orange-500">2</div>
											<div class="text-xs text-zinc-500">Commitments</div>
										</div>
									</div>
								</div>
							{:else if selectedFeature === 'simulator'}
								<div class="space-y-4">
									<!-- Active Simulation Header -->
									<div class="p-4 bg-gradient-to-r from-orange-950/30 to-red-950/30 rounded-xl border border-orange-900/50 shadow-lg">
										<div class="flex items-center justify-between mb-4">
											<span class="text-sm font-bold text-white">Simulation: Enterprise Objection Handling</span>
											<span class="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold rounded-full shadow-lg flex items-center gap-1">
												<div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
												Active
											</span>
										</div>

										<!-- AI Prospect Challenge -->
										<div class="space-y-3">
											<div class="flex items-start gap-3">
												<div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold shadow-lg">AI</div>
												<div class="flex-1 p-3 bg-zinc-900 rounded-lg border border-blue-900/50 shadow-sm">
													<div class="flex items-center gap-2 mb-1">
														<span class="text-xs font-semibold text-blue-400">CFO - ENTERPRISE PROSPECT</span>
														<span class="px-2 py-0.5 bg-red-950/30 text-red-400 text-xs rounded-full border border-red-900/50">Price Objection</span>
													</div>
													<p class="text-sm text-zinc-300">"I appreciate the capabilities, but your Enterprise plan is $89/user/month while your competitor is $49/user. That's almost double for our 200-person sales team. How do you justify that premium?"</p>
												</div>
											</div>

											<!-- Real-time Coaching -->
											<div class="p-3 bg-yellow-950/30 rounded-lg border-l-4 border-yellow-500 shadow-sm">
												<div class="flex items-start gap-2">
													<Zap class="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
													<div class="flex-1">
														<div class="text-xs font-semibold text-yellow-400 mb-1">LIVE COACHING TIP</div>
														<p class="text-xs text-zinc-300 mb-2">Acknowledge their concern, then pivot to ROI and time-to-value. Quantify the cost of their current inefficiencies.</p>
														<div class="flex gap-2">
															<span class="px-2 py-0.5 bg-yellow-950/30 text-yellow-400 text-xs rounded border border-yellow-900/50">Value Selling</span>
															<span class="px-2 py-0.5 bg-yellow-950/30 text-yellow-400 text-xs rounded border border-yellow-900/50">ROI Framework</span>
														</div>
													</div>
												</div>
											</div>

											<!-- Suggested Responses -->
											<div class="p-3 bg-blue-950/30 rounded-lg border border-blue-900/50">
												<div class="text-xs font-semibold text-blue-400 mb-2">SUGGESTED RESPONSES</div>
												<div class="space-y-1.5">
													<button class="w-full text-left p-2 bg-zinc-900 rounded text-xs text-zinc-300 hover:bg-blue-950/50 transition-colors border border-blue-900/50">
														"That's a fair question. Our customers typically see 4.5x ROI within the first quarter through time savings alone - that's 15 hours per rep per week..."
													</button>
													<button class="w-full text-left p-2 bg-zinc-900 rounded text-xs text-zinc-300 hover:bg-blue-950/50 transition-colors border border-blue-900/50">
														"Let me ask - what's the cost of a missed deal because your team didn't have the right information during a call? For most of our customers, one additional closed deal per month covers the entire year..."
													</button>
												</div>
											</div>
										</div>
									</div>

									<!-- Performance Metrics -->
									<div class="grid grid-cols-3 gap-2">
										<div class="p-3 bg-gradient-to-br from-green-950/20 to-emerald-950/20 rounded-lg text-center border border-green-900/50">
											<div class="flex items-center justify-center gap-1 mb-1">
												<TrendingUp class="w-4 h-4 text-green-500" />
												<div class="text-lg font-bold text-green-500">85%</div>
											</div>
											<div class="text-xs text-zinc-500">Score</div>
										</div>
										<div class="p-3 bg-gradient-to-br from-blue-950/20 to-cyan-950/20 rounded-lg text-center border border-blue-900/50">
											<div class="text-lg font-bold text-blue-500 mb-1">12</div>
											<div class="text-xs text-zinc-500">Simulations</div>
										</div>
										<div class="p-3 bg-gradient-to-br from-red-950/20 to-red-950/20 rounded-lg text-center border border-red-900/50">
											<div class="text-lg font-bold text-red-500 mb-1">+23%</div>
											<div class="text-xs text-zinc-500">Improvement</div>
										</div>
									</div>
								</div>
											<div class="text-lg font-bold text-purple-600 mb-1">+23%</div>
											<div class="text-xs text-gray-600 dark:text-gray-400">Improvement</div>



							{:else if selectedFeature === 'dev-integrations'}
								<div class="space-y-3">
									<!-- Header Section -->
									<div class="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 rounded-xl border border-zinc-800 p-4 shadow-2xl">
										<div class="flex items-center justify-between mb-3">
											<div>
												<h4 class="text-sm font-bold text-white mb-1">Developer Tools Integration</h4>
												<p class="text-xs text-zinc-400">Jira, Asana & Project Management</p>
											</div>
											<div class="px-3 py-1.5 bg-blue-950/40 border border-blue-900/50 rounded-full flex items-center gap-2">
												<div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
												<span class="text-xs font-bold text-blue-400">AUTO-SYNCING</span>
											</div>
										</div>
										<p class="text-xs text-zinc-300 leading-relaxed">
											Turn customer requests into development tasks automatically. Every feature request, bug report, or technical requirement mentioned in meetings is instantly tracked in your project management tools.
										</p>
									</div>

									<!-- Integration Status Cards -->
									<div class="grid grid-cols-2 gap-3">
										<!-- Jira Card -->
										<div class="relative overflow-hidden group">
											<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
											<div class="relative p-4 bg-zinc-900 rounded-xl border-2 border-blue-900/50 hover:border-blue-600 transition-all cursor-pointer shadow-lg hover:shadow-blue-600/20">
												<div class="flex items-center gap-3 mb-3">
													<div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-xl shadow-blue-600/30">
														<svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
															<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 17.5h-9v-11h9v11z"/>
														</svg>
													</div>
													<div class="flex-1">
														<span class="font-bold text-white text-sm block">Jira</span>
														<div class="flex items-center gap-1.5 mt-1">
															<div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
															<span class="text-[10px] text-green-400 font-bold">ACTIVE</span>
														</div>
													</div>
												</div>
												<div class="space-y-1.5">
													<div class="flex items-center justify-between text-[10px]">
														<span class="text-zinc-400">Last Update</span>
														<span class="text-blue-400 font-bold">2m ago</span>
													</div>
													<div class="flex items-center justify-between text-[10px]">
														<span class="text-zinc-400">Tickets Created</span>
														<span class="text-white font-bold">23</span>
													</div>
												</div>
											</div>
										</div>

										<!-- Asana Card -->
										<div class="relative overflow-hidden group">
											<div class="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
											<div class="relative p-4 bg-zinc-900 rounded-xl border-2 border-pink-900/50 hover:border-pink-600 transition-all cursor-pointer shadow-lg hover:shadow-pink-600/20">
												<div class="flex items-center gap-3 mb-3">
													<div class="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center shadow-xl shadow-pink-600/30">
														<svg class="w-6 h-6 text-white font-bold" viewBox="0 0 24 24" fill="currentColor">
															<text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="14" font-weight="bold">A</text>
														</svg>
													</div>
													<div class="flex-1">
														<span class="font-bold text-white text-sm block">Asana</span>
														<div class="flex items-center gap-1.5 mt-1">
															<div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
															<span class="text-[10px] text-green-400 font-bold">ACTIVE</span>
														</div>
													</div>
												</div>
												<div class="space-y-1.5">
													<div class="flex items-center justify-between text-[10px]">
														<span class="text-zinc-400">Last Update</span>
														<span class="text-pink-400 font-bold">5m ago</span>
													</div>
													<div class="flex items-center justify-between text-[10px]">
														<span class="text-zinc-400">Tasks Created</span>
														<span class="text-white font-bold">47</span>
													</div>
												</div>
											</div>
										</div>
									</div>

									<!-- Auto-Created Ticket Example -->
									<div class="p-4 bg-gradient-to-r from-green-950/30 to-emerald-950/30 rounded-xl border border-green-900/50 shadow-lg">
										<div class="flex items-start gap-3">
											<div class="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-md">
												<TrendingUp class="w-5 h-5 text-white" />
											</div>
											<div class="flex-1">
												<div class="flex items-center gap-2 mb-2">
													<span class="text-xs font-semibold text-green-400">AUTO-CREATED TICKET</span>
													<span class="px-2 py-0.5 bg-green-950/50 text-green-400 text-xs rounded-full border border-green-900/50">Just now</span>
												</div>
												<p class="text-sm font-bold text-white mb-1">Add SSO integration with Azure AD</p>
												<p class="text-xs text-zinc-400 mb-3">Requested by Acme Corp during Q4 discovery call</p>
												
												<div class="flex flex-wrap gap-2 mb-3">
													<span class="px-2 py-1 bg-blue-950/30 text-blue-400 text-xs rounded-full font-medium border border-blue-900/50">High Priority</span>
													<span class="px-2 py-1 bg-red-950/30 text-red-400 text-xs rounded-full font-medium border border-red-900/50">Q2 2025</span>
													<span class="px-2 py-1 bg-orange-950/30 text-orange-400 text-xs rounded-full font-medium border border-orange-900/50">Enterprise</span>
												</div>

												<div class="flex gap-2">
													<button class="px-3 py-1.5 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors font-medium">View in Jira</button>
													<button class="px-3 py-1.5 bg-zinc-800 text-zinc-300 text-xs rounded-lg hover:bg-zinc-700 transition-colors font-medium">Edit Details</button>
												</div>
											</div>
										</div>
									</div>

									<!-- Value Proposition Section -->
									<div class="bg-gradient-to-br from-blue-950/20 via-zinc-950 to-zinc-950 rounded-xl border border-blue-900/50 overflow-hidden shadow-xl">
										<div class="px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
											<h5 class="text-xs font-bold text-white flex items-center gap-2">
												<svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
												</svg>
												Why Developer Integration Matters
											</h5>
										</div>
										<div class="p-4 space-y-3">
											<!-- Benefit 1: Automatic Tracking -->
											<div class="flex items-start gap-3 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 hover:border-blue-900/50 transition-colors group">
												<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg">
													<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
													</svg>
												</div>
												<div class="flex-1">
													<h6 class="text-xs font-bold text-white mb-1">Never Miss a Feature Request</h6>
													<p class="text-[11px] text-zinc-400 leading-relaxed">
														Every customer request, bug report, or feature idea mentioned in meetings is automatically captured and turned into a tracked ticket with full context and priority.
													</p>
												</div>
											</div>

											<!-- Benefit 2: Close the Loop -->
											<div class="flex items-start gap-3 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 hover:border-blue-900/50 transition-colors group">
												<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center flex-shrink-0 shadow-lg">
													<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
												</div>
												<div class="flex-1">
													<h6 class="text-xs font-bold text-white mb-1">Close the Customer-to-Dev Loop</h6>
													<p class="text-[11px] text-zinc-400 leading-relaxed">
														No more information getting lost between sales and engineering. Customer needs flow directly into your development workflow with all the context your team needs.
													</p>
												</div>
											</div>

											<!-- Benefit 3: Prioritization -->
											<div class="flex items-start gap-3 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 hover:border-blue-900/50 transition-colors group">
												<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center flex-shrink-0 shadow-lg">
													<TrendingUp class="w-4 h-4 text-white" />
												</div>
												<div class="flex-1">
													<h6 class="text-xs font-bold text-white mb-1">Smart Prioritization</h6>
													<p class="text-[11px] text-zinc-400 leading-relaxed">
														AI automatically tags tickets with priority, deal size, customer segment, and timeline so your team knows exactly what to work on first.
													</p>
												</div>
											</div>

											<!-- Benefit 4: Time Savings -->
											<div class="flex items-start gap-3 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 hover:border-blue-900/50 transition-colors group">
												<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center flex-shrink-0 shadow-lg">
													<Activity class="w-4 h-4 text-white" />
												</div>
												<div class="flex-1">
													<h6 class="text-xs font-bold text-white mb-1">Save Hours of Manual Work</h6>
													<p class="text-[11px] text-zinc-400 leading-relaxed">
														Stop manually creating tickets and updating project boards. Your development tools stay current automatically, freeing your team to focus on building.
													</p>
												</div>
											</div>
										</div>
									</div>

									<!-- Activity Timeline -->
									<div class="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
										<div class="px-4 py-2.5 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between">
											<div class="flex items-center gap-2">
												<Activity class="w-4 h-4 text-blue-500" />
												<h5 class="text-xs font-bold text-white">Recent Activity</h5>
											</div>
											<span class="px-2 py-0.5 bg-blue-950/50 text-blue-400 text-[10px] font-bold rounded-full border border-blue-900/50">LIVE</span>
										</div>

										<div class="p-3 space-y-2">
											<!-- Activity 1 -->
											<div class="flex items-center justify-between p-2.5 bg-zinc-900/40 rounded-lg border border-zinc-800 hover:bg-zinc-900/60 transition-colors">
												<div class="flex items-center gap-2.5">
													<div class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
														<svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4" />
														</svg>
													</div>
													<div>
														<p class="text-xs text-white font-semibold">Created ticket: API rate limiting</p>
														<p class="text-[10px] text-zinc-500 mt-0.5">Jira • Enterprise Request</p>
													</div>
												</div>
												<span class="text-[10px] text-zinc-600 font-mono">2m ago</span>
											</div>

											<!-- Activity 2 -->
											<div class="flex items-center justify-between p-2.5 bg-zinc-900/40 rounded-lg border border-zinc-800 hover:bg-zinc-900/60 transition-colors">
												<div class="flex items-center gap-2.5">
													<div class="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg">
														<svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
														</svg>
													</div>
													<div>
														<p class="text-xs text-white font-semibold">Updated task priority to High</p>
														<p class="text-[10px] text-zinc-500 mt-0.5">Asana • Mobile UI Bug</p>
													</div>
												</div>
												<span class="text-[10px] text-zinc-600 font-mono">8m ago</span>
											</div>

											<!-- Activity 3 -->
											<div class="flex items-center justify-between p-2.5 bg-zinc-900/40 rounded-lg border border-zinc-800 hover:bg-zinc-900/60 transition-colors">
												<div class="flex items-center gap-2.5">
													<div class="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
														<FileText class="w-3.5 h-3.5 text-white" />
													</div>
													<div>
														<p class="text-xs text-white font-semibold">Added meeting notes to sprint</p>
														<p class="text-[10px] text-zinc-500 mt-0.5">Jira • Q1 Planning</p>
													</div>
												</div>
												<span class="text-[10px] text-zinc-600 font-mono">15m ago</span>
											</div>
										</div>
									</div>

									<!-- Performance Metrics -->
									<div class="grid grid-cols-3 gap-2">
										<div class="relative overflow-hidden bg-gradient-to-br from-blue-950/30 to-blue-900/10 rounded-xl border border-blue-900/50 p-3 text-center group hover:scale-105 transition-transform">
											<div class="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl"></div>
											<div class="relative">
												<div class="text-2xl font-bold text-blue-500 mb-1">47</div>
												<div class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Tickets Created</div>
												<div class="text-[9px] text-blue-400/70 mt-0.5">This month</div>
											</div>
										</div>
										<div class="relative overflow-hidden bg-gradient-to-br from-green-950/30 to-green-900/10 rounded-xl border border-green-900/50 p-3 text-center group hover:scale-105 transition-transform">
											<div class="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-2xl"></div>
											<div class="relative">
												<div class="text-2xl font-bold text-green-500 mb-1">3.2h</div>
												<div class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Time Saved</div>
												<div class="text-[9px] text-green-400/70 mt-0.5">Per week</div>
											</div>
										</div>
										<div class="relative overflow-hidden bg-gradient-to-br from-purple-950/30 to-purple-900/10 rounded-xl border border-purple-900/50 p-3 text-center group hover:scale-105 transition-transform">
											<div class="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-2xl"></div>
											<div class="relative">
												<div class="text-2xl font-bold text-purple-500 mb-1">100%</div>
												<div class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Captured</div>
												<div class="text-[9px] text-purple-400/70 mt-0.5">No requests lost</div>
											</div>
										</div>
									</div>
								</div>
							{:else if selectedFeature === 'crm-integrations'}
								<div class="space-y-3">
									<!-- Header Section -->
									<div class="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 rounded-xl border border-zinc-800 p-4 shadow-2xl">
										<div class="flex items-center justify-between mb-3">
											<div>
												<h4 class="text-sm font-bold text-white mb-1">CRM Integration</h4>
												<p class="text-xs text-zinc-400">Zoho, Salesforce, and More</p>
											</div>
											<div class="px-3 py-1.5 bg-green-950/40 border border-green-900/50 rounded-full flex items-center gap-2">
												<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
												<span class="text-xs font-bold text-green-400">ALL SYSTEMS SYNCED</span>
											</div>
										</div>
										<p class="text-xs text-zinc-300 leading-relaxed">
											Keep your CRM updated automatically. Every conversation, insight, and action item is synced in real-time, ensuring your sales data is always accurate and up-to-date.
										</p>
									</div>

									<!-- CRM Platform Cards with Logos -->
									<div class="grid grid-cols-2 gap-3">
										<!-- Salesforce Card -->
										<div class="relative overflow-hidden group">
											<div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
											<div class="relative p-4 bg-zinc-900 rounded-xl border-2 border-blue-900/50 hover:border-blue-600 transition-all cursor-pointer shadow-lg hover:shadow-blue-600/20">
												<div class="flex items-center gap-3 mb-3">
													<div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-xl shadow-blue-600/30">
														<svg class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
															<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 17.5h-9v-11h9v11z"/>
														</svg>
													</div>
													<div class="flex-1">
														<span class="font-bold text-white text-sm block">Salesforce</span>
														<div class="flex items-center gap-1.5 mt-1">
															<div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
															<span class="text-[10px] text-green-400 font-bold">SYNCING</span>
														</div>
													</div>
												</div>
												<div class="space-y-1.5">
													<div class="flex items-center justify-between text-[10px]">
														<span class="text-zinc-400">Last Sync</span>
														<span class="text-blue-400 font-bold">2m ago</span>
													</div>
													<div class="flex items-center justify-between text-[10px]">
														<span class="text-zinc-400">Records Synced</span>
														<span class="text-white font-bold">1,247</span>
													</div>
												</div>
											</div>
										</div>

										<!-- Zoho Card -->
										<div class="relative overflow-hidden group">
											<div class="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
											<div class="relative p-4 bg-zinc-900 rounded-xl border-2 border-orange-900/50 hover:border-orange-600 transition-all cursor-pointer shadow-lg hover:shadow-orange-600/20">
												<div class="flex items-center gap-3 mb-3">
													<div class="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-700 rounded-xl flex items-center justify-center shadow-xl shadow-orange-600/30">
														<svg class="w-6 h-6 text-white font-bold" viewBox="0 0 24 24" fill="currentColor">
															<text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="14" font-weight="bold">Z</text>
														</svg>
													</div>
													<div class="flex-1">
														<span class="font-bold text-white text-sm block">Zoho CRM</span>
														<div class="flex items-center gap-1.5 mt-1">
															<div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
															<span class="text-[10px] text-green-400 font-bold">SYNCING</span>
														</div>
													</div>
												</div>
												<div class="space-y-1.5">
													<div class="flex items-center justify-between text-[10px]">
														<span class="text-zinc-400">Last Sync</span>
														<span class="text-orange-400 font-bold">1m ago</span>
													</div>
													<div class="flex items-center justify-between text-[10px]">
														<span class="text-zinc-400">Records Synced</span>
														<span class="text-white font-bold">892</span>
													</div>
												</div>
											</div>
										</div>
									</div>

									<!-- Value Proposition Section -->
									<div class="bg-gradient-to-br from-red-950/20 via-zinc-950 to-zinc-950 rounded-xl border border-red-900/50 overflow-hidden shadow-xl">
										<div class="px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
											<h5 class="text-xs font-bold text-white flex items-center gap-2">
												<svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
												</svg>
												Why CRM Integration is Game-Changing
											</h5>
										</div>
										<div class="p-4 space-y-3">
											<!-- Benefit 1: Customer History -->
											<div class="flex items-start gap-3 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 hover:border-red-900/50 transition-colors group">
												<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center flex-shrink-0 shadow-lg">
													<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
												</div>
												<div class="flex-1">
													<h6 class="text-xs font-bold text-white mb-1">Complete Customer History at Your Fingertips</h6>
													<p class="text-[11px] text-zinc-400 leading-relaxed">
														Every conversation, email, meeting note, and interaction automatically synced to your CRM. Never miss context or forget important details about your customers.
													</p>
												</div>
											</div>

											<!-- Benefit 2: Automated Data Entry -->
											<div class="flex items-start gap-3 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 hover:border-red-900/50 transition-colors group">
												<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center flex-shrink-0 shadow-lg">
													<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
													</svg>
												</div>
												<div class="flex-1">
													<h6 class="text-xs font-bold text-white mb-1">Zero Manual Data Entry</h6>
													<p class="text-[11px] text-zinc-400 leading-relaxed">
														Save 3+ hours per day. Deal stages, contact info, sentiment scores, action items, and meeting summaries are automatically updated in real-time.
													</p>
												</div>
											</div>

											<!-- Benefit 3: Team Alignment -->
											<div class="flex items-start gap-3 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 hover:border-red-900/50 transition-colors group">
												<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center flex-shrink-0 shadow-lg">
													<Users class="w-4 h-4 text-white" />
												</div>
												<div class="flex-1">
													<h6 class="text-xs font-bold text-white mb-1">Perfect Team Alignment</h6>
													<p class="text-[11px] text-zinc-400 leading-relaxed">
														Your entire team sees the same up-to-date information. Sales, support, and management stay perfectly aligned on every customer interaction.
													</p>
												</div>
											</div>

											<!-- Benefit 4: Data Accuracy -->
											<div class="flex items-start gap-3 p-3 bg-zinc-900/60 rounded-lg border border-zinc-800 hover:border-red-900/50 transition-colors group">
												<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center flex-shrink-0 shadow-lg">
													<Target class="w-4 h-4 text-white" />
												</div>
												<div class="flex-1">
													<h6 class="text-xs font-bold text-white mb-1">100% Data Accuracy</h6>
													<p class="text-[11px] text-zinc-400 leading-relaxed">
														No more outdated or missing information. AI ensures every field is populated correctly with verified data from actual conversations.
													</p>
												</div>
											</div>
										</div>
									</div>

									<!-- Live Sync Activity Feed -->
									<div class="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
										<div class="px-4 py-2.5 bg-zinc-900/50 border-b border-zinc-800 flex items-center justify-between">
											<div class="flex items-center gap-2">
												<BarChart3 class="w-4 h-4 text-blue-500" />
												<h5 class="text-xs font-bold text-white">Recent Sync Activity</h5>
											</div>
											<span class="px-2 py-0.5 bg-blue-950/50 text-blue-400 text-[10px] font-bold rounded-full border border-blue-900/50">LIVE</span>
										</div>

										<div class="p-3 space-y-2">
											<!-- Sync Activity 1 -->
											<div class="flex items-center justify-between p-2.5 bg-zinc-900/40 rounded-lg border border-zinc-800 hover:bg-zinc-900/60 transition-colors">
												<div class="flex items-center gap-2.5">
													<div class="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center shadow-lg">
														<svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
														</svg>
													</div>
													<div>
														<p class="text-xs text-white font-semibold">Updated deal stage to "Negotiation"</p>
														<p class="text-[10px] text-zinc-500 mt-0.5">Salesforce • Acme Corp Deal</p>
													</div>
												</div>
												<span class="text-[10px] text-zinc-600 font-mono">2m ago</span>
											</div>

											<!-- Sync Activity 2 -->
											<div class="flex items-center justify-between p-2.5 bg-zinc-900/40 rounded-lg border border-zinc-800 hover:bg-zinc-900/60 transition-colors">
												<div class="flex items-center gap-2.5">
													<div class="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
														<FileText class="w-3.5 h-3.5 text-white" />
													</div>
													<div>
														<p class="text-xs text-white font-semibold">Added meeting notes & transcript</p>
														<p class="text-[10px] text-zinc-500 mt-0.5">Zoho CRM • Q2 Planning Call</p>
													</div>
												</div>
												<span class="text-[10px] text-zinc-600 font-mono">5m ago</span>
											</div>

											<!-- Sync Activity 3 -->
											<div class="flex items-center justify-between p-2.5 bg-zinc-900/40 rounded-lg border border-zinc-800 hover:bg-zinc-900/60 transition-colors">
												<div class="flex items-center gap-2.5">
													<div class="w-7 h-7 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
														<Target class="w-3.5 h-3.5 text-white" />
													</div>
													<div>
														<p class="text-xs text-white font-semibold">Created 3 follow-up tasks</p>
														<p class="text-[10px] text-zinc-500 mt-0.5">Salesforce • Demo Follow-up</p>
													</div>
												</div>
												<span class="text-[10px] text-zinc-600 font-mono">8m ago</span>
											</div>

											<!-- Sync Activity 4 -->
											<div class="flex items-center justify-between p-2.5 bg-zinc-900/40 rounded-lg border border-zinc-800 hover:bg-zinc-900/60 transition-colors">
												<div class="flex items-center gap-2.5">
													<div class="w-7 h-7 rounded-full bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center shadow-lg">
														<Activity class="w-3.5 h-3.5 text-white" />
													</div>
													<div>
														<p class="text-xs text-white font-semibold">Updated contact sentiment score</p>
														<p class="text-[10px] text-zinc-500 mt-0.5">Zoho CRM • John Doe Contact</p>
													</div>
												</div>
												<span class="text-[10px] text-zinc-600 font-mono">12m ago</span>
											</div>
										</div>
									</div>

									<!-- Performance Metrics -->
									<div class="grid grid-cols-3 gap-2">
										<div class="relative overflow-hidden bg-gradient-to-br from-red-950/30 to-red-900/10 rounded-xl border border-red-900/50 p-3 text-center group hover:scale-105 transition-transform">
											<div class="absolute top-0 right-0 w-16 h-16 bg-red-500/10 rounded-full blur-2xl"></div>
											<div class="relative">
												<div class="text-2xl font-bold text-red-500 mb-1">247</div>
												<div class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Records Today</div>
												<div class="text-[9px] text-red-400/70 mt-0.5">Auto-synced</div>
											</div>
										</div>
										<div class="relative overflow-hidden bg-gradient-to-br from-green-950/30 to-green-900/10 rounded-xl border border-green-900/50 p-3 text-center group hover:scale-105 transition-transform">
											<div class="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-2xl"></div>
											<div class="relative">
												<div class="text-2xl font-bold text-green-500 mb-1">100%</div>
												<div class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Success Rate</div>
												<div class="text-[9px] text-green-400/70 mt-0.5">Zero errors</div>
											</div>
										</div>
										<div class="relative overflow-hidden bg-gradient-to-br from-blue-950/30 to-blue-900/10 rounded-xl border border-blue-900/50 p-3 text-center group hover:scale-105 transition-transform">
											<div class="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-2xl"></div>
											<div class="relative">
												<div class="text-2xl font-bold text-blue-500 mb-1">2.4s</div>
												<div class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wide">Avg Sync Time</div>
												<div class="text-[9px] text-blue-400/70 mt-0.5">Real-time</div>
											</div>
										</div>
									</div>
								</div>
							{:else if selectedFeature === 'sentiment'}
								<div class="space-y-4">
									<!-- Overall Sentiment Dashboard -->
									<div class="p-4 bg-gradient-to-r from-green-950/30 to-emerald-950/30 rounded-xl border border-green-900/50 shadow-lg">
										<div class="flex items-center justify-between mb-4">
											<span class="text-sm font-bold text-white">Overall Deal Health</span>
											<div class="flex items-center gap-2">
												<Heart class="w-5 h-5 text-green-500 fill-green-500 animate-pulse" />
												<span class="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">87%</span>
											</div>
										</div>
										
										<!-- Progress Bar -->
										<div class="relative w-full bg-zinc-800 rounded-full h-4 overflow-hidden mb-3 shadow-inner">
											<div class="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 flex items-center justify-end pr-2" style="width: 87%">
												<span class="text-xs text-white font-bold">Excellent</span>
											</div>
										</div>

										<!-- Sentiment Indicators -->
										<div class="grid grid-cols-3 gap-2">
											<div class="text-center">
												<div class="text-xs text-zinc-500">Positive</div>
												<div class="text-lg font-bold text-green-500">73%</div>
											</div>
											<div class="text-center">
												<div class="text-xs text-zinc-500">Neutral</div>
												<div class="text-lg font-bold text-zinc-400">22%</div>
											</div>
											<div class="text-center">
												<div class="text-xs text-zinc-500">Negative</div>
												<div class="text-lg font-bold text-red-500">5%</div>
											</div>
										</div>
									</div>

									<!-- Real-time Metrics -->
									<div class="grid grid-cols-2 gap-3">
										<div class="p-4 bg-gradient-to-br from-blue-950/30 to-cyan-950/30 rounded-xl border border-blue-900/50 shadow-md">
											<div class="flex items-center gap-2 mb-2">
												<TrendingUp class="w-5 h-5 text-blue-500" />
												<span class="text-xs font-semibold text-zinc-300">Engagement</span>
											</div>
											<div class="text-3xl font-bold text-blue-500 mb-1">High</div>
											<div class="w-full bg-blue-950/30 rounded-full h-1.5">
												<div class="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full" style="width: 92%"></div>
											</div>
										</div>

										<div class="p-4 bg-gradient-to-br from-green-950/30 to-emerald-950/30 rounded-xl border border-green-900/50 shadow-md">
											<div class="flex items-center gap-2 mb-2">
												<Sparkles class="w-5 h-5 text-green-500" />
												<span class="text-xs font-semibold text-zinc-300">Buying Signals</span>
											</div>
											<div class="text-3xl font-bold text-green-500 mb-1">8</div>
											<div class="flex gap-1 mt-2">
												{#each Array(8) as _, i}
													<div class="flex-1 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
												{/each}
											</div>
										</div>
									</div>

									<!-- Live Alerts -->
									<div class="space-y-2">
										<div class="p-3 bg-gradient-to-r from-yellow-950/30 to-amber-950/30 rounded-lg border-l-4 border-yellow-500 shadow-md">
											<div class="flex items-start gap-2">
												<div class="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
													<span class="text-white text-xs">!</span>
												</div>
												<div class="flex-1">
													<div class="text-xs font-semibold text-yellow-400 mb-1">CONCERN DETECTED</div>
													<p class="text-xs text-zinc-300">Implementation timeline concerns mentioned at 24:32</p>
												</div>
											</div>
										</div>

										<div class="p-3 bg-gradient-to-r from-green-950/30 to-emerald-950/30 rounded-lg border-l-4 border-green-500 shadow-md">
											<div class="flex items-start gap-2">
												<div class="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
													<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
													</svg>
												</div>
												<div class="flex-1">
													<div class="text-xs font-semibold text-green-400 mb-1">BUYING SIGNAL</div>
													<p class="text-xs text-zinc-300">Client asked about onboarding process - strong interest</p>
												</div>
											</div>
										</div>
									</div>

									<!-- Emotion Timeline -->
									<div class="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
										<div class="text-xs font-semibold text-zinc-400 mb-2">SENTIMENT TIMELINE</div>
										<div class="flex items-end gap-1 h-16">
											{#each [65, 70, 85, 78, 90, 87, 82, 88, 92, 87] as height}
												<div class="flex-1 bg-gradient-to-t from-green-500 to-emerald-500 rounded-t transition-all duration-500 hover:opacity-80" style="height: {height}%"></div>
											{/each}
										</div>
										<div class="flex justify-between mt-1 text-xs text-gray-500">
											<span>0m</span>
											<span>45m</span>
										</div>
									</div>
								</div>
							{:else if selectedFeature === 'custom'}
								<div class="space-y-4">
									<!-- Meeting Goals Dashboard -->
									<div class="p-4 bg-gradient-to-r from-red-950/30 to-red-950/20 rounded-xl border border-red-900/50 shadow-lg">
										<div class="flex items-center justify-between mb-4">
											<div class="flex items-center gap-2">
												<Settings class="w-5 h-5 text-red-500" />
												<span class="text-sm font-bold text-white">Discovery Call Goals</span>
											</div>
											<span class="px-3 py-1 bg-red-950/50 text-red-400 text-xs rounded-full font-semibold border border-red-900/50">3/4 Complete</span>
										</div>
										
										<div class="space-y-2">
											<!-- Completed Goal 1 -->
											<div class="flex items-center justify-between p-3 bg-gradient-to-r from-green-950/30 to-emerald-950/30 rounded-lg border border-green-900/50 shadow-sm">
												<div class="flex items-center gap-3 flex-1">
													<div class="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
														<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
														</svg>
													</div>
													<div class="flex-1">
														<span class="text-sm text-white font-medium">Identify decision maker</span>
														<div class="text-xs text-green-400 mt-0.5">Completed at 12:34</div>
													</div>
												</div>
												<span class="text-xs text-gray-500">14m ago</span>
											</div>

											<!-- Completed Goal 2 -->
											<div class="flex items-center justify-between p-3 bg-gradient-to-r from-green-950/30 to-emerald-950/30 rounded-lg border border-green-900/50 shadow-sm">
												<div class="flex items-center gap-3 flex-1">
													<div class="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
														<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
														</svg>
													</div>
													<div class="flex-1">
														<span class="text-sm text-white font-medium">Understand budget range</span>
														<div class="text-xs text-green-400 mt-0.5">Completed at 18:42</div>
													</div>
												</div>
												<span class="text-xs text-gray-500">8m ago</span>
											</div>

											<!-- Completed Goal 3 -->
											<div class="flex items-center justify-between p-3 bg-gradient-to-r from-green-950/30 to-emerald-950/30 rounded-lg border border-green-900/50 shadow-sm">
												<div class="flex items-center gap-3 flex-1">
													<div class="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
														<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
														</svg>
													</div>
													<div class="flex-1">
														<span class="text-sm text-white font-medium">Identify pain points</span>
														<div class="text-xs text-green-400 mt-0.5">Completed at 22:15</div>
													</div>
												</div>
												<span class="text-xs text-gray-500">4m ago</span>
											</div>

											<!-- Pending Goal -->
											<div class="flex items-center justify-between p-3 bg-zinc-900 rounded-lg border-2 border-dashed border-zinc-700 opacity-60">
												<div class="flex items-center gap-3 flex-1">
													<div class="w-6 h-6 rounded-full border-2 border-zinc-700 flex items-center justify-center">
														<div class="w-2 h-2 bg-gray-400 rounded-full"></div>
													</div>
													<div class="flex-1">
														<span class="text-sm text-zinc-300 font-medium">Confirm timeline</span>
														<div class="text-xs text-gray-500 mt-0.5">Pending</div>
													</div>
												</div>
												<span class="text-xs text-yellow-600 dark:text-yellow-400 font-medium">In Progress</span>
											</div>
										</div>

										<!-- AI Suggestion -->
										<div class="mt-3 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700/50">
											<div class="flex items-center gap-2">
												<Brain class="w-4 h-4 text-blue-600" />
												<span class="text-xs text-blue-700 dark:text-blue-400 font-medium">AI suggests asking about procurement process next</span>
											</div>
										</div>
									</div>

									<!-- Performance Analytics -->
									<div class="p-4 bg-zinc-900 rounded-xl border border-zinc-800 shadow-md">
										<div class="flex items-center justify-between mb-3">
											<div class="text-xs font-semibold text-gray-600 dark:text-gray-400">GOAL COMPLETION RATE</div>
											<span class="text-sm font-bold text-purple-600">85%</span>
										</div>
										<div class="flex items-end gap-1 h-24 mb-2">
											{#each [60, 75, 85, 90, 95, 88, 92] as height, i}
												<div class="flex-1 bg-gradient-to-t from-purple-600 to-blue-600 rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer group relative" style="height: {height}px">
													<div class="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
														{height}%
													</div>
												</div>
											{/each}
										</div>
										<div class="flex justify-between text-xs text-gray-500">
											<span>Mon</span>
											<span>Sun</span>
										</div>
									</div>

									<!-- Quick Stats -->
									<div class="grid grid-cols-3 gap-2">
										<div class="p-3 bg-gradient-to-br from-red-950/20 to-red-950/20 rounded-lg text-center border border-red-900/50">
											<div class="text-lg font-bold text-red-500">24</div>
											<div class="text-xs text-zinc-500">Active Goals</div>
										</div>
										<div class="p-3 bg-gradient-to-br from-green-950/20 to-emerald-950/20 rounded-lg text-center border border-green-900/50">
											<div class="text-lg font-bold text-green-500">187</div>
											<div class="text-xs text-zinc-500">Completed</div>
										</div>
										<div class="p-3 bg-gradient-to-br from-blue-950/20 to-cyan-950/20 rounded-lg text-center border border-blue-900/50">
											<div class="text-lg font-bold text-blue-500">8</div>
											<div class="text-xs text-zinc-500">Templates</div>
										</div>
									</div>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<!-- Right Side: Interactive Grid -->
			<div class="lg:sticky lg:top-24">
				<div class="grid grid-cols-2 gap-3 max-w-md mx-auto lg:max-w-none">
					{#each features as feature, idx}
						{@const Icon = feature.icon}
						<div class="relative">
							<button
								onmouseenter={() => {
									hoveredFeature = feature.id;
									selectedFeature = feature.id;
								}}
								onmouseleave={() => hoveredFeature = null}
								class="group relative bg-zinc-950 rounded-xl p-4 border-2 transition-all duration-500 ease-out active:scale-[0.97] w-full
								{selectedFeature === feature.id ? 'border-red-500 bg-gradient-to-br from-red-950/30 to-zinc-950/50 shadow-lg shadow-red-500/20' : 'border-zinc-800 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/10'}"
								style="transition-delay: {idx * 30}ms; transform: translate3d(0, 0, 0);"
							>
								<!-- Checkbox -->
								<div class="absolute top-3 left-3 w-4 h-4 rounded border-2 transition-all duration-500 ease-out
									{selectedFeature === feature.id ? 'bg-red-500 border-red-500 scale-110' : 'border-zinc-700 group-hover:border-red-500 group-hover:scale-105'}">
									{#if selectedFeature === feature.id}
										<svg class="w-full h-full text-white p-0.5 animate-in fade-in zoom-in duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
										</svg>
									{/if}
								</div>
								
								<!-- Icon -->
								<div class="flex flex-col items-center justify-center pt-3 pb-1">
									<div class="w-12 h-12 mb-3 flex items-center justify-center text-zinc-500 group-hover:text-red-500 transition-all duration-500 ease-out group-hover:scale-110
										{selectedFeature === feature.id ? 'text-red-500 scale-110' : ''}">
										<Icon class="w-full h-full" strokeWidth={1.5} />
									</div>
									
									<!-- Title -->
									<h3 class="text-sm font-semibold text-white text-center transition-all duration-500 ease-out
										{selectedFeature === feature.id ? 'text-red-500' : ''}">
										{feature.title}
									</h3>
								</div>
								
								<!-- Selection indicator glow with animation -->
								{#if selectedFeature === feature.id}
									<div class="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/10 to-red-600/10 pointer-events-none animate-in fade-in duration-500"></div>
									<div class="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400/20 to-red-500/20 blur-xl pointer-events-none animate-pulse"></div>
								{/if}
							</button>
							
							<!-- Learn More Link -->
							{#if feature.href}
								<a 
									href={feature.href}
									class="mt-2 inline-flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-red-500 transition-all duration-300 group/link w-full"
								>
									<span>View Details</span>
									<svg class="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
									</svg>
								</a>
							{/if}
						</div>
					{/each}
				</div>

				<!-- Get Started Button -->
				<div class="text-center mt-6">
					<button class="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold text-base hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 ease-out flex items-center gap-3 mx-auto group shadow-lg shadow-red-500/30">
						<span>Get Started</span>
						<svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
					</button>
					<p class="mt-3 text-xs text-zinc-500">No credit card needed • Unlimited time on Free plan</p>
				</div>
			</div>
		</div>
	</div>

</section>

<style>
	@keyframes blob {
		0%, 100% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}
	
	.animate-blob {
		animation: blob 7s infinite;
	}
	
	.animation-delay-2000 {
		animation-delay: 2s;
	}
	
	.animation-delay-4000 {
		animation-delay: 4s;
	}

	/* Smooth transition animations */
	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes zoom-in {
		from {
			transform: scale(0.5);
		}
		to {
			transform: scale(1);
		}
	}

	.animate-in {
		animation-fill-mode: both;
	}

	.fade-in {
		animation-name: fade-in;
	}

	.zoom-in {
		animation-name: zoom-in;
	}

	.duration-300 {
		animation-duration: 300ms;
	}

	.duration-500 {
		animation-duration: 500ms;
	}

	/* Hardware acceleration for smooth animations */
	button {
		transform: translateZ(0);
		backface-visibility: hidden;
		-webkit-font-smoothing: antialiased;
	}

	/* Ensure transitions don't cause layout shift */
	:global(body) {
		-webkit-app-region: drag;
	}

	/* Optimize for smooth 60fps transitions */
	@media (prefers-reduced-motion: no-preference) {
		* {
			--tw-transition-property: all;
			--tw-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			--tw-transition-duration: 300ms;
		}
	}

</style>
