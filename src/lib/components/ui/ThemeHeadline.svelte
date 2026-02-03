<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [class] - Additional classes
	 * @property {'h1' | 'h2' | 'h3' | 'h4' | 'sub'} [variant] - Text variant
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { class: className = "", variant = "h2", children } = $props();

	const variants = {
		h1: "font-black tracking-tighter leading-[0.95] text-[clamp(3.5rem,8vw,6rem)]",
		h2: "font-bold tracking-tight leading-[1.1] text-[clamp(2.5rem,5vw,4rem)]",
		h3: "font-bold tracking-normal leading-tight text-[clamp(1.75rem,3vw,2.5rem)]",
		h4: "font-bold text-xl md:text-2xl",
		sub: "font-medium text-muted-foreground text-[clamp(1.125rem,1.5vw,1.5rem)] leading-relaxed",
	};
</script>

<!-- Dynamic element rendering would be ideal, but for simplicity/safety with snippets: -->
<div class="{variants[variant]} {className}">
	{@render children?.()}
</div>
