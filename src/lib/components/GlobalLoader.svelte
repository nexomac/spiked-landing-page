<script>
	import { navigating } from "$app/stores";
	import { fade } from "svelte/transition";
	import { onMount } from "svelte";

	let showDeepLoader = $state(false);
	let timer;

	$effect(() => {
		if ($navigating) {
			timer = setTimeout(() => {
				showDeepLoader = true;
			}, 400); // Only show deep loader for loads over 400ms
		} else {
			clearTimeout(timer);
			showDeepLoader = false;
		}
	});
</script>

{#if $navigating}
	<!-- Top Progress Bar with Glow -->
	<div class="sticky top-0 left-0 w-full h-1 z-[9999] pointer-events-none">
		<div
			class="h-full bg-primary shadow-[0_0_10px_#ef1820,0_0_20px_#ef1820] animate-progress transition-all duration-300"
		></div>
	</div>
{/if}

<style>
	@keyframes progress {
		0% {
			width: 0%;
			opacity: 1;
		}
		50% {
			width: 70%;
			opacity: 1;
		}
		100% {
			width: 95%;
			opacity: 0.8;
		}
	}

	.animate-progress {
		animation: progress 8s cubic-bezier(0.1, 0, 0.1, 1) forwards;
	}
</style>
