<script>
    /** @type {import('./$types').PageProps} */
    let { data } = $props();
</script>

<svelte:head>
    <title>Resources - Spiked</title>
    <meta name="description" content="Watch expert interviews and insights from industry leaders" />
</svelte:head>

<div class="resources-page">
    <div class="container">
        <header class="page-header">
            <h1>Resources</h1>
            <p>Watch expert interviews and insights from industry leaders featured on theCUBE + NYSE Wired: Mixture of Experts</p>
        </header>

        <div class="videos-grid">
            <div class="video-card">
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/d0PNJLstfYs" 
                    title="Vishal Garg, Better.com | theCUBE + NYSE Wired: Mixture of Experts" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
                <h3>Vishal Garg, Better.com</h3>
            </div>

            <div class="video-card">
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/BQcw_UIRSKU" 
                    title="Anushka Salinas, Nanit | theCUBE + NYSE Wired: Mixture of Experts" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
                <h3>Anushka Salinas, Nanit</h3>
            </div>

            <div class="video-card">
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/0PUsnvhTxi4" 
                    title="Tim Piemonte, Tribeca Softech & Ankur Patel, Multimodal | theCUBE + NYSE Wired: Mixture of Experts" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
                <h3>Tim Piemonte, Tribeca Softech & Ankur Patel, Multimodal</h3>
            </div>

            <div class="video-card">
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/waDHs6vVYvA" 
                    title="Jethro Rothe-Kushel, Ritual Ads | theCUBE + NYSE Wired: Mixture of Experts" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
                <h3>Jethro Rothe-Kushel, Ritual Ads</h3>
            </div>

            <div class="video-card">
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/AKj1Pp6xmrk" 
                    title="John Garner, WeShop | theCUBE + NYSE Wired: Mixture of Experts" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
                <h3>John Garner, WeShop</h3>
            </div>

            <div class="video-card">
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/0B5xub85ogs" 
                    title="Garima Kapoor, MinIO | theCUBE + NYSE Wired: Mixture of Experts" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
                <h3>Garima Kapoor, MinIO</h3>
            </div>

            <div class="video-card">
                <iframe 
                    width="100%" 
                    height="315" 
                    src="https://www.youtube.com/embed/zSzTlNrNppI" 
                    title="Raphaelle D'ornano, Decoding Discontinuity | theCUBE + NYSE Wired: Mixture of Experts" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
                <h3>Raphaelle D'ornano, Decoding Discontinuity</h3>
            </div>
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
        grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
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

    .video-card iframe {
        border-radius: 8px;
        aspect-ratio: 16/9;
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