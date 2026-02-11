<script>
	import { fade } from "svelte/transition";
	import { themeStore } from "$lib/stores/theme.js";
	import { ChevronLeft } from "lucide-svelte";

	let { data } = $props();

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
</script>

<svelte:head>
	<title>Spiked AI | Newsletter</title>
</svelte:head>

<div
	class="min-h-screen transition-colors duration-500 font-sans pt-24 pb-24
	{$themeStore === 'dark' ? 'bg-black text-white' : 'bg-white text-zinc-900'}"
>
	<div class="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
		<header class="mb-14 lg:mb-20">
			<nav class="mb-8">
				<a
					href="/blog"
					class="flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold transition-colors {$themeStore ===
					'dark'
						? 'text-zinc-400 hover:text-red-400'
						: 'text-zinc-500 hover:text-red-600'}"
				>
					<ChevronLeft /> Back to Blogs
				</a>
			</nav>
			<p
				class="text-[11px] uppercase tracking-[0.3em] font-semibold text-red-500"
			>
				Intelligence Feed
			</p>
			<h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold mt-3">
				{data.newsletter?.title}
			</h1>
			<p
				class="mt-4 max-w-3xl text-base sm:text-lg leading-relaxed {$themeStore ===
				'dark'
					? 'text-zinc-400'
					: 'text-zinc-600'}"
			>
				{data.newsletter?.description}
			</p>
			<div class="mt-10 grid lg:grid-cols-12 gap-10 items-center">
				<div class="lg:col-span-7">
					<p
						class="text-sm leading-relaxed {$themeStore === 'dark'
						? 'text-zinc-400'
						: 'text-zinc-600'}"
					>
						This briefing tracks the strongest revenue signals, market shifts,
						and AI strategy worth acting on this week.
					</p>
					<div
						class="mt-6 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] {$themeStore ===
						'dark'
							? 'text-zinc-500'
							: 'text-zinc-400'}"
					>
						<span>Weekly release</span>
						<span class="hidden sm:inline">|</span>
						<span>Actionable takeaways</span>
						<span class="hidden sm:inline">|</span>
						<span>Signal over noise</span>
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
							src={getNewsletterImage(data.newsletter || {})}
							alt={data.newsletter?.title}
							class="w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>
		</header>

		<section class="space-y-16">
			{#if data.posts.length === 0}
				<div class="text-center py-24 text-zinc-500">
					No editions published yet.
				</div>
			{:else}
				{#each data.posts as post}
					<article
						class="grid lg:grid-cols-12 gap-10 pb-16 {$themeStore === 'dark'
						? 'border-b border-zinc-800'
						: 'border-b border-zinc-200'}"
					>
						<div class="lg:col-span-8">
							<a href="/blog/{post.slug}" class="group block">
								<div class="grid lg:grid-cols-12 gap-8 items-center">
									<div class="lg:col-span-7">
										<p
											class="text-[10px] uppercase tracking-[0.3em] text-red-500 font-semibold"
										>
											Edition
										</p>
										<h2
											class="text-3xl sm:text-4xl lg:text-5xl font-semibold mt-4 leading-tight group-hover:text-red-500 transition-colors"
										>
											{post.title}
										</h2>
										<p
											class="mt-4 text-base sm:text-lg leading-relaxed {$themeStore ===
											'dark'
												? 'text-zinc-400'
												: 'text-zinc-600'}"
										>
											{post.summary || post.excerpt || defaultSummary}
										</p>
										<ul class="mt-6 space-y-3">
											{#each (post.points && post.points.length
												? post.points
												: defaultPoints
											).slice(0, 3) as point}
												<li class="flex items-start gap-3">
													<span class="mt-2 h-1.5 w-1.5 rounded-full bg-red-500"></span>
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
											<span>{post.author}</span>
											<span>|</span>
											<span
												>{new Date(post.publishedDate).toLocaleDateString()}</span
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
											{#if post.coverImage}
												<img
													src={post.coverImage}
													alt={post.title}
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
						</div>
						<div class="lg:col-span-4 space-y-4">
							<div
								class="border rounded-2xl p-6 {$themeStore === 'dark'
								? 'border-zinc-800 bg-zinc-950'
								: 'border-zinc-200 bg-zinc-50'}"
							>
								<h3 class="text-lg font-semibold">Why this matters</h3>
								<p
									class="mt-3 text-sm leading-relaxed {$themeStore === 'dark'
									? 'text-zinc-400'
									: 'text-zinc-600'}"
								>
									This briefing highlights the levers that move pipeline right now.
								</p>
							</div>
							<div
								class="border rounded-2xl p-6 {$themeStore === 'dark'
								? 'border-zinc-800 bg-zinc-950'
								: 'border-zinc-200 bg-zinc-50'}"
							>
								<h3 class="text-lg font-semibold">Suggested next move</h3>
								<p
									class="mt-3 text-sm leading-relaxed {$themeStore === 'dark'
									? 'text-zinc-400'
									: 'text-zinc-600'}"
								>
									Share with your team, align on the takeaway, and act fast.
								</p>
							</div>
						</div>
					</article>
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
		transition: background-color 0.5s ease;
	}

	:global(html.dark body) {
		background-color: #000000 !important;
	}
	:global(html:not(.dark) body) {
		background-color: #ffffff !important;
	}
</style>
