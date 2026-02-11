<script>
	import "../app.css";
	import { onMount } from "svelte";
	import { injectAnalytics } from "@vercel/analytics/sveltekit";
	import { page } from "$app/stores";
	import Navigation from "$lib/components/Navigation.svelte";
	import GlobalLoader from "$lib/components/GlobalLoader.svelte";
	import { themeStore } from "$lib/stores/theme.js";
	import { afterNavigate } from '$app/navigation';
	import OnboardingFlow from "$lib/components/OnboardingFlow.svelte";
	import Footer from "$lib/components/Footer.svelte";

	let { children } = $props();
	injectAnalytics();

	// Check if current route should skip global navigation (homepage has its own header)
	let skipFeaturesFooter = $derived($page.url.pathname.startsWith("/features"));

	onMount(() => {
		// Initialize theme based on saved preference or system settings
		themeStore.init();
	});

	afterNavigate(() => {
		window.scrollTo(0, 0);
	});
</script>

<div id="site-root">
	<Navigation />
	<GlobalLoader />
	<OnboardingFlow />
	<div class="min-h-screen z-[10]">
		{@render children()}
	</div>
	{#if !skipFeaturesFooter}
		<Footer />
	{/if}
</div>
