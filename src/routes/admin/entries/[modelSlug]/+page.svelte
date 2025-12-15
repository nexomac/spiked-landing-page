<script>
import { goto } from '$app/navigation';

let { data } = $props();
let showAiModal = $state(false);
let aiPrompt = $state('');
let isGenerating = $state(false);

async function generateContent() {
    if (!aiPrompt.trim()) return;

        isGenerating = true;
        try {
            const response = await fetch('/admin/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    modelSlug: data.model.slug,
                    prompt: aiPrompt
                })
            });

            const result = await response.json();

            if (result.success) {
                // Redirect to editor
                goto(`/admin/editor/${data.model.slug}/${result.entryId}`);
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
    <div class="max-w-6xl mx-auto">
        <div class="flex justify-between items-center mb-8">
            <div class="flex items-center">
                <a href="/admin" class="text-gray-400 hover:text-white mr-4">← Dashboard</a>
                <h1 class="text-3xl font-bold">{data.model.name} Entries</h1>
            </div>
            
            <div class="flex gap-4">
                <div class="relative inline-flex group">
                    <div
                        class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                    </div>
                    <button onclick={() => showAiModal = true} class="relative inline-flex items-center justify-center px-6 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                        Generate with AI
                    </button>
                </div>
                <form action="?/createDraft" method="POST">
                    <button class="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-bold transition border border-gray-700">
                        + Empty Draft
                    </button>
                </form>
            </div>
        </div>

        <!-- AI Modal -->
        {#if showAiModal}
            <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div class="bg-gray-900 border border-red-500/30 w-full max-w-lg p-6 rounded-2xl shadow-2xl relative">
                    <button onclick={() => showAiModal = false} class="absolute top-4 right-4 text-gray-500 hover:text-white">✕</button>
                    
                    <h2 class="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">AI Content Generator</h2>
                    <p class="text-gray-400 text-sm mb-6">Using Gemini 2.0 Flash Lite</p>

                    <div class="space-y-4">
                        <div>
                            <div class="block text-sm font-bold text-gray-300 mb-2">What should I write about?</div>
                            <textarea 
                                bind:value={aiPrompt}
                                rows="4" 
                                placeholder="e.g. A breaking news story about a new AI chip from Nvidia, written in a dramatic style..."
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
                                onclick={generateContent}
                                disabled={isGenerating || !aiPrompt.trim()}
                                class="bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold transition flex items-center gap-2"
                            >
                                {#if isGenerating}
                                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Generating...
                                {:else}
                                    Generate Draft →
                                {/if}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}

        {#if data.entries.length === 0}
            <div class="text-center py-20 border border-gray-800 rounded-2xl bg-gray-900/30">
                <p class="text-gray-400">No entries yet.</p>
            </div>
        {:else}
            <div class="grid gap-4">
                {#each data.entries as entry}
                    <a href="/admin/editor/{data.model.slug}/{entry._id}" class="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-red-500 transition group">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-bold text-lg group-hover:text-red-400 transition">
                                    {entry.data?.Title || entry.data?.title || 'Untitled'}
                                </h3>
                                <div class="text-sm text-gray-500 mt-1">
                                    Last updated: {new Date(entry.updatedAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div class="flex items-center space-x-2">
                                {#if entry.status === 'live'}
                                    <span class="px-2 py-1 bg-green-900/50 text-green-400 text-xs rounded border border-green-900">LIVE</span>
                                {:else}
                                    <span class="px-2 py-1 bg-yellow-900/50 text-yellow-400 text-xs rounded border border-yellow-900">DRAFT</span>
                                {/if}
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</div>
