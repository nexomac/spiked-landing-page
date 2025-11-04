<script>
	let {
		icon,
		title,
		selected = false,
		onclick
	} = $props();
</script>

<button
	{onclick}
	class="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]
	{selected ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-lg shadow-purple-500/20' : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'}"
>
	<!-- Checkbox -->
	<div class="absolute top-4 left-4 w-5 h-5 rounded border-2 transition-all duration-300
		{selected ? 'bg-purple-500 border-purple-500' : 'border-gray-300 dark:border-gray-600 group-hover:border-purple-400'}">
		{#if selected}
			<svg class="w-full h-full text-white p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
			</svg>
		{/if}
	</div>
	
	<!-- Icon -->
	<div class="flex flex-col items-center justify-center pt-4 pb-2">
		<div class="w-16 h-16 mb-4 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300
			{selected ? 'text-purple-600 dark:text-purple-400' : ''}">
			{@render icon?.()}
		</div>
		
		<!-- Title -->
		<h3 class="text-base font-semibold text-gray-900 dark:text-white text-center transition-colors duration-300
			{selected ? 'text-purple-700 dark:text-purple-300' : ''}">
			{title}
		</h3>
	</div>
	
	<!-- Selection indicator glow -->
	{#if selected}
		<div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 pointer-events-none"></div>
	{/if}
</button>
