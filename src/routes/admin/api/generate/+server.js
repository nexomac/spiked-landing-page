import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import { createEntry, getContentModel } from '$lib/cms';

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
        // NEW: Blog Editor Block Generation
        if (modelSlug === 'blog') {
             const systemInstruction = `
                You are a helper for a Blog Editor.
                Your task is to generate a JSON array of content blocks for a blog post based on the User Request.
                
                The output must be a valid JSON Array where each item is a Block Object.
                
                Block Types & Schemas:
                1. Header: { "id": "uuid", "type": "header", "data": { "text": "Section Title", "level": 2 } }
                2. Text: { "id": "uuid", "type": "text", "data": { "content": "Paragraph text..." } }
                3. Quote: { "id": "uuid", "type": "quote", "data": { "text": "Quote body", "author": "Author Name" } }
                4. Statistic: { "id": "uuid", "type": "statistics", "data": { "label": "Growth", "value": "50%" } }
                5. Image: { "id": "uuid", "type": "image", "data": { "url": "https://placeholder.com/image.jpg", "caption": "Description" } }

                Rules:
                - Generate a comprehensive article structure logic.
                - Use multiple text blocks for long content.
                - Intersperse headers, quotes, and statistics where relevant.
                - For IDs, use any random string.
                - Do NOT use markdown. Return purely the JSON array.
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


        // OLD: Legacy Content Model Entry Generation
        // 1. Fetch the Content Model to understand the schema
        const model = await getContentModel(modelSlug);
        if (!model) {
            return json({ error: 'Model not found' }, { status: 404 });
        }

        // 2. Construct the prompt for Gemini
        const fieldList = model.fields.map(f => `- ${f.slug} (${f.type}): ${f.name}`).join('\n');
        
        const systemInstruction = `
            You are a CMS Content Generator agent. 
            Your task is to generate valid JSON content for a headless CMS entry.
            
            IMPORTANT: You MUST use the following slugs as the ONLY keys in your JSON object:
            ${fieldList}
            
            Rules:
            1. Return ONLY a valid JSON object.
            2. For every key in the JSON, it MUST exactly match one of the slugs provided above. Do NOT use the display names as keys.
            3. For 'richtext' fields, generate a Tiptap JSON structure (typeof: 'doc', content: [...]). Use H2, H3, bold, bullet lists, and blockquotes.
            4. For 'text' fields, generate plain strings.
            5. For 'statistic' fields, use "Label|Value" format (e.g. "Growth|95%"). The Value part MUST be a percentage.
            6. For 'date' fields, use ISO 8601 format (YYYY-MM-DD). Only mention the field name as 'publishedDate', use the current date ${new Date().toISOString().split('T')[0]}.
            7. For 'link' fields, provide a valid URL.
            8. For 'callout' fields, provide a short, punchy sentence.
            9. For 'divider' fields, use "---".
            10. For 'image' fields, provide an empty string "".
            11. Ensure the content matches the tone of the request: ${prompt}.
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
