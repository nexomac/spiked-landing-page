<script>
  import { fade } from "svelte/transition";
  import { enhance } from "$app/forms";
  import { themeStore } from "$lib/stores/theme.js";

  let { data } = $props();

  const sortedPosts = $derived(
    [...data.posts].sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    ),
  );

  // Grouping logic: 2 featured -> Newsletter -> Rest in pairs
  const featuredPosts = $derived(sortedPosts.slice(0, 2));
  const restPosts = $derived(sortedPosts.slice(2));

  // Helper to chunk the remaining posts into pairs
  const postChunks = $derived(
    restPosts.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / 2);
      if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, [])
  );

  let isSubscribing = $state(false);
  let isSubscribed = $state(false);

  const defaultSummary = "Brief in progress. Expect a concise readout and clear takeaways shortly.";
  const defaultPoints = [
    "Key context and why it matters.",
    "The takeaway for revenue teams.",
    "What to watch next.",
  ];

  function getNewsletterImage(nl) {
    return nl.image || nl.coverImage || nl.heroImage || nl.thumbnail || "/landing/singularrep old.jpeg";
  }

  function handleSubscribe({ formData, cancel }) {
    const newsletters = formData.getAll("newsletterId");
    if (newsletters.length === 0) {
      alert("Please select at least one intelligence feed.");
      cancel();
      return;
    }
    isSubscribing = true;
    return async ({ result }) => {
      if (result.type === "success" || (result.status >= 200 && result.status < 410)) {
        setTimeout(() => {
          isSubscribed = true;
          isSubscribing = false;
        }, 700);
      } else {
        isSubscribing = false;
      }
    };
  }
</script>

<svelte:head>
  <title>Spiked AI | Blog</title>
</svelte:head>

<div class="min-h-screen transition-colors duration-500 font-sans pt-24 pb-24 {$themeStore === 'dark' ? 'bg-black text-white' : 'bg-white text-zinc-900'}">
  <div class="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
    
    <header class="mb-14 lg:mb-20">
      <p class="text-[11px] uppercase tracking-[0.3em] font-semibold text-red-500">Spiked Journal</p>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold mt-3">Latest Insights</h1>
      <p class="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed {$themeStore === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}">
        Revenue intelligence, market motion, and product strategy. Designed to read fast, decide faster.
      </p>
    </header>

    {#snippet blogGrid(posts)}
      <div class="grid md:grid-cols-2 gap-x-12 gap-y-16 py-12 border-b {$themeStore === 'dark' ? 'border-zinc-800' : 'border-zinc-200'} last:border-b-0">
        {#each posts as post}
          {@const points = post.points?.length ? post.points : defaultPoints}
          <article class="group">
            <a href="/blog/{post.slug}" class="block">
              <h2 class="text-2xl sm:text-3xl font-semibold leading-tight group-hover:text-red-500 transition-colors mb-6">
                {post.title}
              </h2>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                <div>
                  <p class="text-sm leading-relaxed mb-4 {$themeStore === 'dark' ? 'text-zinc-300' : 'text-zinc-600'} line-clamp-3">
                    {post.summary || defaultSummary}
                  </p>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-2">
                      <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                      <span class="text-sm leading-tight {$themeStore === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}">{points[0]}</span>
                    </li>
                  </ul>
                </div>
                
                <div class="aspect-[16/10] rounded-2xl overflow-hidden border transition-all duration-700 group-hover:rounded-[1.5rem] {$themeStore === 'dark' ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-50'}">
                  {#if post.coverImage}
                    <img src={post.coverImage} alt={post.title} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {:else}
                    <div class="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-zinc-500">No Visual</div>
                  {/if}
                </div>
              </div>

              <ul class="mt-4 space-y-3">
                {#each points.slice(1, 3) as point}
                  <li class="flex items-start gap-2">
                    <span class="mt-1.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0"></span>
                    <span class="text-sm leading-tight {$themeStore === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}">{point}</span>
                  </li>
                {/each}
              </ul>

              <div class="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-widest {$themeStore === 'dark' ? 'text-zinc-500' : 'text-zinc-300'}">
                <span>{post.author}</span>
                <span class="opacity-30">|</span>
                <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
              </div>
            </a>
          </article>
        {/each}
      </div>
    {/snippet}

    <section>
      {#if sortedPosts.length === 0}
        <div class="text-center py-24 text-zinc-500">No posts yet.</div>
      {:else}
        
        {@render blogGrid(featuredPosts)}

<section class="my-16">
    <div class="grid lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-7">
            <p class="text-[11px] uppercase tracking-[0.3em] text-red-500 font-semibold">
                Newsletter
            </p>
            <h2 class="text-3xl lg:text-5xl font-semibold mt-4 text-white">
                Weekly Revenue Intelligence
            </h2>
            <p class="mt-4 text-base lg:text-lg leading-relaxed text-zinc-400">
                Get the weekly digest of AI strategies, revenue signals, and
                market updates delivered to your inbox.
            </p>
            <p class="mt-3 text-sm leading-relaxed text-zinc-500">
                Expect a concise report, a short signal list, and the one move
                worth making next.
            </p>
        </div>
        <div class="lg:col-span-5">
            <div class="aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950">
                <img
                    src={getNewsletterImage(data.newsletters?.[0] || {})}
                    alt="Newsletter preview"
                    class="w-full h-full object-cover"
										draggable="false"
                />
            </div>
        </div>
    </div>

    <div class="mt-10 grid lg:grid-cols-12 gap-10 items-start border-t pt-10 border-zinc-800">
        <div class="lg:col-span-5">
            <h3 class="text-2xl lg:text-3xl font-semibold text-white">
                Stay ahead of the signal
            </h3>
            <p class="mt-3 text-sm leading-relaxed text-zinc-400">
                Choose the intelligence feeds you want. We send the most
                relevant briefings only.
            </p>
        </div>

        <div class="lg:col-span-7">
            {#if isSubscribed}
                <div in:fade class="py-6">
                    <h3 class="text-2xl font-semibold text-red-500">
                        Subscription Confirmed
                    </h3>
                    <p class="mt-3 text-sm text-zinc-400">
                        Your weekly signal is on the way.
                    </p>
                </div>
            {:else}
                <form
                    method="POST"
                    action="/api/subscribe"
                    use:enhance={handleSubscribe}
                    class="space-y-4"
                >
                    <div class="space-y-2">
                        <label
                            for="email"
                            class="block text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold"
                        >Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="you@company.com"
                            class="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all bg-black border-zinc-700 text-white"
                        />
                    </div>

                    <div class="space-y-3">
                        <label
                            for="edition-select"
                            class="block text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold"
                        >Intelligence Feeds</label>
                        <div
                            id="edition-select"
                            class="grid grid-cols-1 sm:grid-cols-2 gap-2"
                        >
                            {#each data.newsletters.filter((nl) => nl.posts && nl.posts.length > 0) as nl}
                                <label
                                    class="flex items-center gap-3 border rounded-lg px-3 py-2 cursor-pointer transition-colors border-zinc-800 bg-zinc-950 hover:border-red-500/40 text-white"
                                >
                                    <input
                                        type="checkbox"
                                        name="newsletterId"
                                        value={nl._id}
                                        class="h-4 w-4 accent-red-500"
                                    />
                                    <span class="text-xs font-medium">{nl.title}</span>
                                </label>
                            {:else}
                                <p class="text-xs text-zinc-400 italic">
                                    No active editions available.
                                </p>
                            {/each}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubscribing}
                        class="w-full rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] font-semibold transition-colors bg-white text-black hover:bg-red-500 hover:text-white disabled:opacity-60"
                    >
                        {isSubscribing ? "Submitting..." : "Subscribe"}
                    </button>
                </form>
            {/if}
        </div>
    </div>

    <div class="mt-14 pb-10">
        <div class="flex items-center justify-between pb-8 border-b border-zinc-800">
            <h2 class="text-xl sm:text-2xl font-semibold text-white">
                Newsletter Briefings
            </h2>
            <span class="text-xs uppercase tracking-[0.2em] text-zinc-500">Updated Weekly</span>
        </div>

        <div class="space-y-12">
            {#each data.newsletters.filter((nl) => nl.posts && nl.posts.length > 0) as nl}
                <div class="grid lg:grid-cols-12 gap-10 items-center py-8 border-t border-zinc-800 first:border-t-0">
                    <div class="lg:col-span-7">
                        <p class="text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold">
                            Intelligence Feed
                        </p>
                        <h3 class="text-3xl sm:text-4xl font-semibold mt-4 text-white">
                            {nl.title}
                        </h3>
                        <p class="mt-4 text-base leading-relaxed text-zinc-400">
                            {nl.description}
                        </p>
                        <div class="mt-6 flex flex-wrap gap-3">
                            <a
                                href="/newsletter/{nl.slug}"
                                class="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-[0.25em] font-semibold border rounded-full transition-colors border-zinc-700 text-white hover:border-red-500 hover:text-red-400"
                            >
                                View Archive
                            </a>
                        </div>
                        <div class="mt-6 space-y-2">
                            {#each nl.posts.slice(0, 3) as post}
                                <a
                                    href="/blog/{post.slug}"
                                    class="flex items-center justify-between gap-4 text-sm text-zinc-300 hover:text-white"
                                >
                                    <span class="line-clamp-1">{post.title}</span>
                                    <span class="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                                        {new Date(post.publishedDate).toLocaleDateString()}
                                    </span>
                                </a>
                            {/each}
                        </div>
                    </div>
                    <div class="lg:col-span-5">
                        <div class="aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950">
                            <img
                                src={"/landing/cognitiveedge.jpeg"}
                                alt={nl.title}
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            {:else}
                <div class="border rounded-2xl p-8 text-center border-zinc-800 text-zinc-500">
                    No editions live yet.
                </div>
            {/each}
        </div>
    </div>
</section>

        {#each postChunks as chunk}
          {@render blogGrid(chunk)}
        {/each}
      {/if}
    </section>

    <section class="mt-20 border-t pt-10 {$themeStore === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}">
        <h2 class="text-xl sm:text-2xl font-semibold">Explore More</h2>
        <div class="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
             <a href="/features" class="text-xs uppercase tracking-[0.25em] font-semibold py-3 border rounded-full text-center hover:border-red-500 hover:text-red-500 transition-colors">Features</a>
             <a href="/pricing" class="text-xs uppercase tracking-[0.25em] font-semibold py-3 border rounded-full text-center hover:border-red-500 hover:text-red-500 transition-colors">Pricing</a>
             </div>
    </section>
  </div>
</div>

<style>
  :global(body) { margin: 0; }
  .line-clamp-3 {
    display: -webkit-box;
		line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>