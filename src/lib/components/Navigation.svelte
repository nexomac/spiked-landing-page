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
		LifeBuoy,
		ChevronDown,
		Video,
	} from "lucide-svelte";

	let isScrolled = $state(false);
	let mobileMenuOpen = $state(false);
	const isLight = $derived($themeStore === "light");
	const quickLinks = [
		{ href: "/about-us", label: "About Us" },
		{ href: "/about-us#more", label: "+ More" },
		{ href: "/pricing", label: "Pricing" },
		{ href: "/resources", label: "Resources" },
		{ href: "/contact-sales", label: "Contact" },
	];

	const isAboutPage = $derived($page.url.pathname === "/about-us");
	const isMoreActive = $derived(isAboutPage && $page.url.hash === "#more");
	const isCoreAboutActive = $derived(isAboutPage && $page.url.hash !== "#more");

	// Mega Menu State
	let activeMenu = $state(null);
	let menuTimer = null;

	const navData = {
		platform: {
			label: "Platform",
			links: [
				{
					title: "Core Agent OS",
					desc: "The engine powering autonomous growth.",
					icon: Cpu,
					href: "/features",
				},
				{
					title: "Agent Simulator",
					desc: "Predict and visualize outcomes.",
					icon: Globe,
					href: "/features/simulator",
				},
				{
					title: "Spiked API",
					desc: "Seamlessly integrate with your CRM.",
					icon: Zap,
					href: "/features/crm",
				},
			],
		},
		solutions: {
			label: "Solutions",
			links: [
				{
					title: "Smart Follow-up",
					desc: "Never miss a lead with automated reach.",
					icon: Rocket,
					href: "/features/followup",
				},
				{
					title: "Revenue Ops",
					desc: "Sentiment-driven funnel optimization.",
					icon: Shield,
					href: "/features/sentiment",
				},
				{
					title: "Customer Success",
					desc: "AI Notetaker for perfect retention.",
					icon: Users,
					href: "/features/notetaker",
				},
			],
		},
		resources: {
			label: "Resources",
			links: [
				{
					title: "The Bulletin",
					desc: "Weekly AI strategies and trends.",
					icon: Newspaper,
					href: "/blog",
				},
				{
					title: "Dev Hub",
					desc: "Technical tools for builders.",
					icon: BookOpen,
					href: "/features/dev-tools",
				},
				{
					title: "Enterprise AI",
					desc: "Custom goals for market leaders.",
					icon: LifeBuoy,
					href: "/features/custom-goals",
				},
				{
					title: "Video Resources",
					desc: "Watch how Spiked AI can transform your business.",
					icon: Video,
					href: "/resources",
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

	/* Dynamic background based on scroll or route */
	const navShellClass = $derived(
		isScrolled
			? (isLight ? "bg-white/90 backdrop-blur-xl border-b border-zinc-200 shadow-sm" : "bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-900 shadow-lg")
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
		toggleMobileMenu(false);
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
	class={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navShellClass}`}
	onmouseleave={handleMouseLeave}
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
		<div class="flex items-center justify-between">
			<a
				href="/"
				class="group flex items-center gap-2 sm:gap-3 cursor-pointer"
			>
				<div class="relative">
					<!-- Animated red glow -->
					<div
						class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"
					></div>
					<!-- Logo container -->
					<div
						class={`relative border p-1.5 sm:p-2 rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-600/50 ${isLight ? 'bg-white border-zinc-200 group-hover:border-red-600' : 'bg-zinc-900 border-zinc-800 group-hover:border-red-600'}`}
					>
						<img
							src="/Spiked.ai-white-logo-icon-only.png"
							alt="SpikedAI Logo"
							class={`h-5 w-5 sm:h-7 sm:w-7 rounded transform group-hover:rotate-6 transition-all duration-500`}
						/>
					</div>
				</div>
				<div class="flex flex-col">
					<span
						class={`text-base sm:text-xl font-black tracking-tight transition-colors duration-300 group-hover:text-red-600 ${isLight ? 'text-zinc-900' : 'text-white'}`}
					>
						SPIKED<span class="text-red-600 group-hover:text-red-500 transition-colors">AI</span>
					</span>
					<span
						class={`text-[8px] sm:text-[10px] font-medium tracking-wider uppercase -mt-0.5 transition-colors ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}
						>Revenue Acceleration AI</span
					>
				</div>
			</a>

			<div class="hidden md:flex items-center gap-1">
				<!-- Mega Menu Links -->
				{#each Object.entries(navData) as [id, menu]}
					<div
						class="relative group"
						role="presentation"
						onmouseenter={() => handleMouseEnter(id)}
					>
						<button
							class={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all duration-300 hover:scale-105 relative hover:text-red-600 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}
						>
							{menu.label}
							<ChevronDown
								class={`w-3.5 h-3.5 transition-transform duration-500 ${activeMenu === id ? "rotate-180 text-red-600" : ""}`}
							/>
							<span
								class={`absolute bottom-0 left-4 right-4 h-0.5 bg-red-600 transition-all duration-300 ${activeMenu === id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
							></span>
						</button>
					</div>
				{/each}

				<a
					href="/pricing"
					class={`px-4 py-2 text-sm font-bold transition-all duration-300 hover:scale-105 relative group ${$page.url.pathname === "/pricing" ? "text-red-600" : (isLight ? "text-zinc-600 hover:text-red-600" : "text-zinc-400 hover:text-red-600")}`}
				>
					Pricing
					<span
						class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"
					></span>
				</a>
				<a
					href="/about-us"
					class={`px-4 py-2 text-sm font-bold transition-all duration-300 hover:scale-105 relative group ${isCoreAboutActive ? "text-red-600" : (isLight ? "text-zinc-600 hover:text-red-600" : "text-zinc-400 hover:text-red-600")}`}
				>
					About Us
					<span
						class="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"
					></span>
				</a>
	
			</div>

			<!-- Mega Menu Panel -->
			{#if activeMenu}
				<div
					role="presentation"
					class="absolute top-full left-0 right-0 pt-2 px-4 pointer-events-none"
					onmouseenter={() => handleMouseEnter(activeMenu)}
				>
					<div
						transition:fade={{ duration: 200 }}
						class={`mx-auto max-w-5xl rounded-2xl border pointer-events-auto overflow-hidden shadow-2xl backdrop-blur-2xl transition-all duration-500 ${isLight ? 'bg-white/95 border-zinc-200' : 'bg-zinc-950/90 border-zinc-800'}`}
					>
						<div class={`grid grid-cols-3 divide-x ${isLight ? 'divide-zinc-100' : 'divide-zinc-800'}`}>
							{#each Object.entries(navData) as [id, menu]}
								<div
									role="presentation"
									class={`p-8 transition-all duration-700 relative flex flex-col ${activeMenu === id ? "opacity-100 -translate-y-1" : "opacity-[0.25] blur-[0.5px] scale-[0.98]"}`}
									onmouseenter={() => handleMouseEnter(id)}
								>
									<!-- Dynamic accent bar -->
									<div
										class={`absolute top-0 left-8 right-8 h-1 rounded-b-full transition-all duration-500 ${activeMenu === id ? "bg-red-600 shadow-[0_2px_10px_rgba(239,24,32,0.5)]" : "bg-transparent"}`}
									></div>

									<!-- Dynamic background highlight -->
									<div
										class={`absolute inset-0 transition-opacity duration-500 ${activeMenu === id ? (isLight ? 'bg-red-50/20 shadow-inner' : 'bg-red-950/5') : "opacity-0"}`}
									></div>

									<div class="relative z-10">
										<h3
											class={`text-[11px] font-black uppercase tracking-[0.2em] mb-8 transition-all duration-500 ${activeMenu === id ? "text-red-600 translate-x-1" : "text-zinc-500"}`}
										>
											{menu.label}
										</h3>
										<div class="space-y-7">
											{#each menu.links as link}
												<a
													href={link.href}
													class="group/item flex items-start gap-4"
													onclick={() =>
														(activeMenu = null)}
												>
													<div
														class={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:shadow-xl ${isLight ? 'bg-zinc-50 border-zinc-100 text-zinc-400 group-hover/item:text-red-600 group-hover/item:border-red-100' : 'bg-zinc-900 border-zinc-800 text-zinc-500 group-hover/item:text-red-500 group-hover/item:border-red-900/50'} ${activeMenu === id ? "ring-1 ring-red-500/30 shadow-md bg-gradient-to-br from-red-600/5 to-transparent shadow-red-500/10" : "border"}`}
													>
														<link.icon
															size={20}
															strokeWidth={activeMenu ===
															id
																? 2.5
																: 2}
														/>
													</div>
													<div class="flex-1 min-w-0">
														<p
															class={`text-sm font-bold mb-1 transition-colors group-hover/item:text-red-600 ${isLight ? 'text-zinc-900' : 'text-white'}`}
														>
															{link.title}
														</p>
														<p
															class={`text-xs leading-relaxed transition-colors ${isLight ? 'text-zinc-500' : 'text-zinc-500 group-hover/item:text-zinc-400'}`}
														>
															{link.desc}
														</p>
													</div>
												</a>
											{/each}
										</div>
									</div>
								</div>
							{/each}
						</div>

						<!-- Panel Footer -->
						<div
							class={`px-8 py-4 flex items-center justify-between border-t transition-colors ${isLight ? 'bg-zinc-50 border-zinc-100' : 'bg-zinc-900/50 border-zinc-800'}`}
						>
							<p
								class={`text-[10px] font-bold uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}
							>
								Ready to scale your revenue?
							</p>
							<a
								href="/contact-sales"
								class="text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-red-500 transition-colors flex items-center gap-2"
							>
								Request a Demo →
							</a>
						</div>
					</div>
				</div>
			{/if}

			<div class="ml-2 lg:ml-4 flex items-center gap-2 lg:gap-3">
				<button
					onclick={toggleTheme}
					class={`flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold rounded-lg border transition-all duration-300 hover:scale-105 backdrop-blur-sm ${isLight ? 'bg-white/70 border-zinc-200 text-zinc-700 hover:text-red-600 hover:border-red-200' : 'bg-black/30 border-zinc-800 text-white hover:text-red-500 hover:border-red-900/50'}`}
					aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
				>
					{#if !isLight}
						<Sun class="w-4 h-4 text-yellow-500" />
						<span>Light</span>
					{:else}
						<Moon class="w-4 h-4 text-zinc-600" />
						<span>Dark</span>
					{/if}
				</button>
				<button
					class={`px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold transition-all duration-300 hover:scale-105 ${isLight ? 'text-zinc-700 hover:text-red-600' : 'text-white hover:text-red-500'}`}
				>
					Log In
				</button>
				<button
					onclick={onboardingStore.start}
					class="group relative px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded font-semibold text-xs lg:text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 hover:scale-105 hover:-translate-y-0.5"
				>
					<span class="relative z-10">Get Started</span>
					<div
						class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
					></div>
					<div
						class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"
					></div>
				</button>
			</div>
		</div>

		<!-- Mobile Menu Button -->
		<button
			onclick={() => toggleMobileMenu()}
			class={`md:hidden p-2 transition-all duration-300 hover:scale-110 hover:rotate-90 ${isLight ? 'text-zinc-600 hover:text-red-600' : 'text-zinc-400 hover:text-red-500'}`}
			aria-label="Toggle mobile menu"
		>
			<svg
				class="w-6 h-6 transition-transform duration-300"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>

		{#if mobileMenuOpen}
			<div
				class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
				aria-hidden="true"
				onclick={() => toggleMobileMenu(false)}
			></div>
		{/if}

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div
				class={`md:hidden fixed left-3 right-3 top-[calc(var(--nav-height,80px)+12px)] z-50 pb-6 space-y-6 pt-6 animate-slide-down rounded-3xl border backdrop-blur-2xl px-4 max-h-[78vh] overflow-y-auto shadow-2xl ${isLight ? 'bg-white/95 border-zinc-200' : 'bg-zinc-950/95 border-zinc-800'}`}
			>
				<div class="px-1">
					<p
						class={`text-[11px] font-black uppercase tracking-[0.25em] mb-3 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}
					>
						Navigation
					</p>
					<div class="grid grid-cols-2 gap-3 mb-4">
						{#each quickLinks as quick}
							<a
								href={quick.href}
								class={`rounded-2xl px-4 py-3 text-sm font-bold border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${isLight ? 'bg-red-50/60 text-zinc-900 border-red-100 hover:border-red-300 hover:text-red-700' : 'bg-red-950/30 text-white border-red-900/50 hover:border-red-500/60 hover:text-red-300'}`}
								onclick={() => (mobileMenuOpen = false)}
							>
								{quick.label}
							</a>
						{/each}
					</div>
				</div>

				<div class="space-y-4">
					{#each Object.entries(navData) as [id, menu]}
						<div
							class={`rounded-2xl border overflow-hidden transition-all duration-300 ${isLight ? 'border-zinc-200 bg-white' : 'border-zinc-800 bg-black/50'}`}
						>
							<div
								class={`flex items-center justify-between px-4 py-3 border-b ${isLight ? 'border-zinc-100' : 'border-zinc-800'}`}
							>
								<h3 class="text-xs font-black uppercase tracking-[0.2em] text-red-500">
									{menu.label}
								</h3>
								<span
									class={`text-[11px] font-semibold ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}
								>
									{menu.links.length} links
								</span>
							</div>
							<div class="divide-y divide-zinc-100 dark:divide-zinc-800">
								{#each menu.links as link}
									<a
										href={link.href}
										class="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-red-500/5"
										onclick={() => (mobileMenuOpen = false)}
									>
										<div
											class={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300 ${isLight ? 'bg-zinc-50 border-zinc-100 text-zinc-500 group-hover:text-red-600 group-hover:border-red-200' : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 group-hover:text-red-400 group-hover:border-red-900/50'}`}
										>
											<link.icon size={18} />
										</div>
										<div class="flex-1 min-w-0">
											<p class={`text-sm font-semibold leading-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
												{link.title}
											</p>
											<p class={`text-xs leading-tight ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
												{link.desc}
											</p>
										</div>
									</a>
								{/each}
							</div>
						</div>
					{/each}
				</div>

				<div class="pt-4 space-y-3">
					<button
						onclick={toggleTheme}
						class={`flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-black uppercase tracking-widest rounded-xl border transition-all duration-300 ${isLight ? 'bg-white border-zinc-200 text-zinc-700 hover:text-red-600' : 'bg-zinc-900 border-zinc-800 text-white'}`}
					>
						{#if isLight}
							<Moon class="w-4 h-4" />
							Dark mode
						{:else}
							<Sun class="w-4 h-4" />
							Light mode
						{/if}
					</button>
					<button
						class={`block w-full text-center px-4 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-all duration-300 border ${isLight ? 'border-zinc-200 text-zinc-700 hover:text-red-600' : 'border-zinc-800 text-white'}`}
					>
						Log In
					</button>
					<button
						onclick={onboardingStore.start}
						class="block w-full px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 active:scale-95"
					>
						Get Started
					</button>
				</div>
			</div>
		{/if}
	</div>
</nav>

<style>
	@keyframes slide-down {
		0% {
			opacity: 0;
			transform: translateY(-20px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
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

	.animate-slide-down {
		animation: slide-down 0.6s ease-out forwards;
	}

	.animate-shimmer {
		animation: shimmer 2s infinite;
	}
</style>
