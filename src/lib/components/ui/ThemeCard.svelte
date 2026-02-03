<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [class] - Additional classes
	 * @property {'default' | 'split'} [variant] - Card variant. 'split' is for side-by-side content/image.
	 * @property {import('svelte').Snippet} [children] - Default slot
	 * @property {import('svelte').Snippet} [image] - Image slot for 'split' variant
	 */

	/** @type {Props} */
	let {
		class: className = "",
		variant = "default",
		children,
		image,
	} = $props();
</script>

<div
	class="
    group relative overflow-hidden rounded-[2.5rem] transition-all duration-300
    border border-border/50 bg-card text-card-foreground shadow-sm hover:shadow-md
    {variant === 'split' ? 'grid grid-cols-1 lg:grid-cols-2 gap-0' : ''}
    {className}
  "
>
	<!-- Standard Content Wrapper -->
	<div
		class="relative z-10 flex flex-col justify-center h-full
        {variant === 'split' ? 'p-10 lg:p-16 order-2 lg:order-1' : 'p-10'}
    "
	>
		{@render children?.()}
	</div>

	<!-- Split Image Wrapper -->
	{#if variant === "split" && image}
		<div
			class="relative order-1 lg:order-2 min-h-[300px] lg:min-h-auto overflow-hidden bg-secondary/30"
		>
			<div class="absolute inset-0 w-full h-full object-cover">
				{@render image()}
			</div>
		</div>
	{/if}

	<!-- Subtle Decoration for 'default' cards (optional, B2B clean) -->
	{#if variant === "default"}
		<div
			class="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
		></div>
	{/if}
</div>
