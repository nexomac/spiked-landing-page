<script>
	const photo = (file) => `/Photos/${encodeURIComponent(file)}`;

	const highlights = [
		{
			title: 'Operator-led pods',
			copy: 'Small, hands-on builders who ship beside you.'
		},
		{
			title: 'AI-first workflows',
			copy: 'Reasoning-grade UX that feels like a teammate.'
		},
		{
			title: 'Enterprise-ready delivery',
			copy: 'Security, governance, and quality by default.'
		}
	];

	const commitments = [
		{
			id: '01',
			title: 'Embedded partnership',
			description: 'We join your GTM, product, and engineering rhythms.'
		},
		{
			id: '02',
			title: 'Quality with velocity',
			description: 'Tight release cycles with crisp demos every week.'
		},
		{
			id: '03',
			title: 'Measurable lift',
			description: 'Everything ladders to activation, usage, and revenue.'
		}
	];

	const pillars = [
		{
			title: 'Think in workflows',
			body: 'We map the revenue journey end-to-end so AI augments every interaction instead of adding noise.'
		},
		{
			title: 'Ship small, learn fast',
			body: 'Weekly releases, real adoption data, and direct time with users to keep solutions sharp.'
		},
		{
			title: 'Own the rollout',
			body: 'Enablement, playbooks, and instrumentation are part of the build—not an afterthought.'
		}
	];

	const teamMembers = [
		{
			name: 'Tom Davenport',
			background: 'Babson, MIT, Harvard',
			focus: 'AI Strategy',
			image: photo('Tom Davenport.png'),
			description: 'AI strategy that ships and sticks.',
			tags: ['Applied AI', 'Strategy']
		},
		{
			name: 'Praneet Gill',
			background: 'KoreAI, AI Circle',
			focus: 'Go to Market',
			image: photo('Praneet Gill.jpeg'),
			description: 'Field-tested GTM and customer voice.',
			tags: ['GTM systems', 'Customer voice']
		},
		{
			name: 'Kaveesh Manchanda',
			background: 'Google, Microsoft',
			focus: 'Engineering',
			image: photo('Kaveesh Manchanda.jpeg'),
			description: 'Reliable, fast, and trustworthy systems.',
			tags: ['Engineering', 'Quality']
		},
		{
			name: 'Avi Sahi',
			background: 'KoreAI, Salesforce',
			focus: 'Product',
			image: photo('Avi Sahi.jpeg'),
			description: 'Intuitive AI workflows ready for rollout.',
			tags: ['Product thinking', 'AI workflows']
		},
		{
			name: 'Ginnee Sahi',
			background: 'AWS, Microsoft',
			focus: 'GTM',
			image: photo('Ginnee Sahi.jpeg'),
			description: 'GTM execution aligned with operators.',
			tags: ['GTM', 'Enablement']
		}
	];
</script>

<svelte:head>
	<title>About Us - Spiked</title>
</svelte:head>

<div class="page">
	<section class="team">
		<div class="section-header">
			<p class="eyebrow">The team</p>
			<h2>Builders, strategists, and GTM operators who live close to the customer.</h2>
			<p class="muted">
				We combine enterprise experience with a startup pace so you get AI that ships and sticks.
			</p>
		</div>

		<div class="team-grid">
			{#each teamMembers as member}
				<article class="team-card">
					<div class="portrait">
						<div class="portrait-glow"></div>
						<img src={member.image} alt={`Portrait of ${member.name}`} loading="lazy" />
					</div>
					<div class="team-content">
						<div class="name-row">
							<h3>{member.name}</h3>
							<span class="focus-tag">{member.focus}</span>
						</div>
						<p class="background">{member.background}</p>
						<p class="description">{member.description}</p>
						{#if member.tags}
							<div class="tag-row">
								{#each member.tags as tag}
									<span class="chip">{tag}</span>
								{/each}
							</div>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="hero">
		<div class="hero-copy">
			<p class="eyebrow">About Spiked</p>
			<h1>
				Operators building revenue AI that feels sharp, safe, and immediate.
			</h1>
			<p class="lede">
				We’re founders and operators who sit with customers, listen to calls, and ship applied AI
				built for the moments that move revenue.
			</p>

			<div class="pill-row">
				<span class="pill">Applied AI studio</span>
				<span class="pill pill-ghost">Builder-led pods</span>
				<span class="pill pill-primary">Enterprise ready</span>
			</div>

			<div class="highlight-grid">
				{#each highlights as highlight}
					<article class="highlight-card">
						<h3>{highlight.title}</h3>
						<p>{highlight.copy}</p>
					</article>
				{/each}
			</div>
		</div>

		<div class="hero-panel">
			<div class="panel-inner">
				<p class="eyebrow soft">How we work</p>
				<h3>We out-ship the market with discipline and care.</h3>

				<div class="commitments">
					{#each commitments as commitment}
						<div class="commitment">
							<div class="commitment-id">{commitment.id}</div>
							<div>
								<p class="commitment-title">{commitment.title}</p>
								<p class="commitment-text">{commitment.description}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="principles">
		<div class="section-header">
			<p class="eyebrow">Operating principles</p>
			<h2>Everything we build is designed for measurable, durable revenue impact.</h2>
			<p class="muted">
				We stay close to the frontlines and keep the work clean, fast, and measurable.
			</p>
		</div>

		<div class="pillars-grid">
			{#each pillars as pillar}
				<article class="pillar-card">
					<div class="pillar-accent"></div>
					<div>
						<h3>{pillar.title}</h3>
						<p>{pillar.body}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>
</div>

<style>
	:global(body) {
		background: var(--background);
	}

	.page {
		min-height: 100vh;
		background:
			radial-gradient(circle at 20% 10%, rgba(139, 92, 246, 0.04), transparent 35%),
			radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.02), transparent 28%),
			radial-gradient(circle at 50% 100%, rgba(59, 130, 246, 0.03), transparent 40%),
			var(--background);
		color: var(--foreground);
		padding: clamp(1.5rem, 3vw, 3rem) clamp(1.5rem, 4vw, 3rem) 4rem;
	}

	.hero {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: clamp(2rem, 5vw, 3.5rem);
		align-items: start;
		max-width: 1200px;
		margin: 0 auto clamp(2rem, 5vw, 3rem);
		position: relative;
	}

	.hero::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 32px;
		padding: 1px;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.08), rgba(255, 255, 255, 0.04));
		mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
		mask-composite: xor;
		pointer-events: none;
	}

	.hero-copy,
	.hero-panel {
		position: relative;
		background: rgba(8, 10, 20, 0.65);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 28px;
		padding: clamp(1.5rem, 3vw, 2.5rem);
		backdrop-filter: blur(10px);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(255, 255, 255, 0.02) inset;
	}

	.hero-panel {
		isolation: isolate;
		overflow: hidden;
	}

	.hero-panel::before {
		content: '';
		position: absolute;
		inset: -20% -10% auto;
		height: 65%;
		background: radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.12), rgba(59, 130, 246, 0.06), transparent 50%);
		z-index: 0;
	}

	.panel-inner {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.eyebrow {
		color: #a78bfa;
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		margin: 0 0 0.5rem;
	}

	.eyebrow.soft {
		color: rgba(139, 92, 246, 0.75);
		margin-bottom: 0;
	}

	h1 {
		font-size: clamp(2rem, 4vw, 3rem);
		line-height: 1.2;
		margin: 0 0 1rem;
		letter-spacing: -0.02em;
	}

	h2 {
		font-size: clamp(1.8rem, 3vw, 2.5rem);
		line-height: 1.3;
		margin: 0.25rem 0 0.75rem;
	}

	h3 {
		font-size: 1.25rem;
		margin: 0 0 0.4rem;
	}

	.lede {
		color: #cdd1dc;
		font-size: 1.05rem;
		line-height: 1.6;
		margin: 0 0 1.1rem;
	}

	.pill-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.6rem 1rem;
		border-radius: 999px;
		border: 1px solid rgba(255, 255, 255, 0.14);
		background: rgba(255, 255, 255, 0.03);
		color: #f5f5f5;
		font-weight: 600;
		font-size: 0.95rem;
	}

	.pill-ghost {
		background: rgba(255, 255, 255, 0.02);
		color: #d9d9d9;
	}

	.pill-primary {
		background: linear-gradient(120deg, #8b5cf6, #6366f1);
		color: #fff;
		border-color: rgba(139, 92, 246, 0.5);
		box-shadow: 0 10px 35px rgba(139, 92, 246, 0.2);
	}

	.highlight-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1rem;
	}

	.highlight-card {
		padding: 1.05rem 1.1rem;
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
	}

	.highlight-card p {
		color: #c6c8d3;
		margin: 0;
		line-height: 1.5;
	}

	.hero-panel h3 {
		margin: 0.1rem 0 0.75rem;
		line-height: 1.4;
	}

	.commitments {
		display: grid;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.commitment {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.85rem;
		align-items: start;
		padding: 0.85rem;
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.commitment-id {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 12px;
		display: grid;
		place-items: center;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.1));
		color: #e9d5ff;
		font-weight: 700;
		border: 1px solid rgba(139, 92, 246, 0.3);
	}

	.commitment-title {
		margin: 0;
		font-weight: 700;
	}

	.commitment-text {
		margin: 0.25rem 0 0;
		color: #cfd1d9;
		line-height: 1.5;
	}

	.principles {
		max-width: 1200px;
		margin: clamp(2.5rem, 5vw, 4rem) auto;
		padding: clamp(1.5rem, 3vw, 2rem);
		border-radius: 28px;
		border: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(8, 10, 20, 0.7);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
	}

	.section-header {
		max-width: 760px;
	}

	.section-header .muted {
		color: #cdd1dc;
		margin: 0;
		line-height: 1.6;
		font-size: 1rem;
	}

	.pillars-grid {
		margin-top: 1.75rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1rem;
	}

	.pillar-card {
		position: relative;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.85rem;
		padding: 1rem 1.25rem;
		border-radius: 18px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.pillar-accent {
		width: 12px;
		height: 100%;
		border-radius: 10px;
		background: linear-gradient(180deg, rgba(139, 92, 246, 0.7), rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.3));
		box-shadow: 0 8px 20px rgba(139, 92, 246, 0.15);
	}

	.pillar-card p {
		margin: 0;
		color: #cdd1dc;
		line-height: 1.5;
	}

	.team {
		max-width: 1200px;
		margin: clamp(2.5rem, 5vw, 4rem) auto;
	}

	.page > .team:first-of-type {
		margin-top: clamp(1rem, 3vw, 1.5rem);
	}

	.team-grid {
		margin-top: 1.5rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 1.25rem;
	}

	.team-card {
		background: rgba(8, 10, 20, 0.78);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 20px;
		overflow: hidden;
		box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
		display: flex;
		flex-direction: column;
		transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
	}

	.team-card:hover {
		transform: translateY(-6px);
		border-color: rgba(139, 92, 246, 0.5);
		box-shadow: 0 25px 60px rgba(139, 92, 246, 0.12), 0 0 0 1px rgba(139, 92, 246, 0.2) inset;
	}

	.portrait {
		position: relative;
		aspect-ratio: 4 / 3;
		overflow: hidden;
	}

	.portrait img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.portrait::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 40%, rgba(3, 7, 18, 0.9) 100%);
	}

	.portrait-glow {
		position: absolute;
		inset: auto 10% -20% 10%;
		height: 30%;
		filter: blur(35px);
		background: linear-gradient(to top, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.15));
		z-index: 1;
	}

	.team-content {
		position: relative;
		z-index: 2;
		padding: 1.25rem 1.25rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.name-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.name-row h3 {
		margin: 0;
	}

	.focus-tag {
		padding: 0.35rem 0.7rem;
		border-radius: 10px;
		background: linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(59, 130, 246, 0.12));
		color: #e9d5ff;
		border: 1px solid rgba(139, 92, 246, 0.35);
		font-weight: 700;
		font-size: 0.85rem;
	}

	.background {
		color: #aeb3c1;
		margin: 0;
		font-weight: 600;
	}

	.description {
		margin: 0;
		color: #cfd1d9;
		line-height: 1.6;
	}

	.tag-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.35rem;
	}

	.chip {
		padding: 0.4rem 0.7rem;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.08);
		color: #dfe2ec;
		font-weight: 600;
		font-size: 0.9rem;
	}

	@media (max-width: 900px) {
		.hero::after {
			border-radius: 24px;
		}

		.hero-copy,
		.hero-panel {
			border-radius: 22px;
		}

		.name-row {
			flex-direction: column;
			align-items: flex-start;
		}
	}

	@media (max-width: 640px) {
		.page {
			padding: 1.25rem 1rem 3rem;
		}

		.hero {
			margin-bottom: 2rem;
		}

		.pill-row {
			gap: 0.5rem;
		}

		.team-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
