<script>
	import "../app.css";
	import { onMount } from "svelte";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";
	import Navigation from "$lib/components/Navigation.svelte";
	import GlobalLoader from "$lib/components/GlobalLoader.svelte";
	import { themeStore } from "$lib/stores/theme.js";
	import OnboardingFlow from "$lib/components/OnboardingFlow.svelte";

	let { children } = $props();
	// Enable 75% scaling by default for that "browser zoom" look
	let enableScale = $state(true);

	injectAnalytics();

	onMount(() => {
		// Initialize theme based on saved preference or system settings
		themeStore.init();

		// Add class to html for global selectors
		if (enableScale) {
			document.documentElement.classList.add("site-scaled");
		}
	});
</script>

<div id="site-root" class:scaled={enableScale}>
	<GlobalLoader />
	<Navigation />
	<OnboardingFlow />
	{@render children()}
</div>
