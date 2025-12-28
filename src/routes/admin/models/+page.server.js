import { getContentModels, createContentModel } from '$lib/cms';
import { fail } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';

export async function load() {
    const models = await getContentModels();
    return {
        models: models.map(m => ({ ...m, _id: m._id.toString() }))
    };
}

export const actions = {
    create: async ({ request, cookies }) => {
        requireAuth(cookies);
        const data = await request.formData();
        const name = data.get('name');
        const slug = data.get('slug');

        if (!name || !slug) {
            return fail(400, { missing: true });
        }

        try {
            await createContentModel({
                name,
                slug,
                fields: [
                    { name: 'Title', type: 'text', required: true, slug: 'title' }, // Default field
                    { name: 'Slug', type: 'text', required: true, slug: 'slug' }   // Default field
                ]
            });
            return { success: true };
        } catch (e) {
            return fail(500, { error: e.message });
        }
    },
    importJson: async ({ request, cookies }) => {
        requireAuth(cookies);
        const data = await request.formData();
        const jsonContent = data.get('jsonContent');

        if (!jsonContent) {
            return fail(400, { missing: true });
        }

        try {
            const modelDef = JSON.parse(jsonContent);
            if (!modelDef.name || !modelDef.slug || !Array.isArray(modelDef.fields)) {
                return fail(400, { invalidJson: true, error: 'Model must have name, slug, and fields array.' });
            }

            await createContentModel(modelDef);
            return { success: true };
        } catch (e) {
            return fail(400, { invalidJson: true, error: e.message });
        }
    }
};
