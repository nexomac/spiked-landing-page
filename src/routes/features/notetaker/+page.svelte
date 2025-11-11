<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { MessageSquare, Activity, Users, Calendar, FileText, Brain, Sparkles, Mail, Download, Zap, Target, TrendingUp, Clock, CheckCircle, AlertCircle, Send, FileSearch, BarChart3, Lightbulb, Settings, Bot, Share } from 'lucide-svelte';

	let activeTab = 'templates';
	let selectedTemplate = 'summary';
	let hoveredTemplate = null;
	let selectedCustomGoal = 'status of jira';
	let showAIChat = false;

	// AI Templates from the screenshots
	const prebuiltTemplates = [
		{
			id: 'summary',
			icon: FileText,
			name: 'Summary',
			description: 'Quickly summarize the meeting highlights, action items, and next steps.',
			color: 'blue'
		},
		{
			id: 'stakeholder',
			icon: Users,
			name: 'Stakeholder Mapper',
			description: 'Map and analyze key stakeholder relationships',
			color: 'green'
		},
		{
			id: 'battle-card',
			icon: Target,
			name: 'Battle Card Intelligence',
			description: 'Competitive intelligence and positioning',
			color: 'red'
		},
		{
			id: 'playbook',
			icon: Brain,
			name: 'PLAYBOOK Command Center',
			description: 'MEDDIC qualification framework',
			color: 'purple'
		},
		{
			id: 'crm-sync',
			icon: Activity,
			name: 'CRM Sync Studio',
			description: 'Synchronize and optimize CRM data',
			color: 'cyan'
		},
		{
			id: 'deal-health',
			icon: TrendingUp,
			name: 'Deal Health Monitor',
			description: 'Track and monitor deal progression',
			color: 'orange'
		},
		{
			id: 'followup',
			icon: Mail,
			name: 'Follow-Up Email Composer',
			description: 'Craft personalized follow-up emails',
			color: 'pink'
		},
		{
			id: 'executive',
			icon: FileSearch,
			name: 'Executive Briefing',
			description: 'Generate executive summaries and briefs',
			color: 'indigo'
		},
		{
			id: 'participant',
			icon: Users,
			name: 'Participant Analysis',
			description: 'Individual analysis for each meeting participant',
			color: 'teal'
		}
	];

	// Custom Goals from the screenshots
	const customGoals = [
		{ id: 'status of jira', text: 'status of jira', status: 'No detected evidence' },
		{ id: 'economic buyer', text: 'economic buyer', status: 'No detected evidence' },
		{ id: 'dhruv chirag working', text: 'what are dhruv and chirag working on', status: 'No detected evidence' },
		{ id: 'owner notetaker', text: 'can you tell who is the owner of notetaker', status: 'No detected evidence' },
		{ id: 'mumbai status', text: 'Check the status of Mumbai', status: 'No detected evidence' }
	];

	// Template output data
	const templateOutputs = {
		summary: {
			title: 'Meeting Summary Analysis',
			sections: [
				{
					heading: 'Key Discussion Points',
					items: [
						'High latency issues with the current system',
						'The need for custom templates to improve the summary generation process',
						'Issues with the selection of custom templates and their impact on the output',
						'The desire to generate a PDF summary and share it via a button'
					]
				},
				{
					heading: 'Action Items and Owners',
					items: [
						'<strong>Chirag Chintaal:</strong> Remove a button from the interface, potentially related to the PDF generation and sharing process',
						'<strong>Smruthi S Kadagadkai:</strong> Investigate and resolve the high latency issue, explore custom template options, and refine the summary generation process'
					]
				},
				{
					heading: 'Next Steps',
					content: 'The next steps in this process are not clearly defined in the transcript, but it appears that Chirag Chintaal will work on removing the button, while Smruthi S Kadagadkai will focus on addressing the technical issues and improving the summary generation process.'
				},
				{
					heading: 'Follow-up Questions',
					items: [
						'What is the root cause of the high latency issue, and what steps can be taken to resolve it?',
						'How will the custom templates be designed and implemented to improve the summary generation process?'
					]
				}
			]
		},
		stakeholder: {
			title: 'Stakeholder Relationship Map',
			sections: [
				{
					heading: 'Primary Stakeholders',
					items: [
						'<strong>Chirag Chintaal:</strong> Technical Lead - High influence, focused on implementation',
						'<strong>Smruthi S Kadagadkai:</strong> Product Manager - High influence, decision maker'
					]
				}
			]
		}
	};

	// AI Chat messages
	const aiChatMessages = [
		{
			type: 'user',
			text: 'What is kore.ai?',
			time: '21:18'
		},
		{
			type: 'ai',
			text: `Kore.ai is not explicitly mentioned in the provided meeting transcript, as there is no transcript given. However, based on general knowledge, kore.ai is a platform that provides conversational AI solutions for businesses, enabling them to build and deploy AI-powered chatbots and virtual assistants.

To provide a more accurate answer, I would need access to the meeting transcript.

Follow-up questions:
1. What are the key features of Kore.ai?
2. How can Kore.ai be applied in business settings?
3. What are the benefits of using Kore.ai for conversational AI solutions?`,
			time: '21:18'
		}
	];

	function selectTemplate(templateId) {
		selectedTemplate = templateId;
		activeTab = 'output';
	}

	function selectCustomGoal(goalId) {
		selectedCustomGoal = goalId;
	}
</script>

<svelte:head>
	<title>Smart Notetaker | SpikedAI</title>
	<meta name="description" content="Automatically capture, transcribe, and analyze every conversation with SpikedAI's intelligent notetaker powered by conversational AI." />
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

	/* Pulse animation */
	@keyframes pulse-slow {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.6;
		}
	}

	.animate-pulse-slow {
		animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	/* Slide up animation */
	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-slideUp {
		animation: slideUp 0.5s ease-out;
	}
</style>

<div class="min-h-screen bg-black">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="notetaker" />
	
	<!-- Hero Section -->
	<section class="relative pt-40 pb-20 overflow-hidden">
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
			<div class="absolute bottom-1/4 -right-48 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s"></div>
		</div>

		<div class="max-w-7xl mx-auto px-6 relative">
			<div class="text-center mb-16">
				<div class="inline-flex items-center gap-2 px-4 py-2 bg-red-950/30 border border-red-900/50 rounded-full mb-6">
					<MessageSquare class="w-4 h-4 text-red-500" />
					<span class="text-sm font-semibold text-red-400">AI-Powered Notetaker</span>
				</div>
				<h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
					Your Meetings,<br/>
					<span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Supercharged by AI</span>
				</h1>
				<p class="text-xl text-zinc-400 max-w-3xl mx-auto mb-8">
					Go Beyond Transcription—Generate Reports, Send Follow-Ups, Take Actions
				</p>
				<p class="text-lg text-zinc-500 max-w-2xl mx-auto">
					While tools like Otter and Fireflies just transcribe, SpikedAI takes action. Auto-generate executive summaries, send personalized follow-up emails, sync to CRM, analyze stakeholders, and run custom AI analysis—all from your meeting transcript.
				</p>
			</div>

			<!-- Interactive Notetaker Demo -->
			<div class="max-w-6xl mx-auto">
				<div class="bg-gradient-to-br from-zinc-950 to-zinc-900 rounded-xl border border-zinc-800 shadow-2xl overflow-hidden">
					<!-- App Header -->
					<div class="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
						<div class="flex items-center gap-3">
							<div class="w-9 h-9 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
								<MessageSquare class="w-5 h-5 text-white" />
							</div>
							<div>
								<h4 class="text-sm font-bold text-white">AI Templates</h4>
								<p class="text-xs text-zinc-500">Analysis Frameworks</p>
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
					<div class="grid grid-cols-[1fr_1.5fr] h-[700px]">
						<!-- Left Sidebar: Templates & Goals -->
						<div class="border-r border-zinc-800 bg-zinc-950/50 flex flex-col">
							<!-- Tab Switcher -->
							<div class="flex border-b border-zinc-800 bg-zinc-900/50">
								<button 
									on:click={() => activeTab = 'templates'}
									class="flex-1 px-4 py-2.5 text-xs font-semibold transition-all {activeTab === 'templates' ? 'text-white bg-zinc-950 border-b-2 border-red-500' : 'text-zinc-500 hover:text-zinc-300'}"
								>
									PREBUILT TEMPLATES
								</button>
								<button 
									on:click={() => activeTab = 'custom'}
									class="flex-1 px-4 py-2.5 text-xs font-semibold transition-all {activeTab === 'custom' ? 'text-white bg-zinc-950 border-b-2 border-red-500' : 'text-zinc-500 hover:text-zinc-300'}"
								>
									CUSTOM GOALS ({customGoals.length})
								</button>
							</div>

							<!-- Content Area -->
							<div class="flex-1 overflow-y-auto scrollbar-thin">
								{#if activeTab === 'templates'}
									<div class="p-3 space-y-2">
										{#each prebuiltTemplates as template}
											<button
												on:click={() => selectTemplate(template.id)}
												on:mouseenter={() => hoveredTemplate = template.id}
												on:mouseleave={() => hoveredTemplate = null}
												class="w-full flex items-start gap-3 p-3 rounded-lg border transition-all text-left group {selectedTemplate === template.id ? 'bg-' + template.color + '-950/40 border-' + template.color + '-900/70 shadow-lg' : 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700'}"
											>
												<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-{template.color}-600 to-{template.color}-700 flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
													<svelte:component this={template.icon} class="w-4 h-4 text-white" />
												</div>
												<div class="flex-1 min-w-0">
													<h5 class="text-xs font-bold text-white mb-0.5">{template.name}</h5>
													<p class="text-[10px] text-zinc-400 leading-relaxed">{template.description}</p>
												</div>
												{#if selectedTemplate === template.id}
													<CheckCircle class="w-4 h-4 text-{template.color}-500 flex-shrink-0 animate-pulse" />
												{:else}
													<Sparkles class="w-4 h-4 text-zinc-600 group-hover:text-red-500 flex-shrink-0 transition-colors" />
												{/if}
											</button>
										{/each}
									</div>
								{:else if activeTab === 'custom'}
									<div class="p-3">
										<!-- Create Custom Template Button -->
										<button class="w-full flex items-center gap-2 p-3 mb-3 bg-gradient-to-r from-red-950/40 to-red-900/20 border border-red-900/50 rounded-lg hover:from-red-950/60 hover:to-red-900/40 transition-all group">
											<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
												<span class="text-white text-lg font-bold">+</span>
											</div>
											<div class="flex-1 text-left">
												<h5 class="text-xs font-bold text-white">Create Custom Template</h5>
												<p class="text-[10px] text-red-400">Build your own analysis framework</p>
											</div>
										</button>

										<!-- Custom Goals List -->
										<div class="space-y-2">
											{#each customGoals as goal}
												<button
													on:click={() => selectCustomGoal(goal.id)}
													class="w-full flex items-start gap-2.5 p-3 rounded-lg border transition-all text-left group {selectedCustomGoal === goal.id ? 'bg-zinc-900 border-zinc-700' : 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900/60'}"
												>
													<div class="w-7 h-7 rounded-full bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center flex-shrink-0 shadow-md">
														<Target class="w-3.5 h-3.5 text-white" />
													</div>
													<div class="flex-1 min-w-0">
														<h5 class="text-xs font-semibold text-white mb-1">{goal.text}</h5>
														<p class="text-[10px] text-zinc-500 flex items-center gap-1">
															<span class="font-medium">Status:</span>
															<span class="text-zinc-400">{goal.status}</span>
														</p>
													</div>
													<AlertCircle class="w-4 h-4 text-zinc-600 flex-shrink-0 mt-0.5" />
												</button>
											{/each}
										</div>
									</div>
								{/if}
							</div>
						</div>

						<!-- Right Panel: Template Output / AI Assistant -->
						<div class="flex flex-col bg-gradient-to-br from-zinc-950 to-zinc-900">
							<!-- Action Bar -->
							<div class="px-4 py-2.5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
								<div class="flex items-center gap-2">
									<Brain class="w-4 h-4 text-red-500" />
									<h5 class="text-xs font-bold text-white">
										{#if showAIChat}
											AI Assistant
										{:else}
											Selected Templates Output
										{/if}
									</h5>
								</div>
								<div class="flex items-center gap-2">
									<button 
										on:click={() => showAIChat = !showAIChat}
										class="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-semibold rounded-lg transition-all {showAIChat ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'}"
									>
										<Bot class="w-3 h-3" />
										AI Chat
									</button>
									<button class="px-2.5 py-1 text-[10px] font-semibold text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-all">
										<Settings class="w-3 h-3" />
									</button>
									<button class="flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-lg transition-all shadow-lg shadow-blue-500/20">
										<Zap class="w-3 h-3" />
										Run & Generate PDF
									</button>
								</div>
							</div>

							<!-- Output Content -->
							<div class="flex-1 overflow-y-auto p-4 scrollbar-thin">
								{#if showAIChat}
									<!-- AI Assistant Chat Interface -->
									<div class="h-full flex flex-col">
										<div class="flex-1 space-y-3 mb-4">
											{#each aiChatMessages as message}
												{#if message.type === 'user'}
													<div class="flex justify-end">
														<div class="bg-red-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
															<p class="text-xs">{message.text}</p>
															<span class="text-[9px] text-red-200 mt-1 block">{message.time}</span>
														</div>
													</div>
												{:else}
													<div class="flex gap-2">
														<div class="w-7 h-7 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center flex-shrink-0 shadow-lg">
															<Brain class="w-4 h-4 text-white" />
														</div>
														<div class="flex-1 bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-2xl rounded-tl-sm">
															<p class="text-xs text-zinc-300 leading-relaxed whitespace-pre-line mb-2">{message.text}</p>
															<span class="text-[9px] text-zinc-500">{message.time}</span>
														</div>
													</div>
												{/if}
											{/each}
										</div>
										<div class="flex gap-2">
											<input 
												type="text" 
												placeholder="Ask me anything about this meeting..."
												class="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50"
											/>
											<button class="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/50 transition-all">
												<Send class="w-4 h-4" />
											</button>
										</div>
									</div>
								{:else if selectedTemplate && templateOutputs[selectedTemplate]}
									<!-- Template Output Display -->
									<div class="animate-fadeIn">
										<!-- Header -->
										<div class="bg-gradient-to-r from-red-950/40 to-red-900/20 border border-red-900/50 rounded-xl p-4 mb-4">
											<div class="flex items-start justify-between mb-3">
												<div class="flex items-center gap-2">
													<div class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
														<Sparkles class="w-4 h-4 text-white" />
													</div>
													<div>
														<h3 class="text-sm font-bold text-white">SpikedAI</h3>
														<p class="text-[10px] text-red-400">Selected Templates Report</p>
													</div>
												</div>
												<span class="text-[10px] text-zinc-500">Generated: {new Date().toLocaleDateString()}</span>
											</div>
											<h2 class="text-lg font-bold text-white">{templateOutputs[selectedTemplate].title}</h2>
										</div>

										<!-- Content Sections -->
										<div class="space-y-4">
											{#each templateOutputs[selectedTemplate].sections as section}
												<div class="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all">
													<h4 class="text-sm font-bold text-white mb-3 flex items-center gap-2">
														<Lightbulb class="w-4 h-4 text-red-500" />
														{section.heading}
													</h4>
													{#if section.items}
														<ul class="space-y-2">
															{#each section.items as item}
																<li class="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed">
																	<span class="text-red-500 mt-1">•</span>
																	<span>{@html item}</span>
																</li>
															{/each}
														</ul>
													{:else if section.content}
														<p class="text-xs text-zinc-300 leading-relaxed">{section.content}</p>
													{/if}
												</div>
											{/each}
										</div>

										<!-- Action Buttons -->
										<div class="mt-6 flex gap-3">
											<button class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-red-500/30">
												<Mail class="w-4 h-4" />
												Send Follow-Up Email
											</button>
											<button class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-semibold rounded-xl transition-all">
												<Activity class="w-4 h-4" />
												Sync to CRM
											</button>
										</div>
									</div>
								{:else}
									<!-- Empty State -->
									<div class="h-full flex items-center justify-center">
										<div class="text-center max-w-sm">
											<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600/20 to-red-700/20 border border-red-900/50 flex items-center justify-center mx-auto mb-4">
												<FileText class="w-8 h-8 text-red-500" />
											</div>
											<h3 class="text-lg font-bold text-white mb-2">No Template Selected</h3>
											<p class="text-sm text-zinc-400 leading-relaxed">
												Select a prebuilt template or custom goal from the left sidebar to generate AI-powered insights from your meeting transcript.
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
						Meeting insights automatically populate your CRM. Salesforce, HubSpot, or custom systems—no manual data entry ever again.
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
