<script>
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { 
        ArrowUp, ArrowDown, Trash2, Plus, Save, ArrowLeft,
        Type, AlignLeft, Quote, Hash, Image as ImageIcon, Code, Loader2
    } from 'lucide-svelte';
    import TiptapEditor from '$lib/components/TiptapEditor.svelte';
    
    let { data } = $props();
    let blog = $state(data.blog);
    let newsletters = $state(data.newsletters || []);
    let blocks = $state(blog.content || []);
    let isDirty = $state(false);
    let isSaving = $state(false);

    function addBlock(type) {
        const id = crypto.randomUUID();
        let newBlock = { id, type, data: {} };
        
        switch(type) {
            case 'header': newBlock.data = { text: '', level: 2 }; break;
            case 'text': newBlock.data = { content: '' }; break;
            case 'richtext': newBlock.data = { html: '' }; break;
            case 'quote': newBlock.data = { text: '', author: '' }; break;
            case 'statistics': newBlock.data = { value: '', label: '' }; break;
            case 'image': newBlock.data = { url: '', caption: '' }; break;
            case 'code': newBlock.data = { code: '', language: 'javascript' }; break;
        }
        
        blocks = [...blocks, newBlock];
        isDirty = true;
    }

    function removeBlock(index) {
        blocks = blocks.filter((_, i) => i !== index);
        isDirty = true;
    }

    function moveBlock(index, direction) {
        if (direction === 'up' && index > 0) {
            const temp = blocks[index];
            blocks[index] = blocks[index - 1];
            blocks[index - 1] = temp;
            blocks = [...blocks];
            isDirty = true;
        } else if (direction === 'down' && index < blocks.length - 1) {
            const temp = blocks[index];
            blocks[index] = blocks[index + 1];
            blocks[index + 1] = temp;
            blocks = [...blocks];
            isDirty = true;
        }
    }

    function updateBlockData(index, key, value) {
        blocks[index].data[key] = value;
        blocks = [...blocks];
        isDirty = true;
    }

    function toggleNewsletter(id, checked) {
        if (!blog.newsletterIds) blog.newsletterIds = [];
        if (checked) {
            if (!blog.newsletterIds.includes(id)) {
                blog.newsletterIds = [...blog.newsletterIds, id];
            }
        } else {
            blog.newsletterIds = blog.newsletterIds.filter(nid => nid !== id);
        }
        isDirty = true;
    }

    async function generateBlog() {
        const prompt = window.prompt("Enter a topic or outline for the blog:");
        if (!prompt) return;
        
        // Show loading state could be nice, but simple alert or button state change is enough for MVP
        const btn = document.getElementById('ai-btn');
        if(btn) btn.disabled = true;
        
        try {
            const res = await fetch('/admin/api/generate', {
                method: 'POST',
                body: JSON.stringify({ modelSlug: 'blog', prompt }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            
            if (data.success && data.blocks) {
                blocks = [...blocks, ...data.blocks];
                isDirty = true;
            } else {
                alert('Failed to generate: ' + (data.error || 'Unknown error'));
            }
        } catch (e) {
            alert('Error: ' + e.message);
        } finally {
            if(btn) btn.disabled = false;
        }
    }

    // Form submission handling
    let jsonData = $state('');
    
    function prepareSave({ formData }) {
        isSaving = true;
        const savePayload = {
            ...blog,
            content: blocks
        };
        // Ensure the formData has the latest data
        formData.set('data', JSON.stringify(savePayload));
        
        return async ({ result }) => {
            if (result.type === 'success') {
                await new Promise(r => setTimeout(r, 800));
                await invalidateAll();
                isDirty = false;
            }
            isSaving = false;
        };
    }
</script>

<!-- Full Page Saving Overlay -->
{#if isSaving}
    <div class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center">
        <Loader2 class="w-12 h-12 text-indigo-500 animate-spin mb-4" />
        <h2 class="text-xl font-bold text-white">Saving Changes...</h2>
        <p class="text-gray-400 text-sm mt-2">Updating the matrix</p>
    </div>
{/if}

<div class="min-h-screen bg-black text-white pt-24 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-4xl mx-auto">
        <!-- Header / Meta Controls -->
        <header class="mb-10">
            <!-- Top Bar: Navigation & Actions -->
            <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-800">
                <a href="/admin" class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition group">
                    <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Admin
                </a>

                <form action="?/save" method="POST" use:enhance={prepareSave} class="flex items-center gap-3">
                    <input type="hidden" name="data" value="{jsonData}" />
                    
                    <select 
                        bind:value={blog.status} 
                        onchange={() => isDirty = true}
                        class="bg-gray-900 border border-gray-800 text-xs rounded px-3 py-2 text-gray-400 focus:ring-1 focus:ring-indigo-500"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>

                    <button 
                        class="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        disabled={!isDirty && !isSaving}
                    >
                        {#if isSaving}
                            <Loader2 class="w-4 h-4 animate-spin" />
                            Saving...
                        {:else}
                            <Save class="w-4 h-4" />
                            Save
                        {/if}
                    </button>
                </form>
            </div>

            <!-- AI Toolbar -->
            <div class="mb-8">
                <button 
                    id="ai-btn"
                    onclick={generateBlog}
                    type="button" 
                    class="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border border-indigo-500/30 text-indigo-200 rounded-lg hover:bg-indigo-900/30 hover:border-indigo-500/50 transition font-medium"
                >
                    <span class="text-xl">✨</span> 
                    <span>Generate Blog with AI</span>
                </button>
            </div>

            <!-- Meta Fields -->
            <div class="space-y-6">
                <!-- Title -->
                <div>
                    <label class="block text-sm font-medium text-gray-400 mb-2" for="blog-title">Title</label>
                    <input 
                        type="text" 
                        id="blog-title"
                        bind:value={blog.title} 
                        oninput={() => isDirty = true}
                        class="w-full bg-transparent text-4xl font-bold border-b border-gray-800 focus:border-indigo-500 focus:outline-none pb-2 placeholder-gray-700 transition"
                        placeholder="Enter blog title..." 
                    />
                </div>

                <!-- Row 1: Slug & Author -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-mono text-gray-500 mb-1" for="blog-slug">Slug</label>
                        <input 
                            type="text" 
                            id="blog-slug"
                            bind:value={blog.slug}
                             oninput={() => isDirty = true}
                            class="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm font-mono text-gray-300 focus:ring-1 focus:ring-indigo-500" 
                        />
                    </div>
                    <div>
                        <label class="block text-xs font-mono text-gray-500 mb-1" for="blog-author">Author</label>
                        <input 
                            type="text" 
                            id="blog-author"
                            bind:value={blog.author}
                             oninput={() => isDirty = true}
                            class="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-gray-300 focus:ring-1 focus:ring-indigo-500" 
                        />
                    </div>
                </div>

                <!-- Row 2: Date & Newsletters -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                     <div>
                        <label class="block text-xs font-mono text-gray-500 mb-1" for="blog-date">Published Date</label>
                        <input 
                            type="datetime-local" 
                            id="blog-date"
                            bind:value={blog.publishedDate}
                             oninput={() => isDirty = true}
                            class="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-gray-300 focus:ring-1 focus:ring-indigo-500" 
                        />
                        
                        <!-- Cover Image below Date -->
                         <div class="mt-6">
                            <label class="block text-xs font-mono text-gray-500 mb-1" for="blog-cover">Cover Image</label>
                            <input 
                                type="text" 
                                id="blog-cover"
                                bind:value={blog.coverImage} 
                                oninput={() => isDirty = true}
                                class="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-gray-300 mb-2 focus:ring-1 focus:ring-indigo-500"
                                placeholder="https://..."
                            />
                            <div class="flex items-center gap-4">
                                <label class="cursor-pointer bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded text-xs text-indigo-300 transition flex items-center gap-2">
                                    <span>Upload</span>
                                    <input type="file" accept="image/*" class="hidden" onchange={(e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;
                                        const reader = new FileReader();
                                        reader.onload = (evt) => {
                                            blog.coverImage = evt.target.result;
                                            isDirty = true;
                                        };
                                        reader.readAsDataURL(file);
                                    }} /> 
                                </label>
                                {#if blog.coverImage}
                                    <span class="text-xs text-green-500 flex items-center gap-1">✓ Set</span>
                                {/if}
                            </div>
                            {#if blog.coverImage}
                                <div class="mt-2 w-full h-32 bg-black/40 rounded-lg overflow-hidden border border-gray-800">
                                    <img src={blog.coverImage} alt="Cover" class="w-full h-full object-cover opacity-80" />
                                </div>
                            {/if}
                        </div>
                    </div>

                     <div>
                        <div class="block text-xs font-mono text-gray-500 mb-1">Newsletters</div>
                        <div class="bg-gray-900/50 border border-gray-800 rounded-lg p-3 max-h-[250px] overflow-y-auto space-y-1">
                            {#each newsletters as newsletter}
                                <label class="flex items-start gap-3 p-2 hover:bg-white/5 rounded cursor-pointer transition select-none">
                                    <input 
                                        type="checkbox" 
                                        value={newsletter._id} 
                                        checked={blog.newsletterIds ? blog.newsletterIds.includes(newsletter._id) : false} 
                                        onchange={e => toggleNewsletter(newsletter._id, e.target.checked)} 
                                        class="mt-0.5 rounded border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-gray-900" 
                                    />
                                    <div>
                                        <span class="block text-sm text-gray-300 font-medium">{newsletter.title}</span>
                                        {#if newsletter.description}
                                            <span class="block text-xs text-gray-600 line-clamp-1">{newsletter.description}</span>
                                        {/if}
                                    </div>
                                </label>
                            {/each}
                            {#if newsletters.length === 0}
                                <p class="text-xs text-gray-600 italic p-2">No newsletters available.</p>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Block Editor Area -->
        <div class="space-y-6 min-h-[500px]">
            {#each blocks as block, index (block.id)}
                <div class="group relative bg-gray-900/50 border border-gray-800 rounded-xl p-6 transition hover:border-gray-700">
                    <!-- Block Controls -->
                    <div class="absolute right-4 top-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-200">
                        <button onclick={() => moveBlock(index, 'up')} disabled={index === 0} class="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded disabled:opacity-30">
                            <ArrowUp class="w-4 h-4" />
                        </button>
                        <button onclick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1} class="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded disabled:opacity-30">
                            <ArrowDown class="w-4 h-4" />
                        </button>
                        <div class="w-px h-4 bg-gray-800 mx-1"></div>
                        <button onclick={() => removeBlock(index)} class="p-1.5 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded">
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>

                    <!-- Block Labels -->
                    <div class="absolute -top-3 left-4 px-2 bg-gray-950 border border-gray-800 text-[10px] uppercase font-bold tracking-wider text-gray-500 rounded-full">
                        {block.type}
                    </div>

                    <!-- Dynamic Inputs -->
                    <div class="mt-2">
                        {#if block.type === 'header'}
                            <div class="flex items-center gap-2 mb-2">
                                <select 
                                    value={block.data.level} 
                                    onchange={(e) => updateBlockData(index, 'level', parseInt(e.target.value))}
                                    class="bg-gray-800 border-none rounded text-sm p-1"
                                >
                                    <option value={1}>H1</option>
                                    <option value={2}>H2</option>
                                    <option value={3}>H3</option>
                                </select>
                            </div>
                            <input 
                                type="text" 
                                value={block.data.text} 
                                oninput={(e) => updateBlockData(index, 'text', e.target.value)}
                                class="w-full bg-transparent border-b border-gray-700 focus:border-indigo-500 focus:outline-none p-2 text-xl font-bold placeholder-gray-600"
                                placeholder="Header Text"
                            />
                        
                        {:else if block.type === 'text'}
                            <textarea
                                value={block.data.content}
                                oninput={(e) => updateBlockData(index, 'content', e.target.value)}
                                class="w-full bg-transparent border-none focus:ring-0 p-0 text-gray-300 leading-relaxed resize-none h-auto min-h-[100px]"
                                placeholder="Type your text here..."
                            ></textarea>

                        {:else if block.type === 'richtext'}
                            <div class="rounded-lg overflow-hidden">
                                <TiptapEditor 
                                    value={block.data.html} 
                                    onChange={(json) => {
                                        updateBlockData(index, 'html', json);
                                    }}
                                />
                            </div>

                        {:else if block.type === 'quote'}
                            <div class="pl-4 border-l-4 border-indigo-500 space-y-3">
                                <textarea
                                    value={block.data.text}
                                    oninput={(e) => updateBlockData(index, 'text', e.target.value)}
                                    class="w-full bg-transparent border-none focus:ring-0 p-0 text-lg italic text-gray-300 resize-none"
                                    placeholder="Quote text..."
                                ></textarea>
                                <input 
                                    type="text" 
                                    value={block.data.author} 
                                    oninput={(e) => updateBlockData(index, 'author', e.target.value)}
                                    class="w-full bg-transparent border-none focus:ring-0 p-0 text-sm font-bold text-gray-500"
                                    placeholder="- Author Name"
                                />
                            </div>

                        {:else if block.type === 'statistics'}
                            <div class="flex items-center gap-6 p-4 bg-gray-800/30 rounded-lg">
                                <div class="flex-1">
                                    <label class="text-xs text-gray-500" for="stats-value-{index}">Value</label>
                                    <input 
                                        type="text" 
                                        id="stats-value-{index}"
                                        value={block.data.value} 
                                        oninput={(e) => updateBlockData(index, 'value', e.target.value)}
                                        class="w-full bg-transparent text-4xl font-bold text-indigo-400 border-none focus:ring-0 p-0"
                                        placeholder="50%"
                                    />
                                </div>
                                <div class="flex-[2]">
                                    <label class="text-xs text-gray-500" for="stats-label-{index}">Label</label>
                                    <input 
                                        type="text" 
                                        id="stats-label-{index}"
                                        value={block.data.label} 
                                        oninput={(e) => updateBlockData(index, 'label', e.target.value)}
                                        class="w-full bg-transparent text-xl font-medium text-white border-none focus:ring-0 p-0"
                                        placeholder="Growth Rate"
                                    />
                                </div>
                            </div>
                        {:else if block.type === 'image'}
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-xs font-mono text-gray-500 mb-1" for="img-url-{index}">Image URL</label>
                                    <input 
                                        type="text" 
                                        id="img-url-{index}"
                                        value={block.data.url} 
                                        oninput={(e) => updateBlockData(index, 'url', e.target.value)}
                                        class="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-sm text-gray-300"
                                        placeholder="https://..."
                                    />
                                    <p class="text-[10px] text-gray-600 mt-1">Paste a direct image link (e.g. from existing DB upload or external)</p>
                                    <label class="inline-block mt-2 cursor-pointer bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-xs text-indigo-400 transition">
                                        Upload from PC
                                        <input type="file" accept="image/*" class="hidden" onchange={(e) => {
                                            const file = e.target.files[0];
                                            if (!file) return;
                                            const reader = new FileReader();
                                            reader.onload = (evt) => {
                                                updateBlockData(index, 'url', evt.target.result);
                                            };
                                            reader.readAsDataURL(file);
                                        }} />
                                    </label>
                                </div>
                                {#if block.data.url}
                                    <div class="relative w-full h-48 bg-black/20 rounded overflow-hidden flex items-center justify-center border border-gray-800 border-dashed">
                                        <img src={block.data.url} alt="Preview" class="max-h-full max-w-full object-contain" onerror={(e) => e.currentTarget.style.display='none'} />
                                    </div>
                                {/if}
                                <div>
                                    <label class="block text-xs font-mono text-gray-500 mb-1" for="img-cap-{index}">Caption</label>
                                    <input 
                                        type="text" 
                                        id="img-cap-{index}"
                                        value={block.data.caption} 
                                        oninput={(e) => updateBlockData(index, 'caption', e.target.value)}
                                        class="w-full bg-transparent border-b border-gray-800 focus:border-indigo-500 rounded-none px-0 py-1 text-sm text-gray-400 italic"
                                        placeholder="Optional caption..."
                                    />
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>

        <!-- Add Block Buttons -->
        <div class="mt-12 border-t border-gray-800 pt-8">
            <h3 class="text-sm font-medium text-gray-500 mb-4">Add Content Block</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                <button onclick={() => addBlock('header')} class="flex flex-col items-center justify-center gap-2 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-800 transition">
                    <Type class="w-5 h-5 text-indigo-400" />
                    <span class="text-xs font-medium">Header</span>
                </button>
                <button onclick={() => addBlock('text')} class="flex flex-col items-center justify-center gap-2 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-800 transition">
                    <AlignLeft class="w-5 h-5 text-emerald-400" />
                    <span class="text-xs font-medium">Text</span>
                </button>
                <button onclick={() => addBlock('richtext')} class="flex flex-col items-center justify-center gap-2 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-800 transition">
                    <Code class="w-5 h-5 text-orange-400" />
                    <span class="text-xs font-medium">RichText</span>
                </button>
                <button onclick={() => addBlock('quote')} class="flex flex-col items-center justify-center gap-2 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-800 transition">
                    <Quote class="w-5 h-5 text-pink-400" />
                    <span class="text-xs font-medium">Quote</span>
                </button>
                <button onclick={() => addBlock('statistics')} class="flex flex-col items-center justify-center gap-2 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-800 transition">
                    <Hash class="w-5 h-5 text-cyan-400" />
                    <span class="text-xs font-medium">Statistic</span>
                </button>
                <button onclick={() => addBlock('image')} class="flex flex-col items-center justify-center gap-2 p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 hover:bg-gray-800 transition">
                    <ImageIcon class="w-5 h-5 text-purple-400" />
                    <span class="text-xs font-medium">Image</span>
                </button>
            </div>
        </div>
    </div>
</div>
