<script>
    import { enhance } from '$app/forms';
    import TiptapEditor from '$lib/components/TiptapEditor.svelte';

    let { data, form } = $props();

    // Use a derived fallback for initial state setup
    let entryData = $state({});
    let isSaving = $state(false);

    // Synchronize state when page data loads
    $effect(() => {
        if (data.entry.data) {
            // We merge carefully to retain any local unsaved changes IF desired, 
            // but usually we want to follow the server's lead after a save.
            entryData = JSON.parse(JSON.stringify(data.entry.data));
        }
    });

    function updateRichText(fieldSlug, json) {
        entryData[fieldSlug] = json;
    }

    // Helper to check if Tiptap JSON is "empty"
    function isTiptapEmpty(v) {
        if (!v) return true;
        if (typeof v === 'string') return v.trim() === '';
        if (v.type === 'doc' && (!v.content || v.content.length === 0 || (v.content.length === 1 && v.content[0].type === 'paragraph' && (!v.content[0].content || v.content[0].content.length === 0)))) {
            return true;
        }
        return false;
    }

    // Get the best initial value for a field (checks slug, then name, then case-insensitive)
    function getFieldValue(field) {
        // 1. Direct slug match
        if (entryData[field.slug] !== undefined) return entryData[field.slug];
        
        // 2. Direct name match
        if (entryData[field.name] !== undefined) return entryData[field.name];

        // 3. Case-insensitive search through all entryData keys
        const ciKey = Object.keys(entryData).find(k => k.toLowerCase() === field.slug.toLowerCase());
        if (ciKey) return entryData[ciKey];

        // 4. Fallbacks for specific types
        if (field.type === 'richtext') {
            return { type: 'doc', content: [{ type: 'paragraph' }] };
        }

        return '';
    }
</script>

<div class="min-h-screen bg-black text-white pt-24 px-4 pb-40">
    <form method="POST" action="?/save" use:enhance={() => {
        isSaving = true;
        return async ({ update }) => {
            await update();
            isSaving = false;
        };
    }} class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Main Editor (Left) -->
        <div class="lg:col-span-2 space-y-8">
            <div class="flex items-center mb-8">
                <a href="/admin/entries/{data.model.slug}" class="text-gray-400 hover:text-white mr-4">← Back</a>
                <h1 class="text-3xl font-bold">Editing {entryData.title || entryData.Title || 'Untitled'}</h1>
            </div>

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
                            value={getFieldValue(field)} 
                            onChange={(json) => updateRichText(field.slug, json)} 
                        />
                        <!-- Hidden input to transport JSON data -->
                        <input type="hidden" name="richtext_{field.slug}" value={JSON.stringify(entryData[field.slug] || getFieldValue(field))} />
                    {:else if field.type === 'image'}
                        <div class="flex gap-4">
                            <input 
                                type="text" 
                                name={field.slug} 
                                bind:value={entryData[field.slug]}
                                placeholder="Image URL (http://...)" 
                                class="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none"
                            />
                            {#if entryData[field.slug]}
                                <img src={entryData[field.slug]} alt="Preview" class="h-12 w-12 rounded object-cover border border-gray-700"/>
                            {/if}
                        </div>
                    {:else if field.type === 'date'}
                        <input 
                            type="datetime-local" 
                            name={field.slug} 
                            bind:value={entryData[field.slug]}
                            class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none"
                        />
                    {:else if field.type === 'quote'}
                        <textarea 
                            name={field.slug} 
                            bind:value={entryData[field.slug]}
                            placeholder="Enter an impactful quote..."
                            class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none text-2xl font-serif italic text-center min-h-[120px]"
                        ></textarea>
                    {:else if field.type === 'highlight'}
                        <textarea 
                            name={field.slug} 
                            bind:value={entryData[field.slug]}
                            placeholder="Enter key takeaway or callout text..."
                            class="w-full bg-red-950/20 border border-red-500/30 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none font-sans"
                        ></textarea>
                    {:else}
                        <!-- Default Text -->
                        <input 
                            type="text" 
                            name={field.slug} 
                            bind:value={entryData[field.slug]}
                            class="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 outline-none text-lg"
                        />
                    {/if}
                </div>
            {/each}
        </div>

        <!-- Sidebar (Right) -->
        <div class="lg:col-span-1">
            <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 sticky top-24">
                <h3 class="font-bold text-lg mb-4">Publishing Status</h3>
                
                <div class="space-y-4 mb-8">
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-gray-400">Current Status</span>
                        {#if data.entry.status === 'live'}
                            <span class="text-green-400 font-bold">LIVE</span>
                        {:else}
                            <span class="text-yellow-400 font-bold">DRAFT</span>
                        {/if}
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <button name="status" value="draft" class="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition">
                        Save Draft
                    </button>
                    <button name="status" value="live" class="col-span-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition font-bold">
                        Publish
                    </button>
                </div>
            </div>

            <!-- Newsletters Section -->
            <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 mt-6">
                <h3 class="font-bold text-lg mb-4">Newsletters</h3>
                <p class="text-xs text-gray-500 mb-4">Select which newsletters this post belongs to.</p>
                
                {#if data.newsletters.length === 0}
                    <p class="text-xs text-gray-500 italic">No newsletters defined.</p>
                {:else}
                    <div class="space-y-2">
                        {#each data.newsletters as newsletter}
                            <label class="flex items-center space-x-2 cursor-pointer hover:bg-gray-800 p-2 rounded transition">
                                <input 
                                    type="checkbox" 
                                    name="newsletters" 
                                    value={newsletter._id} 
                                    checked={data.entry.newsletters && data.entry.newsletters.includes(newsletter._id)}
                                    class="rounded border-gray-700 bg-gray-950 text-red-600 focus:ring-red-500"
                                />
                                <span class="text-sm">{newsletter.title}</span>
                            </label>
                        {/each}
                    </div>
                {/if}
            </div>

            <div class="mt-4 pt-4 border-t border-gray-800">
                 <button formaction="?/delete" onclick={() => confirm('Are you sure you want to delete this entry? This cannot be undone.')} class="w-full text-red-500 hover:text-red-400 text-sm py-2 hover:bg-red-900/20 rounded-lg transition">
                    Delete Entry
                 </button>
            </div>
            
            {#if isSaving}
                <p class="text-center text-sm text-gray-400 mt-4 animate-pulse">Saving changes...</p>
            {:else if form?.success}
                <p class="text-center text-sm text-green-400 mt-4">Saved successfully!</p>
            {/if}
            
            <div class="mt-8">
                <h3 class="font-bold text-sm text-gray-500 mb-2 font-mono">DEBUG DATA</h3>
                <pre class="text-xs text-gray-600 overflow-x-auto p-2 bg-gray-950 rounded border border-gray-900">{JSON.stringify(entryData, null, 2)}</pre>
            </div>
        </div>

    </form>
</div>
