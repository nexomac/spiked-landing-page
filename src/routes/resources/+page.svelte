<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
	import Footer from "$lib/components/Footer.svelte";
	import ThemeCard from "$lib/components/ui/ThemeCard.svelte";
	import ThemeSection from "$lib/components/ui/ThemeSection.svelte";
	import ThemeHeadline from "$lib/components/ui/ThemeHeadline.svelte";

	const events = [
		{
			title: "Gartner Sales Conference",
			link: "https://www.gartner.com/en/conferences/na/sales-us",
			description: "The premier conference for sales leaders.",
			tag: "Conference",
			date: "May 2026",
		},
		{
			title: "HumanX",
			link: "https://www.humanx.co/",
			description: "The most important gathering in AI.",
			tag: "Summit",
			date: "June 2026",
		},
		{
			title: "TEDAI San Francisco",
			link: "https://tedai-sanfrancisco.ted.com/",
			description: "Ideas worth spreading about Artificial Intelligence.",
			tag: "Talks",
			date: "July 2026",
		},
		{
			title: "Tech Week",
			link: "https://www.tech-week.com/",
			description: "A week long celebration of technology and innovation.",
			tag: "Festival",
			date: "Aug 2026",
		},
	];

	const videos = [
		{
			id: "BQcw_UIRSKU",
			title:
				"Anushka Salinas, Nanit | theCUBE + NYSE Wired: Mixture of Experts",
		},
		{
			id: "6J9AgLJ8CiY",
			title:
				"Ginniee Singh, SpikedAI | theCUBE + NYSE Wired: Mixture of Experts",
		},
		{
			id: "0PUsnvhTxi4",
			title:
				"Tim Piemonte, Tribeca Softech & Ankur Patel, Multimodal | theCUBE + NYSE Wired: Mixture of Experts",
		},
		{
			id: "ZVidW_wUCwA",
			title:
				"Umesh Sachdev, Uniphore | theCUBE + NYSE Wired: Mixture of Experts",
		},
		{
			id: "2Q8XZfkYv9I",
			title: "Sid Sheth, d-Matrix | theCUBE + NYSE Wired: Mixture of Experts",
		},
		{
			id: "2pQhRDomSTw",
			title:
				"Aaron Katz, ClickHouse | theCUBE + NYSE Wired: Mixture of Experts",
		},
		{
			id: "DWVtGMYcXfg",
			title:
				"Muddu Sudhakar, Salesforce | theCUBE + NYSE Wired: Mixture of Experts",
		},
		{
			id: "3y_W7J214kQ",
			title:
				"Jim McNiel, TAE Technologies | theCUBE + NYSE Wired: Mixture of Experts",
		},
		{
			id: "CmyrvW2m7Z8",
			title: "Alex Rinke, Celonis | theCUBE + NYSE Wired: Mixture of Experts",
		},
	];

	const featuredEvent = events[0];
	const secondaryEvents = events.slice(1);
</script>

<svelte:head>
	<title>SpikedAI | Resources</title>
	<meta
		name="description"
		content="Watch expert interviews and insights from industry leaders"
	/>
</svelte:head>

<div
	class="min-h-screen bg-background text-foreground transition-colors duration-300"
>
	<ThemeSection id="intro" background="default" class="text-center pt-20">
		<ThemeHeadline variant="h1" class="mb-4">
			SpikedAI <span class="text-primary block sm:inline">Resources</span>
		</ThemeHeadline>
		<ThemeHeadline variant="sub" class="max-w-4xl mx-auto">
			Watch expert interviews and insights from industry leaders.
		</ThemeHeadline>
	</ThemeSection>

	<!-- Featured / Events Section -->
	<ThemeSection id="events" background="default">
		<ThemeHeadline variant="h2" class="mb-12 border-l-4 border-primary pl-6">
			Featured Events
		</ThemeHeadline>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Hero Event Card -->
			<a
				href={featuredEvent.link}
				target="_blank"
				rel="noopener noreferrer"
				class="lg:col-span-2 block group text-inherit no-underline"
			>
				<ThemeCard
					class="h-full flex flex-col justify-between p-12 bg-gradient-to-br from-card to-card/50 relative overflow-hidden group-hover:border-primary/50 transition-colors"
				>
					<!-- Decorative bg -->
					<div
						class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
					></div>

					<div class="relative z-10">
						<div
							class="inline-block bg-primary text-white font-bold px-4 py-2 rounded-lg mb-8 uppercase tracking-wider text-sm"
						>
							{featuredEvent.tag}
						</div>
						<ThemeHeadline
							variant="h2"
							class="mb-6 leading-tight group-hover:text-primary transition-colors"
						>
							{featuredEvent.title}
						</ThemeHeadline>
						<p class="text-xl text-muted-foreground font-medium max-w-2xl">
							{featuredEvent.description}
						</p>
					</div>

					<div
						class="relative z-10 mt-12 inline-flex items-center gap-2 font-bold text-lg group-hover:translate-x-2 transition-transform"
					>
						<span>Register Now</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
						>
					</div>
				</ThemeCard>
			</a>

			<!-- Secondary Events List -->
			<div class="space-y-6">
				{#each secondaryEvents as event}
					<a
						href={event.link}
						target="_blank"
						rel="noopener noreferrer"
						class="block h-full group text-inherit no-underline"
					>
						<ThemeCard
							class="p-8 h-full flex flex-col justify-center hover:border-primary/50 transition-colors"
						>
							<ThemeHeadline
								variant="h4"
								class="mb-4 group-hover:text-primary transition-colors"
							>
								{event.title}
							</ThemeHeadline>
							<div
								class="flex justify-between items-center mt-auto pt-4 border-t border-border/50"
							>
								<span
									class="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full px-2"
								>
									{event.tag}
								</span>
								<span
									class="text-sm font-semibold text-muted-foreground group-hover:text-foreground"
									>Learn more</span
								>
							</div>
						</ThemeCard>
					</a>
				{/each}
			</div>
		</div>
	</ThemeSection>

	<!-- Videos Section -->
	<ThemeSection id="videos" background="alternate">
		<ThemeHeadline variant="h2" class="mb-12 border-l-4 border-primary pl-6">
			Latest resource and videos
		</ThemeHeadline>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each videos as video}
				<div class="group">
					<div
						class="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg mb-6 relative group-hover:-translate-y-2 transition-transform duration-300"
					>
						<iframe
							src={`https://www.youtube.com/embed/${video.id}`}
							title={video.title}
							class="absolute inset-0 w-full h-full"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerpolicy="strict-origin-when-cross-origin"
							allowfullscreen
							loading="lazy"
						></iframe>
					</div>
					<div class="px-2">
						<span
							class="inline-block text-xs font-bold text-white bg-blue-600 px-3 py-1 rounded-full mb-3"
						>
							Video
						</span>
						<h3
							class="text-xl font-bold leading-snug group-hover:text-primary transition-colors"
						>
							{video.title}
						</h3>
					</div>
				</div>
			{/each}
		</div>
	</ThemeSection>

	<Footer />
</div>
