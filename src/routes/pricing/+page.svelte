<script>
	import {
		Check,
		ArrowRight,
		User,
		Briefcase,
		Building2,
		Sparkles,
		Shield,
		Target,
		Cpu,
	} from "lucide-svelte";
	import { themeStore } from "$lib/stores/theme.js";
	import { fade, fly } from "svelte/transition";
	import Footer from "$lib/components/Footer.svelte";

	const plans = [
		{
			id: "starter",
			name: "Starter",
			price: "$0",
			priceSub: "/ month",
			tagline: "Explore the edge",
			desc: "For individuals curious about how to sell with authority and improve cognitive ability in live conversations.",
			features: [
				"Includes 600 minutes",
				"30-minute free guided setup",
				"Access to all core features",
				"Cognitive & Conversation capabilities",
				"48-hour response time support",
			],
			perfectFor: "Individuals curious about selling with authority.",
			cta: "Get Started",
			link: "https://vercel.spikedai.app/",
			highlight: false,
			icon: User,
			color: "from-zinc-500/20 to-transparent",
			borderColor: "border-white/10",
		},
		{
			id: "core",
			name: "Core",
			price: "$65",
			priceSub: "/ month",
			tagline: "Crush your numbers",
			desc: "Best for sales professionals managing multiple accounts who want to maximize pipeline and optimize performance.",
			features: [
				"Includes 1,320 minutes",
				"Two custom setup sessions",
				"$1 per additional 60 minutes",
				"Up to 10 users",
				"6–24 hour response time support",
			],
			perfectFor: "Sales professionals and small teams.",
			cta: "Start Scaling",
			link: "https://vercel.spikedai.app/",
			highlight: false,
			icon: Briefcase,
			color: "from-red-500/20 to-transparent",
			borderColor: "border-red-900/30",
		},
		{
			id: "enterprise",
			name: "Enterprise",
			price: "Contact Sales",
			priceSub: "Tailored for scale",
			tagline: "Total Dominance",
			desc: "Built for sales teams and leaders operating at scale. Designed to reduce revenue cycles, improve pipeline accuracy, and lower cognitive overload across teams. Custom plans available.",
			features: [
				"Tailored deployment & onboarding",
				"Revenue acceleration focus",
				"Consistent high-quality conversations",
				"Scalable cognitive augmentation",
				"Priority 6–24h support",
			],
			perfectFor: "Large sales organizations and leaders.",
			cta: "Get In Touch",
			link: "/contact-sales",
			highlight: true,
			icon: Building2,
			color: "from-amber-500/20 to-transparent",
			borderColor: "border-amber-500/50",
		},
	];

	const capabilityGroups = [
		{
			title: "Cognitive Hub",
			icon: Cpu,
			items: ["Live-Assist", "Answer Assist", "Intelli-Assist"],
		},
		{
			title: "Knowledge Hub",
			icon: Shield,
			items: [
				"Personalized Content",
				"Web Agent",
				"AI Tune-Up",
				"Personalization Hub",
				"Know Your Customer",
				"Account Intelligence",
				"Customer Persona",
				"Answer Style",
				"Customer Focus",
			],
		},
		{
			title: "Conversation Hub",
			icon: Sparkles,
			items: [
				"Real-time analysis",
				"Built-in templates",
				"Unlimited customization",
				"Email feature",
			],
		},
		{
			title: "Enterprise Hub",
			icon: Target,
			items: [
				"Bi directional sync",
				"CRM Management",
				"Technical Management",
				"Program Management",
			],
		},
	];
</script>

<div
	class="min-h-screen pt-32 bg-black text-white selection:bg-red-500 selection:text-white"
>
	<!-- Background Decorations -->
	<div class="fixed inset-0 overflow-hidden pointer-events-none">
		<div
			class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-900/20 blur-[120px] rounded-full"
		></div>
		<div
			class="absolute top-[40%] -right-[10%] w-[50%] h-[50%] bg-zinc-900/20 blur-[150px] rounded-full"
		></div>
	</div>

	<div class="max-w-[2200px] mx-auto px-6 md:px-12 relative z-10">
		<!-- Header -->
		<div class="text-center mb-24" in:fade={{ duration: 1000 }}>
			<div
				class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-6"
			>
				<Sparkles class="w-3 h-3" />
				<span>Investment for Growth</span>
			</div>
			<h1
				class="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
			>
				FUEL YOUR <span
					class="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-red-400"
					>GROWTH</span
				>
			</h1>
			<p
				class="text-zinc-200 text-2xl max-w-2xl mx-auto font-medium leading-relaxed"
			>
				Unlimited capture for everyone.
				<span
					class="text-white underline decoration-red-500/50 underline-offset-8"
					>Intelligence for those who close.</span
				>
			</p>
		</div>

		<!-- Pricing Cards -->
		<div class="grid lg:grid-cols-4 gap-8 w-full mb-40 items-stretch">
			{#each plans as plan, i}
				<div
					in:fly={{ y: 50, delay: 150 * i, duration: 800 }}
					class="group relative flex flex-col p-8 md:p-10 rounded-[3rem] bg-zinc-900/40 border-2 transition-all duration-700 backdrop-blur-sm
                        {plan.borderColor} {plan.id === 'enterprise'
						? 'lg:col-span-2'
						: 'lg:col-span-1'} {plan.highlight
						? 'shadow-[0_0_50px_rgba(245,158,11,0.1)] active:scale-[0.98]'
						: 'hover:border-white/20 active:scale-[0.98]'}"
				>
					<!-- Inner Gradient Glow -->
					<div
						class="absolute inset-0 bg-gradient-to-br {plan.color} rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
					></div>

					{#if plan.highlight}
						<div
							class="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-black uppercase tracking-widest px-6 py-1.5 rounded-full shadow-lg shadow-amber-500/20 z-20"
						>
							Most Strategic
						</div>
					{/if}

					<!-- Icon & Title -->
					<div class="flex items-center justify-between mb-8">
						<div
							class="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-500 shadow-xl"
						>
							<plan.icon
								class="w-6 h-6 {plan.highlight
									? 'text-amber-500'
									: 'text-zinc-300'}"
							/>
						</div>
						<div class="text-right">
							<span
								class="text-sm font-black uppercase tracking-[0.2em] text-zinc-400"
								>{plan.name}</span
							>
							<div
								class="h-1 w-8 bg-zinc-700 ml-auto mt-1 rounded-full overflow-hidden"
							>
								<div
									class="h-full bg-red-500 transition-all duration-1000 w-0 group-hover:w-full"
								></div>
							</div>
						</div>
					</div>

					<!-- Price -->
					<div class="mb-2">
						<div class="flex items-baseline gap-2">
							<span
								class="text-6xl font-black tracking-tighter text-white group-hover:text-red-500 transition-colors duration-500"
								>{plan.price}</span
							>
							<span class="text-zinc-400 text-xl font-bold"
								>{plan.priceSub}</span
							>
						</div>
						<p
							class="text-red-500/80 text-xs font-black uppercase tracking-widest mt-2"
						>
							{plan.tagline}
						</p>
					</div>

					<!-- Desc -->
					<p
						class="text-white text-base leading-relaxed mb-10 mt-6 font-medium min-h-[4rem]"
					>
						{plan.desc}
					</p>

					<!-- Features -->
					<div class="flex-1 mb-12">
						<h4
							class="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-4"
						>
							Capabilities Included:
						</h4>
						<ul class="space-y-5">
							{#each plan.features as feature}
								<li class="flex items-start gap-4 group/item">
									<div
										class="mt-1 w-5 h-5 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover/item:border-red-500 group-hover/item:bg-red-500/10 transition-all duration-300"
									>
										<Check
											class="w-3 h-3 text-zinc-500 group-hover/item:text-red-500 transition-colors"
										/>
									</div>
									<span
										class="text-base text-zinc-200 group-hover/item:text-white transition-colors leading-snug"
										>{feature}</span
									>
								</li>
							{/each}
						</ul>
					</div>

					<!-- CTA Section -->
					<div class="pt-8 border-t border-white/5">
						<a
							href={plan.link}
							class="flex items-center justify-between p-2 pl-8 rounded-full border-2 transition-all duration-500 group/btn
                                {plan.highlight
								? 'bg-amber-500 border-amber-600 text-black hover:bg-white hover:border-white'
								: 'bg-white/5 border-white/10 text-white hover:bg-white hover:text-black hover:border-white'}"
						>
							<span class="font-black text-[13px] uppercase tracking-widest"
								>{plan.cta}</span
							>
							<div
								class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-xl
                                {plan.highlight
									? 'bg-black text-white group-hover/btn:bg-black'
									: 'bg-white text-black'}"
							>
								<ArrowRight
									class="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
								/>
							</div>
						</a>
						{#if plan.perfectFor}
							<p
								class="text-xs text-zinc-400 mt-4 text-center font-bold uppercase tracking-wide"
							>
								{plan.perfectFor}
							</p>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		<!-- Platform Capabilities Section -->
		<div class="mb-40 pt-20 relative overflow-hidden">
			<!-- Decorative Background for Capabilities -->
			<div
				class="absolute inset-0 bg-zinc-900/20 rounded-[4rem] border border-white/5 -z-10"
			></div>

			<div class="text-center mb-20">
				<div
					class="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6"
				>
					Full Platform Access
				</div>
				<h2
					class="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4"
				>
					The <span class="text-red-500">Cognitive</span> Suite
				</h2>
				<p class="text-zinc-300 text-xl">
					Integrated intelligence across the entire revenue funnel.
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 px-10 pb-20">
				{#each capabilityGroups as group}
					<div class="group/cap">
						<div class="flex items-center gap-4 mb-8">
							<div
								class="w-10 h-10 rounded-xl bg-zinc-800 border border-white/5 flex items-center justify-center group-hover/cap:bg-red-500/20 group-hover/cap:border-red-500/30 transition-all duration-500"
							>
								<group.icon
									class="w-5 h-5 text-zinc-400 group-hover/cap:text-red-500 transition-colors"
								/>
							</div>
							<h3
								class="text-lg font-black text-white uppercase tracking-tight"
							>
								{group.title}
							</h3>
						</div>
						<ul class="space-y-4">
							{#each group.items as item}
								<li
									class="text-base font-medium text-zinc-300 hover:text-white transition-all duration-300 flex items-center gap-3 group/item-li"
								>
									<div
										class="w-2 h-2 bg-zinc-700 rounded-full group-hover/item-li:bg-red-500 transition-colors"
									></div>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>

		<!-- FAQ CTA -->
		<div class="text-center py-32 border-t border-white/5">
			<h3 class="text-5xl font-black tracking-tighter uppercase mb-6">
				Need a custom setup?
			</h3>
			<p class="mb-12 text-zinc-400 text-xl max-w-xl mx-auto leading-relaxed">
				Our revenue architects can help design a bespoke deployment for your
				global teams.
			</p>
			<div class="flex flex-col sm:flex-row gap-6 justify-center">
				<a
					href="/contact-sales"
					class="px-12 py-5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-red-500 hover:scale-105 transition-all shadow-2xl shadow-red-500/20"
					>Talk to Sales</a
				>
				<a
					href="/#faq"
					class="px-12 py-5 border-2 border-zinc-800 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white hover:border-white transition-all"
					>Implementation FAQ</a
				>
			</div>
		</div>
	</div>
	<Footer />
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	:global(body) {
		font-family: "Space Grotesk", sans-serif;
		background-color: #000;
	}

	/* Subpixel text rendering for dark backgrounds */
	.text-zinc-100,
	.text-zinc-300,
	.text-zinc-400 {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	@keyframes float {
		0% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
		100% {
			transform: translateY(0px);
		}
	}
</style>
