<script>
    import { untrack } from 'svelte';
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import TiptapEditor from '$lib/components/TiptapEditor.svelte';

    let { data, form } = $props();

    // Local state for the editor
    let entryData = $state({});
    let isSaving = $state(false);

    // Initialize state from server data - only on load or reload
    $effect.pre(() => {
        // We only want to re-init when 'data' changes, not when 'entryData' itself is modified
        if (data.entry.data && !isSaving) {
            untrack(() => {
                const base = JSON.parse(JSON.stringify(data.entry.data));
                entryData = {
                    ...base,
                    author: data.entry.author || base.author || 'Editorial Staff',
                    publishedDate: data.entry.publishedDate || base.publishedDate || '',
                    title: data.entry.title || base.title || '',
                    slug: data.entry.slug || base.slug || ''
                };
            });
        }
    });

    function updateRichText(fieldSlug, json) {
        entryData[fieldSlug] = json;
    }

    function updateStat(fieldSlug, partIndex, val) {
        let current = entryData[fieldSlug] || '';
        let parts = current.split('|');
        if (parts.length < 2) parts = ['', ''];
        parts[partIndex] = val;
        entryData[fieldSlug] = parts.join('|');
    }

    async function handleImageUpload(fieldSlug, event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            entryData[fieldSlug] = e.target.result;
        };
        reader.readAsDataURL(file);
    }
</script>

<div class="min-h-screen bg-black text-white pt-24 px-4 pb-40 relative">
    {#if isSaving}
        <!-- Loading Overlay -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
            <div class="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-xl font-bold tracking-widest uppercase animate-pulse">Publishing Changes...</p>
            <p class="text-gray-400 text-sm mt-2 font-mono">Updating database records...</p>
        </div>
    {/if}

    <form method="POST" action="?/save" use:enhance={() => {
        isSaving = true;
        return async ({ result, update }) => {
            await update();
            if (result.type === 'success') {
                await invalidateAll();
                window.location.reload(); // Hard reload as requested to ensure fresh DB state
            }
            isSaving = false;
        };
    }} class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 {isSaving ? 'pointer-events-none select-none grayscale-[0.5]' : ''}">
        
        <!-- Main Editor (Left) -->
        <div class="lg:col-span-2 space-y-8">
            <div class="flex items-center mb-8">
                <a href="/admin/entries/{data.model.slug}" class="text-gray-400 hover:text-white mr-4">← Back</a>
                <h1 class="text-3xl font-bold">Editing {entryData.title || 'Untitled'}</h1>
            </div>

            <fieldset disabled={isSaving} class="space-y-8 border-none p-0 m-0">
                {#each data.model.fields as field (field.slug)}
                    <div class="space-y-2">
                        <div class="block text-sm font-medium text-gray-300 uppercase tracking-wide">
                            <span class="block mb-1">
                                {field.name}
                                {#if field.required}<span class="text-red-500">*</span>{/if}
                            </span>
                        </div>

                        {#if field.type === 'richtext'}
                            <TiptapEditor 
                                value={entryData[field.slug] || { type: 'doc', content: [{ type: 'paragraph' }] }} 
                                onChange={(json) => updateRichText(field.slug, json)} 
                            />
                            <input type="hidden" name="richtext_{field.slug}" value={JSON.stringify(entryData[field.slug])} />
                        {:else if field.type === 'image'}
                            <div class="space-y-4">
                                <div class="flex gap-4">
                                    <div class="relative flex-1 group">
                                        <input 
                                            type="text" 
                                            name={field.slug} 
                                            bind:value={entryData[field.slug]}
                                            placeholder="Paste image link (http://...) or upload below" 
                                            class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none transition-all"
                                        />
                                        {#if entryData[field.slug]}
                                            <button 
                                                type="button"
                                                onclick={() => entryData[field.slug] = ''}
                                                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 text-xs font-bold uppercase"
                                            >
                                                Clear
                                            </button>
                                        {/if}
                                    </div>
                                    
                                    <label class="shrink-0 cursor-pointer group/upload">
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            class="hidden" 
                                            onchange={(e) => handleImageUpload(field.slug, e)}
                                        />
                                        <div class="h-full px-6 flex items-center justify-center bg-gray-900 border border-gray-800 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-gray-800 hover:border-red-500/50 transition-all text-gray-300 group-hover/upload:text-white">
                                            Upload
                                        </div>
                                    </label>
                                </div>

                                {#if entryData[field.slug]}
                                    <div class="relative w-full max-w-sm aspect-video rounded-xl overflow-hidden border border-gray-800 bg-gray-950 group">
                                        <img 
                                            src={entryData[field.slug]} 
                                            alt="Preview" 
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                {/if}
                            </div>
                        {:else if field.type === 'date'}
                            <input 
                                type="datetime-local" 
                                name={field.slug} 
                                bind:value={entryData[field.slug]}
                                class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none"
                            />
                        {:else if field.type === 'statistic'}
                             <div class="flex gap-4">
                                <div class="flex-1">
                                    <label for="stat-label-{field.slug}" class="block text-[10px] text-gray-500 uppercase mb-1">Label</label>
                                    <input 
                                        id="stat-label-{field.slug}"
                                        type="text" 
                                        value={entryData[field.slug]?.split('|')[0] || ''}
                                        oninput={(e) => updateStat(field.slug, 0, e.target.value)}
                                        class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white outline-none focus:border-red-500"
                                    />
                                </div>
                                <div class="w-32">
                                    <label for="stat-val-{field.slug}" class="block text-[10px] text-gray-500 uppercase mb-1">Value</label>
                                    <input 
                                        id="stat-val-{field.slug}"
                                        type="text" 
                                        value={entryData[field.slug]?.split('|')[1] || ''}
                                        oninput={(e) => updateStat(field.slug, 1, e.target.value)}
                                        class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 text-white outline-none focus:border-red-500 font-bold text-center"
                                    />
                                </div>
                             </div>
                             <input type="hidden" name={field.slug} value={entryData[field.slug] || ''} />
                        {:else if field.type === 'divider'}
                            <div class="flex items-center gap-4 py-4 px-8 border border-dashed border-gray-800 rounded-lg bg-gray-950/30">
                                <div class="h-px flex-1 bg-gray-800"></div>
                                <span class="text-xs font-mono text-gray-600 uppercase tracking-widest">Section Divider</span>
                                <div class="h-px flex-1 bg-gray-800"></div>
                                <input type="hidden" name={field.slug} value="---" />
                            </div>
                        {:else if field.type === 'quote' || field.type === 'highlight' || field.type === 'callout'}
                             <textarea 
                                name={field.slug} 
                                bind:value={entryData[field.slug]}
                                class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none min-h-[100px]"
                            ></textarea>
                        {:else}
                            <input 
                                type="text" 
                                name={field.slug} 
                                bind:value={entryData[field.slug]}
                                class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none text-lg"
                            />
                        {/if}
                    </div>
                {/each}
            </fieldset>
        </div>

        <!-- Sidebar (Right) -->
        <div class="lg:col-span-1">
            <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-24 space-y-6">
                <div>
                    <h3 class="font-bold text-lg mb-4 text-red-500">Metadata</h3>
                    <div class="space-y-4">
                        <div>
                            <label for="author-input" class="block text-[10px] text-gray-500 uppercase mb-1 cursor-pointer">Author</label>
                            <input 
                                id="author-input"
                                type="text" 
                                name="author" 
                                bind:value={entryData.author}
                                class="w-full bg-black border border-gray-800 rounded-lg px-3 py-2 text-sm text-white focus:border-red-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>

                <hr class="border-gray-800" />

                <div>
                    <h3 class="font-bold text-lg mb-4">Publishing</h3>
                    <div class="flex justify-between items-center text-sm mb-6">
                        <span class="text-gray-400">Status:</span>
                        <span class="font-bold uppercase {data.entry.status === 'live' ? 'text-green-400' : 'text-yellow-400'}">
                            {data.entry.status}
                        </span>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <button 
                            name="status" 
                            value="draft" 
                            disabled={isSaving}
                            class="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save Draft
                        </button>
                        <button 
                            name="status" 
                            value="live" 
                            disabled={isSaving}
                            class="relative flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {#if isSaving}
                                <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            {:else}
                                Publish
                            {/if}
                        </button>
                    </div>
                </div>

                <hr class="border-gray-800" />

                <div>
                    <h3 class="font-bold text-lg mb-4">Associations</h3>
                    <div class="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                        {#each data.newsletters as newsletter}
                            <label class="flex items-center space-x-2 cursor-pointer hover:bg-black/40 p-2 rounded transition group">
                                <input 
                                    type="checkbox" 
                                    name="newsletters" 
                                    value={newsletter._id} 
                                    checked={data.entry.newsletters?.includes(newsletter._id)}
                                    class="rounded border-gray-700 bg-black text-red-600 focus:ring-red-500 cursor-pointer"
                                />
                                <span class="text-sm text-gray-400 group-hover:text-white transition-colors">{newsletter.title}</span>
                            </label>
                        {/each}
                    </div>
                </div>

                <div class="pt-4 mt-4 border-t border-gray-800">
                    <button 
                        formaction="?/delete" 
                        disabled={isSaving}
                        onclick={() => confirm('Are you sure?')} 
                        class="w-full text-gray-500 hover:text-red-500 text-xs uppercase tracking-widest py-2 transition-colors disabled:opacity-50"
                    >
                        Delete Permanent
                    </button>
                </div>
            </div>
            
            {#if form?.success}
                <div class="mt-4 p-3 bg-green-950/30 border border-green-500/30 rounded-lg text-green-400 text-center text-sm">
                    Changes synced to database.
                </div>
            {/if}
        </div>
    </form>
</div>

<style>
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #333;
        border-radius: 10px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: #444;
    }
</style>
