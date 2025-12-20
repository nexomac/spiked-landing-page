<script>
    import { fade, fly } from 'svelte/transition';
    import { Check, X, Zap, Shield, Rocket, Globe, Cpu } from 'lucide-svelte';

    let billingCycle = $state('monthly'); // 'monthly' or 'annual'

    const plans = [
        {
            name: 'Starter',
            desc: 'Perfect for individuals and experimenters building their first AI agents.',
            price: { monthly: 0, annual: 0 },
            features: [
                '1 Autonomous Agent',
                'Standard Processing Speed',
                '500 Monthly Actions',
                'Community Support',
                'Basic Analytics',
                'Spiked Cloud Hosting'
            ],
            cta: 'Get Started for Free',
            highlight: false,
            icon: Cpu
        },
        {
            name: 'Pro',
            desc: 'For teams ready to scale their revenue operations with advanced AI.',
            price: { monthly: 199, annual: 159 },
            features: [
                'Unlimited Agents',
                'Ultra-fast Response Times',
                'Unlimited Monthly Actions',
                'Priority 24/7 Support',
                'Advanced Revenue Analytics',
                'Custom CRM Integrations',
                'Early Access to Features',
                'Dedicated Account Manager'
            ],
            cta: 'Upgrade to Pro',
            highlight: true,
            icon: Zap
        }
    ];

    const comparisonFeatures = [
        { category: 'Intelligence', features: [
            { name: 'Core Agent Engines', free: 'Basic', paid: 'Unlimited + Premium' },
            { name: 'Data Ingestion', free: '1GB/mo', paid: 'Unlimited' },
            { name: 'Multimodal Support', free: false, paid: true }
        ]},
        { category: 'Operations', features: [
            { name: 'Concurrent Tasks', free: '2', paid: 'Unlimited' },
            { name: 'Webhooks & APIs', free: 'Basic', paid: 'Advanced' },
            { name: 'Security & Compliance', free: 'Standard', paid: 'Enterprise-grade' }
        ]}
    ];
</script>

<div class="min-h-screen bg-black text-white pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
    <!-- Decorative Gradients -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-red-900/10 blur-[120px] pointer-events-none rounded-full"></div>
    
    <div class="max-w-7xl mx-auto relative z-10">
        <!-- Header -->
        <div class="text-center mb-16" in:fade={{ duration: 1000 }}>
            <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
                Fuel Your <span class="text-red-600">Growth</span>
            </h1>
            <p class="text-xl text-zinc-400 max-w-2xl mx-auto font-medium font-sans">
                Simple, transparent pricing for teams of all sizes. From solo builders to global enterprises.
            </p>

            <!-- Billing Toggle -->
            <div class="mt-10 inline-flex items-center p-1 bg-zinc-900 border border-zinc-800 rounded-full">
                <button 
                    onclick={() => billingCycle = 'monthly'}
                    class={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                >
                    Monthly
                </button>
                <button 
                    onclick={() => billingCycle = 'annual'}
                    class={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'annual' ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
                >
                    Annual (Save 20%)
                </button>
            </div>
        </div>

        <!-- Pricing Cards -->
        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-32">
            {#each plans as plan, i}
                <div 
                    in:fly={{ y: 50, delay: 200 * i, duration: 800 }}
                    class={`relative flex flex-col p-8 sm:p-12 rounded-3xl border transition-all duration-500 group ${plan.highlight ? 'bg-zinc-950 border-red-600 shadow-[0_0_50px_rgba(220,38,38,0.15)] scale-105 z-10' : 'bg-zinc-950/50 border-zinc-800 border-dashed hover:border-zinc-700'}`}
                >
                    {#if plan.highlight}
                        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">
                            Most Popular
                        </div>
                    {/if}

                    <div class="flex items-center gap-4 mb-6">
                        <div class={`w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110 ${plan.highlight ? 'bg-red-600 border-red-500 shadow-lg shadow-red-600/30' : 'bg-zinc-900 border-zinc-800 text-zinc-400'}`}>
                            <plan.icon class="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 class="text-3xl font-black tracking-tight uppercase">{plan.name}</h2>
                        </div>
                    </div>

                    <p class="text-zinc-500 text-sm mb-8 leading-relaxed font-medium">{plan.desc}</p>

                    <div class="mb-8">
                        <div class="flex items-baseline gap-1">
                            <span class="text-5xl font-black tracking-tighter">${billingCycle === 'monthly' ? plan.price.monthly : plan.price.annual}</span>
                            <span class="text-zinc-500 font-bold uppercase text-xs tracking-widest">/ month</span>
                        </div>
                        {#if billingCycle === 'annual' && plan.price.annual > 0}
                            <p class="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-widest">Billed annually</p>
                        {/if}
                    </div>

                    <div class="space-y-4 mb-10 flex-1">
                        {#each plan.features as feature}
                            <div class="flex items-center gap-3">
                                <Check class="w-4 h-4 text-red-600" />
                                <span class="text-sm font-medium text-zinc-300">{feature}</span>
                            </div>
                        {/each}
                    </div>

                    <button class={`w-full py-4 rounded-xl font-black uppercase tracking-widest transition-all duration-300 transform active:scale-95 ${plan.highlight ? 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/40' : 'bg-white text-black hover:bg-zinc-200'}`}>
                        {plan.cta}
                    </button>
                </div>
            {/each}
        </div>

        <!-- Comparison Table -->
        <div class="max-w-4xl mx-auto" in:fade={{ delay: 1000 }}>
            <h3 class="text-2xl font-black uppercase tracking-tighter mb-10 text-center">Detailed Comparison</h3>
            
            <div class="border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-950/20 backdrop-blur-sm">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-zinc-900/50">
                            <th class="p-6 text-left text-xs font-black uppercase tracking-widest text-zinc-500">Capability</th>
                            <th class="p-6 text-center text-xs font-black uppercase tracking-widest text-zinc-500">Starter</th>
                            <th class="p-6 text-center text-xs font-black uppercase tracking-widest text-zinc-500">Pro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each comparisonFeatures as section}
                            <tr>
                                <td colspan="3" class="px-6 py-4 bg-zinc-900/20 text-[10px] font-black uppercase tracking-widest text-red-600 border-y border-zinc-900">
                                    {section.category}
                                </td>
                            </tr>
                            {#each section.features as feature}
                                <tr class="border-b border-zinc-900 last:border-0 hover:bg-white/5 transition-colors">
                                    <td class="p-6 text-sm font-bold text-zinc-400">{feature.name}</td>
                                    <td class="p-6 text-center text-sm font-medium">
                                        {#if typeof feature.free === 'boolean'}
                                            {#if feature.free} <Check class="w-4 h-4 text-zinc-400 mx-auto" /> {:else} <X class="w-4 h-4 text-zinc-800 mx-auto" /> {/if}
                                        {:else}
                                            <span class="text-zinc-500">{feature.free}</span>
                                        {/if}
                                    </td>
                                    <td class="p-6 text-center text-sm font-black text-red-500">
                                        {#if typeof feature.paid === 'boolean'}
                                            {#if feature.paid} <Check class="w-5 h-5 mx-auto" /> {:else} <X class="w-5 h-5 mx-auto" /> {/if}
                                        {:else}
                                            {feature.paid}
                                        {/if}
                                    </td>
                                </tr>
                            {/each}
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- FAQ CTA -->
        <div class="mt-32 text-center border-t border-zinc-900 pt-20">
            <h3 class="text-3xl font-black uppercase mb-4">Have Questions?</h3>
            <p class="text-zinc-500 mb-8 max-w-md mx-auto">Our revenue experts are standing by to help you find the right setup for your team.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact-sales" class="px-8 py-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg font-bold text-sm transition-colors">Talk to Sales</a>
                <a href="/#faq" class="px-8 py-3 border border-zinc-800 hover:border-zinc-700 rounded-lg font-bold text-sm transition-colors">Read Implementation FAQ</a>
            </div>
        </div>
    </div>
</div>

<style>
    /* Premium typeface fallbacks */
    :global(body) {
        font-family: 'Space Grotesk', sans-serif;
    }
</style>
