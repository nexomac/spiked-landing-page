<script>
    import { goto } from '$app/navigation';

    let { data, form } = $props();
    let showAiModal = $state(false);
    let aiPrompt = $state('');
    let isGenerating = $state(false);

    async function generateModel() {
        if (!aiPrompt.trim()) return;

        isGenerating = true;
        try {
            const response = await fetch('/admin/api/generate-model', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: aiPrompt })
            });

            const result = await response.json();

            if (result.success) {
                // Refresh page
                window.location.reload();
            } else {
                alert('Error: ' + result.error);
                isGenerating = false;
            }
        } catch (e) {
            alert('Error: ' + e.message);
            isGenerating = false;
        }
    }
</script>

<div class="min-h-screen bg-black text-white pt-24 px-4 relative">
    <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-8">
            <div class="flex items-center">
                <a href="/admin" class="text-gray-400 hover:text-white mr-4">← Back</a>
                <h1 class="text-3xl font-bold">Content Models</h1>
            </div>
            
            <button 
                onclick={() => showAiModal = true}
                class="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 text-white px-6 py-2 rounded-lg font-bold transition flex items-center gap-2 border border-blue-500/30"
            >
                ✨ Generate Schema with AI
            </button>
        </div>

        <!-- AI Modal -->
        {#if showAiModal}
            <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="bg-gray-900 border border-red-500/30 w-full max-w-lg p-6 rounded-2xl shadow-2xl relative">
                    <button onclick={() => showAiModal = false} class="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
                    
                    <h2 class="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">AI Schema Architect</h2>
                    <p class="text-gray-400 text-sm mb-6">Using Gemini 2.5 Flash</p>

                    <div class="space-y-4">
                        <div>
                            <div class="block text-sm font-bold text-gray-300 mb-2">What kind of content model?</div>
                            <textarea 
                                bind:value={aiPrompt}
                                rows="3" 
                                placeholder="e.g. A 'Product' model with price, sku, and multiple images..."
                                class="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-red-500 outline-none resize-none"
                            ></textarea>
                        </div>

                        <div class="flex justify-end gap-3 pt-4 border-t border-gray-800">
                            <button 
                                onclick={() => showAiModal = false}
                                class="px-4 py-2 text-gray-400 hover:text-white"
                            >
                                Cancel
                            </button>
                            <button 
                                onclick={generateModel}
                                disabled={isGenerating || !aiPrompt.trim()}
                                class="bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold transition flex items-center gap-2"
                            >
                                {#if isGenerating}
                                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Designing...
                                {:else}
                                    Create Model →
                                {/if}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- List -->
            <div class="space-y-4">
                <h2 class="text-xl font-semibold mb-4">Existing Models</h2>
                {#each data.models as model}
                    <div class="p-4 bg-gray-900 border border-gray-800 rounded-lg flex justify-between items-center group">
                        <div>
                            <div class="font-bold">{model.name}</div>
                            <div class="text-xs text-gray-500">{model.slug}</div>
                        </div>
                        <a href="/admin/models/{model.slug}" class="text-red-400 opacity-0 group-hover:opacity-100 transition">
                            Edit Schema →
                        </a>
                    </div>
                {/each}
            </div>

            <!-- Create -->
            <div class="bg-gray-900/50 p-6 rounded-xl border border-gray-800 h-fit">
                <h2 class="text-xl font-semibold mb-4">Manually Create</h2>
                <form method="POST" action="?/create" class="space-y-4">
                    <div>
                        <label for="modelName" class="block text-sm text-gray-400 mb-1">Model Name</label>
                        <input id="modelName" name="name" type="text" placeholder="e.g. Blog Post" required 
                            class="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" />
                    </div>
                    <div>
                        <label for="modelSlug" class="block text-sm text-gray-400 mb-1">API Slug</label>
                        <input id="modelSlug" name="slug" type="text" placeholder="e.g. blog-post" required 
                            class="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white" />
                    </div>
                    <button class="w-full bg-white text-black font-bold py-2 rounded hover:bg-gray-200 transition">
                        Create Model
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
