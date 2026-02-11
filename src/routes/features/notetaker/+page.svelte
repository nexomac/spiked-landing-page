<script>
	import FeatureNav from '$lib/components/features/FeatureNav.svelte';
	import FeatureFooter from '$lib/components/features/FeatureFooter.svelte';
	import NotetakerShowcase from '$lib/components/features/NotetakerShowcase.svelte';
	import { 
		MessageSquare, 
		FileText, 
		Brain, 
		Zap, 
		ArrowRight, 
		Target, 
		Mail, 
		Activity, 
		BarChart3, 
		Users, 
		TrendingUp, 
		Clock, 
		Sparkles, 
		CheckCircle, 
		Calendar 
	} from 'lucide-svelte';
	import { onboardingStore } from '$lib/stores/onboarding.js';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	
	// Parallax and animation states
	let mouseX = $state(0);
	let mouseY = $state(0);
	let scrollY = $state(0);
	let isAutoPlaying = $state(true);
	let activeTab = $state('templates');
	let selectedTemplate = $state(null);
	
	onMount(() => {
		// Handle mouse movement for parallax
		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};
		
		// Handle scroll for parallax
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
	<title>Smart Notetaker | SpikedAI</title>
	<meta name="description" content="Automatically capture, transcribe, and analyze every conversation with SpikedAI's intelligent notetaker powered by conversational AI." />
</svelte:head>

<style>
	/* Gradient text */
	.gradient-text {
		background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	/* Enhanced glass morphism with depth */
	.glass {
		background: rgba(255, 255, 255, 0.03);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.05);
		box-shadow: 
			0 8px 32px 0 rgba(0, 0, 0, 0.37),
			inset 0 1px 1px 0 rgba(255, 255, 255, 0.05);
	}

	/* Enhanced hover lift with smooth shadows */
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

	@keyframes rotateBorder {
		0% { background-position: 0% 50%; }
		100% { background-position: 200% 50%; }
	}

	/* Pulse animation with ring */
	@keyframes pulse-ring {
		0% { transform: scale(1); opacity: 1; }
		100% { transform: scale(1.5); opacity: 0; }
	}

	/* Floating animation for decorative elements */
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

	/* Enhanced grid pattern with depth */
	.depth-grid {
		background-image: 
			linear-gradient(rgba(239, 68, 68, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(239, 68, 68, 0.03) 1px, transparent 1px);
		background-size: 50px 50px;
		mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
	}

	/* Particle background effect */
	.particle-bg {
		position: fixed;
		width: 100%;
		height: 100%;
		overflow: hidden;
		pointer-events: none;
	}
</style>

<FeatureNav currentFeature="notetaker" />

<div class="min-h-screen bg-black text-white overflow-hidden">
	<!-- Animated Background Layer -->
	<div class="particle-bg fixed inset-0">
		<!-- Dynamic gradient orbs -->
		<div 
			class="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl float"
			style="transform: translate({mouseX * 20}px, {mouseY * 20}px)"
		></div>
		<div 
			class="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl float-slow"
			style="transform: translate({mouseX * -15}px, {mouseY * -15}px)"
		></div>
		<div 
			class="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl"
			style="transform: translate({mouseX * 25}px, {mouseY * 25}px)"
		></div>
		
		<!-- Grid overlay with parallax -->
		<div 
			class="depth-grid absolute inset-0"
			style="transform: translateY({scrollY * 0.1}px)"
		></div>
	</div>
	
	<!-- Hero Section - Writer.com Style Split Layout -->
	<section class="relative min-h-screen pt-10 pb-24">
		<!-- Background gradient -->
		<div class="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-black"></div>
		
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
						<MessageSquare class="w-4 h-4 text-red-500 animate-pulse" />
						<span class="text-xs font-semibold text-zinc-400 uppercase tracking-wider">AI-Powered Notetaker</span>
					</div>

					<!-- Main Headline with shimmer effect -->
					<h1 
						class="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
						in:fly={{ y: 20, duration: 700, delay: 200 }}
					>
						<span class="text-white block mb-2">Your Meetings,</span>
						<span class="gradient-text block">Supercharged by AI</span>
					</h1>

					<!-- Three Feature Cards -->
					<div class="space-y-4 mb-10">
						<!-- Auto-generate reports -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden"
							in:fly={{ y: 20, duration: 600, delay: 300 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/50 transition-colors">
									<FileText class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Auto-generate executive summaries</h3>
									<p class="text-sm text-zinc-400">Transform transcripts into actionable insights instantly</p>
								</div>
							</div>
						</div>

						<!-- AI-powered analysis (highlighted) -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden border-l-2 border-red-500"
							in:fly={{ y: 20, duration: 600, delay: 400 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-red-500/5 via-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
									<Brain class="w-5 h-5 text-red-500" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Run custom AI analysis</h3>
									<p class="text-sm text-zinc-400">Build frameworks tailored to your specific needs</p>
								</div>
							</div>
						</div>

						<!-- Automated actions -->
						<div 
							class="glass rounded-xl p-4 hover-lift group cursor-pointer relative overflow-hidden"
							in:fly={{ y: 20, duration: 600, delay: 500 }}
						>
							<div class="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							<div class="flex items-start gap-4 relative z-10">
								<div class="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center flex-shrink-0 group-hover:bg-zinc-700/50 transition-colors">
									<Zap class="w-5 h-5 text-zinc-400" />
								</div>
								<div>
									<h3 class="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">Take automatic actions</h3>
									<p class="text-sm text-zinc-400">Send follow-ups, sync to CRM, track stakeholders</p>
								</div>
							</div>
						</div>
					</div>

					<!-- CTA Link with hover effect -->
					<a 
						href="/" 
						class="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium group"
						in:fly={{ y: 20, duration: 600, delay: 700 }}
					>
						<span>Get started with AI Notetaker</span>
						<ArrowRight class="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
					</a>
				</div>

				<!-- Right Column - Product Showcase -->
				<NotetakerShowcase
					bind:activeTab
					bind:selectedTemplate
					bind:isAutoPlaying
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
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Beyond Basic Transcription</h2>
				<p class="text-lg text-zinc-400 max-w-2xl mx-auto">While others just record, SpikedAI transforms your meetings into actionable intelligence</p>
			</div>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-red-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<FileText class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">9+ Prebuilt AI Templates</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						One-click generation of executive summaries, stakeholder maps, battle cards, deal health reports, MEDDIC playbooks, and more. No manual work required.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-blue-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Target class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Custom Analysis Goals</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Create your own AI analysis templates. Track specific questions, detect evidence, monitor project status, or extract any custom insight from transcripts.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-purple-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Mail class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Agentic Email Composer</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						AI automatically drafts personalized follow-up emails with action items, key decisions, and next steps. Review and send in seconds.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-green-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Activity class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Auto-Sync to CRM</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Meeting insights automatically populate your CRM. Salesforce, HubSpot, monday.com, or custom systems—no manual data entry ever again.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-orange-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-600 to-orange-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<BarChart3 class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Export Professional PDFs</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Generate beautifully formatted PDF reports with your selected templates. Perfect for sharing with executives and stakeholders.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-cyan-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Brain class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Conversational AI Assistant</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Ask questions about your meeting in natural language. "What did Sarah say about pricing?" AI finds and explains instantly.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-pink-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-600 to-pink-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Users class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Speaker Intelligence</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Automatic speaker identification, talk-time analytics, sentiment analysis per person, and participant-specific insights.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-indigo-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<TrendingUp class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Deal Health Monitoring</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						Track deal progression automatically. AI detects buying signals, risks, champion engagement, and next-step commitments.
					</p>
				</div>

				<div class="p-6 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-teal-900/50 transition-all group">
					<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
						<Clock class="w-6 h-6 text-white" />
					</div>
					<h3 class="text-lg font-bold text-white mb-2">Real-Time Processing</h3>
					<p class="text-zinc-400 text-sm leading-relaxed">
						All analysis happens during the call. The moment your meeting ends, insights, emails, and reports are ready to use.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Comparison Section -->
	<section class="py-20">
		<div class="max-w-6xl mx-auto px-6">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold text-white mb-4">SpikedAI vs. Other Notetakers</h2>
				<p class="text-lg text-zinc-400">See why teams are switching from Otter, Fireflies, and others</p>
			</div>

			<div class="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
				<table class="w-full">
					<thead class="bg-zinc-950 border-b border-zinc-800">
						<tr>
							<th class="px-6 py-4 text-left text-sm font-bold text-white">Feature</th>
							<th class="px-6 py-4 text-center text-sm font-bold text-white">
								<div class="flex items-center justify-center gap-2">
									<span class="w-6 h-6 rounded bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center">
										<Sparkles class="w-3.5 h-3.5 text-white" />
									</span>
									SpikedAI
								</div>
							</th>
							<th class="px-6 py-4 text-center text-sm font-semibold text-zinc-400">Otter</th>
							<th class="px-6 py-4 text-center text-sm font-semibold text-zinc-400">Fireflies</th>
							<th class="px-6 py-4 text-center text-sm font-semibold text-zinc-400">Others</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-zinc-800">
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">Real-time Transcription</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">9+ Prebuilt AI Templates</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">Custom Analysis Goals</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">AI Follow-Up Email Generation</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">Auto-Sync to CRM</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Limited</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Limited</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">Professional PDF Export</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors">
							<td class="px-6 py-4 text-sm text-zinc-300">Conversational AI Assistant</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-green-500 mx-auto" /></td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
							<td class="px-6 py-4 text-center text-zinc-500 text-xs">Basic</td>
						</tr>
						<tr class="hover:bg-zinc-950/50 transition-colors bg-red-950/20">
							<td class="px-6 py-4 text-sm font-bold text-white">Agentic Actions (Take Action, Not Just Notes)</td>
							<td class="px-6 py-4 text-center"><CheckCircle class="w-5 h-5 text-red-500 mx-auto animate-pulse" /></td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
							<td class="px-6 py-4 text-center text-zinc-600">—</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="py-20 bg-gradient-to-br from-red-950/20 to-zinc-950">
		<div class="max-w-4xl mx-auto px-6 text-center">
			<div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-red-500/30">
				<Zap class="w-8 h-8 text-white" />
			</div>
			<h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Stop Taking Notes.<br/>Start Taking Action.</h2>
			<p class="text-xl text-zinc-400 mb-8 leading-relaxed">
				While your competitors are still copying & pasting from Otter, you'll be auto-sending follow-ups, syncing CRM data, and generating executive reports—all powered by AI.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105">
					<Sparkles class="w-5 h-5" />
					Start Free Trial
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
					</svg>
				</a>
				<a href="/" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-all border border-zinc-700 hover:border-zinc-600">
					<Calendar class="w-5 h-5" />
					Book a Demo
				</a>
			</div>
			<p class="text-sm text-zinc-500 mt-6">No credit card required • Set up in 5 minutes • Cancel anytime</p>
		</div>
	</section>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="notetaker" />
</div>
