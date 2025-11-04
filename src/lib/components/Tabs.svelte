<script>
	import { Tabs as TabsPrimitive } from "bits-ui";
	
	let {
		value = $bindable(),
		children,
		class: className = "",
		...restProps
	} = $props();
</script>

<TabsPrimitive.Root bind:value={value} class="w-full {className}" {...restProps}>
	{@render children?.()}
</TabsPrimitive.Root>

<script module>
	export { default as TabsList } from "./TabsList.svelte";
	export { default as TabsTrigger } from "./TabsTrigger.svelte";
	export { default as TabsContent } from "./TabsContent.svelte";
</script>
