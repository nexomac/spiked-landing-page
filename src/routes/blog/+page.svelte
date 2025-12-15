<script>
    let { data } = $props();
</script>

<div class="min-h-screen bg-[#f8f8f0] text-black font-serif pt-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
        <!-- Newspaper Header -->
        <header class="border-b-4 border-black mb-12 pb-4 text-center">
            <h1 class="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-2">The Spiked Times</h1>
            <div class="flex justify-between border-t border-b border-black py-2 mt-4 text-sm font-bold uppercase tracking-widest">
                <span>Vol. {new Date().getFullYear()}</span>
                <span>Voice Technology & AI</span>
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
        </header>

        {#if data.posts.length === 0}
            <div class="text-center py-20">
                <p class="text-gray-500 italic">No news today. Check back later.</p>
            </div>
        {:else}
            <!-- Masonry / Grid Layout for "Newspaper" feel -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
                <!-- Main Feature (First Post) -->
                {#if data.posts[0]}
                    <article class="md:col-span-8 border-b md:border-b-0 md:border-r border-black md:pr-8 pb-8 md:pb-0">
                        <a href="/blog/{data.posts[0].slug}" class="group block">
                            <span class="inline-block bg-black text-white text-xs font-bold px-2 py-1 mb-3 uppercase tracking-wider">Top Story</span>
                            <h2 class="text-4xl md:text-6xl font-bold leading-tight mb-4 group-hover:underline decoration-4 underline-offset-4">
                                {data.posts[0].title}
                            </h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p class="text-lg leading-relaxed font-sans text-gray-800 mb-4">
                                        {data.posts[0].excerpt || 'Click to read the full story...'}
                                    </p>
                                    <div class="text-sm font-bold uppercase tracking-wide text-gray-500">
                                        By {data.posts[0].author || 'Editorial Staff'}
                                    </div>
                                </div>
                                {#if data.posts[0].coverImage}
                                    <div class="aspect-[4/3] bg-gray-200 grayscale contrast-125 group-hover:grayscale-0 transition duration-500 border border-black p-1">
                                        <div class="w-full h-full relative border border-black overflow-hidden">
                                            <img src={data.posts[0].coverImage} alt={data.posts[0].title} class="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </a>
                    </article>
                {/if}

                <!-- Side Column (Next 2-3 Posts) -->
                <div class="md:col-span-4 space-y-8">
                    {#each data.posts.slice(1) as post}
                        <article class="border-b border-black border-dashed pb-6 last:border-0">
                            <a href="/blog/{post.slug}" class="group block">
                                <h3 class="text-xl md:text-2xl font-bold leading-tight mb-2 group-hover:underline">
                                    {post.title}
                                </h3>
                                <p class="text-sm text-gray-600 font-sans line-clamp-3 mb-2">
                                    {post.excerpt}
                                </p>
                                <span class="text-xs font-bold uppercase text-gray-500">
                                    {new Date(post.publishedDate).toLocaleDateString()}
                                </span>
                            </a>
                        </article>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    /* Add specific font imports if needed, otherwise fallback to system serif */
    :global(body) {
        background-color: #f8f8f0;
    }
</style>
