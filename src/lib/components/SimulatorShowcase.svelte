<script>
	import { fly, fade } from 'svelte/transition';
	import { 
		Users, Video, Shield, Trophy, Play, Pause, RotateCcw, Settings, CheckCircle, AlertCircle,
		Sparkles, Brain, Target, FileText, CheckCircle2, TrendingUp, Lightbulb, ThumbsUp,
		BarChart3, Award, Mic, Send, Circle, ArrowRight, Clock
	} from 'lucide-svelte';
	import { scenarios, discoveryDialogue, liveCoachingInsights } from '$lib/data/simulator.js';

	// Props
	let {
		simulationActive = $bindable(false),
		isPaused = $bindable(false),
		selectedScenario = $bindable('discovery'),
		currentDialogueIndex = $bindable(0),
		showCoaching = $bindable(true),
		hoveredDialogue = $bindable(null),
		mouseX = 0,
		mouseY = 0,
		height = '600px',
		showAppChrome = true,
		customScenarios = null,
		customDialogue = null,
		customCoaching = null
	} = $props();

	// Use custom data if provided, otherwise use default
	let displayScenarios = $derived(customScenarios || scenarios);
	let displayDialogue = $derived(customDialogue || discoveryDialogue);
	let displayCoaching = $derived(customCoaching || liveCoachingInsights);

	// Icon mapping
	const iconMap = {
		Users, Video, Shield, Trophy
	};

	// Color gradient mapping
	const colorGradients = {
		blue: 'from-blue-600 to-blue-700',
		purple: 'from-purple-600 to-purple-700',
		orange: 'from-orange-600 to-orange-700',
		green: 'from-green-600 to-green-700'
	};

	let visibleDialogue = $derived(displayDialogue.slice(0, currentDialogueIndex + 1));
	let currentCoaching = $derived(displayCoaching[selectedScenario] || displayCoaching.discovery);

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
		if (currentDialogueIndex < displayDialogue.length - 1) {
			currentDialogueIndex++;
		}
	}
</script>

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
		{#if showAppChrome}
			<!-- App Chrome -->
			<div class="bg-card/90 border-b border-border/50 px-4 py-3 flex items-center justify-between backdrop-blur-xl">
				<div class="flex items-center gap-3">
					<div class="flex gap-1.5">
						<div class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors cursor-pointer"></div>
						<div class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
						<div class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-green-500 transition-colors cursor-pointer"></div>
					</div>
					<div class="flex items-center gap-2 px-3 py-1 glass rounded-lg hover:bg-zinc-800/70 transition-colors">
						<img src="/Spiked.ai-white-logo-icon-only.png" alt="SpikedAI Logo" class="w-4 h-4 rounded-sm object-contain" />
						<div class="flex items-center gap-2">
							<span class="text-sm font-black tracking-tight text-foreground">
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
		{/if}

		<!-- Main Content Area -->
		<div class="bg-gradient-to-br from-card to-card p-1 relative overflow-hidden">
			<!-- Animated gradient overlay -->
			<div class="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-purple-500/5 opacity-50 animate-pulse"></div>
			
			<div class="relative z-10" style="height: {height};">
				{#if !simulationActive}
					<!-- Scenario Selection -->
					<div class="p-6 h-full overflow-y-auto scrollbar-thin">
						<div class="text-center mb-6">
							<h3 class="text-xl font-bold text-white mb-2">Choose Training Scenario</h3>
							<p class="text-xs text-zinc-400">Select a scenario to practice</p>
						</div>

						<div class="grid grid-cols-2 gap-3 mb-6">
							{#each displayScenarios as scenario}
								{@const IconComponent = iconMap[scenario.icon] || Users}
								{@const gradientClass = colorGradients[scenario.color] || colorGradients.blue}
								<button
									onclick={() => selectScenario(scenario.id)}
									class="group flex flex-col items-start gap-3 p-4 rounded-xl border transition-all text-left {selectedScenario === scenario.id ? 'glass border-red-500/30 shadow-lg shadow-red-500/10' : 'glass-subtle hover:glass'}"
								>
									<div class="w-10 h-10 rounded-lg bg-gradient-to-br {gradientClass} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform">
										<svelte:component this={IconComponent} class="w-5 h-5 text-foreground" />
									</div>
									<div class="flex-1">
										<div class="flex items-center gap-2 mb-1">
											<h4 class="text-sm font-bold text-foreground">{scenario.name}</h4>
											{#if selectedScenario === scenario.id}
												<CheckCircle class="w-3.5 h-3.5 text-red-500 animate-pulse" />
											{/if}
										</div>
										<p class="text-xs text-zinc-400 mb-2 leading-relaxed">{scenario.description}</p>
										<div class="flex items-center gap-2">
											<span class="px-2 py-0.5 glass rounded text-[10px] font-semibold text-zinc-400">
												{scenario.difficulty}
											</span>
											<span class="flex items-center gap-1 text-[10px] text-muted-foreground">
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
					<div class="h-full p-1">
						<div class="grid grid-cols-[1fr_1.3fr] h-full">
							<!-- Left Panel: Live Conversation -->
							<div class="border-r border-border/50 glass-subtle flex flex-col">
								<!-- Prospect Info Header -->
								<div class="px-3 py-2.5 border-b border-border/50 glass">
									<div class="flex items-center gap-2.5">
										<div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-[10px] font-bold shadow-lg">
											JC
										</div>
										<div class="flex-1">
											<h5 class="text-xs font-bold text-foreground">Jennifer Chen</h5>
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
														<span class="text-[10px] font-semibold text-foreground">{dialogue.speaker}</span>
														<span class="text-[9px] text-muted-foreground">{dialogue.time}</span>
														{#if dialogue.sentiment}
															<span class="px-1.5 py-0.5 glass rounded text-[8px] text-zinc-400">
																{dialogue.sentiment}
															</span>
														{/if}
													</div>
													
													<div class="p-2.5 rounded-lg {dialogue.isAI ? 'glass border border-border/50' : 'glass border border-green-500/30 shadow-sm shadow-green-500/10'}">
														<p class="text-[11px] text-zinc-300 leading-relaxed">{dialogue.text}</p>
														
														{#if !dialogue.isAI && dialogue.score}
															<div class="mt-2 pt-2 border-t border-border/50">
																<div class="flex items-center justify-between mb-1">
																	<span class="text-[9px] font-semibold text-zinc-400">Your Score</span>
																	<span class="text-xs font-bold text-green-500">{dialogue.score}/100</span>
																</div>
																<div class="flex items-start gap-1 text-[9px] text-muted-foreground">
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

									{#if !isPaused && currentDialogueIndex < displayDialogue.length - 1}
										<!-- Typing Indicator -->
										<div class="flex gap-2 items-center">
											<div class="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white text-[9px] font-bold shadow-md">
												JC
											</div>
											<div class="px-3 py-2 glass border border-border/50 rounded-lg flex gap-1">
												<div class="w-1.5 h-1.5 bg-zinc-600 rounded-full typing-dot"></div>
												<div class="w-1.5 h-1.5 bg-zinc-600 rounded-full typing-dot"></div>
												<div class="w-1.5 h-1.5 bg-zinc-600 rounded-full typing-dot"></div>
											</div>
										</div>
									{/if}
								</div>

								<!-- Response Input -->
								<div class="p-2.5 border-t border-border/50 glass">
									<div class="flex gap-2">
										<input 
											type="text" 
											placeholder="Type your response or use voice..."
											class="flex-1 px-3 py-2 glass-subtle border border-border/50 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all"
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
								<div class="px-3 py-2.5 border-b border-border/50 flex items-center justify-between glass">
									<div class="flex items-center gap-1.5">
										<Brain class="w-3.5 h-3.5 text-red-500" />
										<h5 class="text-xs font-bold text-foreground">Live AI Coaching</h5>
									</div>
									<button 
										onclick={() => showCoaching = !showCoaching}
										class="text-[10px] text-zinc-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-secondary/50"
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
														<Award class="w-3.5 h-3.5 text-foreground" />
													</div>
													<div>
														<h6 class="text-[10px] font-bold text-foreground">Overall Performance</h6>
														<p class="text-[8px] text-red-400">Real-time analysis</p>
													</div>
												</div>
												<div class="text-right">
													<div class="text-xl font-bold text-foreground">{currentCoaching.overallScore}</div>
													<div class="text-[8px] text-zinc-400">/ 100</div>
												</div>
											</div>
											<div class="flex items-center gap-2">
												<div class="flex-1 h-1.5 bg-secondary/50 rounded-full overflow-hidden">
													<div class="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full transition-all" style="width: {currentCoaching.overallScore}%"></div>
												</div>
												<span class="text-[10px] font-semibold text-green-500">{currentCoaching.sentiment}</span>
											</div>
										</div>

										<!-- Key Metrics -->
										<div class="glass border border-border/50 rounded-xl p-3">
											<h6 class="text-[10px] font-bold text-white mb-2 flex items-center gap-1.5">
												<BarChart3 class="w-3.5 h-3.5 text-blue-500" />
												Key Metrics
											</h6>
											<div class="space-y-1.5">
												{#each currentCoaching.keyMetrics as metric}
													<div class="flex items-center justify-between p-2 glass-subtle rounded-lg border border-border/30">
														<div class="flex-1">
															<div class="flex items-center gap-1.5 mb-0.5">
																<span class="text-[9px] font-semibold text-foreground">{metric.label}</span>
																{#if metric.status === 'good'}
																	<CheckCircle class="w-2.5 h-2.5 text-green-500" />
																{:else}
																	<AlertCircle class="w-2.5 h-2.5 text-orange-500" />
																{/if}
															</div>
															<div class="text-[8px] text-muted-foreground">Target: {metric.target}</div>
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
</style>

