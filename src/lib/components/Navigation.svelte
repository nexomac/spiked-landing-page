<script>
	import { onDestroy, onMount } from "svelte";
	import { fade, fly } from "svelte/transition";
	import { page } from "$app/stores";
	import { onboardingStore } from "$lib/stores/onboarding.js";
	import { themeStore } from "$lib/stores/theme.js";
	import { User, ChevronDown, ChevronRight, Menu, X } from "lucide-svelte";

	let isScrolled = $state(false);
	let openDropdown = $state(null);
	let mobileMenuOpen = $state(false);
	const isLight = $derived($themeStore === "light");
	let menuTimer = null;

	const navigation = [
		{
			title: "Platform",
			categories: [
				{
					name: "Core System",
					items: [
						{
							name: "Cognitive Engine",
							desc: "Real-time AI reasoning, contextual answers, and decision support.",
							href: "/features/ai-assistance",
						},
						{
							name: "Knowledge Graph",
							desc: "Unified company knowledge with AI-tuned retrieval.",
							href: "/features/ai-assistance",
						},
						{
							name: "Customer Intelligence",
							desc: "Dynamic customer profiles with readiness signals.",
							href: "/features/crm",
						},
					],
				},
				{
					name: "Conversation Intelligence",
					items: [
						{
							name: "Conversation Hub",
							desc: "Live call analysis, templates, and automated follow-ups.",
							href: "/features/notetaker",
						},
						{
							name: "Smart Notetaker",
							desc: "Automated transcription, summaries, and CRM syncing.",
							href: "/features/notetaker",
						},
						{
							name: "Deal Intelligence",
							desc: "AI-driven deal risk detection and scoring.",
							href: "/features/sentiment",
						},
					],
				},
				{
					name: "Enablement & Learning",
					items: [
						{
							name: "Learning Hub",
							desc: "Simulations, coaching, and rep performance insights.",
							href: "/features/simulator",
						},
						{
							name: "Call Simulator",
							desc: "AI-powered practice environment for reps.",
							href: "/features/simulator",
						},
					],
				},
				{
					name: "Data & Integrations",
					items: [
						{
							name: "Enterprise Hub",
							desc: "Bi-directional CRM sync and workflow orchestration.",
							href: "/features/crm",
						},
						{
							name: "API Platform",
							desc: "Build custom integrations and automations.",
							href: "/features/dev-tools",
						},
						{
							name: "Webhooks",
							desc: "Trigger real-time events across your stack.",
							href: "/features/dev-tools",
						},
					],
				},
			],
		},
		{
			title: "For You",
			categories: [
				{
					name: "Recommended",
					items: [
						{
							name: "Best Starting Points",
							desc: "Core features teams adopt first.",
							href: "/features/ai-assistance",
						},
						{
							name: "Trending With Revenue Teams",
							desc: "What high-performing orgs are using.",
							href: "/features",
						},
					],
				},
				{
					name: "Based on Your Goals",
					items: [
						{
							name: "Close Deals Faster",
							desc: "Tools focused on acceleration and win rates.",
							href: "/features/sentiment",
						},
						{
							name: "Improve Rep Performance",
							desc: "Coaching and enablement workflows.",
							href: "/features/simulator",
						},
						{
							name: "Increase Pipeline Visibility",
							desc: "Forecasting and analytics tools.",
							href: "/features/sentiment",
						},
					],
				},
				{
					name: "Quick Wins",
					items: [
						{
							name: "5-Minute Setup Features",
							desc: "Fast integrations with immediate impact.",
							href: "/features/crm",
						},
						{
							name: "Automation Opportunities",
							desc: "Eliminate manual sales work instantly.",
							href: "/features/followup",
						},
					],
				},
			],
		},
		{
			title: "Products",
			categories: [
				{
					name: "AI Platform",
					items: [
						{
							name: "Spiked AI Core",
							desc: "Complete sales intelligence platform",
							href: "/features",
						},
						{
							name: "Knowledge Agent",
							desc: "Real-time AI answers from your docs",
							href: "/features/ai-assistance",
						},
					],
				},
				{
					name: "Analytics",
					items: [
						{
							name: "Pipeline Analytics",
							desc: "Revenue forecasting",
							href: "/features/sentiment",
						},
						{
							name: "Team Performance",
							desc: "Rep coaching insights",
							href: "/features/sentiment",
						},
						{
							name: "Custom Reports",
							desc: "Build your own dashboards",
							href: "/features/custom-goals",
						},
					],
				},
				{
					name: "Integrations",
					items: [
						{
							name: "Salesforce Connector",
							desc: "Native Salesforce integration",
							href: "/features/crm",
						},
						{
							name: "HubSpot Sync",
							desc: "Bi-directional HubSpot sync",
							href: "/features/crm",
						},
					],
				},
			],
		},
		{
			title: "Solutions",
			categories: [
				{
					name: "By Role",
					items: [
						{
							name: "Sales Leaders",
							desc: "Pipeline visibility and forecasting",
							href: "/features/sentiment",
						},
						{
							name: "Account Executives",
							desc: "Close more deals faster",
							href: "/features/ai-assistance",
						},
						{
							name: "Sales Engineers",
							desc: "Technical sales support",
							href: "/features/notetaker",
						},
						{
							name: "SDRs & BDRs",
							desc: "Prospect qualification",
							href: "/features/simulator",
						},
					],
				},
				{
					name: "By Use Case",
					items: [
						{
							name: "Call Coaching",
							desc: "Real-time guidance during calls",
							href: "/features/ai-assistance",
						},
						{
							name: "Deal Acceleration",
							desc: "Shorten sales cycles",
							href: "/features/sentiment",
						},
						{
							name: "Onboarding",
							desc: "Ramp new reps faster",
							href: "/features/simulator",
						},
						{
							name: "Revenue Operations",
							desc: "Streamline workflows",
							href: "/features/crm",
						},
					],
				},
			],
		},
		{
			title: "Resources",
			categories: [
				{
					name: "Research and News",
					items: [
						{
							name: "Research",
							desc: "Weekly AI strategies and trends",
							href: "/blog",
						},
						{
							name: "Customers",
							desc: "See how modern teams turn conversations into compounding growth",
							href: "/customers",
						},
						{
							name: "Events",
							desc: "Find Us at these upcoming Events and see SpikedAI in action",
							href: "/resources",
						},
						{
							name: "Video Resources",
							desc: "Watch how SpikedAI can transform your business.",
							href: "/resources#videos",
						}
					],
				},
			],
		}
	];

	let openSection = $state(null);

	let openTimer;
	let closeTimer;

	function handleMouseEnter(menu) {
		if (closeTimer) clearTimeout(closeTimer);
		if (openTimer) clearTimeout(openTimer);

		// If a menu is already open, switch immediately
		if (openDropdown) {
			openDropdown = menu;
			return;
		}

		openTimer = setTimeout(() => {
			openDropdown = menu;
		}, 200);
	}

	function handleMouseLeave() {
		if (openTimer) clearTimeout(openTimer);
		if (closeTimer) clearTimeout(closeTimer);

		closeTimer = setTimeout(() => {
			openDropdown = null;
		}, 300);
	}


	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	onDestroy(() => {
		if (typeof document !== "undefined") {
			document.documentElement.classList.remove("nav-locked");
		}
	});

	$effect(() => {
		if (typeof document !== "undefined") {
			document.documentElement.classList.toggle("nav-locked", mobileMenuOpen);
		}
	});

	function toggleMobileMenu(force) {
		if (typeof force === "boolean") {
			mobileMenuOpen = force;
		} else {
			mobileMenuOpen = !mobileMenuOpen;
		}

		if (!mobileMenuOpen) {
			openSection = null;
		}
	}
</script>

<!-- Navbar -->
<header class="sticky top-0 left-0 right-0 z-[40] transition-all duration-200">
	<nav class={isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-black"}>
		<div class="max-w-[1920px] mx-auto px-6 lg:px-12">
			<div class="flex items-center justify-between h-[60px]">
				<div class="flex items-center gap-10">
					<!-- Logo -->
					<a href="/" class="flex items-center gap-3 group py-2">
						<img
							src="/icon white.png"
							alt="Spiked AI"
							class="h-8 w-8 transition-all group-hover:scale-105"
						/>
						<div class="flex flex-col -space-y-1">
							<span
								class="text-white font-bold text-[19px] tracking-tight leading-none"
							>
								SPIKED<span class="text-[#ef4444]">AI</span>
							</span>
							<span
								class="text-zinc-500 text-[9px] font-semibold uppercase tracking-widest"
								>Cognitive Intelligence</span
							>
						</div>
					</a>

					<!-- Desktop Nav -->
					<div class="hidden lg:flex items-center gap-0.5">
						{#each navigation as menu}
							{#if menu.categories}
								<div
									class="relative dropdown-trigger"
									role="menuitem"
									tabindex="0"
									onmouseenter={() => handleMouseEnter(menu.title)}
									onmouseleave={handleMouseLeave}
								>
									<button
										class="flex items-center gap-1 px-4 py-2 text-[13px] font-medium transition-colors {openDropdown ===
										menu.title
											? 'text-[#ef4444]'
											: 'text-white/90 hover:text-white'}"
									>
										{menu.title}
										<span
											class="transition-transform duration-200 {openDropdown ===
											menu.title
												? 'rotate-180'
												: ''}"
										>
											<ChevronDown class="w-3 h-3" />
										</span>
									</button>

									{#if openDropdown === menu.title}
										<div
											class="fixed left-0 right-0 top-[60px] bg-white/90 backdrop-blur-sm shadow-xl border-t-[3px] border-[#ef4444] z-40"
											in:fly={{ y: -8, duration: 150 }}
										>
											<div
												class="max-w-[1920px] mx-auto px-10 lg:px-16 xl:px-24 py-8"
											>
												<div class="grid grid-cols-4 gap-x-10 gap-y-6">
													{#each menu.categories as category}
														<div>
															<h4
																class="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-4 pb-2 border-b border-zinc-200"
															>
																{category.name}
															</h4>
															<div class="space-y-2.5">
																{#each category.items as item}
																	<a
																		href={item.href || "#"}
																		class="block group py-1"
																	>
																		<div
																			class="flex items-start justify-between gap-2"
																		>
																			<div class="flex-1 min-w-0">
																				<div
																					class="text-[13px] font-semibold text-zinc-900 group-hover:text-[#ef4444] transition-colors truncate"
																				>
																					{item.name}
																				</div>
																				<p
																					class="text-[11px] text-zinc-500 mt-0.5 line-clamp-2"
																				>
																					{item.desc}
																				</p>
																			</div>
																			<ChevronRight
																				class="w-3 h-3 text-[#ef4444] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5"
																			/>
																		</div>
																	</a>
																{/each}
															</div>
														</div>
													{/each}
												</div>
											</div>
										</div>
									{/if}
								</div>
							{:else}
								<!-- Simple link item (no dropdown) -->
								<a
									href={menu.href}
									class="px-4 py-2 text-[13px] font-medium text-white/90 hover:text-white transition-colors"
								>
									{menu.title}
								</a>
							{/if}
						{/each}
					</div>
				</div>

				<!-- Right Nav -->
				<div class="hidden lg:flex items-center gap-6 xl:gap-7">
					<a
						href="/pricing"
						class="text-[13px] font-medium text-white/90 hover:text-white transition-colors"
						>Pricing</a
					>
					<a
						href="/about-us"
						class="text-[13px] font-medium text-white/90 hover:text-white transition-colors"
						>About Us</a
					>
					<a
						href="/contact-sales"
						class="text-[13px] font-medium text-white/90 hover:text-white transition-colors"
						>Contact Sales</a
					>
					<div class="flex items-center gap-5 ml-2">
						<a
							href="https://app.spiked.ai/login"
							class="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
							aria-label="Account"
						>
							<User class="w-[18px] h-[18px]" />
						</a>
					</div>
				</div>

				<!-- Mobile Menu Button -->
				<button
					class="lg:hidden text-white p-2"
					onclick={() => toggleMobileMenu()}
				>
					{#if mobileMenuOpen}
						<X class="w-6 h-6" />
					{:else}
						<Menu class="w-6 h-6" />
					{/if}
				</button>
			</div>
		</div>
	</nav>
</header>

<!-- Mobile Menu -->
{#if mobileMenuOpen}
	<div
		class="sticky inset-x-0 top-[60px] h-[calc(100dvh-60px)] 
		       bg-gradient-to-b from-zinc-900 to-black
		       overflow-y-auto z-[400]"
		in:fly={{ y: -12, duration: 160 }}
	>
		<div class="px-4 py-6 space-y-4 min-h-full">
			<!-- Navigation Sections -->
			{#each navigation as section}
				<div
					class="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg"
				>
					<button
						class="flex justify-between items-center w-full px-5 py-4 transition-colors {openSection ===
						section.title
							? 'bg-[#ef4444]/5'
							: 'hover:bg-zinc-50'}"
						onclick={() =>
							(openSection =
								openSection === section.title ? null : section.title)}
					>
						<span class="text-zinc-900 text-base font-bold">
							{section.title}
						</span>

						<div
							class="w-8 h-8 rounded-full flex items-center justify-center {openSection ===
							section.title
								? 'bg-[#ef4444]'
								: 'bg-zinc-100'}"
						>
							<ChevronDown
								class="w-4 h-4 transition-all duration-200 {openSection ===
								section.title
									? 'rotate-180 text-white'
									: 'text-zinc-600'}"
							/>
						</div>
					</button>

					<!-- Categories -->
					{#if openSection === section.title}
						<div class="px-5 pb-4 space-y-4">
							{#each section.categories as category}
								<div>
									<p
										class="text-[#ef4444] text-xs font-bold uppercase tracking-widest mb-3 mt-2"
									>
										{category.name}
									</p>

									<!-- Items -->
									<div class="space-y-1">
										{#each category.items as item}
											<a
												href={item.href || "#"}
												class="block text-zinc-700 hover:text-[#ef4444] hover:bg-[#ef4444]/5 py-2.5 px-3 text-sm font-medium rounded-lg transition-all"
											>
												{item.name}
											</a>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					{/if}
			</div>
			{/each}

			<!-- Primary Links -->
			<div class="bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg divide-y">
				<a
					href="/pricing"
					class="flex items-center justify-between px-5 py-4 text-zinc-900 font-semibold hover:bg-zinc-50 active:scale-[0.99] transition-all"
				>
					Pricing
					<span class="text-zinc-400">→</span>
				</a>

				<a
					href="/about-us"
					class="flex items-center justify-between px-5 py-4 text-zinc-900 font-semibold hover:bg-zinc-50 active:scale-[0.99] transition-all"
				>
					About Us
					<span class="text-zinc-400">→</span>
				</a>

				<a
					href="https://app.spiked.ai/login"
					class="flex items-center justify-between px-5 py-4 text-zinc-900 font-semibold hover:bg-zinc-50 active:scale-[0.99] transition-all"
				>
					<div class="flex items-center gap-2">
						<User class="w-4 h-4 text-zinc-500" />
						Account
					</div>
					<span class="text-zinc-400">→</span>
				</a>
			</div>


			<!-- Action Buttons -->
			<div class="pt-4 space-y-3">
				<a
					href="/contact-sales"
					class="block w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-4 px-6 rounded-2xl text-center transition-all shadow-lg shadow-red-500/20 active:scale-95"
				>
					Contact Sales
				</a>
				<button
					onclick={() => {
						onboardingStore.start();
						toggleMobileMenu(false);
					}}
					class="block w-full bg-white hover:bg-zinc-50 text-zinc-900 font-bold py-4 px-6 rounded-2xl text-center transition-all border-2 border-zinc-200 hover:border-[#ef4444] active:scale-95"
				>
					Start Product Tour
				</button>
			</div>

			<!-- Bottom Spacing -->
			<div class="h-8"></div>
		</div>
	</div>
{/if}

<style>
	@keyframes slide-down-fade {
		0% {
			opacity: 0;
			transform: scaleY(0.95) translateY(-10px);
		}
		100% {
			opacity: 1;
			transform: scaleY(1) translateY(0);
		}
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(100%);
		}
	}
</style>
