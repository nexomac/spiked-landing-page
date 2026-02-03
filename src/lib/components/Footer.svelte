<script>
	import {
		Sparkles,
		MessageSquare,
		Globe,
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
	} from "lucide-svelte";
	import { themeStore } from "$lib/stores/theme.js";

	const isLight = $derived($themeStore === "light");

	const featureLinks = [
		{
			hub: "Cognitive Hub",
			items: [
				{
					name: "Live Assist",
					href: "/features/ai-assistance",
					icon: Sparkles,
				},
				{
					name: "Answer Assist",
					href: "/features/ai-assistance",
					icon: MessageSquare,
				},
				{ name: "Intelli Assist", href: "/features/ai-assistance", icon: Info },
			],
		},
		{
			hub: "Knowledge Hub",
			items: [
				{
					name: "Personalized Content",
					href: "/features/custom-goals",
					icon: FileText,
				},
				{ name: "Web Agent", href: "/features/custom-goals", icon: Globe },
				{ name: "AI Tune-Up", href: "/features/custom-goals", icon: Settings },
				{
					name: "Personalization Hub",
					href: "/features/custom-goals",
					icon: Shield,
				},
			],
		},
		{
			hub: "Customer Hub",
			items: [
				{ name: "Know Your Customer", href: "/features/crm", icon: Users },
				{
					name: "Customer Intelligence",
					href: "/features/crm",
					icon: BarChart3,
				},
				{ name: "Dynamic Research", href: "/features/crm", icon: Briefcase },
				{ name: "Customer Signals", href: "/features/sentiment", icon: Heart },
			],
		},
		{
			hub: "Conversation Hub",
			items: [
				{
					name: "Real-time Analysis",
					href: "/features/notetaker",
					icon: Sparkles,
				},
				{
					name: "Built-in Templates",
					href: "/features/notetaker",
					icon: FileText,
				},
				{
					name: "Unlimited Customization",
					href: "/features/notetaker",
					icon: Settings,
				},
				{ name: "Email Features", href: "/features/followup", icon: Mail },
			],
		},
		{
			hub: "Enterprise Hub",
			items: [
				{
					name: "Bi-directional Sync",
					href: "/features/followup",
					icon: GitBranch,
				},
				{ name: "CRM Management", href: "/features/crm", icon: BarChart3 },
				{
					name: "Technical Management",
					href: "/features/dev-tools",
					icon: Settings,
				},
				{
					name: "Program Management",
					href: "/features/dev-tools",
					icon: Briefcase,
				},
			],
		},
		{
			hub: "Learning Hub",
			items: [
				{
					name: "Personalized Learning",
					href: "/features/simulator",
					icon: Users,
				},
				{
					name: "Document Management",
					href: "/features/notetaker",
					icon: FileText,
				},
				{
					name: "Conversational Intelligence",
					href: "/features/notetaker",
					icon: MessageSquare,
				},
				{
					name: "Cognitive AI Coaching",
					href: "/features/simulator",
					icon: Sparkles,
				},
			],
		},
	];

	const companyLinks = [
		{ name: "Pricing", href: "/pricing", icon: CreditCard },
		{ name: "Customers", href: "/customers", icon: Users },
		{ name: "Security", href: "/security", icon: Shield },
		{ name: "Docs", href: "/docs", icon: FileText },
		{ name: "Contact Us", href: "/contact-sales", icon: Mail },
	];

	const exploreLinks = [
		{ name: "About Us", href: "/about-us", icon: Info },
		{ name: "Careers", href: "/careers", icon: Briefcase },
	];
</script>

<footer
	class={`py-24 border-t relative overflow-hidden rounded-t-[4rem] sm:rounded-t-[6rem] transition-colors duration-500 ${isLight ? "bg-zinc-50 border-zinc-200 text-zinc-900" : "bg-[#030912] border-zinc-900 text-zinc-100"}`}
>
	<div class="max-w-[1900px] mx-auto px-6 sm:px-12 relative z-10">
		<div class="grid lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
			<!-- Logo & Social Section -->
			<div class="lg:col-span-3 flex flex-col items-start">
				<div class="flex items-center gap-4 mb-8 group cursor-pointer">
					<div class="relative">
						<div
							class="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500"
						></div>
						<div
							class={`relative p-3 rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-2xl ${isLight ? "bg-white border-zinc-200 group-hover:border-red-600" : "bg-zinc-900 border-zinc-800 group-hover:border-red-600"}`}
						>
							<img
								src="/Spiked.ai-white-logo-icon-only.png"
								alt="SpikedAI Logo"
								class="h-8 w-8 object-contain"
							/>
						</div>
					</div>
					<span
						class={`text-3xl font-black tracking-tighter group-hover:text-red-500 transition-colors duration-300 ${isLight ? "text-zinc-900" : "text-white"}`}
					>
						SPIKED<span
							class="text-red-600 group-hover:text-red-400 transition-colors"
							>AI</span
						>
					</span>
				</div>
				<p
					class={`text-lg mb-10 transition-colors leading-relaxed font-medium ${isLight ? "text-zinc-500 hover:text-zinc-700" : "text-zinc-500 hover:text-zinc-300"}`}
				>
					Conversational AI for Sales Teams. Empower your team with real-time
					intelligence and automated workflows.
				</p>
				<div class="flex gap-4">
					{#each [{ href: "https://www.linkedin.com/company/spiked-ai/?viewAsMember=true", label: "LinkedIn", path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }, { href: "https://x.com/aispiked", label: "X (Twitter)", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }, { href: "https://www.youtube.com/@spiked-ai", label: "YouTube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }, { href: "https://www.instagram.com/spiked.ai/?hl=en", label: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }] as social}
						<a
							href={social.href}
							target="_blank"
							rel="noopener noreferrer"
							class={`p-4 rounded-2xl border transition-all duration-300 group hover:scale-110 hover:-translate-y-1 ${isLight ? "bg-zinc-100 hover:bg-red-50 border-zinc-200 hover:border-red-200" : "bg-zinc-900/50 hover:bg-red-600/10 border-zinc-800 hover:border-red-600/50"}`}
							aria-label={social.label}
						>
							<svg
								class="w-5 h-5 fill-zinc-500 group-hover:fill-red-500 transition-colors"
								viewBox="0 0 24 24"
							>
								<path d={social.path} />
							</svg>
						</a>
					{/each}
				</div>
			</div>

			<!-- Links Section: 4 columns on desktop, 2 on tablet, 1 on mobile -->
			<div
				class="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
			>
				{#each featureLinks as feature}
					<div class="group">
						<h4
							class={`font-bold mb-8 text-sm tracking-[0.2em] uppercase group-hover:text-red-500 transition-colors ${isLight ? "text-zinc-900" : "text-white"}`}
						>
							{feature.hub}
						</h4>
						<ul class="space-y-6">
							{#each feature.items as link}
								<li>
									<a
										href={link.href}
										class={`flex items-center gap-3 transition-all duration-300 group/link text-lg ${isLight ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-400 hover:text-white"}`}
									>
										<link.icon
											size={20}
											class={`transition-colors ${isLight ? "text-zinc-400 group-hover/link:text-red-500" : "text-zinc-600 group-hover/link:text-red-500"}`}
										/>
										<span
											class="group-hover/link:translate-x-1 transition-transform"
											>{link.name}</span
										>
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}

				<div class="group">
					<h4
						class={`font-bold mb-8 text-sm tracking-[0.2em] uppercase group-hover:text-red-500 transition-colors ${isLight ? "text-zinc-900" : "text-white"}`}
					>
						Explore
					</h4>
					<ul class="space-y-6">
						{#each exploreLinks as link}
							<li>
								<a
									href={link.href}
									class={`flex items-center gap-3 transition-all duration-300 group/link text-lg ${isLight ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-400 hover:text-white"}`}
								>
									<link.icon
										size={20}
										class={`transition-colors ${isLight ? "text-zinc-400 group-hover/link:text-red-500" : "text-zinc-600 group-hover/link:text-red-500"}`}
									/>
									<span
										class="group-hover/link:translate-x-1 transition-transform"
										>{link.name}</span
									>
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<div class="group">
					<h4
						class={`font-bold mb-8 text-sm tracking-[0.2em] uppercase group-hover:text-red-500 transition-colors ${isLight ? "text-zinc-900" : "text-white"}`}
					>
						Company
					</h4>
					<ul class="space-y-6">
						{#each companyLinks as link}
							<li>
								<a
									href={link.href}
									class={`flex items-center gap-3 transition-all duration-300 group/link text-lg ${isLight ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-400 hover:text-white"}`}
								>
									<link.icon
										size={20}
										class={`transition-colors ${isLight ? "text-zinc-400 group-hover/link:text-red-500" : "text-zinc-600 group-hover/link:text-red-500"}`}
									/>
									<span
										class="group-hover/link:translate-x-1 transition-transform"
										>{link.name}</span
									>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>

		<div
			class={`border-t pt-12 mt-20 ${isLight ? "border-zinc-200" : "border-zinc-800/50"}`}
		>
			<div class="flex flex-col md:flex-row justify-between items-center gap-6">
				<div
					class={`text-center md:text-left text-sm transition-colors ${isLight ? "text-zinc-500 hover:text-zinc-900" : "text-zinc-500 hover:text-zinc-300"}`}
				>
					© 2025 SpikedAI. All rights reserved.
					<span class="hidden md:inline mx-2">•</span>
					<span class="hidden md:inline"
						>335 Bryant St, 2nd Floor, Palo Alto, CA 94301, USA</span
					>
				</div>
				<div class="flex gap-10 text-sm text-zinc-500 font-medium">
					<a
						href="/privacy"
						class={`transition-all duration-300 hover:underline ${isLight ? "hover:text-zinc-900" : "hover:text-white"}`}
						>Privacy Policy</a
					>
					<a
						href="/terms"
						class={`transition-all duration-300 hover:underline ${isLight ? "hover:text-zinc-900" : "hover:text-white"}`}
						>Terms of Service</a
					>
					<a
						href="/status"
						class={`transition-all duration-300 hover:underline ${isLight ? "hover:text-zinc-900" : "hover:text-white"}`}
						>Status</a
					>
				</div>
			</div>
		</div>
	</div>
</footer>
