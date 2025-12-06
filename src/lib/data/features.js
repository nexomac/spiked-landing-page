import { Sparkles, MessageSquare, Calendar, Users, GitBranch, BarChart3, Heart, Settings } from 'lucide-svelte';

export const features = [
    {
        id: 'ai-assistance',
        title: 'AI Assistance',
        icon: Sparkles,
        fullTitle: 'Real-Time Spiked AI Assistance',
        subtitle: 'Based on Your Sales and Solutions Docs',
        description: 'Get instant, contextual answers during your sales calls. Our AI analyzes your product documentation, case studies, and sales materials in real-time to provide accurate responses exactly when you need them.',
        features: [
            'Instant answers from your knowledge base',
            'Context-aware suggestions during conversations',
            'Semantic search across all documents',
            'Auto-generated talking points',
            'Real-time fact-checking and validation'
        ],
        href: '/features/ai-assistance'
    },
    {
        id: 'notetaker',
        title: 'Notetaker',
        icon: MessageSquare,
        fullTitle: 'Smart Notetaker',
        subtitle: 'With Spiked AI Conversational Intelligence',
        description: 'Automatically capture, transcribe, and analyze every conversation. Our AI-powered notetaker identifies key moments, action items, and insights while you focus on building relationships.',
        features: [
            'Real-time transcription with speaker identification',
            'Automatic action item extraction',
            'Key moment highlighting and tagging',
            'Conversational analytics and insights',
            'Smart search across all meetings'
        ],
        href: '/features/notetaker'
    },
    {
        id: 'followup',
        title: 'Follow-Up',
        icon: Calendar,
        fullTitle: 'Follow-Up Meeting Preparation',
        subtitle: 'Using Spiked AI Memory and RAG',
        description: 'Never walk into a meeting unprepared. Spiked AI remembers every detail from past conversations and automatically prepares personalized briefings for your follow-up meetings.',
        features: [
            'Automatic meeting summaries and action items',
            'Contextual briefings for follow-ups',
            'Historical conversation analysis',
            'Smart reminder system',
            'Personalized preparation materials'
        ],
        href: '/features/followup'
    },
    {
        id: 'simulator',
        title: 'Simulator',
        icon: Users,
        fullTitle: 'Meeting Simulator and Coaching',
        subtitle: 'Practice Makes Perfect',
        description: 'Run realistic sales simulations with AI-powered prospect personas and get instant feedback on your pitch, objection handling, and closing techniques.',
        features: [
            'AI-powered prospect simulations',
            'Real-time performance feedback',
            'Objection handling practice',
            'Personalized coaching insights',
            'Progress tracking and analytics'
        ],
        href: '/features/simulator'
    },
    {
        id: 'dev-integrations',
        title: 'Dev Tools',
        icon: GitBranch,
        fullTitle: 'Developer Tools Integration',
        subtitle: 'Jira, Asana for Dev Teams',
        description: 'Seamlessly connect your sales conversations with your development workflow. Automatically create tickets, sync timelines, and keep technical teams aligned with customer needs.',
        features: [
            'Direct Jira and Asana integration',
            'Auto-create tickets from customer requests',
            'Sync project timelines with sales commitments',
            'Technical requirement extraction',
            'Development status updates in meetings'
        ],
        href: '/features/dev-tools'
    },
    {
        id: 'crm-integrations',
        title: 'CRM',
        icon: BarChart3,
        fullTitle: 'CRM Integration',
        subtitle: 'Zoho, Salesforce, and More',
        description: 'Keep your CRM updated automatically. Every conversation, insight, and action item is synced in real-time to your CRM, ensuring your sales data is always accurate and up-to-date.',
        features: [
            'Bi-directional sync with major CRMs',
            'Automatic contact and deal updates',
            'Meeting notes and transcripts in CRM',
            'AI-generated next steps and tasks',
            'Custom field mapping and workflows'
        ],
        href: '/features/crm'
    },
    {
        id: 'sentiment',
        title: 'Sentiment',
        icon: Heart,
        fullTitle: 'Real-Time Sentiment Analysis',
        subtitle: 'And Feedback on Sales Performance',
        description: 'Read the room with AI-powered sentiment analysis. Get instant feedback on how your prospect is feeling, identify buying signals, and know exactly when to push or when to address concerns.',
        features: [
            'Real-time emotion detection',
            'Buying signal identification',
            'Objection and concern alerts',
            'Engagement level tracking',
            'Post-call sentiment reports'
        ],
        href: '/features/sentiment'
    },
    {
        id: 'custom',
        title: 'Custom Goals',
        icon: Settings,
        fullTitle: 'Custom Meeting Goals',
        subtitle: 'And Advanced Configuration',
        description: 'Tailor Spiked AI to your unique sales process. Set custom goals, create personalized playbooks, and configure the AI to match your team\'s methodology and terminology.',
        features: [
            'Custom goal templates and tracking',
            'Personalized sales playbooks',
            'Custom AI training on your methodology',
            'Configurable alerts and notifications',
            'White-label options for enterprise'
        ],
        href: '/features/custom-goals'
    }
];
