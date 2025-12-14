<script>
	import { fly } from 'svelte/transition';
	import { 
		FileText, Activity, Users, Target, Brain, TrendingUp, Mail, FileSearch,
		Sparkles, Layers, BarChart3, RefreshCw, Download, Share, CheckCircle2, Plus
	} from 'lucide-svelte';
	import { templates, customGoals } from '$lib/data/notetaker.js';

	// Props
	let {
		activeTab = $bindable('templates'),
		selectedTemplate = $bindable(null),
		mouseX = 0,
		mouseY = 0,
		height = '600px',
		showAppChrome = true,
		customTemplates = null,
		customGoalsData = null,
		isAutoPlaying = $bindable(true)
	} = $props();

	// Use custom data if provided, otherwise use default
	let displayTemplates = $derived(customTemplates || templates);
	let displayCustomGoals = $derived(customGoalsData || customGoals);

	// Icon mapping
	const iconMap = {
		FileText, Activity, Users, Target, Brain, TrendingUp, Mail, FileSearch
	};

	// Initialize selected template
	$effect(() => {
		if (selectedTemplate === null && displayTemplates.length > 0) {
			selectedTemplate = displayTemplates[0];
		}
	});

	// Auto-rotate templates
	let intervalId = null;
	$effect(() => {
		if (isAutoPlaying && activeTab === 'templates' && displayTemplates.length > 0) {
			intervalId = setInterval(() => {
				if (isAutoPlaying && activeTab === 'templates') {
					const currentIndex = displayTemplates.findIndex(t => t.id === selectedTemplate?.id);
					selectedTemplate = displayTemplates[(currentIndex + 1) % displayTemplates.length];
				}
			}, 5000);
		} else {
			if (intervalId) {
				clearInterval(intervalId);
				intervalId = null;
			}
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	});

	function selectTemplate(template) {
		selectedTemplate = template;
		isAutoPlaying = false;
	}
</script>

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
		{#if showAppChrome}
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
		{/if}

		<!-- Main Content Area -->
		<div class="bg-gradient-to-br from-zinc-950 to-zinc-900 p-1 relative overflow-hidden">
			<!-- Animated gradient overlay -->
			<div class="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-50 animate-pulse"></div>
			
			<div class="grid grid-cols-[280px_1fr] relative z-10" style="height: {height};">
				
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
							<span>Custom Goals ({displayCustomGoals.length})</span>
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
								{#each displayTemplates as template}
									{@const IconComponent = iconMap[template.icon] || FileText}
									<button
										onclick={() => selectTemplate(template)}
										class="w-full text-left p-4 rounded-xl transition-all duration-300 group hover:scale-[1.02] {selectedTemplate?.id === template.id ? 'glass border border-red-500/30 shadow-lg shadow-red-500/10' : 'glass-subtle hover:glass'}"
									>
										<div class="flex items-start gap-3">
											<div class="w-10 h-10 rounded-lg bg-gradient-to-br {template.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
												<IconComponent class="w-5 h-5 text-white" />
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
								{#each displayCustomGoals as goal}
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
							{@const IconComponent = iconMap[selectedTemplate.icon] || FileText}
							<!-- Template output content -->
							<div class="space-y-4">
								<!-- Summary Card -->
								<div class="glass rounded-xl p-4 border border-zinc-800/50">
									<div class="flex items-center gap-2 mb-3">
										<div class="w-8 h-8 rounded-lg bg-gradient-to-br {selectedTemplate.color} flex items-center justify-center">
											<IconComponent class="w-4 h-4 text-white" />
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

<style>
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

	.tilt-hover {
		transform-style: preserve-3d;
		transition: transform 0.3s ease;
	}
	
	.tilt-hover:hover {
		transform: perspective(1000px) rotateX(2deg) rotateY(-2deg);
	}

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

	.depth-shadow {
		box-shadow:
			0 1px 2px rgba(0, 0, 0, 0.2),
			0 4px 8px rgba(0, 0, 0, 0.15),
			0 8px 16px rgba(0, 0, 0, 0.1),
			0 16px 32px rgba(0, 0, 0, 0.05);
	}

	.glow-red {
		box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
	}
	
	.glow-red:hover {
		box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
	}

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
</style>

