<script>
    import { fade } from 'svelte/transition';
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

<!-- Force light-mode feel for newsletters -->
<div class="min-h-screen bg-[#f4f1ea] text-black font-serif pt-24 pb-20 px-4 flex justify-center selection:bg-red-200">
     <div class="w-full max-w-2xl">
        <!-- Newsletter Header -->
        <header class="text-center mb-16 border-b-2 border-black pb-8">
            <div class="flex items-center justify-start mb-8">
                <a href="/blog" class="text-xs font-sans font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors flex items-center gap-1 group">
                    <span class="group-hover:-translate-x-1 transition-transform">←</span>
                    Back to Bulletin
                </a>
            </div>
            <h1 class="text-4xl md:text-6xl font-black mb-4 tracking-tight text-black">{data.newsletter.title}</h1>
            <p class="text-xl italic font-serif text-gray-700">{data.newsletter.description}</p>
        </header>

        {#if data.posts.length === 0}
            <div class="text-center py-12 text-gray-500 italic">
                No editions published yet in this section.
            </div>
        {:else}
            <div class="space-y-12">
                {#each data.posts as post}
                    <article class="bg-white border border-black p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                        <div class="flex flex-col md:flex-row gap-6">
                            {#if post.coverImage}
                                <div class="w-full md:w-1/3 shrink-0">
                                    <img 
                                        src={post.coverImage} 
                                        alt={post.title} 
                                        class="w-full h-48 object-cover grayscale contrast-125 border border-black/20" 
                                    />
                                </div>
                            {/if}
                            <div class="flex-1">
                                <h2 class="text-2xl font-bold mb-2 leading-tight">
                                    <a href="/blog/{post.slug || post.data.slug || post._id}" class="hover:underline decoration-2 underline-offset-2 text-black">
                                        {post.data.title || post.data.Title || 'Untitled'}
                                    </a>
                                </h2>
                                <time class="text-xs font-sans font-bold uppercase tracking-wider text-gray-500 mb-3 block">
                                    {new Date(post.data.publishedDate || post.data['date-of-analysis'] || post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                </time>
                                <p class="text-gray-800 leading-relaxed font-serif">
                                    {getSummary(post.data || {})}
                                </p>
                                <div class="mt-6">
                                     <a href="/blog/{post.slug || post.data.slug || post._id}" class="text-sm font-sans font-bold uppercase tracking-widest bg-white hover:bg-black hover:text-white px-4 py-2 transition-all border-2 border-black inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                                        Read Full Article
                                     </a>
                                </div>
                            </div>
                        </div>
                    </article>
                {/each}
            </div>
        {/if}
     </div>
</div>

<style>
    /* Ensure no dark mode overrides leaky from global */
    :global(body) {
        background-color: #f4f1ea !important;
    }
</style>
