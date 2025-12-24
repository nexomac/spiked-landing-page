<script>
	import { fly, fade } from "svelte/transition";
	import {
		FileText,
		CheckCircle2,
		Activity,
		Zap,
		Clock,
		ExternalLink,
		Sparkles,
	} from "lucide-svelte";

	let { mouseX = 0, mouseY = 0, showAppChrome = true } = $props();

	const recentTickets = [
		{
			id: "SALES-127",
			title: "Add bulk export feature",
			status: "created",
			platform: "Jira",
			priority: "high",
			time: "2m ago",
			color: "blue",
		},
		{
			id: "SALES-126",
			title: "Custom dashboard widgets",
			status: "synced",
			platform: "Asana",
			priority: "medium",
			time: "15m ago",
			color: "purple",
		},
		{
			id: "SALES-125",
			title: "Mobile app dark mode",
			status: "in-progress",
			platform: "Jira",
			priority: "low",
			time: "1h ago",
			color: "emerald",
		},
		{
			id: "SALES-124",
			title: "API rate limit increase",
			status: "completed",
			platform: "Jira",
			priority: "high",
			time: "3h ago",
			color: "green",
		},
	];

	const stats = [
		{
			label: "Tickets Created",
			value: "47",
			period: "This Week",
			color: "blue",
		},
		{
			label: "Avg Response Time",
			value: "2.3h",
			period: "Last 30 Days",
			color: "emerald",
		},
		{
			label: "Features Shipped",
			value: "12",
			period: "This Month",
			color: "purple",
		},
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
		class="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
	></div>
	<div
		class="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl"
		style="animation: float-slow 6s ease-in-out infinite"
	></div>

	<div
		class="bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl"
	>
		{#if showAppChrome}
			<!-- Header -->
			<div
				class="px-4 py-3 border-b border-border/50 flex items-center justify-between bg-secondary/50"
			>
				<div class="flex items-center gap-2">
					<FileText class="w-4 h-4 text-blue-500" />
					<span class="text-sm font-semibold text-foreground"
						>Recent Tickets</span
					>
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-lg"
					>
						<div
							class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
						></div>
						<span class="text-xs font-semibold text-green-400"
							>Synced</span
						>
					</div>
				</div>
			</div>
		{/if}

		<!-- Main Content -->
		<div class="p-5">
			<!-- Stats Grid -->
			<div class="grid grid-cols-3 gap-3 mb-5">
				{#each stats as stat, i}
					<div
						class="p-3 bg-secondary/50 border border-border/50 rounded-xl text-center"
						in:fade={{ delay: i * 100 }}
					>
						<div
							class="text-2xl font-bold text-{stat.color}-500 mb-1"
						>
							{stat.value}
						</div>
						<div
							class="text-[10px] font-semibold text-foreground mb-0.5"
						>
							{stat.label}
						</div>
						<div class="text-[9px] text-muted-foreground">
							{stat.period}
						</div>
					</div>
				{/each}
			</div>

			<!-- Ticket List -->
			<div class="space-y-2">
				{#each recentTickets as ticket, i}
					<div
						class="p-3 bg-secondary/50 border border-border/50 rounded-xl hover:border-{ticket.color}-500/30 hover:bg-{ticket.color}-500/5 transition-all group"
						in:fly={{ y: 20, delay: i * 100 }}
					>
						<div class="flex items-start gap-3">
							<div
								class="w-8 h-8 rounded-lg bg-{ticket.color}-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
							>
								{#if ticket.status === "completed"}
									<CheckCircle2
										class="w-4 h-4 text-{ticket.color}-500"
									/>
								{:else if ticket.status === "in-progress"}
									<Activity
										class="w-4 h-4 text-{ticket.color}-500"
									/>
								{:else}
									<Zap
										class="w-4 h-4 text-{ticket.color}-500"
									/>
								{/if}
							</div>
							<div class="flex-1 min-w-0">
								<div class="flex items-center gap-2 mb-1">
									<span
										class="text-xs font-mono text-{ticket.color}-500"
										>{ticket.id}</span
									>
									<span
										class="px-1.5 py-0.5 bg-secondary border border-border rounded text-[9px] text-muted-foreground"
										>{ticket.platform}</span
									>
									<span
										class="px-1.5 py-0.5 bg-{ticket.color}-500/10 border border-{ticket.color}-500/30 rounded text-[9px] text-{ticket.color}-400"
										>{ticket.priority}</span
									>
								</div>
								<div
									class="text-xs font-semibold text-foreground mb-1 truncate"
								>
									{ticket.title}
								</div>
								<div
									class="flex items-center gap-2 text-[10px] text-muted-foreground"
								>
									<Clock class="w-3 h-3" />
									<span>{ticket.time}</span>
									<span
										class="capitalize text-{ticket.color}-500"
										>• {ticket.status.replace(
											"-",
											" ",
										)}</span
									>
								</div>
							</div>
							<ExternalLink
								class="w-4 h-4 text-muted-foreground group-hover:text-{ticket.color}-500 transition-colors"
							/>
						</div>
					</div>
				{/each}
			</div>

			<!-- Integration Status -->
			<div
				class="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl"
			>
				<div class="flex items-center gap-2 mb-2">
					<Sparkles class="w-4 h-4 text-blue-400" />
					<span class="text-xs font-semibold text-blue-400"
						>Connected Platforms</span
					>
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded"
					>
						<CheckCircle2 class="w-3 h-3 text-blue-500" />
						<span class="text-[10px] font-semibold text-blue-400"
							>Jira</span
						>
					</div>
					<div
						class="flex items-center gap-1.5 px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded"
					>
						<CheckCircle2 class="w-3 h-3 text-purple-500" />
						<span class="text-[10px] font-semibold text-purple-400"
							>Asana</span
						>
					</div>
					<div
						class="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded"
					>
						<CheckCircle2 class="w-3 h-3 text-emerald-500" />
						<span class="text-[10px] font-semibold text-emerald-400"
							>Linear</span
						>
					</div>
				</div>
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
