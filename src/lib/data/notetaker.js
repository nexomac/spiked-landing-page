// Notetaker templates and custom goals data
export const templates = [
	{
		id: 'summary',
		icon: 'FileText',
		title: 'Meeting Summary',
		description: 'Generate comprehensive meeting summaries with action items',
		color: 'from-blue-500 to-blue-600'
	},
	{
		id: 'stakeholder',
		icon: 'Users',
		title: 'Stakeholder Mapping',
		description: 'Map and analyze key stakeholder relationships',
		color: 'from-green-500 to-green-600'
	},
	{
		id: 'battle-card',
		icon: 'Target',
		title: 'Battle Card Intelligence',
		description: 'Competitive intelligence and positioning',
		color: 'from-red-500 to-red-600'
	},
	{
		id: 'playbook',
		icon: 'Brain',
		title: 'MEDDIC Framework',
		description: 'Qualification framework analysis',
		color: 'from-purple-500 to-purple-600'
	},
	{
		id: 'crm-sync',
		icon: 'Activity',
		title: 'CRM Sync Studio',
		description: 'Synchronize and optimize CRM data',
		color: 'from-cyan-500 to-cyan-600'
	},
	{
		id: 'deal-health',
		icon: 'TrendingUp',
		title: 'Deal Health Monitor',
		description: 'Track and monitor deal progression',
		color: 'from-orange-500 to-orange-600'
	},
	{
		id: 'followup',
		icon: 'Mail',
		title: 'Follow-Up Email',
		description: 'Craft personalized follow-up emails',
		color: 'from-pink-500 to-pink-600'
	},
	{
		id: 'executive',
		icon: 'FileSearch',
		title: 'Executive Briefing',
		description: 'Generate executive summaries and briefs',
		color: 'from-indigo-500 to-indigo-600'
	}
];

export const customGoals = [
	{ 
		id: 'status of jira',
		title: 'Jira Status Tracker',
		description: 'Monitor project status and ticket progress',
		triggers: ['jira', 'tickets', 'status']
	},
	{ 
		id: 'economic buyer',
		title: 'Economic Buyer Identification',
		description: 'Identify decision makers and budget holders',
		triggers: ['budget', 'decision', 'authority']
	},
	{ 
		id: 'dhruv chirag working',
		title: 'Team Activity Monitor',
		description: 'Track what team members are working on',
		triggers: ['working on', 'assigned', 'task']
	},
	{ 
		id: 'owner notetaker',
		title: 'Project Ownership',
		description: 'Identify project owners and stakeholders',
		triggers: ['owner', 'responsible', 'lead']
	}
];




