<script>
    import { navigating } from "$app/stores";
</script>

{#if $navigating}
    <div class="fixed top-0 left-0 w-full h-1 z-[100] bg-secondary">
        <div class="h-full bg-primary animate-progress"></div>
    </div>

    <div
        class="fixed bottom-4 right-4 bg-popover text-popover-foreground px-4 py-2 rounded-lg shadow-lg text-sm border border-border flex items-center gap-2 z-[100] animate-fade-in"
    >
        <div
            class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"
        ></div>
        Loading...
    </div>
{/if}

<style>
    @keyframes progress {
        0% {
            width: 0%;
        }
        50% {
            width: 70%;
        }
        100% {
            width: 90%;
        }
    }
    .animate-progress {
        animation: progress 2s ease-in-out infinite;
    }
    .animate-fade-in {
        animation: fadeIn 0.2s ease-out;
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
