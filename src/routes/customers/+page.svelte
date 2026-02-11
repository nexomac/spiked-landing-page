<script>
	import { onMount } from "svelte";
	import { themeStore } from "$lib/stores/theme.js";
	import { ArrowRight, Quote } from "lucide-svelte";

	onMount(() => {
		themeStore.init();
	});

	const customers = [
		{
			name: "Acme Corp",
			logo: "AC",
			quote:
				"SpikedAI transformed our sales process completely. We've seen a 30% increase in closure rates.",
			author: "Jane Doe",
			role: "VP of Sales",
		},
		{
			name: "Globex",
			logo: "GL",
			quote:
				"The best investment we've made this year. The AI insights are scary good.",
			author: "John Smith",
			role: "CRO",
		},
		{
			name: "Soylent Corp",
			logo: "SC",
			quote:
				"Our team loves the real-time assistance. It's like having a coach on every call.",
			author: "Alice Johnson",
			role: "Sales Director",
		},
		{
			name: "Initech",
			logo: "IN",
			quote: "Integration was seamless. We were up and running in days.",
			author: "Bob Williams",
			role: "CTO",
		},
		{
			name: "Umbrella Corp",
			logo: "UC",
			quote:
				"Security and compliance were our top concerns, and SpikedAI nailed it.",
			author: "Claire Redfield",
			role: "CISO",
		},
		{
			name: "Cyberdyne",
			logo: "CY",
			quote:
				"The predictive analytics are game-changing. We know exactly which deals to focus on.",
			author: "Miles Dyson",
			role: "Director of Engineering",
		},
	];
</script>

<svelte:head>
	<title>Customers - SpikedAI</title>
</svelte:head>

<div
	class="page-shell min-h-screen transition-colors duration-500 font-sans selection:bg-red-500/30 overflow-x-hidden
    {$themeStore === 'dark'
		? 'bg-black text-zinc-100'
		: 'bg-white text-zinc-900'}"
>
	<main
		class="relative z-10 w-full overflow-hidden max-w-[1900px] mx-auto bg-transparent pb-32"
	>
		<!-- Hero Section -->
		<section class="relative pt-32 pb-24 lg:pt-48 lg:pb-32 text-center overflow-hidden">

				<!-- glow -->
				<div class="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#ef4444]/10 blur-[140px] pointer-events-none"></div>

				<div class="max-w-[1200px] mx-auto px-6">

						<span class="text-[#ef4444] text-xs font-bold uppercase tracking-[0.4em]">
								Customers
						</span>

						<h1 class="text-5xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] mt-6 mb-8">
								Trusted by revenue teams<br />
								operating at <span class="text-[#ef4444]">full velocity.</span>
						</h1>

						<p class="text-zinc-400 text-lg lg:text-xl max-w-3xl mx-auto">
								From high-growth startups to enterprise operators,
								teams use SpikedAI to execute sharper conversations,
								accelerate pipeline, and close with confidence.
						</p>

				</div>
		</section>

		<!-- Featured Customer Story -->
		<section class="py-24 lg:py-32">
				<div class="max-w-[1400px] mx-auto px-6">

						<div class="rounded-[3rem] border border-zinc-800 bg-zinc-950 p-10 lg:p-16">

								<Quote class="w-14 h-14 text-[#ef4444] mb-8 opacity-70" />

								<h2 class="text-3xl lg:text-5xl font-bold leading-tight max-w-4xl mb-10">
										“SpikedAI didn’t just improve our calls —
										it fundamentally upgraded how our revenue team operates.”
								</h2>

								<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">

										<div>
												<div class="text-xl font-bold">Sarah Connor</div>
												<div class="text-zinc-500 uppercase tracking-wider text-sm">
														VP Sales · Skynet Systems
												</div>
										</div>

										<button class="flex items-center gap-3 text-[#ef4444] font-bold group">
												Watch Customer Story
												<ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition" />
										</button>

								</div>

						</div>
				</div>
		</section>

		<!-- Logo Grid (Mockup) -->
		<section class="py-20 border-y border-zinc-900 bg-zinc-950/40">

				<div class="max-w-[1400px] mx-auto px-6 text-center">

						<p class="text-xs uppercase tracking-[0.35em] text-zinc-500 font-bold mb-12">
								Powering modern revenue organizations
						</p>

						<div class="flex flex-wrap justify-center gap-x-16 gap-y-8 text-zinc-600 font-bold text-lg">

								<span>ACME</span>
								<span>GLOBEX</span>
								<span>INITECH</span>
								<span>CYBERDYNE</span>
								<span>WAYNE</span>
								<span>STARK</span>

						</div>
				</div>
		</section>

		<!-- Customer Stories Grid -->
		<section class="py-32 px-4 sm:px-8">
			<div class="max-w-7xl mx-auto">
				<div class="text-center mb-20">
					<h2
						class="text-4xl sm:text-6xl font-black mb-6 {$themeStore === 'dark'
							? 'text-white'
							: 'text-zinc-900'}"
					>
						Success Stories
					</h2>
					<p class="text-xl text-zinc-500">Real results from real teams.</p>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{#each customers as customer}
						<div class="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 hover:border-[#ef4444]/40 transition-all">

							<Quote class="w-6 h-6 text-[#ef4444] mb-6 opacity-70" />

							<p class="text-lg text-zinc-300 leading-relaxed mb-8">
									"{customer.quote}"
							</p>

							<div class="border-t border-zinc-800 pt-6">
									<div class="font-bold">{customer.author}</div>
									<div class="text-sm text-zinc-500">
											{customer.role}
									</div>
									<div class="text-xs uppercase tracking-widest text-[#ef4444] mt-1">
											{customer.name}
									</div>
							</div>

					</div>

					{/each}
				</div>
			</div>
		</section>

		<!-- CTA -->
	<section class="py-32 lg:py-48 text-center">

			<h2 class="text-4xl lg:text-7xl font-black tracking-tighter mb-10">
					Build your revenue edge.
			</h2>

			<a
					href="/contact-sales"
					class="inline-flex items-center gap-4 bg-[#ef4444] px-10 py-5 rounded-full font-bold hover:scale-[1.03] transition"
			>
					Talk to Sales
					<ArrowRight class="w-5 h-5" />
			</a>

	</section>

	</main>
</div>
