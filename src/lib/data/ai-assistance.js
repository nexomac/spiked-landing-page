// Dialogue data with questions and AI responses for AI Assistance showcase
export const dialogues = [
	{
		id: 1,
		speaker: 'Sarah Peterson',
		initials: 'SP',
		time: '10:30 AM',
		text: 'Hi! Thanks for taking the time to speak with me today.',
		isUser: false,
		color: 'blue'
	},
	{
		id: 2,
		speaker: 'You',
		initials: 'ME',
		time: '10:30 AM',
		text: 'Of course! I\'m excited to learn more about your team and see how we can help.',
		isUser: true,
		color: 'green'
	},
	{
		id: 3,
		speaker: 'Sarah Peterson',
		initials: 'SP',
		time: '10:31 AM',
		text: 'So we\'re a Series B company with about 50 sales reps, and we\'re looking to scale our sales operations. Right now, our biggest challenge is consistency across the team.',
		isUser: false,
		color: 'blue'
	},
	{
		id: 4,
		speaker: 'You',
		initials: 'ME',
		time: '10:31 AM',
		text: 'That\'s a common challenge at your stage. What does inconsistency look like for your team specifically?',
		isUser: true,
		color: 'green'
	},
	{
		id: 5,
		speaker: 'Sarah Peterson',
		initials: 'SP',
		time: '10:32 AM',
		text: 'Well, our top performers close at 28%, but most of the team is around 12-15%. We think it\'s because newer reps just don\'t have the product knowledge yet.',
		isUser: false,
		color: 'blue'
	},
	{
		id: 6,
		speaker: 'You',
		initials: 'ME',
		time: '10:32 AM',
		text: 'That makes sense. How long does it typically take for a new rep to ramp up?',
		isUser: true,
		color: 'green'
	},
	{
		id: 7,
		speaker: 'Sarah Peterson',
		initials: 'SP',
		time: '10:33 AM',
		text: 'About 4-5 months before they\'re really productive. Which is honestly too long.',
		isUser: false,
		color: 'blue'
	},
	{
		id: 8,
		speaker: 'You',
		initials: 'ME',
		time: '10:33 AM',
		text: 'Definitely. Our customers typically see ramp time cut in half with real-time AI assistance during calls.',
		isUser: true,
		color: 'green'
	},
	{
		id: 9,
		speaker: 'Sarah Peterson',
		initials: 'SP',
		time: '10:34 AM',
		text: 'That sounds promising. We\'re actually evaluating a few different tools. Can you walk me through how your pricing compares to Gong or Chorus?',
		isUser: false,
		color: 'blue',
		isQuestion: true,
		questionType: 'pricing'
	},
	{
		id: 10,
		speaker: 'You',
		initials: 'ME',
		time: '10:34 AM',
		text: 'Great question. Let me pull up our competitive comparison for you...',
		isUser: true,
		color: 'green'
	},
	{
		id: 11,
		speaker: 'Sarah Peterson',
		initials: 'SP',
		time: '10:35 AM',
		text: 'Also, what kind of ROI are your customers typically seeing?',
		isUser: false,
		color: 'blue',
		isQuestion: true,
		questionType: 'roi'
	},
	{
		id: 12,
		speaker: 'You',
		initials: 'ME',
		time: '10:35 AM',
		text: 'Let me share some specific data on that...',
		isUser: true,
		color: 'green'
	},
	{
		id: 13,
		speaker: 'Sarah Peterson',
		initials: 'SP',
		time: '10:36 AM',
		text: 'Interesting. How does the onboarding process work? I want to make sure we don\'t disrupt our team too much.',
		isUser: false,
		color: 'blue'
	},
	{
		id: 14,
		speaker: 'You',
		initials: 'ME',
		time: '10:36 AM',
		text: 'The onboarding is actually very lightweight. Most teams are up and running within a week.',
		isUser: true,
		color: 'green'
	},
	{
		id: 15,
		speaker: 'Sarah Peterson',
		initials: 'SP',
		time: '10:37 AM',
		text: 'What about data security? We handle sensitive customer information.',
		isUser: false,
		color: 'blue',
		isQuestion: true,
		questionType: 'security'
	},
	{
		id: 16,
		speaker: 'You',
		initials: 'ME',
		time: '10:37 AM',
		text: 'Security is a top priority for us. Let me explain our compliance...',
		isUser: true,
		color: 'green'
	},
	{
		id: 17,
		speaker: 'Sarah Peterson',
		initials: 'SP',
		time: '10:38 AM',
		text: 'Good to know. Can the AI handle industry-specific terminology? We\'re in healthcare tech.',
		isUser: false,
		color: 'blue',
		isQuestion: true,
		questionType: 'customization'
	},
	{
		id: 18,
		speaker: 'You',
		initials: 'ME',
		time: '10:39 AM',
		text: 'Absolutely, we have several healthcare customers. The AI learns your specific terminology.',
		isUser: true,
		color: 'green'
	},
	{
		id: 19,
		speaker: 'Sarah Peterson',
		initials: 'SP',
		time: '10:40 AM',
		text: 'What kind of integrations do you offer? We use Salesforce and Slack.',
		isUser: false,
		color: 'blue',
		isQuestion: true,
		questionType: 'integrations'
	},
	{
		id: 20,
		speaker: 'You',
		initials: 'ME',
		time: '10:40 AM',
		text: 'Perfect, we integrate with both of those natively.',
		isUser: true,
		color: 'green'
	}
];

// AI Response data for each question type
export const aiResponses = {
	pricing: {
		question: 'How does pricing compare to Gong or Chorus?',
		title: 'Competitive Pricing Comparison',
		description: 'Based on our competitive pricing analysis:',
		points: [
			{ label: 'SpikedAI pricing', value: '$90/user/month (annual)' },
			{ label: 'Gong pricing', value: '$120-150/user/month' },
			{ label: 'Chorus.ai pricing', value: '$100-130/user/month' },
			{ label: 'Our advantage', value: '25-40% cost savings + more features' }
		],
		source: 'Competitive_Pricing_Analysis_2025.pdf',
		timestamp: '10:34 AM'
	},
	roi: {
		question: 'What ROI are customers typically seeing?',
		title: 'Enterprise Customer ROI Results',
		description: 'Based on our 2025 enterprise customer case studies:',
		points: [
			{ label: 'Average deal size increase', value: '23% within first 6 months' },
			{ label: 'Sales cycle reduction', value: '31% shorter time to close' },
			{ label: 'Rep productivity', value: '2.7x more deals per rep per quarter' },
			{ label: 'Ramp time improvement', value: '50% faster time to productivity' }
		],
		source: 'Enterprise_ROI_CaseStudies_2025.pdf',
		timestamp: '10:35 AM'
	},
	security: {
		question: 'What about data security and compliance?',
		title: 'Security & Compliance Overview',
		description: 'Our comprehensive security infrastructure includes:',
		points: [
			{ label: 'Certifications', value: 'SOC 2 Type II, GDPR, HIPAA compliant' },
			{ label: 'Data encryption', value: 'AES-256 at rest, TLS 1.3 in transit' },
			{ label: 'Data residency', value: 'Choose US, EU, or AU data centers' },
			{ label: 'Access controls', value: 'SSO, MFA, role-based permissions' }
		],
		source: 'Security_Compliance_Documentation.pdf',
		timestamp: '10:37 AM'
	},
	customization: {
		question: 'Can AI handle industry-specific terminology?',
		title: 'Custom Industry Training',
		description: 'Our AI customization capabilities include:',
		points: [
			{ label: 'Training approach', value: 'Upload docs, AI learns terminology in 24hrs' },
			{ label: 'Healthcare clients', value: '15+ healthcare tech companies' },
			{ label: 'Accuracy rate', value: '97% with custom terminology' },
			{ label: 'Update frequency', value: 'Real-time sync with knowledge base' }
		],
		source: 'Healthcare_Customer_Success_Stories.pdf',
		timestamp: '10:39 AM'
	},
	integrations: {
		question: 'What integrations do you offer?',
		title: 'Native Integrations Available',
		description: 'Seamless connections with your existing tech stack:',
		points: [
			{ label: 'CRM platforms', value: 'Salesforce, HubSpot, monday.com' },
			{ label: 'Communication', value: 'Slack, MS Teams, Zoom' },
			{ label: 'Setup time', value: 'OAuth connection in under 5 minutes' },
			{ label: 'Custom API', value: 'REST API for custom integrations' }
		],
		source: 'Integration_Documentation.pdf',
		timestamp: '10:40 AM'
	}
};





