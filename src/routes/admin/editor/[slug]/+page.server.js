import { getBlog, updateBlog } from '$lib/cms';
import { getDb } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const blog = await getBlog(params.slug);
    const newsletters = await getDb().then(db => db.collection('newsletters').find({}).toArray());
    
    if (!blog) {
        throw redirect(302, '/admin');
    }

    return {
        blog: {
            ...blog,
            _id: blog._id.toString(),
            newsletterIds: blog.newsletterIds || (blog.newsletterId ? [blog.newsletterId] : []),
            coverImage: blog.coverImage || ''
        },
        newsletters: newsletters.map(n => ({ ...n, _id: n._id.toString() }))
    };
}

export const actions = {
    save: async ({ request, params }) => {
        const formData = await request.formData();
        const json = formData.get('data');
        
        if (!json) {
            return fail(400, { missing: true });
        }

        try {
            const data = JSON.parse(json);
            await updateBlog(params.slug, data);
            return { success: true };
        } catch (e) {
            console.error(e);
            return fail(500, { error: e.message });
        }
    },

    uploadImage: async ({ request }) => {
        const formData = await request.formData();
        const file = formData.get('file');
        
        if (!file || !(file instanceof File)) {
            return fail(400, { error: 'No file provided' });
        }

        try {
            const buffer = await file.arrayBuffer();
            const base64 = Buffer.from(buffer).toString('base64');
            const dataUri = `data:${file.type};base64,${base64}`;
            
            // In a real app with Mongo GridFS, we'd stream this. 
            // Here we return data URI for direct embedding as requested.
            return { success: true, url: dataUri };
        } catch (e) {
            return fail(500, { error: e.message });
        }
    }
};
