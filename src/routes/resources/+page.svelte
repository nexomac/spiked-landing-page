<script>
    /** @type {import('./$types').PageProps} */
    let { data } = $props();
</script>

<svelte:head>
    <title>Resources - SpikedAI</title>
    <meta name="description" content="Watch expert interviews and insights from industry leaders" />
</svelte:head>

<div class="resources-page">
    <div class="container">
        <header class="page-header">
            <h1>Resources</h1>
            <p>Watch expert interviews and insights from industry leaders featured on theCUBE + NYSE Wired: Mixture of Experts</p>
        </header>

        <div class="videos-grid">
            {#each [
                {
                    id: "BQcw_UIRSKU",
                    title: "Anushka Salinas, Nanit | theCUBE + NYSE Wired: Mixture of Experts",
                },
                {
                    id: "6J9AgLJ8CiY",
                    title: "Ginniee Singh, SpikedAI | theCUBE + NYSE Wired: Mixture of Experts",
                },
                {
                    id: "0PUsnvhTxi4",
                    title: "Tim Piemonte, Tribeca Softech & Ankur Patel, Multimodal | theCUBE + NYSE Wired: Mixture of Experts",
                },
                {
                    id: "ZVidW_wUCwA",
                    title: "Umesh Sachdev, Uniphore | theCUBE + NYSE Wired: Mixture of Experts",
                },
                {
                    id: "2Q8XZfkYv9I",
                    title: "Sid Sheth, d-Matrix | theCUBE + NYSE Wired: Mixture of Experts",
                },
                {
                    id: "2pQhRDomSTw",
                    title: "Aaron Katz, ClickHouse | theCUBE + NYSE Wired: Mixture of Experts",
                },
                {
                    id: "DWVtGMYcXfg",
                    title: "Muddu Sudhakar, Salesforce | theCUBE + NYSE Wired: Mixture of Experts",
                },
                {
                    id: "3y_W7J214kQ",
                    title: "Jim McNiel, TAE Technologies | theCUBE + NYSE Wired: Mixture of Experts",
                },
                {
                    id: "CmyrvW2m7Z8",
                    title: "Alex Rinke, Celonis | theCUBE + NYSE Wired: Mixture of Experts",
                },
            ] as video}
                <div class="video-card">
                    <div class="video-frame">
                        <iframe 
                            src={`https://www.youtube.com/embed/${video.id}`} 
                            title={video.title} 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin" 
                            allowfullscreen
                            loading="lazy"
                        ></iframe>
                    </div>
                    <h3>{video.title}</h3>
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .resources-page {
        min-height: 100vh;
        padding: 6rem 0 4rem;
        background: linear-gradient(180deg, #000 0%, #0a0a0a 100%);
    }

    .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    .page-header {
        text-align: center;
        margin-bottom: 4rem;
    }

    .page-header h1 {
        font-size: 3.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #fff 0%, #888 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 1rem;
    }

    .page-header p {
        font-size: 1.25rem;
        color: #999;
        max-width: 800px;
        margin: 0 auto;
        line-height: 1.6;
    }

    .videos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
        margin-top: 3rem;
    }

    .video-card {
        background: rgba(255, 255, 255, 0.03);
        border-radius: 12px;
        padding: 1.5rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }

    .video-card:hover {
        transform: translateY(-4px);
        border-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .video-frame {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
        overflow: hidden;
        border-radius: 10px;
        background: #0f0f0f;
    }

    .video-card iframe {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }

    .video-card h3 {
        margin-top: 1rem;
        font-size: 1.25rem;
        font-weight: 600;
        color: #fff;
    }

    @media (max-width: 1024px) {
        .videos-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }

        .page-header h1 {
            font-size: 2.5rem;
        }
    }

    @media (max-width: 640px) {
        .resources-page {
            padding: 4rem 0 3rem;
        }

        .container {
            padding: 0 1rem;
        }

        .page-header h1 {
            font-size: 2rem;
        }

        .page-header p {
            font-size: 1rem;
        }

        .video-card {
            padding: 1rem;
        }

        .videos-grid {
            grid-template-columns: 1fr;
        }
    }
</style>
