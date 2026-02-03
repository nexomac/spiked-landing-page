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
	class="relative h-[120vh] min-h-[100dvh] flex items-center justify-center overflow-hidden hero-shell font-sans text-foreground"
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
							>Reimagining Cognitive Intelligence</span
						>
					</div>
				</div>
				<div
					class="hero-subhead px-5 sm:px-6 py-4 sm:py-3 bg-secondary/50 backdrop-blur-xl rounded-2xl border border-border hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 text-center max-w-3xl"
				>
					<span
						class="leading-relaxed text-muted-foreground font-medium">
					Real-time conversational, contextual, and computational intelligence.<br />One-shot selling. Unified customer actions. No cognitive drag.</span>
				</div>
				<h1
					class="hero-title animate-fade-in-up text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground"
				>
					Sell like <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-primary to-rose-500 font-bold">a CEO.</span>
					<span
						class="block mt-4 text-foreground"
						>The rise of the singular rep starts here.</span
					>
				</h1>
			</div>

			<p
				class="hero-body animate-fade-in-up mb-10 sm:mb-12 text-center mx-auto text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
				style="animation-delay: 0.2s;"
			>
				Sales doesn't fail from lack of skill. It fails from cognitive overload.<br />
				SpikedAI is the Executive Cognition System that turns every seller into a Singular Rep.
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
						Book a Demo
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
