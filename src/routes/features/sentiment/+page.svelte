<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { Heart, TrendingUp, TrendingDown, Meh, Smile, Frown, BarChart3, Activity, ArrowRight, AlertCircle, Sparkles, ThumbsUp } from 'lucide-svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

	let currentSentiment = $state('positive');
	let sentimentScore = $state(78);
	let mouseX = $state(0);
	let mouseY = $state(0);

	onMount(() => {
		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};
		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	});

	const sentimentData = [
		{ time: '0:00', sentiment: 'neutral', score: 50, label: 'Opening', color: 'zinc' },
		{ time: '0:45', sentiment: 'positive', score: 72, label: 'Engaged', color: 'green' },
		{ time: '1:30', sentiment: 'very-positive', score: 85, label: 'Excited', color: 'emerald' },
		{ time: '2:15', sentiment: 'concerned', score: 45, label: 'Hesitant', color: 'orange' },
		{ time: '3:00', sentiment: 'positive', score: 78, label: 'Re-engaged', color: 'green' }
	];

	const liveMetrics = [
		{ label: 'Overall Sentiment', value: 'Positive', trend: '+12%', color: 'green' },
		{ label: 'Engagement Level', value: '85%', trend: '+8%', color: 'blue' },
		{ label: 'Buying Signals', value: '7', trend: '+3', color: 'emerald' },
		{ label: 'Concerns Raised', value: '2', trend: '0', color: 'orange' }
	];
</script>

<svelte:head>
	<title>Sentiment Analysis - SpikedAI</title>
	<meta name="description" content="Real-time emotional intelligence for sales conversations. Understand customer sentiment and respond appropriately." />
</svelte:head>

<style>
	@keyframes float {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-20px); }
	}

	@keyframes float-slow {
		0%, 100% { transform: translateY(0px) translateX(0px); }
		50% { transform: translateY(-15px) translateX(10px); }
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(10px); }
		to { opacity: 1; transform: translateY(0); }
	}

	.float {
		animation: float 6s ease-in-out infinite;
	}

	.float-slow {
		animation: float-slow 8s ease-in-out infinite;
	}

	.animate-fadeIn {
		animation: fadeIn 0.5s ease-out forwards;
	}
</style>

<div class="min-h-screen bg-black text-white">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="sentiment" />

	<!-- Hero Section - Writer.com Style -->
	<section class="relative min-h-screen pt-32 pb-24">
		<div class="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black"></div>
		<div class="fixed inset-0 pointer-events-none">
			<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-pulse"></div>
			<div class="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl" style="animation-delay: 1s"></div>
		</div>

		<div class="max-w-7xl mx-auto px-6 relative">
			<div class="grid lg:grid-cols-2 gap-16 items-start">
				<!-- Left Column -->
				<div class="lg:sticky lg:top-32 z-10">
					<div class="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-full mb-8">
						<Heart class="w-4 h-4 text-pink-500 animate-pulse" />
						<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Sentiment Analysis</span>
					</div>

					<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8">
						<span class="bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent block mb-2">Read the room</span>
						<span class="text-white block">with AI</span>
					</h1>

					<div class="space-y-4 mb-10">
						<div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all">
							<div class="flex items-start gap-4">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
									<Activity class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1">Real-time emotion tracking</h3>
									<p class="text-sm text-zinc-400">Monitor customer sentiment throughout the conversation</p>
								</div>
							</div>
						</div>

						<div class="bg-zinc-900/50 border-l-2 border-pink-500 rounded-xl p-4 hover:bg-pink-500/5 transition-all">
							<div class="flex items-start gap-4">
								<div class="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
									<Heart class="w-5 h-5 text-pink-500" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1">Emotional intelligence</h3>
									<p class="text-sm text-zinc-400">Know when to push forward and when to pause</p>
								</div>
							</div>
						</div>

						<div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all">
							<div class="flex items-start gap-4">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
									<TrendingUp class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1">AI recommendations</h3>
									<p class="text-sm text-zinc-400">Get guidance based on conversation dynamics</p>
								</div>
							</div>
						</div>
					</div>

					<a href="#demo" class="inline-flex items-center gap-2 text-pink-500 hover:text-pink-400 font-medium group">
						<span>See live sentiment analysis</span>
						<ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform" />
					</a>
				</div>

				<!-- Right Column - Sentiment Widget -->
				<div 
					class="relative"
					in:fly={{ x: 30, duration: 800, delay: 400 }}
					style="transform: perspective(1000px) rotateY({mouseX * -2}deg) rotateX({mouseY * 2}deg)"
				>
					<!-- Floating decorative elements -->
					<div class="absolute -top-8 -right-8 w-32 h-32 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
					<div class="absolute -bottom-8 -left-8 w-40 h-40 bg-pink-600/10 rounded-full blur-3xl" style="animation: float-slow 6s ease-in-out infinite"></div>
					
					<div class="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl">
						<!-- Header -->
						<div class="px-4 py-3 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-900/50">
							<div class="flex items-center gap-2">
								<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<span class="text-xs font-medium text-zinc-400">Live Analysis</span>
							</div>
							<div class="flex items-center gap-2 px-2 py-1 bg-pink-500/10 border border-pink-500/30 rounded-lg">
								<Heart class="w-3 h-3 text-pink-500" />
								<span class="text-xs font-semibold text-pink-400">Sentiment AI</span>
							</div>
						</div>

						<!-- Main Content -->
						<div class="p-5">
							<!-- Current Sentiment Display -->
							<div class="mb-5 p-4 bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/30 rounded-xl">
								<div class="flex items-center justify-between mb-3">
									<div class="flex items-center gap-3">
										<div class="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
											<Smile class="w-6 h-6 text-white" />
										</div>
										<div>
											<div class="text-xs text-zinc-400 mb-1">Current Mood</div>
											<div class="text-lg font-bold text-white">Positive & Engaged</div>
										</div>
									</div>
									<div class="text-right">
										<div class="text-2xl font-bold text-green-500">{sentimentScore}%</div>
										<div class="text-xs text-zinc-500">Sentiment Score</div>
									</div>
								</div>
								<div class="flex items-center gap-2 mb-2">
									<div class="flex-1 h-2 bg-zinc-900 rounded-full overflow-hidden">
										<div class="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500" style="width: {sentimentScore}%"></div>
									</div>
									<TrendingUp class="w-4 h-4 text-green-500" />
								</div>
								<p class="text-xs text-zinc-400">Customer is showing strong buying signals</p>
							</div>

							<!-- Sentiment Timeline -->
							<div class="mb-5">
								<h4 class="text-xs font-semibold text-zinc-400 mb-3 flex items-center gap-2">
									<Activity class="w-3.5 h-3.5" />
									Sentiment Over Time
								</h4>
								<div class="space-y-2">
									{#each sentimentData as data, i}
										<div class="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/50 transition-colors" in:fade={{ delay: i * 100 }}>
											<div class="text-xs font-mono text-zinc-500 w-12">{data.time}</div>
											<div class="flex-1 flex items-center gap-2">
												<div class="flex-1 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
													<div class="h-full bg-{data.color}-500 rounded-full" style="width: {data.score}%"></div>
												</div>
												<span class="text-xs text-zinc-400 w-20">{data.label}</span>
											</div>
											<div class="text-xs font-semibold text-{data.color}-500">{data.score}%</div>
										</div>
									{/each}
								</div>
							</div>

							<!-- Live Metrics Grid -->
							<div class="grid grid-cols-2 gap-3">
								{#each liveMetrics as metric}
									<div class="p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-lg hover:border-zinc-700/50 transition-all">
										<div class="text-[10px] text-zinc-500 mb-1">{metric.label}</div>
										<div class="flex items-baseline gap-2">
											<div class="text-lg font-bold text-white">{metric.value}</div>
											<div class="text-xs font-semibold text-{metric.color}-500">{metric.trend}</div>
										</div>
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Live Demo Section -->
	<div id="demo" class="py-24 px-6">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold mb-4">Live Sentiment Tracking</h2>
				<p class="text-xl text-zinc-400">AI-powered emotional intelligence in real-time</p>
			</div>

			<div class="grid lg:grid-cols-2 gap-8">
				<!-- Sentiment Timeline -->
				<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
					<div class="flex items-center justify-between mb-6">
						<div class="flex items-center gap-3">
							<Activity class="w-6 h-6 text-pink-500" />
							<h3 class="text-xl font-semibold">Sentiment Timeline</h3>
						</div>
						<span class="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
							Live
						</span>
					</div>

					<!-- Chart Area -->
					<div class="bg-black rounded-xl p-6 border border-zinc-800 mb-6">
						<div class="relative h-64">
							<!-- Grid lines -->
							<div class="absolute inset-0 flex flex-col justify-between">
								{#each Array(5) as _, i}
									<div class="border-t border-zinc-800/50"></div>
								{/each}
							</div>

							<!-- Sentiment line chart -->
							<svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
								<defs>
									<linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
										<stop offset="0%" style="stop-color:rgb(236, 72, 153);stop-opacity:0.3" />
										<stop offset="100%" style="stop-color:rgb(236, 72, 153);stop-opacity:0" />
									</linearGradient>
								</defs>
								
								<!-- Area fill -->
								<path
									d="M 0 80 L 10 75 L 20 70 L 30 60 L 40 55 L 50 45 L 60 50 L 70 40 L 80 35 L 90 30 L 100 25 L 100 100 L 0 100 Z"
									fill="url(#sentimentGradient)"
								/>
								
								<!-- Line -->
								<path
									d="M 0 80 L 10 75 L 20 70 L 30 60 L 40 55 L 50 45 L 60 50 L 70 40 L 80 35 L 90 30 L 100 25"
									fill="none"
									stroke="rgb(236, 72, 153)"
									stroke-width="0.5"
									class="animate-pulse"
								/>
							</svg>

							<!-- Y-axis labels -->
							<div class="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-zinc-500 -ml-12">
								<span>Positive</span>
								<span>Neutral</span>
								<span>Negative</span>
							</div>
						</div>

						<!-- Time labels -->
						<div class="flex justify-between text-xs text-zinc-500 mt-4">
							<span>0:00</span>
							<span>5:00</span>
							<span>10:00</span>
							<span>15:00</span>
							<span>Now</span>
						</div>
					</div>

					<!-- Current Sentiment -->
					<div class="bg-gradient-to-br from-green-950/30 to-zinc-950/50 rounded-xl p-6 border border-green-500/30">
						<div class="flex items-center justify-between">
							<div>
								<p class="text-sm text-zinc-400 mb-1">Current Sentiment</p>
								<p class="text-3xl font-bold text-green-500 flex items-center gap-2">
									<Smile class="w-8 h-8" />
									Positive
								</p>
							</div>
							<div class="text-right">
								<p class="text-sm text-zinc-400 mb-1">Confidence</p>
								<p class="text-3xl font-bold text-green-500">87%</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Sentiment Insights -->
				<div class="space-y-6">
					<!-- Key Moments -->
					<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
						<h3 class="text-xl font-semibold mb-6 flex items-center gap-3">
							<AlertCircle class="w-6 h-6 text-pink-500" />
							Key Moments
						</h3>

						<div class="space-y-4">
							<div class="bg-green-950/30 rounded-xl p-4 border border-green-500/30">
								<div class="flex items-start justify-between mb-2">
									<div class="flex items-center gap-2">
										<Smile class="w-5 h-5 text-green-500" />
										<span class="font-medium text-green-500">Positive Peak</span>
									</div>
									<span class="text-xs text-zinc-500">12:34</span>
								</div>
								<p class="text-sm text-zinc-300">"This sounds exactly like what we need!"</p>
								<div class="flex items-center gap-2 mt-2">
									<TrendingUp class="w-4 h-4 text-green-500" />
									<span class="text-xs text-green-500">+32% sentiment increase</span>
								</div>
							</div>

							<div class="bg-zinc-900 rounded-xl p-4 border border-zinc-700">
								<div class="flex items-start justify-between mb-2">
									<div class="flex items-center gap-2">
										<Meh class="w-5 h-5 text-zinc-400" />
										<span class="font-medium text-zinc-400">Neutral</span>
									</div>
									<span class="text-xs text-zinc-500">08:15</span>
								</div>
								<p class="text-sm text-zinc-300">"Can you explain the pricing model?"</p>
								<p class="text-xs text-zinc-500 mt-2">Informational question - opportunity to add value</p>
							</div>

							<div class="bg-yellow-950/30 rounded-xl p-4 border border-yellow-500/30">
								<div class="flex items-start justify-between mb-2">
									<div class="flex items-center gap-2">
										<Frown class="w-5 h-5 text-yellow-500" />
										<span class="font-medium text-yellow-500">Concern Detected</span>
									</div>
									<span class="text-xs text-zinc-500">04:22</span>
								</div>
								<p class="text-sm text-zinc-300">"We've had issues with similar tools before."</p>
								<div class="flex items-center gap-2 mt-2">
									<TrendingDown class="w-4 h-4 text-yellow-500" />
									<span class="text-xs text-yellow-500">Address past concerns</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Sentiment Breakdown -->
					<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
						<h3 class="text-xl font-semibold mb-6 flex items-center gap-3">
							<BarChart3 class="w-6 h-6 text-pink-500" />
							Sentiment Breakdown
						</h3>

						<div class="space-y-4">
							<div>
								<div class="flex justify-between mb-2">
									<div class="flex items-center gap-2">
										<div class="w-3 h-3 rounded-full bg-green-500"></div>
										<span class="text-sm">Positive</span>
									</div>
									<span class="text-sm font-semibold text-green-500">58%</span>
								</div>
								<div class="h-2 bg-zinc-900 rounded-full overflow-hidden">
									<div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style="width: 58%"></div>
								</div>
							</div>

							<div>
								<div class="flex justify-between mb-2">
									<div class="flex items-center gap-2">
										<div class="w-3 h-3 rounded-full bg-zinc-500"></div>
										<span class="text-sm">Neutral</span>
									</div>
									<span class="text-sm font-semibold text-zinc-400">30%</span>
								</div>
								<div class="h-2 bg-zinc-900 rounded-full overflow-hidden">
									<div class="h-full bg-gradient-to-r from-zinc-500 to-zinc-600 rounded-full" style="width: 30%"></div>
								</div>
							</div>

							<div>
								<div class="flex justify-between mb-2">
									<div class="flex items-center gap-2">
										<div class="w-3 h-3 rounded-full bg-yellow-500"></div>
										<span class="text-sm">Negative</span>
									</div>
									<span class="text-sm font-semibold text-yellow-500">12%</span>
								</div>
								<div class="h-2 bg-zinc-900 rounded-full overflow-hidden">
									<div class="h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full" style="width: 12%"></div>
								</div>
							</div>
						</div>

						<div class="mt-6 p-4 bg-pink-950/20 rounded-xl border border-pink-500/20">
							<div class="flex items-center gap-2 mb-2">
								<TrendingUp class="w-4 h-4 text-pink-500" />
								<span class="text-sm font-medium text-pink-500">Overall Trend</span>
							</div>
							<p class="text-sm text-zinc-400">Sentiment improving throughout conversation. Strong buying signals detected.</p>
						</div>
					</div>

					<!-- AI Recommendations -->
					<div class="bg-zinc-950 rounded-2xl p-6 border border-zinc-800">
						<h3 class="text-lg font-semibold mb-4">💡 AI Recommendations</h3>
						<div class="space-y-3">
							<div class="text-sm p-3 bg-green-950/30 rounded-lg border border-green-500/30">
								<p class="text-green-400 font-medium mb-1">✓ Positive momentum</p>
								<p class="text-zinc-400">Continue current approach, customer is engaged</p>
							</div>
							<div class="text-sm p-3 bg-blue-950/30 rounded-lg border border-blue-500/30">
								<p class="text-blue-400 font-medium mb-1">→ Address concerns</p>
								<p class="text-zinc-400">Follow up on past tool issues mentioned at 04:22</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Key Features -->
	<div class="py-24 px-6 bg-zinc-950">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold mb-4">Emotional Intelligence for Sales</h2>
				<p class="text-xl text-zinc-400">Understand and respond to customer emotions in real-time</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-pink-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
						<Activity class="w-6 h-6 text-pink-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Real-Time Analysis</h3>
					<p class="text-zinc-400">Track emotional tone throughout the conversation with millisecond accuracy.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-pink-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
						<TrendingUp class="w-6 h-6 text-pink-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Trend Detection</h3>
					<p class="text-zinc-400">Identify sentiment shifts and understand what drives positive or negative reactions.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-pink-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
						<AlertCircle class="w-6 h-6 text-pink-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Key Moments</h3>
					<p class="text-zinc-400">Automatically highlight critical emotional moments and inflection points.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-pink-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
						<Heart class="w-6 h-6 text-pink-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Emotion Recognition</h3>
					<p class="text-zinc-400">Detect specific emotions: excitement, concern, confusion, satisfaction, and more.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-pink-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
						<BarChart3 class="w-6 h-6 text-pink-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Sentiment Metrics</h3>
					<p class="text-zinc-400">Get detailed breakdowns and confidence scores for every sentiment reading.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-pink-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-6">
						<Smile class="w-6 h-6 text-pink-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Response Guidance</h3>
					<p class="text-zinc-400">Get AI recommendations on how to respond based on current emotional state.</p>
				</div>
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	<div class="py-24 px-6">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-4xl md:text-5xl font-bold mb-6">Master Emotional Intelligence</h2>
			<p class="text-xl text-zinc-400 mb-12">Join sales teams using AI to read the room in every conversation</p>
			
			<div class="flex flex-wrap gap-4 justify-center">
				<button 
					onclick={onboardingStore.start}
					class="px-8 py-4 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
				>
					<span>Get Started Free</span>
					<ArrowRight class="w-5 h-5" />
				</button>
				<a href="/features" class="px-8 py-4 bg-zinc-900 rounded-xl font-semibold border border-zinc-800 hover:border-pink-500 transition-all duration-300 hover:scale-105">
					Explore All Features
				</a>
			</div>
		</div>
	</div>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="sentiment" />
</div>
