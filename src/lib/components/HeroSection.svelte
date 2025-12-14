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
	class="relative min-h-screen flex items-center justify-center overflow-hidden bg-black hero-shell hero-type"
>
	<div class="absolute inset-0 hero-overlay" style={`transform: translateY(${scrollY * 0.5}px);`}>
		<div class="absolute inset-0 bg-gradient-to-b from-red-950/30 via-black via-50% to-black"></div>
		<div
			class="absolute inset-0 animate-grid-pulse hero-grid"
			style="background-image: linear-gradient(rgba(220, 38, 38, 0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(220, 38, 38, 0.08) 1.5px, transparent 1.5px); background-size: 60px 60px;"
		></div>

		<div
			class="absolute w-[600px] h-[600px] bg-red-600/25 rounded-full blur-3xl animate-float transition-transform duration-1000 hero-orb"
			style={`top: 15%; left: 20%; transform: translate(${mouseX * 0.03}px, ${mouseY * 0.03}px);`}
		></div>
		<div
			class="absolute w-[500px] h-[500px] bg-red-800/15 rounded-full blur-3xl animate-float-delayed transition-transform duration-1000 hero-orb"
			style={`bottom: 15%; right: 20%; transform: translate(${-mouseX * 0.02}px, ${-mouseY * 0.02}px);`}
		></div>

		<div
			class="absolute top-1/3 left-1/4 w-80 h-80 bg-red-500/15 rounded-full blur-3xl animate-float hero-orb"
			style="animation-delay: 2s;"
		></div>
		<div
			class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-700/20 rounded-full blur-3xl animate-float-delayed hero-orb"
			style="animation-delay: 1s;"
		></div>

		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute h-px w-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent opacity-30 animate-scan"></div>
			<div
				class="absolute h-px w-full bg-gradient-to-r from-transparent via-red-400/20 to-transparent opacity-20 animate-scan"
				style="animation-delay: 3s; animation-duration: 10s;"
			></div>
		</div>

		<div class="absolute inset-0">
			{#each Array(30) as _, i}
				<div
					class="absolute w-1.5 h-1.5 bg-red-500/40 rounded-full animate-particle-float"
					style={`left: ${Math.random() * 100}%; top: ${Math.random() * 100}%; animation-delay: ${Math.random() * 5}s; animation-duration: ${8 + Math.random() * 4}s;`}
				></div>
			{/each}
		</div>

		<div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 hero-spotlight"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-6 py-24 sm:py-32 md:py-40">
		<div
			class={`transform transition-all duration-1000 ${visibleHero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
		>
			<div class="flex flex-col gap-4 sm:gap-5 mb-12 sm:mb-16 animate-slide-down">
				<div class="hero-pill inline-flex items-center gap-2 sm:gap-4 px-5 sm:px-6 py-3 sm:py-2.5 bg-zinc-950/90 backdrop-blur-xl rounded-full border border-red-900/50 group hover:border-red-600/70 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/30">
					<div class="relative flex items-center gap-2">
						<div class="relative">
							<div class="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-pulse"></div>
							<div class="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-ping"></div>
						</div>
						<span class="hero-eyebrow">Revenue AI Agents built for the Fortune 2000</span>
					</div>
				</div>
				<div class="hero-subhead px-5 sm:px-6 py-4 sm:py-3 bg-gradient-to-r from-red-950/30 via-red-950/20 to-red-950/30 backdrop-blur-xl rounded-2xl border border-red-900/30 hover:border-red-800/50 transition-all duration-500 hover:shadow-lg hover:shadow-red-900/20">
					<span class="leading-relaxed">Redefining the sales workforce so every seller operates like a founder with reasoning-grade intelligence in every workflow.</span>
				</div>
			</div>

			<div class="mb-10 sm:mb-12 md:mb-14">
				<h1 class="hero-title animate-fade-in-up">
					Sell Like a CEO
					<span class="hero-title-accent">The rise of the singular rep starts here.</span>
				</h1>
			</div>

			<p class="hero-body animate-fade-in-up mb-10 sm:mb-12" style="animation-delay: 0.2s;">
				Revenue AI Agents built for the Fortune 2000 pair reasoning models with real-time call intelligence and automatic follow-through so every rep thinks ahead, responds instantly, and ships the next step without the busywork.
			</p>

			<div class="flex flex-col sm:flex-row gap-5 mb-20 sm:mb-24 animate-fade-in-up" style="animation-delay: 0.35s;">
				<button
					onclick={startOnboarding}
					onmousemove={(event) => handleTilt(event, 12)}
					onmouseleave={resetTilt}
					class="tilt-card group relative px-8 py-5 sm:px-10 sm:py-5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-semibold text-lg tracking-tight overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/60 hover:scale-[1.05] hover:-translate-y-1 primary-cta"
				>
					<span class="relative z-10 flex items-center justify-center gap-2">
						Start Now, Skip Demos
						<svg class="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
						</svg>
					</span>
					<div class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					<div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer"></div>
					<div class="absolute inset-0 rounded-xl ring-2 ring-red-500/0 group-hover:ring-red-500/50 transition-all duration-300"></div>
				</button>
				<a
					href="/contact-sales"
					onmousemove={(event) => handleTilt(event, 10)}
					onmouseleave={resetTilt}
					class="tilt-card relative px-8 py-5 sm:px-10 sm:py-5 bg-zinc-950/50 backdrop-blur-sm text-white rounded-xl font-semibold text-lg tracking-tight border-2 border-zinc-800 hover:border-red-600 hover:bg-red-950/30 transition-all duration-300 text-center hover:scale-[1.05] hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/30 secondary-cta overflow-hidden"
				>
					Contact Sales
				</a>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl">
				{#each [
					{
						metric: '100%',
						label: 'Every meeting captured',
						icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
					},
					{
						metric: 'Real-time',
						label: 'Live AI assistance',
						icon: 'M13 10V3L4 14h7v7l9-11h-7z'
					},
					{
						metric: 'Auto',
						label: 'Follow-up and planning',
						icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
					}
				] as feature, i}
					<div
						onmousemove={(event) => handleTilt(event, 10)}
						onmouseleave={resetTilt}
						class="tilt-card group relative bg-gradient-to-br from-zinc-950/80 to-zinc-950/50 backdrop-blur-xl p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl border-2 border-zinc-900 hover:border-red-900/60 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/30 animate-fade-in-up cursor-pointer"
						style={`animation-delay: ${0.6 + i * 0.1}s; transform: translate3d(0, 0, 0);`}
					>
						<div class="absolute inset-0 bg-gradient-to-br from-red-950/0 via-red-950/10 to-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
						<div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/15 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
						<div class="relative">
							<div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
								<div class="p-2 sm:p-3 bg-gradient-to-br from-red-950/50 to-red-950/30 rounded-lg sm:rounded-xl border border-red-900/40 group-hover:border-red-600/60 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-red-900/20">
									<svg class="w-5 h-5 sm:w-6 sm:h-6 text-red-500 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d={feature.icon} />
									</svg>
								</div>
								<span class="hero-metric-number text-3xl sm:text-4xl text-white group-hover:text-red-400 transition-colors duration-300">{feature.metric}</span>
							</div>
							<p class="hero-metric-label text-zinc-500 group-hover:text-zinc-300 transition-colors leading-relaxed">{feature.label}</p>
						</div>
						<div class="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600/0 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
		<div class="w-7 h-12 border-2 border-zinc-800 rounded-full flex items-start justify-center p-2 hover:border-red-500 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-red-900/30">
			<div class="w-1.5 h-3 bg-red-500 rounded-full animate-scroll-indicator group-hover:bg-red-400 shadow-lg shadow-red-500/50"></div>
		</div>
		<p class="text-xs text-zinc-600 text-center mt-2 font-medium">Scroll to explore</p>
	</div>
</section>

<style>
	.hero-type {
		font-family: 'Space Grotesk', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
	}

	.hero-pill {
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}

	.hero-eyebrow {
		font-size: clamp(0.8rem, 1.5vw, 1rem);
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #e5e7eb;
	}

	.hero-subhead {
		font-size: clamp(1.05rem, 1.8vw, 1.2rem);
		font-weight: 500;
		color: #d4d4d8;
		line-height: 1.6;
	}

	.hero-title {
		font-size: clamp(2.75rem, 8vw, 5.75rem);
		font-weight: 600;
		letter-spacing: -0.04em;
		line-height: 1;
		color: #f7f5f2;
	}

	.hero-title-accent {
		display: block;
		margin-top: 0.6rem;
		background: linear-gradient(90deg, #f97316, #ef4444, #fb7185);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		font-weight: 600;
	}

	.hero-body {
		font-size: clamp(1.1rem, 1.7vw, 1.4rem);
		font-weight: 500;
		color: rgba(244, 244, 245, 0.85);
		line-height: 1.7;
		max-width: 48rem;
	}

	.hero-metric-number {
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.hero-metric-label {
		font-size: 0.8rem;
		font-weight: 600;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
</style>
