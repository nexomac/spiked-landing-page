<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	let { children } = $props();
	let enableScale = $state(false);

	onMount(() => {
		// Force dark theme
		document.documentElement.classList.add('dark');

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
	<Navigation />
	{@render children()}
</div>
