<script>
	import { onMount } from "svelte";
	import { themeStore } from "$lib/stores/theme.js";
	import Footer from "$lib/components/Footer.svelte";
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
		? 'bg-[#030712] text-zinc-100'
		: 'bg-white text-zinc-900'}"
>
	<main
		class="relative z-10 w-full overflow-hidden max-w-[1900px] mx-auto bg-transparent pb-32"
	>
		<!-- Hero Section -->
		<section class="relative w-full py-32 px-4 sm:px-8 text-center">
			<div class="absolute inset-0 opacity-20 pointer-events-none">
				<div
					class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(220,38,38,0.15)_0%,transparent_60%)]"
				></div>
			</div>

			<h1
				class="font-black tracking-tighter mb-8 text-white"
				style="font-size: clamp(3rem, 8vw, 6rem); line-height: 0.9;"
			>
				Trusted by the world's<br />
				<span class="text-red-600">fastest growing teams.</span>
			</h1>
			<p
				class="text-xl sm:text-2xl font-medium text-zinc-400 max-w-3xl mx-auto leading-relaxed"
			>
				See how leading revenue organizations are using SpikedAI to transform
				their sales performance.
			</p>
		</section>

		<!-- Featured Customer Story -->
		<section class="w-full relative py-20 px-4 sm:px-8">
			<div class="max-w-7xl mx-auto">
				<div
					class="relative rounded-[2.5rem] border border-red-900/30 p-8 sm:p-20 overflow-hidden group
                    {$themeStore === 'dark'
						? 'bg-[#050915]'
						: 'bg-white shadow-2xl'}"
				>
					<!-- Glow -->
					<div
						class="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 rounded-full blur-[100px] pointer-events-none"
					></div>

					<div
						class="relative z-10 flex flex-col lg:flex-row gap-16 items-center"
					>
						<div class="flex-1 space-y-8">
							<Quote class="w-16 h-16 text-red-600 opacity-50" />
							<h2
								class="text-3xl sm:text-5xl font-bold leading-tight
                                {$themeStore === 'dark'
									? 'text-white'
									: 'text-zinc-900'}"
							>
								"SpikedAI didn't just improve our calls, it fundamentally
								changed our sales culture. We are more data-driven, more
								prepared, and closing more deals than ever before."
							</h2>
							<div>
								<div
									class="text-xl font-bold {$themeStore === 'dark'
										? 'text-white'
										: 'text-zinc-900'}"
								>
									Sarah Connor
								</div>
								<div class="text-red-500 font-medium tracking-wide uppercase">
									VP of Sales, Skynet Systems
								</div>
							</div>
						</div>
						<div class="w-full lg:w-1/3 flex justify-center">
							<!-- Placeholder for Video or Image -->
							<div
								class="aspect-square w-full max-w-[400px] rounded-2xl bg-zinc-800 flex items-center justify-center relative overflow-hidden border border-zinc-700"
							>
								<span
									class="text-zinc-500 font-bold text-xl uppercase tracking-widest"
									>Featured Story</span
								>
								<!-- Imagine a video thumbnail here -->
								<div
									class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8"
								>
									<button
										class="flex items-center gap-3 text-white font-bold group-hover:gap-4 transition-all"
									>
										Watch Video <ArrowRight class="w-5 h-5" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Logo Grid (Mockup) -->
		<section
			class="py-20 px-4 sm:px-8 border-y border-zinc-800/30 {$themeStore ===
			'dark'
				? 'bg-black/20'
				: 'bg-zinc-50'}"
		>
			<div class="max-w-7xl mx-auto text-center">
				<p
					class="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 mb-12"
				>
					Powering Next-Gen Sales Teams
				</p>
				<div
					class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
				>
					<!-- Just using text placeholders for logos as per standard mocking -->
					{#each ["Acme", "Globex", "Soylent", "Initech", "Umbrella", "Cyberdyne", "Massive Dynamic", "Hooli", "Pied Piper", "Stark Ind", "Wayne Ent", "Oscorp"] as logo}
						<div
							class="h-16 flex items-center justify-center font-black text-xl {$themeStore ===
							'dark'
								? 'text-white'
								: 'text-zinc-900'}"
						>
							{logo}
						</div>
					{/each}
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
						<div
							class="rounded-3xl p-8 sm:p-10 border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-red-500/30 group
                            {$themeStore === 'dark'
								? 'bg-[#050915] border-zinc-800'
								: 'bg-white border-zinc-200'}"
						>
							<div class="mb-8 flex items-center justify-between">
								<div
									class="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold"
								>
									{customer.logo}
								</div>
								<Quote
									class="w-8 h-8 text-zinc-700 group-hover:text-red-600 transition-colors"
								/>
							</div>

							<p
								class="text-lg font-medium leading-relaxed mb-8 h-32
                                {$themeStore === 'dark'
									? 'text-zinc-300'
									: 'text-zinc-600'}"
							>
								"{customer.quote}"
							</p>

							<div class="pt-8 border-t border-zinc-800/50">
								<div
									class="font-bold {$themeStore === 'dark'
										? 'text-white'
										: 'text-zinc-900'}"
								>
									{customer.author}
								</div>
								<div class="text-sm text-zinc-500 uppercase tracking-wide">
									{customer.role}
								</div>
								<div class="text-xs font-bold text-red-600 mt-2">
									{customer.name}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- CTA -->
		<section
			class="w-full relative overflow-hidden flex flex-col justify-center items-center text-center py-32"
		>
			<h2
				class="font-black leading-[0.9] tracking-tighter mb-8 max-w-4xl
                {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}"
				style="font-size: clamp(3rem, 6vw, 6rem);"
			>
				Ready to separate from the pack?
			</h2>
			<a
				href="/contact-sales"
				class="bg-red-600 text-white font-bold rounded-full hover:bg-red-700 hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-xl px-12 py-6 text-xl"
			>
				Start Your SpikedAI Journey
				<ArrowRight class="w-6 h-6" />
			</a>
		</section>
	</main>
	<Footer />
</div>
