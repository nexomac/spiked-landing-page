<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { Target, TrendingUp, Award, Zap, CheckCircle2, BarChart3, Trophy, ArrowRight, Star } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Custom Goals & Tracking - SpikedAI</title>
	<meta name="description" content="Define custom sales goals and track performance in real-time. Achieve more with AI-powered goal management." />
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="custom-goals" />
	
	<!-- Hero Section -->
	<div class="relative overflow-hidden bg-gradient-to-b from-indigo-950/20 to-black py-24">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black"></div>
		
		<div class="relative max-w-7xl mx-auto px-6">
			<div class="text-center max-w-4xl mx-auto">
				<div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 border border-indigo-500/30 mb-8">
					<Target class="w-10 h-10 text-indigo-500" strokeWidth={1.5} />
				</div>
				
				<h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600 bg-clip-text text-transparent">
					Custom Goals & Tracking
				</h1>
				
				<p class="text-xl md:text-2xl text-zinc-400 mb-12">
					Set personalized goals, track progress in real-time, and optimize performance with AI insights.
				</p>
				
				<div class="flex flex-wrap gap-4 justify-center">
					<a href="#demo" class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105">
						See Goal Tracking
					</a>
					<a href="/" class="px-8 py-4 bg-zinc-900 rounded-xl font-semibold border border-zinc-800 hover:border-indigo-500 transition-all duration-300 hover:scale-105">
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
				<h2 class="text-4xl font-bold mb-4">Your Goals, Your Way</h2>
				<p class="text-xl text-zinc-400">Define, track, and achieve custom objectives tailored to your sales process</p>
			</div>

			<div class="grid lg:grid-cols-2 gap-8">
				<!-- Active Goals -->
				<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
					<div class="flex items-center justify-between mb-6">
						<div class="flex items-center gap-3">
							<Target class="w-6 h-6 text-indigo-500" />
							<h3 class="text-xl font-semibold">Active Goals</h3>
						</div>
						<span class="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30">
							Q4 2025
						</span>
					</div>

					<div class="space-y-4">
						<!-- Goal 1 -->
						<div class="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-indigo-500/50 transition-colors">
							<div class="flex items-start justify-between mb-4">
								<div>
									<h4 class="font-semibold text-white mb-1">Close 10 Enterprise Deals</h4>
									<p class="text-sm text-zinc-400">Target: $500K+ ARR</p>
								</div>
								<Trophy class="w-6 h-6 text-yellow-500" />
							</div>

							<div class="space-y-3">
								<div>
									<div class="flex justify-between text-sm mb-2">
										<span class="text-zinc-400">Progress</span>
										<span class="font-semibold text-indigo-500">7 / 10 deals</span>
									</div>
									<div class="h-3 bg-black rounded-full overflow-hidden">
										<div class="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full relative" style="width: 70%">
											<div class="absolute inset-0 bg-white/20 animate-pulse"></div>
										</div>
									</div>
								</div>

								<div class="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800">
									<div>
										<p class="text-xs text-zinc-500 mb-1">Current ARR</p>
										<p class="text-lg font-bold text-indigo-500">$385K</p>
									</div>
									<div>
										<p class="text-xs text-zinc-500 mb-1">Time Remaining</p>
										<p class="text-lg font-bold text-zinc-300">45 days</p>
									</div>
								</div>

								<div class="flex items-center gap-2 p-3 bg-green-950/30 rounded-lg border border-green-500/30">
									<TrendingUp class="w-4 h-4 text-green-500" />
									<span class="text-sm text-green-400">On track to exceed goal by 15%</span>
								</div>
							</div>
						</div>

						<!-- Goal 2 -->
						<div class="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-indigo-500/50 transition-colors">
							<div class="flex items-start justify-between mb-4">
								<div>
									<h4 class="font-semibold text-white mb-1">Increase Demo Conversion</h4>
									<p class="text-sm text-zinc-400">Target: 40% conversion rate</p>
								</div>
								<Zap class="w-6 h-6 text-indigo-500" />
							</div>

							<div class="space-y-3">
								<div>
									<div class="flex justify-between text-sm mb-2">
										<span class="text-zinc-400">Current Rate</span>
										<span class="font-semibold text-indigo-500">38%</span>
									</div>
									<div class="h-3 bg-black rounded-full overflow-hidden">
										<div class="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" style="width: 95%"></div>
									</div>
								</div>

								<div class="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800">
									<div>
										<p class="text-xs text-zinc-500 mb-1">Demos Given</p>
										<p class="text-lg font-bold text-indigo-500">42</p>
									</div>
									<div>
										<p class="text-xs text-zinc-500 mb-1">Conversions</p>
										<p class="text-lg font-bold text-zinc-300">16</p>
									</div>
								</div>

								<div class="flex items-center gap-2 p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/30">
									<Star class="w-4 h-4 text-indigo-500" />
									<span class="text-sm text-indigo-400">Just 2% away from goal!</span>
								</div>
							</div>
						</div>

						<!-- Goal 3 -->
						<div class="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-indigo-500/50 transition-colors">
							<div class="flex items-start justify-between mb-4">
								<div>
									<h4 class="font-semibold text-white mb-1">Reduce Sales Cycle</h4>
									<p class="text-sm text-zinc-400">Target: Under 45 days</p>
								</div>
								<Award class="w-6 h-6 text-green-500" />
							</div>

							<div class="space-y-3">
								<div>
									<div class="flex justify-between text-sm mb-2">
										<span class="text-zinc-400">Current Average</span>
										<span class="font-semibold text-green-500">42 days</span>
									</div>
									<div class="h-3 bg-black rounded-full overflow-hidden">
										<div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full" style="width: 100%"></div>
									</div>
								</div>

								<div class="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800">
									<div>
										<p class="text-xs text-zinc-500 mb-1">Improvement</p>
										<p class="text-lg font-bold text-green-500">-12 days</p>
									</div>
									<div>
										<p class="text-xs text-zinc-500 mb-1">Previous Avg</p>
										<p class="text-lg font-bold text-zinc-300">54 days</p>
									</div>
								</div>

								<div class="flex items-center gap-2 p-3 bg-green-950/30 rounded-lg border border-green-500/30">
									<CheckCircle2 class="w-4 h-4 text-green-500" />
									<span class="text-sm text-green-400">Goal achieved! 🎉</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Performance Dashboard -->
				<div class="space-y-6">
					<!-- Overall Performance -->
					<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
						<h3 class="text-xl font-semibold mb-6 flex items-center gap-3">
							<BarChart3 class="w-6 h-6 text-indigo-500" />
							Performance Overview
						</h3>

						<div class="grid grid-cols-2 gap-4 mb-6">
							<div class="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
								<p class="text-3xl font-bold text-indigo-500 mb-1">89%</p>
								<p class="text-sm text-zinc-400">Goals On Track</p>
							</div>
							<div class="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
								<p class="text-3xl font-bold text-green-500 mb-1">+23%</p>
								<p class="text-sm text-zinc-400">vs Last Quarter</p>
							</div>
						</div>

						<!-- Monthly Trend -->
						<div class="space-y-4">
							<div>
								<div class="flex justify-between text-sm mb-2">
									<span class="text-zinc-400">October</span>
									<span class="font-semibold text-indigo-500">92%</span>
								</div>
								<div class="h-2 bg-zinc-900 rounded-full overflow-hidden">
									<div class="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" style="width: 92%"></div>
								</div>
							</div>

							<div>
								<div class="flex justify-between text-sm mb-2">
									<span class="text-zinc-400">November</span>
									<span class="font-semibold text-indigo-500">87%</span>
								</div>
								<div class="h-2 bg-zinc-900 rounded-full overflow-hidden">
									<div class="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" style="width: 87%"></div>
								</div>
							</div>

							<div>
								<div class="flex justify-between text-sm mb-2">
									<span class="text-zinc-400">December (Projected)</span>
									<span class="font-semibold text-green-500">95%</span>
								</div>
								<div class="h-2 bg-zinc-900 rounded-full overflow-hidden">
									<div class="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full animate-pulse" style="width: 95%"></div>
								</div>
							</div>
						</div>
					</div>

					<!-- AI Insights -->
					<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
						<h3 class="text-xl font-semibold mb-6 flex items-center gap-3">
							<Zap class="w-6 h-6 text-yellow-500" />
							AI Insights
						</h3>

						<div class="space-y-3">
							<div class="p-4 bg-green-950/30 rounded-xl border border-green-500/30">
								<div class="flex items-start gap-3">
									<TrendingUp class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
									<div>
										<p class="font-medium text-green-400 mb-1">Strong Performance</p>
										<p class="text-sm text-zinc-300">Your demo conversion rate is 15% above team average. Keep using your current approach.</p>
									</div>
								</div>
							</div>

							<div class="p-4 bg-blue-950/30 rounded-xl border border-blue-500/30">
								<div class="flex items-start gap-3">
									<Target class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
									<div>
										<p class="font-medium text-blue-400 mb-1">Opportunity</p>
										<p class="text-sm text-zinc-300">Focus on enterprise deals this month to maximize ARR impact. 3 hot prospects in pipeline.</p>
									</div>
								</div>
							</div>

							<div class="p-4 bg-indigo-950/30 rounded-xl border border-indigo-500/30">
								<div class="flex items-start gap-3">
									<Award class="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
									<div>
										<p class="font-medium text-indigo-400 mb-1">Achievement Unlocked</p>
										<p class="text-sm text-zinc-300">Sales cycle goal achieved 3 weeks early! New goal recommendation: 38 days.</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- Quick Actions -->
					<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
						<h3 class="text-xl font-semibold mb-6">Quick Actions</h3>

						<div class="space-y-3">
							<button class="w-full p-4 bg-indigo-950/30 hover:bg-indigo-950/50 rounded-xl border border-indigo-500/30 hover:border-indigo-500 transition-all text-left">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-3">
										<Target class="w-5 h-5 text-indigo-500" />
										<span class="font-medium">Create New Goal</span>
									</div>
									<ArrowRight class="w-4 h-4 text-indigo-500" />
								</div>
							</button>

							<button class="w-full p-4 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all text-left">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-3">
										<BarChart3 class="w-5 h-5 text-zinc-400" />
										<span class="font-medium">View Full Report</span>
									</div>
									<ArrowRight class="w-4 h-4 text-zinc-400" />
								</div>
							</button>

							<button class="w-full p-4 bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all text-left">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-3">
										<Trophy class="w-5 h-5 text-zinc-400" />
										<span class="font-medium">View Achievements</span>
									</div>
									<ArrowRight class="w-4 h-4 text-zinc-400" />
								</div>
							</button>
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
				<h2 class="text-4xl font-bold mb-4">Goal Tracking Made Simple</h2>
				<p class="text-xl text-zinc-400">Everything you need to hit your targets</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
						<Target class="w-6 h-6 text-indigo-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Custom Goals</h3>
					<p class="text-zinc-400">Define any metric that matters to your business. Full flexibility.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
						<BarChart3 class="w-6 h-6 text-indigo-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Real-Time Tracking</h3>
					<p class="text-zinc-400">See progress update live as you close deals and hit milestones.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
						<Zap class="w-6 h-6 text-indigo-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">AI Recommendations</h3>
					<p class="text-zinc-400">Get intelligent suggestions to optimize performance and hit targets.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
						<TrendingUp class="w-6 h-6 text-indigo-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Trend Analysis</h3>
					<p class="text-zinc-400">Understand performance patterns and predict future outcomes.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
						<Trophy class="w-6 h-6 text-indigo-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Achievements</h3>
					<p class="text-zinc-400">Celebrate wins with gamified achievements and milestone tracking.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6">
						<Award class="w-6 h-6 text-indigo-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Team Benchmarks</h3>
					<p class="text-zinc-400">Compare your performance against team averages and top performers.</p>
				</div>
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	<div class="py-24 px-6">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to Crush Your Goals?</h2>
			<p class="text-xl text-zinc-400 mb-12">Join top performers using AI-powered goal tracking</p>
			
			<div class="flex flex-wrap gap-4 justify-center">
				<a href="/demo" class="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
					<span>Start Tracking Goals</span>
					<ArrowRight class="w-5 h-5" />
				</a>
				<a href="/features" class="px-8 py-4 bg-zinc-900 rounded-xl font-semibold border border-zinc-800 hover:border-indigo-500 transition-all duration-300 hover:scale-105">
					Explore All Features
				</a>
			</div>
		</div>
	</div>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="custom-goals" />
</div>
