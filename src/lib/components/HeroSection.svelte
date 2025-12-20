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
	class="relative min-h-screen flex items-center justify-center overflow-hidden hero-shell hero-type"
>
		<div class="absolute inset-0 hero-overlay" style={`transform: translateY(${scrollY * 0.5}px);`}>
			<div class="absolute inset-0 bg-gradient-to-b from-red-950/30 via-black via-50% to-black dark:from-red-950/30 dark:via-black dark:via-50% dark:to-black from-transparent via-transparent to-transparent"></div>
			<div
				class="absolute inset-0 animate-grid-pulse hero-grid"
				style="background-image: linear-gradient(rgba(220, 38, 38, 0.08) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(220, 38, 38, 0.08) 1.5px, transparent 1.5px); background-size: 60px 60px;"
			></div>

		<div
			class="absolute w-[600px] h-[600px] bg-red-600/25 dark:bg-red-600/25 bg-red-500/12 rounded-full blur-3xl animate-float transition-transform duration-1000 hero-orb"
			style={`top: 15%; left: 20%; transform: translate(${mouseX * 0.03}px, ${mouseY * 0.03}px);`}
		></div>
		<div
			class="absolute w-[500px] h-[500px] bg-red-800/15 dark:bg-red-800/15 bg-orange-400/10 rounded-full blur-3xl animate-float-delayed transition-transform duration-1000 hero-orb"
			style={`bottom: 15%; right: 20%; transform: translate(${-mouseX * 0.02}px, ${-mouseY * 0.02}px);`}
		></div>

		<div
			class="absolute top-1/3 left-1/4 w-80 h-80 bg-red-500/15 dark:bg-red-500/15 bg-red-400/8 rounded-full blur-3xl animate-float hero-orb"
			style="animation-delay: 2s;"
		></div>
		<div
			class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-700/20 dark:bg-red-700/20 bg-orange-300/10 rounded-full blur-3xl animate-float-delayed hero-orb"
			style="animation-delay: 1s;"
		></div>

		<div class="absolute inset-0 overflow-hidden">
			<div class="absolute h-px w-full bg-gradient-to-r from-transparent via-red-500/40 dark:via-red-500/40 via-red-500/15 to-transparent opacity-30 dark:opacity-30 opacity-20 animate-scan hero-scan-line"></div>
			<div
				class="absolute h-px w-full bg-gradient-to-r from-transparent via-red-400/20 dark:via-red-400/20 via-red-400/10 to-transparent opacity-20 dark:opacity-20 opacity-10 animate-scan hero-scan-line"
				style="animation-delay: 3s; animation-duration: 10s;"
			></div>
		</div>

		<div class="absolute inset-0">
			{#each Array(30) as _, i}
				<div
					class="absolute w-1.5 h-1.5 bg-red-500/40 dark:bg-red-500/40 bg-red-500/20 rounded-full animate-particle-float"
					style={`left: ${Math.random() * 100}%; top: ${Math.random() * 100}%; animation-delay: ${Math.random() * 5}s; animation-duration: ${8 + Math.random() * 4}s;`}
				></div>
			{/each}
		</div>

	<div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50 dark:to-black/50 to-white/30 hero-spotlight"></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-6 py-24 sm:py-32 md:py-40">
		<div
			class={`transform transition-all duration-1000 ${visibleHero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
		>
			<div class="flex flex-col items-center gap-4 sm:gap-5 mb-12 sm:mb-16 animate-slide-down text-center">
				<div class="hero-pill inline-flex items-center gap-2 sm:gap-4 px-5 sm:px-6 py-3 sm:py-2.5 bg-zinc-950/90 dark:bg-zinc-950/90 bg-white/90 backdrop-blur-xl rounded-full border border-red-900/50 dark:border-red-900/50 border-red-200 group hover:border-red-600/70 dark:hover:border-red-600/70 hover:border-red-500 transition-all duration-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-red-900/30 dark:hover:shadow-red-900/30 hover:shadow-red-500/20 mx-auto">
					<div class="relative flex items-center gap-2">
						<div class="relative">
							<div class="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-pulse"></div>
							<div class="absolute inset-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full animate-ping"></div>
						</div>
						<span class="hero-eyebrow dark:text-gray-200 text-gray-950">Reimagining revenue acceleration through an AI-driven sales workforce</span>
					</div>
				</div>
				<div class="hero-subhead px-5 sm:px-6 py-4 sm:py-3 bg-gradient-to-r from-red-50/80 via-red-50/60 to-red-50/80 dark:from-red-950/30 dark:via-red-950/20 dark:to-red-950/30 backdrop-blur-xl rounded-2xl border border-rose-200 dark:border-red-900/30 hover:border-red-400 dark:hover:border-red-800/50 transition-all duration-500 hover:shadow-lg hover:shadow-red-900/20 dark:hover:shadow-red-900/20 hover:shadow-red-500/20 text-center">
					<span class="leading-relaxed text-rose-800 dark:text-gray-300 font-semibold">Redefining the sales workforce so every seller operates like a founder with reasoning-grade intelligence in every workflow</span>
				</div>
			</div>

			<div class="mb-10 sm:mb-12 md:mb-14">
				<h1 class="hero-title animate-fade-in-up text-center">
					Sell Like a CEO
					<span class="hero-title-accent">The rise of the singular rep starts here</span>
				</h1>
			</div>

			<p class="hero-body animate-fade-in-up mb-10 sm:mb-12 text-center mx-auto" style="animation-delay: 0.2s;">
				Revenue AI Agents built for the Fortune 2000 pair reasoning models with real-time call intelligence and automatic follow-through so every rep thinks ahead, responds instantly, and ships the next step without the busywork
			</p>

			<div class="flex flex-col sm:flex-row items-center sm:justify-center gap-5 mb-20 sm:mb-24 animate-fade-in-up" style="animation-delay: 0.35s;">
				<button
					onclick={startOnboarding}
					onmousemove={(event) => handleTilt(event, 12)}
					onmouseleave={resetTilt}
					class="tilt-card group relative px-8 py-5 sm:px-10 sm:py-5 bg-gradient-to-r from-red-600 to-red-700 text-white dark:text-white text-rose-800 rounded-xl font-semibold text-lg tracking-tight overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/60 hover:scale-[1.05] hover:-translate-y-1 primary-cta"
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
					class="tilt-card relative px-8 py-5 sm:px-10 sm:py-5 bg-zinc-950/50 dark:bg-zinc-950/50 bg-white/80 backdrop-blur-sm text-white dark:text-white text-gray-900 rounded-xl font-semibold text-lg tracking-tight border-2 border-zinc-800 dark:border-zinc-800 border-gray-300 hover:border-red-600 dark:hover:border-red-600 hover:border-red-500 hover:bg-red-950/30 dark:hover:bg-red-950/30 hover:bg-red-50 transition-all duration-300 text-center hover:scale-[1.05] hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/30 dark:hover:shadow-red-900/30 hover:shadow-red-500/20 secondary-cta overflow-hidden"
				>
					Contact Sales
				</a>
				<a
					href="/blog"
					onmousemove={(event) => handleTilt(event, 10)}
					onmouseleave={resetTilt}
					class="tilt-card relative px-8 py-5 sm:px-10 sm:py-5 bg-zinc-950/50 dark:bg-zinc-950/50 bg-white/80 backdrop-blur-sm text-white dark:text-white text-gray-900 rounded-xl font-semibold text-lg tracking-tight border-2 border-zinc-800 dark:border-zinc-800 border-gray-300 hover:border-red-600 dark:hover:border-red-600 hover:border-red-500 hover:bg-red-950/30 dark:hover:bg-red-950/30 hover:bg-red-50 transition-all duration-300 text-center hover:scale-[1.05] hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/30 dark:hover:shadow-red-900/30 hover:shadow-red-500/20 secondary-cta overflow-hidden"
				>
					Resources
				</a>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto">
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
						role="presentation"
						class="tilt-card group relative bg-gradient-to-br from-zinc-950/80 to-zinc-950/50 dark:from-zinc-950/80 dark:to-zinc-950/50 from-white/90 to-gray-50/80 backdrop-blur-xl p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl border-2 border-zinc-900 dark:border-zinc-900 border-gray-200 hover:border-red-900/60 dark:hover:border-red-900/60 hover:border-red-500 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-900/30 dark:hover:shadow-red-900/30 hover:shadow-red-500/20 animate-fade-in-up cursor-pointer"
						style={`animation-delay: ${0.6 + i * 0.1}s; transform: translate3d(0, 0, 0);`}
					>
						<div class="absolute inset-0 bg-gradient-to-br from-red-950/0 via-red-950/10 to-red-950/20 dark:from-red-950/0 dark:via-red-950/10 dark:to-red-950/20 from-red-50/0 via-red-50/20 to-red-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
						<div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/15 dark:via-red-600/15 via-red-500/10 to-red-600/0 dark:to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
						<div class="relative">
							<div class="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
								<div class="p-2 sm:p-3 bg-gradient-to-br from-red-950/50 to-red-950/30 dark:from-red-950/50 dark:to-red-950/30 from-red-50 to-red-100 rounded-lg sm:rounded-xl border border-red-900/40 dark:border-red-900/40 border-red-200 group-hover:border-red-600/60 dark:group-hover:border-red-600/60 group-hover:border-red-500 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg shadow-red-900/20 dark:shadow-red-900/20 shadow-red-500/20">
									<svg class="w-5 h-5 sm:w-6 sm:h-6 text-red-500 dark:text-red-500 group-hover:text-red-400 dark:group-hover:text-red-400 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d={feature.icon} />
									</svg>
								</div>
								<span class="hero-metric-number text-3xl sm:text-4xl text-white dark:text-white text-gray-950 group-hover:text-red-400 dark:group-hover:text-red-400 group-hover:text-red-600 transition-colors duration-300 font-black">{feature.metric}</span>
							</div>
							<p class="hero-metric-label text-zinc-500 dark:text-zinc-500 text-gray-700 group-hover:text-zinc-300 dark:group-hover:text-zinc-300 group-hover:text-gray-900 transition-colors leading-relaxed font-semibold">{feature.label}</p>
						</div>
						<div class="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-600/0 to-red-600/10 dark:from-red-600/0 dark:to-red-600/10 from-red-500/0 to-red-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
		<div class="w-7 h-12 border-2 border-zinc-800 dark:border-zinc-800 border-gray-300 rounded-full flex items-start justify-center p-2 hover:border-red-500 dark:hover:border-red-500 transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-red-900/30 dark:hover:shadow-red-900/30 hover:shadow-red-500/20">
			<div class="w-1.5 h-3 bg-red-500 rounded-full animate-scroll-indicator group-hover:bg-red-400 shadow-lg shadow-red-500/50"></div>
		</div>
		<p class="text-xs text-zinc-600 dark:text-zinc-600 text-gray-500 text-center mt-2 font-medium">Scroll to explore</p>
	</div>
</section>

<style>
	.hero-type {
		font-family: 'Space Grotesk', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
		color: inherit;
	}

	:global(.dark) .hero-type {
		color: #f4f4f5;
	}

	.hero-shell::after {
		/* Soft noise for both themes */
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22%3E%3Cdefs%3E%3CradialGradient id=%22g%22 cx=%220%22 cy=%220%22 r=%221%22 gradientUnits=%22userSpaceOnUse%22%3E%3Cstop stop-color=%22%23ffffff%22 stop-opacity=%220.18%22/%3E%3Cstop offset=%220.6%22 stop-color=%22%23ffffff%22 stop-opacity=%220%22/%3E%3C/radialGradient%3E%3C/defs%3E%3Cg transform=%22translate(40 40)%22%3E%3Ccircle r=%221%22 fill=%22url(%23g)%22/%3E%3Ccircle r=%2230%22 fill=%22url(%23g)%22/%3E%3Ccircle r=%2250%22 fill=%22url(%23g)%22/%3E%3C/g%3E%3C/svg%3E');
		mix-blend-mode: soft-light;
		opacity: 0.4;
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
		color: inherit;
	}

	:global(.dark) .hero-eyebrow {
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

	:root[data-theme='light'] .hero-title {
		color: #0f172a;
		text-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
	}

	:root[data-theme='light'] .hero-title-accent {
		background: linear-gradient(90deg, #ef4444, #f97316, #f43f5e);
	}

	:root[data-theme='light'] .hero-body,
	:root[data-theme='light'] .hero-subhead,
	:root[data-theme='light'] .hero-eyebrow {
		color: #0f172a;
	}

	:root[data-theme='light'] .hero-subhead {
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.82));
		border-color: #e2e8f0;
		box-shadow: 0 18px 60px rgba(15, 23, 42, 0.08);
	}

	:global([data-theme='light'] .hero-subhead span) {
		color: #0f172a;
		font-weight: 700;
	}

	:root[data-theme='light'] .hero-pill {
		background: linear-gradient(120deg, rgba(255, 241, 242, 0.92), rgba(254, 242, 242, 0.88));
		border-color: #fecdd3;
		color: #b91c1c;
		box-shadow: 0 18px 60px rgba(249, 115, 22, 0.14);
	}

	:root[data-theme='light'] .hero-overlay {
		background: radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.12), transparent 35%),
			radial-gradient(circle at 80% 15%, rgba(14, 165, 233, 0.14), transparent 40%);
	}

	:root[data-theme='light'] .hero-grid {
		opacity: 0.24 !important;
	}

	:root[data-theme='light'] .hero-shell::after {
		opacity: 0.25;
		mix-blend-mode: multiply;
	}

	/* Enrich dark mode with deeper glow */
	.hero-shell {
		background: radial-gradient(circle at 50% 10%, rgba(239, 68, 68, 0.14), transparent 35%),
			radial-gradient(circle at 10% 40%, rgba(59, 7, 100, 0.12), transparent 45%),
			#05070c;
	}

	.hero-grid {
		opacity: 0.35;
	}

	.hero-overlay > div:first-child {
		box-shadow: inset 0 -80px 150px rgba(0, 0, 0, 0.55);
	}

	.hero-title {
		text-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
	}

	:global([data-theme='light'] .hero-shell) {
		background: 
			radial-gradient(ellipse 120% 80% at 20% 20%, rgba(239, 68, 68, 0.25), transparent 60%),
			radial-gradient(ellipse 100% 70% at 80% 10%, rgba(249, 115, 22, 0.2), transparent 55%),
			radial-gradient(ellipse 80% 60% at 50% 80%, rgba(14, 165, 233, 0.12), transparent 50%),
			radial-gradient(ellipse 60% 50% at 70% 60%, rgba(168, 85, 247, 0.08), transparent 45%),
			linear-gradient(180deg, #fafbfc 0%, #f8fafc 25%, #f1f5f9 50%, #ffffff 75%, #ffffff 100%) !important;
		color: #0f172a !important;
		position: relative;
	}
	
	:global([data-theme='light'] .hero-shell::before) {
		content: '';
		position: absolute;
		inset: 0;
		background: 
			radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.6), transparent 40%),
			radial-gradient(circle at 70% 20%, rgba(255, 255, 255, 0.4), transparent 35%);
		pointer-events: none;
		z-index: 0;
	}

	:global([data-theme='light'] .hero-overlay) {
		background: 
			radial-gradient(ellipse 100% 80% at 25% 20%, rgba(239, 68, 68, 0.18), transparent 50%),
			radial-gradient(ellipse 90% 70% at 75% 10%, rgba(249, 115, 22, 0.15), transparent 50%),
			radial-gradient(ellipse 70% 60% at 50% 80%, rgba(14, 165, 233, 0.1), transparent 50%),
			radial-gradient(ellipse 50% 40% at 70% 60%, rgba(168, 85, 247, 0.06), transparent 40%) !important;
	}
	
	:global([data-theme='light'] .hero-overlay > div:first-child) {
		background: transparent !important;
		box-shadow: none !important;
	}

	:global([data-theme='light'] .hero-shell .hero-grid) {
		opacity: 0.08 !important;
		filter: saturate(0.3) brightness(1.1);
		background-image: 
			linear-gradient(rgba(239, 68, 68, 0.04) 1px, transparent 1px), 
			linear-gradient(90deg, rgba(239, 68, 68, 0.04) 1px, transparent 1px),
			linear-gradient(rgba(249, 115, 22, 0.02) 1px, transparent 1px),
			linear-gradient(90deg, rgba(249, 115, 22, 0.02) 1px, transparent 1px) !important;
		background-size: 60px 60px, 60px 60px, 120px 120px, 120px 120px !important;
	}

	:global([data-theme='light'] .hero-shell .hero-pill) {
		background: 
			linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 247, 237, 0.9) 50%, rgba(254, 242, 242, 0.95) 100%) !important;
		border: 1.5px solid rgba(239, 68, 68, 0.25) !important;
		color: #dc2626 !important;
		box-shadow: 
			0 8px 32px rgba(239, 68, 68, 0.12),
			0 4px 16px rgba(239, 68, 68, 0.08),
			0 0 0 1px rgba(255, 255, 255, 0.9),
			inset 0 1px 2px rgba(255, 255, 255, 0.9),
			inset 0 -1px 1px rgba(239, 68, 68, 0.05) !important;
		backdrop-filter: blur(20px) saturate(200%) brightness(1.05);
		position: relative;
		overflow: hidden;
	}
	
	:global([data-theme='light'] .hero-shell .hero-pill::before) {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%);
		pointer-events: none;
		border-radius: 9999px;
	}
	
	:global([data-theme='light'] .hero-shell .hero-pill:hover) {
		border-color: rgba(239, 68, 68, 0.4) !important;
		box-shadow: 
			0 12px 40px rgba(239, 68, 68, 0.18),
			0 6px 20px rgba(239, 68, 68, 0.12),
			0 0 0 1px rgba(255, 255, 255, 0.95),
			inset 0 1px 2px rgba(255, 255, 255, 0.95) !important;
		transform: translateY(-1px);
	}

	:global([data-theme='light'] .hero-shell .hero-subhead) {
		background: 
			linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 251, 250, 0.96) 50%, rgba(255, 255, 255, 0.98) 100%) !important;
		border: 1.5px solid rgba(226, 232, 240, 0.7) !important;
		color: #0f172a !important;
		box-shadow: 
			0 12px 40px rgba(15, 23, 42, 0.08),
			0 6px 20px rgba(15, 23, 42, 0.04),
			0 0 0 1px rgba(255, 255, 255, 0.9),
			inset 0 2px 4px rgba(255, 255, 255, 0.9),
			inset 0 -1px 2px rgba(226, 232, 240, 0.3) !important;
		backdrop-filter: blur(24px) saturate(200%) brightness(1.05);
		position: relative;
		overflow: hidden;
		font-weight: 600 !important;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	:global([data-theme='light'] .hero-shell .hero-subhead::before) {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
		transition: left 0.6s ease;
	}
	
	:global([data-theme='light'] .hero-shell .hero-subhead:hover::before) {
		left: 100%;
	}
	
	:global([data-theme='light'] .hero-shell .hero-subhead:hover) {
		border-color: rgba(239, 68, 68, 0.3) !important;
		box-shadow: 
			0 16px 48px rgba(239, 68, 68, 0.12),
			0 8px 24px rgba(239, 68, 68, 0.08),
			0 0 0 1px rgba(255, 255, 255, 0.95),
			inset 0 2px 4px rgba(255, 255, 255, 0.95) !important;
		transform: translateY(-2px);
	}

	:global([data-theme='light'] .hero-shell .hero-title) {
		color: #000000 !important;
		text-shadow: none !important;
		font-weight: 900 !important;
		letter-spacing: -0.04em !important;
		line-height: 1.05 !important;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global([data-theme='light'] .hero-shell .hero-title-accent) {
		background: linear-gradient(135deg, #ef4444 0%, #f97316 30%, #f43f5e 60%, #ec4899 100%) !important;
		-webkit-background-clip: text !important;
		background-clip: text !important;
		color: transparent !important;
		filter: drop-shadow(0 4px 8px rgba(239, 68, 68, 0.25)) drop-shadow(0 2px 4px rgba(249, 115, 22, 0.2));
		position: relative;
		display: inline-block;
	}
	
	:global([data-theme='light'] .hero-shell .hero-title-accent::after) {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		right: 0;
		height: 3px;
		background: linear-gradient(90deg, #ef4444, #f97316, #f43f5e);
		border-radius: 2px;
		opacity: 0.3;
		filter: blur(4px);
	}

	:global([data-theme='light'] .hero-shell .hero-body) {
		color: #1e293b !important;
		text-shadow: none !important;
		font-weight: 600 !important;
		line-height: 1.75 !important;
		letter-spacing: -0.01em !important;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global([data-theme='light'] .hero-shell .hero-eyebrow) {
		color: #dc2626 !important;
		font-weight: 800 !important;
		letter-spacing: 0.15em !important;
		text-shadow: none !important;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	:global([data-theme='light'] .hero-shell) {
		position: relative;
		z-index: 1;
	}
	
	:global([data-theme='light'] .hero-shell .hero-overlay) {
		opacity: 1 !important;
	}

	:global([data-theme='light'] .hero-shell .hero-scan-line) {
		background: linear-gradient(90deg, transparent, rgba(226, 232, 240, 0.45), transparent) !important;
		opacity: 0.12 !important;
		filter: blur(0px);
	}

	:global([data-theme='light'] .hero-shell .secondary-cta) {
		background: 
			linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%) !important;
		color: #000000 !important;
		border: 1.5px solid rgba(226, 232, 240, 0.7) !important;
		box-shadow: 
			0 8px 32px rgba(15, 23, 42, 0.1),
			0 4px 16px rgba(15, 23, 42, 0.06),
			0 0 0 1px rgba(255, 255, 255, 0.9),
			inset 0 2px 4px rgba(255, 255, 255, 0.9),
			inset 0 -1px 2px rgba(226, 232, 240, 0.3) !important;
		backdrop-filter: blur(20px) saturate(200%) brightness(1.05);
		font-weight: 700 !important;
		position: relative;
		overflow: hidden;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	:global([data-theme='light'] .hero-shell .secondary-cta::before) {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, transparent 50%);
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	:global([data-theme='light'] .hero-shell .secondary-cta:hover) {
		border-color: rgba(239, 68, 68, 0.4) !important;
		background: 
			linear-gradient(135deg, rgba(254, 242, 242, 0.98) 0%, rgba(255, 247, 237, 0.95) 100%) !important;
		color: #dc2626 !important;
		box-shadow: 
			0 12px 40px rgba(239, 68, 68, 0.18),
			0 6px 24px rgba(239, 68, 68, 0.12),
			0 0 0 1px rgba(239, 68, 68, 0.25),
			inset 0 2px 4px rgba(255, 255, 255, 0.95),
			inset 0 -1px 2px rgba(239, 68, 68, 0.1) !important;
		transform: translateY(-3px) scale(1.02) !important;
	}
	
	:global([data-theme='light'] .hero-shell .secondary-cta:hover::before) {
		opacity: 1;
	}

	:global([data-theme='light'] .hero-shell .tilt-card) {
		background: 
			linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.96) 50%, rgba(255, 255, 255, 0.98) 100%) !important;
		border: 1.5px solid rgba(226, 232, 240, 0.7) !important;
		color: #0f172a !important;
		box-shadow: 
			0 12px 40px rgba(15, 23, 42, 0.1),
			0 6px 20px rgba(15, 23, 42, 0.06),
			0 0 0 1px rgba(255, 255, 255, 0.9),
			inset 0 2px 4px rgba(255, 255, 255, 0.9),
			inset 0 -1px 2px rgba(226, 232, 240, 0.3) !important;
		backdrop-filter: blur(24px) saturate(200%) brightness(1.05);
		position: relative;
		overflow: hidden;
	}
	
	:global([data-theme='light'] .hero-shell .tilt-card::before) {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(239, 68, 68, 0.03) 0%, transparent 50%);
		opacity: 0;
		transition: opacity 0.3s ease;
		pointer-events: none;
	}

	:global([data-theme='light'] .hero-shell .tilt-card:hover) {
		border-color: rgba(239, 68, 68, 0.35) !important;
		box-shadow: 
			0 20px 56px rgba(239, 68, 68, 0.15),
			0 10px 32px rgba(239, 68, 68, 0.1),
			0 0 0 1px rgba(239, 68, 68, 0.2),
			inset 0 2px 4px rgba(255, 255, 255, 0.95),
			inset 0 -1px 2px rgba(239, 68, 68, 0.08) !important;
		transform: translateY(-4px) !important;
	}
	
	:global([data-theme='light'] .hero-shell .tilt-card:hover::before) {
		opacity: 1;
	}

	:global([data-theme='light'] .hero-shell .hero-metric-number) {
		color: #dc2626 !important;
		font-weight: 900 !important;
		text-shadow: none !important;
		letter-spacing: -0.02em !important;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global([data-theme='light'] .hero-shell .hero-metric-label) {
		color: #334155 !important;
		font-weight: 700 !important;
		letter-spacing: 0.1em !important;
		text-shadow: none !important;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
