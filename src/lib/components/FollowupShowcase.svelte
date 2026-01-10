<script>
	import { fly, fade } from "svelte/transition";
	import {
		Sparkles,
		Layers,
		FileText,
		Calendar,
		BarChart3,
		Target,
		CheckCircle2,
		RefreshCw,
		Clock,
		Brain,
		TrendingUp,
		Activity,
		ChevronRight,
	} from "lucide-svelte";
	import {
		upcomingMeetings,
		briefingItems,
		contextHistory,
		actionItems,
		sessions,
	} from "$lib/data/followup.js";

	// Props
	let {
		activeFeature = $bindable(0),
		isAutoPlaying = $bindable(true),
		mouseX = 0,
		mouseY = 0,
		height = "500px",
		showAppChrome = true,
		customUpcomingMeetings = null,
		customBriefingItems = null,
		customContextHistory = null,
		customActionItems = null,
		customSessions = null,
	} = $props();

	// Use custom data if provided, otherwise use default
	let displayUpcomingMeetings = $derived(
		customUpcomingMeetings || upcomingMeetings,
	);
	let displayBriefingItems = $derived(customBriefingItems || briefingItems);
	let displayContextHistory = $derived(
		customContextHistory || contextHistory,
	);
	let displayActionItems = $derived(customActionItems || actionItems);
	let displaySessions = $derived(customSessions || sessions);

	// Icon mapping
	const iconMap = {
		FileText,
		Target,
		MessageSquare: FileText,
		CheckCircle2,
	};

	// Auto-rotate features
	let intervalId = null;
	$effect(() => {
		if (isAutoPlaying) {
			intervalId = setInterval(() => {
				if (isAutoPlaying) {
					activeFeature = (activeFeature + 1) % 3;
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

	function selectFeature(index) {
		activeFeature = index;
		isAutoPlaying = false;
	}
</script>

<div
	class="relative tilt-hover"
	in:fly={{ x: 30, duration: 800, delay: 400 }}
	style="transform: perspective(1000px) rotateY({mouseX *
		-2}deg) rotateX({mouseY * 2}deg)"
>
	<!-- Floating decorative elements -->
	<div
		class="absolute -top-8 -right-8 w-32 h-32 bg-red-500/20 rounded-full blur-3xl float"
	></div>
	<div
		class="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl float-slow"
	></div>

	<!-- Main Product Interface with enhanced depth -->
	<div class="animated-border rounded-2xl overflow-hidden depth-shadow">
		{#if showAppChrome}
			<!-- App Chrome -->
			<div
				class="bg-card/90 border-b border-border/50 px-4 py-3 flex items-center justify-between backdrop-blur-xl"
			>
				<div class="flex items-center gap-3">
					<div class="flex gap-1.5">
						<div
							class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors cursor-pointer"
						></div>
						<div
							class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-pointer"
						></div>
						<div
							class="w-3 h-3 rounded-full bg-zinc-700 hover:bg-green-500 transition-colors cursor-pointer"
						></div>
					</div>
					<div
						class="flex items-center gap-2 px-3 py-1 glass rounded-lg hover:bg-zinc-800/70 transition-colors"
					>
						<img
							src="/Spiked.ai-white-logo-icon-only.png"
							alt="SpikedAI Logo"
							class="w-4 h-4 rounded-sm object-contain"
						/>
						<span
							class="text-sm font-black tracking-tight text-foreground"
						>
							SPIKED<span class="text-red-500">AI</span>
						</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<span
						class="relative flex h-2 w-2 text-green-500 pulse-ring"
					>
						<span
							class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
						></span>
					</span>
					<span class="text-xs text-muted-foreground">Synced</span>
				</div>
			</div>
		{/if}

		<!-- Main Content Area -->
		<div
			class="bg-gradient-to-br from-card to-card p-1 relative overflow-hidden"
		>
			<!-- Animated gradient overlay -->
			<div
				class="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-50 animate-pulse"
			></div>

			<div
				class="grid grid-cols-[280px_1fr] relative z-10"
				style="min-height: {height};"
			>
				<!-- Left Sidebar -->
				<div
					class="border-r border-border/50 p-4 space-y-6 backdrop-blur-sm"
				>
					<!-- Logo & New Session -->
					<div class="flex items-center justify-between">
						<div
							class="flex items-center gap-2 group cursor-pointer"
						>
							<div
								class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center glow-red group-hover:scale-110 transition-transform"
							>
								<img
									src="/Spiked.ai-white-logo-icon-only.png"
									alt="SpikedAI Logo"
									class="w-4 h-4 rounded-sm object-contain"
								/>
							</div>
							<span
								class="text-sm font-black tracking-tight text-foreground group-hover:text-red-400 transition-colors"
							>
								SPIKED<span
									class="text-red-500 group-hover:text-red-400"
									>AI</span
								>
							</span>
						</div>
					</div>

					<button
						class="w-full flex items-center gap-2 px-3 py-2 glass rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
					>
						<Sparkles class="w-4 h-4" />
						<span>New session</span>
					</button>

					<!-- Nav Items -->
					<div class="space-y-1">
						<button
							class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-secondary/50 transition-all duration-300 text-sm group"
						>
							<Layers
								class="w-4 h-4 group-hover:scale-110 transition-transform"
							/>
							<span>Playbooks</span>
						</button>
						<button
							class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-secondary/50 transition-all duration-300 text-sm group"
						>
							<FileText
								class="w-4 h-4 group-hover:scale-110 transition-transform"
							/>
							<span>My work</span>
						</button>
						<button
							class="w-full flex items-center gap-3 px-3 py-2 rounded-lg glass text-white transition-all duration-300 text-sm shadow-lg"
						>
							<Calendar
								class="w-4 h-4 text-red-500 animate-pulse"
							/>
							<span>Meeting Prep</span>
						</button>
					</div>

					<!-- Sessions -->
					<div>
						<p
							class="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1"
						>
							Sessions
						</p>
						<div class="space-y-1">
							{#each displaySessions as session, i}
								<button
									onclick={() => selectFeature(i % 3)}
									class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all duration-300 group {session.active
										? 'glass text-red-400 shadow-md'
										: 'text-muted-foreground hover:text-zinc-400 hover:bg-secondary/30'}"
									in:fly={{
										x: -10,
										delay: i * 50,
										duration: 300,
									}}
								>
									{#if session.type === "report"}
										<BarChart3
											class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"
										/>
									{:else if session.type === "strategy"}
										<Target
											class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"
										/>
									{:else if session.type === "checklist"}
										<CheckCircle2
											class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"
										/>
									{:else}
										<RefreshCw
											class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"
										/>
									{/if}
									<span class="truncate">{session.name}</span>
								</button>
							{/each}
						</div>
					</div>
				</div>

				<!-- Main Panel - Dynamic Content Based on Active Feature -->
				<div class="p-5 overflow-hidden relative">
					<!-- Background ambient glow -->
					<div
						class="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-30"
					></div>

					{#if activeFeature === 0}
						<!-- Smart Preparation View -->
						<div in:fade={{ duration: 400 }} class="relative z-10">
							<div class="flex items-center justify-between mb-5">
								<div>
									<h3
										class="text-lg font-bold text-foreground"
									>
										Meeting Prep Hub
									</h3>
									<p class="text-xs text-muted-foreground">
										Auto-generated briefings for your
										meetings
									</p>
								</div>
								<div
									class="flex items-center gap-2 px-3 py-1.5 glass rounded-full glow-red animate-pulse"
								>
									<div
										class="w-1.5 h-1.5 bg-green-500 rounded-full"
									></div>
									<span
										class="text-xs font-medium text-green-400"
										>3 Ready</span
									>
								</div>
							</div>

							<!-- Upcoming Meetings -->
							<div class="space-y-3">
								{#each displayUpcomingMeetings as meeting, i}
									<div
										class="glass rounded-xl p-4 hover-lift cursor-pointer group relative overflow-hidden"
										in:fly={{
											y: 20,
											delay: i * 100,
											duration: 400,
										}}
									>
										<div
											class="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
										></div>

										<div
											class="flex items-start gap-3 relative z-10"
										>
											<div
												class="w-10 h-10 rounded-xl bg-gradient-to-br {meeting.priority ===
												'high'
													? 'from-red-500/20 to-orange-500/20'
													: 'from-blue-500/20 to-cyan-500/20'} flex items-center justify-center text-sm font-bold {meeting.priority ===
												'high'
													? 'text-red-400'
													: 'text-blue-400'} group-hover:scale-110 transition-transform"
											>
												{meeting.avatar}
											</div>
											<div class="flex-1 min-w-0">
												<div
													class="flex items-center gap-2 mb-1"
												>
													<h4
														class="font-semibold text-foreground text-sm truncate group-hover:text-red-400 transition-colors"
													>
														{meeting.company}
													</h4>
													<span
														class="px-2 py-0.5 rounded text-[10px] font-medium {meeting.type ===
														'Follow-up'
															? 'bg-amber-500/20 text-amber-400'
															: meeting.type ===
																  'Discovery'
																? 'bg-blue-500/20 text-blue-400'
																: 'bg-green-500/20 text-green-400'}"
													>
														{meeting.type}
													</span>
												</div>
												<p
													class="text-xs text-muted-foreground"
												>
													{meeting.contact}
												</p>
												<div
													class="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground"
												>
													<Clock class="w-3 h-3" />
													<span>{meeting.time}</span>
												</div>
											</div>
											<ChevronRight
												class="w-4 h-4 text-muted-foreground group-hover:text-zinc-400 group-hover:translate-x-2 transition-all"
											/>
										</div>

										<!-- Briefing Status -->
										<div
											class="mt-4 pt-3 border-t border-border/50 grid grid-cols-4 gap-2 relative z-10"
										>
											{#each displayBriefingItems as item}
												{@const Icon = iconMap[item.icon] || FileText}
												<div
													class="text-center group/item hover:scale-110 transition-transform cursor-pointer"
												>
													<Icon
														class="w-4 h-4 mx-auto mb-1 {item.color ===
														'green'
															? 'text-green-500'
															: item.color ===
																  'blue'
																? 'text-blue-500'
																: item.color ===
																	  'amber'
																	? 'text-amber-500'
																	: 'text-red-500'} group-hover/item:animate-pulse"
													/>
													<p
														class="text-[10px] text-muted-foreground truncate"
													>
														{item.status}
													</p>
												</div>
											{/each}
										</div>
									</div>
								{/each}
							</div>
						</div>
					{:else if activeFeature === 1}
						<!-- Context Recall View -->
						<div in:fade={{ duration: 400 }} class="relative z-10">
							<div class="flex items-center justify-between mb-5">
								<div>
									<h3
										class="text-lg font-bold text-foreground"
									>
										Relationship Timeline
									</h3>
									<p class="text-xs text-muted-foreground">
										Enterprise Corp • Sarah Chen
									</p>
								</div>
								<div
									class="flex items-center gap-2 px-3 py-1.5 glass rounded-full glow-red"
								>
									<Brain
										class="w-3.5 h-3.5 text-blue-400 animate-pulse"
									/>
									<span
										class="text-xs font-medium text-blue-400"
										>Full Context</span
									>
								</div>
							</div>

							<!-- Timeline -->
							<div class="relative pl-6 space-y-4 mb-6">
								<div
									class="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-red-500 via-zinc-700 to-zinc-800"
								></div>

								{#each displayContextHistory as event, i}
									<div
										class="relative group"
										in:fly={{
											x: -20,
											delay: i * 150,
											duration: 400,
										}}
									>
										<div
											class="absolute -left-4 w-3 h-3 rounded-full transition-all duration-300 {i ===
											0
												? 'bg-red-500 ring-4 ring-red-500/20 group-hover:scale-125'
												: 'bg-zinc-700 group-hover:bg-zinc-600 group-hover:scale-125'}"
										></div>
										<div
											class="glass rounded-lg p-3 hover:bg-secondary/50 transition-all duration-300 cursor-pointer group-hover:scale-[1.02]"
										>
											<div
												class="flex items-center justify-between mb-2"
											>
												<span
													class="text-xs font-semibold text-foreground group-hover:text-red-400 transition-colors"
													>{event.event}</span
												>
												<span
													class="text-[10px] text-muted-foreground"
													>{event.date}</span
												>
											</div>
											<div
												class="flex items-center gap-3 text-xs"
											>
												{#if event.duration !== "—"}
													<span
														class="text-muted-foreground"
														>{event.duration}</span
													>
												{/if}
												<span
													class="flex items-center gap-1 {event.sentiment ===
													'positive'
														? 'text-green-400'
														: 'text-muted-foreground'}"
												>
													{#if event.sentiment === "positive"}
														<TrendingUp
															class="w-3 h-3 group-hover:animate-bounce"
														/>
														Positive
													{:else}
														<Activity
															class="w-3 h-3"
														/>
														Neutral
													{/if}
												</span>
											</div>
										</div>
									</div>
								{/each}
							</div>

							<!-- Key Insights Card -->
							<div
								class="glass rounded-xl p-4 hover-lift relative overflow-hidden"
								in:fly={{ y: 20, delay: 400, duration: 400 }}
							>
								<div
									class="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-blue-500/10 opacity-50"
								></div>
								<h4
									class="text-sm font-semibold text-white mb-3 flex items-center gap-2 relative z-10"
								>
									<Sparkles
										class="w-4 h-4 text-red-500 animate-pulse"
									/>
									AI-Generated Insights
								</h4>
								<div class="space-y-2 text-xs relative z-10">
									<div
										class="flex items-start gap-2 group cursor-pointer"
									>
										<div
											class="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform"
										></div>
										<span
											class="text-zinc-400 group-hover:text-muted-foreground transition-colors"
											>Budget approved at <span
												class="text-foreground font-medium"
												>$250K</span
											> during last call</span
										>
									</div>
									<div
										class="flex items-start gap-2 group cursor-pointer"
									>
										<div
											class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform"
										></div>
										<span
											class="text-zinc-400 group-hover:text-muted-foreground transition-colors"
											>CTO has concerns about <span
												class="text-foreground font-medium"
												>data migration timeline</span
											></span
										>
									</div>
									<div
										class="flex items-start gap-2 group cursor-pointer"
									>
										<div
											class="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform"
										></div>
										<span
											class="text-zinc-400 group-hover:text-muted-foreground transition-colors"
											>Strong champion: <span
												class="text-foreground font-medium"
												>Sarah Chen (VP Sales)</span
											></span
										>
									</div>
								</div>
							</div>
						</div>
					{:else}
						<!-- Action Tracking View -->
						<div in:fade={{ duration: 400 }} class="relative z-10">
							<div class="flex items-center justify-between mb-5">
								<div>
									<h3
										class="text-lg font-bold text-foreground"
									>
										Action Items
									</h3>
									<p class="text-xs text-muted-foreground">
										Commitments you've made across all
										meetings
									</p>
								</div>
								<div
									class="flex items-center gap-2 px-3 py-1.5 glass rounded-full glow-red animate-pulse"
								>
									<Clock class="w-3.5 h-3.5 text-amber-400" />
									<span
										class="text-xs font-medium text-amber-400"
										>2 Due Soon</span
									>
								</div>
							</div>

							<!-- Action Items List -->
							<div class="space-y-2">
								{#each displayActionItems as item, i}
									<div
										class="glass rounded-lg p-3 flex items-start gap-3 hover-lift group {item.completed
											? 'opacity-60'
											: ''} relative overflow-hidden"
										in:fly={{
											y: 15,
											delay: i * 80,
											duration: 300,
										}}
									>
										<div
											class="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
										></div>

										<button
											class="mt-0.5 flex-shrink-0 relative z-10 group-hover:scale-110 transition-transform"
										>
											{#if item.completed}
												<CheckCircle2
													class="w-5 h-5 text-green-500 group-hover:animate-spin"
												/>
											{:else}
												<div
													class="w-5 h-5 rounded-full border-2 {item.priority ===
													'critical'
														? 'border-red-500'
														: item.priority ===
															  'high'
															? 'border-amber-500'
															: 'border-zinc-600'} group-hover:bg-secondary/50 transition-colors"
												></div>
											{/if}
										</button>
										<div
											class="flex-1 min-w-0 relative z-10"
										>
											<p
												class="text-sm {item.completed
													? 'text-muted-foreground line-through'
													: 'text-foreground group-hover:text-red-400'} transition-colors"
											>
												{item.text}
											</p>
											<div
												class="flex items-center gap-2 mt-1.5"
											>
												<span
													class="px-1.5 py-0.5 rounded text-[10px] font-medium {item.priority ===
													'critical'
														? 'bg-red-500/20 text-red-400'
														: item.priority ===
															  'high'
															? 'bg-amber-500/20 text-amber-400'
															: item.priority ===
																  'medium'
																? 'bg-blue-500/20 text-blue-400'
																: 'bg-zinc-700 text-zinc-400'}"
												>
													{item.priority}
												</span>
												<span
													class="text-[10px] text-muted-foreground flex items-center gap-1"
												>
													<Clock class="w-3 h-3" />
													{item.due}
												</span>
											</div>
										</div>
									</div>
								{/each}
							</div>

							<!-- Summary Stats -->
							<div
								class="grid grid-cols-3 gap-3 mt-5"
								in:fly={{ y: 20, delay: 350, duration: 300 }}
							>
								<div
									class="glass rounded-lg p-3 text-center hover-lift cursor-pointer group"
								>
									<p
										class="text-2xl font-bold text-foreground group-hover:text-red-400 transition-colors"
									>
										12
									</p>
									<p
										class="text-[10px] text-muted-foreground"
									>
										Total Items
									</p>
								</div>
								<div
									class="glass rounded-lg p-3 text-center hover-lift cursor-pointer group"
								>
									<p
										class="text-2xl font-bold text-green-400 group-hover:scale-125 transition-transform"
									>
										8
									</p>
									<p
										class="text-[10px] text-muted-foreground"
									>
										Completed
									</p>
								</div>
								<div
									class="glass rounded-lg p-3 text-center hover-lift cursor-pointer group"
								>
									<p
										class="text-2xl font-bold text-amber-400 animate-pulse"
									>
										2
									</p>
									<p
										class="text-[10px] text-muted-foreground"
									>
										Due Today
									</p>
								</div>
							</div>
						</div>
					{/if}
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

	.hover-lift {
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	.hover-lift:hover {
		transform: translateY(-4px) scale(1.01);
		box-shadow:
			0 20px 60px rgba(0, 0, 0, 0.4),
			0 0 40px rgba(239, 68, 68, 0.1);
	}

	.animated-border {
		position: relative;
		background: linear-gradient(
			135deg,
			rgba(255, 255, 255, 0.05) 0%,
			rgba(255, 255, 255, 0.02) 100%
		);
		animation: borderShimmer 3s ease-in-out infinite;
	}
	.animated-border::before {
		content: "";
		position: absolute;
		inset: 0;
		border-radius: inherit;
		padding: 1px;
		background: linear-gradient(
			135deg,
			rgba(239, 68, 68, 0.4),
			rgba(239, 68, 68, 0.1),
			transparent,
			rgba(239, 68, 68, 0.2)
		);
		-webkit-mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		mask:
			linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		animation: rotateBorder 4s linear infinite;
	}

	@keyframes borderShimmer {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}

	@keyframes rotateBorder {
		0% {
			background-position: 0% 50%;
		}
		100% {
			background-position: 200% 50%;
		}
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		33% {
			transform: translateY(-20px) rotate(5deg);
		}
		66% {
			transform: translateY(-10px) rotate(-5deg);
		}
	}

	@keyframes float-slow {
		0%,
		100% {
			transform: translateY(0px) translateX(0px);
		}
		50% {
			transform: translateY(-30px) translateX(10px);
		}
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

	.tilt-hover {
		transform-style: preserve-3d;
		transition: transform 0.3s ease;
	}

	.tilt-hover:hover {
		transform: perspective(1000px) rotateX(2deg) rotateY(-2deg);
	}

	.glow-red {
		box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
	}

	.glow-red:hover {
		box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
	}

	@keyframes pulse-ring {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(1.5);
			opacity: 0;
		}
	}
	.pulse-ring::before {
		content: "";
		position: absolute;
		inset: -2px;
		border-radius: 50%;
		border: 2px solid currentColor;
		animation: pulse-ring 1.5s ease-out infinite;
	}
</style>
