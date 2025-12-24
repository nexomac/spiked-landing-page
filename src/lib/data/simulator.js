// Simulator scenarios and dialogue data
export const scenarios = [
	{
		id: 'discovery',
		name: 'Discovery Call',
		description: 'First meeting with a prospect - understand their needs',
		difficulty: 'Beginner',
		duration: '15 min',
		color: 'blue',
		icon: 'Users'
	},
	{
		id: 'demo',
		name: 'Product Demo',
		description: 'Present your solution and handle technical questions',
		difficulty: 'Intermediate',
		duration: '30 min',
		color: 'purple',
		icon: 'Video'
	},
	{
		id: 'objection',
		name: 'Objection Handling',
		description: 'Navigate pricing concerns and competitive comparisons',
		difficulty: 'Advanced',
		duration: '20 min',
		color: 'orange',
		icon: 'Shield'
	},
	{
		id: 'closing',
		name: 'Deal Closing',
		description: 'Navigate final negotiations and secure commitment',
		difficulty: 'Advanced',
		duration: '25 min',
		color: 'green',
		icon: 'Trophy'
	}
];

export const discoveryDialogue = [
	{
		id: 1,
		speaker: 'AI Prospect - Jennifer Chen',
		initials: 'JC',
		role: 'VP of Sales',
		company: 'TechCorp Inc.',
		time: '00:00',
		text: 'Hi! Thanks for reaching out. I saw your email about improving our sales process.',
		isAI: true,
		sentiment: 'neutral',
		coachingPoints: []
	},
	{
		id: 2,
		speaker: 'You',
		initials: 'ME',
		time: '00:15',
		text: 'Thanks for taking the time, Jennifer! Before I dive in, I\'d love to understand more about your current sales operations.',
		isAI: false,
		score: 85,
		feedback: 'Good opening! You\'re focusing on discovery first.',
		strengths: ['Active listening setup', 'Consultative approach'],
		improvements: []
	},
	{
		id: 3,
		speaker: 'AI Prospect - Jennifer Chen',
		initials: 'JC',
		role: 'VP of Sales',
		company: 'TechCorp Inc.',
		time: '00:30',
		text: 'Well, we have a team of 25 reps. Our biggest issue is that new hires take forever to ramp up—usually 5-6 months before they\'re productive.',
		isAI: true,
		sentiment: 'concerned',
		coachingPoints: [
			{
				type: 'opportunity',
				text: 'Pain point identified: Long ramp time (5-6 months)',
				action: 'Dig deeper: Ask about the cost of slow ramp time'
			}
		]
	},
	{
		id: 4,
		speaker: 'You',
		initials: 'ME',
		time: '00:50',
		text: 'That\'s significant. Have you calculated what that ramp time is costing you in terms of lost opportunities?',
		isAI: false,
		score: 92,
		feedback: 'Excellent! You\'re quantifying the pain.',
		strengths: ['Value-based questioning', 'Probing for impact'],
		improvements: []
	},
	{
		id: 5,
		speaker: 'AI Prospect - Jennifer Chen',
		initials: 'JC',
		role: 'VP of Sales',
		company: 'TechCorp Inc.',
		time: '01:10',
		text: 'Honestly, no. But I know we\'re leaving money on the table. Each rep should be closing at least 3-4 deals per quarter, but new reps barely hit 1.',
		isAI: true,
		sentiment: 'frustrated',
		coachingPoints: [
			{
				type: 'critical',
				text: 'Key metric revealed: 3-4 deals per quarter target vs 1 actual',
				action: 'Calculate ROI: Help them see the financial impact'
			}
		]
	},
	{
		id: 6,
		speaker: 'You',
		initials: 'ME',
		time: '01:35',
		text: 'So if we could cut that ramp time in half and get new reps to 2-3 deals in their first few months, what would that mean for your team?',
		isAI: false,
		score: 88,
		feedback: 'Strong hypothetical value proposition!',
		strengths: ['Painting the vision', 'Quantifiable outcome'],
		improvements: ['Could ask about average deal size to calculate exact ROI']
	},
	{
		id: 7,
		speaker: 'AI Prospect - Jennifer Chen',
		initials: 'JC',
		role: 'VP of Sales',
		company: 'TechCorp Inc.',
		time: '01:55',
		text: 'That would be huge. Our average deal is around $50K. If we could accelerate that... we\'re talking about significant revenue.',
		isAI: true,
		sentiment: 'interested',
		coachingPoints: [
			{
				type: 'success',
				text: 'Deal size captured: $50K average',
				action: 'Next step: Present your solution\'s ROI using these numbers'
			}
		]
	},
	{
		id: 8,
		speaker: 'You',
		initials: 'ME',
		time: '02:15',
		text: 'Exactly. So with 25 reps, if even half of them could close just one extra deal per quarter thanks to faster ramp time, that\'s over $600K in additional revenue per quarter.',
		isAI: false,
		score: 95,
		feedback: 'Excellent ROI calculation! This creates urgency.',
		strengths: ['Quantified value', 'Clear business case', 'Used their numbers'],
		improvements: []
	},
	{
		id: 9,
		speaker: 'AI Prospect - Jennifer Chen',
		initials: 'JC',
		role: 'VP of Sales',
		company: 'TechCorp Inc.',
		time: '02:35',
		text: 'Wow, I hadn\'t thought about it that way. How exactly does your solution help with ramp time?',
		isAI: true,
		sentiment: 'engaged',
		coachingPoints: [
			{
				type: 'buying_signal',
				text: 'Buying signal detected: Asking about solution details',
				action: 'Perfect time to transition to your product capabilities'
			}
		]
	},
	{
		id: 10,
		speaker: 'You',
		initials: 'ME',
		time: '02:50',
		text: 'Great question! Our AI gives new reps real-time assistance during calls—it\'s like having your best performer whispering in their ear. They get instant access to product knowledge, competitive intel, and objection handling scripts.',
		isAI: false,
		score: 90,
		feedback: 'Good product positioning tied to their pain point.',
		strengths: ['Connected solution to pain', 'Clear value proposition'],
		improvements: ['Could have asked permission before presenting']
	},
	{
		id: 11,
		speaker: 'AI Prospect - Jennifer Chen',
		initials: 'JC',
		role: 'VP of Sales',
		company: 'TechCorp Inc.',
		time: '03:15',
		text: 'Interesting. What kind of results are other companies seeing? Do you have any case studies?',
		isAI: true,
		sentiment: 'interested',
		coachingPoints: [
			{
				type: 'opportunity',
				text: 'Request for social proof',
				action: 'Share specific customer success story with similar profile'
			}
		]
	},
	{
		id: 12,
		speaker: 'You',
		initials: 'ME',
		time: '03:35',
		text: 'Absolutely. We work with a SaaS company similar to yours—30 rep team, similar deal sizes. They cut ramp time from 6 months to 2.5 months and saw a 47% increase in new rep productivity within the first quarter.',
		isAI: false,
		score: 93,
		feedback: 'Perfect! Specific, relevant case study with metrics.',
		strengths: ['Relevant social proof', 'Specific metrics', 'Similar company profile'],
		improvements: []
	}
];

export const liveCoachingInsights = {
	discovery: {
		title: 'Live Coaching Dashboard',
		overallScore: 91,
		sentiment: 'Positive',
		strengths: [
			'Strong discovery questions',
			'Effective value quantification',
			'Good active listening',
			'Relevant case study usage'
		],
		improvements: [
			'Ask permission before presenting solution',
			'Dig deeper on budget and timeline',
			'Identify other stakeholders early'
		],
		keyMetrics: [
			{ label: 'Talk/Listen Ratio', value: '35/65', status: 'good', target: '30/70' },
			{ label: 'Questions Asked', value: '8', status: 'good', target: '6-10' },
			{ label: 'Value Statements', value: '3', status: 'average', target: '4+' },
			{ label: 'Pain Points Identified', value: '2', status: 'good', target: '2-3' }
		],
		nextSteps: [
			'Schedule technical demo with their team',
			'Send ROI calculator with their specific numbers',
			'Introduce to customer success manager',
			'Identify decision-making process and timeline'
		]
	}
};





