import { getBlogs, updateBlog } from '$lib/cms';

export async function load() {
    const blogsRaw = await getBlogs();
    
    // Serialize and ensure youtube object exists
    const blogs = blogsRaw.map(b => ({
        _id: b._id.toString(),
        title: b.title,
        slug: b.slug,
        status: b.status,
        updatedAt: b.updatedAt,
        youtube: b.youtube || { status: 'none' }
    }));

    return { blogs };
}

export const actions = {
    updateYoutubeStatus: async ({ request }) => {
        const data = await request.formData();
        const slug = data.get('slug');
        const status = data.get('status');
        const jobId = data.get('jobId');
        const videoPath = data.get('videoPath');
        const publishedUrl = data.get('publishedUrl');
        const error = data.get('error');

        const blog = await getBlogs().then(blogs => blogs.find(b => b.slug === slug));
        if (!blog) return { success: false, error: 'Blog not found' };

        const youtube = { ...blog.youtube, status };
        if (jobId) youtube.jobId = jobId;
        if (videoPath) youtube.videoPath = videoPath;
        if (publishedUrl) youtube.publishedUrl = publishedUrl;
        if (error) youtube.error = error;

        await updateBlog(slug, { youtube });
        return { success: true };
    }
};

