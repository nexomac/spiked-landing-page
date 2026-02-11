<script>
	import { Sparkles, MessageSquare, Calendar, Users, Link2, BarChart3, Heart, Settings } from 'lucide-svelte';
	
	let {
		icon,
		title,
		subtitle,
		description,
		features = [],
		image,
		reverse = false
	} = $props();

	const iconMap = {
		'sparkles': Sparkles,
		'message': MessageSquare,
		'calendar': Calendar,
		'users': Users,
		'link': Link2,
		'chart': BarChart3,
		'heart': Heart,
		'settings': Settings
	};

	const IconComponent = iconMap[icon] || Sparkles;
</script>

<div class="grid lg:grid-cols-2 gap-12 items-center {reverse ? 'lg:flex-row-reverse' : ''}">
	<!-- Content Side -->
	<div class="{reverse ? 'lg:order-2' : ''}">
		<div class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full mb-6 border border-purple-200/50 dark:border-purple-700/50">
			<IconComponent class="w-4 h-4 text-purple-600 dark:text-purple-400" />
			<span class="text-purple-700 dark:text-purple-300 font-semibold text-sm uppercase tracking-wide">{subtitle}</span>
		</div>
		
		<h3 class="text-4xl lg:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
			{title}
		</h3>
		
		<p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
			{description}
		</p>
		
		{#if features.length > 0}
			<ul class="space-y-4">
				{#each features as feature}
					<li class="flex items-start gap-3 group">
						<div class="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
							<svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
							</svg>
						</div>
						<span class="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
	
	<!-- Visual Side -->
	<div class="{reverse ? 'lg:order-1' : ''} relative">
		<div class="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
		<div class="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl p-8 hover:shadow-purple-500/20 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-500">
			{@render image?.()}
		</div>
	</div>
</div>
