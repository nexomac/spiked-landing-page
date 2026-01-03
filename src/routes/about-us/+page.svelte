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
			description: 'We join your Go to Market, product, and engineering rhythms.'
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

	const sections = [
		{ id: 'team', label: 'Core team' },
		{ id: 'more', label: '+More' },
		{ id: 'how-we-work', label: 'How we work' },
		{ id: 'principles', label: 'Principles' }
	];

	const extendedCollaborators = [
		{
			name: 'Amazon AI CTO',
			background: 'Amazon AI, AWS',
			focus: 'Platform scale',
			role: 'Strategic Advisor',
			initials: 'AA',
			logo: '/logos/amazon-icon.png',
			logoClass: 'amazon',
			description: 'Advises on secure foundation models, trust layers, and enterprise-grade guardrails.',
			tags: ['Platform Scale', 'Trust & Safety', 'Enterprise']
		},
		{
			name: 'Storyteller, NVIDIA AI Architect',
			background: 'NVIDIA, GPU-native systems',
			focus: 'Narrative & architecture',
			role: 'Storyteller & Systems Design',
			initials: 'NV',
			logo: '/logos/nvidia-icon.svg',
			logoClass: 'nvidia',
			description: 'Shapes the narrative and GPU-native architecture behind production rollouts.',
			tags: ['GPU Systems', 'Narrative', 'Applied AI']
		}
	];

	const teamMembers = [
		{
			name: 'Avi Sahi',
			background: 'KoreAI, Salesforce',
			focus: 'Product',
			image: photo('Avi Sahi.jpeg'),
			role: 'CEO, Co-Founder',
			description: 'Directs product strategy and AI workflow rollouts.',
			tags: ['Product thinking', 'AI workflows']
		},
		{
			name: 'Ginnee Singh',
			background: 'AWS, Microsoft',
			focus: 'Go to Market',
			image: photo('Ginnee Sahi.jpeg'),
			role: 'Advisor, Co-Founder',
			description: 'Drives Go to Market execution and operator enablement.',
			tags: ['Go to Market', 'Customers', 'Partnerships']
		},
		{
			name: 'Tom Davenport',
			background: 'Babson, MIT, Harvard',
			focus: 'AI Strategy',
			image: photo('Tom Davenport.png'),
			role: 'AI Strategy',
			description: 'Leads executive AI strategy and governance for enterprise programs.',
			tags: ['Applied AI', 'Strategy']
		},
		{
			name: 'Praneet Gill',
			background: 'KoreAI, AI Circle',
			focus: 'Go to Market',
			image: photo('Praneet Gill.jpeg'),
			role: 'Go to Market',
			description: 'Runs Go to Market motions and customer programs.',
			tags: ['Go to Market', 'Customers']
		},
		{
			name: 'Kaveesh Manchanda',
			background: 'Google, Microsoft',
			focus: 'Partnerships',
			image: photo('Kaveesh Manchanda.jpeg'),
			role: 'VP Engineering, Platform Reliability',
			description: 'Heads engineering reliability and secure platform delivery.',
			tags: ['Partnerships', 'Go to Market', 'Customers']
		}
	];
</script>

<svelte:head>
	<title>About Us - Spiked</title>
</svelte:head>

<div class="page">
	<section class="team" id="team">
		<div class="section-header">
			<p class="eyebrow">Core team</p>
			<h2>Builders, strategists, and Go to Market operators who live close to the customer.</h2>
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
						<p class="role-title">{member.role}</p>
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
			<div class="team-more" aria-label="Two more team members">+2 More</div>
		</div>
	</section>

	<section class="more" id="more">
		<div class="section-header">
			<p class="eyebrow">+ More</p>
			<h2>Advisory bench from the world’s AI leaders.</h2>
			<p class="muted">
				We tap trusted partners to pressure test architecture, security, and narrative so every rollout is durable.
			</p>
		</div>

		<div class="more-grid">
			{#each extendedCollaborators as person}
				<article class="more-card">
					<div class="more-card-header">
						<div
							class="avatar"
							class:logo={person.logo}
							class:amazon={person.logoClass === 'amazon'}
							class:nvidia={person.logoClass === 'nvidia'}
							aria-hidden="true"
						>
							{#if person.logo}
								<img src={person.logo} alt={`${person.name} logo`} loading="lazy" />
							{:else}
								<span>{person.initials}</span>
							{/if}
						</div>
						<div class="more-card-titles">
							<h3>{person.name}</h3>
							<p class="role-title">{person.role}</p>
						</div>
						<span class="focus-tag subdued">{person.focus}</span>
					</div>
					<p class="background">{person.background}</p>
					<p class="description">{person.description}</p>
					<div class="tag-row">
						{#each person.tags as tag}
							<span class="chip">{tag}</span>
						{/each}
					</div>
				</article>
				{/each}
			</div>
		</section>

	<nav class="section-nav" aria-label="About navigation">
		{#each sections as section}
			<a href={`#${section.id}`} class="section-link">
				<span aria-hidden="true">+</span>
				{section.label}
			</a>
		{/each}
	</nav>

	<section class="hero" id="how-we-work">
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

	<section class="principles" id="principles">
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

	:global(:root) {
		--about-backdrop: radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.03), transparent 38%),
			radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.02), transparent 30%),
			linear-gradient(180deg, #060910 0%, #0a0f17 100%);
		--about-surface: rgba(14, 18, 26, 0.9);
		--about-surface-soft: rgba(12, 16, 24, 0.9);
		--about-panel: rgba(13, 17, 26, 0.92);
		--about-border: rgba(255, 255, 255, 0.06);
		--about-border-strong: rgba(255, 255, 255, 0.1);
		--about-muted: #d1d5db;
		--about-subtle: #aeb6c5;
		--about-chip: rgba(255, 255, 255, 0.06);
		--about-chip-border: rgba(255, 255, 255, 0.1);
		--about-line: linear-gradient(90deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.06));
		--about-portrait-fade: linear-gradient(
			180deg,
			transparent 52%,
			rgba(3, 5, 10, 0.32) 78%,
			rgba(3, 5, 10, 0.52) 100%
		);
		--about-portrait-glow: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02), transparent);
		--about-shadow: 0 10px 32px rgba(0, 0, 0, 0.28);
		--about-soft-shadow: 0 6px 18px rgba(0, 0, 0, 0.22);
	}

	:global(:root[data-theme="light"]) {
		--about-backdrop: linear-gradient(180deg, #f8fafc 0%, #eaecef 100%);
		--about-surface: #ffffff;
		--about-surface-soft: #f6f7fb;
		--about-panel: #f4f5f9;
		--about-border: rgba(0, 0, 0, 0.08);
		--about-border-strong: rgba(0, 0, 0, 0.12);
		--about-muted: #374151;
		--about-subtle: #4b5563;
		--about-chip: rgba(0, 0, 0, 0.04);
		--about-chip-border: rgba(0, 0, 0, 0.08);
		--about-line: linear-gradient(90deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.08));
		--about-portrait-fade: linear-gradient(
			180deg,
			transparent 42%,
			rgba(0, 0, 0, 0.16) 78%,
			rgba(0, 0, 0, 0.3) 100%
		);
		--about-portrait-glow: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.08), transparent);
		--about-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
		--about-soft-shadow: 0 6px 18px rgba(15, 23, 42, 0.12);
	}

	.page {
		min-height: 100vh;
		background: var(--about-backdrop);
		color: var(--foreground);
		padding: clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 5vw, 3.75rem) 4.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: clamp(2.5rem, 4vw, 3.5rem);
		position: relative;
	}

	.page section {
		width: min(1180px, 100%);
		margin: 0 auto;
		scroll-margin-top: 120px;
	}

	.section-nav {
		width: min(1180px, 100%);
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
		gap: 0.75rem;
		padding: 0.85rem;
		border-radius: 20px;
		border: 1px solid var(--about-border-strong);
		background: linear-gradient(145deg, var(--about-surface), var(--about-surface-soft));
		box-shadow: var(--about-soft-shadow);
		backdrop-filter: blur(16px);
	}

	.section-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		font-weight: 800;
		font-size: 0.95rem;
		padding: 0.75rem 1rem;
		border-radius: 12px;
		color: var(--foreground);
		text-decoration: none;
		background: var(--about-chip);
		border: 1px solid var(--about-chip-border);
		transition: all 0.25s ease;
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}

	.section-link:hover {
		border-color: var(--about-border-strong);
		transform: translateY(-1px);
		box-shadow: 0 10px 32px rgba(0, 0, 0, 0.2);
	}

	.section-link span[aria-hidden='true'] {
		font-size: 1rem;
		color: var(--about-subtle);
	}

	.hero {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
		gap: clamp(2rem, 5vw, 4rem);
		align-items: start;
		margin: 0 auto;
		position: relative;
	}

	.hero-copy,
	.hero-panel {
		position: relative;
		background: linear-gradient(160deg, var(--about-surface), var(--about-surface-soft));
		border: 1px solid var(--about-border);
		border-radius: 28px;
		padding: clamp(2rem, 4vw, 3.5rem);
		box-shadow:
			var(--about-shadow),
			0 0 0 1px var(--about-border);
		transition: all 0.3s ease;
	}

	.hero-copy:hover,
	.hero-panel:hover {
		border-color: var(--about-border-strong);
		box-shadow:
			var(--about-shadow),
			0 0 0 1px var(--about-border-strong);
		transform: translateY(-2px);
	}

	.hero-panel {
		isolation: isolate;
		overflow: hidden;
		background: linear-gradient(160deg, var(--about-panel), var(--about-surface));
	}

	.hero-panel::before {
		content: '';
		position: absolute;
		inset: -20% -10% auto;
		height: 70%;
		background: radial-gradient(ellipse at 30% 25%, var(--about-chip), transparent 65%);
		z-index: 0;
		filter: blur(32px);
		opacity: 0.9;
	}

	.panel-inner {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.eyebrow {
		color: var(--about-subtle);
		font-size: 0.875rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		margin: 0 0 0.75rem;
	}

	.eyebrow.soft {
		color: var(--about-subtle);
		margin-bottom: 0;
	}

	h1 {
		font-size: clamp(2.6rem, 5vw, 3.6rem);
		line-height: 1.15;
		margin: 0 0 1.5rem;
		letter-spacing: -0.025em;
		font-weight: 800;
		color: var(--foreground);
	}

	h2 {
		font-size: clamp(2.2rem, 4.5vw, 3.2rem);
		line-height: 1.25;
		margin: 0.5rem 0 1rem;
		letter-spacing: -0.02em;
		font-weight: 800;
		color: var(--foreground);
	}

	h3 {
		font-size: 1.5rem;
		margin: 0 0 0.5rem;
		font-weight: 700;
		color: var(--foreground);
		letter-spacing: -0.01em;
	}

	.lede {
		color: var(--about-muted);
		font-size: 1.125rem;
		line-height: 1.7;
		margin: 0 0 2rem;
		font-weight: 400;
	}

	.pill-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.875rem;
		margin-bottom: 2rem;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.65rem 1.15rem;
		border-radius: 18px;
		border: 1px solid var(--about-chip-border);
		background: var(--about-chip);
		color: var(--foreground);
		font-weight: 600;
		font-size: 0.9375rem;
		transition: all 0.3s ease;
	}

	.pill:hover {
		border-color: var(--about-border-strong);
		transform: translateY(-1px);
	}

	.pill-ghost {
		background: transparent;
		border-style: dashed;
	}

	.pill-primary {
		background: var(--foreground);
		color: var(--background);
		border-color: var(--about-border-strong);
		box-shadow: var(--about-soft-shadow);
	}

	.pill-primary:hover {
		filter: brightness(0.98);
	}

	.highlight-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
		gap: 1.25rem;
	}

	.highlight-card {
		position: relative;
		padding: 1.5rem 1.5rem 1.75rem;
		border-radius: 20px;
		background: linear-gradient(145deg, var(--about-surface-soft), var(--about-surface));
		border: 1px solid var(--about-border);
		box-shadow:
			var(--about-soft-shadow),
			0 0 0 1px var(--about-border) inset;
		transition: all 0.3s ease;
		overflow: hidden;
	}

	.highlight-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		background: var(--about-line);
		opacity: 0.35;
		transition: opacity 0.3s ease;
	}

	.highlight-card:hover {
		border-color: var(--about-border-strong);
		box-shadow:
			var(--about-soft-shadow),
			0 0 0 1px var(--about-border-strong) inset;
		transform: translateY(-4px);
	}

	.highlight-card:hover::before {
		opacity: 0.8;
	}

	.highlight-card h3 {
		margin-bottom: 0.625rem;
	}

	.highlight-card p {
		color: var(--about-muted);
		margin: 0;
		line-height: 1.6;
		font-size: 0.9375rem;
	}

	.hero-panel h3 {
		margin: 0.1rem 0 0.75rem;
		line-height: 1.4;
	}

	.commitments {
		display: grid;
		gap: 1.25rem;
		margin-top: 1.5rem;
	}

	.commitment {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.25rem;
		align-items: start;
		padding: 1.25rem 1.5rem;
		border-radius: 20px;
		background: linear-gradient(145deg, var(--about-surface), var(--about-surface-soft));
		border: 1px solid var(--about-border);
		transition: all 0.3s ease;
		box-shadow: var(--about-soft-shadow);
	}

	.commitment:hover {
		border-color: var(--about-border-strong);
		box-shadow: var(--about-soft-shadow), 0 0 0 1px var(--about-border-strong) inset;
		transform: translateX(4px);
	}

	.commitment-id {
		width: 3rem;
		height: 3rem;
		border-radius: 16px;
		display: grid;
		place-items: center;
		background: var(--about-chip);
		color: var(--foreground);
		font-weight: 800;
		font-size: 1.125rem;
		border: 1.5px solid var(--about-border);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}

	.commitment-title {
		margin: 0.125rem 0 0;
		font-weight: 700;
		font-size: 1.0625rem;
		color: var(--foreground);
	}

	.commitment-text {
		margin: 0.5rem 0 0;
		color: var(--about-muted);
		line-height: 1.6;
		font-size: 0.9375rem;
	}

	.more {
		margin: 0 auto;
		padding: clamp(2.25rem, 4vw, 3.25rem);
		border-radius: 32px;
		border: 1px solid var(--about-border);
		background: linear-gradient(150deg, var(--about-surface), var(--about-surface-soft));
		box-shadow: var(--about-shadow);
		position: relative;
		overflow: hidden;
	}

	.more::before {
		content: '';
		position: absolute;
		inset: -35% 0 auto;
		height: 70%;
		background: radial-gradient(ellipse at 75% 20%, var(--about-chip), transparent 60%);
		opacity: 0.8;
		pointer-events: none;
	}

	.more > * {
		position: relative;
		z-index: 1;
	}

	.more-grid {
		margin-top: 2rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.25rem;
	}

	.more-card {
		padding: 1.5rem;
		border-radius: 20px;
		background: linear-gradient(170deg, var(--about-surface), var(--about-panel));
		border: 1px solid var(--about-border);
		box-shadow: var(--about-soft-shadow);
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
		transition: all 0.25s ease;
	}

	.more-card:hover {
		border-color: var(--about-border-strong);
		transform: translateY(-3px);
		box-shadow: var(--about-shadow);
	}

	.more-card-header {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		gap: 0.9rem;
		align-items: start;
	}

	.more-card-titles {
		display: grid;
		gap: 0.2rem;
	}

	.more-card-titles h3 {
		margin: 0 0 0.25rem;
	}

	.more-card-titles .role-title {
		margin: 0;
	}

	.avatar {
		width: 3rem;
		height: 3rem;
		border-radius: 0.9rem;
		background:
			radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.12), transparent 60%),
			var(--about-line);
		display: grid;
		place-items: center;
		color: var(--foreground);
		font-weight: 800;
		letter-spacing: 0.05em;
		border: 1px solid var(--about-border-strong);
		box-shadow: 0 8px 22px rgba(0, 0, 0, 0.18);
		align-self: start;
	}

	.avatar.logo {
		background: #ffffff;
		border-color: rgba(255, 255, 255, 0.6);
	}

	:global(:root[data-theme='light']) .avatar.logo.amazon {
		background: #0b1220;
		border-color: rgba(15, 23, 42, 0.2);
	}

	:global(:root[data-theme='light']) .avatar.logo.amazon img {
		filter: brightness(0) invert(1);
	}

	.avatar img {
		max-width: 82%;
		max-height: 70%;
		object-fit: contain;
		display: block;
	}

	.focus-tag.subdued {
		border-color: var(--about-border);
		background: var(--about-chip);
		color: var(--about-subtle);
		align-self: start;
		margin-top: 0.2rem;
	}

	.principles {
		margin: 0 auto;
		padding: clamp(2.5rem, 4vw, 3.5rem);
		border-radius: 32px;
		border: 1px solid var(--about-border);
		background: linear-gradient(145deg, var(--about-surface), var(--about-surface-soft));
		box-shadow: var(--about-shadow);
	}

	.section-header {
		max-width: 800px;
		display: grid;
		gap: 0.35rem;
	}

	.section-header .muted {
		color: var(--about-muted);
		margin: 0;
		line-height: 1.7;
		font-size: 1.0625rem;
	}

	.pillars-grid {
		margin-top: 2.5rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.5rem;
	}

	.pillar-card {
		position: relative;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.25rem;
		padding: 1.75rem 1.75rem 2rem;
		border-radius: 24px;
		background: linear-gradient(145deg, var(--about-surface-soft), var(--about-surface));
		border: 1px solid var(--about-border);
		transition: all 0.3s ease;
		box-shadow: var(--about-soft-shadow);
		overflow: hidden;
	}

	.pillar-card::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 2px;
		background: var(--about-line);
		opacity: 0.45;
		transition: opacity 0.3s ease;
	}

	.pillar-card:hover {
		border-color: var(--about-border-strong);
		box-shadow: var(--about-soft-shadow), 0 0 0 1px var(--about-border-strong) inset;
		transform: translateY(-4px);
	}

	.pillar-card:hover::after {
		opacity: 0.85;
	}

	.pillar-accent {
		width: 4px;
		height: 100%;
		border-radius: 10px;
		background: linear-gradient(180deg, var(--about-border-strong), var(--about-border));
		box-shadow: none;
	}

	.pillar-card h3 {
		margin-bottom: 0.625rem;
	}

	.pillar-card p {
		margin: 0;
		color: var(--about-muted);
		line-height: 1.6;
		font-size: 0.9375rem;
	}

	.team {
		margin: 0 auto;
		padding: clamp(2.5rem, 4vw, 3.5rem);
		border-radius: 32px;
		border: 1px solid var(--about-border);
		background: linear-gradient(160deg, var(--about-surface), var(--about-surface-soft));
		box-shadow: var(--about-shadow);
		position: relative;
		overflow: hidden;
	}

	.page > .team:first-of-type {
		margin-top: clamp(1.5rem, 3vw, 2rem);
	}

	.team::before {
		content: '';
		position: absolute;
		inset: -35% 0 auto;
		height: 65%;
		background: radial-gradient(ellipse at 20% 30%, var(--about-chip), transparent 60%);
		opacity: 0.9;
		pointer-events: none;
	}

	.team > * {
		position: relative;
		z-index: 1;
	}

	.team-grid {
		margin-top: 2.5rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.75rem;
	}

	.team-card {
		position: relative;
		background: linear-gradient(180deg, var(--about-surface), var(--about-surface-soft));
		border: 1px solid var(--about-border);
		border-radius: 28px;
		overflow: hidden;
		box-shadow: var(--about-shadow);
		display: flex;
		flex-direction: column;
		transition: all 0.25s ease;
		min-width: 0;
		width: 100%;
	}

	.team-card:hover {
		transform: translateY(-6px);
		border-color: var(--about-border-strong);
		box-shadow: var(--about-shadow), 0 0 0 1px var(--about-border-strong);
	}

	.team-more {
		align-self: center;
		justify-self: start;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		min-width: 180px;
		padding: 0.75rem 1.2rem;
		border-radius: 999px;
		border: 1px dashed var(--about-border-strong);
		background: var(--about-chip);
		color: var(--about-subtle);
		font-weight: 800;
		font-size: 0.85rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		box-shadow: var(--about-soft-shadow);
		flex-shrink: 0;
	}

	.portrait {
		position: relative;
		aspect-ratio: 5 / 4;
		overflow: hidden;
		min-height: 320px;
	}

	.portrait img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		filter: contrast(1.08) saturate(1.08);
		transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.team-card:hover .portrait img {
		transform: scale(1.05);
	}

	.portrait::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, transparent 68%, rgba(0, 0, 0, 0.35));
		opacity: 0.6;
	}

	.portrait-glow {
		display: none;
	}

	.team-content {
		position: relative;
		z-index: 2;
		padding: 1.75rem 1.75rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.65rem;
	}

	.name-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.name-row h3 {
		margin: 0;
		font-size: 1.7rem;
	}

	.focus-tag {
		padding: 0.5rem 0.875rem;
		border-radius: 12px;
		background: var(--about-chip);
		color: var(--foreground);
		border: 1px solid var(--about-border-strong);
		font-weight: 700;
		font-size: 0.8125rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		white-space: nowrap;
	}

	.background {
		color: var(--about-subtle);
		margin: 0;
		font-weight: 600;
		font-size: 1rem;
	}

	.role-title {
		margin: 0.1rem 0 0.35rem;
		font-size: 1.125rem;
		font-weight: 800;
		color: var(--foreground);
		letter-spacing: -0.01em;
	}

	.description {
		margin: 0;
		color: var(--about-muted);
		line-height: 1.65;
		font-size: 0.9375rem;
	}

	.tag-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.625rem;
		margin-top: 0.75rem;
	}

	.chip {
		padding: 0.5rem 0.875rem;
		border-radius: 999px;
		background: var(--about-chip);
		border: 1px solid var(--about-chip-border);
		color: var(--foreground);
		font-weight: 600;
		font-size: 0.875rem;
		transition: all 0.2s ease;
	}

	.chip:hover {
		background: var(--about-chip-border);
		border-color: var(--about-border-strong);
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

		.section-nav {
			grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
			padding: 0.75rem;
		}

		.section-link {
			font-size: 0.9rem;
			justify-content: flex-start;
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

		.team-more {
			justify-self: center;
		}

		.more-grid {
			grid-template-columns: 1fr;
		}

		.more-card-header {
			grid-template-columns: 1fr;
		}

	}
</style>
