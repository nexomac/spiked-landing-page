<script>
	import { ArrowRight, Play } from "lucide-svelte";
	import { fade, fly } from "svelte/transition";

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
	];

	const videos = [
		{
			id: "BQcw_UIRSKU",
			title: "Anushka Salinas, Nanit | Mixture of Experts",
		},
		{
			id: "6J9AgLJ8CiY",
			title: "Ginniee Singh, SpikedAI | Mixture of Experts",
		},
		{
			id: "0PUsnvhTxi4",
			title: "Tim Piemonte, Tribeca Softech & Ankur Patel",
		},
		{
			id: "ZVidW_wUCwA",
			title: "Umesh Sachdev, Uniphore | Mixture of Experts",
		},
		{
			id: "2Q8XZfkYv9I",
			title: "Sid Sheth, d-Matrix | Mixture of Experts",
		},
		{
			id: "2pQhRDomSTw",
			title: "Aaron Katz, ClickHouse | Mixture of Experts",
		},
	];

	const topEvent = events[0];
</script>

<svelte:head>
	<title>Resources | SpikedAI</title>
</svelte:head>

<div
	class="min-h-screen bg-black text-white font-sans selection:bg-[#ef4444]/30"
>
	<!-- Hero -->
	<section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<div class="max-w-6xl">
				<span
					class="inline-block text-[#ef4444] text-xs font-bold uppercase tracking-[0.4em] mb-6"
					>Learning Hub</span
				>
				<h1
					class="text-[clamp(4rem,12vw,12rem)] font-black tracking-tighter leading-[0.82] mb-12"
				>
					SPIKEDAI<br />
					<span class="text-[#ef4444]">RESOURCES</span>
				</h1>
				<p class="text-zinc-500 text-xl lg:text-2xl max-w-2xl leading-relaxed">
					Watch expert interviews, register for upcoming summits, and master the
					cognitive edge.
				</p>
			</div>
		</div>
	</section>

	<!-- Featured Event (Large Card) -->
	<section class="py-12">
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<a
				href={topEvent.link}
				class="group block relative rounded-[3rem] overflow-hidden bg-zinc-900 border border-zinc-800 transition-all hover:border-[#ef4444]/50 shadow-2xl"
			>
				<div
					class="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"
				></div>
				<!-- Mock BG Image -->
				<img
					src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=1600&q=80"
					alt=""
					class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
				/>

				<div
					class="relative z-20 p-10 lg:p-20 flex flex-col items-start max-w-4xl"
				>
					<span
						class="px-4 py-1.5 rounded-full bg-[#ef4444] text-white text-[10px] font-black uppercase tracking-widest mb-8"
						>{topEvent.tag}</span
					>
					<h2
						class="text-4xl lg:text-7xl font-black mb-6 tracking-tighter leading-none"
					>
						{topEvent.title}
					</h2>
					<p class="text-zinc-300 text-lg lg:text-xl mb-10 leading-relaxed">
						{topEvent.description}
					</p>
					<div
						class="flex items-center gap-2 text-white font-black uppercase tracking-widest group-hover:gap-4 transition-all"
					>
						Register for the event <ArrowRight class="w-5 h-5" />
					</div>
				</div>
			</a>
		</div>
	</section>

	<!-- Events Feed -->
	<section class="py-24">
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<div
				class="flex items-baseline justify-between mb-16 border-b border-zinc-900 pb-8"
			>
				<h3 class="text-3xl font-black tracking-tight">Upcoming Summits</h3>
				<span class="text-zinc-500 font-bold uppercase text-xs tracking-widest"
					>2026 Calendar</span
				>
			</div>
			<div class="grid lg:grid-cols-2 gap-8">
				{#each events.slice(1) as event}
					<a
						href={event.link}
						class="p-10 rounded-[2.5rem] bg-zinc-950/50 border border-zinc-900 flex justify-between items-center group hover:bg-zinc-900 transition-all"
					>
						<div>
							<span
								class="text-[#ef4444] text-[10px] font-black uppercase tracking-widest block mb-4"
								>{event.date}</span
							>
							<h4 class="text-2xl font-black mb-2">{event.title}</h4>
							<p class="text-zinc-500 text-sm font-medium">
								{event.tag} — {event.description}
							</p>
						</div>
						<div
							class="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all"
						>
							<ArrowRight class="w-5 h-5" />
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- Videos Grid -->
	<section
		class="py-24 lg:py-40 bg-zinc-50 text-zinc-900 rounded-t-[4rem] lg:rounded-t-[6rem]"
		id="videos"
	>
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<div
				class="flex flex-col lg:flex-row justify-between items-end gap-8 mb-20 lg:mb-32"
			>
				<div class="max-w-2xl">
					<span
						class="text-[#ef4444] text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
						>Video Insights</span
					>
					<h2
						class="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-8"
					>
						MIXTURE OF EXPERTS.
					</h2>
					<p class="text-zinc-500 text-lg lg:text-xl leading-relaxed">
						Industry leaders at the intersection of AI and Revenue share their
						blueprints for the modern enterprise.
					</p>
				</div>
				<div
					class="flex items-center gap-4 text-zinc-400 font-bold uppercase text-xs tracking-widest"
				>
					<div class="w-4 h-4 rounded-full bg-[#ef4444] animate-pulse"></div>
					Latest Interviews
				</div>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
				{#each videos as video}
					<div class="group">
						<div
							class="relative aspect-video rounded-3xl overflow-hidden mb-8 shadow-2xl bg-black"
						>
							<iframe
								src={`https://www.youtube.com/embed/${video.id}`}
								title={video.title}
								class="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							></iframe>
							<div
								class="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
							>
								<span
									class="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2"
								>
									<Play class="w-3 h-3 fill-current" /> Watch now
								</span>
							</div>
						</div>
						<h4
							class="text-2xl font-black mb-4 group-hover:text-[#ef4444] transition-colors line-clamp-2"
						>
							{video.title}
						</h4>
						<div
							class="flex items-center gap-4 text-zinc-400 text-xs font-bold uppercase tracking-widest"
						>
							<span>theCUBE</span>
							<div class="w-1 h-1 rounded-full bg-zinc-300"></div>
							<span>Video Resource</span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="py-24 bg-zinc-50 border-t border-zinc-100 text-zinc-900">
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<div
				class="bg-black text-white rounded-[3rem] p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden"
			>
				<div class="relative z-10 max-w-2xl text-center lg:text-left">
					<h2
						class="text-4xl lg:text-6xl font-black tracking-tighter leading-tight mb-8"
					>
						NEVER MISS AN<br />INSIGHT.
					</h2>
					<p class="text-zinc-400 text-lg lg:text-xl leading-relaxed">
						Join 20k+ sales leaders who receive our weekly mixture of experts
						direct to their inbox.
					</p>
				</div>
				<div class="relative z-10 w-full lg:w-auto">
					<form class="flex flex-col sm:flex-row gap-4">
						<input
							type="email"
							placeholder="Email Address"
							class="px-10 py-5 rounded-full bg-zinc-900 border border-zinc-800 focus:border-[#ef4444] text-white outline-none min-w-[300px] font-bold"
						/>
						<button
							class="px-10 py-5 bg-[#ef4444] rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
							>Subscribe</button
						>
					</form>
				</div>
				<!-- Atmosphere -->
				<div
					class="absolute top-0 right-0 w-96 h-96 bg-[#ef4444]/10 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2"
				></div>
			</div>
		</div>
	</section>
</div>

<style>
	:global(body) {
		background: black;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
