<script>
	import { onDestroy, onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { page } from "$app/stores";
	import { onboardingStore } from "$lib/stores/onboarding.js";
	import { themeStore } from "$lib/stores/theme.js";
	import {
		Moon,
		Sun,
		Cpu,
		Globe,
		Rocket,
		Shield,
		Users,
		Zap,
		BookOpen,
		Newspaper,
		Calendar,
		ChevronDown,
		Video,
		Terminal,
		ArrowRight,
		Menu,
		X,
	} from "lucide-svelte";

	let isScrolled = $state(false);
	let mobileMenuOpen = $state(false);
	const isLight = $derived($themeStore === "light");
	const quickLinks = [
		{ href: "/about-us", label: "About Us" },
		{ href: "/pricing", label: "Pricing" },
		{ href: "/resources", label: "Resources" },
		{ href: "/contact-sales", label: "Contact" },
	];

	const isAboutPage = $derived($page.url.pathname === "/about-us");

	// Mega Menu State
	let activeMenu = $state(null);
	let menuTimer = null;

	const navData = {
		platform: {
			label: "Platform",
			links: [
				{
					title: "Core Agent OS",
					desc: "Explore the engine powering autonomous growth.",
					icon: Cpu,
					href: "/features",
				},
				{
					title: "Simulator",
					desc: "Train for the conversations that accelerate revenue.",
					icon: Globe,
					href: "/features/simulator",
				},
				{
					title: "Know Your Customer (KYC Intelligence)",
					desc: "Instant customer profiles, insights, and readiness signals.",
					icon: Zap,
					href: "/features/crm",
				},
				{
					title: "Live Conversational Assist",
					desc: "Real-time intelligence and dynamic Q&A in every call.",
					icon: Zap,
					href: "/features/ai-assistance",
				},
				{
					title: "Smart Follow-ups & Unified Sync",
					desc: "Automatic follow-ups, tasks, and bi-directional CRM sync.",
					icon: Zap,
					href: "/features/followup",
				},
			],
		},
		solutions: {
			label: "Solutions",
			links: [
				{
					title: "Amplified Cognitive Ability",
					desc: "Real-time intelligence that reduces cognitive overload.",
					icon: Rocket,
					href: "/features/sentiment",
				},
				{
					title: "Rise of the Singular Rep",
					desc: "Every seller performs like your top performer.",
					icon: Shield,
					href: "/features/custom-goals",
				},
				{
					title: "One-Shot Selling Like the CEO",
					desc: "Walk into every conversation with CEO-level clarity and context.",
					icon: Users,
					href: "/features/notetaker",
				},
				{
					title: "Unified Customer Action",
					desc: "Automated follow-ups, aligned tasks, and bi-directional CRM sync.",
					icon: Terminal,
					href: "/features/dev-tools",
				},
			],
		},
		resources: {
			label: "Resources",
			links: [
				{
					title: "Research and News",
					desc: "Weekly AI strategies and trends.",
					icon: Newspaper,
					href: "/blog",
				},
				{
					title: "Customers",
					desc: "See how modern teams turn conversations into compounding growth.",
					icon: Users,
					href: "/customers",
				},
				{
					title: "Events",
					desc: "Find us at these upcoming events and see Spiked AI in action.",
					icon: Calendar,
					href: "/resources",
				},
				{
					title: "Video Resources",
					desc: "Watch how Spiked AI can transform your business.",
					icon: Video,
					href: "/resources#videos",
				},
			],
		},
	};

	function handleMouseEnter(menu) {
		if (menuTimer) clearTimeout(menuTimer);
		activeMenu = menu;
	}

	function handleMouseLeave() {
		menuTimer = setTimeout(() => {
			activeMenu = null;
		}, 300);
	}

	function handleMenuClick(menu) {
		if (activeMenu === menu) {
			activeMenu = null;
		} else {
			activeMenu = menu;
		}
	}

	/* Dynamic background based on scroll or route */
	const navShellClass = $derived(
		isScrolled || mobileMenuOpen
			? isLight
				? "bg-white/95 backdrop-blur-2xl border-b border-zinc-200 shadow-sm"
				: "bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-900 shadow-lg"
			: "bg-transparent border-b border-transparent",
	);

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

	function toggleTheme() {
		// toggleMobileMenu(false); // don't close menu on theme switch, nice to keep context
		themeStore.toggle();
	}

	function toggleMobileMenu(force) {
		if (typeof force === "boolean") {
			mobileMenuOpen = force;
			return;
		}
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<!-- Navbar -->
<nav
	class={`fixed top-0 left-0 right-0 z-[100] ${navShellClass}`}
	onmouseleave={handleMouseLeave}
>
	<div class="max-w-[1900px] mx-auto px-6 sm:px-12 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo Section -->
			<a
				href="/"
				class="group flex items-center gap-3 cursor-pointer z-50 relative"
			>
				<div class="relative">
					<div
						class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"
					></div>
					<div
						class={`relative border p-2 rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-red-600/50 ${isLight ? "bg-white border-zinc-200 group-hover:border-red-600" : "bg-zinc-900 border-zinc-800 group-hover:border-red-600"}`}
					>
						<img
							src="/Spiked.ai-white-logo-icon-only.png"
							alt="SpikedAI Logo"
							class={`h-6 w-6 rounded-md transform group-hover:rotate-6 transition-all duration-500`}
						/>
					</div>
				</div>
				<div class="flex flex-col">
					<span
						class={`text-xl font-black tracking-tight transition-colors duration-300 group-hover:text-red-600 leading-none ${isLight ? "text-zinc-900" : "text-white"}`}
					>
						SPIKED<span
							class="text-red-600 group-hover:text-red-500 transition-colors"
							>AI</span
						>
					</span>
					<span
						class={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isLight ? "text-zinc-500" : "text-zinc-400"}`}
					>
						Cognitive Intelligence AI
					</span>
				</div>
			</a>

			<!-- Desktop Nav Links -->
			<div class="hidden lg:flex items-center gap-1">
				{#each Object.entries(navData) as [id, menu]}
					<div
						class="relative"
						role="presentation"
						onmouseenter={() => handleMouseEnter(id)}
					>
						<button
							class={`px-4 py-2 text-[18px] font-bold transition-all duration-300 rounded-full hover:bg-red-500/5 ${activeMenu === id ? "text-red-600" : isLight ? "text-zinc-600 hover:text-red-600" : "text-zinc-400 hover:text-white"}`}
							onclick={() => handleMenuClick(id)}
						>
							<span class="flex items-center gap-2">
								{menu.label}
								<ChevronDown
									class={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === id ? "rotate-180" : ""}`}
								/>
							</span>
						</button>

						<!-- Individual Mega Menu (Compact Card Style) -->
						{#if activeMenu === id}
							<div
								class="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[850px] animate-slide-down-fade origin-top z-50 pointer-events-none"
								onmouseenter={() => handleMouseEnter(id)}
								role="menu"
								tabindex="0"
							>
								<!-- Pointer events auto wrapper to fix hover gap issues if any, though mt-4 might be tricky without a bridge. 
                                         Adding a transparent bridge div -->
								<div
									class="absolute -top-4 left-0 w-full h-4 bg-transparent pointer-events-auto"
								></div>

								<!-- Main Card -->
								<div
									class={`w-full rounded-2xl shadow-2xl border overflow-hidden pointer-events-auto ${isLight ? "bg-white border-zinc-200" : "bg-[#030712] border-zinc-800"}`}
								>
									<div class="grid grid-cols-[1.5fr_1fr]">
										<!-- Links List (Left Side) -->
										<div class="p-8 flex flex-col gap-2">
											<h3
												class={`text-xs font-black uppercase tracking-widest mb-4 ml-3 ${isLight ? "text-zinc-400" : "text-zinc-500"}`}
											>
												{menu.label}
											</h3>
											{#each menu.links as link}
												<a
													href={link.href}
													class={`group/item flex items-center gap-4 p-3 rounded-xl transition-all duration-200 ${isLight ? "hover:bg-zinc-50" : "hover:bg-zinc-900/50"}`}
													onclick={() => (activeMenu = null)}
												>
													<div
														class={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 shadow-sm group-hover/item:scale-110 ${isLight ? "bg-white border text-red-600 border-zinc-100 group-hover/item:border-red-100" : "bg-zinc-900 border border-zinc-800 text-red-500 group-hover/item:border-red-900/30"}`}
													>
														<link.icon size={20} />
													</div>
													<div>
														<h4
															class={`text-lg font-bold transition-colors group-hover/item:text-red-600 ${isLight ? "text-zinc-900" : "text-white"}`}
														>
															{link.title}
														</h4>
														<p
															class={`text-sm font-medium ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
														>
															{link.desc}
														</p>
													</div>
													<!-- Chevron (Salesforce style invisible until hover) -->
													<div
														class="ml-auto opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all"
													>
														<ChevronDown
															class="w-4 h-4 -rotate-90 text-red-500"
														/>
													</div>
												</a>
											{/each}
										</div>

										<!-- Promo Panel (Right Side) -->
										<div
											class={`relative p-8 flex flex-col justify-between ${isLight ? "bg-zinc-50/80 border-l border-zinc-100" : "bg-zinc-900/30 border-l border-zinc-800"}`}
										>
											<!-- Background decoration -->
											<div
												class="absolute inset-0 opacity-30 pointer-events-none overflow-hidden"
											>
												<div
													class="absolute -top-24 -right-24 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
												></div>
												<div
													class="absolute bottom-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-xl"
												></div>
											</div>

											<div class="relative z-10">
												<div
													class="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-6 shadow-lg shadow-red-600/20 text-white transform rotate-3"
												>
													<Rocket size={24} />
												</div>
												<h3
													class={`text-xl font-black mb-3 leading-tight ${isLight ? "text-zinc-900" : "text-white"}`}
												>
													Accelerate your revenue today.
												</h3>
												<p
													class={`text-sm leading-relaxed mb-8 ${isLight ? "text-zinc-500" : "text-zinc-400"}`}
												>
													Join high-performing teams using SpikedAI to close
													more deals faster.
												</p>

												<a
													href="/contact-sales"
													class="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2 group/btn text-sm transform hover:-translate-y-0.5"
												>
													Request a Demo
													<ArrowRight
														class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
													/>
												</a>

												<div
													class="mt-6 pt-6 border-t border-dashed border-zinc-800/20 flex items-center gap-3"
												>
													<div class="flex -space-x-2">
														{#each [1, 2, 3] as i}
															<div
																class={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] font-bold ${isLight ? "bg-white border-white" : "bg-zinc-800 border-zinc-900 text-zinc-400"}`}
															>
																<svg
																	class="w-3 h-3 text-red-500"
																	fill="currentColor"
																	viewBox="0 0 24 24"
																	><path
																		d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
																	/></svg
																>
															</div>
														{/each}
													</div>
													<span
														class={`text-[10px] font-medium ${isLight ? "text-zinc-500" : "text-zinc-500"}`}
														>Trusted by 10k+ sales reps</span
													>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/if}
					</div>
				{/each}

				<!-- Static Links -->
				<a
					href="/pricing"
					class={`px-4 py-2 text-[18px] font-bold transition-all duration-300 rounded-full hover:bg-red-500/5 ${$page.url.pathname === "/pricing" ? "text-red-600" : isLight ? "text-zinc-600 hover:text-red-600" : "text-zinc-400 hover:text-white"}`}
				>
					Pricing
				</a>
				<a
					href="/about-us"
					class={`px-4 py-2 text-[18px] font-bold transition-all duration-300 rounded-full hover:bg-red-500/5 ${$page.url.pathname === "/about-us" ? "text-red-600" : isLight ? "text-zinc-600 hover:text-red-600" : "text-zinc-400 hover:text-white"}`}
				>
					About Us
				</a>
			</div>

			<!-- Right Actions -->
			<div class="hidden lg:flex items-center gap-4">
				<button
					onclick={toggleTheme}
					class={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${isLight ? "bg-zinc-100 text-zinc-600 hover:text-red-600" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
				>
					{#if !isLight}
						<Sun class="w-5 h-5" />
					{:else}
						<Moon class="w-5 h-5" />
					{/if}
				</button>

				<a
					href="/login"
					class={`text-base font-bold px-4 py-2 hover:text-red-600 transition-colors ${isLight ? "text-zinc-600" : "text-zinc-300"}`}
				>
					Log In
				</a>

				<button
					onclick={onboardingStore.start}
					class="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-lg hover:shadow-red-500/30 transition-all hover:-translate-y-0.5"
				>
					Get Started
				</button>
			</div>

			<!-- Mobile Toggle -->
			<button
				onclick={() => toggleMobileMenu()}
				class={`lg:hidden p-2 ${isLight ? "text-zinc-900" : "text-white"}`}
			>
				{#if mobileMenuOpen}
					<X class="w-8 h-8" />
				{:else}
					<Menu class="w-8 h-8" />
				{/if}
			</button>
		</div>
	</div>
</nav>

<!-- Mobile Menu Overlay - Move outside <nav> to prevent layout clipping -->
{#if mobileMenuOpen}
	<div
		class={`fixed inset-0 h-[100dvh] w-full z-[90] lg:hidden ${isLight ? "bg-white" : "bg-black"} flex flex-col overflow-hidden`}
		transition:fade={{ duration: 150 }}
	>
		<div
			class="flex-1 overflow-y-auto no-scrollbar pt-24 pb-32 px-6 overscroll-contain"
			style="-webkit-overflow-scrolling: touch; touch-action: pan-y;"
		>
			<div class="space-y-10">
				{#each Object.entries(navData) as [id, menu]}
					<div class="space-y-5">
						<h3
							class="text-xs font-black uppercase tracking-widest text-red-600 px-2"
						>
							{menu.label}
						</h3>
						<div class="grid gap-3">
							{#each menu.links as link}
								<a
									href={link.href}
									onclick={() => toggleMobileMenu(false)}
									class={`flex items-center gap-4 p-4 rounded-3xl border transition-all active:scale-[0.96] ${isLight ? "bg-zinc-50 border-zinc-100" : "bg-zinc-900 border-zinc-800/50"}`}
								>
									<div
										class={`w-12 h-12 rounded-2xl flex items-center justify-center ${isLight ? "bg-white text-red-600 shadow-sm" : "bg-zinc-800 text-red-500"}`}
									>
										<link.icon size={26} />
									</div>
									<div class="flex-1">
										<div
											class={`font-black text-lg leading-tight mb-1 ${isLight ? "text-zinc-900" : "text-white"}`}
										>
											{link.title}
										</div>
										<div
											class={`text-sm font-medium leading-snug ${isLight ? "text-zinc-500" : "text-zinc-400"}`}
										>
											{link.desc}
										</div>
									</div>
								</a>
							{/each}
						</div>
					</div>
				{/each}

				<div
					class={`pt-10 border-t ${isLight ? "border-zinc-100" : "border-zinc-800"}`}
				>
					<div class="grid grid-cols-3 gap-4">
						<a
							href="/pricing"
							class={`p-5 rounded-3xl border text-center font-black text-lg ${isLight ? "bg-zinc-50 border-zinc-100 text-zinc-900" : "bg-zinc-900 border-zinc-800 text-white"}`}
							onclick={() => toggleMobileMenu(false)}>Pricing</a
						>
						<button
							onclick={toggleTheme}
							class={`p-3 flex items-center justify-center rounded-3xl transition-all duration-300 hover:scale-110 ${isLight ? "bg-zinc-100 text-zinc-600 hover:text-red-600" : "bg-zinc-900 text-zinc-400 hover:text-white"}`}
						>
							{#if !isLight}
								<Sun class="w-5 h-5" />
							{:else}
								<Moon class="w-5 h-5" />
							{/if}
						</button>
						<a
							href="/about-us"
							class={`p-5 rounded-3xl border text-center font-black text-lg ${isLight ? "bg-zinc-50 border-zinc-100 text-zinc-900" : "bg-zinc-900 border-zinc-800 text-white"}`}
							onclick={() => toggleMobileMenu(false)}>About</a
						>
					</div>
					<a
						href="https://app.spiked.ai/login"
						class={`block mt-4 p-5 rounded-3xl border text-center font-black text-lg ${isLight ? "bg-zinc-50 border-zinc-100 text-zinc-900" : "bg-zinc-900 border-zinc-800 text-white"}`}
						onclick={() => toggleMobileMenu(false)}>Log In</a
					>
				</div>
			</div>
		</div>

		<!-- Mobile Fixed Bottom CTA -->
		<div
			class={`absolute bottom-0 left-0 right-0 z-20 p-6 pt-12 pb-8 bg-gradient-to-t ${isLight ? "from-white via-white to-transparent" : "from-black via-black to-transparent"} pointer-events-none`}
		>
			<button
				onclick={() => {
					onboardingStore.start();
					toggleMobileMenu(false);
				}}
				class="w-full py-5 bg-red-600 text-white font-black text-xl rounded-full shadow-2xl shadow-red-600/40 active:scale-[0.98] transition-all pointer-events-auto"
			>
				Get Started
			</button>
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

	:global(.nav-locked) {
		overflow: hidden;
	}

	.animate-slide-down-fade {
		animation: slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.animate-shimmer {
		animation: shimmer 2s infinite;
	}

	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}

	.no-scrollbar {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.overscroll-contain {
		overscroll-behavior-y: contain;
	}
</style>
