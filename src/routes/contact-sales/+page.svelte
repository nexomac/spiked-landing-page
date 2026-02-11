<script>
	import { themeStore } from "$lib/stores/theme.js";
	import { enhance } from "$app/forms";
	import { fade, fly } from "svelte/transition";

	let { form } = $props();
	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>Contact Sales - SpikedAI</title>
</svelte:head>

<!-- Contact Sales Hero Section -->
<section
	class="min-h-screen {$themeStore === 'dark'
		? 'bg-black'
		: 'bg-[#f8f8f0]'} relative overflow-hidden pt-40 pb-20 transition-colors duration-500"
>
	<!-- Animated Grid Background -->
	<div class="absolute inset-0">
		<div
			class="absolute inset-0 {$themeStore === 'dark'
				? 'bg-gradient-to-b from-red-950/20 via-black to-black'
				: 'bg-gradient-to-b from-red-100/50 via-[#f8f8f0] to-[#f8f8f0]'}"
		></div>
		<div
			class="absolute inset-0"
			style="background-image: linear-gradient({$themeStore === 'dark'
				? 'rgba(220, 38, 38, 0.05)'
				: 'rgba(220, 38, 38, 0.03)'} 1px, transparent 1px), linear-gradient(90deg, {$themeStore ===
			'dark'
				? 'rgba(220, 38, 38, 0.05)'
				: 'rgba(220, 38, 38, 0.03)'} 1px, transparent 1px); background-size: 50px 50px;"
		></div>

		<!-- Animated Red Orbs -->
		<div
			class="absolute top-1/4 right-1/4 w-96 h-96 {$themeStore === 'dark'
				? 'bg-red-600/20'
				: 'bg-red-500/10'} rounded-full blur-3xl animate-float"
		></div>
		<div
			class="absolute bottom-1/4 left-1/4 w-96 h-96 {$themeStore === 'dark'
				? 'bg-red-800/10'
				: 'bg-red-400/5'} rounded-full blur-3xl animate-float-delayed"
		></div>
	</div>

	<div class="relative z-10 max-w-7xl mx-auto px-6">
		<div class="grid lg:grid-cols-2 gap-16 items-start">
			<!-- Left Column - Information -->
			<div class="space-y-8">
				<div class="space-y-4">
					<div
						class="inline-flex items-center gap-2 px-4 py-2 {$themeStore ===
						'dark'
							? 'bg-zinc-950/80'
							: 'bg-white/80'} backdrop-blur-xl rounded-full border {$themeStore ===
						'dark'
							? 'border-red-900/50'
							: 'border-red-200'}"
					>
						<div class="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
						<span
							class="text-xs font-bold text-red-500 tracking-wider uppercase"
							>Talk to Sales</span
						>
					</div>

					<h1
						class="text-5xl md:text-6xl lg:text-7xl font-black {$themeStore ===
						'dark'
							? 'text-white'
							: 'text-zinc-900'} leading-none tracking-tighter"
					>
						Let's Transform<br />
						<span
							class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent"
						>
							Your Sales Growth
						</span>
					</h1>

					<p
						class="text-xl {$themeStore === 'dark'
							? 'text-zinc-400'
							: 'text-zinc-600'} leading-relaxed"
					>
						Schedule a personalized demo with our team and discover how SpikedAI
						can revolutionize your sales conversations with real-time AI
						intelligence.
					</p>
				</div>

				<!-- Benefits List -->
				<div class="space-y-4">
					{#each [{ title: "Personalized Demo", description: "See exactly how SpikedAI fits your workflow", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }, { title: "Custom Solutions", description: "Tailored pricing and features for your team", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }, { title: "Expert Support", description: "Dedicated onboarding and training", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }] as benefit}
						<div
							class="group flex items-start gap-4 p-4 {$themeStore === 'dark'
								? 'bg-zinc-950/50 border-zinc-900'
								: 'bg-white/50 border-zinc-200'} rounded-lg border hover:border-red-900/50 transition-all duration-300"
						>
							<div
								class="flex-shrink-0 p-2 {$themeStore === 'dark'
									? 'bg-red-950/30 border-red-900/30'
									: 'bg-red-50 border-red-100'} rounded-lg border group-hover:border-red-600/50 transition-all duration-300"
							>
								<svg
									class="w-6 h-6 text-red-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d={benefit.icon}
									/>
								</svg>
							</div>
							<div>
								<h3
									class="text-lg font-bold {$themeStore === 'dark'
										? 'text-white'
										: 'text-zinc-900'} mb-1 group-hover:text-red-500 transition-colors duration-300"
								>
									{benefit.title}
								</h3>
								<p
									class="text-sm {$themeStore === 'dark'
										? 'text-zinc-500'
										: 'text-zinc-500'}"
								>
									{benefit.description}
								</p>
							</div>
						</div>
					{/each}
				</div>

				<!-- Trust Indicators -->
				<div
					class="grid grid-cols-3 gap-4 pt-8 border-t {$themeStore === 'dark'
						? 'border-zinc-900'
						: 'border-zinc-200'}"
				>
					{#each [] as indicator}
						<div class="text-center">
							<div
								class="text-3xl font-black {$themeStore === 'dark'
									? 'text-white'
									: 'text-zinc-900'} mb-1"
							>
								{indicator.stat}
							</div>
							<div class="text-xs text-zinc-500 uppercase tracking-wider">
								{indicator.label}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Right Column - Contact Form -->
			<div class="lg:sticky lg:top-32">
				<div
					class="{$themeStore === 'dark'
						? 'bg-zinc-950/80 border-zinc-900 shadow-2xl'
						: 'bg-white border-zinc-200 shadow-xl'} backdrop-blur-xl border rounded-2xl p-8"
				>
					<!-- Zoho Form Integration -->
					{#if form?.success}
						<div
							in:fly={{ y: 20, duration: 500 }}
							class="text-center py-12 space-y-6"
						>
							<div
								class="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto"
							>
								<svg
									class="w-10 h-10 text-green-500"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="3"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<div class="space-y-2">
								<h2
									class="text-3xl font-black {$themeStore === 'dark'
										? 'text-white'
										: 'text-zinc-900'}"
								>
									Message Sent!
								</h2>
								<p class="text-zinc-500 text-lg">
									Thanks for reaching out. Our team will get back to you within
									24 hours.
								</p>
							</div>
							<button
								onclick={() => (window.location.href = "/")}
								class="px-8 py-3 bg-zinc-900 text-white rounded-lg font-bold hover:bg-black transition-colors"
							>
								Back to Home
							</button>
						</div>
					{:else}
						<div class="space-y-2 mb-6">
							<h2
								class="text-2xl font-bold {$themeStore === 'dark'
									? 'text-white'
									: 'text-zinc-900'}"
							>
								Get Started Today
							</h2>
							<p class="text-sm text-zinc-500">
								Fill out the form and we'll be in touch shortly.
							</p>
						</div>

						<form
							method="POST"
							use:enhance={() => {
								isSubmitting = true;
								return async ({ update }) => {
									isSubmitting = false;
									await update();
								};
							}}
							id="form"
							class="space-y-6"
						>
							{#if form?.error}
								<div
									transition:fade
									class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm font-medium"
								>
									{form.error}
								</div>
							{/if}

							<!-- Name Fields -->
							<div class="grid grid-cols-2 gap-4">
								<div class="space-y-2">
									<label
										for="Name_First"
										class="block text-sm font-semibold {$themeStore === 'dark'
											? 'text-zinc-300'
											: 'text-zinc-700'}"
									>
										First Name <span class="text-red-500">*</span>
									</label>
									<input
										type="text"
										id="Name_First"
										name="Name_First"
										maxlength="255"
										placeholder="John"
										required
										class="w-full px-4 py-3 {$themeStore === 'dark'
											? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600'
											: 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'} border rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
									/>
								</div>
								<div class="space-y-2">
									<label
										for="Name_Last"
										class="block text-sm font-semibold {$themeStore === 'dark'
											? 'text-zinc-300'
											: 'text-zinc-700'}"
									>
										Last Name <span class="text-red-500">*</span>
									</label>
									<input
										type="text"
										id="Name_Last"
										name="Name_Last"
										maxlength="255"
										placeholder="Doe"
										required
										class="w-full px-4 py-3 {$themeStore === 'dark'
											? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600'
											: 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'} border rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
									/>
								</div>
							</div>

							<!-- Company -->
							<div class="space-y-2">
								<label
									for="SingleLine"
									class="block text-sm font-semibold {$themeStore === 'dark'
										? 'text-zinc-300'
										: 'text-zinc-700'}"
								>
									Company <span class="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="SingleLine"
									name="SingleLine"
									maxlength="255"
									placeholder="Your Company Name"
									required
									class="w-full px-4 py-3 {$themeStore === 'dark'
										? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600'
										: 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'} border rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
								/>
							</div>

							<!-- Company URL -->
							<div class="space-y-2">
								<label
									for="SingleLine2"
									class="block text-sm font-semibold {$themeStore === 'dark'
										? 'text-zinc-300'
										: 'text-zinc-700'}"
								>
									Company URL <span class="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="SingleLine2"
									name="SingleLine2"
									maxlength="255"
									placeholder="https://your-company.com"
									required
									class="w-full px-4 py-3 {$themeStore === 'dark'
										? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600'
										: 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'} border rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
								/>
							</div>

							<!-- Email -->
							<div class="space-y-2">
								<label
									for="Email"
									class="block text-sm font-semibold {$themeStore === 'dark'
										? 'text-zinc-300'
										: 'text-zinc-700'}"
								>
									Work Email <span class="text-red-500">*</span>
								</label>
								<input
									type="email"
									id="Email"
									name="Email"
									maxlength="255"
									placeholder="john@company.com"
									required
									class="w-full px-4 py-3 {$themeStore === 'dark'
										? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600'
										: 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'} border rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
								/>
							</div>

							<!-- Phone -->
							<div class="space-y-2">
								<label
									for="international_PhoneNumber_countrycode"
									class="block text-sm font-semibold {$themeStore === 'dark'
										? 'text-zinc-300'
										: 'text-zinc-700'}"
								>
									Phone <span class="text-red-500">*</span>
								</label>
								<div class="grid grid-cols-3 gap-4">
									<div>
										<input
											type="text"
											name="PhoneNumber_countrycodeval"
											maxlength="10"
											id="international_PhoneNumber_countrycodeval"
											placeholder="+1"
											class="w-full px-4 py-3 {$themeStore === 'dark'
												? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600'
												: 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'} border rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
										/>
										<label
											for="international_PhoneNumber_countrycodeval"
											class="block text-xs text-zinc-500 mt-1">Code</label
										>
									</div>
									<div class="col-span-2">
										<input
											type="text"
											name="PhoneNumber_countrycode"
											maxlength="20"
											id="international_PhoneNumber_countrycode"
											placeholder="555-123-4567"
											required
											class="w-full px-4 py-3 {$themeStore === 'dark'
												? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600'
												: 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'} border rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
										/>
										<label
											for="international_PhoneNumber_countrycode"
											class="block text-xs text-zinc-500 mt-1">Number</label
										>
									</div>
								</div>
							</div>

							<!-- How did you hear about us -->
							<div class="space-y-2">
								<label
									for="SingleLine1"
									class="block text-sm font-semibold {$themeStore === 'dark'
										? 'text-zinc-300'
										: 'text-zinc-700'}"
								>
									How Did You Hear About Us?
								</label>
								<input
									type="text"
									id="SingleLine1"
									name="SingleLine1"
									maxlength="255"
									placeholder="e.g., Search Engine, Social Media, Referral"
									class="w-full px-4 py-3 {$themeStore === 'dark'
										? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600'
										: 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'} border rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none"
								/>
							</div>

							<!-- Business Details -->
							<div class="space-y-2">
								<label
									for="MultiLine"
									class="block text-sm font-semibold {$themeStore === 'dark'
										? 'text-zinc-300'
										: 'text-zinc-700'}"
								>
									Your Business Details <span class="text-red-500">*</span>
								</label>
								<textarea
									id="MultiLine"
									name="MultiLine"
									maxlength="65535"
									rows="4"
									placeholder="Please describe your business needs or the challenges you are facing in your sales and revenue conversions."
									required
									class="w-full px-4 py-3 {$themeStore === 'dark'
										? 'bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600'
										: 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400'} border rounded-lg focus:border-red-600 focus:ring-2 focus:ring-red-600/20 transition-all duration-300 outline-none resize-none"
								></textarea>
							</div>

							<!-- Submit Button -->
							<button
								type="submit"
								disabled={isSubmitting}
								class="group relative w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								<span
									class="relative z-10 flex items-center justify-center gap-2"
								>
									{#if isSubmitting}
										<svg
											class="animate-spin h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												class="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												stroke-width="4"
											></circle>
											<path
												class="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Sending...
									{:else}
										Submit
										<svg
											class="w-5 h-5 group-hover:translate-x-1 transition-transform"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13 7l5 5m0 0l-5 5m5-5H6"
											/>
										</svg>
									{/if}
								</span>
								<div
									class="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
								></div>
							</button>

							<p class="text-xs text-zinc-600 text-center">
								By submitting this form, you agree to our
								<a
									href="/privacy"
									class="text-red-500 hover:text-red-400 underline"
									>Privacy Policy</a
								>
								and
								<a
									href="/terms"
									class="text-red-500 hover:text-red-400 underline"
									>Terms of Service</a
								>
							</p>
						</form>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes float {
		0%,
		100% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(30px, -30px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	@keyframes float-delayed {
		0%,
		100% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(-30px, 30px) scale(1.1);
		}
		66% {
			transform: translate(20px, -20px) scale(0.9);
		}
	}

	.animate-float {
		animation: float 20s infinite ease-in-out;
	}

	.animate-float-delayed {
		animation: float-delayed 25s infinite ease-in-out;
	}
</style>
