<script>
    import { enhance } from '$app/forms';
    import { Send, Clock, Trash2, CheckCircle, Edit3, RefreshCw, Layers, FileText, Globe, MessageSquare, Image, Sparkles } from 'lucide-svelte';
    import TweetPreview from './TweetPreview.svelte';
    import PublishModal from './PublishModal.svelte';
    
    let { data, form } = $props();
    
    let activeTab = $state('draft');
    let editingId = $state(null);
    let editContent = $state('');
    
    // Publishing State
    let publishingItem = $state(null);

    // Pre-fill content if generation was successful
    let draftContent = $state(form?.generatedContent || '');
    let selectedBlog = $state(form?.context?.blogSlug || '');
    let sourceUrl = $state(form?.context?.sourceUrl || '');
    
    // Update state when form updates (e.g. after generation)
    $effect(() => {
        if (form?.generatedContent) {
            draftContent = form.generatedContent;
        }
        if (form?.context) {
            selectedBlog = form.context.blogSlug || '';
            sourceUrl = form.context.sourceUrl || '';
        }
    });

    function startEdit(item) {
        editingId = item._id;
        editContent = item.content;
    }

    function cancelEdit() {
        editingId = null;
        editContent = '';
    }
</script>

<div class="min-h-screen bg-black text-white pt-24 px-4 pb-12 font-sans">
    <div class="max-w-6xl mx-auto space-y-8">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold tracking-tight mb-2">Social Manager</h1>
                <p class="text-gray-400 text-sm">Automate and manage your X presence.</p>
            </div>
            
            <div class="flex gap-2 bg-gray-900/50 p-1 rounded-lg border border-gray-800">
                <button 
                    class={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'draft' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    onclick={() => activeTab = 'draft'}
                >
                    Draft & AI
                </button>
                <button 
                    class={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'queue' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    onclick={() => activeTab = 'queue'}
                >
                    Queue 
                    {#if data.queue.length > 0}
                        <span class="ml-2 bg-indigo-500/20 px-1.5 py-0.5 rounded-full text-xs">{data.queue.length}</span>
                    {/if}
                </button>
                <button 
                    class={`px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'history' ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    onclick={() => activeTab = 'history'}
                >
                    History
                </button>
            </div>
        </div>

        {#if form?.error}
            <div class="bg-red-900/20 border border-red-800 text-red-200 px-4 py-3 rounded-lg text-sm">
                {form.error}
            </div>
        {/if}

        <!-- TAB: DRAFT -->
        {#if activeTab === 'draft'}
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Input Column -->
                <div class="lg:col-span-2 space-y-6">
                    <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <h2 class="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FileText class="w-5 h-5 text-indigo-400" />
                            Content Input
                        </h2>
                        
                        <form action="?/addToQueue" method="POST" use:enhance class="space-y-4" enctype="multipart/form-data">
                            <!-- Context Inputs -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-400 mb-1" for="blogSlug">From Blog (Optional)</label>
                                    <select 
                                        name="blogSlug" 
                                        id="blogSlug" 
                                        bind:value={selectedBlog}
                                        class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition text-white"
                                    >
                                        <option value="">Select a blog...</option>
                                        {#each data.blogs as blog}
                                            <option value={blog.slug}>{blog.title}</option>
                                        {/each}
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-400 mb-1" for="sourceUrl">Source URL (Optional)</label>
                                    <div class="relative">
                                        <Globe class="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                        <input 
                                            type="url" 
                                            name="sourceUrl" 
                                            id="sourceUrl"
                                            bind:value={sourceUrl}
                                            placeholder="https://..." 
                                            class="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-indigo-500 transition text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-400 mb-1">
                                    Reference Image (Optional)
                                    <div class="relative mt-1">
                                        <input 
                                            type="file" 
                                            name="image" 
                                            id="image"
                                            accept="image/*"
                                            class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:bg-gray-800 file:text-indigo-400 hover:file:bg-gray-700 text-sm text-gray-400"
                                        />
                                        <Image class="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                                    </div>
                                </label>
                            </div>
                            
                            <div>
                                <label class="block text-sm font-medium text-gray-400 mb-1" for="content">Draft Content / Prompt</label>
                                <textarea 
                                    name="content" 
                                    id="content"
                                    bind:value={draftContent}
                                    rows="6"
                                    class="w-full bg-gray-950 border border-gray-800 rounded-lg p-4 focus:outline-none focus:border-indigo-500 transition text-white resize-none"
                                    placeholder="Write your post here OR enter a prompt for AI..."
                                ></textarea>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-gray-400 mb-1" for="scheduledFor">Schedule For (Optional)</label>
                                <input 
                                    type="datetime-local" 
                                    name="scheduledFor" 
                                    id="scheduledFor"
                                    class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition text-white"
                                />
                            </div>

                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-400 mb-1" for="type">Output Type</label>
                                    <select name="type" id="type" class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition text-white">
                                        <option value="single">Single Post</option>
                                        <option value="thread">Thread</option>
                                        <option value="quote">Quote / Commentary</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-400 mb-1" for="tone">Tone</label>
                                    <select name="tone" id="tone" class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 focus:outline-none focus:border-indigo-500 transition text-white">
                                        <option value="neutral">Neutral / Informative</option>
                                        <option value="opinionated">Opinionated</option>
                                        <option value="analytical">Analytical</option>
                                        <option value="viral">Engaging / Viral</option>
                                    </select>
                                </div>
                            </div>

                            <div class="pt-4 flex justify-between items-center border-t border-gray-800 mt-6">
                                <button 
                                    type="submit" 
                                    formaction="?/generate"
                                    class="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 px-4 py-2 rounded-lg transition text-sm font-medium hover:bg-indigo-900/20"
                                >
                                    <Sparkles class="w-4 h-4" />
                                    Generate Draft
                                </button>

                                <button type="submit" class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg transition font-medium shadow-lg shadow-indigo-900/20">
                                    <Layers class="w-4 h-4" />
                                    Add to Queue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Preview/Tips Column -->
                <div class="space-y-6">
                    <div class="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <h3 class="text-lg font-semibold mb-4 text-gray-200">Quick Tips</h3>
                        <ul class="space-y-3 text-sm text-gray-400">
                            <li class="flex gap-2">
                                <span class="text-indigo-400">•</span>
                                Use 'Thread' for long-form content breakdown.
                            </li>
                            <li class="flex gap-2">
                                <span class="text-indigo-400">•</span>
                                Links are automatically moved to the end or last tweet.
                            </li>
                            <li class="flex gap-2">
                                <span class="text-indigo-400">•</span>
                                'Analytical' tone is best for data-heavy inputs.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        {/if}

        <!-- TAB: QUEUE -->
        {#if activeTab === 'queue'}
            <div class="space-y-6">
                {#each data.queue as item}
                    <div class="flex gap-4 items-start group">
                        <!-- Action Side Panel -->
                        <div class="flex flex-col gap-2 pt-2">
                            {#if item.status !== 'approved'}
                                <!-- Open Publish Modal instead of direct approve -->
                                <button 
                                    onclick={() => publishingItem = item}
                                    title="Approve & Publish" 
                                    disabled={item.content.length > 280}
                                    class="p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-900/20 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    <CheckCircle class="w-5 h-5" />
                                </button>
                            {/if}
                            
                            <button onclick={() => startEdit(item)} title="Edit" class="p-2 text-gray-400 hover:text-indigo-400 hover:bg-indigo-900/20 rounded-lg transition">
                                <Edit3 class="w-5 h-5" />
                            </button>

                            <form action="?/delete" method="POST" use:enhance>
                                <input type="hidden" name="id" value={item._id} />
                                <button title="Delete" class="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition">
                                    <Trash2 class="w-5 h-5" />
                                </button>
                            </form>
                        </div>

                        <!-- Main Content Card -->
                        <div class="flex-1 min-w-0">
                            {#if editingId === item._id}
                                <div class="bg-gray-900 border border-gray-800 rounded-xl p-4">
                                    <form action="?/update" method="POST" use:enhance={() => {
                                        return async ({ result }) => {
                                            if (result.type === 'success') {
                                                cancelEdit();
                                            }
                                        };
                                    }}>
                                        <input type="hidden" name="id" value={item._id} />
                                        <textarea 
                                            name="content"
                                            rows="4"
                                            class="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-sm text-white focus:border-indigo-500 focus:outline-none mb-4"
                                            bind:value={editContent}
                                        ></textarea>
                                        
                                        <div class="flex flex-wrap gap-4 items-end justify-between">
                                            <div class="w-64">
                                                <label class="text-xs text-gray-500 block mb-1">
                                                    Reschedule
                                                    <input 
                                                        type="datetime-local" 
                                                        name="scheduledFor" 
                                                        value={item.scheduledFor ? new Date(item.scheduledFor).toISOString().slice(0, 16) : ''}
                                                        class="w-full mt-1 bg-gray-950 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                                                    />
                                                </label>
                                            </div>

                                            <div class="flex gap-2 text-sm">
                                                <button type="button" onclick={cancelEdit} class="px-4 py-2 text-gray-400 hover:text-white transition">Cancel</button>
                                                <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition">Save Changes</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            {:else}
                                <TweetPreview 
                                    content={item.content}
                                    type={item.type}
                                    status={item.status}
                                    scheduledFor={item.scheduledFor}
                                    author={item.author}
                                    sourceType={item.sourceType}
                                    sourceUrl={item.sourceUrl}
                                    blogSlug={item.blogSlug}
                                />
                            {/if}
                        </div>
                    </div>
                {/each}
                
                {#if data.queue.length === 0}
                     <div class="py-16 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl bg-gray-900/30">
                        <Layers class="w-12 h-12 mx-auto text-gray-700 mb-4" />
                        <p class="text-lg font-medium text-gray-400">Queue is empty</p>
                        <p class="text-sm">Add some content from the Draft tab to get started.</p>
                    </div>
                {/if}
            </div>
        {/if}
        
        <!-- TAB: HISTORY -->
        {#if activeTab === 'history'}
             <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-950 border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500 font-medium">
                            <th class="p-4">Published At</th>
                            <th class="p-4">Content</th>
                            <th class="p-4">Type</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-800">
                        {#each data.history as item}
                            <tr>
                                <td class="p-4 text-sm text-gray-400">
                                    {new Date(item.publishedAt).toLocaleString()}
                                </td>
                                <td class="p-4 text-sm text-gray-300">
                                    {item.content.slice(0, 100)}...
                                </td>
                                <td class="p-4 text-sm text-gray-500">
                                    {item.type}
                                </td>
                            </tr>
                        {/each}
                        {#if data.history.length === 0}
                            <tr>
                                <td colspan="3" class="p-12 text-center text-gray-500">
                                    No history yet.
                                </td>
                            </tr>
                        {/if}
                    </tbody>
                </table>
             </div>
        {/if}

    </div>
</div>

{#if publishingItem}
    <PublishModal 
        item={publishingItem} 
        onClose={() => publishingItem = null} 
    />
{/if}
