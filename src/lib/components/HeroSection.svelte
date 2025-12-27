<script>
	export let scrollY = 0;
	export let mouseX = 0;
	export let mouseY = 0;
	export let visibleHero = false;
	export let handleTilt = () => {};
	export let resetTilt = () => {};
	export let startOnboarding = () => {};
</script>

<section
	data-section="hero"
	class="relative min-h-screen flex items-center justify-center overflow-hidden hero-shell font-sans text-foreground"
>
	<!-- Background Overlay -->
	<div
		class="absolute inset-0 hero-overlay"
		style={`transform: translateY(${scrollY * 0.5}px);`}
	>
		<div
			class="absolute inset-0 bg-gradient-to-b from-primary/5 via-background via-50% to-background"
		></div>
		<div
			class="absolute inset-0 animate-grid-pulse hero-grid opacity-30 dark:opacity-40"
			style="background-image: linear-gradient(rgba(220, 38, 38, 0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(220, 38, 38, 0.08) 1.5px, transparent 1.5px); background-size: 60px 60px;"
		></div>

		<!-- Animated Orbs -->
		<div
			class="absolute w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-float transition-transform duration-1000 hero-orb"
			style={`top: 15%; left: 20%; transform: translate(${mouseX * 0.03}px, ${mouseY * 0.03}px);`}
		></div>
		<div
			class="absolute w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl animate-float-delayed transition-transform duration-1000 hero-orb"
			style={`bottom: 15%; right: 20%; transform: translate(${-mouseX * 0.02}px, ${-mouseY * 0.02}px);`}
		></div>

		<div
			class="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float hero-orb"
			style="animation-delay: 2s;"
		></div>
		<div
			class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-float-delayed hero-orb"
			style="animation-delay: 1s;"
		></div>

		<!-- Scan Lines -->
		<div class="absolute inset-0 overflow-hidden">
			<div
				class="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-20 animate-scan hero-scan-line"
			></div>
			<div
				class="absolute h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-10 animate-scan hero-scan-line"
				style="animation-delay: 3s; animation-duration: 10s;"
			></div>
		</div>

		<!-- Particles -->
		<div class="absolute inset-0 pointer-events-none">
			{#each Array(30) as _, i}
				<div
					class="absolute w-1.5 h-1.5 bg-primary/30 rounded-full animate-particle-float"
					style={`left: ${Math.random() * 100}%; top: ${Math.random() * 100}%; animation-delay: ${Math.random() * 5}s; animation-duration: ${8 + Math.random() * 4}s;`}
				></div>
			{/each}
		</div>

		<div
			class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/50 hero-spotlight"
		></div>
	</div>

	<!-- Content -->
	<div
		class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-6 py-24 sm:py-32 md:py-40"
	>
		<div
			class={`transform transition-all duration-1000 ${visibleHero ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
		>
			<div
				class="flex flex-col items-center gap-4 sm:gap-5 mb-12 sm:mb-16 animate-slide-down text-center"
			>
				<div
					class="hero-pill inline-flex items-center gap-2 sm:gap-4 px-5 sm:px-6 py-3 sm:py-2.5 bg-background/80 backdrop-blur-xl rounded-full border border-border group hover:border-primary/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 mx-auto"
				>
					<div class="relative flex items-center gap-2">
						<div class="relative">
							<div
								class="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full animate-pulse"
							></div>
							<div
								class="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full animate-ping"
							></div>
						</div>
						<span
							class="hero-eyebrow text-foreground/90 font-semibold tracking-wider uppercase text-xs sm:text-sm"
							>Reimagining revenue acceleration</span
						>
					</div>
				</div>
				<div
					class="hero-subhead px-5 sm:px-6 py-4 sm:py-3 bg-secondary/50 backdrop-blur-xl rounded-2xl border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 text-center max-w-3xl"
				>
					<span
						class="leading-relaxed text-muted-foreground font-medium"
						>Redefining the sales workforce so every seller operates
						like a founder with reasoning-grade intelligence in
						every workflow</span
					>
				</div>
			</div>

			<div class="mb-10 sm:mb-12 md:mb-14">
				<h1
					class="hero-title animate-fade-in-up text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground"
				>
					Sell Like a CEO
					<span
						class="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-primary to-rose-500 font-bold"
						>The rise of the singular rep</span
					>
				</h1>
			</div>

			<p
				class="hero-body animate-fade-in-up mb-10 sm:mb-12 text-center mx-auto text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
				style="animation-delay: 0.2s;"
			>
				Revenue AI Agents built for the Fortune 2000 pair reasoning
				models with real-time call intelligence and automatic
				follow-through so every rep thinks ahead.
			</p>

			<div
				class="flex flex-col sm:flex-row items-center sm:justify-center gap-5 mb-20 sm:mb-24 animate-fade-in-up"
				style="animation-delay: 0.35s;"
			>
				<button
					onclick={startOnboarding}
					onmousemove={(event) => handleTilt(event, 12)}
					onmouseleave={resetTilt}
					class="tilt-card group relative px-8 py-5 sm:px-10 sm:py-5 bg-gradient-to-r from-primary to-red-700 text-primary-foreground rounded-xl font-semibold text-lg tracking-tight overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.05] hover:-translate-y-1"
				>
					<span
						class="relative z-10 flex items-center justify-center gap-2"
					>
						Start Now, Skip Demos
						<svg
							class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2.5"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</span>
				</button>
				<a
					href="/contact-sales"
					onmousemove={(event) => handleTilt(event, 10)}
					onmouseleave={resetTilt}
					class="tilt-card relative px-8 py-5 sm:px-10 sm:py-5 bg-background/80 backdrop-blur-sm text-foreground rounded-xl font-semibold text-lg tracking-tight border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 text-center hover:scale-[1.05] hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
				>
					Contact Sales
				</a>
				<a
					href="/blog"
					onmousemove={(event) => handleTilt(event, 10)}
					onmouseleave={resetTilt}
					class="tilt-card relative px-8 py-5 sm:px-10 sm:py-5 bg-background/80 backdrop-blur-sm text-foreground rounded-xl font-semibold text-lg tracking-tight border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 text-center hover:scale-[1.05] hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
				>
					Resources
				</a>
			</div>

			<div
				class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto"
			>
				{#each [{ metric: "100%", label: "Every meeting captured", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }, { metric: "Real-time", label: "Live AI assistance", icon: "M13 10V3L4 14h7v7l9-11h-7z" }, { metric: "Auto", label: "Follow-up and planning", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" }] as feature, i}
					<div
						onmousemove={(event) => handleTilt(event, 10)}
						onmouseleave={resetTilt}
						role="presentation"
						class="tilt-card group relative bg-card/50 backdrop-blur-xl p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer"
						style={`animation-delay: ${0.6 + i * 0.1}s; transform: translate3d(0, 0, 0);`}
					>
						<div
							class="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
						></div>
						<div class="relative">
							<div
								class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4"
							>
								<div
									class="p-2 sm:p-3 bg-secondary rounded-lg sm:rounded-xl border border-border group-hover:border-primary/50 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-primary/10"
								>
									<svg
										class="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-primary transition-colors"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2.5"
											d={feature.icon}
										/>
									</svg>
								</div>
								<span
									class="text-3xl sm:text-4xl text-foreground font-black group-hover:text-primary transition-colors duration-300"
									>{feature.metric}</span
								>
							</div>
							<p
								class="text-muted-foreground font-bold tracking-wide uppercase text-xs sm:text-sm group-hover:text-foreground transition-colors"
							>
								{feature.label}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div
		class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce-slow"
	>
		<div
			class="w-7 h-12 border-2 border-border rounded-full flex items-start justify-center p-2 hover:border-primary transition-all duration-300 cursor-pointer group"
		>
			<div
				class="w-1.5 h-3 bg-primary rounded-full animate-scroll-indicator shadow-lg shadow-primary/50"
			></div>
		</div>
		<p class="text-xs text-muted-foreground text-center mt-2 font-medium">
			Scroll to explore
		</p>
	</div>
</section>

<style>
	/* Keep minimal styles for noise overlay */
	.hero-shell::after {
		content: "";
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22%3E%3Cdefs%3E%3CradialGradient id=%22g%22 cx=%220%22 cy=%220%22 r=%221%22 gradientUnits=%22userSpaceOnUse%22%3E%3Cstop stop-color=%22%23ffffff%22 stop-opacity=%220.12%22/%3E%3Cstop offset=%220.6%22 stop-color=%22%23ffffff%22 stop-opacity=%220%22/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg transform=%22translate(40 40)%22%3E%3Ccircle r=%221%22 fill=%22url(%23g)%22/%3E%3Ccircle r=%2230%22 fill=%22url(%23g)%22/%3E%3Ccircle r=%2250%22 fill=%22url(%23g)%22/%3E%3C/g%3E%3C/svg%3E");
		opacity: 0.4;
		mix-blend-mode: overlay;
	}
</style>
