<script>
	import { fly } from "svelte/transition";
	import {
		FileText,
		Activity,
		Users,
		Target,
		Brain,
		TrendingUp,
		Mail,
		FileSearch,
		Sparkles,
		Layers,
		BarChart3,
		RefreshCw,
		Download,
		Share,
		CheckCircle2,
		Plus,
		Menu,
	} from "lucide-svelte";
	import { templates, customGoals } from "$lib/data/notetaker.js";

	// Props
	let {
		activeTab = $bindable("templates"),
		selectedTemplate = $bindable(null),
		mouseX = 0,
		mouseY = 0,
		height = "600px",
		showAppChrome = true,
		customTemplates = null,
		customGoalsData = null,
		isAutoPlaying = $bindable(true),
	} = $props();

	// Use custom data if provided, otherwise use default
	let displayTemplates = $derived(customTemplates || templates);
	let displayCustomGoals = $derived(customGoalsData || customGoals);

	let isSidebarOpen = $state(false); // Mobile sidebar toggle

	// Icon mapping
	const iconMap = {
		FileText,
		Activity,
		Users,
		Target,
		Brain,
		TrendingUp,
		Mail,
		FileSearch,
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
		if (
			isAutoPlaying &&
			activeTab === "templates" &&
			displayTemplates.length > 0
		) {
			intervalId = setInterval(() => {
				if (isAutoPlaying && activeTab === "templates") {
					const currentIndex = displayTemplates.findIndex(
						(t) => t.id === selectedTemplate?.id,
					);
					selectedTemplate =
						displayTemplates[(currentIndex + 1) % displayTemplates.length];
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
		isSidebarOpen = false; // Close mobile sidebar on select
	}
</script>

<div
	class="relative tilt-hover w-full h-[90%]"
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
	<div
		class="animated-border rounded-2xl overflow-hidden depth-shadow h-full flex flex-col bg-card"
	>
		{#if showAppChrome}
			<!-- App Chrome -->
			<div
				class="bg-zinc-900/95 border-b border-white/5 px-4 py-3 flex items-center justify-between backdrop-blur-xl shrink-0"
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
							src="/icon white.png"
							alt="SpikedAI Logo"
							class="w-4 h-4 rounded-sm object-contain"
						/>
						<span
							class="text-sm font-black tracking-tight text-white hidden sm:inline"
						>
							SPIKED<span class="text-red-500">AI</span>
						</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<!-- Mobile Menu Toggle -->
					<button
						class="md:hidden p-2 text-zinc-400 hover:text-white"
						onclick={() => (isSidebarOpen = !isSidebarOpen)}
					>
						<Menu class="w-4 h-4" />
					</button>

					<button
						class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-all shadow-lg shadow-red-500/20"
					>
						<Download class="w-3.5 h-3.5" />
						Save PDF
					</button>
					<button
						class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all shadow-lg shadow-blue-500/20"
					>
						<Share class="w-3.5 h-3.5" />
						Share
					</button>
				</div>
			</div>
		{/if}

		<!-- Main Content Area -->
		<div
			class="bg-gradient-to-br from-zinc-900 to-black p-1 relative overflow-hidden flex-1 min-h-0"
		>
			<!-- Animated gradient overlay -->
			<div
				class="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-blue-500/5 opacity-50 animate-pulse pointer-events-none"
			></div>

			<div
				class="grid grid-cols-1 md:grid-cols-[260px_1fr] h-full relative z-10"
			>
				<!-- Left Sidebar (Collapsible on Mobile) -->
				<div
					class="{isSidebarOpen
						? 'absolute inset-0 z-50 bg-zinc-900/95'
						: 'hidden'} md:block md:relative border-r border-white/5 p-4 space-y-6 backdrop-blur-sm overflow-y-auto custom-scrollbar"
				>
					{#if isSidebarOpen}
						<button
							class="absolute top-4 right-4 text-zinc-400"
							onclick={() => (isSidebarOpen = false)}>Close</button
						>
					{/if}

					<!-- Logo & New Session -->
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-2 group cursor-pointer">
							<div
								class="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center glow-red group-hover:scale-110 transition-transform"
							>
								<img
									src="/icon white.png"
									alt="SpikedAI Logo"
									class="w-4 h-4 rounded-sm object-contain"
								/>
							</div>
							<span
								class="text-sm font-black tracking-tight text-white group-hover:text-red-400 transition-colors"
							>
								SPIKED<span class="text-red-500 group-hover:text-red-400"
									>AI</span
								>
							</span>
						</div>
					</div>

					<button
						class="w-full flex items-center gap-2 px-3 py-2 glass rounded-lg text-red-400 text-sm font-medium hover:bg-red-500/20 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
					>
						<Sparkles class="w-4 h-4" />
						<span>New Analysis</span>
					</button>

					<!-- Tab Switcher -->
					<div class="space-y-1">
						<button
							onclick={() => (activeTab = "templates")}
							class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm group {activeTab ===
							'templates'
								? 'glass text-white shadow-lg'
								: 'text-zinc-400 hover:text-white hover:bg-white/5'}"
						>
							<Layers
								class="w-4 h-4 {activeTab === 'templates'
									? 'text-red-500 animate-pulse'
									: ''} group-hover:scale-110 transition-transform"
							/>
							<span>Templates</span>
						</button>
						<button
							onclick={() => (activeTab = "custom")}
							class="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-sm group {activeTab ===
							'custom'
								? 'glass text-white shadow-lg'
								: 'text-zinc-400 hover:text-white hover:bg-white/5'}"
						>
							<Target
								class="w-4 h-4 {activeTab === 'custom'
									? 'text-red-500 animate-pulse'
									: ''} group-hover:scale-110 transition-transform"
							/>
							<span>Custom Goals ({displayCustomGoals.length})</span>
						</button>
					</div>

					<!-- Sessions -->
					<div>
						<p
							class="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 px-1"
						>
							Recent
						</p>
						<div class="space-y-1">
							<button
								class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all duration-300 group glass text-red-400 shadow-md"
							>
								<BarChart3
									class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"
								/>
								<span class="truncate">Q4 Analysis</span>
							</button>
							<button
								class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all duration-300 group text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
							>
								<FileText
									class="w-3.5 h-3.5 group-hover:scale-110 transition-transform"
								/>
								<span class="truncate">Client Meeting</span>
							</button>
						</div>
					</div>
				</div>

				<!-- Main Panel -->
				<div
					class="relative overflow-hidden flex flex-col h-full bg-zinc-900/50"
				>
					<!-- Background ambient glow -->
					<div
						class="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-30 pointer-events-none"
					></div>

					<div class="flex-1 overflow-y-auto custom-scrollbar p-6">
						{#if activeTab === "templates"}
							<!-- Templates View -->
							<div class="space-y-4">
								<div class="mb-4">
									<h3 class="text-sm font-semibold text-white mb-1">
										Templates
									</h3>
									<p class="text-xs text-zinc-500">
										Select a template to view generated output
									</p>
								</div>

								<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
									{#each displayTemplates as template}
										{@const IconComponent = iconMap[template.icon] || FileText}
										<button
											onclick={() => selectTemplate(template)}
											class="text-left p-3 rounded-xl transition-all duration-300 group hover:scale-[1.02] border border-white/5 {selectedTemplate?.id ===
											template.id
												? 'bg-white/10 border-red-500/30'
												: 'bg-transparent hover:bg-white/5'}"
										>
											<div class="flex items-center gap-3">
												<div
													class="w-8 h-8 rounded-lg bg-gradient-to-br {template.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform"
												>
													<IconComponent class="w-4 h-4 text-white" />
												</div>
												<div class="min-w-0">
													<h4
														class="font-semibold text-white text-sm group-hover:text-red-400 transition-colors truncate"
													>
														{template.title}
													</h4>
												</div>
											</div>
										</button>
									{/each}
								</div>

								<!-- Output Display built-in -->
								{#if selectedTemplate}
									{@const IconComponent =
										iconMap[selectedTemplate.icon] || FileText}
									<div class="space-y-4 pt-4 border-t border-white/5">
										<!-- Summary Card -->
										<div class="glass rounded-xl p-5 border border-white/10">
											<div class="flex items-center gap-2 mb-3">
												<div
													class="w-8 h-8 rounded-lg bg-gradient-to-br {selectedTemplate.color} flex items-center justify-center"
												>
													<IconComponent class="w-4 h-4 text-white" />
												</div>
												<h4 class="font-semibold text-white text-sm">
													{selectedTemplate.title} Framework
												</h4>
											</div>
											<p class="text-xs text-zinc-400 leading-relaxed mb-4">
												AI-generated analysis based on meeting transcript using
												the <span class="text-red-400"
													>{selectedTemplate.title}</span
												> template framework.
											</p>

											<!-- Key Insights -->
											<div class="space-y-4">
												<div class="flex items-start gap-3">
													<div
														class="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"
													>
														<CheckCircle2 class="w-3.5 h-3.5 text-red-400" />
													</div>
													<div>
														<h5 class="text-xs font-semibold text-white mb-1">
															Key Discussion Points
														</h5>
														<p class="text-xs text-zinc-400 leading-relaxed">
															Product roadmap priorities for Q4, technical
															architecture review, and customer feedback
															integration strategy.
														</p>
													</div>
												</div>

												<div class="flex items-start gap-3">
													<div
														class="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"
													>
														<CheckCircle2 class="w-3.5 h-3.5 text-blue-400" />
													</div>
													<div>
														<h5 class="text-xs font-semibold text-white mb-1">
															Action Items
														</h5>
														<ul class="space-y-1.5">
															<li
																class="text-xs text-zinc-400 flex items-start gap-2"
															>
																<span class="text-red-500">•</span>
																<span
																	><strong class="text-white">John:</strong> Finalize
																	API documentation by Friday</span
																>
															</li>
															<li
																class="text-xs text-zinc-400 flex items-start gap-2"
															>
																<span class="text-red-500">•</span>
																<span
																	><strong class="text-white">Sarah:</strong> Schedule
																	follow-up with design team</span
																>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								{/if}
							</div>
						{:else}
							<div
								class="flex items-center justify-center h-full text-zinc-500"
							>
								<p>Custom Goals View</p>
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

	.tilt-hover {
		transform-style: preserve-3d;
		transition: transform 0.3s ease;
	}

	.tilt-hover:hover {
		transform: perspective(1000px) rotateX(2deg) rotateY(-2deg);
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
