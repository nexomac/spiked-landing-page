import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { createEntry, getContentModel } from '$lib/cms';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST({ request }) {
    if (!GEMINI_API_KEY) {
        return json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    const { modelSlug, prompt } = await request.json();

    if (!modelSlug || !prompt) {
        return json({ error: 'Missing modelSlug or prompt' }, { status: 400 });
    }

    try {
        // 1. Fetch the Content Model to understand the schema
        const model = await getContentModel(modelSlug);
        if (!model) {
            return json({ error: 'Model not found' }, { status: 404 });
        }

        // 2. Construct the prompt for Gemini
        const fieldDescriptions = model.fields.map(f => `${f.name} (${f.type})`).join(', ');
        
        const systemInstruction = `
            You are a CMS Content Generator agent. 
            Your task is to generate valid JSON content for a headless CMS based on a user's prompt.
            
            The Content Model has the following fields: ${fieldDescriptions}.
            
            Rules:
            1. Return ONLY a valid JSON object. Do not include markdown formatting (like \`\`\`json).
            2. For 'richtext' fields, generate a simple Tiptap JSON structure (type: 'doc', content: [...]).
            3. For 'text' fields, generate plain strings.
            4. For 'date' fields, MUST use ISO 8601 format (YYYY-MM-DD). this is critical.
            5. For 'image' fields, provide a VALID, working public URL. Use 'https://placehold.co/800x400' or a specific unsplash source url like 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop'. Do NOT use fake paths.
            6. Ensure the content matches the tone and intent of the user's prompt.
            7. If the user asks for a specific title, use it.
        `;

        const userPrompt = `Generate a blog post entry for the '${model.name}' model. \nUser Request: ${prompt}`;

        // 3. Call Gemini API
        // Using gemini-2.5-flash as requested.
        const aiModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const result = await aiModel.generateContent({
            contents: [{ role: 'user', parts: [{ text: systemInstruction + "\n" + userPrompt }] }],
            generationConfig: {
                responseMimeType: "application/json"
            }
        });

        const responseText = result.response.text();
        let generatedData;
        
        try {
            generatedData = JSON.parse(responseText);
        } catch (e) {
            // Fallback cleanup if model adds markdown despite instructions
            const cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            generatedData = JSON.parse(cleanText);
        }

        // 4. Create the Draft Entry
        const resultEntry = await createEntry(modelSlug, generatedData);

        return json({ success: true, entryId: resultEntry.insertedId.toString() });

    } catch (e) {
        console.error('AI Generation Error:', e);
        return json({ error: e.message || 'Failed to generate content' }, { status: 500 });
    }
}
