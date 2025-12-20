<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import Navigation from '$lib/components/Navigation.svelte';
    import GlobalLoader from '$lib/components/GlobalLoader.svelte';
	import { themeStore } from '$lib/stores/theme.js';

	let { children } = $props();
	let enableScale = $state(false);

	injectAnalytics();

	onMount(() => {
		// Initialize theme based on saved preference or system settings
		themeStore.init();

		// Enable scaling automatically when running on vercel.app hosts
		// or when ?scale=0.8 is present (handy for testing locally)
		try {
			const host = window.location.hostname || '';
			const params = new URLSearchParams(window.location.search);

			if (host.includes('vercel.app') || params.get('scale') === '0.8') {
				enableScale = true;
				// add class to html for global selectors as well
				document.documentElement.classList.add('site-scale-80');
			}
		} catch (e) {
			// noop in non-browser environments
		}
	});
</script>

<div id="site-root" class:scaled={enableScale}>
    <GlobalLoader />
	<Navigation />
	{@render children()}
</div>
