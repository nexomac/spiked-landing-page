<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import SimulatorShowcase from '$lib/components/SimulatorShowcase.svelte';
	import { 
		Users, TrendingUp, Target, Brain, Play, BarChart3, Shield, 
		FileText, Activity, Bot, ArrowRight, Calendar, Trophy
	} from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let simulationActive = $state(false);
	let isPaused = $state(false);
	let selectedScenario = $state('discovery');
	let currentDialogueIndex = $state(0);
	let showCoaching = $state(true);
	let hoveredDialogue = $state(null);
	
	function startSimulation() {
		simulationActive = true;
		isPaused = false;
	}

	// Parallax states
	let mouseX = $state(0);
	let mouseY = $state(0);
	let scrollY = $state(0);
	
	onMount(() => {
		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};
		
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('scroll', handleScroll);
		
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:head>
	<title>Meeting Simulator & Coaching | SpikedAI</title>
	<meta name="description" content="Practice sales conversations with AI-powered prospects and get real-time coaching to master your pitch, objection handling, and closing techniques." />
</svelte:head>

<style>
	/* Gradient text */
	.gradient-text {
		background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Glass morphism */
	.glass {
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.05);
		box-shadow: 
			0 8px 32px 0 rgba(0, 0, 0, 0.37),
			inset 0 1px 1px 0 rgba(255, 255, 255, 0.05);
	}

	/* Hover lift */
	.hover-lift {
		transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
	.hover-lift:hover {
		transform: translateY(-4px) scale(1.01);
		box-shadow: 
			0 20px 60px rgba(0, 0, 0, 0.4),
			0 0 40px rgba(239, 68, 68, 0.1);
	}

	@keyframes borderShimmer {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	/* Floating animations */
	@keyframes float {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		33% { transform: translateY(-20px) rotate(5deg); }
		66% { transform: translateY(-10px) rotate(-5deg); }
	}
	
	@keyframes float-slow {
		0%, 100% { transform: translateY(0px) translateX(0px); }
		50% { transform: translateY(-30px) translateX(10px); }
	}

	.float {
		animation: float 6s ease-in-out infinite;
	}
	
	.float-slow {
		animation: float-slow 8s ease-in-out infinite;
	}

	/* Fade in animation */
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>

<div class="min-h-screen bg-black">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="simulator" />
	
	<!-- Hero Section -->
	<section class="relative pt-32 pb-20 overflow-hidden">
		<!-- Animated background orbs -->
		<div class="absolute inset-0 overflow-hidden pointer-events-none">
			<div class="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/20 rounded-full blur-3xl float"></div>
			<div class="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl float-slow"></div>
			<div class="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl float" style="animation-delay: 2s"></div>
		</div>

		<div class="relative max-w-7xl mx-auto px-6">
			<!-- Split Layout Container -->
			<div class="grid lg:grid-cols-2 gap-16 items-start">
				
				<!-- Left Column - Content -->
				<div class="lg:sticky lg:top-32 z-10">
					<!-- Label with subtle animation -->
					<div 
						class="inline-flex items-center gap-2 px-3 py-1.5 glass rounded-full mb-8 hover:scale-105 transition-transform"
						in:fly={{ y: -20, duration: 600, delay: 100 }}
					>
						<Users class="w-4 h-4 text-red-500 animate-pulse" />
						<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">AI Meeting Simulator</span>
					</div>

					<!-- Main Headline -->
					<h1 
						class="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
						in:fly={{ y: 20, duration: 700, delay: 200 }}
					>
						<span class="text-white block mb-2">Practice with AI,</span>
						<span class="gradient-text block">Perform Like a Pro</span>
					</h1>

					<!-- Three Feature Cards -->
					<div class="space-y-4 mb-10">
						<!-- Real-time coaching -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden border-l-2 border-red-500"
							in:fly={{ y: 20, duration: 600, delay: 300 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-red-500/5 via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
									<Brain class="w-5 h-5 text-red-500" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Real-Time AI Coaching</h3>
									<p class="text-sm text-zinc-400">Get instant feedback on questions, talk-time ratio, and sales methodology</p>
								</div>
							</div>
						</div>

						<!-- Hyper-realistic prospects -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden"
							in:fly={{ y: 20, duration: 600, delay: 400 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/50 transition-colors">
									<Bot class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Hyper-Realistic AI Prospects</h3>
									<p class="text-sm text-zinc-400">Practice with AI that responds naturally and throws realistic objections</p>
								</div>
							</div>
						</div>

						<!-- Multiple scenarios -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden"
							in:fly={{ y: 20, duration: 600, delay: 500 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/50 transition-colors">
									<Target class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Practice Every Scenario</h3>
									<p class="text-sm text-zinc-400">Master discovery, demos, objections, and closing with custom difficulty</p>
								</div>
							</div>
						</div>
					</div>

					<!-- CTA Link -->
					<a 
						href="/" 
						class="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium group"
						in:fly={{ y: 20, duration: 600, delay: 700 }}
					>
						<span>Start training with AI simulator</span>
						<ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
					</a>
				</div>

				<!-- Right Column - Product Showcase -->
				<SimulatorShowcase 
					bind:simulationActive
					bind:isPaused
					bind:selectedScenario
					bind:currentDialogueIndex
					bind:showCoaching
					bind:hoveredDialogue
					{mouseX}
					{mouseY}
					height="600px"
					showAppChrome={true}
				/>
			</div>
		</div>
	</section>

	<!-- Key Features Grid -->
	<section class="py-20 bg-zinc-950/50">
		<div class="max-w-7xl mx-auto px-6">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Master Every Sales Scenario</h2>
				<p class="text-lg text-zinc-400 max-w-2xl mx-auto">Train like an athlete. Get instant feedback. Close more deals.</p>
			</div>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Bot class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Hyper-Realistic AI Prospects</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Practice with AI personas that respond naturally, ask tough questions, and throw realistic objections—just like real buyers.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-blue-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Brain class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Real-Time AI Coaching</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Get instant feedback on your questions, talk-time ratio, value statements, and sales methodology—as the conversation happens.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-purple-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Target class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Multiple Scenarios</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Practice discovery calls, product demos, objection handling, negotiation, and deal closing—all with custom difficulty levels.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-green-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<BarChart3 class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Performance Analytics</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Track your improvement over time. See how your scores improve across scenarios, questions quality, and objection handling.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-orange-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Activity class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Framework Coaching</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Get coached on MEDDIC, BANT, Challenger Sale, SPIN Selling, or custom sales methodologies your team uses.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-cyan-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<TrendingUp class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Accelerate Onboarding</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						New reps can practice hundreds of scenarios before their first real call. Cut ramp time in half with AI training.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-pink-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-600 to-pink-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<FileText class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Detailed Session Reports</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Get comprehensive post-simulation reports with transcripts, scoring breakdown, and specific improvement recommendations.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-indigo-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Shield class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Practice Tough Objections</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Master handling pricing objections, competitive comparisons, security concerns, and implementation questions.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-teal-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Trophy class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Leaderboards & Achievements</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Gamify your practice sessions. Compete with teammates, unlock achievements, and see who masters each scenario first.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Results Section -->
	<section class="py-20">
		<div class="max-w-6xl mx-auto px-6">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Proven Results from AI Coaching</h2>
				<p class="text-lg text-zinc-400">See how teams transform their performance with simulator training</p>
			</div>

			<div class="grid md:grid-cols-4 gap-6 mb-12">
				<div class="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
					<div class="text-4xl font-bold text-green-500 mb-2">2.5x</div>
					<div class="text-sm text-zinc-400">Faster Ramp Time</div>
				</div>
				<div class="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
					<div class="text-4xl font-bold text-blue-500 mb-2">47%</div>
					<div class="text-sm text-zinc-400">Higher Close Rate</div>
				</div>
				<div class="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
					<div class="text-4xl font-bold text-red-500 mb-2">65%</div>
					<div class="text-sm text-zinc-400">Better Objection Handling</div>
				</div>
				<div class="text-center p-6 bg-zinc-900 border border-zinc-800 rounded-xl">
					<div class="text-4xl font-bold text-purple-500 mb-2">91%</div>
					<div class="text-sm text-zinc-400">Rep Confidence Score</div>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 bg-gradient-to-br from-red-950/20 to-zinc-950">
		<div class="max-w-4xl mx-auto px-6 text-center">
			<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-500/30">
				<Users class="w-8 h-8 text-white" />
			</div>
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Stop Learning on Real Deals.<br/>Practice with AI First.</h2>
			<p class="text-xl text-zinc-400 mb-8 leading-relaxed">
				Your competitors' reps are winging it on live calls. Yours will be trained, coached, and ready to close from day one.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<button 
					onclick={startSimulation}
					class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
				>
					<Play class="w-5 h-5" />
					Try Simulator Now
					<ArrowRight class="w-5 h-5" />
				</button>
				<a href="/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-all border border-zinc-700 hover:border-zinc-600">
					<Calendar class="w-5 h-5" />
					Book a Demo
				</a>
			</div>
			<p class="text-sm text-zinc-500 mt-6">No credit card required • Unlimited practice sessions • Track your improvement</p>
		</div>
	</section>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="simulator" />
</div>
