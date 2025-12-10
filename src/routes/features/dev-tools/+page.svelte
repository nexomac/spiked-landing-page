<script>
	import FeatureNav from '$lib/components/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/FeatureFooter.svelte';
	import { CheckCircle2, TrendingUp, Target, Activity, Users, Clock, ArrowRight, FileText, AlertCircle, Zap, Sparkles, ExternalLink } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import { onMount } from 'svelte';

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

	const recentTickets = [
		{ id: 'SALES-127', title: 'Add bulk export feature', status: 'created', platform: 'Jira', priority: 'high', time: '2m ago', color: 'blue' },
		{ id: 'SALES-126', title: 'Custom dashboard widgets', status: 'synced', platform: 'Asana', priority: 'medium', time: '15m ago', color: 'purple' },
		{ id: 'SALES-125', title: 'Mobile app dark mode', status: 'in-progress', platform: 'Jira', priority: 'low', time: '1h ago', color: 'emerald' },
		{ id: 'SALES-124', title: 'API rate limit increase', status: 'completed', platform: 'Jira', priority: 'high', time: '3h ago', color: 'green' }
	];

	const stats = [
		{ label: 'Tickets Created', value: '47', period: 'This Week', color: 'blue' },
		{ label: 'Avg Response Time', value: '2.3h', period: 'Last 30 Days', color: 'emerald' },
		{ label: 'Features Shipped', value: '12', period: 'This Month', color: 'purple' }
	];
</script>

<svelte:head>
	<title>Developer Tools Integration - SpikedAI</title>
	<meta name="description" content="Automatically sync customer requests to Jira, Asana, and your project management tools. Never miss a feature request again." />
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
	<FeatureNav currentFeature="dev-tools" />
	
	<!-- Hero Section - Writer.com Style -->
	<section class="relative min-h-screen pt-32 pb-24">
		<div class="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black"></div>
		<div class="fixed inset-0 pointer-events-none">
			<div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
			<div class="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" style="animation-delay: 1s"></div>
		</div>

		<div class="max-w-7xl mx-auto px-6 relative">
			<div class="grid lg:grid-cols-2 gap-16 items-start">
				<!-- Left Column -->
				<div class="lg:sticky lg:top-32 z-10">
					<div class="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-full mb-8">
						<svg class="w-4 h-4 text-blue-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
						</svg>
						<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Dev Tools</span>
					</div>

					<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8">
						<span class="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent block mb-2">Sync to Jira & Asana</span>
						<span class="text-white block">automatically</span>
					</h1>

					<div class="space-y-4 mb-10">
						<div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all">
							<div class="flex items-start gap-4">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
									<CheckCircle2 class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1">Auto-create tickets</h3>
									<p class="text-sm text-zinc-400">Customer requests become tracked tasks instantly</p>
								</div>
							</div>
						</div>

						<div class="bg-zinc-900/50 border-l-2 border-blue-500 rounded-xl p-4 hover:bg-blue-500/5 transition-all">
							<div class="flex items-start gap-4">
								<div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
									<Activity class="w-5 h-5 text-blue-500" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1">Close the feedback loop</h3>
									<p class="text-sm text-zinc-400">Connect customer needs directly to engineering</p>
								</div>
							</div>
						</div>

						<div class="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all">
							<div class="flex items-start gap-4">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
									<Zap class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1">Never lose a request</h3>
									<p class="text-sm text-zinc-400">Every feature idea is captured and tracked</p>
								</div>
							</div>
						</div>
					</div>

					<a href="#integrations" class="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-medium group">
						<span>View integrations</span>
						<ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform" />
					</a>
				</div>

				<!-- Right Column - Dev Tools Widget -->
				<div 
					class="relative"
					in:fly={{ x: 30, duration: 800, delay: 400 }}
					style="transform: perspective(1000px) rotateY({mouseX * -2}deg) rotateX({mouseY * 2}deg)"
				>
					<!-- Floating decorative elements -->
					<div class="absolute -top-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
					<div class="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" style="animation: float-slow 6s ease-in-out infinite"></div>
					
					<div class="bg-gradient-to-br from-zinc-900/90 to-zinc-950/90 backdrop-blur-xl border border-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl">
						<!-- Header -->
						<div class="px-4 py-3 border-b border-zinc-800/50 flex items-center justify-between bg-zinc-900/50">
							<div class="flex items-center gap-2">
								<FileText class="w-4 h-4 text-blue-500" />
								<span class="text-sm font-semibold text-white">Recent Tickets</span>
							</div>
							<div class="flex items-center gap-2">
								<div class="flex items-center gap-1.5 px-2 py-1 bg-green-500/10 border border-green-500/30 rounded-lg">
									<div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
									<span class="text-xs font-semibold text-green-400">Synced</span>
								</div>
							</div>
						</div>

						<!-- Main Content -->
						<div class="p-5">
							<!-- Stats Grid -->
							<div class="grid grid-cols-3 gap-3 mb-5">
								{#each stats as stat, i}
									<div class="p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl text-center" in:fade={{ delay: i * 100 }}>
										<div class="text-2xl font-bold text-{stat.color}-500 mb-1">{stat.value}</div>
										<div class="text-[10px] font-semibold text-white mb-0.5">{stat.label}</div>
										<div class="text-[9px] text-zinc-500">{stat.period}</div>
									</div>
								{/each}
							</div>

							<!-- Ticket List -->
							<div class="space-y-2">
								{#each recentTickets as ticket, i}
									<div 
										class="p-3 bg-zinc-900/50 border border-zinc-800/50 rounded-xl hover:border-{ticket.color}-500/30 hover:bg-{ticket.color}-500/5 transition-all group"
										in:fly={{ y: 20, delay: i * 100 }}
									>
										<div class="flex items-start gap-3">
											<div class="w-8 h-8 rounded-lg bg-{ticket.color}-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
												{#if ticket.status === 'completed'}
													<CheckCircle2 class="w-4 h-4 text-{ticket.color}-500" />
												{:else if ticket.status === 'in-progress'}
													<Activity class="w-4 h-4 text-{ticket.color}-500" />
												{:else}
													<Zap class="w-4 h-4 text-{ticket.color}-500" />
												{/if}
											</div>
											<div class="flex-1 min-w-0">
												<div class="flex items-center gap-2 mb-1">
													<span class="text-xs font-mono text-{ticket.color}-500">{ticket.id}</span>
													<span class="px-1.5 py-0.5 bg-zinc-800 border border-zinc-700 rounded text-[9px] text-zinc-400">{ticket.platform}</span>
													<span class="px-1.5 py-0.5 bg-{ticket.color}-500/10 border border-{ticket.color}-500/30 rounded text-[9px] text-{ticket.color}-400">{ticket.priority}</span>
												</div>
												<div class="text-xs font-semibold text-white mb-1 truncate">{ticket.title}</div>
												<div class="flex items-center gap-2 text-[10px] text-zinc-500">
													<Clock class="w-3 h-3" />
													<span>{ticket.time}</span>
													<span class="capitalize text-{ticket.color}-500">• {ticket.status.replace('-', ' ')}</span>
												</div>
											</div>
											<ExternalLink class="w-4 h-4 text-zinc-600 group-hover:text-{ticket.color}-500 transition-colors" />
										</div>
									</div>
								{/each}
							</div>

							<!-- Integration Status -->
							<div class="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-xl">
								<div class="flex items-center gap-2 mb-2">
									<Sparkles class="w-4 h-4 text-blue-400" />
									<span class="text-xs font-semibold text-blue-400">Connected Platforms</span>
								</div>
								<div class="flex items-center gap-2">
									<div class="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded">
										<CheckCircle2 class="w-3 h-3 text-blue-500" />
										<span class="text-[10px] font-semibold text-blue-400">Jira</span>
									</div>
									<div class="flex items-center gap-1.5 px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded">
										<CheckCircle2 class="w-3 h-3 text-purple-500" />
										<span class="text-[10px] font-semibold text-purple-400">Asana</span>
									</div>
									<div class="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded">
										<CheckCircle2 class="w-3 h-3 text-emerald-500" />
										<span class="text-[10px] font-semibold text-emerald-400">Linear</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

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
