<script>
	import { Tabs as TabsPrimitive } from "bits-ui";
	
	let {
		children,
		class: className = "",
		value,
		...restProps
	} = $props();
</script>

<TabsPrimitive.Content
	{value}
	class="mt-8 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 animate-in fade-in-50 {className}"
	{...restProps}
>
	{@render children?.()}
</TabsPrimitive.Content>
