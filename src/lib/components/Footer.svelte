<script>
	import {
		Sparkles,
		MessageSquare,
		Calendar,
		Users,
		GitBranch,
		BarChart3,
		Heart,
		Settings,
		Briefcase,
		Info,
		CreditCard,
		Shield,
		FileText,
		Mail,
		ChevronRight
	} from "lucide-svelte";

	const featureLinks = [
		{ name: "AI Assistance", href: "/features/ai-assistance", icon: Sparkles },
		{ name: "Notetaker", href: "/features/notetaker", icon: MessageSquare },
		{ name: "Follow-Up", href: "/features/followup", icon: Calendar },
		{ name: "Simulator", href: "/features/simulator", icon: Users },
		{ name: "Enterprise Ready", href: "/features/dev-tools", icon: GitBranch },
		{ name: "CRM Integration", href: "/features/crm", icon: BarChart3 },
		{ name: "Sentiment Analysis", href: "/features/sentiment", icon: Heart },
		{ name: "Custom Goals", href: "/features/custom-goals", icon: Settings }
	];

	const companyLinks = [
		{ name: "Pricing", href: "/pricing", icon: CreditCard },
		{ name: "Customers", href: "/#testimonials", icon: Users },
		{ name: "Security", href: "/#security", icon: Shield },
		{ name: "Docs", href: "/docs", icon: FileText },
		{ name: "Contact Us", href: "/contact-sales", icon: Mail }
	];

	const exploreLinks = [
		{ name: "About Us", href: "/about-us", icon: Info },
		{ name: "Careers", href: "/careers", icon: Briefcase }
	];
</script>

<footer
	class="bg-[#030912] text-foreground py-16 border-t border-border relative overflow-hidden rounded-t-[6rem]"
>
	<div class="max-w-7xl mx-auto px-6 relative z-10">
		<div class="grid md:grid-cols-6 gap-12 mb-12">
			<div class="md:col-span-2">
				<div class="flex items-center gap-3 mb-6 group cursor-pointer">
					<div class="relative">
						<div
							class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-lg blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"
						></div>
						<div
							class="relative bg-zinc-900 p-1.5 rounded-lg border border-zinc-800 group-hover:border-red-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
						>
							<img
								src="/Spiked.ai-white-logo-icon-only.png"
								alt="SpikedAI Logo"
								class="h-6 w-6 object-contain"
							/>
						</div>
					</div>
					<span
						class="text-xl font-black tracking-tight group-hover:text-red-500 transition-colors duration-300"
					>
						SPIKED<span
							class="text-red-600 group-hover:text-red-400 transition-colors"
							>AI</span
						>
					</span>
				</div>
				<p
					class="text-zinc-500 text-sm mb-8 max-w-xs hover:text-zinc-300 transition-colors leading-relaxed"
				>
					Conversational AI for Sales Teams. Empower your team with
					real-time intelligence and automated workflows.
				</p>
				<div class="flex gap-4">
					<a
						href="https://www.linkedin.com/company/spiked-ai"
						target="_blank"
						rel="noopener noreferrer"
						class="p-2.5 bg-zinc-900/50 hover:bg-red-600/10 border border-zinc-800 hover:border-red-600/50 rounded-xl transition-all duration-300 group hover:scale-110 hover:-translate-y-1"
						aria-label="Follow us on LinkedIn"
					>
						<svg
							class="w-4 h-4 fill-zinc-500 group-hover:fill-red-500 transition-colors"
							viewBox="0 0 24 24"
						>
							<path
								d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
							/>
						</svg>
					</a>
				</div>
			</div>

			<div class="group">
				<h4
					class="font-bold text-white mb-6 text-xs tracking-widest uppercase group-hover:text-red-500 transition-colors"
				>
					Features
				</h4>
				<ul class="space-y-4">
					{#each featureLinks as link}
						<li>
							<a
								href={link.href}
								class="flex items-center gap-2.5 text-zinc-500 hover:text-white transition-all duration-300 group/link text-sm"
							>
								<link.icon size={14} class="text-zinc-600 group-hover/link:text-red-500 transition-colors" />
								<span class="group-hover/link:translate-x-1 transition-transform">{link.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="group">
				<h4
					class="font-bold text-white mb-6 text-xs tracking-widest uppercase group-hover:text-red-500 transition-colors"
				>
					Explore
				</h4>
				<ul class="space-y-4">
					{#each exploreLinks as link}
						<li>
							<a
								href={link.href}
								class="flex items-center gap-2.5 text-zinc-500 hover:text-white transition-all duration-300 group/link text-sm"
							>
								<link.icon size={14} class="text-zinc-600 group-hover/link:text-red-500 transition-colors" />
								<span class="group-hover/link:translate-x-1 transition-transform">{link.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<div class="group">
				<h4
					class="font-bold text-white mb-6 text-xs tracking-widest uppercase group-hover:text-red-500 transition-colors"
				>
					Company
				</h4>
				<ul class="space-y-4">
					{#each companyLinks as link}
						<li>
							<a
								href={link.href}
								class="flex items-center gap-2.5 text-zinc-500 hover:text-white transition-all duration-300 group/link text-sm"
							>
								<link.icon size={14} class="text-zinc-600 group-hover/link:text-red-500 transition-colors" />
								<span class="group-hover/link:translate-x-1 transition-transform">{link.name}</span>
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<div class="border-t border-zinc-900 pt-8 mt-12">
			<div
				class="flex flex-col md:flex-row justify-between items-center gap-6"
			>
				<div
					class="text-center md:text-left text-zinc-600 text-xs hover:text-zinc-400 transition-colors"
				>
					© 2025 SpikedAI. All rights reserved. <span
						class="hidden md:inline"
						>• 251 Rhode Island St, Suite 205, San Francisco, CA
						94103</span
					>
				</div>
				<div class="flex gap-8 text-xs text-zinc-500">
					<a
						href="/privacy"
						class="hover:text-red-500 transition-all duration-300 hover:scale-105"
						>Privacy Policy</a
					>
					<a
						href="/terms"
						class="hover:text-red-500 transition-all duration-300 hover:scale-105"
						>Terms of Service</a
					>
					<a
						href="/status"
						class="hover:text-red-500 transition-all duration-300 hover:scale-105"
						>Status</a
					>
				</div>
			</div>
		</div>
	</div>
</footer>
