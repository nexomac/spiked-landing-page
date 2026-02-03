<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} [class] - Additional classes
	 * @property {string} [id] - Section ID
	 * @property {'default' | 'alternate' | 'none'} [background] - Background style. 'alternate' usually means muted/secondary background.
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let {
		class: className = "",
		id = "",
		background = "default",
		children,
	} = $props();

	// Background logic
	const bgClasses = {
		default: "bg-background",
		alternate: "bg-secondary/30", // Subtle differentiation
		none: "bg-transparent",
	};
</script>

<section
	{id}
	class="
    relative w-full overflow-hidden
    {bgClasses[background]}
    {className}
  "
	style="padding: clamp(3rem, 6vw, 6rem) 0;"
>
	<div
		class="mx-auto w-full px-[clamp(1.5rem,4vw,3rem)] max-w-[1400px]"
	>
		{@render children?.()}
	</div>
</section>
