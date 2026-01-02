import { getNewsletters, getBlogs, createNewsletter, updateNewsletter, createBlog } from '$lib/cms';
import { fail, redirect } from '@sveltejs/kit';

export async function load() {
    const [newsletters, blogs] = await Promise.all([
        getNewsletters(),
        getBlogs()
    ]);
    
    return {
        newsletters: newsletters.map(n => ({ ...n, _id: n._id.toString() })),
        blogs: blogs.map(b => ({ ...b, _id: b._id.toString() }))
    };
}

export const actions = {
    createNewsletter: async ({ request }) => {
        const data = await request.formData();
        const title = data.get('title');
        const description = data.get('description');
        const slug = data.get('slug');

        if (!title || !slug) {
            return fail(400, { missing: true });
        }

        try {
            await createNewsletter({ title, description, slug });
            return { success: true };
        } catch (e) {
            return fail(500, { error: e.message });
        }
    },
    updateNewsletter: async ({ request }) => {
        const data = await request.formData();
        const id = data.get('id');
        const title = data.get('title');
        const description = data.get('description');
        const slug = data.get('slug');

        if (!id || !title || !slug) {
            return fail(400, { missing: true });
        }

        try {
            await updateNewsletter(id, { title, description, slug });
            return { success: true };
        } catch (e) {
            return fail(500, { error: e.message });
        }
    },
    createBlog: async ({ request }) => {
        const data = await request.formData();
        // Create draft blog with defaults
        const result = await createBlog({
            title: 'Untitled Post',
            author: 'Editorial Staff',
            slug: `post-${Date.now()}` // Temporary slug
        });
        
        // Redirect to editor using the new slug (which was just generated/returned if I updated createBlog to return it... wait, createBlog returns insert result)
        // I need to use the slug I generated.
        // Wait, createBlog in cms.js:
        // const blogData = { slug: data.slug || ... }
        // return await db.collection('blogs').insertOne(blogData);
        // insertOne returns { insertedId: ... }
        // It doesn't return the full object.
        // So I should generate slug here to know it.
        
        // Let's refine the logic inside the action:
        const slug = `post-${Date.now()}`;
        
        try {
             await createBlog({
                title: 'Untitled Post',
                author: 'Editorial Staff',
                slug
            });
        } catch (e) {
             return fail(500, { error: e.message });
        }
        
        throw redirect(303, `/admin/editor/${slug}`);
    }
};
