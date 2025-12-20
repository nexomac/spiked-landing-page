<script>
    import { Share2, Check, Copy } from 'lucide-svelte';
    import { fade } from 'svelte/transition';

    let { title = '', text = '', url = '' } = $props();

    let copied = $state(false);

    async function handleShare() {
        // Use current URL if not provided
        const shareUrl = url || window.location.href;
        const shareData = { title, text, url: shareUrl };

        // Try Native Share API first
        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // User cancelled or error, fall back to copy
                 if (err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                    copyToClipboard(shareUrl);
                }
            }
        } else {
            // Fallback to clipboard
            copyToClipboard(shareUrl);
        }
    }

    async function copyToClipboard(textToCopy) {
        try {
            await navigator.clipboard.writeText(textToCopy);
            copied = true;
            setTimeout(() => copied = false, 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    }
</script>

<button 
    onclick={handleShare}
    class="group flex items-center justify-center gap-2 px-4 py-2 border border-black/20 hover:border-black rounded-full bg-white transition-all active:scale-95"
    aria-label="Share article"
>
    {#if copied}
        <div in:fade={{ duration: 150 }} class="flex items-center gap-2 text-green-700">
            <Check size={16} />
            <span class="text-xs font-bold uppercase tracking-wider">Copied</span>
        </div>
    {:else}
        <div in:fade={{ duration: 150 }} class="flex items-center gap-2 text-gray-600 group-hover:text-black">
            <Share2 size={16} />
            <span class="text-xs font-bold uppercase tracking-wider">Share</span>
        </div>
    {/if}
</button>
