<script>
    import { fade } from 'svelte/transition';
    let { data } = $props();

    function getSummary(postData) {
        if (postData.summary) return postData.summary;
        // Fallback extraction
        for (const val of Object.values(postData)) {
            if (typeof val === 'string' && val.length > 50 && !val.startsWith('data:image')) {
                 return val.slice(0, 200) + '...';
            }
        }
        return '';
    }
</script>

<div class="min-h-screen bg-[#f4f1ea] text-black font-serif pt-24 pb-20 px-4 flex justify-center">
     <div class="w-full max-w-2xl">
        <!-- Newsletter Header -->
        <header class="text-center mb-16 border-b-2 border-black pb-8">
            <h1 class="text-4xl md:text-6xl font-black mb-4 tracking-tight">{data.newsletter.title}</h1>
            <p class="text-xl italic font-serif text-gray-700">{data.newsletter.description}</p>
        </header>

        {#if data.posts.length === 0}
            <div class="text-center py-12 text-gray-500 italic">
                No editions published yet in this section.
            </div>
        {:else}
            <div class="space-y-12">
                {#each data.posts as post}
                    <article class="bg-white border border-black p-6 shadow-md hover:shadow-xl transition-shadow">
                        <div class="flex flex-col md:flex-row gap-6">
                            {#if post.data.coverImage}
                                <div class="w-full md:w-1/3 shrink-0">
                                    <img src={post.data.coverImage} alt={post.data.title} class="w-full h-48 object-cover grayscale contrast-125 border border-black/20" />
                                </div>
                            {/if}
                            <div>
                                <h2 class="text-2xl font-bold mb-2 leading-tight">
                                    <a href="/blog/{post.slug || post.data.slug || post._id}" class="hover:underline decoration-2 underline-offset-2">
                                        {post.data.title || 'Untitled'}
                                    </a>
                                </h2>
                                <time class="text-xs font-sans font-bold uppercase tracking-wider text-gray-500 mb-3 block">
                                    {new Date(post.data.publishedDate || post.createdAt).toLocaleDateString()}
                                </time>
                                <p class="text-gray-800 leading-relaxed">
                                    {getSummary(post.data || {})}
                                </p>
                                <div class="mt-4">
                                     <a href="/blog/{post.slug || post.data.slug || post._id}" class="text-sm font-sans font-bold uppercase tracking-widest hover:bg-black hover:text-white px-2 py-1 transition-colors border border-black inline-block">
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
