import { getEntry, getContentModel, updateEntry, deleteEntry } from '$lib/cms';
import { error, redirect } from '@sveltejs/kit';
import { requireAuth } from '$lib/server/auth';

export async function load({ params }) {
    const entry = await getEntry(params.entryId);
    const model = await getContentModel(params.modelSlug);

    if (!entry || !model) throw error(404, 'Not found');

    return {
        entry: { ...entry, _id: entry._id.toString() },
        model: { ...model, _id: model._id.toString() }
    };
}

export const actions = {
    save: async ({ request, params, cookies }) => {
        requireAuth(cookies);
        const formData = await request.formData();
        const status = formData.get('status'); // 'draft' or 'live'
        
        // Fetch existing entry to merge data (preserves fields not in the form)
        const existingEntry = await getEntry(params.entryId);
        const existingData = existingEntry ? existingEntry.data : {};

        // Convert FormData to Object
        const incomingData = {};
        for (const [key, value] of formData.entries()) {
            if (key !== 'status') {
                // Remove any 'richtext_' prefix if present (handled in UI)
                const cleanKey = key.replace('richtext_', '');
                
                if (key.startsWith('richtext_')) {
                    try {
                        incomingData[cleanKey] = JSON.parse(value);
                    } catch (e) {
                         // fallback
                    }
                } else {
                    incomingData[cleanKey] = value;
                }
            }
        }
        
        // Merge: Existing fields + New fields (New overwrites Old)
        const mergedData = { ...existingData, ...incomingData };

        await updateEntry(params.entryId, mergedData, status);

        return { success: true };
    },

    delete: async ({ params, cookies }) => {
        requireAuth(cookies);
        await deleteEntry(params.entryId);
        throw redirect(303, `/admin/entries/${params.modelSlug}`);
    }
};
