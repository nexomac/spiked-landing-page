<script>
	import { onMount } from 'svelte';
	import { ArrowRight, Zap, Globe, TrendingUp, Users, MessageSquare, BarChart3, Shield, Sparkles, Rocket, Target } from 'lucide-svelte';

	// Lazy-load browser-only deps to keep SSR safe on Vercel
	let gsap;
	let ScrollTrigger;
	let Lenis;
	let confetti;
	
	let scrollY = $state(0);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let smoothScroll = $state(0);
	let lenis;
	let isVisible = $state({
		hero: false,
		features: false,
		stats: false,
		demo: false,
		testimonial: false,
		logos: false
	});
	
	let hoveredCard = $state(null);
	
	onMount(async () => {
		try {
			const [
				{ default: LenisModule },
				{ default: gsapModule },
				{ ScrollTrigger: ScrollTriggerModule },
				{ default: confettiModule }
			] = await Promise.all([
				import('@studio-freight/lenis'),
				import('gsap'),
				import('gsap/ScrollTrigger'),
				import('canvas-confetti')
			]);

			Lenis = LenisModule;
			gsap = gsapModule;
			ScrollTrigger = ScrollTriggerModule;
			confetti = confettiModule;
			gsap.registerPlugin(ScrollTrigger);

			// Initialize Lenis smooth scroll
			lenis = new Lenis({
				duration: 1.2,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				orientation: 'vertical',
				smoothWheel: true,
				wheelMultiplier: 1,
				smoothTouch: false,
				touchMultiplier: 2
			});

			function raf(time) {
				lenis.raf(time);
				requestAnimationFrame(raf);
			}

			requestAnimationFrame(raf);
			
			const handleScroll = () => {
				scrollY = window.scrollY;
				smoothScroll = lenis.scroll || 0;
			};
			
			const handleMouseMove = (e) => {
				mouseX = e.clientX;
				mouseY = e.clientY;
			};
			
			// GSAP animations for sections
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const section = entry.target.dataset.section;
							if (section) {
								isVisible[section] = true;
								
								// Trigger GSAP animations
								gsap.from(entry.target.querySelectorAll('.animate-in'), {
									y: 50,
									opacity: 0,
									duration: 1,
									stagger: 0.1,
									ease: 'power3.out'
								});
							}
						}
					});
				},
				{ threshold: 0.1 }
			);
			
			document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el));
			window.addEventListener('scroll', handleScroll);
			window.addEventListener('mousemove', handleMouseMove);
			
			// Trigger hero animation with GSAP
			setTimeout(() => {
				isVisible.hero = true;
				
				gsap.from('.hero-badge', {
					scale: 0,
					opacity: 0,
					duration: 0.6,
					ease: 'back.out(1.7)'
				});
				
				gsap.from('.hero-title', {
					y: 100,
					opacity: 0,
					duration: 1,
					delay: 0.3,
					ease: 'power4.out'
				});
				
				gsap.from('.hero-cta', {
					y: 30,
					opacity: 0,
					duration: 0.8,
					delay: 0.6,
					stagger: 0.1
				});
			}, 100);
			

			
			// Stats counter animation
			ScrollTrigger.create({
				trigger: '[data-section="stats"]',
				start: 'top 80%',
				onEnter: () => {
					document.querySelectorAll('.stat-value').forEach((el) => {
						const target = el.textContent;
						gsap.from(el, {
							textContent: 0,
							duration: 2,
							ease: 'power2.out',
							snap: { textContent: 1 }
						});
					});
				}
			});
			
			return () => {
				window.removeEventListener('scroll', handleScroll);
				window.removeEventListener('mousemove', handleMouseMove);
				observer.disconnect();

				lenis?.destroy();
				ScrollTrigger.getAll().forEach(trigger => trigger.kill());
			};
		} catch (error) {
			console.error('landing2 client init failed', error);
		}
	});
	
	// Handle CTA button click with confetti
	async function handleCTAClick() {
		if (!confetti) {
			const { default: confettiModule } = await import('canvas-confetti');
			confetti = confettiModule;
		}

		confetti({
			particleCount: 100,
			spread: 70,
			origin: { y: 0.6 },
			colors: ['#F59E0B', '#D97706', '#FBBF24']
		});
	}
	
	// Magnetic cursor effect for buttons
	function handleMouseEnterButton(e) {
		if (!gsap) return;

		gsap.to(e.currentTarget, {
			scale: 1.05,
			duration: 0.3,
			ease: 'power2.out'
		});
	}
	
	function handleMouseLeaveButton(e) {
		if (!gsap) return;

		gsap.to(e.currentTarget, {
			scale: 1,
			duration: 0.3,
			ease: 'power2.out'
		});
	}
	
	const stats = [
		{ value: '98%', label: 'Customer Satisfaction', color: 'from-green-400 to-green-600' },
		{ value: '2.5x', label: 'Revenue Growth', color: 'from-amber-400 to-amber-600' },
		{ value: '60%', label: 'Time Saved', color: 'from-blue-400 to-blue-600' }
	];
	
	const features = [
		{ 
			icon: Zap, 
			title: 'Lightning Fast', 
			description: 'Real-time AI responses that keep pace with your conversations',
			gradient: 'from-amber-500 to-orange-500'
		},
		{ 
			icon: Globe, 
			title: 'Global Scale', 
			description: 'Built for Fortune 2000 companies across all regions',
			gradient: 'from-blue-500 to-cyan-500'
		},
		{ 
			icon: TrendingUp, 
			title: 'Revenue Impact', 
			description: 'Direct measurable impact on your bottom line',
			gradient: 'from-green-500 to-emerald-500'
		},
		{ 
			icon: Shield, 
			title: 'Enterprise Security', 
			description: 'Bank-level encryption and compliance standards',
			gradient: 'from-purple-500 to-pink-500'
		},
		{ 
			icon: Sparkles, 
			title: 'AI-Powered Insights', 
			description: 'Advanced analytics that predict customer behavior',
			gradient: 'from-yellow-500 to-amber-500'
		},
		{ 
			icon: Rocket, 
			title: 'Rapid Deployment', 
			description: 'Get up and running in days, not months',
			gradient: 'from-red-500 to-orange-500'
		}
	];
	
	const companies = [
		'NVIDIA', 'Microsoft', 'Salesforce', 'Oracle', 'SAP', 'Adobe', 'Cisco', 'IBM'
	];
</script>

<svelte:head>
	<title>SpikedAI - Revenue Agents for Global 2000</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-zinc-950 via-black to-black text-white overflow-hidden">
	<!-- Hero Section -->
	<section 
		data-section="hero"
		class="relative min-h-screen flex items-center justify-center overflow-hidden"
	>
		<!-- Refined Background -->
		<div class="absolute inset-0">
			<!-- Subtle gradient overlay -->
			<div class="absolute inset-0 bg-gradient-to-b from-zinc-900/10 via-black to-black"></div>
			
			<!-- Minimal grid -->
			<div 
				class="absolute inset-0 opacity-10" 
				style="background-image: linear-gradient(rgba(161, 161, 170, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(161, 161, 170, 0.03) 1px, transparent 1px); background-size: 80px 80px; transform: translateY({scrollY * 0.1}px);"
			></div>
			
			<!-- Sophisticated light effects -->
			<div 
				class="absolute top-0 left-1/4 w-[900px] h-[900px] bg-gradient-to-br from-amber-950/15 via-transparent to-transparent rounded-full blur-3xl"
				style="transform: translate({mouseX * 0.02}px, {mouseY * 0.02}px);"
			></div>
			<div 
				class="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-red-950/10 via-transparent to-transparent rounded-full blur-3xl"
				style="transform: translate({-mouseX * 0.015}px, {-mouseY * 0.015}px);"
			></div>
			
			<!-- Subtle particles -->
			<div class="absolute inset-0 opacity-30">
				{#each Array(15) as _, i}
					{@const animName = `float-particle-${i % 3}`}
					<div 
						class="absolute w-1 h-1 rounded-full bg-zinc-600"
						style:left="{Math.random() * 100}%"
						style:top="{Math.random() * 100}%"
						style:animation="{animName} {10 + Math.random() * 8}s ease-in-out infinite"
						style:animation-delay="{Math.random() * 5}s"
					></div>
				{/each}
			</div>
			
			<!-- Radial spotlight -->
			<div class="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/80"></div>
		</div>
		
		<div class="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 text-center pt-40 pb-32">
			<div>
				<!-- Refined Status Badge -->
				<div class="hero-badge inline-flex items-center gap-2.5 px-5 py-2.5 bg-zinc-900/80 backdrop-blur-sm rounded-full border border-zinc-800/50 mb-12">
					<span class="relative flex h-1.5 w-1.5">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
					</span>
					<span class="text-sm font-medium text-zinc-300">SpikedAI is now <span class="text-amber-500">available</span></span>
				</div>
				
				<!-- Main Headline -->
				<div class="hero-title mb-12">
					<h1 class="hero-main-title mb-6">
						<span class="block text-white mb-3">Revenue Agents</span>
						<span class="block hero-gradient">for the Global 2000</span>
					</h1>
				</div>
				
				<!-- Subtitle -->
				<p class="hero-subtitle mb-12 max-w-3xl mx-auto">
					Fastest time-to-ROI | Pay only for actions | Full-service deployment
				</p>
				
				<!-- CTAs -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center mb-20 hero-cta">
					<button 
						class="group relative px-8 py-4 bg-white text-black rounded-lg font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-white/10"
						onmouseenter={handleMouseEnterButton}
						onmouseleave={handleMouseLeaveButton}
						onclick={handleCTAClick}
					>
						<span class="relative z-10 flex items-center justify-center gap-2">
							Start Now, Skip Demos
							<ArrowRight class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
						</span>
					</button>
					<button 
						class="px-8 py-4 bg-zinc-900/50 backdrop-blur-sm text-white rounded-lg font-semibold text-base border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300"
						onmouseenter={handleMouseEnterButton}
						onmouseleave={handleMouseLeaveButton}
					>
						Contact Sales
					</button>
				</div>
			</div>
			
			<!-- Product Mockup Area -->
			<div 
				class="relative mt-16 transform transition-all duration-1000 delay-300 {isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}"
			>
				<!-- Floating UI Cards -->
				<div class="relative max-w-5xl mx-auto h-[500px]">
					<!-- Main Dashboard -->
					<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl">
						<div class="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm rounded-2xl border border-zinc-800/50 shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
							<div class="p-6 border-b border-zinc-800/50">
								<div class="flex items-center gap-3 mb-4">
									<div class="flex gap-2">
										<div class="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
										<div class="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
										<div class="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
									</div>
									<div class="flex-1 bg-zinc-800/50 rounded px-4 py-2 text-sm text-zinc-500">
										NVIDIA Outreach Campaign
									</div>
								</div>
								<div class="space-y-3">
									<div class="bg-zinc-800/30 rounded-lg p-4">
										<div class="flex items-start gap-3">
											<div class="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
												<Zap class="w-5 h-5 text-zinc-400" />
											</div>
											<div class="flex-1">
												<div class="text-sm font-medium text-white mb-1">Generate outreach campaign</div>
												<div class="text-xs text-zinc-400">Find relevant contacts, clever columns, products, and case studies.</div>
											</div>
										</div>
									</div>
									<div class="bg-zinc-800/20 rounded-lg p-4 border border-zinc-700/50">
										<div class="flex items-start gap-3">
											<div class="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
												<div class="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-pulse"></div>
											</div>
											<div class="flex-1">
												<div class="text-sm font-medium text-zinc-300 mb-2">Thinking...</div>
												<div class="text-xs text-zinc-400">Listing relevant contacts for NVIDIA Corporation to use in the outreach campaign.</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="p-6 bg-zinc-950/50">
								<div class="flex items-center justify-between text-xs text-zinc-500">
									<span>Processing 234 contacts</span>
									<span>3 case studies found</span>
								</div>
							</div>
						</div>
					</div>
					
					<!-- Floating Mobile Card -->
					<div class="absolute bottom-0 left-8 w-64 animate-float">
						<div class="bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl border border-zinc-800/50 shadow-xl overflow-hidden">
							<div class="bg-black p-4 flex items-center justify-between">
								<span class="text-xs text-zinc-400">9:41</span>
								<div class="flex gap-1">
									<div class="w-1 h-3 bg-white rounded-full opacity-80"></div>
									<div class="w-1 h-3 bg-white rounded-full opacity-60"></div>
									<div class="w-1 h-3 bg-white rounded-full opacity-40"></div>
								</div>
							</div>
							<div class="p-4 space-y-3">
								<div class="text-xs font-medium text-zinc-500">Aug 21, 2025</div>
								<div class="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700/50">
									<div class="text-xs text-zinc-400 mb-1">Command</div>
									<div class="text-sm font-medium text-white">Outreach</div>
								</div>
								<div class="text-xs text-zinc-500">1 of 3 tasks</div>
							</div>
						</div>
					</div>
					
					<!-- Floating Stats Card -->
					<div class="absolute bottom-8 right-8 w-72 animate-float-delayed">
						<div class="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-sm rounded-xl border border-zinc-800/50 shadow-xl p-6">
							<div class="flex items-center gap-3 mb-4">
								<div class="p-2 bg-zinc-800 rounded-lg border border-zinc-700">
									<TrendingUp class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<div class="text-xs text-zinc-500">Campaign Performance</div>
									<div class="text-lg font-semibold text-white">+127%</div>
								</div>
							</div>
							<div class="space-y-2">
								<div class="flex justify-between text-xs">
									<span class="text-zinc-400">Response Rate</span>
									<span class="text-white font-medium">43%</span>
								</div>
								<div class="flex justify-between text-xs">
									<span class="text-zinc-400">Meetings Booked</span>
									<span class="text-white font-medium">89</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	
	<!-- Stats Section -->
	<section 
		data-section="stats"
		class="relative py-32 md:py-40 border-y border-zinc-900 overflow-hidden"
	>
		<div class="max-w-6xl mx-auto px-6 sm:px-8">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-16">
				{#each stats as stat, i}
					<div class="text-center group animate-in">
						<div class="relative inline-block mb-8">
							<div class="stat-value relative text-6xl md:text-7xl font-light text-white mb-2">
								{stat.value}
							</div>
							<div class="h-px w-16 mx-auto bg-gradient-to-r {stat.color}"></div>
						</div>
						<div class="text-base text-zinc-400">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
	
	<!-- Features Section -->
	<section 
		data-section="features"
		class="relative py-32 md:py-40"
	>
		<div class="max-w-7xl mx-auto px-6 sm:px-8">
			<div class="text-center mb-24 animate-in">
				<h2 class="section-title mb-8">
					AI Transformation Partner<br />
					<span class="section-gradient">to the Best</span>
				</h2>
				<p class="section-subtitle max-w-2xl mx-auto">
					Enterprise-grade capabilities that scale with your business
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each features as feature, i}
					{@const Icon = feature.icon}
					<div 
						role="button"
						tabindex="0"
						class="group relative bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800/50 p-8 transition-all duration-500 cursor-pointer animate-in hover:bg-zinc-900/50 hover:border-zinc-700/50"
						onmouseenter={() => hoveredCard = i}
						onmouseleave={() => hoveredCard = null}
						style="animation-delay: {i * 100}ms;"
					>
						<div class="relative">
							<!-- Icon container -->
							<div class="relative w-14 h-14 mb-6">
								<div class="w-full h-full bg-zinc-800/50 rounded-xl flex items-center justify-center group-hover:bg-zinc-800 transition-all duration-300 border border-zinc-700/50">
									<Icon class="w-7 h-7 text-zinc-400 group-hover:text-zinc-300 transition-colors" />
								</div>
							</div>
							
							<h3 class="text-xl font-semibold text-white mb-3 group-hover:text-zinc-100 transition-colors">
								{feature.title}
							</h3>
							<p class="text-sm text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors">
								{feature.description}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
	
	<!-- Testimonial Section -->
	<section 
		data-section="testimonial"
		class="relative py-32 md:py-40 overflow-hidden border-t border-zinc-900"
	>
		<div class="relative max-w-6xl mx-auto px-6 sm:px-8">
			<div class="flex flex-col md:flex-row items-center gap-16 transform transition-all duration-1000 {isVisible.testimonial ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
				<!-- Stat -->
				<div class="flex-shrink-0 text-center md:text-left">
					<div class="text-7xl md:text-8xl font-light text-white mb-4">80%</div>
					<div class="text-lg text-zinc-400">time savings in<br />asset production</div>
				</div>
				
				<!-- Image/Avatar -->
				<div class="relative flex-shrink-0">
					<div class="w-48 h-48 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-zinc-800">
						<div class="w-40 h-40 rounded-full bg-zinc-900 flex items-center justify-center">
							<Users class="w-20 h-20 text-zinc-700" />
						</div>
					</div>
				</div>
				
				<!-- Testimonial -->
				<div class="flex-1">
					<div class="mb-6">
						<div class="text-xl font-semibold text-white mb-2">Sarah Chen</div>
						<div class="text-sm text-zinc-400">
							SVP of Revenue Operations<br />
							<span class="text-zinc-300">TechCorp Solutions</span>
						</div>
					</div>
					<blockquote class="text-base text-zinc-300 leading-relaxed">
						"SpikedAI transformed how our entire sales organization operates. We've seen unprecedented efficiency gains and our reps are closing deals faster than ever."
					</blockquote>
				</div>
			</div>
		</div>
	</section>
	
	<!-- Company Logos -->
	<section 
		data-section="logos"
		class="relative py-24 border-t border-zinc-900"
	>
		<div class="max-w-6xl mx-auto px-6 sm:px-8">
			<div class="text-center mb-16 transform transition-all duration-1000 {isVisible.logos ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
				<p class="text-xs font-semibold text-zinc-500 tracking-[0.2em] uppercase">
					Trusted by world-class enterprises
				</p>
			</div>
			
			<div class="grid grid-cols-2 md:grid-cols-4 gap-12 items-center opacity-30">
				{#each companies as company}
					<div class="text-center">
						<div class="text-lg font-medium text-zinc-600 hover:text-zinc-500 transition-colors duration-300">
							{company}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
	
	<!-- CTA Section -->
	<section class="relative py-32 md:py-40">
		<div class="max-w-4xl mx-auto px-6 sm:px-8 text-center">
			<h2 class="section-title mb-8">
				Ready to transform your<br />
				<span class="section-gradient">sales organization?</span>
			</h2>
			<p class="section-subtitle mb-12">
				Join the Fortune 2000 companies already using SpikedAI
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<button class="px-8 py-4 bg-white text-black rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-white/10 flex items-center justify-center gap-2">
					Get Started Now
					<ArrowRight class="w-4 h-4" />
				</button>
				<button class="px-8 py-4 bg-zinc-900/50 backdrop-blur-sm text-white rounded-lg font-semibold text-base border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all duration-300">
					Schedule a Demo
				</button>
			</div>
		</div>
	</section>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
	
	* {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.hero-main-title {
		font-size: clamp(3.5rem, 8vw, 6.5rem);
		font-weight: 700;
		letter-spacing: -0.03em;
		line-height: 1.05;
	}

	.hero-gradient {
		background: linear-gradient(135deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.hero-subtitle {
		font-size: clamp(1.1rem, 1.5vw, 1.25rem);
		font-weight: 400;
		color: #a1a1aa;
		line-height: 1.7;
	}

	.section-title {
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.15;
		color: #ffffff;
	}

	.section-gradient {
		background: linear-gradient(135deg, #e5e5e5 0%, #a1a1aa 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.section-subtitle {
		font-size: 1.125rem;
		font-weight: 400;
		color: #71717a;
		line-height: 1.7;
	}

	.bg-gradient-radial {
		background: radial-gradient(circle, var(--tw-gradient-stops));
	}

	/* Refined animations */
	@keyframes float {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-15px) rotate(2deg); }
	}
	
	@keyframes float-delayed {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-12px) rotate(-2deg); }
	}
	
	@keyframes float-particle-0 {
		0%, 100% { 
			transform: translate(0, 0);
			opacity: 0.3;
		}
		50% { 
			transform: translate(20px, -40px);
			opacity: 0.6;
		}
	}
	
	@keyframes float-particle-1 {
		0%, 100% { 
			transform: translate(0, 0);
			opacity: 0.2;
		}
		50% { 
			transform: translate(-15px, -50px);
			opacity: 0.5;
		}
	}
	
	@keyframes float-particle-2 {
		0%, 100% { 
			transform: translate(0, 0);
			opacity: 0.25;
		}
		50% { 
			transform: translate(15px, -35px);
			opacity: 0.55;
		}
	}
	
	.animate-float {
		animation: float 8s ease-in-out infinite;
	}
	
	.animate-float-delayed {
		animation: float-delayed 10s ease-in-out infinite;
	}
	
	/* Smooth entrance animations */
	.animate-in {
		opacity: 0;
		animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}
	
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Custom scrollbar */
	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	
	::-webkit-scrollbar-track {
		background: #000;
	}
	
	::-webkit-scrollbar-thumb {
		background: #27272a;
		border-radius: 3px;
	}
	
	::-webkit-scrollbar-thumb:hover {
		background: #3f3f46;
	}
</style>
