import { getContentModel, getEntries, createEntry } from '$lib/cms';
import { error, redirect } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';

export async function load({ params }) {
    // ... load is protected by layout, but explicit check doesn't hurt. 
    // Actually layout handles load.
    const model = await getContentModel(params.modelSlug); // e.g. 'blog-post'
    if (!model) throw error(404, 'Model not found');
    
    const entries = await getEntries(params.modelSlug);
    
    return {
        model: { ...model, _id: model._id.toString() },
        entries: entries.map(e => ({ ...e, _id: e._id.toString() }))
    };
}

export const actions = {
    createDraft: async ({ params, cookies }) => {
        requireAuth(cookies);
        // Create an empty draft
        const result = await createEntry(params.modelSlug, {});
        throw redirect(303, `/admin/editor/${params.modelSlug}/${result.insertedId.toString()}`);
    }
};
