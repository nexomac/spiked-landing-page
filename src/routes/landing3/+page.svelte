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
    {$themeStore === 'dark' ? 'bg-black text-white' : 'bg-[#f9fafb] text-zinc-900'}">
    
    <!-- Ambient Background Effects - Theme Aware -->
    <div class="fixed inset-0 pointer-events-none z-0">
        <div class="absolute top-0 left-[-10%] w-[40%] h-[40%] blur-[150px] opacity-30
            {$themeStore === 'dark' ? 'bg-red-900/10' : 'bg-red-500/10'}"></div>
        <div class="absolute bottom-0 right-[-10%] w-[40%] h-[40%] blur-[150px] opacity-20
            {$themeStore === 'dark' ? 'bg-blue-900/5' : 'bg-blue-500/10'}"></div>
    </div>

    <Navigation />

    <main class="relative z-10 pt-20 pb-20 sm:pt-24 sm:pb-32">
        <!-- The "Island" Container -->
        <section 
            data-section="hero"
            class="relative max-w-[2050px] mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] rounded-[3rem] md:rounded-[5rem] overflow-hidden min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-12 transition-all duration-1000
            {$themeStore === 'dark' 
                ? 'bg-zinc-950 border-zinc-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border' 
                : 'bg-white border-zinc-100 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] border'}"
            class:translate-y-0={visibleSections.hero}
            class:opacity-100={visibleSections.hero}
            class:translate-y-10={!visibleSections.hero}
            class:opacity-0={!visibleSections.hero}
        >
            <!-- Pattern Overlay -->
            <div class="absolute inset-0 z-10 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:32px_32px]
                {$themeStore === 'dark' ? 'opacity-5' : 'opacity-[0.03]'}"></div>
            
            <div class="relative z-20 flex flex-col items-center text-center max-w-5xl w-full pt-8 pb-12">
                <!-- Decorative Side Graphics - Desktop Only -->
                <div class="hidden xl:block absolute left-[-20%] top-1/4 w-64 p-6 rounded-3xl border transform -rotate-12 animate-float opacity-50 hover:opacity-100 transition-opacity duration-500
                    {$themeStore === 'dark' ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white/40 border-zinc-200 shadow-xl'}">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-8 h-8 rounded-full bg-red-600/20 flex items-center justify-center">
                            <Sparkles class="w-4 h-4 text-red-500" />
                        </div>
                        <div class="h-2 w-24 bg-zinc-800 rounded-full"></div>
                    </div>
                    <div class="space-y-2">
                        <div class="h-2 w-full bg-zinc-800/50 rounded-full"></div>
                        <div class="h-2 w-3/4 bg-zinc-800/50 rounded-full"></div>
                    </div>
                    <div class="mt-6 pt-4 border-t border-zinc-800/30 flex justify-between items-center">
                        <span class="text-[9px] font-black uppercase tracking-widest text-red-500">Live Insight</span>
                        <div class="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/50 animate-pulse"></div>
                    </div>
                </div>

                <div class="hidden xl:block absolute right-[-20%] bottom-1/4 w-64 p-6 rounded-3xl border transform rotate-12 animate-float-delayed opacity-50 hover:opacity-100 transition-opacity duration-500
                    {$themeStore === 'dark' ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white/40 border-zinc-200 shadow-xl'}">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-[10px] font-black uppercase tracking-widest text-zinc-500">Revenue Impact</span>
                        <TrendingUp class="w-4 h-4 text-green-500" />
                    </div>
                    <div class="text-3xl font-black text-white mb-2">+42%</div>
                    <div class="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div class="h-full bg-red-600 w-3/4"></div>
                    </div>
                </div>

                <!-- Visual Anchor -->
                <div class="mb-4 w-full max-w-md aspect-[1.4/1] relative transform transition-transform duration-700">
                    <img 
                        src={abstractGraphic} 
                        alt="Abstract Intelligence Loop" 
                        class="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(220,38,38,0.25)] animate-float"
                    />
                    <div class="absolute bottom-[5%] right-[5%] px-4 py-1.5 bg-red-600/10 backdrop-blur-xl rounded-full border border-red-500/20">
                        <span class="text-[10px] sm:text-[11px] font-mono font-black text-red-500 tracking-[0.2em]">SPIKED v1.0</span>
                    </div>
                </div>

                <!-- Headline -->
                <h1 
                    class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[1] sm:leading-[0.95] tracking-tighter mb-8 px-2
                    {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}"
                >
                    Sell Like <br/><span class="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent italic">a CEO.</span>
                </h1>

                <!-- Sub-headline -->
                <p class="text-lg sm:text-xl md:text-2xl font-medium mb-12 max-w-2xl px-6 leading-relaxed
                    {$themeStore === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}">
                    The world's first AI copilot that lives inside your customer moments, not just your dashboards.
                </p>

                <!-- Documents & Objections Workspace -->
                <div 
                    class="w-full max-w-3xl backdrop-blur-3xl rounded-[2.5rem] sm:rounded-full border p-2 shadow-2xl transition-all duration-300
                    {$themeStore === 'dark' ? 'bg-zinc-900/40 border-zinc-800 hover:border-red-900/40' : 'bg-white border-zinc-200 hover:border-red-200'}"
                >
                    <div class="flex flex-col sm:flex-row items-center gap-2 p-1">
                        <button class="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-[1.8rem] sm:rounded-full transition-colors group
                            {$themeStore === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'}">
                            <FileUp class="w-5 h-5 group-hover:text-red-500 transition-colors" />
                            <span class="text-xs font-black uppercase tracking-widest leading-none mt-0.5">Docs</span>
                        </button>
                        
                        <div class="flex-1 flex items-center px-4 py-3 gap-3 min-w-0 w-full">
                            <MessageSquare class="w-5 h-5 shrink-0 {$themeStore === 'dark' ? 'text-zinc-600' : 'text-zinc-400'}" />
                            <input 
                                type="text" 
                                placeholder="Paste customer objections..."
                                class="flex-1 bg-transparent border-none outline-none font-medium text-base sm:text-lg w-full
                                {$themeStore === 'dark' ? 'text-white placeholder:text-zinc-600' : 'text-zinc-900 placeholder:text-zinc-400'}"
                            />
                        </div>

                        <button class="w-full sm:w-auto px-8 py-5 bg-red-600 hover:bg-red-500 text-white rounded-[1.8rem] sm:rounded-full font-black uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 text-xs leading-none group">
                            <span>Get Answer</span>
                            <Send class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>

                <!-- Trusted Brands -->
                <div class="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-30 grayscale px-6">
                    {#each ['Asana', 'Salesforce', 'HubSpot', 'Netflix', 'monday'] as brand}
                        <span class="text-sm sm:text-base font-black tracking-tighter text-zinc-500 uppercase">{brand}</span>
                    {/each}
                </div>
            </div>
        </section>

        <!-- Section Connector - Flow Line -->
        <div class="flex justify-center h-24 sm:h-32">
            <div class="w-[1px] h-full bg-gradient-to-b from-red-600/50 via-zinc-800/20 to-transparent relative">
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-600 blur-[2px]"></div>
            </div>
        </div>

        <!-- Quote Section -->
        <section 
            data-section="quote"
            class="mt-24 sm:mt-32 max-w-5xl mx-auto px-6"
        >
            <div class="relative p-0.5 bg-gradient-to-br rounded-[3rem] sm:rounded-[4rem]
                {$themeStore === 'dark' ? 'from-red-600/20 via-zinc-800 to-blue-600/5' : 'from-red-600/10 via-zinc-200 to-blue-200/10'}">
                <div class="rounded-[2.9rem] sm:rounded-[3.9rem] p-10 sm:p-16 flex flex-col md:flex-row gap-8 sm:gap-12 items-center
                    {$themeStore === 'dark' ? 'bg-zinc-950' : 'bg-white'}">
                    <div class="relative shrink-0">
                        <div class="absolute -inset-4 bg-red-600/10 blur-2xl rounded-full"></div>
                        <img 
                            src="/Photos/Avi Sahi.jpeg" 
                            alt="Avi Sahi" 
                            class="relative w-28 h-28 sm:w-48 sm:h-48 rounded-[2rem] sm:rounded-[3rem] object-cover border-4 shadow-2xl
                            {$themeStore === 'dark' ? 'border-zinc-900' : 'border-zinc-50'}"
                        />
                    </div>
                    <div class="text-center md:text-left">
                        <blockquote class="text-xl sm:text-3xl font-bold leading-tight mb-8
                            {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">
                            "AI that respects judgment, because revenue decisions are <span class="bg-red-600/20 text-red-500 italic px-2 rounded">human decisions</span>."
                        </blockquote>
                        <div class="space-y-1">
                            <p class="text-lg sm:text-xl font-black {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">Avi Sahi</p>
                            <p class="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-widest leading-none">Co-Founder & CEO, SpikedAI</p>
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

        <!-- Interactive Showcase -->
        <section 
            data-section="showcase"
            class="mt-40 px-6 max-w-7xl mx-auto"
        >
            <div class="text-center mb-16">
                <span class="text-xs font-black text-red-500 uppercase tracking-[0.3em] mb-4 block">Product Tour</span>
                <h2 class="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-6
                    {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">Experience the Edge</h2>
                <div class="flex items-center justify-center gap-4 mb-8">
                    <div class="h-1 w-24 bg-zinc-800 rounded-full overflow-hidden">
                        <div class="h-full bg-red-600 transition-all duration-300" style="width: {showcaseProgress}%"></div>
                    </div>
                </div>
            </div>

            <!-- Navigation Pills -->
            <div class="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
                {#each showcases as showcase, i}
                    <button 
                        onclick={() => selectShowcase(i)}
                        class="flex items-center gap-2 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl border transition-all duration-300 relative overflow-hidden group
                        {currentShowcaseIndex === i 
                            ? 'bg-red-600 border-red-500 text-white shadow-[0_10px_30px_rgba(220,38,38,0.3)] scale-105' 
                            : ($themeStore === 'dark' ? 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300' : 'bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300 hover:text-zinc-600')}"
                    >
                        {#if currentShowcaseIndex === i && !isPaused}
                            <div class="absolute bottom-0 left-0 h-0.5 bg-white/40 transition-all duration-300" style="width: {showcaseProgress}%"></div>
                        {/if}
                        <showcase.icon class="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                        <span class="text-[10px] sm:text-xs font-black uppercase tracking-widest hidden sm:inline">{showcase.name}</span>
                        <span class="text-[9px] font-black uppercase tracking-widest sm:hidden">{showcase.name.split(' ')[0]}</span>
                    </button>
                {/each}
            </div>

            <!-- Showcase Content -->
            <div class="relative rounded-[3rem] border overflow-hidden min-h-[500px] lg:min-h-[700px]
                {$themeStore === 'dark' ? 'bg-zinc-950 border-zinc-900' : 'bg-white border-zinc-100 shadow-xl'}">
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

        <!-- NEW: Testimonials Marquee Section -->
        <section
            data-section="testimonials"
            class="py-32 relative overflow-hidden flex flex-col items-center"
        >
            <div class="text-center mb-16 px-4 relative z-20">
                <span class="text-xs sm:text-sm font-black text-red-500 tracking-widest uppercase mb-4 block">Trusted by Sales Leaders</span>
                <h2 class="text-4xl sm:text-7xl lg:text-9xl font-black mt-4 mb-6 leading-[0.9] tracking-tighter
                    {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">
                    AI That Empowers<br />
                    <span class="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Revenue Teams.</span>
                </h2>
            </div>

            <!-- Infinite Scroll Marquee -->
            <div class="relative overflow-hidden group/marquee py-10">
                <div class="absolute left-0 top-0 bottom-0 w-32 sm:w-64 bg-gradient-to-r pointer-events-none z-10
                    {$themeStore === 'dark' ? 'from-black to-transparent' : 'from-[#f9fafb] to-transparent'}"></div>
                <div class="absolute right-0 top-0 bottom-0 w-32 sm:w-64 bg-gradient-to-l pointer-events-none z-10
                    {$themeStore === 'dark' ? 'from-black to-transparent' : 'from-[#f9fafb] to-transparent'}"></div>

                <div class="flex animate-marquee whitespace-nowrap">
                    <div class="flex gap-6 pr-6">
                        {#each testimonials as testimonial}
                            <div class="flex-shrink-0 w-[350px] sm:w-[450px] p-8 rounded-[2rem] border transition-all duration-300 hover:scale-[1.02] cursor-default
                                {$themeStore === 'dark' ? 'bg-zinc-900/40 border-zinc-800 hover:border-red-900/50' : 'bg-white border-zinc-200 hover:border-red-200 shadow-lg'}">
                                <div class="flex items-start gap-4 mb-6">
                                    <div class="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-lg">
                                        {testimonial.author[0]}
                                    </div>
                                    <div class="flex-1">
                                        <p class="font-black text-sm {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">{testimonial.author}</p>
                                        <p class="text-xs font-bold text-zinc-500 uppercase tracking-widest">{testimonial.role}</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-2xl font-black text-red-600">{testimonial.metric}</div>
                                        <div class="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">{testimonial.metricLabel}</div>
                                    </div>
                                </div>
                                <p class="text-sm sm:text-base leading-relaxed font-medium italic whitespace-normal
                                    {$themeStore === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}">
                                    "{testimonial.quote}"
                                </p>
                            </div>
                        {/each}
                    </div>
                    <div class="flex gap-6 pr-6">
                        {#each testimonials as testimonial}
                            <div class="flex-shrink-0 w-[350px] sm:w-[450px] p-8 rounded-[2rem] border transition-all duration-300 hover:scale-[1.02] cursor-default
                                {$themeStore === 'dark' ? 'bg-zinc-900/40 border-zinc-800 hover:border-red-900/50' : 'bg-white border-zinc-200 hover:border-red-200 shadow-lg'}">
                                <div class="flex items-start gap-4 mb-6">
                                    <div class="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-black text-lg">
                                        {testimonial.author[0]}
                                    </div>
                                    <div class="flex-1">
                                        <p class="font-black text-sm {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">{testimonial.author}</p>
                                        <p class="text-xs font-bold text-zinc-500 uppercase tracking-widest">{testimonial.role}</p>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-2xl font-black text-red-600">{testimonial.metric}</div>
                                        <div class="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">{testimonial.metricLabel}</div>
                                    </div>
                                </div>
                                <p class="text-sm sm:text-base leading-relaxed font-medium italic whitespace-normal
                                    {$themeStore === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}">
                                    "{testimonial.quote}"
                                </p>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>

            <!-- Built for Sales & Dev Teams Sub-section -->
            <div class="mt-24 max-w-7xl mx-auto px-6 relative z-20">
                <div class="rounded-[3rem] p-8 sm:p-12 border
                    {$themeStore === 'dark' ? 'bg-zinc-900/20 border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'}">
                    <div class="text-center mb-12">
                        <h3 class="text-2xl font-black mb-2 {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">Built for Revenue Teams</h3>
                        <p class="text-zinc-500 font-bold uppercase tracking-widest text-xs">Powerful conversational AI for your entire workflow</p>
                    </div>
                    <div class="grid md:grid-cols-3 gap-8">
                        {#each [
                            { n: "01", t: "Universal Integrations", d: "Connects with Salesforce, HubSpot, monday.com, Jira, Asana, Slack & more" },
                            { n: "02", t: "Real-Time Intelligence", d: "AI-powered insights served live during every sales conversation" },
                            { n: "03", t: "Auto Follow-Up", d: "Never miss a task with intelligent automation and CRM sync" }
                        ] as item}
                            <div class="relative pt-8 group">
                                <span class="absolute top-[-20px] left-0 text-6xl font-black opacity-20 transition-opacity group-hover:opacity-20 text-red-600">{item.n}</span>
                                <h4 class="text-lg font-black mb-2 {$themeStore === 'dark' ? 'text-white' : 'text-zinc-900'}">{item.t}</h4>
                                <p class="text-sm font-medium text-zinc-500 leading-relaxed">{item.d}</p>
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

        <!-- CTA Section -->
        <section 
            data-section="cta"
            class="px-6 text-center"
        >
            <div class="max-w-[1400px] mx-auto bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-[3rem] sm:rounded-[4rem] p-12 sm:p-24 relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(220,38,38,0.3)]">
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)] opacity-50"></div>
                
                <!-- Floating Elements in CTA -->
                <div class="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
                <div class="absolute bottom-10 right-10 w-48 h-48 bg-black/10 rounded-full blur-3xl animate-pulse delay-700"></div>

                <div class="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    <h2 class="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter mb-8 leading-[0.85]">
                        Empower Your <span class="bg-white/10 italic px-4 rounded-3xl">Sales Team</span>
                    </h2>
                    <p class="text-white/80 text-lg sm:text-2xl font-medium mb-12 max-w-2xl leading-relaxed">
                        Join sales teams accelerating revenue with conversational AI. Real-time insights, automated follow-ups, and seamless integrations.
                    </p>
                    <div class="flex flex-col sm:flex-row justify-center gap-6 mt-6">
                        <button 
                            onclick={onboardingStore.start}
                            class="px-12 py-6 bg-white text-red-600 rounded-full font-black uppercase tracking-[0.2em] text-lg sm:text-xl hover:scale-105 transition-all shadow-2xl active:scale-95 group flex items-center gap-4">
                            Start Free Trial
                            <ArrowRight class="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                        <a 
                            href="/contact-sales"
                            class="px-12 py-6 bg-black/20 backdrop-blur-xl border-2 border-white/20 text-white rounded-full font-black uppercase tracking-[0.2em] text-lg sm:text-xl hover:bg-black/30 transition-all text-center flex items-center justify-center">
                            Contact Sales
                        </a>
                    </div>
                    <p class="mt-12 text-white/50 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em]">
                        Free forever plan • No credit card required • Quick setup
                    </p>
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
        100% { transform: translateX(-30%); }
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
