<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { Sparkles, MessageSquare, Brain, FileText, Users, Calendar } from 'lucide-svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';

	// Track selected question - default to 'roi'
	let selectedQuestion = 'roi';
	// Track hovered question for preview
	let hoveredQuestion = null;

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
				{ label: 'CRM platforms', value: 'Salesforce, HubSpot, Pipedrive' },
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
	/* Custom scrollbar styles */
	.scrollbar-thin::-webkit-scrollbar {
		width: 6px;
	}

	.scrollbar-thin::-webkit-scrollbar-track {
		background: #18181b;
		border-radius: 3px;
	}

	.scrollbar-thin::-webkit-scrollbar-thumb {
		background: #3f3f46;
		border-radius: 3px;
	}

	.scrollbar-thin::-webkit-scrollbar-thumb:hover {
		background: #52525b;
	}

	/* Fade in animation for AI response */
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
</style>

<div class="min-h-screen bg-black">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="ai-assistance" />
	
	<!-- Hero Section -->
	<section class="relative pt-40 pb-20 overflow-hidden">
		<!-- Background Effects -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
			<div class="absolute bottom-1/4 -right-48 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
		</div>

		<div class="max-w-7xl mx-auto px-6 relative">
			<div class="text-center mb-16">
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-red-950/30 border border-red-900/50 rounded-full mb-6">
					<Sparkles class="w-4 h-4 text-red-500" />
					<span class="text-sm font-semibold text-red-400">Real-Time AI Assistance</span>
				</div>
				<h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
					Never Get Caught Off Guard<br/>
					<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">During a Sales Call</span>
				</h1>
				<p class="text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
					Instant, accurate answers from your entire knowledge base—delivered in under 2 seconds
				</p>
				<p class="text-lg text-zinc-500 max-w-2xl mx-auto">
					Stop scrambling for information mid-call. SpikedAI analyzes your product docs, pricing sheets, case studies, and competitive intel in real-time, giving you the perfect answer exactly when you need it.
				</p>
			</div>

			<!-- Live Demo Section -->
			<div class="max-w-5xl mx-auto">
				<div class="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 rounded-xl border border-zinc-800 p-4 shadow-2xl">
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
						<div class="grid grid-cols-[1fr_1.2fr] h-[600px]">
							<!-- Left Panel: Live Transcription -->
							<div class="border-r border-zinc-800 flex flex-col bg-zinc-950/50">
								<div class="px-3 py-2 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
									<div class="flex items-center gap-2">
										<MessageSquare class="w-4 h-4 text-zinc-400" />
										<h5 class="text-xs font-bold text-white">Live Transcription</h5>
									</div>
									<span class="text-xs text-zinc-500">Real-time meeting insights</span>
								</div>
								
								<div class="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
									<!-- Transcription entries -->
									{#each dialogues as dialogue}
										<button
											onclick={() => dialogue.isQuestion && selectQuestion(dialogue.questionType)}
											onmouseenter={() => handleMouseEnter(dialogue.questionType)}
											onmouseleave={handleMouseLeave}
											class="flex gap-2 group p-2 rounded-lg transition-all w-full text-left relative {dialogue.isQuestion ? 'bg-blue-950/20 border border-blue-900/50 hover:bg-blue-950/40 hover:border-blue-800/70 cursor-pointer hover:scale-[1.02]' : 'hover:bg-zinc-900/30'} {selectedQuestion === dialogue.questionType ? 'ring-2 ring-red-500/50 bg-blue-950/30' : ''}"
										>
											{#if dialogue.color === 'blue'}
												<div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">{dialogue.initials}</div>
											{:else}
												<div class="w-6 h-6 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">{dialogue.initials}</div>
											{/if}
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

								<div class="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
									<!-- Debug info (remove in production) -->
									<!-- <div class="text-xs text-zinc-500 mb-2">Hovered: {hoveredQuestion || 'none'} | Selected: {selectedQuestion || 'none'}</div> -->
									
									{#if (hoveredQuestion || selectedQuestion) && aiResponses[hoveredQuestion || selectedQuestion]}
										<!-- Active AI Response Card -->
										<div class="bg-gradient-to-br from-red-950/40 to-red-900/20 border border-red-900/60 rounded-xl p-3 shadow-xl animate-fadeIn">
											<div class="flex items-start gap-2 mb-2">
												<div class="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center flex-shrink-0 shadow-lg">
													<Sparkles class="w-4 h-4 text-white" />
												</div>
												<div class="flex-1">
													<div class="flex items-center gap-2 mb-1">
														<span class="text-xs font-bold text-white">Copilot</span>
														<span class="px-1.5 py-0.5 bg-red-600/40 border border-red-500/50 text-[9px] font-bold text-red-300 rounded">
															{hoveredQuestion ? 'PREVIEW' : 'ACTIVE'}
														</span>
													</div>
													<p class="text-xs font-semibold text-red-300 mb-2">
														Your Question: {aiResponses[hoveredQuestion || selectedQuestion].question}
													</p>
												</div>
											</div>

											<!-- AI Generated Answer -->
											<div class="bg-zinc-900/80 rounded-lg p-3 border border-zinc-800 space-y-2">
												<h6 class="text-xs font-bold text-white mb-1.5">{aiResponses[hoveredQuestion || selectedQuestion].title}</h6>
												<p class="text-xs text-zinc-300 leading-relaxed mb-2">
													{aiResponses[hoveredQuestion || selectedQuestion].description}
												</p>
												
												<ul class="space-y-1 text-[11px] text-zinc-400">
													{#each aiResponses[hoveredQuestion || selectedQuestion].points as point}
														<li class="flex items-start gap-1.5">
															<span class="text-red-500 mt-0.5">•</span>
															<span><span class="text-white font-semibold">{point.label}:</span> {point.value}</span>
														</li>
													{/each}
												</ul>

												<!-- Source Reference -->
												<div class="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between">
													<div class="flex items-center gap-1.5 text-[10px] text-red-400">
														<FileText class="w-3 h-3" />
														<span class="font-medium">{aiResponses[hoveredQuestion || selectedQuestion].source}</span>
													</div>
													<button class="flex items-center gap-1 px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-semibold rounded transition-colors">
														Use
													</button>
												</div>
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
	</section>

	<!-- Features Section -->
	<section class="py-20 bg-zinc-950/50">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-12">
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
			<h2 class="text-4xl font-bold text-white mb-6">Stop Winging It. Start Winning.</h2>
			<p class="text-xl text-zinc-400 mb-8">Give your team instant access to perfect answers and watch your close rates soar.</p>
			<button 
				onclick={onboardingStore.start}
				class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all"
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
