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
</svelte:head>

<div class="min-h-screen bg-black text-white overflow-hidden">
	<!-- Hero Section -->
	<section 
		data-section="hero"
		class="relative min-h-screen flex items-center justify-center overflow-hidden"
	>
		<!-- Enhanced Animated Background with gradients and effects -->
		<div class="absolute inset-0">
			
			<!-- Gradient orbs with enhanced parallax -->
			<div 
				class="absolute top-0 left-1/4 w-[900px] h-[900px] bg-gradient-to-br from-amber-500/30 via-amber-600/15 to-transparent rounded-full blur-3xl"
				style="transform: translate({mouseX * 0.03}px, {mouseY * 0.03}px) scale({1 + smoothScroll * 0.0001});"
			></div>
			<div 
				class="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-tl from-red-500/25 via-red-600/12 to-transparent rounded-full blur-3xl"
				style="transform: translate({-mouseX * 0.02}px, {-mouseY * 0.02}px) scale({1 + smoothScroll * 0.0001});"
			></div>
			<div 
				class="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-transparent rounded-full blur-3xl"
				style="transform: translate(-50%, -50%) translate({mouseX * 0.015}px, {mouseY * 0.015}px);"
			></div>
			
			<!-- Animated grid -->
			<div 
				class="absolute inset-0 opacity-20" 
				style="background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 50px 50px; transform: translateY({scrollY * 0.1}px);"
			></div>
			
			<!-- Enhanced particles with depth -->
			<div class="absolute inset-0">
				{#each Array(30) as _, i}
					{@const size = i % 3 === 0 ? 'w-1 h-1' : i % 3 === 1 ? 'w-2 h-2' : 'w-0.5 h-0.5'}
					{@const color = i % 3 === 0 ? 'bg-amber-400' : i % 3 === 1 ? 'bg-red-400' : 'bg-purple-400'}
					{@const animName = `float-particle-${i % 3}`}
					<div 
						class="absolute rounded-full {size} {color}"
						style:opacity={i % 3 === 0 ? 0.5 : i % 3 === 1 ? 0.4 : 0.3}
						style:left="{Math.random() * 100}%"
						style:top="{Math.random() * 100}%"
						style:animation="{animName} {8 + Math.random() * 6}s ease-in-out infinite"
						style:animation-delay="{Math.random() * 5}s"
					></div>
				{/each}
			</div>
		</div>
		
		<div class="relative z-10 max-w-6xl mx-auto px-6 text-center pt-40 pb-32">
			<div>
				<!-- Status Badge with GSAP animation -->
				<div class="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/70 backdrop-blur-xl rounded-full border border-amber-900/40 mb-8 shadow-lg shadow-amber-900/20">
					<span class="relative flex h-2 w-2">
						<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
						<span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
					</span>
					<span class="text-sm text-zinc-300">SpikedAI is now <span class="text-amber-500 font-semibold">available</span></span>
				</div>
				
				<!-- Main Headline with enhanced gradient -->
				<div class="hero-title">
					<h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-tight mb-6">
						<span class="block text-white mb-2 animate-in">Revenue Agents</span>
						<span class="block animate-in">for the <span class="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">Global 2000</span></span>
					</h1>
				</div>
				
				<!-- Subtitle with typing effect -->
				<p class="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto mb-8 animate-in">
					Fastest time-to-ROI | Pay only for actions | Full-service deployment
				</p>
				
				<!-- CTAs with magnetic effect -->
				<div class="flex flex-col sm:flex-row gap-4 justify-center mb-16 hero-cta">
					<button 
						class="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 flex items-center justify-center gap-2 overflow-hidden"
						onmouseenter={handleMouseEnterButton}
						onmouseleave={handleMouseLeaveButton}
						onclick={handleCTAClick}
					>
						<span class="relative z-10 flex items-center gap-2">
							Start Now, Skip Demos
							<ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
						</span>
						<div class="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
					</button>
					<button 
						class="px-8 py-4 bg-zinc-900/60 backdrop-blur-xl text-white rounded-lg font-semibold text-base border border-zinc-800 hover:border-amber-600 transition-all duration-300"
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
						<div class="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl rounded-2xl border border-zinc-800/50 shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
							<div class="p-6 border-b border-zinc-800/50">
								<div class="flex items-center gap-3 mb-4">
									<div class="flex gap-2">
										<div class="w-3 h-3 rounded-full bg-red-500"></div>
										<div class="w-3 h-3 rounded-full bg-amber-500"></div>
										<div class="w-3 h-3 rounded-full bg-green-500"></div>
									</div>
									<div class="flex-1 bg-zinc-800/50 rounded px-4 py-2 text-sm text-zinc-500">
										NVIDIA Outreach Campaign
									</div>
								</div>
								<div class="space-y-3">
									<div class="bg-zinc-800/30 rounded-lg p-4">
										<div class="flex items-start gap-3">
											<div class="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
												<Zap class="w-5 h-5 text-black" />
											</div>
											<div class="flex-1">
												<div class="text-sm font-medium text-white mb-1">Generate outreach campaign</div>
												<div class="text-xs text-zinc-400">Find relevant contacts, clever columns, products, and case studies.</div>
											</div>
										</div>
									</div>
									<div class="bg-amber-950/30 rounded-lg p-4 border border-amber-900/30">
										<div class="flex items-start gap-3">
											<div class="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
												<div class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
											</div>
											<div class="flex-1">
												<div class="text-sm font-medium text-amber-400 mb-2">Thinking...</div>
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
									<div class="w-1 h-3 bg-white rounded-full"></div>
									<div class="w-1 h-3 bg-white rounded-full opacity-70"></div>
									<div class="w-1 h-3 bg-white rounded-full opacity-40"></div>
								</div>
							</div>
							<div class="p-4 space-y-3">
								<div class="text-xs font-medium text-zinc-400">Aug 21, 2025</div>
								<div class="bg-zinc-800 rounded-lg p-3">
									<div class="text-xs text-zinc-300 mb-1">Command</div>
									<div class="text-sm font-medium text-white">Outreach</div>
								</div>
								<div class="text-xs text-zinc-500">1 of 3 tasks</div>
							</div>
						</div>
					</div>
					
					<!-- Floating Stats Card -->
					<div class="absolute bottom-8 right-8 w-72 animate-float-delayed">
						<div class="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl rounded-xl border border-zinc-800/50 shadow-xl p-6">
							<div class="flex items-center gap-3 mb-4">
								<div class="p-2 bg-green-500/10 rounded-lg">
									<TrendingUp class="w-5 h-5 text-green-500" />
								</div>
								<div>
									<div class="text-xs text-zinc-500">Campaign Performance</div>
									<div class="text-lg font-bold text-white">+127%</div>
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
	
	<!-- Enhanced Stats Section with animated counters -->
	<section 
		data-section="stats"
		class="relative py-32 border-y border-zinc-900 overflow-hidden"
	>
		<!-- Animated background -->
		<div class="absolute inset-0 opacity-10">
			<div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent animate-shimmer"></div>
		</div>
		
		<div class="max-w-6xl mx-auto px-6">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-16">
				{#each stats as stat, i}
					<div class="text-center group animate-in">
						<div class="relative inline-block mb-6">
							<!-- Decorative ring -->
							<div class="absolute -inset-4 bg-gradient-to-r {stat.color} rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
							<div class="stat-value relative text-6xl md:text-7xl font-bold bg-gradient-to-r {stat.color} bg-clip-text text-transparent">
								{stat.value}
							</div>
						</div>
						<div class="text-lg text-zinc-400 font-medium">{stat.label}</div>
						
						<!-- Progress bar -->
						<div class="mt-4 h-1 bg-zinc-800 rounded-full overflow-hidden">
							<div 
								class="h-full bg-gradient-to-r {stat.color} rounded-full transition-all duration-2000"
								style="width: {isVisible.stats ? '100%' : '0%'}; transition-delay: {i * 200}ms;"
							></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
	
	<!-- Enhanced Features Section with 3D cards -->
	<section 
		data-section="features"
		class="relative py-32"
	>
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-20 animate-in">
				<h2 class="text-5xl md:text-6xl font-bold text-white mb-6">
					AI Transformation Partner to the Best
				</h2>
				<p class="text-xl text-zinc-400 max-w-2xl mx-auto">
					Enterprise-grade capabilities that scale with your business
				</p>
			</div>
			
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each features as feature, i}
					{@const Icon = feature.icon}
					<div 
						role="button"
						tabindex="0"
						class="group relative bg-gradient-to-br from-zinc-900/60 to-zinc-950/60 backdrop-blur-xl rounded-3xl border border-zinc-800/50 p-8 transition-all duration-500 cursor-pointer animate-in"
						class:hover:-translate-y-3={true}
						class:hover:shadow-2xl={true}
						onmouseenter={() => hoveredCard = i}
						onmouseleave={() => hoveredCard = null}
						style="
							animation-delay: {i * 100}ms;
							box-shadow: {hoveredCard === i ? '0 25px 50px -12px rgba(245, 158, 11, 0.25)' : 'none'};
						"
					>
						<!-- Gradient overlay -->
						<div 
							class="absolute inset-0 bg-gradient-to-br {feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"
						></div>
						
						<!-- Corner accent -->
						<div class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br {feature.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"></div>
						
						<div class="relative">
							<!-- Icon container with 3D effect -->
							<div class="relative w-16 h-16 mb-6">
								<div class="absolute inset-0 bg-gradient-to-br {feature.gradient} rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
								<div class="relative w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-zinc-700/50">
									<Icon class="w-8 h-8 text-white" />
								</div>
							</div>
							
							<h3 class="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:{feature.gradient} group-hover:bg-clip-text transition-all duration-300">
								{feature.title}
							</h3>
							<p class="text-zinc-400 leading-relaxed">
								{feature.description}
							</p>
						</div>
						
						<!-- Animated border -->
						<div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
							<div class="absolute inset-0 rounded-3xl bg-gradient-to-r {feature.gradient} opacity-50 blur-sm"></div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
	
	<!-- Testimonial Section -->
	<section 
		data-section="testimonial"
		class="relative py-32 overflow-hidden"
	>
		<!-- Radial gradient background -->
		<div class="absolute inset-0">
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-purple-900/20 via-transparent to-transparent"></div>
		</div>
		
		<div class="relative max-w-6xl mx-auto px-6">
			<div class="flex flex-col md:flex-row items-center gap-12 transform transition-all duration-1000 {isVisible.testimonial ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
				<!-- Stat -->
				<div class="flex-shrink-0">
					<div class="text-7xl md:text-8xl font-bold text-white mb-4">80%</div>
					<div class="text-xl text-zinc-400">time savings in<br />asset production</div>
				</div>
				
				<!-- Image/Avatar with radial lines -->
				<div class="relative flex-shrink-0">
					<div class="absolute inset-0 flex items-center justify-center">
						{#each Array(16) as _, i}
							<div 
								class="absolute w-1 h-32 bg-gradient-to-b from-purple-500/20 to-transparent"
								style="transform: rotate({i * 22.5}deg) translateY(-100px);"
							></div>
						{/each}
					</div>
					<div class="relative w-48 h-48 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border-4 border-zinc-800">
						<div class="w-40 h-40 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
							<Users class="w-20 h-20 text-zinc-400" />
						</div>
					</div>
				</div>
				
				<!-- Testimonial -->
				<div class="flex-1">
					<div class="mb-6">
						<div class="text-2xl font-semibold text-white mb-2">Sarah Chen</div>
						<div class="text-zinc-400">
							SVP of Revenue Operations<br />
							<span class="text-amber-500">TechCorp Solutions</span>
						</div>
					</div>
					<blockquote class="text-lg text-zinc-300 italic leading-relaxed">
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
		<div class="max-w-6xl mx-auto px-6">
			<div class="text-center mb-12 transform transition-all duration-1000 {isVisible.logos ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
				<p class="text-zinc-500 text-sm uppercase tracking-wider mb-8">
					Trusted by world-class enterprises
				</p>
			</div>
			
			<div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-40">
				{#each companies as company}
					<div class="text-center">
						<div class="text-xl font-bold text-zinc-600 hover:text-zinc-400 transition-colors duration-300">
							{company}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
	
	<!-- CTA Section -->
	<section class="relative py-32">
		<div class="max-w-4xl mx-auto px-6 text-center">
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
				Ready to transform your sales organization?
			</h2>
			<p class="text-xl text-zinc-400 mb-8">
				Join the Fortune 2000 companies already using SpikedAI
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<button class="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black rounded-lg font-semibold text-base transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 flex items-center justify-center gap-2">
					Get Started Now
					<ArrowRight class="w-5 h-5" />
				</button>
				<button class="px-8 py-4 bg-transparent text-white rounded-lg font-semibold text-base border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:scale-105">
					Schedule a Demo
				</button>
			</div>
		</div>
	</section>
</div>

<style>
	/* Enhanced animations */
	@keyframes float {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-20px) rotate(3deg); }
	}
	
	@keyframes float-delayed {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-15px) rotate(-3deg); }
	}
	
	@keyframes float-particle-0 {
		0%, 100% { 
			transform: translate(0, 0) scale(1);
			opacity: 0.4;
		}
		50% { 
			transform: translate(30px, -60px) scale(1.2);
			opacity: 0.8;
		}
	}
	
	@keyframes float-particle-1 {
		0%, 100% { 
			transform: translate(0, 0) scale(1);
			opacity: 0.3;
		}
		50% { 
			transform: translate(-25px, -70px) scale(1.5);
			opacity: 0.7;
		}
	}
	
	@keyframes float-particle-2 {
		0%, 100% { 
			transform: translate(0, 0) scale(1);
			opacity: 0.2;
		}
		50% { 
			transform: translate(20px, -50px) scale(1.1);
			opacity: 0.6;
		}
	}
	
	@keyframes shimmer {
		0% { transform: translateX(-100%); }
		100% { transform: translateX(100%); }
	}
	
	@keyframes gradient {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}
	
	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
	
	.animate-float-delayed {
		animation: float-delayed 8s ease-in-out infinite;
	}
	
	.animate-shimmer {
		animation: shimmer 3s linear infinite;
	}
	
	.animate-gradient {
		animation: gradient 3s ease infinite;
	}
	
	.bg-gradient-radial {
		background-image: radial-gradient(circle, var(--tw-gradient-stops));
	}
	
	/* Smooth entrance animations */
	.animate-in {
		opacity: 0;
		animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
	}
	
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Custom scrollbar */
	::-webkit-scrollbar {
		width: 10px;
	}
	
	::-webkit-scrollbar-track {
		background: #0a0a0a;
	}
	
	::-webkit-scrollbar-thumb {
		background: #404040;
		border-radius: 5px;
	}
	
	::-webkit-scrollbar-thumb:hover {
		background: #525252;
	}
	
	/* Magnetic button effect prep */
	button {
		position: relative;
		transform-style: preserve-3d;
	}
</style>
