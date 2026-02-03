<script>
	import FeatureNav from "$lib/components/features/FeatureNav.svelte";
	import FeatureFooter from "$lib/components/features/FeatureFooter.svelte";
	import CRMShowcase from "$lib/components/features/CRMShowcase.svelte";
	import {
		BarChart3,
		Activity,
		Target,
		FileText,
		ArrowRight,
	} from "lucide-svelte";
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";

	let mouseX = $state(0);
	let mouseY = $state(0);

	onMount(() => {
		const handleMouseMove = (e) => {
			mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
			mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	});
</script>

<svelte:head>
	<title>CRM Integration | SpikedAI</title>
</svelte:head>

<div
	class="min-h-screen bg-background text-foreground transition-colors duration-300"
>
	<!-- Feature Navigation -->
	<FeatureNav currentFeature="crm" />

	<section class="relative min-h-screen pt-32 pb-24 overflow-hidden">
		<!-- Background -->
		<div
			class="absolute inset-0 bg-gradient-to-b from-background via-background to-background"
		></div>
		<div class="fixed inset-0 pointer-events-none">
			<div
				class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"
			></div>
			<div
				class="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
				style="animation-delay: 1s"
			></div>
		</div>

		<div class="max-w-7xl mx-auto px-6 relative">
			<div class="grid lg:grid-cols-2 gap-16 items-start">
				<!-- Left Column -->
				<div class="lg:sticky lg:top-32 z-10">
					<div
						class="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/50 border border-border rounded-full mb-8"
					>
						<BarChart3 class="w-4 h-4 text-red-500 animate-pulse" />
						<span
							class="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
							>CRM Integration</span
						>
					</div>

					<h1
						class="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
					>
						<span
							class="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent block mb-2"
							>Auto-sync your CRM</span
						>
						<span class="text-foreground block">in real-time</span>
					</h1>

					<div class="space-y-4 mb-10">
						<div
							class="bg-card/50 border border-border rounded-xl p-4 hover:border-primary/20 transition-all"
						>
							<div class="flex items-start gap-4">
								<div
									class="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0"
								>
									<Activity
										class="w-5 h-5 text-muted-foreground"
									/>
								</div>
								<div>
									<h3
										class="font-semibold text-foreground mb-1"
									>
										Automatic data sync
									</h3>
									<p class="text-sm text-muted-foreground">
										Every conversation and insight synced to
										your CRM instantly
									</p>
								</div>
							</div>
						</div>

						<div
							class="bg-card/50 border-l-2 border-red-500 rounded-xl p-4 hover:bg-red-500/5 transition-all"
						>
							<div class="flex items-start gap-4">
								<div
									class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0"
								>
									<Target class="w-5 h-5 text-red-500" />
								</div>
								<div>
									<h3
										class="font-semibold text-foreground mb-1"
									>
										Works with your tools
									</h3>
									<p class="text-sm text-muted-foreground">
										Salesforce, HubSpot, monday.com, Zoho,
										and all major CRM platforms
									</p>
								</div>
							</div>
						</div>

						<div
							class="bg-card/50 border border-border rounded-xl p-4 hover:border-primary/20 transition-all"
						>
							<div class="flex items-start gap-4">
								<div
									class="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0"
								>
									<FileText
										class="w-5 h-5 text-muted-foreground"
									/>
								</div>
								<div>
									<h3
										class="font-semibold text-foreground mb-1"
									>
										Always accurate data
									</h3>
									<p class="text-sm text-muted-foreground">
										No more manual data entry or outdated
										records
									</p>
								</div>
							</div>
						</div>
					</div>

					<a
						href="/"
						class="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-medium group"
					>
						<span>Connect your CRM</span>
						<svg
							class="w-4 h-4 group-hover:translate-x-2 transition-transform"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 8l4 4m0 0l-4 4m4-4H3"
							/>
						</svg>
					</a>
				</div>

				<!-- Right Column -->
				<CRMShowcase {mouseX} {mouseY} showAppChrome={true} />
			</div>
		</div>
	</section>

	<section class="py-20">
		<div class="max-w-4xl mx-auto px-6 text-center">
			<h2 class="text-4xl font-bold text-foreground mb-6">
				Keep Your CRM Perfect
			</h2>
			<a
				href="/"
				class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl"
			>
				Connect Your CRM →
			</a>
		</div>
	</section>

	<!-- Footer with navigation to other features -->
	<FeatureFooter currentFeature="crm" />
</div>
