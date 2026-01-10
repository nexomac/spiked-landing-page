<script>
  export let activeTab = 'simulator';
  export let setActiveTab = () => {};
  export let handleTilt = () => {};
  export let resetTilt = () => {};
  export let visible = false;

  const workflows = [
    {
      id: 'simulator',
      label: 'CALL SIMULATOR',
      title: 'Call AI Sales Simulator',
      description: 'AI role-play to practice sales plays, objection handling, and selling methodologies.',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
    },
    {
      id: 'knowledge',
      label: 'KNOWLEDGE AGENT',
      title: 'Knowledge Agent – Real-Time Answers',
      description: "AI gives instant answers during live calls from you're A to Z knowledge base.",
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    },
    {
      id: 'meeting',
      label: 'MEETING AI',
      title: 'Meeting AI – Conversational Notetaker',
      description: 'Auto-transcription, key takeaways, action items extraction, and CRM sync.',
      icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z'
    },
    {
      id: 'followup',
      label: 'FOLLOW-UP PLANNER',
      title: 'Follow-Up AI – Smart Task Automation',
      description: 'Real time follow-up, and task assignments so nothing gets missed.',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
    }
  ];

  const integrations = [
    {
      label: 'CRM Integration',
      title: 'Salesforce • HubSpot • monday.com',
      icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
    },
    {
      label: 'Project Management',
      title: 'Jira • Asana • Monday.com',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
    },
    {
      label: 'Communication',
      title: 'Slack • Teams • Zoom',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
    }
  ];
</script>

<section id="products" data-section="products" class="products-shell relative overflow-hidden bg-black py-24 sm:py-32">
  <div class="absolute inset-0" style="background-image: linear-gradient(rgba(220, 38, 38, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220, 38, 38, 0.03) 1px, transparent 1px); background-size: 40px 40px;"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-6">
    <div class={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-900/30 bg-red-950/30 text-[11px] font-semibold tracking-[0.2em] uppercase text-red-400">
        Core Platform Features
      </div>
      <h2 class="products-title">
        AI-Powered
        <span class="products-title-accent">Revenue Generation Platform</span>
      </h2>
      <p class="products-subhead">
        Built to support revenue teams from the first conversation to the final follow-up. It combines real-time intelligence, automated meeting assistance, and CRM-ready insights into one platform so sellers don’t just talk, they convert.
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each workflows as workflow, i}
        <button
          type="button"
          class={`tilt-card product-card relative overflow-hidden ${activeTab === workflow.id ? 'border-red-600/70 bg-gradient-to-br from-red-950/30 via-zinc-950 to-zinc-950 shadow-xl shadow-red-900/30' : ''}`}
          style={`animation-delay: ${i * 0.08}s; transform: translate3d(0,0,0);`}
          aria-pressed={activeTab === workflow.id}
          aria-label={workflow.title}
          onmousemove={(event) => handleTilt(event, 10)}
          onmouseleave={resetTilt}
          onmouseenter={() => setActiveTab(workflow.id)}
        >
          <div class="absolute inset-0 bg-gradient-to-br from-red-700/0 via-red-700/10 to-red-700/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <div class="relative flex flex-col gap-4">
            <div class="flex items-start justify-between">
              <div class="p-3 rounded-xl bg-gradient-to-br from-red-950/60 to-zinc-950/60 border border-red-900/40 shadow-lg shadow-red-900/20 group-hover:rotate-3 group-hover:scale-105 transition-all">
                <svg class={`w-6 h-6 ${activeTab === workflow.id ? 'text-red-400' : 'text-zinc-500'} group-hover:text-red-400 transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={workflow.icon} />
                </svg>
              </div>
              <span class={`text-[10px] font-bold tracking-[0.2em] uppercase ${activeTab === workflow.id ? 'text-red-400' : 'text-zinc-600'} group-hover:text-red-400 transition-colors`}>{workflow.label}</span>
            </div>
            <div class="space-y-2">
              <h3 class="text-lg font-semibold text-white leading-tight group-hover:text-red-200 transition-colors">{workflow.title}</h3>
              <p class="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors">{workflow.description}</p>
            </div>
            {#if activeTab === workflow.id}
              <div class="pt-3 border-t border-red-900/40 flex items-center justify-between text-xs font-semibold text-red-400">
                <span class="flex items-center gap-1">Watch Demo</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            {/if}
          </div>
        </button>
      {/each}
    </div>

    <div class="mt-14 grid md:grid-cols-3 gap-5">
      {#each integrations as agent, i}
        <div
          class="tilt-card integration-card relative overflow-hidden"
          style={`animation-delay: ${0.4 + i * 0.1}s; transform: translate3d(0,0,0);`}
          onmousemove={(event) => handleTilt(event, 8)}
          onmouseleave={resetTilt}
          role="group"
          aria-label={`${agent.title} integration card`}
        >
          <div class="absolute inset-0 bg-gradient-to-br from-red-900/0 to-red-900/8 opacity-0 hover:opacity-100 transition-opacity duration-700"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
          <div class="relative flex items-center gap-4">
            <div class="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 shadow-lg shadow-black/40">
              <svg class="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={agent.icon} />
              </svg>
            </div>
            <div class="flex-1">
              <div class="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 mb-1">{agent.label}</div>
              <div class="text-sm font-semibold text-white">{agent.title}</div>
            </div>
            <svg class="w-4 h-4 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .products-title {
    margin-top: 1.5rem;
    margin-bottom: 2rem;
    font-size: clamp(3.5rem, 8vw, 6rem);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: 0.95;
    color: #fff;
    font-family: 'Space Grotesk', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
  }

  :global([data-theme='light']) .products-title {
    color: #0f172a;
  }

  .products-title-accent {
    display: block;
    background: linear-gradient(90deg, #f97316, #ef4444, #fb7185);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .products-subhead {
    margin: 0 auto;
    max-width: 760px;
    color: #a1a1aa;
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.8;
    font-weight: 400;
    font-family: 'Space Grotesk', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
  }

  :global([data-theme='light']) .products-subhead {
    color: #475569;
  }

  .product-card {
    border: 1.5px solid rgba(63, 63, 70, 0.7);
    background: linear-gradient(135deg, rgba(24, 24, 27, 0.9), rgba(12, 12, 14, 0.92));
    border-radius: 16px;
    padding: 20px;
    text-align: left;
    transition: border-color 300ms ease, transform 300ms ease, box-shadow 300ms ease, background 300ms ease;
  }

  :global([data-theme='light']) .product-card {
    border: 1.5px solid rgba(226, 232, 240, 0.8);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));
    box-shadow: 0 10px 40px rgba(15, 23, 42, 0.06);
  }

  .product-card:hover {
    border-color: rgba(248, 113, 113, 0.5);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
    background: linear-gradient(145deg, rgba(28, 28, 32, 0.95), rgba(24, 24, 28, 0.9));
  }

  :global([data-theme='light']) .product-card:hover {
    border-color: rgba(220, 38, 38, 0.3);
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
    background: linear-gradient(145deg, rgba(255, 255, 255, 1), rgba(254, 249, 249, 0.98));
  }

  .integration-card {
    border: 1.5px solid rgba(63, 63, 70, 0.7);
    background: linear-gradient(135deg, rgba(20, 20, 24, 0.9), rgba(12, 12, 14, 0.92));
    border-radius: 14px;
    padding: 16px 18px;
    transition: border-color 300ms ease, transform 300ms ease, box-shadow 300ms ease, background 300ms ease;
  }

  :global([data-theme='light']) .integration-card {
    border: 1.5px solid rgba(226, 232, 240, 0.8);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.95));
    box-shadow: 0 8px 30px rgba(15, 23, 42, 0.06);
  }

  .integration-card:hover {
    border-color: rgba(248, 113, 113, 0.45);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
    background: linear-gradient(140deg, rgba(26, 26, 30, 0.95), rgba(18, 18, 22, 0.9));
  }

  :global([data-theme='light']) .integration-card:hover {
    border-color: rgba(220, 38, 38, 0.25);
    box-shadow: 0 15px 40px rgba(15, 23, 42, 0.1);
    background: linear-gradient(140deg, rgba(255, 255, 255, 1), rgba(254, 249, 249, 0.98));
  }
</style>
