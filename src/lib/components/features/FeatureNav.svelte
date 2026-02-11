<script>
	import {
		Sparkles,
		MessageSquare,
		Calendar,
		Users,
		GitBranch,
		BarChart3,
		Heart,
		Settings,
		ArrowLeft,
		Home,
	} from "lucide-svelte";

	export let currentFeature = "";

	const features = [
		{
			id: "ai-assistance",
			title: "AI Assistance",
			icon: Sparkles,
			href: "/features/ai-assistance",
			color: "red",
		},
		{
			id: "notetaker",
			title: "Notetaker",
			icon: MessageSquare,
			href: "/features/notetaker",
			color: "blue",
		},
		{
			id: "followup",
			title: "Follow-Up",
			icon: Calendar,
			href: "/features/followup",
			color: "green",
		},
		{
			id: "simulator",
			title: "Simulator",
			icon: Users,
			href: "/features/simulator",
			color: "purple",
		},
		{
			id: "dev-tools",
			title: "Enterprise Ready",
			icon: GitBranch,
			href: "/features/dev-tools",
			color: "orange",
		},
		{
			id: "crm",
			title: "CRM",
			icon: BarChart3,
			href: "/features/crm",
			color: "blue",
		},
		{
			id: "sentiment",
			title: "Sentiment",
			icon: Heart,
			href: "/features/sentiment",
			color: "pink",
		},
		{
			id: "custom-goals",
			title: "Custom Goals",
			icon: Settings,
			href: "/features/custom-goals",
			color: "gray",
		},
	];

	const currentIndex = features.findIndex((f) => f.id === currentFeature);
	const prevFeature = currentIndex > 0 ? features[currentIndex - 1] : null;
	const nextFeature =
		currentIndex < features.length - 1 ? features[currentIndex + 1] : null;
</script>

<div
	class="bg-secondary/50 border-y border-border sticky top-[60px] z-40 backdrop-blur-xl"
>
	<div class="max-w-7xl mx-auto px-6 py-4">
		<div class="flex items-center justify-between gap-4">
			<!-- Left: Back Navigation -->
			<div class="flex items-center gap-3">
				<a
					href="/"
					class="flex items-center gap-2 px-4 py-2 bg-card hover:bg-muted rounded-lg transition-all group"
				>
					<Home
						class="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors"
					/>
					<span
						class="text-sm text-muted-foreground group-hover:text-foreground transition-colors"
						>Home</span
					>
				</a>
				<a
					href="/features"
					class="flex items-center gap-2 px-4 py-2 bg-card hover:bg-muted rounded-lg transition-all group"
				>
					<ArrowLeft
						class="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors"
					/>
					<span
						class="text-sm text-muted-foreground group-hover:text-foreground transition-colors"
						>All Features</span
					>
				</a>
			</div>

			<!-- Center: Quick Feature Navigation (Desktop) -->
			<div
				class="hidden lg:flex items-center gap-2 flex-1 justify-center"
			>
				{#each features as feature}
					{@const Icon = feature.icon}
					<a
						href={feature.href}
						class="p-2 rounded-lg transition-all {feature.id ===
						currentFeature
							? 'bg-red-600 text-white'
							: 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'}"
						title={feature.title}
					>
						<Icon class="w-4 h-4" />
					</a>
				{/each}
			</div>

			<!-- Right: Previous/Next Navigation -->
			<div class="flex items-center gap-2">
				{#if prevFeature}
					<a
						href={prevFeature.href}
						class="flex items-center gap-2 px-4 py-2 bg-card hover:bg-muted rounded-lg transition-all group"
						title={prevFeature.title}
					>
						<ArrowLeft
							class="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors"
						/>
						<span
							class="text-sm text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline"
							>Previous</span
						>
					</a>
				{/if}
				{#if nextFeature}
					<a
						href={nextFeature.href}
						class="flex items-center gap-2 px-4 py-2 bg-card hover:bg-muted rounded-lg transition-all group"
						title={nextFeature.title}
					>
						<span
							class="text-sm text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline"
							>Next</span
						>
						<svg
							class="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</a>
				{/if}
			</div>
		</div>

		<!-- Mobile: Feature Dropdown -->
		<div class="lg:hidden mt-3">
			<select
				class="w-full px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-red-500"
				onchange={(e) => (window.location.href = e.target.value)}
			>
				<option value="" disabled>Jump to Feature...</option>
				{#each features as feature}
					<option
						value={feature.href}
						selected={feature.id === currentFeature}
					>
						{feature.title}
					</option>
				{/each}
			</select>
		</div>
	</div>
</div>
