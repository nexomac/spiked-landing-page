import { getContentModel, getEntries, createEntry } from '$lib/cms';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const model = await getContentModel(params.modelSlug); // e.g. 'blog-post'
    if (!model) throw error(404, 'Model not found');
    
    const entries = await getEntries(params.modelSlug);
    
    return {
        model: { ...model, _id: model._id.toString() },
        entries: entries.map(e => ({ ...e, _id: e._id.toString() }))
    };
}

export const actions = {
    createDraft: async ({ params }) => {
        // Create an empty draft
        const result = await createEntry(params.modelSlug, {});
        throw redirect(303, `/admin/editor/${params.modelSlug}/${result.insertedId.toString()}`);
    }
};
