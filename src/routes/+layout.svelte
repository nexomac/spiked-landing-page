<script>
	import "../app.css";
	import { onMount } from "svelte";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";
	import Navigation from "$lib/components/Navigation.svelte";
	import GlobalLoader from "$lib/components/GlobalLoader.svelte";
	import { themeStore } from "$lib/stores/theme.js";
	import OnboardingFlow from "$lib/components/OnboardingFlow.svelte";

	let { children } = $props();
	injectAnalytics();

	onMount(() => {
		// Initialize theme based on saved preference or system settings
		themeStore.init();
	});
</script>

<div id="site-root">
	<GlobalLoader />
	<Navigation />
	<OnboardingFlow />
	{@render children()}
</div>
