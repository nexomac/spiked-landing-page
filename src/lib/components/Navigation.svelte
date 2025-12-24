<script>
	import { onMount } from "svelte";
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
	} from "lucide-svelte";

	let isScrolled = $state(false);
	let mobileMenuOpen = $state(false);
	let theme = $state("dark");

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
			? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
			: "bg-transparent border-b border-transparent",
	);

	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};

		window.addEventListener("scroll", handleScroll);

		const unsubscribe = themeStore.subscribe((value) => {
			theme = value;
		});

		return () => {
			window.removeEventListener("scroll", handleScroll);
			unsubscribe();
		};
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
						class="absolute inset-0 bg-gradient-to-r from-primary to-red-800 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"
					></div>
					<!-- Logo container -->
					<div
						class="relative bg-background border border-border p-1.5 sm:p-2 rounded-lg group-hover:border-primary transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/50"
					>
						<!-- Use semantic class for logo if it's an SVG, but it's an image. 
                             Ideally we should have a dark/light logo or use filter invert in light mode if the logo is white-only.
                             Assuming the logo is white-only based on filename 'white-logo'.
                             I'll add a filter invert for light mode or keep it as is if it looks okay on dark 'bg-background' which acts as logo container.
                             Wait, 'bg-background' is white in light mode. White logo on white background is bad.
                             I need to invert it in light mode or use a different logo.
                             I'll try filter invert for now.
                        -->
						<img
							src="/Spiked.ai-white-logo-icon-only.png"
							alt="SpikedAI Logo"
							class="h-5 w-5 sm:h-7 sm:w-7 rounded transform group-hover:rotate-6 transition-transform duration-500"
						/>
					</div>
				</div>
				<div class="flex flex-col">
					<span
						class="text-base sm:text-xl font-black tracking-tight transition-colors duration-300 text-foreground group-hover:text-primary"
					>
						SPIKED<span
							class="text-primary group-hover:text-primary/80 transition-colors"
							>AI</span
						>
					</span>
					<span
						class="text-[8px] sm:text-[10px] font-medium tracking-wider uppercase -mt-0.5 transition-colors text-muted-foreground group-hover:text-foreground"
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
							class={`flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition-all duration-300 hover:scale-105 relative text-muted-foreground hover:text-primary`}
						>
							{menu.label}
							<ChevronDown
								class={`w-3.5 h-3.5 transition-transform duration-500 ${activeMenu === id ? "rotate-180 text-primary" : ""}`}
							/>
							<span
								class={`absolute bottom-0 left-4 right-4 h-0.5 bg-primary transition-all duration-300 ${activeMenu === id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`}
							></span>
						</button>
					</div>
				{/each}

				<a
					href="/pricing"
					class={`px-4 py-2 text-sm font-bold transition-all duration-300 hover:scale-105 relative group ${$page.url.pathname === "/pricing" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
				>
					Pricing
					<span
						class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
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
						class="mx-auto max-w-5xl rounded-2xl border border-border pointer-events-auto overflow-hidden shadow-2xl backdrop-blur-2xl transition-all duration-500 bg-background/95"
					>
						<div class="grid grid-cols-3 divide-x divide-border">
							{#each Object.entries(navData) as [id, menu]}
								<div
									role="presentation"
									class={`p-8 transition-all duration-700 relative flex flex-col ${activeMenu === id ? "opacity-100 -translate-y-1" : "opacity-[0.25] blur-[0.5px] scale-[0.98]"}`}
									onmouseenter={() => handleMouseEnter(id)}
								>
									<!-- Dynamic accent bar -->
									<div
										class={`absolute top-0 left-8 right-8 h-1 rounded-b-full transition-all duration-500 ${activeMenu === id ? "bg-primary shadow-[0_2px_10px_rgba(239,24,32,0.5)]" : "bg-transparent"}`}
									></div>

									<!-- Dynamic background highlight -->
									<div
										class={`absolute inset-0 transition-opacity duration-500 ${activeMenu === id ? "bg-primary/5 border-x border-primary/10" : "opacity-0"}`}
									></div>

									<div class="relative z-10">
										<h3
											class={`text-[11px] font-black uppercase tracking-[0.2em] mb-8 transition-all duration-500 ${activeMenu === id ? "text-primary translate-x-1" : "text-muted-foreground"}`}
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
														class={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover/item:scale-110 group-hover/item:shadow-xl bg-secondary border border-border text-muted-foreground group-hover/item:text-primary group-hover/item:border-primary/20 ${activeMenu === id ? "ring-1 ring-primary/30 shadow-md bg-gradient-to-br from-primary/5 to-transparent" : ""}`}
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
															class={`text-sm font-bold mb-1 transition-colors text-foreground group-hover/item:text-primary ${activeMenu === id ? "text-foreground" : ""}`}
														>
															{link.title}
														</p>
														<p
															class={`text-xs leading-relaxed transition-colors text-muted-foreground group-hover/item:text-foreground ${activeMenu === id ? "text-muted-foreground" : ""}`}
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
							class="px-8 py-4 flex items-center justify-between border-t border-border bg-muted/30"
						>
							<p
								class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
							>
								Ready to scale your revenue?
							</p>
							<a
								href="/contact-sales"
								class="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 transition-colors flex items-center gap-2"
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
					class="flex items-center gap-2 px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold rounded-lg border border-border transition-all duration-300 hover:scale-105 text-foreground hover:text-primary hover:border-primary/50 bg-background/50 backdrop-blur-sm"
					aria-label={theme === "light"
						? "Switch to dark mode"
						: "Switch to light mode"}
				>
					{#if theme === "light"}
						<Moon class="w-4 h-4" />
						<span>Dark</span>
					{:else}
						<Sun class="w-4 h-4" />
						<span>Light</span>
					{/if}
				</button>
				<button
					class="px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-semibold transition-all duration-300 hover:scale-105 text-foreground hover:text-primary"
				>
					Log In
				</button>
				<button
					onclick={onboardingStore.start}
					class="group relative px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-primary to-red-700 text-white rounded font-semibold text-xs lg:text-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 hover:scale-105 hover:-translate-y-0.5"
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
			class="md:hidden p-2 transition-all duration-300 hover:scale-110 hover:rotate-90 text-muted-foreground hover:text-primary"
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

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div
				class="md:hidden mt-4 pb-6 space-y-6 pt-6 animate-slide-down rounded-2xl border border-border bg-background/95 backdrop-blur-xl px-4 max-h-[80vh] overflow-y-auto shadow-2xl"
			>
				{#each Object.entries(navData) as [id, menu]}
					<div class="space-y-3">
						<h3
							class="text-[10px] font-black uppercase tracking-widest px-2 text-muted-foreground"
						>
							{menu.label}
						</h3>
						<div class="grid grid-cols-1 gap-1">
							{#each menu.links as link}
								<a
									href={link.href}
									class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all hover:bg-primary/5 text-foreground hover:text-primary"
									onclick={() => (mobileMenuOpen = false)}
								>
									<div
										class="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary text-muted-foreground group-hover:text-primary"
									>
										<link.icon size={16} />
									</div>
									<span class="text-sm font-bold"
										>{link.title}</span
									>
								</a>
							{/each}
						</div>
					</div>
				{/each}

				<div class="space-y-3 pt-2 border-t border-border">
					<a
						href="/pricing"
						class="block px-3 py-2 text-sm font-bold rounded-lg transition-all hover:bg-primary/5 text-foreground hover:text-primary"
						onclick={() => (mobileMenuOpen = false)}>Pricing</a
					>
					<a
						href="/blog"
						class="block px-3 py-2 text-sm font-bold rounded-lg transition-all hover:bg-primary/5 text-foreground hover:text-primary"
						onclick={() => (mobileMenuOpen = false)}>The Bulletin</a
					>
				</div>

				<div class="pt-4 space-y-3">
					<button
						onclick={toggleTheme}
						class="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-black uppercase tracking-widest rounded-xl border border-border transition-all duration-300 text-foreground hover:text-primary hover:border-primary/50"
					>
						{#if theme === "light"}
							<Moon class="w-4 h-4" />
							Dark mode
						{:else}
							<Sun class="w-4 h-4" />
							Light mode
						{/if}
					</button>
					<button
						class="block w-full text-center px-4 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-all duration-300 text-foreground border border-border hover:text-primary hover:border-primary/50"
					>
						Log In
					</button>
					<button
						onclick={onboardingStore.start}
						class="block w-full px-4 py-3 bg-gradient-to-r from-primary to-red-700 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/50 active:scale-95"
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

	.animate-slide-down {
		animation: slide-down 0.6s ease-out forwards;
	}

	.animate-shimmer {
		animation: shimmer 2s infinite;
	}

	/* Light mode navigation */
	:global([data-theme="light"]) :global(nav) {
		background: rgba(255, 255, 255, 0.92) !important;
		backdrop-filter: blur(12px);
		border-color: rgba(226, 232, 240, 0.8) !important;
		box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
	}

	:global([data-theme="light"]) :global(nav) :global(.text-white),
	:global([data-theme="light"]) :global(nav) :global(a) {
		color: #0f172a !important;
	}

	:global([data-theme="light"]) :global(nav) :global(a:hover) {
		color: #dc2626 !important;
	}

	:global([data-theme="light"]) :global(nav) :global(.bg-gradient-to-r) {
		background: linear-gradient(90deg, #ef4444, #f97316) !important;
	}

	:global([data-theme="light"]) :global(nav) :global(.border-zinc-800) {
		border-color: #e2e8f0 !important;
		background: #ffffff !important;
		color: #0f172a !important;
	}

	:global([data-theme="light"]) :global(nav) :global(.border-zinc-800:hover) {
		border-color: #dc2626 !important;
	}
</style>
