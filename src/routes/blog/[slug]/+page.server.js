import { getBlog } from '$lib/cms';
import { error } from '@sveltejs/kit';
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

function getFieldHtml(fieldData) {
    try {
        if (
            fieldData &&
            typeof fieldData === "object" &&
            fieldData.type === "doc"
        ) {
            return generateHTML(fieldData, [
                StarterKit.configure({
                    link: false,
                    image: false,
                }),
                Image,
                Link,
            ]);
        }
        return "";
    } catch (e) {
        console.error(e);
        return "";
    }
}

function getBestImage(data) {
    const fields = [
        'coverImage', 'Cover Image', 'featured-image', 'FeaturedImage', 'Featured Image',
        'image', 'Image', 'thumbnail', 'Thumbnail', 'hero-image', 'Hero Image', 'image-url', 'Image URL'
    ];
    for (const field of fields) {
        if (data[field] && typeof data[field] === 'string' && (data[field].startsWith('http') || data[field].startsWith('data:image') || data[field].startsWith('/'))) {
            return data[field];
        }
    }
    return null;
}

export async function load({ params }) {
    const post = await getBlog(params.slug);
    
    if (!post) throw error(404, 'Article not found');

    return {
        post: {
            ...post,
             _id: post._id.toString(),
            // Mapping for compatibility + new fields
            title: post.title || post.data?.title || post.data?.Title,
            coverImage: post.coverImage || getBestImage(post.data || {}) || (post.content?.find(b => b.type === 'image')?.data?.url),
            author: post.author || post.data?.author || post.data?.Author || 'Editorial Staff',
            publishedDate: post.publishedDate || post.data?.publishedDate || post.createdAt,
            // Pre-process content blocks for server-side HTML rendering
            content: (post.content || []).map(b => {
                if (b.type === 'richtext' && b.data?.html) {
                    // Pre-render the full block
                    const fullHtml = getFieldHtml(b.data.html);
                    
                    // Also pre-render individual top-level nodes for PDF pagination
                    const nodes = b.data.html.content || [];
                    const renderedNodes = nodes.map(node => ({
                        node,
                        html: getFieldHtml({ type: 'doc', content: [node] })
                    }));

                    return {
                        ...b,
                        renderedHtml: fullHtml,
                        renderedNodes
                    };
                }
                if (b.type === 'header') {
                    const level = b.data?.level || 2;
                    const doc = {
                        type: "doc",
                        content: [
                            {
                                type: "heading",
                                attrs: { level },
                                content: [{ type: "text", text: b.data?.text || "" }],
                            },
                        ],
                    };
                    const html = getFieldHtml(doc);
                    return {
                        ...b,
                        renderedHtml: html,
                        renderedNodes: [{ node: doc.content[0], html }]
                    };
                }
                return b;
            })
        },
        modelFields: [] // No longer used for new system
    };
}
