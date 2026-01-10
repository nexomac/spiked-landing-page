import { getSocialQueue, getSocialHistory, addToQueue, updateQueueItem, deleteQueueItem, approveItem, markAsPublished } from '$lib/social';
import { getBlogs, getBlog } from '$lib/cms';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '$env/static/private';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function load() {
    const queueRaw = await getSocialQueue();
    const historyRaw = await getSocialHistory();
    
    // Serialize ObjectIds to strings for SvelteKit
    const queue = queueRaw.map(item => ({ ...item, _id: item._id.toString() }));
    const history = historyRaw.map(item => ({ ...item, _id: item._id.toString() }));
    
    // Fetch blogs for selection context
    const blogsRaw = await getBlogs();
    const blogs = blogsRaw.map(b => ({ title: b.title, slug: b.slug }));

    return { queue, history, blogs };
}

export const actions = {
    addToQueue: async ({ request }) => {
        const data = await request.formData();
        const content = data.get('content');
        const type = data.get('type');
        const tone = data.get('tone');
        const sourceUrl = data.get('sourceUrl');
        const blogSlug = data.get('blogSlug');
        const scheduledFor = data.get('scheduledFor');
        
        // Basic validation
        if (!content && !sourceUrl) {
            return { success: false, error: 'Content or Source URL is required' };
        }

        await addToQueue({
            content, 
            type,
            tone,
            sourceType: blogSlug ? 'blog' : sourceUrl ? 'url' : 'manual',
            sourceUrl,
            blogSlug,
            scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
            author: 'user', // Manual add is user
            accountHandle: 'SpikedAI'
        });
        
        return { success: true };
    },
    
    update: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const content = data.get('content');
        const scheduledFor = data.get('scheduledFor');
        
        const updateData = { content };
        if (scheduledFor) {
            updateData.scheduledFor = new Date(scheduledFor);
        }

        await updateQueueItem(id, updateData);
        return { success: true };
    },
    
    approve: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        
        await approveItem(id);
        return { success: true };
    },
    
    delete: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        
        await deleteQueueItem(id);
        return { success: true };
    },

    generate: async ({ request }) => {
        const data = await request.formData();
        const prompt = data.get('prompt') || '';
        const blogSlug = data.get('blogSlug');
        const sourceUrl = data.get('sourceUrl');
        const type = data.get('type') || 'single post';
        const tone = data.get('tone') || 'neutral';
        const image = data.get('image');

        let contextText = `User Request: Create a ${tone} ${type} for X (Twitter). \nPrompt: ${prompt}\n`;

        // 1. Fetch Blog Context
        if (blogSlug) {
            const blog = await getBlog(blogSlug);
            if (blog) {
                // Simplified content extraction
                const contentStr = JSON.stringify(blog.content); 
                contextText += `\n\nReference Blog Content: Title: ${blog.title}\nContent: ${contentStr.slice(0, 5000)}`; // Truncate to avoid context limits
            }
        }

        // 2. Add Source URL
        if (sourceUrl) {
            contextText += `\n\nReference URL: ${sourceUrl}`;
        }

        // 3. Prepare Gemini Parts
        const parts = [{ text: contextText }];

        // 4. Handle Image
        if (image && image.size > 0) {
            const arrayBuffer = await image.arrayBuffer();
            const base64Image = Buffer.from(arrayBuffer).toString('base64');
            const mimeType = image.type;

            parts.push({
                inlineData: {
                    data: base64Image,
                    mimeType
                }
            });
        }

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
            const result = await model.generateContent({
                contents: [{ role: 'user', parts }]
            });

            const generatedContent = result.response.text();
            
            // Return request data back to populate the form fields again so user doesn't lose inputs
            return { 
                success: true, 
                generatedContent,
                context: {
                    prompt,
                    blogSlug,
                    sourceUrl,
                    type,
                    tone,
                    sourceType: blogSlug ? 'blog' : sourceUrl ? 'url' : 'manual',
                    author: 'ai'
                }
            };
        } catch (e) {
            console.error('AI Generation Error:', e);
            return { 
                success: false, 
                error: 'AI Generation Failed: ' + e.message,
                context: { prompt, blogSlug, sourceUrl, type, tone }
            };
        }
    },

    publish: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');

        // Simulate API network delay (1-3 seconds)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock Success/Failure (90% success rate)
        const isSuccess = Math.random() > 0.1;

        if (isSuccess) {
            const mockTweetId = Math.floor(Math.random() * 1000000000000000);
            const mockUrl = `https://twitter.com/SpikedAI/status/${mockTweetId}`;
            
            await markAsPublished(id, {
                platform: 'X',
                externalId: mockTweetId.toString(),
                publishedUrl: mockUrl,
                postedBy: 'admin_manual_publish'
            });

            return { success: true, publishedUrl: mockUrl };
        } else {
            return { success: false, error: 'X API Error: Rate limit exceeded or network timeout (Mock).' };
        }
    }
};
