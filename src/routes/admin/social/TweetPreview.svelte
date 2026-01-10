<script>
    import { MessageCircle, Repeat2, Heart, Share, AlertTriangle } from 'lucide-svelte';

    let { content, type, status, scheduledFor, author, sourceType, sourceUrl, blogSlug } = $props();

    // Validation
    let charCount = $derived(content ? content.length : 0);
    let isOverLimit = $derived(charCount > 280);
    let progressColor = $derived(
        charCount > 280 ? 'text-red-500' : 
        charCount > 260 ? 'text-yellow-500' : 'text-indigo-400'
    );
    let progressRing = $derived(Math.min((charCount / 280) * 100, 100));

    function formatTime(date) {
        if (!date) return '';
        return new Date(date).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
</script>

<div class="bg-black/40 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition group font-sans">
    <!-- Meta Header -->
    <div class="px-4 py-2 bg-gray-900/30 border-b border-gray-800 flex items-center justify-between text-xs">
        <div class="flex items-center gap-3 text-gray-400">
            <div class="flex items-center gap-1.5">
                {#if sourceType === 'blog'}
                    <span class="bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded border border-purple-500/20">Blog</span>
                {:else if sourceType === 'url'}
                    <span class="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/20">Link</span>
                {:else}
                    <span class="bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded border border-gray-600">Manual</span>
                {/if}
                
                {#if author === 'ai'}
                     <span class="flex items-center gap-1 text-indigo-400">
                        <span class="text-[10px]">✨</span> AI
                     </span>
                {/if}
            </div>
            
            <span class="text-gray-600">|</span>

            {#if scheduledFor}
                <span class="text-emerald-400 flex items-center gap-1">
                     Is Scheduled: {formatTime(scheduledFor)}
                </span>
            {:else}
                <span class="text-gray-500">Unscheduled</span>
            {/if}
        </div>

        <div class="flex items-center gap-2">
            {#if isOverLimit}
                <div class="flex items-center gap-1 text-red-400 bg-red-900/20 px-2 py-0.5 rounded-full border border-red-900/50">
                    <AlertTriangle class="w-3 h-3" />
                    <span class="font-medium">Too Long</span>
                </div>
            {/if}
            <div class="relative w-5 h-5 flex items-center justify-center">
                 <svg class="transform -rotate-90 w-full h-full" viewBox="0 0 36 36">
                    <path class="text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4" />
                    <path class={`${progressColor} transition-all duration-300`} stroke-dasharray={`${progressRing}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" stroke-width="4" />
                </svg>
                <span class="absolute text-[8px] font-mono text-gray-500">{280 - charCount}</span>
            </div>
        </div>
    </div>

    <!-- Twitter Preview Body -->
    <div class="p-4 flex gap-3">
        <!-- Avatar Column -->
        <div class="shrink-0"> 
            <div class="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                S
            </div>
            {#if type === 'thread'}
                <div class="w-0.5 h-full bg-gray-800 mx-auto mt-2"></div>
            {/if}
        </div>

        <!-- Content Column -->
        <div class="flex-1 min-w-0">
            <!-- Handle Row -->
            <div class="flex items-center gap-1 text-[15px] leading-5">
                <span class="font-bold text-white">Spiked AI</span>
                <span class="text-gray-500">@SpikedAI</span>
                <span class="text-gray-500">·</span>
                <span class="text-gray-500 text-sm">Now</span>
            </div>

            <!-- Tweet Text -->
            <div class="text-[15px] text-white whitespace-pre-wrap leading-6 mt-0.5 mb-2">
                {content}
            </div>

            <!-- Card/Media Placeholder -->
            {#if sourceUrl || blogSlug}
                <div class="mt-2 mb-2 rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden">
                    <div class="h-32 bg-gray-800/50 flex items-center justify-center text-gray-600">
                        <span class="text-xs">Link Preview Card Generator</span>
                    </div>
                     <div class="p-3 bg-black">
                        <div class="text-gray-400 text-xs mb-0.5 truncate uppercase">spiked.ai</div>
                        <div class="text-white text-sm font-medium truncate">{blogSlug ? `Blog Reference: ${blogSlug}` : sourceUrl}</div>
                    </div>
                </div>
            {/if}

            <!-- Action Bar (Simulated) -->
            <div class="flex items-center justify-between text-gray-500 max-w-md mt-3">
                <div class="flex items-center gap-2 group cursor-pointer hover:text-blue-400">
                    <MessageCircle class="w-4 h-4 group-hover:bg-blue-500/10 rounded-full" />
                    <span class="text-xs">0</span>
                </div>
                <div class="flex items-center gap-2 group cursor-pointer hover:text-green-400">
                    <Repeat2 class="w-4 h-4 group-hover:bg-green-500/10 rounded-full" />
                     <span class="text-xs">0</span>
                </div>
                <div class="flex items-center gap-2 group cursor-pointer hover:text-pink-400">
                    <Heart class="w-4 h-4 group-hover:bg-pink-500/10 rounded-full" />
                     <span class="text-xs">0</span>
                </div>
                <div class="group cursor-pointer hover:text-blue-400">
                    <Share class="w-4 h-4 group-hover:bg-blue-500/10 rounded-full" />
                </div>
            </div>
        </div>
    </div>
</div>
