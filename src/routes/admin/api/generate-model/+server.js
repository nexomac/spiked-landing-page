import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { createContentModel } from '$lib/cms';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST({ request }) {
    if (!GEMINI_API_KEY) {
        return json({ error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    const { prompt } = await request.json();

    if (!prompt) {
        return json({ error: 'Missing prompt' }, { status: 400 });
    }

    try {
        const systemInstruction = `
            You are a CMS Schema Architect.
            Your task is to generate a valid JSON Content Model definition based on a user's request.
            
            Output strictly valid JSON with this structure:
            {
                "name": "Display Name",
                "slug": "url-slug",
                "fields": [
                    { "name": "Title", "type": "text", "required": true, "slug": "title" },
                    { "name": "Slug", "type": "text", "required": true, "slug": "slug" },
                    ... other fields based on request ...
                ]
            }

            Supported field types: 'text', 'richtext', 'date', 'image'.
            
            Rules:
            1. Always include 'Title' and 'Slug' fields as the first two items.
            2. Infer appropriate fields for the requested topic (e.g. if 'Event', add Date, Location).
            3. Use lowercase slugs for fields.
            4. No markdown formatting.
        `;

        const userPrompt = `Create a content model for: ${prompt}`;

        const aiModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const result = await aiModel.generateContent({
             contents: [{ role: 'user', parts: [{ text: systemInstruction + "\n" + userPrompt }] }],
             generationConfig: { responseMimeType: "application/json" }
        });

        const responseText = result.response.text();
        let modelDef;
        try {
             modelDef = JSON.parse(responseText);
        } catch (e) {
             const cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
             modelDef = JSON.parse(cleanText);
        }

        // Create the model in DB
        const resultDb = await createContentModel(modelDef);

        return json({ success: true, slug: modelDef.slug });

    } catch (e) {
        console.error('AI Model Gen Error:', e);
        return json({ error: e.message }, { status: 500 });
    }
}
