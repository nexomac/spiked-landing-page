import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST({ request, cookies }) {
    if (!GEMINI_API_KEY) {
        return json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    const { modelSlug, prompt } = await request.json();

    const authCookie = cookies.get('admin_session');
    if (authCookie !== 'true') {
        return json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!modelSlug || !prompt) {
        return json({ error: 'Missing modelSlug or prompt' }, { status: 400 });
    }

    try {
        // Blog Editor Block Generation
        if (modelSlug === 'blog') {
             const systemInstruction = `
                You are a helper for a Blog Editor.
                Your task is to generate a JSON array of content blocks for a blog post based on the User Request.
                
                The output must be a valid JSON Array where each item is a Block Object.
                
                Block Types & Schemas:
                1. Header: { "id": "uuid", "type": "header", "data": { "text": "Section Title", "level": 2 } }
                2. RichText: { "id": "uuid", "type": "richtext", "data": { "html": { "type": "doc", "content": [...] } } } - Use this for the main body content. Ensure it uses valid Tiptap/ProseMirror JSON structure.
                3. Quote: { "id": "uuid", "type": "quote", "data": { "text": "Quote body", "author": "Author Name", "authorUrl": "https://twitter.com/author" } }
                4. Statistic: { "id": "uuid", "type": "statistics", "data": { "label": "Growth", "value": "50%" } }
                5. Image: { "id": "uuid", "type": "image", "data": { "url": "https://images.unsplash.com/photo-1677442136019-21780ecad995", "caption": "AI analysis visualization" } }

                Rules:
                - Use 'richtext' for sections requiring formatting (bold, lists, etc).
                - Use 'header' for transitions between major segments.
                - Use 'statistics' to highlight key data points from the request.
                - For IDs, use any unique random string.
                - Return purely the JSON array.
            `;

            const aiModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
            const result = await aiModel.generateContent({
                contents: [{ role: 'user', parts: [{ text: systemInstruction + "\nUser Request: " + prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            });

            const text = result.response.text();
            let generatedBlocks;
            try {
                generatedBlocks = JSON.parse(text);
            } catch {
                generatedBlocks = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
            }

            // Return content directly for the editor to consume
            return json({ success: true, blocks: generatedBlocks });
        }

        return json({ error: 'Invalid model type' }, { status: 400 });

    } catch (e) {
        console.error('AI Generation Error:', e);
        return json({ error: e.message || 'Failed to generate content' }, { status: 500 });
    }
}
