<script>
    import { onMount } from 'svelte';
    import { fade, fly, slide } from 'svelte/transition';
    import { themeStore } from '$lib/stores/theme.js';
    import { 
        Search, 
        Users, 
        Building2, 
        Briefcase, 
        ArrowRight, 
        Sparkles,
        Command,
        LayoutGrid,
        FileUp,
        MessageSquare,
        Send,
        Play,
        CheckCircle2,
        Brain,
        Target,
        FileText,
        TrendingUp,
        Zap,
        Calendar,
        GitBranch,
        BarChart3,
        Heart,
        Settings,
        Activity,
        ChevronRight,
        ChevronLeft
    } from 'lucide-svelte';
    
    // Components
    import Navigation from "$lib/components/Navigation.svelte";
    import ProductsSection from "$lib/components/ProductsSection.svelte";
    import AIAssistanceShowcase from "$lib/components/AIAssistanceShowcase.svelte";
    import NotetakerShowcase from "$lib/components/NotetakerShowcase.svelte";
    import FollowupShowcase from "$lib/components/FollowupShowcase.svelte";
    import SimulatorShowcase from "$lib/components/SimulatorShowcase.svelte";
    import DevToolsShowcase from "$lib/components/DevToolsShowcase.svelte";
    import CRMShowcase from "$lib/components/CRMShowcase.svelte";
    import SentimentShowcase from "$lib/components/SentimentShowcase.svelte";
    import CustomGoalsShowcase from "$lib/components/CustomGoalsShowcase.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import OnboardingFlow from "$lib/components/OnboardingFlow.svelte";
    import { onboardingStore } from "$lib/stores/onboarding.js";
    import { innerWidth } from "svelte/reactivity/window";

    // State
    let scrollY = $state(0);
    let mouseX = $state(0);
    let mouseY = $state(0);
    let isPaused = $state(false);
    let isTransitioning = $state(false);
    let currentShowcaseIndex = $state(0);
    let activeTab = $state("simulator");
    let showcaseProgress = $state(0);
    const SHOWCASE_INTERVAL = 8000; // 8 seconds for slower, more obvious scroll

    let visibleSections = $state({
        hero: false,
        products: false,
        showcase: false,
        testimonials: false,
        cta: false,
        quote: true 
    });

    const showcases = [
        { 
            id: "ai-assistance", 
            name: "AI Assistance", 
            label: "Contextual Intelligence", 
            title: "Real-time AI answers", 
            subtitle: "from your knowledge base", 
            icon: Sparkles, 
            features: [
                { icon: Brain, title: "Instant answers during calls", description: "Get contextual responses from your sales docs in real-time" },
                { icon: MessageSquare, title: "Powered by your content", description: "AI trained on your specific solutions documentation", highlight: true },
                { icon: FileText, title: "Handle every objection", description: "Confident responses for technical questions on the fly" }
            ]
        },
        { 
            id: "notetaker", 
            name: "Smart Notetaker", 
            label: "Conversation Capture", 
            title: "Capture every detail", 
            subtitle: "transcribe and summarize", 
            icon: MessageSquare, 
            features: [
                { icon: FileText, title: "High-fidelity transcription", description: "AI-powered transcription with speaker identification" },
                { icon: Brain, title: "Executive summaries", description: "Auto-generate meeting highlights and action items", highlight: true },
                { icon: Zap, title: "Workflow automation", description: "Send follow-ups and sync to your CRM instantly" }
            ]
        },
        { 
            id: "followup", 
            name: "Follow-Up Planner", 
            label: "Strategic Preparation", 
            title: "Never walk in cold", 
            subtitle: "Auto-compile preparation docs", 
            icon: Calendar, 
            features: [
                { icon: FileText, title: "Meeting prep on auto-pilot", description: "Compile everything you need before every call" },
                { icon: Brain, title: "Past context recall", description: "Recall every past conversation and commitment instantly", highlight: true },
                { icon: CheckCircle2, title: "Action item tracking", description: "Never let a commitment slip through the cracks" }
            ]
        },
        { 
            id: "simulator", 
            name: "Call Simulator", 
            label: "Performance Coaching", 
            title: "Master the pitch", 
            subtitle: "Practice with AI prospects", 
            icon: Users, 
            features: [
                { icon: Users, title: "Hyper-realistic scenarios", description: "Practice discovery and closing with AI personas" },
                { icon: Target, title: "Master every objection", description: "Train against your toughest customer pushbacks", highlight: true },
                { icon: TrendingUp, title: "Real-time feedback", description: "Live coaching on your performance and tonality" }
            ]
        },
        { 
            id: "dev-tools", 
            name: "Dev Tools", 
            label: "Developer Tools", 
            title: "Seamlessly connect sales", 
            subtitle: "with development workflow", 
            icon: GitBranch, 
            features: [
                { icon: GitBranch, title: "Jira & Asana Integration", description: "Sync sales conversations with development tickets" },
                { icon: Activity, title: "Automated workflows", description: "Create tickets and track progress automatically", highlight: true },
                { icon: Settings, title: "Custom integrations", description: "Connect with your existing dev tools and workflows" }
            ]
        },
        { 
            id: "crm", 
            name: "CRM Integration", 
            label: "CRM Integration", 
            title: "Keep your CRM updated", 
            subtitle: "automatically in real-time", 
            icon: BarChart3, 
            features: [
                { icon: BarChart3, title: "Salesforce & HubSpot", description: "Seamless integration with major CRM platforms" },
                { icon: Zap, title: "Auto-sync everything", description: "Contacts, deals, and activities updated automatically", highlight: true },
                { icon: TrendingUp, title: "Real-time updates", description: "Never miss a beat with instant CRM synchronization" }
            ]
        },
        { 
            id: "sentiment", 
            name: "Sentiment Analysis", 
            label: "Sentiment Analysis", 
            title: "Understand customer emotions", 
            subtitle: "in real-time during calls", 
            icon: Heart, 
            features: [
                { icon: Heart, title: "Real-time sentiment", description: "Track emotional tone and engagement throughout calls" },
                { icon: TrendingUp, title: "Buying signals", description: "Identify positive signals and buying intent automatically", highlight: true },
                { icon: Activity, title: "Sentiment timeline", description: "Visualize sentiment changes over the conversation" }
            ]
        },
        { 
            id: "custom-goals", 
            name: "Custom Goals", 
            label: "Custom Goals", 
            title: "Track what matters", 
            subtitle: "to your business", 
            icon: Target, 
            features: [
                { icon: Target, title: "Custom metrics", description: "Define and track goals specific to your sales process" },
                { icon: Settings, title: "Flexible configuration", description: "Set up goals that align with your business objectives", highlight: true },
                { icon: TrendingUp, title: "Progress tracking", description: "Monitor progress toward your custom goals in real-time" }
            ]
        }
    ];

    const testimonials = [
        { quote: "The real-time knowledge agent gives me instant answers during calls. No more fumbling through docs mid-pitch.", author: "Alex Rivera", role: "Senior Sales Engineer", metric: "5x", metricLabel: "Faster Responses" },
        { quote: "Call simulator helped our team practice objection handling. We're closing 40% more deals since implementation.", author: "Sarah Thompson", role: "Sales Director", metric: "40%", metricLabel: "More Deals Closed" },
        { quote: "Automatic FOLLOW-UP & PLANNING saves hours every week. CRM integration means zero manual data entry.", author: "Michael Chen", role: "Account Executive", metric: "15hrs", metricLabel: "Saved Weekly" },
        { quote: "The insight engine identified budget issues early. We stopped wasting time on deals that wouldn't close.", author: "Jessica Lee", role: "VP of Sales", metric: "25%", metricLabel: "Efficiency Gain" }
    ];

    onMount(() => {
        themeStore.init();
        const handleScroll = () => scrollY = window.scrollY;
        const handleMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visibleSections[entry.target.dataset.section] = true;
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        
        visibleSections.hero = true;

        let lastTime = Date.now();
        let showcaseInterval = setInterval(() => {
            if (!isPaused && !isTransitioning) {
                const now = Date.now();
                const delta = now - lastTime;
                lastTime = now;
                
                showcaseProgress += (delta / SHOWCASE_INTERVAL) * 100;
                
                if (showcaseProgress >= 100) {
                    showcaseProgress = 0;
                    if (innerWidth.current >= 1024) {
                        goToNextShowcase();
                    }
                }
            } else {
                lastTime = Date.now();
            }
        }, 50);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
            observer.disconnect();
            clearInterval(showcaseInterval);
        };
    });

    function goToNextShowcase() {
        if (isTransitioning) return;
        isTransitioning = true;
        showcaseProgress = 0; // Reset progress on manual click
        // Reduced delay to feel snappier
        setTimeout(() => {
            currentShowcaseIndex = (currentShowcaseIndex + 1) % showcases.length;
            isTransitioning = false;
        }, 150); 
    }

    function goToPrevShowcase() {
        if (isTransitioning) return;
        isTransitioning = true;
        showcaseProgress = 0; // Reset progress on manual click
        // Reduced delay to feel snappier
        setTimeout(() => {
            currentShowcaseIndex = (currentShowcaseIndex - 1 + showcases.length) % showcases.length;
            isTransitioning = false;
        }, 150);
    }

    function selectShowcase(index) {
        if (currentShowcaseIndex === index || isTransitioning) return;
        isTransitioning = true;
        isPaused = true;
        showcaseProgress = 0;
        setTimeout(() => {
            currentShowcaseIndex = index;
            isTransitioning = false;
        }, 150);
    }

    function handleTilt(event, intensity = 8) {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * intensity;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * intensity;
        card.style.setProperty('--tilt-x', `${-y}deg`);
        card.style.setProperty('--tilt-y', `${x}deg`);
    }

    function resetTilt(event) {
        const card = event.currentTarget;
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
    }

    const abstractGraphic = "/abstract-loop.png";
</script>

<svelte:head>
    <title>SpikedAI | Next-Gen Revenue Intelligence</title>
</svelte:head>

<div class="page-shell min-h-screen transition-colors duration-500 font-sans selection:bg-red-500/30 overflow-x-hidden
    {$themeStore === 'dark' ? 'bg-[#0a0a0a] text-zinc-100' : 'bg-white text-zinc-900'}">
    
    <!-- Ambient Background Effects - Theme Aware -->
    <div class="fixed inset-0 pointer-events-none z-0">
        <div class="absolute top-0 left-[-10%] w-[40%] h-[40%] blur-[150px] opacity-30
            {$themeStore === 'dark' ? 'bg-red-900/10' : 'bg-red-500/10'}"></div>
        <div class="absolute bottom-0 right-[-10%] w-[40%] h-[40%] blur-[150px] opacity-20
            {$themeStore === 'dark' ? 'bg-blue-900/5' : 'bg-blue-500/10'}"></div>
    </div>

    <Navigation />

    <main class="relative z-10 w-full">
        <!-- Enterprise Hero Section - Full Width -->
        <section 
            data-section="hero"
            class="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-6 py-32 lg:py-48 transition-all duration-1000
            {$themeStore === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white'}"
            class:translate-y-0={visibleSections.hero}
            class:opacity-100={visibleSections.hero}
            class:translate-y-10={!visibleSections.hero}
            class:opacity-0={!visibleSections.hero}
        >
            <!-- Minimalist Grid Pattern -->
            <div class="absolute inset-0 z-0 pointer-events-none 
                {$themeStore === 'dark' ? 'opacity-[0.1]' : 'opacity-[0.05]'} 
                bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div class="relative z-20 flex flex-col items-center text-center max-w-6xl w-full">
                <!-- Headline - Clear and Expansive -->
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 mb-10">
                    <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-red-500">Revenue Intelligence Platform</span>
                    <div class="w-1 h-1 rounded-full bg-red-500"></div>
                    <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Enterprise v1.0</span>
                </div>

                <h1 
                    class="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight mb-10 px-2
                    {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}"
                >
                    Sell Like a CEO.
                </h1>

                <!-- Sub-headline - More Spacing -->
                <p class="text-lg sm:text-xl lg:text-2xl font-normal mb-16 max-w-3xl px-6 leading-relaxed
                    {$themeStore === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}">
                    Empower your revenue teams with the world's first AI copilot that lives inside customer moments. Turn every interaction into a strategic conversion.
                </p>

                <!-- Documents & Objections Workspace - Clean & Structured -->
                <div 
                    class="w-full max-w-4xl rounded-3xl border p-3 transition-all duration-300
                    {$themeStore === 'dark' ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'}"
                >
                    <div class="flex flex-col sm:flex-row items-center gap-4">
                        <button class="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-colors font-bold uppercase tracking-widest text-[11px]
                            {$themeStore === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'}">
                            <FileUp class="w-4 h-4" />
                            <span>Upload Docs</span>
                        </button>
                        
                        <div class="flex-1 flex items-center px-4 py-3 gap-3 w-full">
                            <Search class="w-5 h-5 shrink-0 {$themeStore === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}" />
                            <input 
                                type="text" 
                                placeholder="Paste client pushback or objection here..."
                                class="flex-1 bg-transparent border-none outline-none font-medium text-base sm:text-lg
                                {$themeStore === 'dark' ? 'text-white placeholder:text-zinc-600' : 'text-zinc-900 placeholder:text-zinc-400'}"
                            />
                        </div>

                        <button class="w-full sm:w-auto px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold uppercase tracking-widest text-[11px] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3">
                            <span>Get Intelligence</span>
                            <Send class="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <!-- Trusted Brands - Full Opacity / Clearer -->
                <div class="mt-24 pt-12 border-t border-zinc-800/30 w-full">
                    <p class="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-10">Trusted by Global Enterprise Teams</p>
                    <div class="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 grayscale opacity-60">
                        {#each ['Asana', 'Salesforce', 'HubSpot', 'Netflix', 'Monday.com'] as brand}
                            <span class="text-lg sm:text-xl font-bold tracking-tighter text-zinc-400">{brand}</span>
                        {/each}
                    </div>
                </div>
            </div>
        </section>

        <!-- Enterprise Quote Section - Full Width Background -->
        <section 
            data-section="quote"
            class="py-32 lg:py-48 w-full transition-all duration-1000
            {$themeStore === 'dark' ? 'bg-[#111111]' : 'bg-white border-y border-zinc-100'}"
        >
            <div class="max-w-7xl mx-auto px-6">
                <div class="flex flex-col lg:flex-row gap-16 items-center">
                    <div class="shrink-0 relative group">
                        <div class="absolute -inset-1 bg-red-600 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <img 
                            src="/Photos/Avi Sahi.jpeg" 
                            alt="Avi Sahi" 
                            class="relative w-48 h-48 lg:w-64 lg:h-64 rounded-2xl object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    <div class="flex-1 space-y-10">
                        <blockquote class="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight
                            {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">
                            "AI that respects judgment, because revenue decisions are <span class="text-red-500">human decisions</span>. We build for the moments that matter."
                        </blockquote>
                        <div class="flex items-center gap-6">
                            <div class="w-12 h-0.5 bg-red-600"></div>
                            <div>
                                <p class="text-xl font-bold {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">Avi Sahi</p>
                                <p class="text-sm font-bold text-zinc-500 uppercase tracking-widest">Co-Founder & CEO, SpikedAI</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Connector -->
        <div class="flex justify-center h-24 sm:h-32">
            <div class="w-[1px] h-full bg-gradient-to-b from-transparent via-zinc-800/20 to-red-600/50 relative">
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-600 blur-[2px]"></div>
            </div>
        </div>

        <!-- Enterprise Showcase Section - Full Width Background -->
        <section 
            data-section="showcase"
            class="py-32 lg:py-48 w-full transition-all duration-1000
            {$themeStore === 'dark' ? 'bg-[#0a0a0a]' : 'bg-[#f9fafb]'}"
        >
            <div class="max-w-7xl mx-auto px-6">
                <div class="text-center mb-24">
                    <span class="text-[11px] font-bold text-red-500 uppercase tracking-[0.4em] mb-6 block">Capabilities</span>
                    <h2 class="text-4xl sm:text-6xl font-black tracking-tight mb-8
                        {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">Built for Global Sales Ops</h2>
                    <p class="text-zinc-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                        A centralized intelligence engine that integrates with every facet of your revenue stack.
                    </p>
                </div>

                <!-- Navigation Tabs - Professional & Clean -->
                <div class="flex flex-wrap justify-center gap-1 mb-16 border-b border-zinc-800/20">
                    {#each showcases as showcase, i}
                        <button 
                            onclick={() => selectShowcase(i)}
                            class="flex items-center gap-3 px-8 py-5 transition-all duration-300 relative group
                            {currentShowcaseIndex === i 
                                ? 'text-red-500' 
                                : 'text-zinc-500 hover:text-zinc-300'}"
                        >
                            <showcase.icon class="w-4 h-4 shrink-0" />
                            <span class="text-[11px] font-bold uppercase tracking-[0.15em]">{showcase.name}</span>
                            
                            {#if currentShowcaseIndex === i}
                                <div class="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" in:fade></div>
                            {/if}
                        </button>
                    {/each}
                </div>

                <!-- Showcase Content - Cleaner Borders -->
                <div class="relative rounded-2xl border overflow-hidden min-h-[500px] lg:min-h-[700px]
                    {$themeStore === 'dark' ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-100 shadow-xl'}">
                {#each showcases as showcase, i}
                    {#if currentShowcaseIndex === i}
                        <div 
                            class="lg:grid lg:grid-cols-2 gap-12 p-8 sm:p-12 items-center h-full"
                            in:fade={{ duration: 300 }}
                        >
                            <!-- Info Side -->
                            <div class="mb-10 lg:mb-0 text-center lg:text-left">
                                <span class="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 mb-4 block" in:fly={{ y: 20, duration: 400 }}>{showcase.label}</span>
                                <h3 class="text-3xl sm:text-5xl font-black leading-tight mb-8
                                    {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}" in:fly={{ y: 20, duration: 500, delay: 100 }}>
                                    {showcase.title} <br/>
                                    <span class="{$themeStore === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}">{showcase.subtitle}</span>
                                </h3>

                                <div class="space-y-3 sm:space-y-4 max-w-lg mx-auto lg:mx-0">
                                    {#each showcase.features as f, fi}
                                        <div class="flex items-start gap-4 p-4 sm:p-5 rounded-2xl border text-left transition-all hover:scale-[1.02]
                                            {$themeStore === 'dark' ? 'bg-zinc-900/50 border-zinc-800/50' : 'bg-zinc-50 border-zinc-100'}"
                                            in:fly={{ x: -20, duration: 400, delay: 200 + (fi * 100) }}>
                                            <div class="p-2 sm:p-2.5 bg-zinc-800 rounded-xl shrink-0
                                                {$themeStore === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'}">
                                                <f.icon class="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                                            </div>
                                            <div>
                                                <h4 class="font-bold text-sm mb-1 {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">{f.title}</h4>
                                                <p class="text-[11px] sm:text-xs leading-relaxed font-medium {$themeStore === 'dark' ? 'text-zinc-500' : 'text-zinc-400'}">{f.description}</p>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>

                            <!-- Showcase View Side -->
                            <div class="relative overflow-hidden rounded-3xl border shadow-2xl aspect-square sm:aspect-video lg:aspect-auto lg:h-[550px]
                                {$themeStore === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-100'}"
                                in:fade={{ duration: 600, delay: 200 }}>
                                <div class="absolute inset-0 p-4 transform scale-95 sm:scale-100 origin-center transition-transform duration-500">
                                    {#if showcase.id === 'ai-assistance'}
                                        <AIAssistanceShowcase showAppChrome={true} height="100%" />
                                    {:else if showcase.id === 'notetaker'}
                                        <NotetakerShowcase showAppChrome={true} height="100%" />
                                    {:else if showcase.id === 'followup'}
                                        <FollowupShowcase showAppChrome={true} height="100%" />
                                    {:else if showcase.id === 'simulator'}
                                        <SimulatorShowcase showAppChrome={true} height="100%" />
                                    {:else if showcase.id === 'dev-tools'}
                                        <DevToolsShowcase showAppChrome={true} height="100%" />
                                    {:else if showcase.id === 'crm'}
                                        <CRMShowcase showAppChrome={true} height="100%" />
                                    {:else if showcase.id === 'sentiment'}
                                        <SentimentShowcase showAppChrome={true} height="100%" />
                                    {:else if showcase.id === 'custom-goals'}
                                        <CustomGoalsShowcase showAppChrome={true} height="100%" />
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/if}
                {/each}

                    <!-- Navigation Arrows -->
                    <button onclick={goToPrevShowcase} class="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full border text-white hover:bg-zinc-800 transition-colors hidden lg:flex
                        {$themeStore === 'dark' ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 text-zinc-900 shadow-lg'}">
                        <ChevronLeft class="w-5 h-5 sm:w-6 sm:h-6 {$themeStore === 'dark' ? '' : 'text-zinc-900'}" />
                    </button>
                    <button onclick={goToNextShowcase} class="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full border text-white hover:bg-zinc-800 transition-colors hidden lg:flex
                        {$themeStore === 'dark' ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 text-zinc-900 shadow-lg'}">
                        <ChevronRight class="w-5 h-5 sm:w-6 sm:h-6 {$themeStore === 'dark' ? '' : 'text-zinc-900'}" />
                    </button>
                </div>
            </div>
        </section>

        <!-- Section Connector -->
        <div class="flex justify-center h-32">
            <div class="w-[1px] h-full bg-gradient-to-b from-red-600/50 via-zinc-800/20 to-transparent relative">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-600 blur-[2px]"></div>
            </div>
        </div>

        <!-- Preserved Products Section -->
        <section class="mt-48 px-6">
            <ProductsSection
                activeTab={activeTab}
                setActiveTab={(id) => activeTab = id}
                visible={visibleSections.products}
                {handleTilt}
                {resetTilt}
            />
        </section>

        <!-- Section Connector -->
        <div class="flex justify-center h-32">
            <div class="w-[1px] h-full bg-gradient-to-b from-transparent via-zinc-800/20 to-red-600/50 relative">
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-600 blur-[2px]"></div>
            </div>
        </div>

        <!-- NEW: Testimonials Section - Expansive & Enterprise -->
        <section
            data-section="testimonials"
            class="py-32 lg:py-64 relative overflow-hidden flex flex-col items-center w-full
            {$themeStore === 'dark' ? 'bg-[#111111]' : 'bg-white border-y border-zinc-100'}"
        >
            <div class="text-center mb-24 px-4 relative z-20">
                <span class="text-[11px] font-bold text-red-500 tracking-[0.4em] uppercase mb-6 block">Customer Success</span>
                <h2 class="text-4xl sm:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight
                    {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">
                    Validated by Revenue Leaders.
                </h2>
                <p class="text-zinc-500 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                    Hear from the teams redefining their sales velocity with SpikedAI.
                </p>
            </div>

            <!-- Infinite Scroll Marquee - Cleaner Styling -->
            <div class="relative overflow-hidden group/marquee py-12 w-full">
                <div class="flex animate-marquee hover:pause whitespace-nowrap">
                    <!-- Set 1 -->
                    <div class="flex gap-8 pr-8">
                        {#each testimonials as testimonial}
                            <div class="flex-shrink-0 w-[400px] sm:w-[500px] p-10 rounded-2xl border transition-all duration-300 cursor-default
                                {$themeStore === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-[#f9fafb] border-zinc-200'}">
                                <div class="flex items-start gap-6 mb-8">
                                    <div class="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-xl">
                                        {testimonial.author[0]}
                                    </div>
                                    <div class="flex-1">
                                        <p class="font-bold text-lg {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">{testimonial.author}</p>
                                        <p class="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none mt-1">{testimonial.role}</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-3xl font-black text-red-600">{testimonial.metric}</div>
                                        <div class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{testimonial.metricLabel}</div>
                                    </div>
                                </div>
                                <p class="text-base sm:text-lg leading-relaxed font-normal text-wrap
                                    {$themeStore === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}">
                                    "{testimonial.quote}"
                                </p>
                            </div>
                        {/each}
                    </div>
                    <!-- Set 2 -->
                    <div class="flex gap-8 pr-8">
                        {#each testimonials as testimonial}
                            <div class="flex-shrink-0 w-[400px] sm:w-[500px] p-10 rounded-2xl border transition-all duration-300 cursor-default
                                {$themeStore === 'dark' ? 'bg-zinc-900/60 border-zinc-800' : 'bg-[#f9fafb] border-zinc-200'}">
                                <div class="flex items-start gap-6 mb-8">
                                    <div class="w-14 h-14 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-xl">
                                        {testimonial.author[0]}
                                    </div>
                                    <div class="flex-1">
                                        <p class="font-bold text-lg {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">{testimonial.author}</p>
                                        <p class="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none mt-1">{testimonial.role}</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-3xl font-black text-red-600">{testimonial.metric}</div>
                                        <div class="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{testimonial.metricLabel}</div>
                                    </div>
                                </div>
                                <p class="text-base sm:text-lg leading-relaxed font-normal
                                    {$themeStore === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}">
                                    "{testimonial.quote}"
                                </p>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Built for Revenue Teams - Professional Grid -->
            <div class="mt-48 max-w-7xl mx-auto px-6 relative z-20">
                <div class="rounded-3xl p-12 lg:p-20 border
                    {$themeStore === 'dark' ? 'bg-black/40 border-zinc-800' : 'bg-[#f4f4f5] border-zinc-200'}">
                    <div class="text-center mb-20">
                        <h3 class="text-3xl font-black mb-4 {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">Infrastructure for Revenue Excellence</h3>
                        <p class="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[11px]">Empowering every stage of the sales lifecycle</p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-16">
                        {#each [
                            { n: "01", t: "Deep Integrations", d: "Native bidirectional sync with Salesforce, HubSpot, and your entire dev stack including Jira & Asana." },
                            { n: "02", t: "Edge Intelligence", d: "Patented AI models delivering millisecond-latency insights directly during live client interactions." },
                            { n: "03", t: "Actionable Insights", d: "Automatic meeting forensics and CRM-ready follow-ups that eliminate 15+ hours of manual overhead weekly." }
                        ] as item}
                            <div class="relative pt-12">
                                <span class="absolute top-0 left-0 text-3xl font-black text-red-600/30">{item.n}</span>
                                <h4 class="text-xl font-bold mb-4 {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">{item.t}</h4>
                                <p class="text-base font-normal text-zinc-500 leading-relaxed">{item.d}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Connector -->
        <div class="flex justify-center h-32">
            <div class="w-[1px] h-full bg-gradient-to-b from-transparent via-zinc-800/20 to-red-600/50 relative">
                <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-600 blur-[2px]"></div>
            </div>
        </div>

        <!-- CTA Section - Toned Down Enterprise Version -->
        <section 
            data-section="cta"
            class="py-32 lg:py-64 transition-all duration-1000
            {$themeStore === 'dark' ? 'bg-[#0a0a0a]' : 'bg-white border-t border-zinc-100'}"
        >
            <div class="max-w-7xl mx-auto px-6 text-center">
                <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <h2 class="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-10 leading-tight
                        {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">
                        Empower Your Revenue Team
                    </h2>
                    <p class="text-xl sm:text-2xl font-normal mb-16 max-w-2xl leading-relaxed
                        {$themeStore === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}">
                        Join leading enterprise teams accelerating growth with conversational intelligence.
                    </p>
                    <div class="flex flex-col sm:flex-row justify-center gap-6">
                        <button 
                            onclick={onboardingStore.start}
                            class="px-12 py-5 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-red-700 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-4">
                            Start Free Trial
                            <ArrowRight class="w-4 h-4" />
                        </button>
                        <a 
                            href="/contact-sales"
                            class="px-12 py-5 bg-transparent border-2 rounded-xl font-bold uppercase tracking-widest text-xs transition-all text-center flex items-center justify-center
                            {$themeStore === 'dark' ? 'border-zinc-800 text-white hover:bg-white/5' : 'border-zinc-200 text-zinc-900 hover:bg-zinc-50'}">
                            Speak to Sales
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <Footer />
    <OnboardingFlow />
</div>

<style>
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(-1deg); }
        50% { transform: translateY(-30px) rotate(2deg); }
    }
    @keyframes float-delayed {
        0%, 100% { transform: translateY(0) rotate(12deg); }
        50% { transform: translateY(-30px) rotate(14deg); }
    }
    .animate-float {
        animation: float 8s ease-in-out infinite;
    }
    .animate-float-delayed {
        animation: float-delayed 10s ease-in-out infinite;
        animation-delay: 1s;
    }

    @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    .animate-marquee {
        animation: marquee 40s linear infinite;
        display: flex;
        width: max-content;
    }
    .animate-marquee:hover {
        animation-play-state: paused;
    }

    :global(body) {
        background-color: black;
        color: white;
    }

    /* Custom scrollbar */
    :global(::-webkit-scrollbar) {
        width: 10px;
    }
    :global(::-webkit-scrollbar-track) {
        background: #000;
    }
    :global(::-webkit-scrollbar-thumb) {
        background: #27272a;
        border-radius: 10px;
        border: 2px solid #000;
    }
    :global(::-webkit-scrollbar-thumb:hover) {
        background: #ef4444;
    }

    /* Prevent horizontal scroll on some mobile browsers */
    :global(html, body) {
        max-width: 100vw;
        overflow-x: hidden;
    }
</style>
