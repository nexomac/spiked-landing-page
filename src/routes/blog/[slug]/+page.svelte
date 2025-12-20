<script>
    import { generateHTML } from '@tiptap/html';
    import StarterKit from '@tiptap/starter-kit';
    import Image from '@tiptap/extension-image';
    import Link from '@tiptap/extension-link';
    import ShareButton from '$lib/components/ShareButton.svelte';
    import VoicePlayer from '$lib/components/VoicePlayer.svelte';

    let { data } = $props();

    // Helper to generate HTML for a specific field data
    function getFieldHtml(fieldData) {
        try {
            if (fieldData && typeof fieldData === 'object' && fieldData.type === 'doc') {
                return generateHTML(fieldData, [
                    StarterKit,
                    Image
                    // Link removed to check if it fixes duplicate warning
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
    
    // Format date format: "December 12, 2025"
    let formattedDate = $derived(new Date(data.post.publishedDate || data.post.createdAt).toLocaleDateString('en-US', {
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
</script>

<!-- Outer background: Distinct from content to create "strip" effect -->
<div class="min-h-screen bg-[#f4f1ea] text-black font-serif pt-24 pb-20 px-4 flex justify-center selection:bg-red-200">
    
    <!-- The "Vertical Newspaper Strip" Container -->
    <article class="w-full max-w-2xl bg-white border-x border-black/10 shadow-xl min-h-[80vh] flex flex-col items-center">
        
        <!-- Strip Header / Metaline -->
        <header class="w-full border-b border-black mb-8 px-8 pt-8 pb-4 text-center">
            <div class="flex justify-between items-center text-xs font-sans font-bold uppercase tracking-widest text-gray-500 mb-6 border-b border-black/5 pb-2">
                <a href="/blog" class="flex items-center gap-1 hover:text-black transition-colors group">
                    <span class="group-hover:-translate-x-1 transition-transform">←</span>
                    Return to Bulletin
                </a>
                <span class="hidden md:block">The SpikedAI Times</span>
                <span class="flex items-center gap-2">
                    {formattedDate} 
                    <span class="text-black/30">•</span> 
                    {readingTime}
                </span>
                <span class="hidden sm:block">Vol. {new Date().getFullYear()}</span>
            </div>
            
            <h1 class="text-4xl md:text-5xl font-black leading-tight mb-6 font-serif text-black">
                {data.post.title || data.post.data?.Title || data.post.data?.title}
            </h1>

            <div class="flex flex-col items-center justify-center gap-4 font-sans text-sm font-bold border-t border-black/10 pt-4 w-full px-4 text-gray-600">
                <span>By {data.post.author || data.post.data?.Author || 'Editorial Staff'}</span>
                
                <div class="flex items-center gap-4">
                    <VoicePlayer content={rest || {}} />
                    <ShareButton 
                        title={data.post.title}
                        text={`Read "${data.post.title}" on Spiked.`}
                    />
                </div>
            </div>
        </header>

        <!-- Main Content Column -->
        <div class="w-full px-8 md:px-12 pb-12 bg-white">
            <!-- Optional Cover Image -->
            {#if data.post.coverImage}
                <div class="mb-8 border border-black p-1 bg-gray-100">
                    <img 
                        src={data.post.coverImage} 
                        alt={data.post.title} 
                        class="w-full h-auto grayscale contrast-125 block" 
                    />
                    <div class="text-[10px] font-sans text-gray-500 uppercase tracking-wide mt-1 text-right px-1">Img. Ref 01</div>
                </div>
            {/if}

            <!-- Text Content -->
            <!-- Using restricted prose width and justified text for newspaper feel -->
            <div class="prose prose-lg prose-serif max-w-none text-black leading-relaxed text-justify tiptap-content">
                {#each Object.entries(data.post.data || {}) as [key, value]}
                    {#if !['title', 'slug', 'status', 'coverImage', 'author', 'publishedDate', 'newsletters', 'Cover Image', 'Featured Image', 'FeaturedImage', 'featured-image', 'Image', 'image', 'Thumbnail', 'thumbnail'].some(k => key.toLowerCase() === k.toLowerCase())}
                        <!-- Tiptap Doc -->
                        {#if value && typeof value === 'object' && value.type === 'doc'}
                            <div class="mb-4">
                                {@html getFieldHtml(value)}
                            </div>
                        <!-- Base64 or URL Image -->
                        {:else if typeof value === 'string' && (value.startsWith('data:image') || value.match(/\.(jpeg|jpg|gif|png|webp)$/i))}
                            <div class="mb-8 border border-black p-1 bg-gray-100">
                                <img src={value} alt={key} class="w-full h-auto grayscale contrast-125 block" />
                            </div>
                        <!-- Plain Text -->
                        {:else if typeof value === 'string' && value.length > 0}
                            <p class="mb-4 font-serif text-lg">{value}</p>
                        {/if}
                    {/if}
                {/each}
            </div>

            <!-- End Mark -->
            <div class="flex justify-center mt-12 mb-8">
                <div class="text-2xl text-black">❦</div>
            </div>
        </div>
        
    </article>
</div>

<style>
    /* Custom Typography Tweaks for the 'Sherwood' feel */
    :global(.tiptap-content p) {
        margin-bottom: 1.5em;
        text-indent: 0; /* Or 1.5em for classic indented paragraphs */
    }
    :global(.tiptap-content p:first-of-type::first-letter) {
        float: left;
        font-size: 3.5em;
        line-height: 0.8;
        font-weight: bold;
        margin-right: 0.1em;
        margin-top: -0.05em;
    }
    :global(.tiptap-content h2) {
        font-family: sans-serif;
        text-transform: uppercase;
        font-size: 1.1em;
        letter-spacing: 0.05em;
        border-bottom: 2px solid black;
        padding-bottom: 0.2em;
        margin-top: 2em;
    }
    :global(.tiptap-content blockquote) {
        border-left: 4px solid black;
        padding-left: 1em;
        font-style: italic;
        font-weight: bold;
        background: #f8f8f8;
        padding: 1em;
        margin: 2em 0;
    }
</style>
