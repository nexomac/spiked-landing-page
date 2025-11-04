<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { Calendar, CheckCircle2, Clock, TrendingUp, FileText, Users, Star, ArrowRight } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Follow-Up Meeting Preparation - SpikedAI</title>
	<meta name="description" content="Never miss important follow-up details. Automated preparation for your next meetings with context-aware briefings." />
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="followup" />
	
	<!-- Hero Section -->
	<div class="relative overflow-hidden bg-gradient-to-b from-purple-950/20 to-black py-24">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
		
		<div class="relative max-w-7xl mx-auto px-6">
			<div class="text-center max-w-4xl mx-auto">
				<div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 mb-8">
					<Calendar class="w-10 h-10 text-purple-500" strokeWidth={1.5} />
				</div>
				
				<h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
					Follow-Up Meeting Preparation
				</h1>
				
				<p class="text-xl md:text-2xl text-zinc-400 mb-12">
					Never walk into a meeting unprepared. Get AI-powered briefings with all the context you need.
				</p>
				
				<div class="flex flex-wrap gap-4 justify-center">
					<a href="#demo" class="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
						See It In Action
					</a>
					<a href="/" class="px-8 py-4 bg-zinc-900 rounded-xl font-semibold border border-zinc-800 hover:border-purple-500 transition-all duration-300 hover:scale-105">
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
				<h2 class="text-4xl font-bold mb-4">Automated Meeting Preparation</h2>
				<p class="text-xl text-zinc-400">AI-generated briefings with complete context from previous conversations</p>
			</div>

			<div class="grid lg:grid-cols-2 gap-8">
				<!-- Briefing Document -->
				<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
					<div class="flex items-center justify-between mb-6">
						<div class="flex items-center gap-3">
							<FileText class="w-6 h-6 text-purple-500" />
							<h3 class="text-xl font-semibold">Meeting Briefing</h3>
						</div>
						<span class="text-xs px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
							Auto-Generated
						</span>
					</div>

					<div class="space-y-6">
						<!-- Meeting Info -->
						<div class="pb-6 border-b border-zinc-800">
							<h4 class="text-sm text-zinc-500 mb-2">UPCOMING MEETING</h4>
							<div class="flex items-center gap-3 mb-2">
								<Users class="w-4 h-4 text-zinc-400" />
								<span class="text-white font-medium">Enterprise Corp - Product Demo</span>
							</div>
							<div class="flex items-center gap-3">
								<Clock class="w-4 h-4 text-zinc-400" />
								<span class="text-zinc-400">Tomorrow, 2:00 PM - 3:00 PM</span>
							</div>
						</div>

						<!-- Key Context -->
						<div>
							<h4 class="text-sm text-zinc-500 mb-3">KEY CONTEXT FROM LAST MEETING</h4>
							<div class="space-y-3">
								<div class="flex gap-3">
									<CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
									<p class="text-sm text-zinc-300">Budget approved for Q1 implementation ($250K)</p>
								</div>
								<div class="flex gap-3">
									<CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
									<p class="text-sm text-zinc-300">Technical team concerns about data migration</p>
								</div>
								<div class="flex gap-3">
									<CheckCircle2 class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
									<p class="text-sm text-zinc-300">Requested security compliance documentation</p>
								</div>
							</div>
						</div>

						<!-- Action Items -->
						<div>
							<h4 class="text-sm text-zinc-500 mb-3">PENDING ACTION ITEMS</h4>
							<div class="space-y-2">
								<div class="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
									<span class="text-sm text-zinc-300">Send security whitepaper</span>
									<span class="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">Pending</span>
								</div>
								<div class="flex items-center justify-between p-3 bg-zinc-900 rounded-lg">
									<span class="text-sm text-zinc-300">Schedule technical deep-dive</span>
									<span class="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Completed</span>
								</div>
							</div>
						</div>

						<!-- Talking Points -->
						<div>
							<h4 class="text-sm text-zinc-500 mb-3">SUGGESTED TALKING POINTS</h4>
							<div class="space-y-2">
								<div class="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
									<p class="text-sm text-zinc-300">1. Address migration concerns with case study</p>
								</div>
								<div class="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
									<p class="text-sm text-zinc-300">2. Present ROI model based on their team size</p>
								</div>
								<div class="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
									<p class="text-sm text-zinc-300">3. Discuss implementation timeline & milestones</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Timeline & Stats -->
				<div class="space-y-6">
					<!-- Meeting Timeline -->
					<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
						<h3 class="text-xl font-semibold mb-6 flex items-center gap-3">
							<Clock class="w-6 h-6 text-purple-500" />
							Meeting Timeline
						</h3>

						<div class="space-y-4">
							<div class="flex gap-4">
								<div class="flex flex-col items-center">
									<div class="w-3 h-3 rounded-full bg-green-500 border-4 border-green-500/20"></div>
									<div class="w-0.5 h-full bg-zinc-800"></div>
								</div>
								<div class="flex-1 pb-6">
									<p class="text-sm text-zinc-400 mb-1">Oct 15, 2025</p>
									<p class="font-medium text-white">Initial Discovery Call</p>
									<p class="text-sm text-zinc-500 mt-1">30 min - Needs assessment</p>
								</div>
							</div>

							<div class="flex gap-4">
								<div class="flex flex-col items-center">
									<div class="w-3 h-3 rounded-full bg-green-500 border-4 border-green-500/20"></div>
									<div class="w-0.5 h-full bg-zinc-800"></div>
								</div>
								<div class="flex-1 pb-6">
									<p class="text-sm text-zinc-400 mb-1">Oct 22, 2025</p>
									<p class="font-medium text-white">Technical Deep-Dive</p>
									<p class="text-sm text-zinc-500 mt-1">60 min - Architecture review</p>
								</div>
							</div>

							<div class="flex gap-4">
								<div class="flex flex-col items-center">
									<div class="w-3 h-3 rounded-full bg-purple-500 border-4 border-purple-500/20 animate-pulse"></div>
								</div>
								<div class="flex-1">
									<p class="text-sm text-purple-400 mb-1">Tomorrow, 2:00 PM</p>
									<p class="font-medium text-white">Product Demo</p>
									<p class="text-sm text-zinc-500 mt-1">45 min - Full platform walkthrough</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Engagement Stats -->
					<div class="bg-zinc-950 rounded-2xl p-8 border border-zinc-800">
						<h3 class="text-xl font-semibold mb-6 flex items-center gap-3">
							<TrendingUp class="w-6 h-6 text-purple-500" />
							Engagement Metrics
						</h3>

						<div class="grid grid-cols-2 gap-4">
							<div class="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
								<p class="text-3xl font-bold text-purple-500 mb-1">High</p>
								<p class="text-sm text-zinc-400">Engagement Level</p>
							</div>
							<div class="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
								<p class="text-3xl font-bold text-purple-500 mb-1">92%</p>
								<p class="text-sm text-zinc-400">Response Rate</p>
							</div>
							<div class="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
								<p class="text-3xl font-bold text-purple-500 mb-1">3</p>
								<p class="text-sm text-zinc-400">Meetings Held</p>
							</div>
							<div class="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
								<p class="text-3xl font-bold text-purple-500 mb-1">5</p>
								<p class="text-sm text-zinc-400">Key Contacts</p>
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
				<h2 class="text-4xl font-bold mb-4">Never Miss Important Context</h2>
				<p class="text-xl text-zinc-400">Everything you need to prepare for success</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<FileText class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Auto-Generated Briefings</h3>
					<p class="text-zinc-400">Comprehensive meeting prep documents created automatically from your conversation history.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<CheckCircle2 class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Action Item Tracking</h3>
					<p class="text-zinc-400">Never forget a commitment. Track and follow up on all action items automatically.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<TrendingUp class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Context Awareness</h3>
					<p class="text-zinc-400">AI understands the full relationship history and surfaces relevant insights.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<Star class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Smart Recommendations</h3>
					<p class="text-zinc-400">Get AI-suggested talking points tailored to each prospect's specific needs.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<Clock class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Meeting Timeline</h3>
					<p class="text-zinc-400">Visual timeline of all interactions to quickly understand the relationship stage.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<Users class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Stakeholder Insights</h3>
					<p class="text-zinc-400">Track key contacts, their concerns, and engagement levels across meetings.</p>
				</div>
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	<div class="py-24 px-6">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to Never Miss a Beat?</h2>
			<p class="text-xl text-zinc-400 mb-12">Join sales teams using AI to prepare for every conversation</p>
			
			<div class="flex flex-wrap gap-4 justify-center">
				<a href="/demo" class="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
					<span>Get Started Free</span>
					<ArrowRight class="w-5 h-5" />
				</a>
				<a href="/features" class="px-8 py-4 bg-zinc-900 rounded-xl font-semibold border border-zinc-800 hover:border-purple-500 transition-all duration-300 hover:scale-105">
					Explore All Features
				</a>
			</div>
		</div>
	</div>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="followup" />
</div>
