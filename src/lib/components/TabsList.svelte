<script>
	import { Tabs as TabsPrimitive } from "bits-ui";
	
	let {
		children,
		class: className = "",
		...restProps
	} = $props();
</script>

<TabsPrimitive.List
	class="inline-flex items-center justify-center rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl p-2 shadow-xl border border-gray-200/50 dark:border-gray-700/50 {className}"
	{...restProps}
>
	{@render children?.()}
</TabsPrimitive.List>
