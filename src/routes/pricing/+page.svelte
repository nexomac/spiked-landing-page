<script>
    import { Check, X, Zap, Shield, Rocket, Globe, Cpu, AlertTriangle, AlertCircle } from 'lucide-svelte';
    import { themeStore } from '$lib/stores/theme.js';
    import { fade, fly } from "svelte/transition";
    import Footer from '$lib/components/Footer.svelte';

    let billingCycle = $state('monthly'); // 'monthly' or 'annual'

    const plans = [
        {
            name: 'Free',
            tagline: 'Always On',
            desc: 'Unlimited capture. Limited intelligence.',
            perfectFor: 'Solo users, students, early evaluation, internal meetings.',
            price: { monthly: 0, annual: 0 },
            highlight: false,
            icon: Cpu,
            sections: [
                {
                    title: "What's Unlimited",
                    icon: Zap,
                    items: [
                        { text: 'Unlimited meetings', type: 'check' },
                        { text: 'Unlimited transcription', type: 'check' },
                        { text: 'Unlimited meeting duration', type: 'check' },
                        { text: 'Meeting logs history', type: 'check' },
                        { text: 'Basic summaries', type: 'check' },
                        { text: 'Basic sentiment (neutral/positive/negative)', type: 'check' }
                    ]
                },
                {
                    title: "Capability Limits",
                    icon: AlertTriangle,
                    items: [
                        { text: 'Answer Assist (Up to 3 docs, No web crawl)', type: 'warning' },
                        { text: 'Insights (No buyer signals, MEDDPIC, deal health)', type: 'warning' },
                        { text: 'Strategic Keywords (View-only)', type: 'warning' },
                        { text: 'Playbooks (Read-only templates)', type: 'warning' },
                        { text: 'Coach-Assist (Limited simulations, e.g. 5/mo)', type: 'warning' },
                        { text: 'CRM sync', type: 'cross' },
                        { text: 'Exports', type: 'cross' },
                        { text: 'Historical trend analytics', type: 'cross' }
                    ]
                }
            ],
            cta: 'Get Started for Free'
        },
        {
            name: 'Pro',
            tagline: 'Revenue Intelligence',
            desc: 'Turn conversations into execution.',
            perfectFor: 'Team size: 1–3 users.',
            price: { monthly: 139, annual: 111 }, // $139/yr usually means /mo billed annual, or $139 total? Prompt says "$139 / year". That's very cheap for "Revenue Intelligence". Wait, usually these are ~$100/mo. maybe it means $139/mo billed annually? or $139/year total? 
            // "Pro — “Revenue Intelligence” — $139 / year" -> This explicitly says / year. 
            // However, usually SaaS pricing is displayed monthly. $139/12 = ~$11.58. 
            // OR maybe it means $139/month billed yearly? 
            // Given "Unlimited meetings" and "Revenue Intelligence", $11/mo is suspiciously cheap. 
            // But I will follow the prompt literally: "$139 / year". 
            // If the user meant $139/mo, they would usually write "$139/mo".
            // Let's stick to the prompt text literally or visually. 
            // Actually, let's assume it's $139/year for the displayed annual price. 
            // If I need a monthly price, I'll just put a placeholder or maybe slightly higher like $15/mo.
            // Let's assume $139 is the annual price.
            // visual: "$139 / year".
            customPriceDisplay: '$139 / year', 
            highlight: true,
            icon: Zap,
            sections: [
                {
                    title: "Everything in Free, plus:",
                    items: []
                },
                {
                    title: "Intelligence & Analysis",
                    items: [
                        { text: 'Advanced summaries', type: 'check' },
                        { text: 'Buyer signals detection', type: 'check' },
                        { text: 'Live sentiment tracking', type: 'check' },
                        { text: 'Deal health monitoring', type: 'check' },
                        { text: 'MEDDPIC framework', type: 'check' },
                        { text: 'Custom goals', type: 'check' }
                    ]
                },
                {
                    title: "Answer Assist & Knowledge",
                    items: [
                        { text: 'Unlimited documents', type: 'check' },
                        { text: 'Web crawls', type: 'check' },
                        { text: 'Source-backed answers', type: 'check' },
                        { text: 'KnowledgeHub tuning (Chunk control, Retrieval rules)', type: 'check' }
                    ]
                },
                {
                    title: "Strategic Control",
                    items: [
                        { text: 'Custom Strategic Keywords', type: 'check' },
                        { text: 'Live Playbooks', type: 'check' },
                        { text: 'Objection tracking', type: 'check' },
                        { text: 'Action item extraction', type: 'check' }
                    ]
                },
                {
                    title: "Coach & Training",
                    items: [
                        { text: 'Unlimited Coach-Assist simulations', type: 'check' },
                        { text: 'Pitch refinement', type: 'check' },
                        { text: 'Objection mastery', type: 'check' }
                    ]
                },
                {
                    title: "Integrations & Ops",
                    items: [
                        { text: 'CRM Sync Studio (HubSpot, Jira)', type: 'check' },
                        { text: 'Exports (Summaries, Action items, Logs)', type: 'check' }
                    ]
                },
                {
                    title: "Scale Limits",
                    icon: AlertCircle,
                    items: [
                        { text: 'Soft cap on automation-heavy features', type: 'info' },
                        { text: 'Team size: 1–3 users', type: 'info' }
                    ]
                }
            ],
            cta: 'Upgrade to Pro'
        }
    ];
</script>

<div class="min-h-screen transition-colors duration-500 pt-32 pb-20 px-4 sm:px-6 overflow-hidden
    {$themeStore === 'dark' ? 'bg-[#0f0f0f] text-white' : 'bg-[#f8f8f0] text-black'}">
    <!-- Decorative Gradients -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] {$themeStore === 'dark' ? 'bg-red-900/10' : 'bg-red-500/5'} blur-[120px] pointer-events-none rounded-full"></div>
    
    <div class="max-w-7xl mx-auto relative z-10">
        <!-- Header -->
        <div class="text-center mb-16" in:fade={{ duration: 1000 }}>
            <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                Fuel Your <span class="text-red-600">Growth</span>
            </h1>
            <p class="text-xl max-w-2xl mx-auto font-medium font-sans {$themeStore === 'dark' ? 'text-zinc-400' : 'text-zinc-600'}">
                Unlimited capture for everyone. Intelligence for those who close.
            </p>

            <!-- Billing Toggle -->
            <div class="mt-10 inline-flex items-center p-1 rounded-full border transition-colors
                {$themeStore === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}">
                <button 
                    onclick={() => billingCycle = 'monthly'}
                    class={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-red-600 text-white shadow-lg' : ($themeStore === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-black')}`}
                >
                    Monthly
                </button>
                <button 
                    onclick={() => billingCycle = 'annual'}
                    class={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'annual' ? 'bg-red-600 text-white shadow-lg' : ($themeStore === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-zinc-400 hover:text-black')}`}
                >
                    Annual (Best Value)
                </button>
            </div>
        </div>

        <!-- Pricing Cards -->
        <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-32 items-start">
            {#each plans as plan, i}
                <div 
                    in:fly={{ y: 50, delay: 200 * i, duration: 800 }}
                    class={`relative flex flex-col p-8 sm:p-10 rounded-3xl border transition-all duration-500 group ${plan.highlight 
                        ? ($themeStore === 'dark' ? 'bg-zinc-950 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.15)] col-span-1' : 'bg-white border-red-600 shadow-[0_20px_50px_rgba(220,38,38,0.1)]') 
                        : ($themeStore === 'dark' ? 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700' : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm')}`}
                >
                    {#if plan.highlight}
                        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                            Most Popular
                        </div>
                    {/if}

                    <!-- Top Section -->
                    <div class="mb-8">
                        <div class="flex items-center justify-between mb-4">
                            <h2 class="text-3xl font-black tracking-tight uppercase transition-colors">
                                {plan.name}
                            </h2>
                            {#if plan.highlight}
                                <Zap class="w-8 h-8 text-red-600" />
                            {:else}
                                <Cpu class="w-8 h-8 text-zinc-500" />
                            {/if}
                        </div>
                        <p class="text-sm font-bold uppercase tracking-wider text-red-500 mb-2">{plan.tagline}</p>
                        <p class="text-sm leading-relaxed font-medium transition-colors {$themeStore === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}">{plan.desc}</p>
                    </div>

                    <!-- Price -->
                    <div class="mb-8 p-4 rounded-xl {$themeStore === 'dark' ? 'bg-zinc-900/50' : 'bg-zinc-50'}">
                        {#if plan.customPriceDisplay}
                             <div class="flex items-baseline gap-1">
                                <span class="text-4xl font-black tracking-tighter">{plan.customPriceDisplay}</span>
                            </div>
                            <p class="text-xs mt-2 text-zinc-500">Billed annually</p>
                        {:else}
                             <div class="flex items-baseline gap-1">
                                <span class="text-4xl font-black tracking-tighter">$0</span>
                            </div>
                            <p class="text-xs mt-2 text-zinc-500">Free forever</p>
                        {/if}
                    </div>

                    <!-- CTA -->
                    <button class={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm mb-10 transition-all duration-300 transform active:scale-95 ${plan.highlight ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/40' : ($themeStore === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800')}`}>
                        {plan.cta}
                    </button>

                    <!-- Feature Sections -->
                    <div class="space-y-8 flex-1">
                        {#each plan.sections as section}
                            {#if section.items.length > 0}
                                <div>
                                    {#if section.title}
                                        <div class="flex items-center gap-2 mb-3">
                                            {#if section.icon}
                                                <section.icon class="w-4 h-4 text-zinc-500" />
                                            {/if}
                                            <h4 class="text-xs font-black uppercase tracking-widest text-zinc-500">{section.title}</h4>
                                        </div>
                                    {/if}
                                    <div class="space-y-3">
                                        {#each section.items as item}
                                            <div class="flex items-start gap-3">
                                                <div class="mt-0.5 shrink-0">
                                                    {#if item.type === 'check'}
                                                        <Check class="w-4 h-4 text-emerald-500" />
                                                    {:else if item.type === 'warning'}
                                                        <AlertTriangle class="w-4 h-4 text-amber-500" />
                                                    {:else if item.type === 'cross'}
                                                        <X class="w-4 h-4 text-red-500" />
                                                    {:else if item.type === 'info'}
                                                        <AlertCircle class="w-4 h-4 text-blue-500" />
                                                    {/if}
                                                </div>
                                                <span class="text-sm font-medium transition-colors {$themeStore === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}">
                                                    {item.text}
                                                </span>
                                            </div>
                                        {/each}
                                    </div>
                                </div>
                            {/if}
                        {/each}
                    </div>

                    <!-- Footer Info -->
                    {#if plan.perfectFor}
                        <div class="mt-8 pt-6 border-t {$themeStore === 'dark' ? 'border-zinc-800' : 'border-zinc-200'}">
                            <p class="text-xs font-medium text-zinc-500">
                                <span class="font-bold text-zinc-400">Perfect for:</span> {plan.perfectFor}
                            </p>
                        </div>
                    {/if}
                </div>
            {/each}
        </div>

        <!-- FAQ CTA -->
        <div class="mt-16 text-center border-t pt-20 transition-colors {$themeStore === 'dark' ? 'border-zinc-900' : 'border-zinc-200'}">
            <h3 class="text-3xl font-black uppercase mb-4">Have Questions?</h3>
            <p class="mb-8 max-w-md mx-auto {$themeStore === 'dark' ? 'text-zinc-500' : 'text-zinc-500'}">Our revenue experts are standing by to help you find the right setup for your team.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact-sales" class="px-8 py-3 rounded-lg font-bold text-sm transition-colors
                    {$themeStore === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800 text-white' : 'bg-black text-white hover:bg-zinc-900'}">Talk to Sales</a>
                <a href="/#faq" class="px-8 py-3 border rounded-lg font-bold text-sm transition-colors
                    {$themeStore === 'dark' ? 'border-zinc-800 hover:border-zinc-700 text-white' : 'border-zinc-200 hover:border-zinc-300 text-black'}">Read Implementation FAQ</a>
            </div>
        </div>
    </div>
</div>
<Footer />

<style>
    /* Premium typeface fallbacks */
    :global(body) {
        font-family: 'Space Grotesk', sans-serif;
    }
</style>
