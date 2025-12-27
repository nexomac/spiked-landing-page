<script>
	import { fly, fade } from "svelte/transition";
	import { Heart, Smile, TrendingUp, Activity } from "lucide-svelte";

	let {
		currentSentiment = $bindable("positive"),
		sentimentScore = $bindable(78),
		mouseX = 0,
		mouseY = 0,
		showAppChrome = true,
	} = $props();

	const sentimentData = [
		{
			time: "0:00",
			sentiment: "neutral",
			score: 50,
			label: "Opening",
			color: "zinc",
		},
		{
			time: "0:45",
			sentiment: "positive",
			score: 72,
			label: "Engaged",
			color: "green",
		},
		{
			time: "1:30",
			sentiment: "very-positive",
			score: 85,
			label: "Excited",
			color: "emerald",
		},
		{
			time: "2:15",
			sentiment: "concerned",
			score: 45,
			label: "Hesitant",
			color: "orange",
		},
		{
			time: "3:00",
			sentiment: "positive",
			score: 78,
			label: "Re-engaged",
			color: "green",
		},
	];

	const liveMetrics = [
		{
			label: "Overall Sentiment",
			value: "Positive",
			trend: "+12%",
			color: "green",
		},
		{
			label: "Engagement Level",
			value: "85%",
			trend: "+8%",
			color: "blue",
		},
		{ label: "Buying Signals", value: "7", trend: "+3", color: "emerald" },
		{ label: "Concerns Raised", value: "2", trend: "0", color: "orange" },
	];
</script>

<div
	class="relative"
	in:fly={{ x: 30, duration: 800, delay: 400 }}
	style="transform: perspective(1000px) rotateY({mouseX *
		-2}deg) rotateX({mouseY * 2}deg)"
>
	<!-- Floating decorative elements -->
	<div
		class="absolute -top-8 -right-8 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
	></div>
	<div
		class="absolute -bottom-8 -left-8 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl"
		style="animation: float-slow 6s ease-in-out infinite"
	></div>

	<div
		class="bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl"
	>
		{#if showAppChrome}
			<!-- Header -->
			<div
				class="px-4 py-3 border-b border-border/50 flex items-center justify-between bg-secondary/50"
			>
				<div class="flex items-center gap-2">
					<div
						class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
					></div>
					<span class="text-xs font-medium text-zinc-400"
						>Live Analysis</span
					>
				</div>
				<div
					class="flex items-center gap-2 px-2 py-1 bg-pink-500/10 border border-pink-500/30 rounded-lg"
				>
					<Heart class="w-3 h-3 text-pink-500" />
					<span class="text-xs font-semibold text-pink-400"
						>Sentiment AI</span
					>
				</div>
			</div>
		{/if}

		<!-- Main Content -->
		<div class="p-5">
			<!-- Current Sentiment Display -->
			<div
				class="mb-5 p-4 bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/30 rounded-xl"
			>
				<div class="flex items-center justify-between mb-3">
					<div class="flex items-center gap-3">
						<div
							class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg"
						>
							<Smile class="w-6 h-6 text-foreground" />
						</div>
						<div>
							<div class="text-xs text-muted-foreground mb-1">
								Current Mood
							</div>
							<div class="text-lg font-bold text-foreground">
								Positive & Engaged
							</div>
						</div>
					</div>
					<div class="text-right">
						<div class="text-2xl font-bold text-green-500">
							{sentimentScore}%
						</div>
						<div class="text-xs text-muted-foreground">
							Sentiment Score
						</div>
					</div>
				</div>
				<div class="flex items-center gap-2 mb-2">
					<div
						class="flex-1 h-2 bg-muted rounded-full overflow-hidden"
					>
						<div
							class="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
							style="width: {sentimentScore}%"
						></div>
					</div>
					<TrendingUp class="w-4 h-4 text-green-500" />
				</div>
				<p class="text-xs text-muted-foreground">
					Customer is showing strong buying signals
				</p>
			</div>

			<!-- Sentiment Timeline -->
			<div class="mb-5">
				<h4
					class="text-xs font-semibold text-muted-foreground mb-3 flex items-center gap-2"
				>
					<Activity class="w-3.5 h-3.5" />
					Sentiment Over Time
				</h4>
				<div class="space-y-2">
					{#each sentimentData as data, i}
						<div
							class="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
							in:fade={{ delay: i * 100 }}
						>
							<div
								class="text-xs font-mono text-muted-foreground w-12"
							>
								{data.time}
							</div>
							<div class="flex-1 flex items-center gap-2">
								<div
									class="flex-1 h-1.5 bg-muted rounded-full overflow-hidden"
								>
									<div
										class="h-full bg-{data.color}-500 rounded-full"
										style="width: {data.score}%"
									></div>
								</div>
								<span class="text-xs text-muted-foreground w-20"
									>{data.label}</span
								>
							</div>
							<div
								class="text-xs font-semibold text-{data.color}-500"
							>
								{data.score}%
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Live Metrics Grid -->
			<div class="grid grid-cols-2 gap-3">
				{#each liveMetrics as metric}
					<div
						class="p-3 bg-secondary/50 border border-border/50 rounded-lg hover:border-border transition-all"
					>
						<div class="text-[10px] text-muted-foreground mb-1">
							{metric.label}
						</div>
						<div class="flex items-baseline gap-2">
							<div class="text-lg font-bold text-foreground">
								{metric.value}
							</div>
							<div
								class="text-xs font-semibold text-{metric.color}-500"
							>
								{metric.trend}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes float-slow {
		0%,
		100% {
			transform: translateY(0px) translateX(0px);
		}
		50% {
			transform: translateY(-15px) translateX(10px);
		}
	}
</style>
