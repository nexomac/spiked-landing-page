<script>
    import { enhance } from '$app/forms';
    import { Send, CheckCircle, AlertOctagon, X, ExternalLink, Loader2 } from 'lucide-svelte';
    
    let { item, onClose } = $props();

    let status = $state('idle'); // idle, publishing, success, error
    let publishedUrl = $state(null);
    let errorMessage = $state(null);

    function handleResult({ result }) {
        if (result.type === 'success' && result.data.success) {
            status = 'success';
            publishedUrl = result.data.publishedUrl;
        } else {
            status = 'error';
            errorMessage = result.data?.error || 'Unknown error occurred';
        }
    }
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
    <div class="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-md shadow-2xl overflow-hidden font-sans">
        
        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-800 flex justify-between items-center bg-gray-950">
            <h3 class="text-lg font-bold text-white flex items-center gap-2">
                <Send class="w-4 h-4 text-indigo-400" />
                Publish to X
            </h3>
            {#if status !== 'publishing'}
                <button onclick={onClose} class="text-gray-500 hover:text-white transition">
                    <X class="w-5 h-5" />
                </button>
            {/if}
        </div>

        <div class="p-6">
            <!-- Content Preview -->
            <div class="mb-6 bg-gray-950 rounded-lg p-4 border border-gray-800 text-sm text-gray-300 whitespace-pre-wrap">
                {item.content}
            </div>

            <!-- Status: IDLE -->
            {#if status === 'idle'}
                <p class="text-gray-400 text-sm mb-6">
                    Are you sure you want to publish this post immediately? This action cannot be undone.
                </p>
                
                <form 
                    action="?/publish" 
                    method="POST" 
                    use:enhance={() => {
                        status = 'publishing';
                        return async ({ result }) => {
                            handleResult({ result });
                        };
                    }}
                >
                    <input type="hidden" name="id" value={item._id} />
                    <div class="flex gap-3 justify-end">
                        <button 
                            type="button" 
                            onclick={onClose}
                            class="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition text-sm font-medium flex items-center gap-2"
                        >
                            <Send class="w-4 h-4" />
                            Publish Now
                        </button>
                    </div>
                </form>
            {/if}

            <!-- Status: PUBLISHING -->
            {#if status === 'publishing'}
                <div class="py-8 flex flex-col items-center justify-center text-center">
                    <Loader2 class="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                    <h4 class="text-white font-medium mb-1">Posting to X...</h4>
                    <p class="text-gray-500 text-sm">Please wait while we connect to the API.</p>
                </div>
            {/if}

            <!-- Status: SUCCESS -->
            {#if status === 'success'}
                <div class="py-4 text-center">
                    <div class="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle class="w-6 h-6" />
                    </div>
                    <h4 class="text-white font-bold text-lg mb-2">Successfully Published!</h4>
                    <p class="text-gray-400 text-sm mb-6">Your post is now live on X.</p>
                    
                    <div class="flex flex-col gap-3">
                        <a 
                            href={publishedUrl} 
                            target="_blank" 
                            class="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition font-medium text-sm flex items-center justify-center gap-2"
                        >
                            View on X
                            <ExternalLink class="w-4 h-4" />
                        </a>
                        <button 
                            onclick={onClose}
                            class="w-full py-2.5 text-gray-500 hover:text-gray-400 text-sm font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            {/if}

            <!-- Status: ERROR -->
            {#if status === 'error'}
                <div class="py-4 text-center">
                    <div class="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertOctagon class="w-6 h-6" />
                    </div>
                    <h4 class="text-white font-bold text-lg mb-2">Publishing Failed</h4>
                    <p class="text-gray-400 text-sm mb-6">{errorMessage}</p>
                    
                    <div class="flex gap-3 justify-center">
                        <button 
                            onclick={onClose}
                            class="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition text-sm font-medium"
                        >
                            Close
                        </button>
                        <button 
                            onclick={() => status = 'idle'}
                            class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition text-sm font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
