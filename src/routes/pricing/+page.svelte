<script>
	import {
		ChevronRight,
		User,
		Briefcase,
		Building2,
		Cpu,
		Shield,
		Sparkles,
		Target,
		Book,
		Check,
		Minus,
	} from "lucide-svelte";
	import { fade, fly, slide } from "svelte/transition";

	const plans = [
		{
			id: "starter",
			name: "Starter",
			price: "$0",
			priceSub: "/month",
			tagline: "INDIVIDUALS FOR FREE",
			desc: "For individuals curious about how to sell with authority and improve cognitive ability in live conversations.",
			features: [
				"Includes 600 minutes",
				"30-minute free guided setup",
				"Access to all core features",
				"Cognitive & Conversation capabilities",
				"48-hour response time support",
			],
			perfectFor: "Individuals + Small Teams",
			cta: "Get Started",
			link: "https://app.spiked.ai",
			highlight: false,
			icon: User,
			accentColor: "#3f3f46",
		},
		{
			id: "core",
			name: "Core",
			price: "$65",
			priceSub: "/month",
			tagline: "UNLOCK YOUR PROCESS",
			desc: "Best for sales professionals managing multiple accounts who want to maximize pipeline and optimize performance.",
			features: [
				"Includes 1,320 minutes",
				"Two custom setup sessions",
				"$1 per additional 60 minutes",
				"Up to 10 users",
				"6–24 hour response time support",
			],
			perfectFor: "Sales Professionals",
			cta: "Start Scaling",
			link: "https://app.spiked.ai",
			highlight: true,
			icon: Briefcase,
			accentColor: "#ef4444",
		},
		{
			id: "enterprise",
			name: "Enterprise",
			price: "Custom",
			priceSub: "",
			tagline: "TAILORED FOR SCALE",
			desc: "Built for sales teams and leaders operating at scale. Designed to reduce revenue cycles and lower cognitive overload.",
			features: [
				"Tailored deployment & onboarding",
				"Cognitive Intelligence focus",
				"Consistent high-quality conversations",
				"Scalable cognitive augmentation",
				"Priority 2–6 hour support",
			],
			perfectFor: "Large Organizations",
			cta: "Contact Sales",
			link: "/contact-sales",
			highlight: false,
			icon: Building2,
			accentColor: "#3f3f46",
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
			items: ["Personalized Content", "Web Agent", "AI Tune-Up"],
		},
		{
			title: "Customer Hub",
			icon: User,
			items: ["Know Your Customer", "Intelligence", "Dynamic Research"],
		},
		{
			title: "Conversation Hub",
			icon: Sparkles,
			items: ["Real-time Analysis", "Built-in Templates", "Customization"],
		},
	];

	const faqs = [
		{
			q: "What happens after my free minutes run out?",
			a: "On the Starter plan, you can upgrade to Core for continued usage. Core plan users pay $1 per additional 60 minutes on a pay-as-you-consume basis.",
		},
		{
			q: "Can I switch plans at any time?",
			a: "Yes. You can upgrade or downgrade at any point. Changes take effect immediately and billing is prorated.",
		},
		{
			q: "What does the guided setup include?",
			a: "Our team walks you through platform configuration, CRM integration, knowledge base setup, and best practices tailored to your sales workflow.",
		},
	];

	let openFaq = $state(null);

	function toggleFaq(index) {
		openFaq = openFaq === index ? null : index;
	}
</script>

<svelte:head>
	<title>Pricing | SpikedAI</title>
</svelte:head>

<div
	class="min-h-screen bg-black text-white font-sans selection:bg-[#ef4444]/30"
>
	<!-- Hero -->
	<section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
		<!-- Background Grid/Atmosphere -->
		<div class="absolute inset-0 -z-10 opacity-30">
			<div
				class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_transparent_80%)]"
			></div>
		</div>

		<div class="max-w-[1920px] mx-auto px-6 lg:px-12 text-center">
			<span
				class="inline-block text-[#ef4444] text-xs font-bold uppercase tracking-[0.4em] mb-6"
				>Transparent Value</span
			>
			<h1
				class="text-5xl lg:text-7xl xl:text-8xl font-black mb-8 tracking-tighter leading-none"
			>
				PLANS BUILT FOR<br />
				<span class="text-[#ef4444]">REVENUE GROWTH</span>
			</h1>
			<p
				class="text-zinc-500 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
			>
				Everything you need to amplify cognitive ability and close deals with
				authority. Unlimited platform access on every plan.
			</p>
		</div>
	</section>

	<!-- Pricing Cards -->
	<section class="pb-24 lg:pb-40">
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<div class="grid lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
				{#each plans as plan}
					<div
						class="flex flex-col rounded-[2.5rem] p-10 bg-zinc-900/30 border-2 transition-all duration-300 {plan.highlight
							? 'border-[#ef4444] shadow-[0_0_50px_-12px_rgba(239,68,68,0.3)] bg-zinc-900/60'
							: 'border-zinc-800 hover:border-zinc-700'}"
					>
						<div class="mb-10">
							<div class="flex items-center gap-3 mb-6">
								<div
									class="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center"
								>
									<plan.icon
										class="w-5 h-5 {plan.highlight
											? 'text-[#ef4444]'
											: 'text-zinc-500'}"
									/>
								</div>
								<span
									class="text-[10px] font-bold uppercase tracking-widest {plan.highlight
										? 'text-[#ef4444]'
										: 'text-zinc-500'}">{plan.name}</span
								>
							</div>
							<div class="flex items-baseline gap-1 mb-2">
								<span
									class="text-5xl lg:text-6xl font-black tracking-tighter leading-none"
									>{plan.price}</span
								>
								<span class="text-zinc-500 font-bold">{plan.priceSub}</span>
							</div>
							<p
								class="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-6"
							>
								{plan.tagline}
							</p>
							<p class="text-zinc-500 text-sm leading-relaxed">{plan.desc}</p>
						</div>

						<div class="mt-auto">
							<hr class="border-zinc-800/50 mb-8" />
							<ul class="space-y-4 mb-10">
								{#each plan.features as feature}
									<li class="flex items-start gap-3">
										<Check class="w-4 h-4 text-[#ef4444] mt-0.5" />
										<span class="text-sm font-medium text-zinc-300"
											>{feature}</span
										>
									</li>
								{/each}
							</ul>

							<a
								href={plan.link}
								class="w-full py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all text-center block
									{plan.highlight
									? 'bg-[#ef4444] text-white hover:bg-white hover:text-black'
									: 'bg-white text-black hover:bg-[#ef4444] hover:text-white'}"
							>
								{plan.cta}
							</a>
							<p
								class="text-center text-[10px] text-zinc-600 font-bold mt-4 uppercase tracking-wider"
							>
								{plan.perfectFor}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Value Banner (Light) -->
	<section
		class="py-24 bg-white text-zinc-900 rounded-t-[4rem] lg:rounded-t-[6rem]"
	>
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12 text-center">
			<h2
				class="text-4xl lg:text-6xl xl:text-7xl font-black mb-12 tracking-tighter"
			>
				THE COGNITIVE EDGE IS<br />BUILT INTO EVERY PLAN.
			</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
				{#each capabilityGroups as group}
					<div class="text-left">
						<div
							class="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center mb-6"
						>
							<group.icon class="w-6 h-6 text-[#ef4444]" />
						</div>
						<h4 class="font-bold text-lg mb-4">{group.title}</h4>
						<ul class="space-y-2">
							{#each group.items as item}
								<li
									class="text-zinc-500 text-sm font-medium flex items-center gap-2"
								>
									<div class="w-1 h-1 rounded-full bg-zinc-300"></div>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section
		class="py-24 lg:py-40 bg-zinc-50 text-zinc-900 border-t border-zinc-100"
	>
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<div class="grid lg:grid-cols-2 gap-20">
				<div>
					<span
						class="text-[#ef4444] text-xs font-bold uppercase tracking-[0.3em] mb-4 block"
						>Quick Answers</span
					>
					<h2
						class="text-4xl lg:text-5xl font-black tracking-tight leading-none mb-8"
					>
						FREQUENTLY ASKED<br />QUESTIONS.
					</h2>
					<p class="text-zinc-500 text-lg leading-relaxed">
						Everything you need to know about Spiked AI pricing and features.
						Can't find it? <a
							href="/contact-sales"
							class="text-[#ef4444] font-bold">Talk to us.</a
						>
					</p>
				</div>
				<div class="space-y-4">
					{#each faqs as faq, i}
						<div
							class="rounded-3xl border border-zinc-200 bg-white overflow-hidden"
						>
							<button
								class="w-full flex items-center justify-between p-8 text-left group"
								onclick={() => toggleFaq(i)}
							>
								<span
									class="font-bold text-lg transition-colors group-hover:text-[#ef4444]"
									>{faq.q}</span
								>
								<div
									class="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center transition-transform {openFaq ===
									i
										? 'rotate-180'
										: ''}"
								>
									<ChevronRight class="w-4 h-4 rotate-90" />
								</div>
							</button>
							{#if openFaq === i}
								<div
									class="px-8 pb-8 text-zinc-500 leading-relaxed text-sm lg:text-base"
									in:slide
								>
									{faq.a}
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	:global(body) {
		background: black;
	}
</style>
