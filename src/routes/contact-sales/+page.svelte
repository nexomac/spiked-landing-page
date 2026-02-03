<script>
	import { onboardingStore } from "$lib/stores/onboarding.js";
	import OnboardingFlow from "$lib/components/OnboardingFlow.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { themeStore } from "$lib/stores/theme.js";
	import { enhance } from "$app/forms";
	import { fade, fly } from "svelte/transition";
	import ThemeCard from "$lib/components/ui/ThemeCard.svelte";
	import ThemeSection from "$lib/components/ui/ThemeSection.svelte";
	import ThemeHeadline from "$lib/components/ui/ThemeHeadline.svelte";

	let { form } = $props();
	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>Contact Sales - SpikedAI</title>
</svelte:head>

<!-- Contact Sales Hero Section -->
<ThemeSection id="contact" background="default" class="pt-40 pb-20">
	<div class="grid lg:grid-cols-2 gap-16 items-start">
		<!-- Left Column - Information -->
		<div class="space-y-8">
			<div class="space-y-4">
				<div
					class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 backdrop-blur-xl rounded-full"
				>
					<div class="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
					<span class="text-xs font-bold text-primary tracking-wider uppercase"
						>Talk to Sales</span
					>
				</div>

				<ThemeHeadline variant="h1" class="leading-none">
					Let's Transform<br />
					<span
						class="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
					>
						Your Sales Growth
					</span>
				</ThemeHeadline>

				<ThemeHeadline variant="sub">
					Schedule a personalized demo with our team and discover how SpikedAI
					can revolutionize your sales conversations with real-time AI
					intelligence.
				</ThemeHeadline>
			</div>

			<!-- Benefits List -->
			<div class="space-y-4">
				{#each [{ title: "Personalized Demo", description: "See exactly how SpikedAI fits your workflow", icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" }, { title: "Custom Solutions", description: "Tailored pricing and features for your team", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" }, { title: "Expert Support", description: "Dedicated onboarding and training", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }] as benefit}
					<div
						class="group flex items-start gap-4 p-4 rounded-lg hover:bg-card transition-colors duration-300"
					>
						<div
							class="flex-shrink-0 p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors"
						>
							<svg
								class="w-6 h-6 text-primary"
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
								class="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300"
							>
								{benefit.title}
							</h3>
							<p class="text-sm text-muted-foreground">
								{benefit.description}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Right Column - Contact Form -->
		<div class="lg:sticky lg:top-32">
			<ThemeCard class="p-8 shadow-2xl">
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
							<ThemeHeadline variant="h2">Message Sent!</ThemeHeadline>
							<p class="text-muted-foreground text-lg">
								Thanks for reaching out. Our team will get back to you within 24
								hours.
							</p>
						</div>
						<button
							onclick={() => (window.location.href = "/")}
							class="px-8 py-3 bg-foreground text-background rounded-lg font-bold hover:bg-foreground/90 transition-colors"
						>
							Back to Home
						</button>
					</div>
				{:else}
					<div class="space-y-2 mb-6">
						<ThemeHeadline variant="h2">Get Started Today</ThemeHeadline>
						<p class="text-sm text-muted-foreground">
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
									class="block text-sm font-semibold text-foreground"
								>
									First Name <span class="text-primary">*</span>
								</label>
								<input
									type="text"
									id="Name_First"
									name="Name_First"
									maxlength="255"
									placeholder="John"
									required
									class="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
								/>
							</div>
							<div class="space-y-2">
								<label
									for="Name_Last"
									class="block text-sm font-semibold text-foreground"
								>
									Last Name <span class="text-primary">*</span>
								</label>
								<input
									type="text"
									id="Name_Last"
									name="Name_Last"
									maxlength="255"
									placeholder="Doe"
									required
									class="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
								/>
							</div>
						</div>

						<!-- Company -->
						<div class="space-y-2">
							<label
								for="SingleLine"
								class="block text-sm font-semibold text-foreground"
							>
								Company <span class="text-primary">*</span>
							</label>
							<input
								type="text"
								id="SingleLine"
								name="SingleLine"
								maxlength="255"
								placeholder="Your Company Name"
								required
								class="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
							/>
						</div>

						<!-- Company URL -->
						<div class="space-y-2">
							<label
								for="SingleLine2"
								class="block text-sm font-semibold text-foreground"
							>
								Company URL <span class="text-primary">*</span>
							</label>
							<input
								type="text"
								id="SingleLine2"
								name="SingleLine2"
								maxlength="255"
								placeholder="https://your-company.com"
								required
								class="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
							/>
						</div>

						<!-- Email -->
						<div class="space-y-2">
							<label
								for="Email"
								class="block text-sm font-semibold text-foreground"
							>
								Work Email <span class="text-primary">*</span>
							</label>
							<input
								type="email"
								id="Email"
								name="Email"
								maxlength="255"
								placeholder="john@company.com"
								required
								class="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
							/>
						</div>

						<!-- Phone -->
						<div class="space-y-2">
							<label
								for="international_PhoneNumber_countrycode"
								class="block text-sm font-semibold text-foreground"
							>
								Phone <span class="text-primary">*</span>
							</label>
							<div class="grid grid-cols-3 gap-4">
								<div>
									<input
										type="text"
										name="PhoneNumber_countrycodeval"
										maxlength="10"
										id="international_PhoneNumber_countrycodeval"
										placeholder="+1"
										class="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
									/>
									<label
										for="international_PhoneNumber_countrycodeval"
										class="block text-xs text-muted-foreground mt-1">Code</label
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
										class="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
									/>
									<label
										for="international_PhoneNumber_countrycode"
										class="block text-xs text-muted-foreground mt-1"
										>Number</label
									>
								</div>
							</div>
						</div>

						<!-- How did you hear about us -->
						<div class="space-y-2">
							<label
								for="SingleLine1"
								class="block text-sm font-semibold text-foreground"
							>
								How Did You Hear About Us?
							</label>
							<input
								type="text"
								id="SingleLine1"
								name="SingleLine1"
								maxlength="255"
								placeholder="e.g., Search Engine, Social Media, Referral"
								class="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
							/>
						</div>

						<!-- Business Details -->
						<div class="space-y-2">
							<label
								for="MultiLine"
								class="block text-sm font-semibold text-foreground"
							>
								Your Business Details <span class="text-primary">*</span>
							</label>
							<textarea
								id="MultiLine"
								name="MultiLine"
								maxlength="65535"
								rows="4"
								placeholder="Please describe your business needs or the challenges you are facing in your sales and revenue conversions."
								required
								class="w-full px-4 py-3 bg-background border border-border text-foreground rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-none"
							></textarea>
						</div>

						<!-- Submit Button -->
						<button
							type="submit"
							disabled={isSubmitting}
							class="group relative w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
						</button>

						<p class="text-xs text-muted-foreground text-center">
							By submitting this form, you agree to our
							<a href="/privacy" class="text-primary hover:underline"
								>Privacy Policy</a
							>
							and
							<a href="/terms" class="text-primary hover:underline"
								>Terms of Service</a
							>
						</p>
					</form>
				{/if}
			</ThemeCard>
		</div>
	</div>
</ThemeSection>

<Footer />
