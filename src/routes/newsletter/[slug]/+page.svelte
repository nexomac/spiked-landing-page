<script>
    import { fade } from 'svelte/transition';
    import { themeStore } from '$lib/stores/theme.js';
    import Footer from '$lib/components/Footer.svelte';
    let { data } = $props();

    function extractTextFromTiptap(node) {
        if (!node) return '';
        if (node.type === 'text') return node.text;
        if (node.content) {
            return node.content.map(child => extractTextFromTiptap(child)).join(' ');
        }
        return '';
    }

    function getSummary(postData) {
        const summaryField = postData.summary || postData.Summary || postData['trend-category'] || postData['Trend Category'];
        
        if (summaryField && typeof summaryField === 'object' && summaryField.type === 'doc') {
            return extractTextFromTiptap(summaryField).slice(0, 200) + '...';
        }
        
        if (typeof summaryField === 'string') return summaryField.slice(0, 200) + '...';

        // Fallback extraction from any large text field
        for (const val of Object.values(postData)) {
            if (val && typeof val === 'object' && val.type === 'doc') {
                const text = extractTextFromTiptap(val);
                if (text.length > 50) return text.slice(0, 200) + '...';
            }
            if (typeof val === 'string' && val.length > 50 && !val.startsWith('data:image')) {
                 return val.slice(0, 200) + '...';
            }
        }
        return '';
    }
</script>

<div class="min-h-screen transition-colors duration-500 font-serif pt-24 pb-20 px-4 flex justify-center selection:bg-red-500/30 
    {$themeStore === 'dark' ? 'bg-[#0f0f0f] text-white/90' : 'bg-[#f4f1ea] text-black'}">
    
     <div class="w-full max-w-5xl">
        <!-- Newsletter Header -->
        <header class="text-center mb-16 border-b-4 pb-8 transition-colors max-w-3xl mx-auto
            {$themeStore === 'dark' ? 'border-red-900/30' : 'border-black'}">
            
            <nav class="flex items-center justify-start mb-8">
                <a href="/blog" class="text-xs font-sans font-bold uppercase tracking-widest transition-colors flex items-center gap-1 group
                    {$themeStore === 'dark' ? 'text-red-600/60 hover:text-red-500' : 'text-gray-500 hover:text-black'}">
                    <span class="group-hover:-translate-x-1 transition-transform">←</span>
                    Research and News
                </a>
            </nav>
            
            <h1 class="text-4xl md:text-6xl font-black mb-4 tracking-tight transition-colors uppercase">
                The <span class="text-red-600">Spiked</span>AI {data.newsletter.title}
            </h1>
            <p class="text-xl italic font-serif transition-colors
                {$themeStore === 'dark' ? 'text-gray-400' : 'text-gray-700'}">
                {data.newsletter.description}
            </p>
        </header>

        {#if data.posts.length === 0}
            <div class="text-center py-12 text-gray-500 italic border-2 border-dashed
                {$themeStore === 'dark' ? 'border-red-900/20' : 'border-black/10'}">
                No editions published yet in this section.
            </div>
        {:else}
            <div class="space-y-12">
                {#each data.posts as post}
                    <article class="transition-all p-6 relative overflow-hidden group
                        {$themeStore === 'dark' 
                            ? 'bg-[#1a1a1a] border-2 border-red-900/20 shadow-[8px_8px_0px_0px_rgba(153,27,27,0.2)]' 
                            : 'bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(220,38,38,0.1)]'}
                        hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:border-red-600 transition-all duration-300">
                        
                        <!-- Subtle Red Glow on hover -->
                        <div class="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                        <div class="flex flex-col md:flex-row gap-6 relative z-10">
                            {#if post.coverImage}
                                <div class="w-full md:w-1/3 shrink-0">
                                    <div class="border-2 p-1 transition-colors
                                        {$themeStore === 'dark' ? 'bg-[#0f0f0f] border-red-900/30' : 'bg-gray-100 border-black'}">
                                        <img 
                                            src={post.coverImage} 
                                            alt={post.title} 
                                            class="w-full h-48 object-cover grayscale contrast-125 transition-all group-hover:grayscale-0 duration-700" 
                                        />
                                    </div>
                                </div>
                            {/if}
                            <div class="flex-1">
                                <h2 class="text-2xl font-bold mb-2 leading-tight">
                                    <a href="/blog/{post.slug || post.data?.slug || post._id}" class="hover:text-red-600 transition-colors">
                                        {post.title || post.data?.title || post.data?.Title || 'Untitled'}
                                    </a>
                                </h2>
                                <time class="text-xs font-sans font-bold uppercase tracking-wider mb-3 block text-red-600/60">
                                    {new Date(post.publishedDate || post.data?.publishedDate || post.data?.['date-of-analysis'] || post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                </time>
                                <p class="leading-relaxed font-serif transition-colors
                                    {$themeStore === 'dark' ? 'text-gray-400' : 'text-gray-800'}">
                                    {post.excerpt || getSummary(post.data || {})}
                                </p>
                                <div class="mt-6">
                                     <a href="/blog/{post.slug || post.data?.slug || post._id}" 
                                        class="text-sm font-sans font-black uppercase tracking-widest px-6 py-2 transition-all inline-block border-2
                                        {$themeStore === 'dark' 
                                            ? 'bg-red-600 text-white border-red-600 hover:bg-white hover:text-black' 
                                            : 'bg-black text-white border-black hover:bg-red-600 hover:border-red-600'}">
                                        Read Analysis →
                                     </a>
                                </div>
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        {/if}
        
        <div class="flex justify-center mt-20 opacity-30">
            <span class="w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent"></span>
        </div>
     </div>
</div>

<style>
    :global(body) {
        transition: background-color 0.5s ease;
    }

    /* Override the body background to prevent flashes */
    :global(html.dark body) {
        background-color: #0f0f0f !important;
    }
    :global(html:not(.dark) body) {
        background-color: #f8f8f0 !important;
    }
</style>
