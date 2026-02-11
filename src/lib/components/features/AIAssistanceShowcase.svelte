<script>
	import { fly, fade } from "svelte/transition";
	import {
		MessageSquare,
		Sparkles,
		Brain,
		Target,
		FileText,
		CheckCircle2,
		TrendingUp,
	} from "lucide-svelte";
	import { dialogues, aiResponses } from "$lib/data/ai-assistance.js";

	// Props
	let {
		selectedQuestion = $bindable("roi"),
		isAutoPlaying = $bindable(true),
		mouseX = 0,
		mouseY = 0,
		height = "600px",
		showAppChrome = true,
		customDialogues = null,
		customAiResponses = null,
		visibleCount = 8,
	} = $props();

	// Use custom data if provided, otherwise use default
	let displayDialogues = $derived(customDialogues || dialogues);
	let displayAiResponses = $derived(customAiResponses || aiResponses);

	// Question types for tabs
	const questionTypes = [
		"roi",
		"pricing",
		"security",
		"customization",
		"integrations",
	];

	let intervalId = null;

	$effect(() => {
		if (isAutoPlaying) {
			intervalId = setInterval(() => {
				if (isAutoPlaying) {
					const currentIndex = questionTypes.indexOf(selectedQuestion);
					selectedQuestion =
						questionTypes[(currentIndex + 1) % questionTypes.length];
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

	function selectQuestion(questionType) {
		selectedQuestion = questionType;
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
							src="/icon white.png"
							alt="SpikedAI Logo"
							class="w-4 h-4 rounded-sm object-contain"
						/>
						<span class="text-sm font-black tracking-tight text-foreground">
							SPIKED<span class="text-red-500">AI</span>
						</span>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/40 border border-amber-900/50 rounded-full"
					>
						<div
							class="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"
						></div>
						<span class="text-xs font-medium text-amber-400">LISTENING</span>
					</div>
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
				class="grid grid-cols-[1fr_1.2fr] relative z-10"
				style="height: {height};"
			>
				<!-- Left Panel: Live Transcription -->
				<div class="border-r border-border/50 flex flex-col bg-secondary/50">
					<div
						class="px-3 py-2 border-b border-border flex items-center justify-between bg-secondary/50"
					>
						<div class="flex items-center gap-2">
							<MessageSquare class="w-4 h-4 text-blue-400" />
							<span class="text-xs font-semibold text-foreground"
								>Live Transcription</span
							>
						</div>
						<span class="text-xs text-muted-foreground">Real-time</span>
					</div>

					<div class="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
						<!-- Show only the last few relevant dialogues -->
						{#each displayDialogues.slice(-visibleCount) as dialogue, i}
							<button
								onclick={() =>
									dialogue.isQuestion && selectQuestion(dialogue.questionType)}
								class="flex gap-2 group p-2 rounded-lg transition-all w-full text-left relative {dialogue.isQuestion
									? 'bg-blue-950/20 border border-blue-900/50 hover:bg-blue-950/40 hover:border-blue-800/70 cursor-pointer hover:scale-[1.02]'
									: 'bg-secondary/20 hover:bg-secondary/30 cursor-default'} {selectedQuestion ===
								dialogue.questionType
									? 'ring-2 ring-red-500/50 bg-blue-950/30'
									: ''}"
								in:fly={{ y: 10, delay: i * 50, duration: 300 }}
							>
								<div
									class="w-6 h-6 rounded-full bg-gradient-to-br {dialogue.isUser
										? 'from-green-600 to-green-700'
										: 'from-blue-600 to-blue-700'} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
								>
									{dialogue.initials}
								</div>
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-2 mb-0.5">
										<span class="text-xs font-semibold text-foreground"
											>{dialogue.speaker}</span
										>
										<span class="text-[10px] text-muted-foreground"
											>{dialogue.time}</span
										>
										{#if dialogue.isQuestion}
											<span
												class="px-1.5 py-0.5 bg-blue-600/40 border border-blue-500/50 text-[9px] font-bold text-blue-300 rounded animate-pulse"
												>QUESTION</span
											>
										{/if}
									</div>
									<p
										class="text-xs {dialogue.isQuestion
											? 'text-zinc-200 font-medium'
											: 'text-zinc-400'} leading-relaxed"
									>
										{dialogue.text}
									</p>
								</div>
								{#if dialogue.isQuestion}
									<div
										class="absolute -right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<Sparkles class="w-4 h-4 text-red-500 animate-pulse" />
									</div>
								{/if}
							</button>
						{/each}
					</div>
				</div>

				<!-- Right Panel: AI Copilot -->
				<div class="flex flex-col bg-gradient-to-br from-card to-card">
					<div
						class="px-3 py-2 border-b border-border flex items-center justify-between bg-secondary/80"
					>
						<div class="flex items-center gap-2">
							<Sparkles class="w-4 h-4 text-red-500 animate-pulse" />
							<span class="text-xs font-semibold text-foreground"
								>AI Copilot</span
							>
						</div>
						<div class="flex items-center gap-1.5 px-2 py-1 glass rounded-full">
							<Brain class="w-3 h-3 text-red-400" />
							<span class="text-[10px] font-medium text-red-400"
								>Auto-Answer: ON</span
							>
						</div>
					</div>

					<div class="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
						<!-- Question Selector Tabs -->
						<div class="flex gap-1.5 flex-wrap mb-3">
							{#each questionTypes as questionType}
								<button
									onclick={() => selectQuestion(questionType)}
									class="px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all {selectedQuestion ===
									questionType
										? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/50'
										: 'glass text-muted-foreground hover:text-zinc-300'}"
								>
									{questionType === "customization"
										? "Custom"
										: questionType.charAt(0).toUpperCase() +
											questionType.slice(1)}
								</button>
							{/each}
						</div>

						<!-- AI Response Card -->
						{#if displayAiResponses[selectedQuestion]}
							{@const response = displayAiResponses[selectedQuestion]}
							<div
								class="glass rounded-xl p-3 hover-lift relative overflow-hidden"
								in:fade={{ duration: 300 }}
							>
								<div
									class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-50"
								></div>

								<div class="relative z-10">
									<!-- Question Header -->
									<div
										class="flex items-start gap-2 mb-3 pb-2 border-b border-border/50"
									>
										<Target class="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
										<div class="flex-1">
											<p class="text-xs font-semibold text-white mb-1">
												{response.question}
											</p>
											<p class="text-[10px] text-muted-foreground">
												AI-generated from knowledge base
											</p>
										</div>
									</div>

									<!-- Response Title -->
									<h4 class="text-xs font-bold text-red-400 mb-2">
										{response.title}
									</h4>
									<p class="text-[10px] text-zinc-400 mb-3">
										{response.description}
									</p>

									<!-- Data Points -->
									<div class="space-y-2">
										{#each response.points as point, i}
											<div
												class="glass rounded-lg p-2 group hover:bg-secondary/50 transition-all cursor-pointer"
												in:fly={{
													x: -10,
													delay: i * 50,
													duration: 300,
												}}
											>
												<div class="flex items-start justify-between gap-2">
													<span
														class="text-[10px] text-muted-foreground group-hover:text-zinc-400 transition-colors"
														>{point.label}</span
													>
													<span
														class="text-[10px] font-semibold text-white flex-shrink-0"
														>{point.value}</span
													>
												</div>
											</div>
										{/each}
									</div>

									<!-- Source Footer -->
									<div
										class="flex items-center gap-2 mt-3 pt-2 border-t border-border/50"
									>
										<FileText class="w-3 h-3 text-muted-foreground" />
										<span class="text-[9px] text-muted-foreground"
											>{response.source}</span
										>
										<span class="ml-auto text-[9px] text-zinc-700"
											>{response.timestamp}</span
										>
									</div>
								</div>
							</div>
						{/if}

						<!-- Quick Actions -->
						<div class="grid grid-cols-2 gap-2 mt-3">
							<button
								class="glass rounded-lg p-2 text-[10px] font-medium text-zinc-400 hover:text-white hover:bg-secondary/50 transition-all flex items-center justify-center gap-1.5 group"
							>
								<CheckCircle2
									class="w-3 h-3 group-hover:scale-110 transition-transform"
								/>
								Copy to Clipboard
							</button>
							<button
								class="glass rounded-lg p-2 text-[10px] font-medium text-zinc-400 hover:text-white hover:bg-secondary/50 transition-all flex items-center justify-center gap-1.5 group"
							>
								<TrendingUp
									class="w-3 h-3 group-hover:scale-110 transition-transform"
								/>
								View Full Report
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.glass {
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
	}

	:root[data-theme="light"] .glass {
		background: rgba(0, 0, 0, 0.03);
		border: 1px solid rgba(0, 0, 0, 0.08);
		box-shadow:
			0 4px 16px 0 rgba(0, 0, 0, 0.08),
			inset 0 1px 1px 0 rgba(255, 255, 255, 0.5);
	}

	:root:not([data-theme="light"]) .glass,
	:root[data-theme="dark"] .glass {
		background: rgba(255, 255, 255, 0.03);
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
		background: var(--card);
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

	.hover-lift {
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	.hover-lift:hover {
		transform: translateY(-4px) scale(1.01);
		box-shadow:
			0 20px 60px rgba(0, 0, 0, 0.4),
			0 0 40px rgba(239, 68, 68, 0.1);
	}

	.scrollbar-thin::-webkit-scrollbar {
		width: 4px;
	}
	.scrollbar-thin::-webkit-scrollbar-track {
		background: transparent;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb {
		background: var(--muted-foreground);
		opacity: 0.3;
		border-radius: 2px;
	}
	.scrollbar-thin::-webkit-scrollbar-thumb:hover {
		opacity: 0.5;
	}
</style>
