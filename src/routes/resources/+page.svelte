<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
	import Footer from "$lib/components/Footer.svelte";
</script>

<svelte:head>
	<title>Resources - SpikedAI</title>
	<meta
		name="description"
		content="Watch expert interviews and insights from industry leaders"
	/>
</svelte:head>

<div class="min-h-screen bg-[black] text-white resource-container">
	<div class="resources-page">
		<div class="container">
			<header class="page-header">
				<h1>Events</h1>
				<p>Connect with us at these upcoming industry events and conferences</p>
			</header>

			<div class="events-grid">
				{#each [{ title: "Gartner Sales Conference", link: "https://www.gartner.com/en/conferences/na/sales-us", description: "The premier conference for sales leaders." }, { title: "HumanX", link: "https://www.humanx.co/", description: "The most important gathering in AI." }, { title: "TEDAI San Francisco", link: "https://tedai-sanfrancisco.ted.com/", description: "Ideas worth spreading about Artificial Intelligence." }, { title: "Tech Week", link: "https://www.tech-week.com/", description: "A week long celebration of technology and innovation." }] as event}
					<a
						href={event.link}
						target="_blank"
						rel="noopener noreferrer"
						class="event-card"
					>
						<div class="event-content">
							<h3>{event.title}</h3>
							<p class="event-desc">{event.description}</p>
							<span class="event-link"
								>Visit Website <svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="lucide lucide-arrow-right"
									><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
								></span
							>
						</div>
					</a>
				{/each}
			</div>

			<header class="page-header" style="margin-top: 8rem;">
				<h1>Resources</h1>
				<p>
					Watch expert interviews and insights from industry leaders featured on
					theCUBE + NYSE Wired: Mixture of Experts
				</p>
			</header>

			<div class="videos-grid">
				{#each [{ id: "BQcw_UIRSKU", title: "Anushka Salinas, Nanit | theCUBE + NYSE Wired: Mixture of Experts" }, { id: "6J9AgLJ8CiY", title: "Ginniee Singh, SpikedAI | theCUBE + NYSE Wired: Mixture of Experts" }, { id: "0PUsnvhTxi4", title: "Tim Piemonte, Tribeca Softech & Ankur Patel, Multimodal | theCUBE + NYSE Wired: Mixture of Experts" }, { id: "ZVidW_wUCwA", title: "Umesh Sachdev, Uniphore | theCUBE + NYSE Wired: Mixture of Experts" }, { id: "2Q8XZfkYv9I", title: "Sid Sheth, d-Matrix | theCUBE + NYSE Wired: Mixture of Experts" }, { id: "2pQhRDomSTw", title: "Aaron Katz, ClickHouse | theCUBE + NYSE Wired: Mixture of Experts" }, { id: "DWVtGMYcXfg", title: "Muddu Sudhakar, Salesforce | theCUBE + NYSE Wired: Mixture of Experts" }, { id: "3y_W7J214kQ", title: "Jim McNiel, TAE Technologies | theCUBE + NYSE Wired: Mixture of Experts" }, { id: "CmyrvW2m7Z8", title: "Alex Rinke, Celonis | theCUBE + NYSE Wired: Mixture of Experts" }] as video}
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
						<h3>{video.title}</h3>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<Footer />
</div>

<style>
	.resource-container {
		min-height: 100vh;
		background: linear-gradient(180deg, #000 0%, #0a0a0a 100%);
	}

	.resources-page {
		padding: 6rem 0 10rem;
	}

	.container {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	.page-header {
		text-align: center;
		margin-bottom: 4rem;
	}

	.page-header h1 {
		font-size: 3.5rem;
		font-weight: 700;
		background: linear-gradient(135deg, #fff 0%, #888 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		margin-bottom: 1rem;
	}

	.page-header p {
		font-size: 1.25rem;
		color: #999;
		max-width: 800px;
		margin: 0 auto;
		line-height: 1.6;
	}

	.videos-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 3rem;
		margin-top: 3rem;
	}

	.video-card {
		background: rgba(255, 255, 255, 0.03);
		border-radius: 12px;
		padding: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: all 0.3s ease;
	}

	.video-card:hover {
		transform: translateY(-4px);
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.video-frame {
		position: relative;
		width: 100%;
		padding-top: 56.25%;
		overflow: hidden;
		border-radius: 10px;
		background: #0f0f0f;
	}

	.video-card iframe {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}

	.video-card h3 {
		margin-top: 1rem;
		font-size: 1.25rem;
		font-weight: 600;
		color: #fff;
	}

	.events-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 3rem;
	}

	.event-card {
		background: rgba(255, 255, 255, 0.03);
		border-radius: 12px;
		padding: 2rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		text-decoration: none;
		transition: all 0.3s ease;
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 200px;
	}

	.event-card:hover {
		transform: translateY(-4px);
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.event-card h3 {
		font-size: 1.5rem;
		font-weight: 700;
		color: #fff;
		margin-bottom: 0.5rem;
	}

	.event-desc {
		color: #999;
		margin-bottom: 1.5rem;
		line-height: 1.5;
	}

	.event-link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		color: #fff;
		font-weight: 600;
		font-size: 0.9rem;
	}

	@media (max-width: 1024px) {
		.videos-grid,
		.events-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}

		.page-header h1 {
			font-size: 2.5rem;
		}
	}

	@media (max-width: 640px) {
		.resources-page {
			padding: 4rem 0 3rem;
		}

		.container {
			padding: 0 1rem;
		}

		.page-header h1 {
			font-size: 2rem;
		}

		.page-header p {
			font-size: 1rem;
		}

		.video-card {
			padding: 1rem;
		}

		.videos-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
