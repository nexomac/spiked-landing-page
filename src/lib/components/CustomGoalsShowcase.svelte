<script>
	import { fly, fade } from 'svelte/transition';
	import { Target, Trophy, TrendingUp, BarChart3, Calendar, Star, ArrowRight } from 'lucide-svelte';

	let {
		mouseX = 0,
		mouseY = 0,
		showAppChrome = true
	} = $props();

	const goals = [
		{ id: 1, name: 'Monthly Revenue Target', current: 847000, target: 1000000, unit: '$', color: 'emerald', icon: Trophy },
		{ id: 2, name: 'Deals Closed This Quarter', current: 42, target: 50, unit: '', color: 'blue', icon: Target },
		{ id: 3, name: 'Demo Completion Rate', current: 78, target: 85, unit: '%', color: 'purple', icon: BarChart3 },
		{ id: 4, name: 'Average Deal Size', current: 52000, target: 60000, unit: '$', color: 'orange', icon: TrendingUp }
	];

	function getProgress(goal) {
		return Math.min((goal.current / goal.target) * 100, 100);
	}

	function formatValue(value, unit) {
		if (unit === '$') return `$${(value / 1000).toFixed(0)}K`;
		return `${value}${unit}`;
	}
</script>

<div 
	class="relative"
	in:fly={{ x: 30, duration: 800, delay: 400 }}
	style="transform: perspective(1000px) rotateY({mouseX * -2}deg) rotateX({mouseY * 2}deg)"
>
	<!-- Floating decorative elements -->
	<div class="absolute -top-8 -right-8 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
	<div class="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl" style="animation: float-slow 6s ease-in-out infinite"></div>
	
	<div class="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl">
		{#if showAppChrome}
			<!-- Header -->
			<div class="px-4 py-3 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-900/50">
				<div class="flex items-center gap-2">
					<Target class="w-4 h-4 text-indigo-500" />
					<span class="text-sm font-semibold text-white">Your Goals Dashboard</span>
				</div>
				<div class="flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
					<Calendar class="w-3 h-3 text-indigo-400" />
					<span class="text-xs font-semibold text-indigo-400">Q4 2024</span>
				</div>
			</div>
		{/if}

		<!-- Main Content -->
		<div class="p-5">
			<!-- Overall Progress Summary -->
			<div class="mb-5 p-4 bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/30 rounded-xl">
				<div class="flex items-center justify-between mb-2">
					<div>
						<div class="text-xs text-zinc-400 mb-1">Overall Performance</div>
						<div class="text-2xl font-bold text-white">82%</div>
					</div>
					<div class="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg">
						<Trophy class="w-8 h-8 text-white" />
					</div>
				</div>
				<div class="flex items-center gap-2 text-xs text-zinc-400">
					<TrendingUp class="w-3.5 h-3.5 text-green-500" />
					<span>On track to exceed 3 of 4 goals this quarter</span>
				</div>
			</div>

			<!-- Individual Goals -->
			<div class="space-y-3">
				{#each goals as goal, i}
					{@const progress = getProgress(goal)}
					{@const IconComponent = goal.icon}
					<div 
						class="p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl hover:border-{goal.color}-500/30 hover:bg-{goal.color}-500/5 transition-all group"
						in:fade={{ delay: i * 100 }}
					>
						<div class="flex items-center gap-3 mb-2">
							<div class="w-8 h-8 rounded-lg bg-{goal.color}-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
								<IconComponent class="w-4 h-4 text-{goal.color}-500" />
							</div>
							<div class="flex-1">
								<div class="text-xs font-semibold text-white mb-0.5">{goal.name}</div>
								<div class="flex items-center gap-2">
									<div class="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
										<div class="h-full bg-gradient-to-r from-{goal.color}-600 to-{goal.color}-500 rounded-full transition-all duration-1000" style="width: {progress}%"></div>
									</div>
									<span class="text-[10px] font-semibold text-{goal.color}-500">{progress.toFixed(0)}%</span>
								</div>
							</div>
						</div>
						<div class="flex items-center justify-between text-xs">
							<span class="text-zinc-400">Current: <span class="font-semibold text-white">{formatValue(goal.current, goal.unit)}</span></span>
							<span class="text-zinc-500">Target: {formatValue(goal.target, goal.unit)}</span>
						</div>
					</div>
				{/each}
			</div>

			<!-- Action Button -->
			<div class="mt-4 p-3 bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border border-indigo-500/30 rounded-xl">
				<div class="flex items-center justify-between">
					<div class="flex items-center gap-2">
						<Star class="w-4 h-4 text-indigo-400" />
						<span class="text-xs font-semibold text-indigo-400">AI Recommendation</span>
					</div>
					<ArrowRight class="w-4 h-4 text-indigo-400" />
				</div>
				<p class="text-xs text-zinc-400 mt-2">Focus on demo conversion to hit all Q4 targets</p>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes float-slow {
		0%, 100% { transform: translateY(0px) translateX(0px); }
		50% { transform: translateY(-15px) translateX(10px); }
	}
</style>

