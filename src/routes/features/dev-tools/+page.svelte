<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { CheckCircle2, TrendingUp, Target, Activity, Users, Clock, ArrowRight, FileText, AlertCircle, Zap } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Developer Tools Integration - SpikedAI</title>
	<meta name="description" content="Automatically sync customer requests to Jira, Asana, and your project management tools. Never miss a feature request again." />
</svelte:head>

<div class="min-h-screen bg-black text-white">
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="dev-tools" />
	
	<!-- Hero Section -->
	<div class="relative overflow-hidden bg-gradient-to-b from-blue-950/20 to-black py-24">
		<div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
		
		<div class="relative max-w-7xl mx-auto px-6">
			<div class="text-center max-w-4xl mx-auto">
				<div class="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 mb-8">
					<svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
					</svg>
				</div>
				
				<h1 class="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
					Developer Tools Integration
				</h1>
				
				<p class="text-xl md:text-2xl text-zinc-400 mb-12">
					Turn customer requests into tracked development tasks automatically. Sync with Jira, Asana, and your project management tools.
				</p>
				
				<div class="flex flex-wrap gap-4 justify-center">
					<a href="#integrations" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
						See Integrations
					</a>
					<a href="/features" class="px-8 py-4 bg-zinc-900 rounded-xl font-semibold border border-zinc-800 hover:border-blue-500 transition-all duration-300 hover:scale-105">
						Back to Features
					</a>
				</div>
			</div>
		</div>
	</div>

	<!-- Integration Platforms -->
	<div id="integrations" class="py-24 px-6">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold mb-4">Connect Your Development Tools</h2>
				<p class="text-xl text-zinc-400">Automatically sync customer requests and feature ideas to your project management tools</p>
			</div>

			<div class="grid lg:grid-cols-2 gap-8 mb-16">
				<!-- Jira Integration -->
				<div class="bg-gradient-to-br from-zinc-950 to-zinc-900 rounded-2xl p-8 border border-blue-900/50 hover:border-blue-500 transition-all duration-300 hover:scale-[1.02]">
					<div class="flex items-center gap-4 mb-6">
						<div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-xl shadow-blue-600/30">
							<svg class="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.5 17.5h-9v-11h9v11z"/>
							</svg>
						</div>
						<div>
							<h3 class="text-2xl font-bold text-white">Jira Integration</h3>
							<div class="flex items-center gap-2 mt-1">
								<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<span class="text-sm text-green-400 font-semibold">Auto-Syncing</span>
							</div>
						</div>
					</div>

					<p class="text-zinc-400 mb-6 leading-relaxed">
						Every feature request, bug report, or technical requirement mentioned in customer calls is automatically converted into a Jira ticket with full context, priority tags, and customer information.
					</p>

					<div class="space-y-4 mb-6">
						<div class="flex items-start gap-3 p-4 bg-zinc-900/60 rounded-lg border border-zinc-800">
							<CheckCircle2 class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
							<div>
								<p class="text-sm font-semibold text-white mb-1">Automatic Ticket Creation</p>
								<p class="text-xs text-zinc-500">Instantly create tickets from customer conversations with all relevant details</p>
							</div>
						</div>
						<div class="flex items-start gap-3 p-4 bg-zinc-900/60 rounded-lg border border-zinc-800">
							<CheckCircle2 class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
							<div>
								<p class="text-sm font-semibold text-white mb-1">Smart Priority Tagging</p>
								<p class="text-xs text-zinc-500">AI determines urgency based on customer segment and deal size</p>
							</div>
						</div>
						<div class="flex items-start gap-3 p-4 bg-zinc-900/60 rounded-lg border border-zinc-800">
							<CheckCircle2 class="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
							<div>
								<p class="text-sm font-semibold text-white mb-1">Full Context Sync</p>
								<p class="text-xs text-zinc-500">Meeting transcripts, customer details, and timeline automatically attached</p>
							</div>
						</div>
					</div>

					<div class="flex gap-3">
						<button class="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							Connect Jira
						</button>
					</div>
				</div>

				<!-- Asana Integration -->
				<div class="bg-gradient-to-br from-zinc-950 to-zinc-900 rounded-2xl p-8 border border-pink-900/50 hover:border-pink-500 transition-all duration-300 hover:scale-[1.02]">
					<div class="flex items-center gap-4 mb-6">
						<div class="w-16 h-16 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center shadow-xl shadow-pink-600/30">
							<svg class="w-8 h-8 text-white font-bold" viewBox="0 0 24 24" fill="currentColor">
								<text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="16" font-weight="bold">A</text>
							</svg>
						</div>
						<div>
							<h3 class="text-2xl font-bold text-white">Asana Integration</h3>
							<div class="flex items-center gap-2 mt-1">
								<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
								<span class="text-sm text-green-400 font-semibold">Auto-Syncing</span>
							</div>
						</div>
					</div>

					<p class="text-zinc-400 mb-6 leading-relaxed">
						Keep your Asana projects perfectly aligned with customer needs. Every action item, feature request, and commitment made in meetings flows directly into your Asana workspace.
					</p>

					<div class="space-y-4 mb-6">
						<div class="flex items-start gap-3 p-4 bg-zinc-900/60 rounded-lg border border-zinc-800">
							<CheckCircle2 class="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
							<div>
								<p class="text-sm font-semibold text-white mb-1">Task Auto-Generation</p>
								<p class="text-xs text-zinc-500">Convert customer commitments into Asana tasks automatically</p>
							</div>
						</div>
						<div class="flex items-start gap-3 p-4 bg-zinc-900/60 rounded-lg border border-zinc-800">
							<CheckCircle2 class="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
							<div>
								<p class="text-sm font-semibold text-white mb-1">Project Timeline Sync</p>
								<p class="text-xs text-zinc-500">Due dates and deadlines automatically populated from customer discussions</p>
							</div>
						</div>
						<div class="flex items-start gap-3 p-4 bg-zinc-900/60 rounded-lg border border-zinc-800">
							<CheckCircle2 class="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
							<div>
								<p class="text-sm font-semibold text-white mb-1">Team Assignments</p>
								<p class="text-xs text-zinc-500">Smart assignment based on expertise and workload</p>
							</div>
						</div>
					</div>

					<div class="flex gap-3">
						<button class="flex-1 px-4 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
							</svg>
							Connect Asana
						</button>
					</div>
				</div>
			</div>

			<!-- Live Example -->
			<div class="bg-gradient-to-r from-green-950/30 to-emerald-950/30 rounded-2xl p-8 border border-green-900/50 shadow-2xl">
				<div class="flex items-start gap-4">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 shadow-lg">
						<TrendingUp class="w-6 h-6 text-white" />
					</div>
					<div class="flex-1">
						<div class="flex items-center gap-3 mb-3">
							<span class="text-sm font-bold text-green-400">AUTO-CREATED TICKET</span>
							<span class="px-3 py-1 bg-green-950/50 text-green-400 text-xs rounded-full border border-green-900/50">Just Created</span>
						</div>
						<h3 class="text-xl font-bold text-white mb-2">Add SSO integration with Azure AD</h3>
						<p class="text-sm text-zinc-400 mb-4">Requested by Acme Corp (Enterprise tier) during Q4 2025 discovery call</p>
						
						<div class="flex flex-wrap gap-2 mb-4">
							<span class="px-3 py-1 bg-blue-950/30 text-blue-400 text-xs rounded-full font-medium border border-blue-900/50">High Priority</span>
							<span class="px-3 py-1 bg-red-950/30 text-red-400 text-xs rounded-full font-medium border border-red-900/50">Q2 2025</span>
							<span class="px-3 py-1 bg-purple-950/30 text-purple-400 text-xs rounded-full font-medium border border-purple-900/50">Enterprise Feature</span>
							<span class="px-3 py-1 bg-orange-950/30 text-orange-400 text-xs rounded-full font-medium border border-orange-900/50">$250K ARR Impact</span>
						</div>

						<div class="flex gap-3">
							<button class="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors font-medium">View in Jira</button>
							<button class="px-4 py-2 bg-zinc-800 text-zinc-300 text-sm rounded-lg hover:bg-zinc-700 transition-colors font-medium">Edit Details</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Benefits Section -->
	<div class="py-24 px-6 bg-zinc-950">
		<div class="max-w-7xl mx-auto">
			<div class="text-center mb-16">
				<h2 class="text-4xl font-bold mb-4">Why Development Tool Integration Matters</h2>
				<p class="text-xl text-zinc-400">Close the loop between customer needs and engineering execution</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
						<Target class="w-6 h-6 text-blue-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Never Miss a Feature Request</h3>
					<p class="text-zinc-400">Every customer need is captured and tracked automatically. No more lost sticky notes or forgotten promises.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-6">
						<Users class="w-6 h-6 text-green-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Perfect Sales-to-Dev Alignment</h3>
					<p class="text-zinc-400">Bridge the communication gap. Engineering gets full context on why features matter and which customers need them.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
						<Activity class="w-6 h-6 text-purple-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Smart Prioritization</h3>
					<p class="text-zinc-400">AI tags tickets with deal size, customer tier, and urgency so your team knows exactly what to build first.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-6">
						<Clock class="w-6 h-6 text-orange-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Save Hours Every Week</h3>
					<p class="text-zinc-400">Stop manually creating tickets and updating boards. Automation frees your team to focus on building great products.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center mb-6">
						<FileText class="w-6 h-6 text-red-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Complete Context</h3>
					<p class="text-zinc-400">Every ticket includes meeting transcripts, customer details, and the exact conversation where the request was made.</p>
				</div>

				<div class="bg-black rounded-2xl p-8 border border-zinc-800 hover:border-blue-500/50 transition-all duration-300">
					<div class="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6">
						<Zap class="w-6 h-6 text-cyan-500" />
					</div>
					<h3 class="text-xl font-semibold mb-3">Real-Time Sync</h3>
					<p class="text-zinc-400">Changes flow instantly between systems. Your project management tools stay current without manual updates.</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Stats Section -->
	<div class="py-24 px-6">
		<div class="max-w-5xl mx-auto">
			<div class="bg-gradient-to-br from-zinc-950 to-zinc-900 rounded-2xl p-12 border border-zinc-800">
				<h2 class="text-3xl font-bold mb-12 text-center">Integration Performance</h2>
				
				<div class="grid md:grid-cols-3 gap-8">
					<div class="text-center">
						<div class="text-5xl font-bold text-blue-500 mb-3">3.2h</div>
						<div class="text-zinc-400 mb-2">Time Saved Per Week</div>
						<div class="text-xs text-zinc-600">Per team member</div>
					</div>
					<div class="text-center">
						<div class="text-5xl font-bold text-green-500 mb-3">100%</div>
						<div class="text-zinc-400 mb-2">Requests Captured</div>
						<div class="text-xs text-zinc-600">Zero lost conversations</div>
					</div>
					<div class="text-center">
						<div class="text-5xl font-bold text-purple-500 mb-3">47</div>
						<div class="text-zinc-400 mb-2">Avg Tickets/Month</div>
						<div class="text-xs text-zinc-600">Auto-generated</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- CTA Section -->
	<div class="py-24 px-6">
		<div class="max-w-4xl mx-auto text-center">
			<h2 class="text-4xl md:text-5xl font-bold mb-6">Ready to Connect Your Tools?</h2>
			<p class="text-xl text-zinc-400 mb-12">Start automatically syncing customer requests to your development workflow</p>
			
			<div class="flex flex-wrap gap-4 justify-center">
				<a href="#integrations" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2">
					<span>Connect Your Tools</span>
					<ArrowRight class="w-5 h-5" />
				</a>
				<a href="/features" class="px-8 py-4 bg-zinc-900 rounded-xl font-semibold border border-zinc-800 hover:border-blue-500 transition-all duration-300 hover:scale-105">
					Explore All Features
				</a>
			</div>
		</div>
	</div>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="dev-tools" />
</div>
