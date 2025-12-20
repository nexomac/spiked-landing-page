<script>
    import { fade, slide } from 'svelte/transition';
    import { enhance } from '$app/forms';
    let { data } = $props();

    let showAll = $state(false);
    let isSubscribed = $state(false);

    const initialPosts = $derived(data.posts.slice(0, 4));
    const remainingPosts = $derived(data.posts.slice(4));

    function handleSubscribe() {
        return async ({ result }) => {
            if (result.type === 'success' || (result.status >= 200 && result.status < 400)) {
                isSubscribed = true;
            }
        };
    }
</script>

<div class="min-h-screen bg-[#f8f8f0] text-black font-serif pt-24 px-4 sm:px-6 lg:px-8 selection:bg-red-200">
    <div class="max-w-6xl mx-auto">
        <!-- Newspaper Header -->
        <header class="border-b-4 border-black mb-12 pb-4 text-center">
            <h1 class="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-2 text-black">The SpikedAI Times</h1>
            <div class="flex justify-between border-t border-b border-black py-2 mt-4 text-sm font-bold uppercase tracking-widest text-black">
                <span>Vol. {new Date().getFullYear()}</span>
                <span>Technology & AI</span>
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
        </header>

        {#if data.posts.length === 0}
            <div class="text-center py-20">
                <p class="text-gray-500 italic">No news today. Check back later.</p>
            </div>
        {:else}
            <!-- Featured Section -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 border-b-2 border-black pb-12">
                <!-- Main Feature -->
                {#if data.posts[0]}
                    <article class="md:col-span-8 border-b md:border-b-0 md:border-r border-black md:pr-8 pb-8 md:pb-0">
                        <a href="/blog/{data.posts[0].slug}" class="group block">
                            <span class="inline-block bg-black text-white text-xs font-bold px-2 py-1 mb-3 uppercase tracking-wider">Top Story</span>
                            <h2 class="text-4xl md:text-6xl font-bold leading-tight mb-4 group-hover:underline decoration-4 underline-offset-4 text-black">
                                {data.posts[0].title}
                            </h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p class="text-lg leading-relaxed font-sans text-gray-800 mb-4">
                                        {data.posts[0].excerpt || 'Click to read the full story...'}
                                    </p>
                                    <div class="text-sm font-bold uppercase tracking-wide text-gray-500">
                                        By {data.posts[0].author}
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

                <!-- Side Column -->
                <div class="md:col-span-4 space-y-8">
                    {#each data.posts.slice(1, 4) as post}
                        <article class="border-b border-black border-dashed pb-6 last:border-0">
                            <a href="/blog/{post.slug}" class="group block">
                                <h3 class="text-xl md:text-2xl font-bold leading-tight mb-2 group-hover:underline text-black">
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

            <!-- "See More" Transition Area -->
            {#if !showAll && data.posts.length > 4}
                <div class="flex justify-center -mt-6 relative z-10">
                    <button 
                        onclick={() => showAll = true}
                        class="bg-[#f8f8f0] border-2 border-black px-8 py-3 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    >
                        Expand the Archives
                    </button>
                </div>
            {/if}

            {#if showAll}
                <div in:fade={{ duration: 600 }} class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 border-b-2 border-black pb-20">
                    {#each remainingPosts as post}
                        <article class="group">
                            <a href="/blog/{post.slug}" class="block">
                                {#if post.coverImage}
                                    <div class="aspect-video bg-gray-200 grayscale border border-black p-1 mb-4 group-hover:grayscale-0 transition-all">
                                        <img src={post.coverImage} alt={post.title} class="w-full h-full object-cover border border-black" />
                                    </div>
                                {/if}
                                <h3 class="text-2xl font-bold mb-2 group-hover:underline leading-tight text-black">{post.title}</h3>
                                <p class="text-sm text-gray-600 font-sans line-clamp-3 mb-4">{post.excerpt}</p>
                                <div class="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                                    <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                                    <span class="text-black group-hover:text-red-600">Read More →</span>
                                </div>
                            </a>
                        </article>
                    {/each}
                </div>
            {/if}
        {/if}

        <!-- Newsletter Section -->
        <section class="mt-24 mb-32 border-4 border-black p-8 md:p-12 bg-white relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-red-600 text-white flex items-center justify-center rotate-45 translate-x-12 -translate-y-12 font-black text-xl uppercase tracking-tighter">
                Free
            </div>
            
            <div class="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                    <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                        Join the <span class="bg-black text-white px-2">Inner Circle</span>
                    </h2>
                    <p class="text-xl font-serif italic text-gray-700 mb-6">
                        Get the weekly digest of AI strategies, revenue hacks, and technology trends delivered straight to your desk.
                    </p>
                    <ul class="space-y-3 font-sans font-bold uppercase text-xs tracking-widest text-gray-500">
                        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-red-600 rounded-full"></span> Exclusive Case Studies</li>
                        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-red-600 rounded-full"></span> Early Access to Tools</li>
                        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-red-600 rounded-full"></span> Zero Fluff, Max Alpha</li>
                    </ul>
                </div>

                <div class="bg-[#f8f8f0] border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    {#if isSubscribed}
                        <div in:fade class="text-center py-8">
                            <div class="text-4xl mb-4">📬</div>
                            <h3 class="text-2xl font-black uppercase mb-2">You're on the list!</h3>
                            <p class="font-serif italic text-gray-600 text-lg">Check your inbox for the next edition.</p>
                        </div>
                    {:else}
                        <form 
                            method="POST" 
                            action="/api/subscribe" 
                            use:enhance={handleSubscribe}
                            class="space-y-4"
                        >
                            <div class="space-y-2">
                                <label for="email" class="block text-xs font-black uppercase tracking-widest">Email Address</label>
                                <input 
                                    id="email"
                                    name="email"
                                    type="email" 
                                    required
                                    placeholder="COLONEL@SPIKED.AI"
                                    class="w-full bg-white border-2 border-black p-4 font-sans font-bold focus:outline-none focus:ring-4 focus:ring-red-600/20 transition-all text-lg"
                                />
                            </div>
                            
                            <div class="space-y-3">
                                <label for="edition-select" class="block text-xs font-black uppercase tracking-widest">Select Your Editions</label>
                                <div id="edition-select" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {#each data.newsletters as nl}
                                        <label class="flex items-center gap-3 bg-white border-2 border-black p-3 cursor-pointer hover:bg-black hover:text-white group/label transition-colors has-[:checked]:bg-black has-[:checked]:text-white">
                                            <input 
                                                type="checkbox" 
                                                name="newsletterId" 
                                                value={nl._id} 
                                                class="peer hidden"
                                            />
                                            <div class="w-5 h-5 border-2 border-black flex items-center justify-center bg-white peer-checked:bg-red-600 peer-checked:border-red-600 transition-all">
                                                <div class="w-2 h-2 bg-white scale-0 peer-checked:scale-100 transition-transform"></div>
                                            </div>
                                            <span class="text-xs font-black uppercase tracking-tight sm:line-clamp-1">{nl.title}</span>
                                        </label>
                                    {:else}
                                        <p class="text-xs text-gray-400 italic">No active editions available.</p>
                                    {/each}
                                </div>
                            </div>

                            <button 
                                type="submit"
                                class="w-full bg-black text-white py-5 font-black uppercase tracking-widest text-lg hover:bg-red-600 transition-colors shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] active:translate-y-1 active:shadow-none"
                            >
                                Dispatch Now
                            </button>

                            <p class="text-[10px] text-gray-400 text-center uppercase font-bold tracking-tighter mt-4">
                                NO SPAM. JUST SIGNAL. UNSUBSCRIBE ANYTIME.
                            </p>
                        </form>
                    {/if}
                </div>
            </div>
            
            <!-- Newspaper-style decorative dots -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {#each Array(5) as _}
                    <div class="w-1.5 h-1.5 rounded-full bg-black/10"></div>
                {/each}
            </div>
        </section>
    </div>
</div>

<style>
    /* Add specific font imports if needed, otherwise fallback to system serif */
    :global(body) {
        background-color: #f8f8f0;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
