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
        const formData = await request.formData();
        const jsonStr = formData.get('json');
        
        let initialData = {
            title: 'Untitled Post',
            author: 'Editorial Staff',
            content: []
        };

        // Utility to clean strings of [text](url) pattern if text and url are the same or just clean it
        function cleanString(val) {
            if (typeof val !== 'string') return val;
            // Matches [something](url)
            return val.replace(/\[(.*?)\]\((.*?)\)/g, (match, text, url) => {
                return url || text;
            });
        }

        function cleanObject(obj) {
            if (!obj || typeof obj !== 'object') return obj;
            if (Array.isArray(obj)) return obj.map(cleanObject);
            const newObj = {};
            for (const key in obj) {
                newObj[key] = typeof obj[key] === 'string' ? cleanString(obj[key]) : cleanObject(obj[key]);
            }
            return newObj;
        }

        if (jsonStr) {
            try {
                let parsed = JSON.parse(jsonStr);
                parsed = cleanObject(parsed); // Clean markdown links from LLM/Copy-paste

                if (Array.isArray(parsed)) {
                    // It's a list of blocks
                    initialData.content = parsed;
                } else {
                    // It's a full blog object
                    initialData = { ...initialData, ...parsed };
                }

                // If no title was provided in JSON, try to extract it from content
                if (initialData.title === 'Untitled Post' && initialData.content.length > 0) {
                    const firstHeader = initialData.content.find(b => b.type === 'header');
                    if (firstHeader && firstHeader.data && firstHeader.text) {
                        initialData.title = firstHeader.text;
                    } else if (firstHeader && firstHeader.data && firstHeader.data.text) {
                        initialData.title = firstHeader.data.text;
                    }
                }
            } catch (e) {
                console.error('Import Error:', e);
                return fail(400, { error: 'Invalid JSON data: ' + e.message });
            }
        }

        // Generate slug if not in initialData
        const slug = initialData.slug || `post-${Date.now()}`;
        initialData.slug = slug;

        try {
             await createBlog(initialData);
        } catch (e) {
             return fail(500, { error: e.message });
        }
        
        throw redirect(303, `/admin/editor/${slug}`);
    }
};
