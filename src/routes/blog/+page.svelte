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

	const postGroups = $derived(
		sortedPosts.reduce((groups, post, index) => {
			if (index % 3 === 0) groups.push([]);
			groups[groups.length - 1].push(post);
			return groups;
		}, []),
	);
	const firstGroup = $derived(postGroups[0] || []);
	const remainingGroups = $derived(postGroups.slice(1));

	let isSubscribing = $state(false);
	let isSubscribed = $state(false);

	const defaultSummary =
		"Brief in progress. Expect a concise readout and clear takeaways shortly.";
	const defaultPoints = [
		"Key context and why it matters.",
		"The takeaway for revenue teams.",
		"What to watch next.",
	];

	function getNewsletterImage(nl) {
		return (
			nl.image ||
			nl.coverImage ||
			nl.heroImage ||
			nl.thumbnail ||
			nl.imageUrl ||
			nl["image-url"] ||
			"/landing/cognitiveedge.jpeg"
		);
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
			if (
				result.type === "success" ||
				(result.status >= 200 && result.status < 410)
			) {
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

<div
	class="min-h-screen transition-colors duration-500 font-sans pt-24 pb-24
	{$themeStore === 'dark' ? 'bg-black text-white' : 'bg-white text-zinc-900'}"
>
	<div class="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
		<header class="mb-14 lg:mb-20">
			<p
				class="text-[11px] uppercase tracking-[0.3em] font-semibold text-red-500"
			>
				Spiked Journal
			</p>
			<h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold mt-3">
				Latest Insights
			</h1>
			<p
				class="mt-4 max-w-2xl text-base sm:text-lg leading-relaxed {$themeStore ===
				'dark'
					? 'text-zinc-400'
					: 'text-zinc-600'}"
			>
				Revenue intelligence, market motion, and product strategy. Designed to
				read fast, decide faster.
			</p>
			<div
				class="mt-8 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.3em] {$themeStore ===
				'dark'
					? 'text-zinc-500'
					: 'text-zinc-400'}"
			>
				<span>New drop every week</span>
				<span class="hidden sm:inline">|</span>
				<span>Signals, not noise</span>
				<span class="hidden sm:inline">|</span>
				<span>Built for revenue teams</span>
			</div>
		</header>

		<section class="space-y-16">
			{#if sortedPosts.length === 0}
				<div class="text-center py-24 text-zinc-500">
					No posts yet. Check back soon.
				</div>
			{:else}
				{#if firstGroup.length > 0}
					<div
						class="grid lg:grid-cols-12 gap-10 pb-16 {$themeStore === 'dark'
						? 'border-b border-zinc-800'
						: 'border-b border-zinc-200'}"
					>
						{#if firstGroup[0]}
							<article class="lg:col-span-8">
								<a href="/blog/{firstGroup[0].slug}" class="group block">
									<div class="grid lg:grid-cols-12 gap-8 items-center">
										<div class="lg:col-span-7">
											<p
												class="text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold"
											>
												Spotlight
											</p>
											<h2
												class="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 leading-tight group-hover:text-red-500 transition-colors"
											>
												{firstGroup[0].title}
											</h2>
											<p
												class="mt-4 text-base sm:text-lg leading-relaxed {$themeStore ===
												'dark'
													? 'text-zinc-400'
													: 'text-zinc-600'}"
											>
												{firstGroup[0].summary || defaultSummary}
											</p>
											<ul class="mt-6 space-y-3">
												{#each (firstGroup[0].points && firstGroup[0].points.length
													? firstGroup[0].points
													: defaultPoints
												).slice(0, 3) as point}
													<li class="flex items-start gap-3">
														<span
															class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500"
														></span>
														<span
															class="text-sm leading-relaxed {$themeStore ===
															'dark'
																? 'text-zinc-300'
																: 'text-zinc-600'}"
														>
															{point}
														</span>
													</li>
												{/each}
											</ul>
											<div
												class="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] {$themeStore ===
												'dark'
													? 'text-zinc-500'
													: 'text-zinc-400'}"
											>
												<span>{firstGroup[0].author}</span>
												<span>|</span>
												<span
													>{new Date(firstGroup[0].publishedDate).toLocaleDateString()}</span
												>
											</div>
										</div>
										<div class="lg:col-span-5">
											<div
												class="aspect-[4/3] rounded-2xl overflow-hidden border {$themeStore ===
												'dark'
													? 'border-zinc-800 bg-zinc-950'
													: 'border-zinc-200 bg-zinc-100'}"
											>
												{#if firstGroup[0].coverImage}
													<img
														src={firstGroup[0].coverImage}
														alt={firstGroup[0].title}
														class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
													/>
												{:else}
													<div
														class="w-full h-full flex items-center justify-center text-xs uppercase tracking-[0.3em] {$themeStore ===
														'dark'
															? 'text-zinc-600'
															: 'text-zinc-500'}"
													>
														No image
													</div>
												{/if}
											</div>
										</div>
									</div>
								</a>
							</article>
						{/if}

						<div class="lg:col-span-4 space-y-10">
							{#each firstGroup.slice(1, 3) as post}
								<article
									class="border-b pb-8 {$themeStore === 'dark'
									? 'border-zinc-800'
									: 'border-zinc-200'} last:border-b-0 last:pb-0"
								>
									<a href="/blog/{post.slug}" class="group block">
										<div class="grid grid-cols-12 gap-6 items-center">
											<div class="col-span-7">
												<h3
													class="text-xl font-semibold leading-snug group-hover:text-red-500 transition-colors"
												>
													{post.title}
												</h3>
												<p
													class="mt-3 text-sm leading-relaxed {$themeStore ===
													'dark'
														? 'text-zinc-400'
														: 'text-zinc-600'}"
												>
													{post.summary || defaultSummary}
												</p>
												<ul class="mt-4 space-y-2">
													{#each (post.points && post.points.length
														? post.points
														: defaultPoints
													).slice(0, 2) as point}
														<li class="flex items-start gap-2">
															<span
																class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500"
															></span>
															<span
																class="text-[12px] leading-relaxed {$themeStore ===
																'dark'
																	? 'text-zinc-300'
																	: 'text-zinc-500'}"
															>
																{point}
															</span>
														</li>
													{/each}
												</ul>
												<div
													class="mt-4 text-[10px] uppercase tracking-[0.25em] {$themeStore ===
													'dark'
														? 'text-zinc-500'
														: 'text-zinc-400'}"
												>
													{new Date(post.publishedDate).toLocaleDateString()}
												</div>
											</div>
											<div class="col-span-5">
												<div
													class="aspect-[4/3] rounded-2xl overflow-hidden border {$themeStore ===
													'dark'
														? 'border-zinc-800 bg-zinc-900'
														: 'border-zinc-200 bg-zinc-100'}"
												>
													{#if post.coverImage}
														<img
															src={post.coverImage}
															alt={post.title}
															class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
														/>
													{:else}
														<div
															class="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-[0.3em] {$themeStore ===
															'dark'
																? 'text-zinc-600'
																: 'text-zinc-500'}"
														>
															Image
														</div>
													{/if}
												</div>
											</div>
										</div>
									</a>
								</article>
							{/each}
						</div>
					</div>
				{/if}

				<section class="my-16">
					<div class="grid lg:grid-cols-12 gap-10 items-center">
						<div class="lg:col-span-7">
							<p
								class="text-[11px] uppercase tracking-[0.3em] text-red-500 font-semibold"
							>
								Newsletter
							</p>
							<h2 class="text-3xl lg:text-5xl font-semibold mt-4">
								Weekly Revenue Intelligence
							</h2>
							<p
								class="mt-4 text-base lg:text-lg leading-relaxed {$themeStore ===
								'dark'
									? 'text-zinc-400'
									: 'text-zinc-600'}"
							>
								Get the weekly digest of AI strategies, revenue signals, and
								market updates delivered to your inbox.
							</p>
							<p
								class="mt-3 text-sm leading-relaxed {$themeStore === 'dark'
								? 'text-zinc-500'
								: 'text-zinc-500'}"
							>
								Expect a concise report, a short signal list, and the one move
								worth making next.
							</p>
						</div>
						<div class="lg:col-span-5">
							<div
								class="aspect-[4/3] rounded-3xl overflow-hidden border {$themeStore ===
								'dark'
									? 'border-zinc-800 bg-zinc-950'
									: 'border-zinc-200 bg-zinc-100'}"
							>
								<img
									src={getNewsletterImage(data.newsletters?.[0] || {})}
									alt="Newsletter preview"
									class="w-full h-full object-cover"
								/>
							</div>
						</div>
					</div>

					<div
						class="mt-10 grid lg:grid-cols-12 gap-10 items-start border-t pt-10 {$themeStore ===
						'dark'
							? 'border-zinc-800'
							: 'border-zinc-200'}"
					>
						<div class="lg:col-span-5">
							<h3 class="text-2xl lg:text-3xl font-semibold">
								Stay ahead of the signal
							</h3>
							<p
								class="mt-3 text-sm leading-relaxed {$themeStore === 'dark'
								? 'text-zinc-400'
								: 'text-zinc-600'}"
							>
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
									<p
										class="mt-3 text-sm {$themeStore === 'dark'
										? 'text-zinc-400'
										: 'text-zinc-500'}"
									>
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
											>Email</label
										>
										<input
											id="email"
											name="email"
											type="email"
											required
											placeholder="you@company.com"
											class="w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/40 transition-all {$themeStore ===
											'dark'
												? 'bg-black border-zinc-700 text-white'
												: 'bg-white border-zinc-300 text-zinc-900'}"
										/>
									</div>

									<div class="space-y-3">
										<label
											for="edition-select"
											class="block text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold"
											>Intelligence Feeds</label
										>
										<div
											id="edition-select"
											class="grid grid-cols-1 sm:grid-cols-2 gap-2"
										>
											{#each data.newsletters.filter((nl) => nl.posts && nl.posts.length > 0) as nl}
												<label
													class="flex items-center gap-3 border rounded-lg px-3 py-2 cursor-pointer transition-colors {$themeStore ===
													'dark'
														? 'border-zinc-800 bg-zinc-950 hover:border-red-500/40'
														: 'border-zinc-200 bg-white hover:border-red-500/40'}"
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
										class="w-full rounded-full px-6 py-3 text-xs uppercase tracking-[0.3em] font-semibold transition-colors {$themeStore ===
										'dark'
											? 'bg-white text-black hover:bg-red-500 hover:text-white'
											: 'bg-black text-white hover:bg-red-500'} disabled:opacity-60"
									>
										{isSubscribing ? "Submitting..." : "Subscribe"}
									</button>
								</form>
							{/if}
						</div>
					</div>

					<div class="mt-14 pb-10">
						<div class="flex items-center justify-between pb-8 border-b border-zinc-800">
							<h2 class="text-xl sm:text-2xl font-semibold">
								Newsletter Briefings
							</h2>
							<span
								class="text-xs uppercase tracking-[0.2em] {$themeStore === 'dark'
									? 'text-zinc-500'
									: 'text-zinc-400'}"
								>Updated Weekly</span
							>
						</div>

						<div class="space-y-12">
							{#each data.newsletters.filter((nl) => nl.posts && nl.posts.length > 0) as nl}
								<div
									class="grid lg:grid-cols-12 gap-10 items-center py-8 {$themeStore ===
									'dark'
										? 'border-t border-zinc-800'
										: 'border-t border-zinc-200'} first:border-t-0"
								>
									<div class="lg:col-span-7">
										<p
											class="text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold"
										>
											Intelligence Feed
										</p>
										<h3 class="text-3xl sm:text-4xl font-semibold mt-4">
											{nl.title}
										</h3>
										<p
											class="mt-4 text-base leading-relaxed {$themeStore ===
											'dark'
												? 'text-zinc-400'
												: 'text-zinc-600'}"
										>
											{nl.description}
										</p>
										<div class="mt-6 flex flex-wrap gap-3">
											<a
												href="/newsletter/{nl.slug}"
												class="inline-flex items-center justify-center px-6 py-3 text-xs uppercase tracking-[0.25em] font-semibold border rounded-full transition-colors {$themeStore ===
												'dark'
													? 'border-zinc-700 text-white hover:border-red-500 hover:text-red-400'
													: 'border-zinc-300 text-zinc-700 hover:border-red-500 hover:text-red-600'}"
											>
												View Archive
											</a>
										</div>
										<div class="mt-6 space-y-2">
											{#each nl.posts.slice(0, 3) as post}
												<a
													href="/blog/{post.slug}"
													class="flex items-center justify-between gap-4 text-sm {$themeStore ===
													'dark'
														? 'text-zinc-300 hover:text-white'
														: 'text-zinc-700 hover:text-black'}"
												>
													<span class="line-clamp-1">{post.title}</span>
													<span
														class="text-[10px] uppercase tracking-[0.2em] {$themeStore ===
														'dark'
															? 'text-zinc-500'
															: 'text-zinc-400'}"
														>{new Date(post.publishedDate).toLocaleDateString()}</span
													>
												</a>
											{/each}
										</div>
									</div>
									<div class="lg:col-span-5">
										<div
											class="aspect-[4/3] rounded-3xl overflow-hidden border {$themeStore ===
											'dark'
												? 'border-zinc-800 bg-zinc-950'
												: 'border-zinc-200 bg-zinc-100'}"
										>
											<img
												src={getNewsletterImage(nl)}
												alt={nl.title}
												class="w-full h-full object-cover"
											/>
										</div>
									</div>
								</div>
							{:else}
								<div
									class="border rounded-2xl p-8 text-center {$themeStore ===
									'dark'
										? 'border-zinc-800 text-zinc-500'
										: 'border-zinc-200 text-zinc-400'}"
								>
									No editions live yet.
								</div>
							{/each}
						</div>
					</div>
				</section>

				{#each remainingGroups as group}
					<div
						class="grid lg:grid-cols-12 gap-10 pb-16 {$themeStore === 'dark'
						? 'border-b border-zinc-800'
						: 'border-b border-zinc-200'}"
					>
						{#if group[0]}
							<article class="lg:col-span-8">
								<a href="/blog/{group[0].slug}" class="group block">
									<div class="grid lg:grid-cols-12 gap-8 items-center">
										<div class="lg:col-span-7">
											<p
												class="text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold"
											>
												Spotlight
											</p>
											<h2
												class="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 leading-tight group-hover:text-red-500 transition-colors"
											>
												{group[0].title}
											</h2>
											<p
												class="mt-4 text-base sm:text-lg leading-relaxed {$themeStore ===
												'dark'
													? 'text-zinc-400'
													: 'text-zinc-600'}"
											>
												{group[0].summary || defaultSummary}
											</p>
											<ul class="mt-6 space-y-3">
												{#each (group[0].points && group[0].points.length
													? group[0].points
													: defaultPoints
												).slice(0, 3) as point}
													<li class="flex items-start gap-3">
														<span
															class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500"
														></span>
														<span
															class="text-sm leading-relaxed {$themeStore ===
															'dark'
																? 'text-zinc-300'
																: 'text-zinc-600'}"
														>
															{point}
														</span>
													</li>
												{/each}
											</ul>
											<div
												class="mt-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] {$themeStore ===
												'dark'
													? 'text-zinc-500'
													: 'text-zinc-400'}"
											>
												<span>{group[0].author}</span>
												<span>|</span>
												<span
													>{new Date(group[0].publishedDate).toLocaleDateString()}</span
												>
											</div>
										</div>
										<div class="lg:col-span-5">
											<div
												class="aspect-[4/3] rounded-2xl overflow-hidden border {$themeStore ===
												'dark'
													? 'border-zinc-800 bg-zinc-950'
													: 'border-zinc-200 bg-zinc-100'}"
											>
												{#if group[0].coverImage}
													<img
														src={group[0].coverImage}
														alt={group[0].title}
														class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
													/>
												{:else}
													<div
														class="w-full h-full flex items-center justify-center text-xs uppercase tracking-[0.3em] {$themeStore ===
														'dark'
															? 'text-zinc-600'
															: 'text-zinc-500'}"
													>
														No image
													</div>
												{/if}
											</div>
										</div>
									</div>
								</a>
							</article>
						{/if}

						<div class="lg:col-span-4 space-y-10">
							{#each group.slice(1, 3) as post}
								<article
									class="border-b pb-8 {$themeStore === 'dark'
									? 'border-zinc-800'
									: 'border-zinc-200'} last:border-b-0 last:pb-0"
								>
									<a href="/blog/{post.slug}" class="group block">
										<div class="grid grid-cols-12 gap-6 items-center">
											<div class="col-span-7">
												<h3
													class="text-lg font-semibold leading-snug group-hover:text-red-500 transition-colors"
												>
													{post.title}
												</h3>
												<p
													class="mt-2 text-sm leading-relaxed {$themeStore ===
													'dark'
														? 'text-zinc-400'
														: 'text-zinc-600'}"
												>
													{post.summary || defaultSummary}
												</p>
												<ul class="mt-4 space-y-2">
													{#each (post.points && post.points.length
														? post.points
														: defaultPoints
													).slice(0, 2) as point}
														<li class="flex items-start gap-2">
															<span
																class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500"
															></span>
															<span
																class="text-[12px] leading-relaxed {$themeStore ===
																'dark'
																	? 'text-zinc-300'
																	: 'text-zinc-500'}"
															>
																{point}
															</span>
														</li>
													{/each}
												</ul>
												<div
													class="mt-4 text-[10px] uppercase tracking-[0.25em] {$themeStore ===
													'dark'
														? 'text-zinc-500'
														: 'text-zinc-400'}"
												>
													{new Date(post.publishedDate).toLocaleDateString()}
												</div>
											</div>
											<div class="col-span-5">
												<div
													class="aspect-[4/3] rounded-2xl overflow-hidden border {$themeStore ===
													'dark'
														? 'border-zinc-800 bg-zinc-900'
														: 'border-zinc-200 bg-zinc-100'}"
												>
													{#if post.coverImage}
														<img
															src={post.coverImage}
															alt={post.title}
															class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
														/>
													{:else}
														<div
															class="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-[0.3em] {$themeStore ===
															'dark'
																? 'text-zinc-600'
																: 'text-zinc-500'}"
														>
															Image
														</div>
													{/if}
												</div>
											</div>
										</div>
									</a>
								</article>
							{/each}
						</div>
					</div>
				{/each}
			{/if}
		</section>

		<section class="mt-20">
			<div
				class="border-t pt-10 {$themeStore === 'dark'
				? 'border-zinc-800'
				: 'border-zinc-200'}"
			>
				<h2 class="text-xl sm:text-2xl font-semibold">Explore More</h2>
				<p
					class="mt-3 text-sm {$themeStore === 'dark'
					? 'text-zinc-400'
					: 'text-zinc-600'}"
				>
					Dive deeper into Spiked AI — product, features, and proof.
				</p>
				<div class="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
					<a
						href="/features"
						class="text-xs uppercase tracking-[0.25em] font-semibold py-3 border rounded-full text-center transition-colors {$themeStore ===
						'dark'
							? 'border-zinc-800 text-zinc-200 hover:border-red-500 hover:text-red-400'
							: 'border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600'}"
					>
						Features
					</a>
					<a
						href="/customers"
						class="text-xs uppercase tracking-[0.25em] font-semibold py-3 border rounded-full text-center transition-colors {$themeStore ===
						'dark'
							? 'border-zinc-800 text-zinc-200 hover:border-red-500 hover:text-red-400'
							: 'border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600'}"
					>
						Customers
					</a>
					<a
						href="/resources"
						class="text-xs uppercase tracking-[0.25em] font-semibold py-3 border rounded-full text-center transition-colors {$themeStore ===
						'dark'
							? 'border-zinc-800 text-zinc-200 hover:border-red-500 hover:text-red-400'
							: 'border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600'}"
					>
						Resources
					</a>
					<a
						href="/pricing"
						class="text-xs uppercase tracking-[0.25em] font-semibold py-3 border rounded-full text-center transition-colors {$themeStore ===
						'dark'
							? 'border-zinc-800 text-zinc-200 hover:border-red-500 hover:text-red-400'
							: 'border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600'}"
					>
						Pricing
					</a>
					<a
						href="/about-us"
						class="text-xs uppercase tracking-[0.25em] font-semibold py-3 border rounded-full text-center transition-colors {$themeStore ===
						'dark'
							? 'border-zinc-800 text-zinc-200 hover:border-red-500 hover:text-red-400'
							: 'border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600'}"
					>
						About
					</a>
					<a
						href="/contact-sales"
						class="text-xs uppercase tracking-[0.25em] font-semibold py-3 border rounded-full text-center transition-colors {$themeStore ===
						'dark'
							? 'border-zinc-800 text-zinc-200 hover:border-red-500 hover:text-red-400'
							: 'border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600'}"
					>
						Contact
					</a>
				</div>
			</div>
		</section>

	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		transition: background-color 0.5s ease;
	}

	:global(html.dark body) {
		background-color: #000000 !important;
	}
	:global(html:not(.dark) body) {
		background-color: #ffffff !important;
	}

	.line-clamp-1 {
		display: -webkit-box;
		-webkit-line-clamp: 1;
		line-clamp: 1;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

</style>
