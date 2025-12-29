<script>
    import { fade, slide } from 'svelte/transition';
    import { enhance } from '$app/forms';
    import { themeStore } from '$lib/stores/theme.js';
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

<div class="min-h-screen transition-colors duration-500 font-serif pt-24 px-4 sm:px-6 lg:px-8 selection:bg-red-500/30 
    {$themeStore === 'dark' ? 'bg-[#0f0f0f] text-white/90' : 'bg-[#f8f8f0] text-black'}">
    
    <div class="max-w-6xl mx-auto">
        <!-- Newspaper Header -->
        <header class="border-b-4 mb-12 pb-4 text-center relative {$themeStore === 'dark' ? 'border-red-900/30' : 'border-black'}">
            <h1 class="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-2 {$themeStore === 'dark' ? 'text-white' : 'text-black'}">
                The <span class="text-red-600">Spiked</span>AI Times
            </h1>
            <div class="flex justify-between border-t border-b py-2 mt-4 text-sm font-bold uppercase tracking-widest {$themeStore === 'dark' ? 'border-red-900/20 text-gray-400' : 'border-black text-black'}">
                <span>Vol. {new Date().getFullYear()}</span>
                <span class="text-red-600">Technology & AI Alpha</span>
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            </div>
        </header>

        <!-- Newsletter Sections (First) - Showcase existing newsletters -->
        <section class="mb-20">
            <div class="flex items-center gap-4 mb-8">
                <span class="h-px flex-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></span>
                <h2 class="text-2xl font-black uppercase tracking-widest italic flex items-center gap-3">
                    <span class="w-2 h-2 bg-red-600 rotate-45"></span>
                    Featured Editions
                    <span class="w-2 h-2 bg-red-600 rotate-45"></span>
                </h2>
                <span class="h-px flex-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></span>
            </div>

            <div class="space-y-6">
                {#each data.newsletters as nl}
                    <a href="/newsletter/{nl.slug}" class="block group">
                        <div class="border-2 p-8 md:p-12 transition-all flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden
                            {$themeStore === 'dark' 
                                ? 'bg-[#1a1a1a] border-red-900/20 shadow-[8px_8px_0px_0px_rgba(153,27,27,0.2)]' 
                                : 'bg-white border-black shadow-[8px_8px_0px_0px_rgba(220,38,38,0.1)]'}
                            hover:shadow-none hover:translate-x-1 hover:translate-y-1 hover:border-red-600/50">
                            
                            <!-- Subtle Red Glow on hover -->
                            <div class="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                            <div class="flex-1 relative z-10">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="w-2 h-2 bg-red-600"></span>
                                    <span class="text-xs font-black uppercase tracking-[0.2em] text-red-600/80">Weekly Intelligence</span>
                                </div>
                                <h3 class="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:text-red-600 transition-colors {$themeStore === 'dark' ? 'text-white' : 'text-black'}">
                                    {nl.title}
                                </h3>
                                <p class="text-xl font-serif italic mt-2 max-w-2xl {$themeStore === 'dark' ? 'text-gray-400' : 'text-gray-700'}">
                                    {nl.description}
                                </p>
                            </div>
                            <div class="flex flex-col items-center md:items-end gap-2 shrink-0 relative z-10">
                                <span class="bg-red-600 px-6 py-2 uppercase tracking-widest text-sm hover:bg-black transition-colors border-2 border-red-600 {$themeStore === 'dark' ? 'text-white' : 'text-black'}">
                                    Read Archive
                                </span>
                                <span class="text-[10px] font-sans font-bold text-gray-500 uppercase tracking-tighter">Updated Weekly</span>
                            </div>
                        </div>
                    </a>
                {:else}
                    <div class="text-center py-12 border-2 border-dashed opacity-30 {$themeStore === 'dark' ? 'border-red-900/30' : 'border-red-600/30'}">
                        <p class="font-serif italic text-red-600/50">No editions published yet.</p>
                    </div>
                {/each}
            </div>
        </section>

        <div class="flex items-center gap-4 mb-12">
            <h2 class="text-2xl font-black uppercase tracking-widest">Latest Bulletins</h2>
            <span class="h-1 flex-1 bg-red-600/10"></span>
        </div>

        {#if data.posts.length === 0}
            <div class="text-center py-20">
                <p class="text-gray-500 italic">No news today. Check back later.</p>
            </div>
        {:else}
            <!-- Featured Section -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 border-b-2 pb-12 {$themeStore === 'dark' ? 'border-red-900/20' : 'border-black'}">
                <!-- Main Feature -->
                {#if data.posts[0]}
                    <article class="md:col-span-8 border-b md:border-b-0 md:border-r md:pr-8 pb-8 md:pb-0 {$themeStore === 'dark' ? 'border-red-900/20' : 'border-black'}">
                        <a href="/blog/{data.posts[0].slug}" class="group block">
                            <span class="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 mb-3 uppercase tracking-wider border border-red-600">Breaking Alpha</span>
                            <h2 class="text-4xl md:text-6xl font-bold leading-tight mb-4 group-hover:text-red-600 transition-colors decoration-4 underline-offset-4 {$themeStore === 'dark' ? 'text-white' : 'text-black'}">
                                {data.posts[0].title}
                            </h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p class="text-lg leading-relaxed font-sans mb-4 {$themeStore === 'dark' ? 'text-gray-400' : 'text-gray-800'}">
                                        {data.posts[0].excerpt || 'Click to read the full story...'}
                                    </p>
                                    <div class="text-sm font-bold uppercase tracking-wide text-red-600/70">
                                        By {data.posts[0].author}
                                    </div>
                                </div>
                                {#if data.posts[0].coverImage}
                                    <div class="aspect-[4/3] grayscale contrast-125 group-hover:grayscale-0 transition duration-500 border-2 p-1 
                                        {$themeStore === 'dark' ? 'bg-[#1a1a1a] border-red-900/30' : 'bg-gray-200 border-red-600/20'} group-hover:border-red-600">
                                        <div class="w-full h-full relative border overflow-hidden {$themeStore === 'dark' ? 'border-red-900/20' : 'border-black'}">
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
                        <article class="border-b border-dashed pb-6 last:border-0 {$themeStore === 'dark' ? 'border-red-900/20' : 'border-red-600/20'}">
                            <a href="/blog/{post.slug}" class="group block">
                                <h3 class="text-xl md:text-2xl font-bold leading-tight mb-2 group-hover:text-red-600 transition-colors {$themeStore === 'dark' ? 'text-white' : 'text-black'}">
                                    {post.title}
                                </h3>
                                <p class="text-sm font-sans line-clamp-3 mb-2 {$themeStore === 'dark' ? 'text-gray-500' : 'text-gray-600'}">
                                    {post.excerpt}
                                </p>
                                <span class="text-xs font-bold uppercase text-red-600/60">
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
                        class="border-4 px-8 py-3 font-bold uppercase tracking-widest transition-all transform hover:scale-105 active:scale-95 
                        {$themeStore === 'dark' 
                            ? 'bg-[#0f0f0f] border-red-600 text-white hover:bg-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]' 
                            : 'bg-red-600 border-black text-white hover:bg-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}"
                    >
                        Access Archives
                    </button>
                </div>
            {/if}

            {#if showAll}
                <div in:fade={{ duration: 600 }} class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 border-b-2 pb-20 {$themeStore === 'dark' ? 'border-red-900/20' : 'border-black'}">
                    {#each remainingPosts as post}
                        <article class="group">
                            <a href="/blog/{post.slug}" class="block">
                                {#if post.coverImage}
                                    <div class="aspect-video grayscale border-2 p-1 mb-4 group-hover:grayscale-0 transition-all group-hover:border-red-600
                                        {$themeStore === 'dark' ? 'bg-[#1a1a1a] border-red-900/20' : 'bg-gray-200 border-red-600/10'}">
                                        <img src={post.coverImage} alt={post.title} class="w-full h-full object-cover border {$themeStore === 'dark' ? 'border-red-900/10' : 'border-black'}" />
                                    </div>
                                {/if}
                                <h3 class="text-2xl font-bold mb-2 group-hover:text-red-600 transition-colors leading-tight {$themeStore === 'dark' ? 'text-white' : 'text-black'}">{post.title}</h3>
                                <p class="text-sm font-sans line-clamp-3 mb-4 {$themeStore === 'dark' ? 'text-gray-500' : 'text-gray-600'}">{post.excerpt}</p>
                                <div class="flex justify-between items-center text-xs font-bold uppercase tracking-widest text-gray-400">
                                    <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                                    <span class="{$themeStore === 'dark' ? 'text-red-900' : 'text-red-600'} group-hover:translate-x-1 transition-transform font-black">Read More →</span>
                                </div>
                            </a>
                        </article>
                    {/each}
                </div>
            {/if}
        {/if}

        <!-- Final Subscribe Section -->
        <section class="mt-24 mb-32 border-4 p-8 md:p-12 relative overflow-hidden {$themeStore === 'dark' ? 'bg-[#1a1a1a] border-red-600/30 shadow-[0_0_50px_rgba(220,38,38,0.1)]' : 'bg-white border-red-600'}">
            <div class="absolute top-0 right-0 w-32 h-32 bg-red-600 text-white flex items-center justify-center rotate-45 translate-x-12 -translate-y-12 font-black text-xl uppercase tracking-tighter shadow-xl">
                Free
            </div>
            
            <div class="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div>
                    <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none {$themeStore === 'dark' ? 'text-white' : 'text-black'}">
                        Join the <span class="bg-red-600 text-white px-2 italic">Inner Circle</span>
                    </h2>
                    <p class="text-xl font-serif italic mb-6 {$themeStore === 'dark' ? 'text-gray-400' : 'text-gray-700'}">
                        Get the weekly digest of AI strategies, revenue hacks, and technology trends delivered straight to your desk.
                    </p>
                    <ul class="space-y-3 font-sans font-bold uppercase text-xs tracking-widest text-gray-500">
                        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-red-600 rounded-full"></span> Exclusive Case Studies</li>
                        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-red-600 rounded-full"></span> Early Access to Tools</li>
                        <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-red-600 rounded-full"></span> Zero Fluff, Max Alpha</li>
                    </ul>
                </div>

                <div class="border-4 p-6 md:p-8 
                    {$themeStore === 'dark' 
                        ? 'bg-[#0f0f0f] border-red-600 shadow-[8px_8px_0px_0px_rgba(220,38,38,0.2)]' 
                        : 'bg-[#f8f8f0] border-black shadow-[8px_8px_0px_0px_rgba(220,38,38,0.5)]'}">
                    {#if isSubscribed}
                        <div in:fade class="text-center py-8">
                            <div class="text-4xl mb-4">📬</div>
                            <h3 class="text-2xl font-black uppercase mb-2 text-red-600">You're on the list!</h3>
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
                                <label for="email" class="block text-xs font-black uppercase tracking-widest text-red-600">Secure Line: Email</label>
                                <input 
                                    id="email"
                                    name="email"
                                    type="email" 
                                    required
                                    placeholder="COLONEL@SPIKED.AI"
                                    class="w-full border-2 p-4 font-sans font-bold focus:outline-none focus:ring-4 focus:ring-red-600/40 transition-all text-lg
                                    {$themeStore === 'dark' ? 'bg-[#1a1a1a] border-red-900/50 text-white' : 'bg-white border-red-600 text-black'}"
                                />
                            </div>
                            
                            <div class="space-y-3">
                                <label for="edition-select" class="block text-xs font-black uppercase tracking-widest text-red-600">Select Intelligence Feeds</label>
                                <div id="edition-select" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {#each data.newsletters as nl}
                                        <label class="flex items-center gap-3 border-2 p-3 cursor-pointer group/label transition-colors has-[:checked]:bg-red-600 has-[:checked]:text-white
                                            {$themeStore === 'dark' ? 'bg-[#1a1a1a] border-red-900/30 hover:bg-red-900/10' : 'bg-white border-red-600/20 hover:bg-red-600/5'}">
                                            <input 
                                                type="checkbox" 
                                                name="newsletterId" 
                                                value={nl._id} 
                                                class="peer hidden"
                                            />
                                            <div class="w-5 h-5 border-2 flex items-center justify-center transition-all
                                                {$themeStore === 'dark' ? 'bg-[#0f0f0f] border-red-900/50 peer-checked:bg-white peer-checked:border-white' : 'bg-white border-red-600 peer-checked:bg-white peer-checked:border-white'}">
                                                <div class="w-2 h-2 scale-0 peer-checked:scale-100 transition-transform {$themeStore === 'dark' ? 'bg-red-600' : 'bg-red-600'}"></div>
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
                                class="w-full text-white py-5 font-black uppercase tracking-widest text-lg bg-red-600 hover:bg-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none border-2 border-red-600"
                            >
                                Dispatch Intel
                            </button>

                            <p class="text-[10px] text-red-600/50 text-center uppercase font-bold tracking-tighter mt-4">
                                NO SPAM. JUST SIGNAL. ALPHA GUARANTEED.
                            </p>
                        </form>
                    {/if}
                </div>
            </div>
            
            <!-- Newspaper-style decorative dots -->
            <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {#each Array(5) as _}
                    <div class="w-1.5 h-1.5 rounded-full bg-red-600/30"></div>
                {/each}
            </div>
        </section>
    </div>
</div>

<style>
    :global(body) {
        margin: 0;
        transition: background-color 0.5s ease;
    }

    /* Override the body background to prevent flashes */
    :global(html.dark body) {
        background-color: #0f0f0f !important;
    }
    :global(html:not(.dark) body) {
        background-color: #f8f8f0 !important;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
