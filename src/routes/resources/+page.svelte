<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
	import Footer from "$lib/components/Footer.svelte";

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

<div class="min-h-screen bg-[black] text-white resource-container pt-20">
	<div class="resources-page">
		<div class="container">
			<div class="section-intro mb-12">
				<h1 class="font-black tracking-tighter pb-20 text-white" style="font-size: clamp(6rem, 10vw, 11rem); line-height: 0.88; letter-spacing: -0.04em;">
					SpikedAI <span class="text-red-600 block sm:inline">Resources</span>
				</h1>
				<p class="main-subtitle">

				</p>
			</div>

			<!-- Featured / Events Section -->
			<div class="section-block" id="events">
				<h2 class="section-heading" style="font-size: clamp(3.75rem, 5vw, 5rem);">Featured Events</h2>

				<div class="featured-grid">
					<!-- Hero Event Card -->
					<a
						href={featuredEvent.link}
						target="_blank"
						rel="noopener noreferrer"
						class="hero-card"
					>
						<div class="hero-content">
							<div class="tag-badge">{featuredEvent.tag}</div>
							<h3 class="hero-title">{featuredEvent.title}</h3>
							<p class="hero-desc">{featuredEvent.description}</p>
							<div class="hero-cta">
								<span>Register Now</span>
								<!-- Changed text to be more event-appropriate -->
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
								>
							</div>
						</div>
						<div class="hero-bg-overlay"></div>
					</a>

					<!-- Secondary Events List -->
					<div class="secondary-list">
						{#each secondaryEvents as event}
							<a
								href={event.link}
								target="_blank"
								rel="noopener noreferrer"
								class="secondary-card"
							>
								<div class="secondary-content">
									<h4 class="secondary-title">{event.title}</h4>
									<div class="secondary-meta">
										<span class="mini-tag">{event.tag}</span>
										<span class="secondary-link-text">Learn more</span>
									</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>

			<!-- Videos Section -->
			<div class="section-block" id="videos">
				<div class="section-divider"></div>
				<h2 class="section-heading" style="font-size: clamp(3.75rem, 5vw, 5rem);">Latest resource and videos</h2>

				<div class="videos-grid">
					{#each videos as video}
						<div class="video-card">
							<div class="video-frame">
								<iframe
									src={`https://www.youtube.com/embed/${video.id}`}
									title={video.title}
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
									referrerpolicy="strict-origin-when-cross-origin"
									allowfullscreen
									loading="lazy"
								></iframe>
							</div>
							<div class="video-info">
								<span class="video-tag">Video</span>
								<h3>{video.title}</h3>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
	<Footer />
</div>


<style>
	.resource-container {
		min-height: 100vh;
		background: #000;
		font-family: "Inter", sans-serif;
	}

	.resources-page {
		padding: 5rem 0 10rem;
	}

	.container {
		max-width: 100%;
		margin: 0 auto;
		padding: 0 4rem; /* Wide padding for full-width feel */
	}

	/* Intro Section */
	.section-intro {
		text-align: center;
		margin-bottom: 8rem;
	}

	.main-subtitle {
		font-size: 2rem;
		color: #888;
		max-width: 1200px;
		margin: 0 auto 4rem;
		line-height: 1.4;
	}

	/* Section Headers */
	.section-block {
		margin-bottom: 10rem;
	}

	.section-heading {
		font-size: 3rem;
		font-weight: 400;
		color: #ddd;
		margin-bottom: 4rem;
		padding-left: 1.5rem;
		border-left: 6px solid #00cba0;
		line-height: 1.1;
	}

	.section-divider {
		height: 1px;
		background: #222;
		margin-bottom: 5rem;
	}

	/* Featured Layout */
	.featured-grid {
		display: grid;
		grid-template-columns: 2fr 1fr;
		gap: 3rem; /* Larger gap */
	}

	.hero-card {
		position: relative;
		background: linear-gradient(135deg, #1a2a24 0%, #0d1210 100%);
		border-radius: 16px;
		padding: 6rem; /* Huge padding */
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 700px; /* Taller hero */
		text-decoration: none;
		overflow: hidden;
		border: 1px solid #222;
		transition:
			transform 0.3s ease,
			border-color 0.3s ease;
	}

	.hero-card:hover {
		transform: translateY(-4px);
		border-color: #333;
	}

	.hero-bg-overlay {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: radial-gradient(
			circle at top right,
			rgba(0, 203, 160, 0.1),
			transparent 60%
		);
		pointer-events: none;
	}

	.hero-content {
		position: relative;
		z-index: 10;
		max-width: 90%;
	}

	.tag-badge {
		display: inline-block;
		background: #fff;
		color: #000;
		font-size: 1.25rem;
		font-weight: 700;
		padding: 0.5rem 1rem;
		border-radius: 6px;
		margin-bottom: 2rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.hero-title {
		font-size: 5rem; /* Massive title */
		font-weight: 700;
		color: #fff;
		margin-bottom: 2rem;
		line-height: 1.05;
	}

	.hero-desc {
		font-size: 1.75rem;
		color: #aaa;
		margin-bottom: 3rem;
		line-height: 1.5;
		max-width: 800px;
	}

	.hero-cta {
		display: inline-flex;
		align-items: center;
		gap: 1rem;
		background: #334;
		color: #fff;
		padding: 1rem 2rem; /* Larger button */
		border-radius: 8px;
		font-size: 1.25rem;
		font-weight: 600;
	}

	.hero-cta svg {
		width: 24px;
		height: 24px;
	}

	/* Secondary List */
	.secondary-list {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.secondary-card {
		background: #111;
		border: 1px solid #222;
		padding: 3rem; /* Larger padding */
		border-radius: 16px;
		text-decoration: none;
		flex: 1;
		display: flex;
		align-items: center;
		transition: background 0.2s ease;
	}

	.secondary-card:hover {
		background: #161616;
	}

	.secondary-content {
		width: 100%;
	}

	.secondary-title {
		font-size: 2rem; /* larger secondary titles */
		font-weight: 600;
		color: #fff;
		margin-bottom: 1rem;
		line-height: 1.2;
	}

	.secondary-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 1rem;
	}

	.mini-tag {
		background: rgba(255, 255, 255, 0.1);
		color: #ccc;
		font-size: 1rem;
		padding: 0.25rem 0.75rem;
		border-radius: 4px;
	}

	.secondary-link-text {
		color: #666;
		font-size: 1.125rem;
	}

	/* Videos Grid (Resource Layout) */
	.videos-grid {
		display: grid;
		grid-template-columns: repeat(
			auto-fill,
			minmax(500px, 1fr)
		); /* Wider columns */
		gap: 3rem;
	}

	.video-card {
		background: transparent;
	}

	.video-frame {
		position: relative;
		width: 100%;
		padding-top: 56.25%;
		overflow: hidden;
		border-radius: 12px;
		background: #111;
		margin-bottom: 1.5rem;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
	}

	.video-card iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.video-info {
		padding-right: 1rem;
	}

	.video-tag {
		display: inline-block;
		font-size: 0.9rem;
		color: #fff;
		background: #3b82f6;
		padding: 0.3rem 0.8rem;
		border-radius: 4px;
		margin-bottom: 0.75rem;
		font-weight: 600;
	}

	.video-card h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: #eee;
		line-height: 1.3;
	}

	@media (max-width: 1200px) {
		.featured-grid {
			grid-template-columns: 1fr;
		}

		.hero-card {
			min-height: auto;
			padding: 4rem;
		}

		.videos-grid {
			grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		}
	}

	@media (max-width: 768px) {
		.container {
			padding: 0 1.5rem;
		}

		.hero-title {
			font-size: 3rem;
		}

		.section-heading {
			font-size: 2rem;
		}

		.videos-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
