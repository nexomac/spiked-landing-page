import { getContentModel } from '$lib/cms';
import { getDb } from '$lib/db';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const model = await getContentModel(params.slug);
    if (!model) throw error(404, 'Model not found');
    return { 
        model: { ...model, _id: model._id.toString() } 
    };
}

export const actions = {
    addField: async ({ request, params }) => {
        const data = await request.formData();
        const fieldName = data.get('fieldName');
        const fieldType = data.get('fieldType'); // text, richtext, image, date
        const fieldSlug = fieldName.toLowerCase().replace(/[^a-z0-9]/g, '-');

        if (!fieldName) return;

        const db = await getDb();
        await db.collection('content_models').updateOne(
            { slug: params.slug },
            { 
                $push: { 
                    fields: { 
                        name: fieldName, 
                        type: fieldType, 
                        slug: fieldSlug,
                        required: false 
                    } 
                } 
            }
        );
        return { success: true };
    },
    removeField: async ({ request, params }) => {
        const data = await request.formData();
        const fieldSlug = data.get('fieldSlug');
        
        const db = await getDb();
        await db.collection('content_models').updateOne(
            { slug: params.slug },
            { $pull: { fields: { slug: fieldSlug } } }
        );
        return { success: true };
    },
    updateFieldType: async ({ request, params }) => {
        const data = await request.formData();
        const fieldSlug = data.get('fieldSlug');
        const newType = data.get('newType');

        if (!fieldSlug || !newType) return;

        const db = await getDb();
        // Use the positional operator $ to identify the element in the array to update
        await db.collection('content_models').updateOne(
            { slug: params.slug, 'fields.slug': fieldSlug },
            { $set: { 'fields.$.type': newType } }
        );
        return { success: true };
    }
};
