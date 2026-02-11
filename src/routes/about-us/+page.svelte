<script>
	const photo = (file) => `/Photos/${encodeURIComponent(file)}`;
	import {
		ChevronRight,
		Users,
		Rocket,
		Shield,
		Target,
		ArrowRight,
	} from "lucide-svelte";
	import { fade, fly } from "svelte/transition";

	const highlights = [
		{
			title: "Operator-led pods",
			copy: "Small, hands-on builders who ship beside you.",
			icon: Users,
		},
		{
			title: "AI-first workflows",
			copy: "Reasoning-grade UX that feels like a teammate.",
			icon: Rocket,
		},
		{
			title: "Enterprise-ready delivery",
			copy: "Security, governance, and quality by default.",
			icon: Shield,
		},
	];

	const teamMembers = [
		{
			name: "Avi Sahi",
			background: "KoreAI, Salesforce",
			focus: "Product",
			image: photo("Avi Sahi.jpeg"),
			role: "CEO, Co-Founder",
			description: "Directs product strategy and AI workflow rollouts.",
			tags: ["Product thinking", "AI workflows"],
		},
		{
			name: "Ginniee Singh",
			background: "AWS, Microsoft",
			focus: "Go to Market",
			image: photo("Ginniee Sahi.jpeg"),
			role: "Advisor, Co-Founder",
			description: "Drives Go to Market execution and operator enablement.",
			tags: ["Go to Market", "Customers", "Partnerships"],
		},
		{
			name: "Tom Davenport",
			background: "Babson, MIT, Harvard",
			focus: "AI Strategy",
			image: photo("Tom Davenport.png"),
			role: "AI Strategy",
			description:
				"Leads executive AI strategy and governance for enterprise programs.",
			tags: ["Applied AI", "Strategy"],
		},
		{
			name: "Praneet Gill",
			background: "KoreAI, AI Circle",
			focus: "Go to Market",
			image: photo("Praneet Gill.jpeg"),
			role: "Go to Market",
			description: "Runs Go to Market motions and customer programs.",
			tags: ["Go to Market", "Customers"],
		},
		{
			name: "Kaveesh Manchanda",
			background: "Google, Microsoft",
			focus: "Partnerships",
			image: photo("Kaveesh Manchanda.jpeg"),
			role: "VP Partnerships",
			description:
				"Heads engineering reliability and secure platform delivery.",
			tags: ["Partnerships", "Go to Market", "Customers"],
		},
	];

	const commitments = [
		{
			id: "01",
			title: "Embedded partnership",
			description:
				"We join your Go to Market, product, and engineering rhythms.",
		},
		{
			id: "02",
			title: "Quality with velocity",
			description: "Tight release cycles with crisp demos every week.",
		},
		{
			id: "03",
			title: "Measurable lift",
			description: "Everything ladders to activation, usage, and revenue.",
		},
	];

	const pillars = [
		{
			title: "Think in workflows",
			body: "We map the revenue journey end-to-end so AI augments every interaction instead of adding noise.",
		},
		{
			title: "Ship small, learn fast",
			body: "Weekly releases, real adoption data, and direct time with users to keep solutions sharp.",
		},
		{
			title: "Own the rollout",
			body: "Enablement, playbooks, and instrumentation are part of the build—not an afterthought.",
		},
	];

	const extendedCollaborators = [
		{
			name: "Amazon AI CTO",
			role: "Strategic Advisor",
			logo: "/logos/amazon-icon-white.png",
			logoalt: "/logos/amazon-icon.png",
			description:
				"Advises on secure foundation models and enterprise-grade guardrails.",
		},
		{
			name: "NVIDIA AI Architect",
			role: "Storyteller & Systems Design",
			logo: "/logos/nvidia icon white.png",
			logoalt: "/logos/nvidia-icon.svg",
			description:
				"Shapes the GPU-native architecture behind production rollouts.",
		},
	];
</script>

<svelte:head>
	<title>About Us | SpikedAI</title>
</svelte:head>

<div
	class="min-h-screen bg-black text-white font-sans selection:bg-[#ef4444]/30"
>
	<!-- Hero Section -->
	<section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
		<!-- Background Glow -->
		<div
			class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full -z-10"
		>
			<div
				class="absolute top-0 left-1/4 w-96 h-96 bg-[#ef4444]/10 rounded-full blur-[120px]"
			></div>
			<div
				class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]"
			></div>
		</div>

		<div class="max-w-[1920px] mx-auto px-6 lg:px-12 text-center">
			<span
				class="inline-block text-[#ef4444] text-xs font-bold uppercase tracking-[0.4em] mb-6"
				in:fade={{ delay: 100 }}>Our Mission</span
			>
			<h1
				class="text-5xl lg:text-7xl xl:text-8xl font-black mb-8 tracking-tighter leading-[0.95]"
				in:fly={{ y: 20, duration: 600 }}
			>
				OPERATORS BUILDING<br />
				<span class="text-[#ef4444]">REVENUE AI</span> THAT<br />
				FEELS SHARP.
			</h1>
			<p
				class="text-zinc-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-12"
				in:fade={{ delay: 300 }}
			>
				We’re founders and operators who sit with customers, listen to calls,
				and ship applied AI built for the moments that move revenue. Our core
				team closed more than $1M in ARR.
			</p>
			<div class="flex flex-wrap justify-center gap-4" in:fade={{ delay: 400 }}>
				<div
					class="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-bold tracking-wide"
				>
					Applied AI Studio
				</div>
				<div
					class="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-bold tracking-wide"
				>
					Builder-led Pods
				</div>
				<div
					class="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-bold tracking-wide"
				>
					Enterprise Ready
				</div>
			</div>
		</div>
	</section>

	<!-- Highlights Grid -->
	<section class="py-24 border-y border-zinc-900 bg-zinc-950/30">
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<div class="grid md:grid-cols-3 gap-8 lg:gap-12">
				{#each highlights as item}
					<div
						class="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/50 hover:border-[#ef4444]/30 transition-all group"
					>
						<div
							class="w-12 h-12 rounded-xl bg-[#ef4444]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
						>
							<item.icon class="w-6 h-6 text-[#ef4444]" />
						</div>
						<h3 class="text-xl font-bold mb-3">{item.title}</h3>
						<p class="text-zinc-400 leading-relaxed text-sm lg:text-base">
							{item.copy}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Team Section -->
	<section class="py-24 lg:py-32">
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<div
				class="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16 lg:mb-24"
			>
				<div class="max-w-3xl">
					<span
						class="text-[#ef4444] text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
						>The Core Team</span
					>
					<h2
						class="text-4xl lg:text-6xl font-black tracking-tight leading-tight"
					>
						Revenue leadership for<br />
						the decisive second.
					</h2>
				</div>
				<div class="lg:mb-4">
					<p class="text-zinc-500 font-medium italic">
						"Revenue outcomes are shaped in seconds."
					</p>
				</div>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
				{#each teamMembers as member}
					<div class="group relative">
						<div
							class="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 bg-zinc-900"
						>
							<img
								src={member.image}
								alt={member.name}
								class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"
							></div>
						</div>
						<div class="px-2">
							<div class="flex items-center justify-between mb-2">
								<h3 class="text-2xl font-black">{member.name}</h3>
								<span
									class="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-2 py-1 border border-zinc-800 rounded"
									>{member.focus}</span
								>
							</div>
							<p
								class="text-[#ef4444] text-sm font-bold uppercase tracking-wider mb-4"
							>
								{member.role} —
								<span class="text-zinc-500 font-medium"
									>{member.background}</span
								>
							</p>
							<p
								class="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2 group-hover:line-clamp-none transition-all"
							>
								{member.description}
							</p>
							<div class="flex flex-wrap gap-2">
								{#each member.tags as tag}
									<span
										class="text-[10px] font-bold text-zinc-600 bg-zinc-900/50 px-2.5 py-1 rounded-full border border-zinc-800/50"
										>{tag}</span
									>
								{/each}
							</div>
						</div>
					</div>
				{/each}

				<!-- Advisory Bench Link-style card -->
				<button
					class="group rounded-[2.5rem] bg-zinc-900/30 border-2 border-dashed border-zinc-800 flex flex-col items-center justify-center p-12 text-center hover:bg-zinc-900/50 hover:border-[#ef4444]/30 transition-all cursor-pointer"
					onclick={() => {
						window.scrollTo({
							top: document.getElementById("advisor").offsetTop,
							behavior: "smooth",
						})
					}}
				>
					<div class="flex -space-x-4 mb-8">
						{#each extendedCollaborators as col}
							<div
								class="w-16 h-16 rounded-full bg-black border-4 border-zinc-900 flex items-center justify-center overflow-hidden"
							>
								<img
									src={col.logo}
									alt={col.name}
									class="w-10 h-10 object-contain p-2"
								/>
							</div>
						{/each}
					</div>
					<h3 class="text-2xl font-bold mb-3">Advisory Bench</h3>
					<p class="text-zinc-500 text-sm mb-6">
						Tapping trusted partners from Amazon, NVIDIA, and Microsoft to
						pressure test architecture.
					</p>
					<div
						class="flex items-center gap-2 text-[#ef4444] font-bold text-sm uppercase tracking-widest group-hover:gap-3 transition-all"
					>
						View Advisor network <ArrowRight class="w-4 h-4" />
					</div>
				</button>
			</div>
		</div>
	</section>

	<!-- Advisory Bench -->
	<section class="py-24 lg:py-32 border-t border-zinc-900">
			<div class="max-w-[1920px] mx-auto px-6 lg:px-12" id="advisor">

					<div class="max-w-3xl mb-16">
							<span class="text-[#ef4444] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
									Advisory Bench
							</span>

							<h2 class="text-4xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
									Trusted operators behind the architecture.
							</h2>

							<p class="text-zinc-400 text-lg">
									We pressure-test platform design, security, and narrative with
									advisors who’ve scaled the world’s most advanced AI systems.
							</p>
					</div>

					<div class="grid md:grid-cols-2 gap-8">
							{#each extendedCollaborators as person}
									<div class="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-[#ef4444]/30 transition-all">
											
											<div class="flex items-center gap-5 mb-6">
													<div class="w-14 h-14 rounded-xl bg-white flex items-center justify-center">
															<img
																	src={person.logoalt}
																	alt={person.name}
																	class="w-9 h-9 object-contain"
															/>
													</div>

													<div>
															<h3 class="text-xl font-bold">{person.name}</h3>
															<p class="text-sm text-zinc-500 font-semibold">
																	{person.role}
															</p>
													</div>
											</div>

											<p class="text-zinc-400 leading-relaxed mb-6">
													{person.description}
											</p>

											<div class="flex flex-wrap gap-2">
													{#each person.tags as tag}
															<span class="text-[11px] font-bold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
																	{tag}
															</span>
													{/each}
											</div>

									</div>
							{/each}
					</div>

			</div>
	</section>

	<!-- How We Work -->
	<section class="py-24 lg:py-40 bg-zinc-950 border-y border-zinc-900">
			<div class="max-w-[1920px] mx-auto px-6 lg:px-12">

					<div class="grid lg:grid-cols-2 gap-20 items-start">

							<div>
									<span class="text-[#ef4444] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
											How We Work
									</span>

									<h2 class="text-4xl lg:text-6xl font-black tracking-tight leading-tight mb-8">
											We out-ship the market with discipline.
									</h2>

									<p class="text-zinc-400 text-lg">
											Embedded with customer teams, shipping weekly,
											and measuring what actually moves revenue.
									</p>
							</div>

							<div class="space-y-6">
									{#each commitments as item}
											<div class="flex gap-5 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
													
													<div class="text-3xl font-black text-[#ef4444] w-12">
															{item.id}
													</div>

													<div>
															<h4 class="text-xl font-bold mb-1">
																	{item.title}
															</h4>

															<p class="text-zinc-400">
																	{item.description}
															</p>
													</div>

											</div>
									{/each}
							</div>

					</div>
			</div>
	</section>

	<!-- Operating Principles -->
	<section
		class="py-24 lg:py-40 bg-white text-zinc-900 rounded-[3rem] lg:rounded-[5rem] overflow-hidden ml-4 mr-4 mb-4"
	>
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<div class="grid lg:grid-cols-2 gap-20 items-center">
				<div>
					<span
						class="text-[#ef4444] text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
						>Operating Principles</span
					>
					<h2
						class="text-4xl lg:text-6xl font-black tracking-tighter leading-none mb-8"
					>
						Everything we build is designed for <span
							class="text-zinc-400 italic font-medium">measurable, durable</span
						> revenue impact.
					</h2>
					<p class="text-zinc-600 text-lg leading-relaxed mb-12">
						We stay close to the frontlines and keep the work clean, fast, and
						measurable. We map the revenue journey end-to-end so AI augments
						every interaction instead of adding noise.
					</p>
					<div class="space-y-6">
						<div class="flex items-start gap-4">
							<div
								class="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0"
							>
								<Target class="w-5 h-5 text-[#ef4444]" />
							</div>
							<div>
								<h4 class="font-bold text-xl mb-1">Think in Workflows</h4>
								<p class="text-zinc-500 text-sm">
									We don't build features, we solve bottlenecks in the sales
									journey.
								</p>
							</div>
						</div>
						<div class="flex items-start gap-4">
							<div
								class="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0"
							>
								<Rocket class="w-5 h-5 text-[#ef4444]" />
							</div>
							<div>
								<h4 class="font-bold text-xl mb-1">Ship Small, Learn Fast</h4>
								<p class="text-zinc-500 text-sm">
									Weekly releases ensure we're always aligned with actual user
									needs.
								</p>
							</div>
						</div>
					</div>
				</div>
				<div class="relative">
					<div
						class="aspect-square rounded-[3rem] bg-zinc-100 overflow-hidden shadow-2xl"
					>
						<img
							src="/Photos/team.jpeg"
							alt="The Spiked Team"
							class="w-full h-full object-cover transition-all duration-1000"
						/>
					</div>
					<!-- Stats Overlays -->
					<div
						class="absolute -bottom-10 -left-10 bg-black text-white p-8 rounded-3xl shadow-2xl"
					>
						<div class="text-4xl font-black text-[#ef4444] mb-1">$1M+</div>
						<div
							class="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500"
						>
							ARR Operated
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Value Stats Banner (Minimal) -->
	<section class="py-20 bg-black">
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
				<div>
					<div class="text-4xl lg:text-6xl font-black mb-2 tracking-tighter">
						2006
					</div>
					<div
						class="text-xs font-bold text-zinc-500 uppercase tracking-widest"
					>
						Inception
					</div>
				</div>
				<div>
					<div class="text-4xl lg:text-6xl font-black mb-2 tracking-tighter">
						50+
					</div>
					<div
						class="text-xs font-bold text-zinc-500 uppercase tracking-widest"
					>
						Operators
					</div>
				</div>
				<div>
					<div class="text-4xl lg:text-6xl font-black mb-2 tracking-tighter">
						100k+
					</div>
					<div
						class="text-xs font-bold text-zinc-500 uppercase tracking-widest"
					>
						Signals/Day
					</div>
				</div>
				<div>
					<div class="text-4xl lg:text-6xl font-black mb-2 tracking-tighter">
						24/7
					</div>
					<div
						class="text-xs font-bold text-zinc-500 uppercase tracking-widest"
					>
						Coaching
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Final CTA -->
	<section class="py-24 lg:py-48 relative overflow-hidden">
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12 text-center relative z-10">
			<h2 class="text-4xl lg:text-7xl font-black mb-10 tracking-tighter">
				READY TO AMP UP?
			</h2>
			<div class="flex flex-col sm:flex-row justify-center gap-6">
				<a
					href="/contact-sales"
					class="px-10 py-5 bg-[#ef4444] text-white font-black rounded-full hover:bg-black border border-[#ef4444] transition-all flex items-center justify-center gap-3 group"
				>
					TALK TO SALES
					<ArrowRight
						class="w-5 h-5 group-hover:translate-x-2 transition-transform"
					/>
				</a>
				<a
					href="/pricing"
					class="px-10 py-5 bg-transparent text-white border border-zinc-800 font-black rounded-full hover:bg-zinc-900 transition-all"
				>
					VIEW PRICING
				</a>
			</div>
		</div>
		<!-- Background Effects -->
		<div
			class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-[#ef4444]/10 to-transparent -z-10"
		></div>
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
