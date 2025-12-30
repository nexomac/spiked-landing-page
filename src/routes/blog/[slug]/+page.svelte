<script>
    import { generateHTML } from '@tiptap/html';
    import StarterKit from '@tiptap/starter-kit';
    import Image from '@tiptap/extension-image';
    import Link from '@tiptap/extension-link';
    import ShareButton from '$lib/components/ShareButton.svelte';
    import VoicePlayer from '$lib/components/VoicePlayer.svelte';
    import { themeStore } from '$lib/stores/theme.js';

    import { page } from '$app/stores';

    let { data } = $props();
    let layoutVersion = $derived($page.url.searchParams.get('version') || 'v1');

    // Helper to generate HTML for a specific field data
    function getFieldHtml(fieldData) {
        try {
            if (fieldData && typeof fieldData === 'object' && fieldData.type === 'doc') {
                return generateHTML(fieldData, [
                    StarterKit,
                    Image,
                    Link
                ]);
            }
            return '';
        } catch (e) {
            console.error(e);
            return '';
        }
    }

    function extractTextFromTiptap(node) {
        if (node.type === 'text') return node.text;
        if (node.content) {
            return node.content.map(child => extractTextFromTiptap(child)).join(' ');
        }
        return '';
    }
    
    // Format date format: "Friday, December 12, 2025"
    let formattedDate = $derived(new Date(data.post.publishedDate || data.post.createdAt).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    }));

    const { Slug, ...rest } = data.post.data || {};

    // Calculate reading time
    let readingTime = $derived.by(() => {
        let textContent = '';
        if (data.post.data) {
            for (const [key, value] of Object.entries(data.post.data)) {
                 if (['title', 'slug', 'status', 'coverImage', 'author', 'publishedDate'].includes(key)) continue;

                 if (value && typeof value === 'object' && value.type === 'doc') {
                    textContent += extractTextFromTiptap(value) + ' ';
                 } else if (typeof value === 'string' && !value.startsWith('data:image')) {
                    textContent += value + ' ';
                 }
            }
        }
        if (!textContent.trim()) textContent = "Short read";
        const words = textContent.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / 200); // 200 wpm average
        return `${minutes} min read`;
    });

    // Masonry Layout Logic: Prepare blocks
    let contentBlocks = $derived.by(() => {
        const blocks = [];
        const ignoredKeys = ['title', 'slug', 'status', 'coverImage', 'author', 'publishedDate', 'publishDate', 'publish_date', 'published_date', 'date', 'newsletters', 'Cover Image', 'Featured Image', 'FeaturedImage', 'featured-image', 'Image', 'image', 'Thumbnail', 'thumbnail'];
        
        const isIgnored = (k) => ignoredKeys.some(ignored => k.toLowerCase() === ignored.toLowerCase());
        const processed = new Set();
        
        // 1. Model Fields
        if (data.modelFields) {
            for (const field of data.modelFields) {
               const val = data.post.data[field.slug] || data.post.data[field.name];
               if (val && !isIgnored(field.slug || field.name)) {
                   blocks.push({
                       id: `field-${field.slug || field.name}`,
                       type: field.type,
                       value: val,
                       name: field.name,
                       slug: field.slug
                   });
                   processed.add(field.slug);
                   if (field.name) processed.add(field.name);
               }
            }
        }
        
        // 2. Fallbacks
        if (data.post.data) {
            for (const [k, v] of Object.entries(data.post.data)) {
                if (!processed.has(k) && !isIgnored(k) && typeof v === 'string' && v.length > 0) {
                     blocks.push({
                         id: `fallback-${k}`,
                         type: 'string_fallback',
                         value: v,
                         name: k
                     });
                }
            }
        }
        return blocks;
    });

    // Split for v2
    let leftCol = $derived(contentBlocks.slice(0, Math.ceil(contentBlocks.length / 2)));
    let rightCol = $derived(contentBlocks.slice(Math.ceil(contentBlocks.length / 2)));
</script>

{#snippet renderBlock(block)}
     {#if block.type === 'richtext'}
        <div class="mb-10 theme-prose-colors">
            {@html getFieldHtml(block.value)}
        </div>
     {:else if block.type === 'image' || (typeof block.value === 'string' && (block.value.startsWith('data:image') || block.value.match(/\.(jpeg|jpg|gif|png|webp)$/i)))}
        <div class="mb-10 border-2 p-1 transition-colors
            {$themeStore === 'dark' ? 'bg-[#0f0f0f] border-red-900/30' : 'bg-gray-100 border-black'}">
            <img src={block.value} alt={block.name} class="w-full h-auto grayscale contrast-125 block hover:grayscale-0 transition-all" />
        </div>
     {:else if block.type === 'quote'}
        <div class="my-12 px-8 py-8 border-y-2 text-center transition-colors
            {$themeStore === 'dark' ? 'border-red-900/30' : 'border-black'}">
            <p class="text-3xl md:text-4xl font-black italic leading-tight transition-colors
                {$themeStore === 'dark' ? 'text-red-500' : 'text-black'}">
                "{block.value}"
            </p>
        </div>
     {:else if block.type === 'highlight'}
        <div class="my-10 p-8 shadow-[12px_12px_0px_0px_rgba(220,38,38,1)] transition-colors
            {$themeStore === 'dark' ? 'bg-red-950/20 border-l-4 border-red-600' : 'bg-black text-white'}">
            <p class="font-sans font-bold uppercase tracking-widest text-xs mb-3 text-red-600">Intelligence Brief</p>
            <p class="text-2xl font-bold leading-snug">
                {block.value}
            </p>
        </div>
     {:else if block.type === 'callout'}
        <div class="my-8 p-6 border-2 border-dashed transition-colors
            {$themeStore === 'dark' ? 'border-red-900/40 bg-red-900/5' : 'border-black bg-gray-50'}">
            <div class="flex items-start gap-4">
                <span class="text-4xl">📢</span>
                <p class="text-xl font-medium italic">{block.value}</p>
            </div>
        </div>
     {:else if block.type === 'link'}
        <div class="mb-8 font-sans">
            <a href={block.value} target="_blank" class="group inline-flex items-center gap-2 text-xl font-bold border-b-4 border-red-600 hover:bg-red-600 hover:text-white transition-all px-2 py-1">
                <span class="group-hover:text-white">
                    {block.value.replace(/^https?:\/\//, '')}
                </span>
                <span class="group-hover:text-white">↗</span>
            </a>
        </div>
     {:else if block.type === 'statistic'}
        {@const [statLabel, statVal] = (block.value || '').split('|')}
        <div class="my-10 flex flex-col items-center gap-4 p-8 border transition-colors text-center
            {$themeStore === 'dark' ? 'border-red-900/30 bg-[#0a0a0a]' : 'border-black bg-gray-50'}">
            <div class="w-32 h-32 shrink-0 relative flex items-center justify-center">
                <svg viewBox="0 0 32 32" class="w-full h-full rotate-[-90deg]">
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="currentColor" stroke-width="32" stroke-dasharray="100 100" class="opacity-10" />
                    <circle r="16" cx="16" cy="16" fill="transparent" stroke="#dc2626" stroke-width="32" stroke-dasharray="{parseFloat(statVal) || 75} 100" />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center text-xl font-black">{statVal || ''}</div>
            </div>
            <div class="text-sm font-sans font-bold uppercase tracking-widest opacity-60">{statLabel || 'Metric'}</div>
        </div>
     {:else if block.type === 'divider'}
        <div class="my-12 flex justify-center items-center gap-4">
            <div class="h-0.5 flex-1 bg-red-600/30"></div>
            <div class="text-red-600 rotate-45 text-xs">◆</div>
            <div class="h-0.5 flex-1 bg-red-600/30"></div>
        </div>
     {:else if block.type === 'string_fallback' || typeof block.value === 'string'}
         <p class="mb-6 font-serif text-xl leading-relaxed">{block.value}</p>
     {/if}
{/snippet}

<!-- Outer background -->
<div class="min-h-screen transition-colors duration-500 font-serif pt-24 pb-20 px-4 flex justify-center selection:bg-red-500/30 
    {$themeStore === 'dark' ? 'bg-[#0f0f0f] text-white/90' : 'bg-[#f8f8f0] text-black'}">
    
    <!-- Render Based on Version -->
    {#if layoutVersion === 'v3'}
        <!-- v3: San Francisco Chronicle Style -->
        <article class="w-full max-w-6xl mx-auto">
            <!-- Header: Left aligned, massive -->
            <header class="mb-12 border-b-2 pb-8 {$themeStore === 'dark' ? 'border-red-900/20' : 'border-black'}">
                <div class="mb-4 text-xs font-sans font-bold uppercase tracking-widest text-[#dc2626]">
                    The Bulletin / v3
                </div>
                <h1 class="text-5xl md:text-7xl font-bold leading-tight mb-6 font-serif tracking-tight max-w-4xl
                    {$themeStore === 'dark' ? 'text-white' : 'text-black'}">
                    {data.post.title || data.post.data?.Title || data.post.data?.title}
                </h1>
                
                <div class="flex items-center gap-6 font-sans text-sm font-medium
                    {$themeStore === 'dark' ? 'text-gray-400' : 'text-gray-600'}">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                             <!-- Placeholder avatar if no author image -->
                             <div class="w-full h-full bg-[#dc2626] flex items-center justify-center text-white font-bold">
                                {(data.post.author || 'ES').substring(0,2)}
                             </div>
                        </div>
                        <div>
                            <span class="block text-xs uppercase tracking-wider opacity-70">By</span>
                            <span class="font-bold text-[#dc2626]">
                                {data.post.author || data.post.data?.Author || 'Editorial Staff'}
                            </span>
                        </div>
                    </div>
                    <div class="h-8 w-px bg-current opacity-20"></div>
                    <div>
                         <span class="block text-xs uppercase tracking-wider opacity-70">Published</span>
                         {formattedDate}
                    </div>
                    <div class="h-8 w-px bg-current opacity-20"></div>
                    <div>
                         {readingTime}
                    </div>
                </div>
            </header>

            <!-- Hero Image -->
             {#if data.post.coverImage || data.post.data?.coverImage || data.post.data?.['Cover Image']}
                <div class="mb-16 w-full relative">
                    <img 
                        src={data.post.coverImage || data.post.data?.coverImage || data.post.data?.['Cover Image']} 
                        alt={data.post.title} 
                        class="w-full h-auto max-h-[70vh] object-cover object-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700" 
                    />
                    <div class="absolute bottom-4 right-4 text-xs bg-black/50 text-white px-2 py-1 backdrop-blur-sm rounded">
                        Staff Illustration
                    </div>
                </div>
            {/if}

            <!-- Layout: Main Column + Rail (Optional rail space, but centered for now like many sub-pages) -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div class="lg:col-span-8 lg:col-start-3">
                     <div class="prose prose-xl prose-serif max-w-none leading-relaxed text-justify tiptap-content transition-colors
                        {$themeStore === 'dark' ? 'text-white/90' : 'text-gray-900'}">
                        <!-- Dropcap handled by CSS -->
                        {#each contentBlocks as block (block.id)}
                            {@render renderBlock(block)}
                        {/each}
                     </div>
                     
                    <!-- End Mark -->
                    <div class="flex justify-center mt-12 mb-8">
                        <div class="text-3xl transition-colors font-bold tracking-widest opacity-50">###</div>
                    </div>
                </div>
            </div>
        </article>
    {:else}
        <!-- v1 (Strip) & v2 (Split Column in Strip) share the 'Strip' container -->
        <!-- The "Vertical Newspaper Strip" Container - WIDENED to max-w-3xl for text, but container is max-w-5xl -->
        <article class="w-full max-w-5xl border-x shadow-2xl min-h-[80vh] flex flex-col items-center transition-colors duration-500
            {$themeStore === 'dark' ? 'bg-[#1a1a1a] border-red-900/20' : 'bg-white border-black/10'}">
            
            <!-- Strip Header / Metaline -->
            <header class="w-full border-b mb-8 px-8 pt-8 pb-4 text-center transition-colors
                {$themeStore === 'dark' ? 'border-red-900/30' : 'border-black'}">
                
                <nav class="flex justify-between items-center text-xs font-sans font-bold uppercase tracking-widest mb-6 border-b pb-2
                    {$themeStore === 'dark' ? 'border-red-900/10 text-red-600/60' : 'border-black/5 text-gray-500'}">
                    <a href="/blog" class="flex items-center gap-1 transition-colors group {$themeStore === 'dark' ? 'hover:text-red-500' : 'hover:text-black'}">
                        <span class="group-hover:-translate-x-1 transition-transform">←</span>
                        The Bulletin
                    </a>
                    <span class="hidden md:block transition-colors {$themeStore === 'dark' ? 'text-gray-500' : 'text-gray-400'}">
                        The SpikedAI Times {layoutVersion === 'v2' ? '(v2)' : ''}
                    </span>
                    <span class="flex items-center gap-2">
                        {formattedDate} 
                        <span class="opacity-30">/</span> 
                        {readingTime}
                    </span>
                    <span class="hidden sm:block">Vol. {new Date().getFullYear()}</span>
                </nav>
                
                <h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 font-serif transition-colors
                    {$themeStore === 'dark' ? 'text-white' : 'text-black'}">
                    {data.post.title || data.post.data?.Title || data.post.data?.title}
                </h1>

                <div class="flex flex-col items-center justify-center gap-4 font-sans text-sm font-bold border-t pt-4 w-full px-4
                    {$themeStore === 'dark' ? 'border-red-900/10 text-gray-500' : 'border-black/10 text-gray-600'}">
                    <span class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-red-600 rotate-45"></span>
                        By {data.post.author || data.post.data?.Author || data.post.data?.author || 'Editorial Staff'}
                        <span class="w-1.5 h-1.5 bg-red-600 rotate-45"></span>
                    </span>
                    
                    <div class="flex items-center gap-4">
                        <VoicePlayer content={rest || {}} />
                        <ShareButton 
                            title={data.post.title}
                            text={`Read "${data.post.title}" on SpikedAI.`}
                        />
                    </div>
                </div>
            </header>

            <!-- Main Content Column -->
            <div class="w-full px-8 md:px-16 pb-12 transition-colors {$themeStore === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}">
                <!-- Optional Cover Image -->
                {#if data.post.coverImage || data.post.data?.coverImage || data.post.data?.['Cover Image']}
                    <div class="mb-8 border-2 p-1 transition-colors
                        {$themeStore === 'dark' ? 'bg-[#0f0f0f] border-red-900/30' : 'bg-gray-100 border-black'}">
                        <img 
                            src={data.post.coverImage || data.post.data?.coverImage || data.post.data?.['Cover Image']} 
                            alt={data.post.title} 
                            class="w-full h-auto grayscale contrast-125 block hover:grayscale-0 transition-all duration-700" 
                        />
                        <div class="text-[10px] font-sans uppercase tracking-wide mt-1 text-right px-1 opacity-40">Article Doc. Ref.</div>
                    </div>
                {/if}

                <!-- Text Content -->
                <div class="text-justify tiptap-content prose prose-lg prose-serif max-w-none transition-colors
                     {$themeStore === 'dark' ? 'text-white/80' : 'text-black'}
                     {layoutVersion === 'v2' ? 'grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0' : ''}">
                     
                     {#if layoutVersion === 'v2'}
                         <div class="flex flex-col gap-0">
                             {#each leftCol as block (block.id)}
                                <div class="break-inside-avoid">
                                    {@render renderBlock(block)}
                                </div>
                             {/each}
                         </div>

                         <div class="flex flex-col gap-0 md:pl-2">
                             {#each rightCol as block (block.id)}
                                 <div class="break-inside-avoid">
                                     {@render renderBlock(block)}
                                 </div>
                             {/each}
                         </div>
                     {:else}
                         <!-- v1: Original Linear Layout -->
                         {#each contentBlocks as block (block.id)}
                             {@render renderBlock(block)}
                         {/each}
                     {/if}
                </div>

                <!-- End Mark -->
                <div class="flex justify-center mt-12 mb-8">
                    <div class="text-2xl transition-colors {$themeStore === 'dark' ? 'text-red-900' : 'text-black'}">❦</div>
                </div>
            </div>
            
        </article>
    {/if}
</div>

<style>
    /* Custom Typography Tweaks for the 'Sherwood' feel */
    :global(.tiptap-content p) {
        margin-bottom: 2em;
        text-indent: 0;
    }
    /* Specific selector to target ONLY top-level paragraphs, not lists or others */
    :global(.tiptap-content > p:first-of-type::first-letter) {
        float: left;
        font-size: 4em;
        line-height: 0.8;
        font-weight: bold;
        margin-right: 0.15em;
        margin-top: 0.05em;
        color: #dc2626; /* Spiked Red Dropcap */
        font-family: serif;
    }
    :global(.theme-dark .tiptap-content p) {
        color: rgba(255, 255, 255, 0.8);
    }
    
    /* Headers: Smaller and more elegant as requested */
    :global(.tiptap-content h2) {
        font-family: sans-serif;
        text-transform: uppercase;
        font-size: 1.1em;
        font-weight: 900;
        letter-spacing: 0.15em;
        border-bottom: 2px solid #dc2626; /* Red border for headers */
        padding-bottom: 0.3em;
        margin-top: 3em;
        margin-bottom: 1.5em;
        color: inherit;
        display: inline-block;
    }

    :global(.tiptap-content h3) {
        font-family: sans-serif;
        text-transform: uppercase;
        font-size: 0.9em;
        font-weight: 700;
        letter-spacing: 0.1em;
        margin-top: 2.5em;
        margin-bottom: 1em;
        color: #dc2626;
    }

    /* Fix Bold Text in Dark Mode */
    :global(html.dark .tiptap-content strong),
    :global(html.dark .tiptap-content b) {
        color: inherit;
    }

    :global(.tiptap-content blockquote) {
        border-left: 6px solid #dc2626;
        padding-left: 1.5em;
        font-style: italic;
        font-weight: 700;
        background: rgba(220, 38, 38, 0.03);
        padding: 2em;
        margin: 3em 0;
        font-size: 1.25em;
        color: inherit; /* Respect parent color */
    }

    :global(.theme-dark .tiptap-content blockquote) {
        background: rgba(220, 38, 38, 0.07);
        color: rgba(255, 255, 255, 0.9) !important;
    }

    :global(.tiptap-content a) {
        color: #dc2626;
        text-decoration: underline;
        text-underline-offset: 4px;
        font-weight: bold;
    }

    :global(.tiptap-content ul) {
        list-style-type: none;
        padding-left: 0;
        margin-bottom: 2em;
    }
    :global(.tiptap-content li) {
        position: relative;
        padding-left: 1.5em;
        margin-bottom: 0.5em;
    }
    :global(.tiptap-content li::before) {
        content: "◆";
        position: absolute;
        left: 0;
        color: #dc2626;
        font-size: 0.8em;
        top: 0.2em;
    }

    /* Handle prose colors in dark mode better than default Tailwind prose */
    .theme-prose-colors :global(p), 
    .theme-prose-colors :global(li) {
        color: inherit;
    }

    :global(body) {
        transition: background-color 0.5s ease;
    }

    :global(html.dark body) {
        background-color: #0f0f0f !important;
    }
    :global(html:not(.dark) body) {
        background-color: #f8f8f0 !important;
    }
</style>
