<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { Heart, TrendingUp, TrendingDown, Meh, Smile, Frown, BarChart3, Activity, ArrowRight, AlertCircle } from 'lucide-svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
</script>

<svelte:head>
	<title>Sentiment Analysis - SpikedAI</title>
	<meta name="description" content="Real-time emotional intelligence for sales conversations. Understand customer sentiment and respond appropriately." />
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="sentiment" />

	<!-- Hero Section -->
	<div class="relative overflow-hidden bg-gradient-to-b from-pink-950/20 to-black pt-32 pb-24">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-black to-black"></div>
		
		<div class="relative max-w-7xl mx-auto px-6">
			<div class="text-center max-w-4xl mx-auto">
				<div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 border border-pink-500/30 mb-8">
					<Heart class="w-10 h-10 text-pink-500" strokeWidth={1.5} />
				</div>
				
				<h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 bg-clip-text text-transparent">
					Real-Time Sentiment Analysis
				</h1>
				
				<p class="text-xl md:text-2xl text-zinc-400 mb-12">
					Emotional intelligence for your sales conversations. Know when to push and when to pause.
				</p>
				
				<div class="flex flex-wrap gap-4 justify-center">
					<a href="#demo" class="px-8 py-4 bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105">
						See It In Action
					</a>
					<a href="/" class="px-8 py-4 bg-zinc-900 rounded-xl font-semibold border border-zinc-800 hover:border-pink-500 transition-all duration-300 hover:scale-105">
						Back to Features
					</a>
				</div>
			</div>
		</div>
	</div>

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
