<script>
	import { Tabs as TabsPrimitive } from "bits-ui";
	
	let {
		children,
		class: className = "",
		value,
		...restProps
	} = $props();
</script>

<TabsPrimitive.Trigger
	{value}
	class="inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-3 text-sm font-semibold ring-offset-white transition-all duration-300
	focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2
	disabled:pointer-events-none disabled:opacity-50
	data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg
	data-[state=inactive]:text-gray-600 dark:data-[state=inactive]:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50
	{className}"
	{...restProps}
>
	{@render children?.()}
</TabsPrimitive.Trigger>
