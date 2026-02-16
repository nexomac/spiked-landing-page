import { MongoClient, ObjectId } from 'mongodb';
import fs from 'fs';
import path from 'path';

/**
 * UTILITY: Load environment variables from .env file manually
 */
function loadEnv() {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf-8');
        envContent.split('\n').forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith('#')) return;
            const [key, ...valueParts] = trimmedLine.split('=');
            if (key && valueParts.length > 0) {
                process.env[key.trim()] = valueParts.join('=').trim().replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1');
            }
        });
    }
}

loadEnv();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI not found in .env file.');
    process.exit(1);
}

/**
 * TIPTAP TO MARKDOWN PARSER
 */
function tiptapToMarkdown(node) {
    if (!node) return '';
    
    // Handle array of nodes if passed directly
    if (Array.isArray(node)) {
        return node.map(tiptapToMarkdown).join('\n\n');
    }

    switch (node.type) {
        case 'doc':
            return node.content ? node.content.map(tiptapToMarkdown).join('\n\n') : '';
        
        case 'paragraph':
            return node.content ? node.content.map(tiptapToMarkdown).join('') : '';
        
        case 'text':
            let text = node.text || '';
            if (node.marks) {
                node.marks.forEach(mark => {
                    if (mark.type === 'bold') text = `**${text}**`;
                    if (mark.type === 'italic') text = `*${text}*`;
                    if (mark.type === 'strike') text = `~~${text}~~`;
                    if (mark.type === 'code') text = `\`${text}\``;
                    if (mark.type === 'link') text = `[${text}](${mark.attrs?.href})`;
                });
            }
            return text;
        
        case 'heading':
            const level = node.attrs?.level || 1;
            const hashes = '#'.repeat(level);
            const content = node.content ? node.content.map(tiptapToMarkdown).join('') : '';
            return `${hashes} ${content}`;
        
        case 'bulletList':
            return node.content ? node.content.map(child => `- ${tiptapToMarkdown(child)}`).join('\n') : '';
        
        case 'orderedList':
            return node.content ? node.content.map((child, i) => `${i + 1}. ${tiptapToMarkdown(child)}`).join('\n') : '';
        
        case 'listItem':
            // Recursive call for content within list item
            return node.content ? node.content.map(tiptapToMarkdown).join('\n  ') : '';
        
        case 'blockquote':
            const quoteContent = node.content ? node.content.map(tiptapToMarkdown).join('\n> ') : '';
            return `> ${quoteContent}`;

        case 'codeBlock':
            const code = node.content ? node.content.map(n => n.text || '').join('') : '';
            const lang = node.attrs?.language || '';
            return `\`\`\`${lang}\n${code}\n\`\`\``;
        
        case 'image':
            return `![${node.attrs?.alt || ''}](${node.attrs?.src})`;
        
        case 'horizontalRule':
            return '---';
        
        case 'hardBreak':
            return '\n';
        
        default:
            // Attempt to parse children if unknown type
            if (node.content) {
                return node.content.map(tiptapToMarkdown).join('');
            }
            return '';
    }
}

/**
 * BLOCK PARSER: Handles various block types (richtext, image, quote, etc.)
 */
function parseBlocks(blocks) {
    if (!blocks || !Array.isArray(blocks)) return '';
    
    return blocks.map(b => {
        let content = '';
        
        switch (b.type) {
            case 'richtext':
                if (b.data?.html) {
                    content = tiptapToMarkdown(b.data.html);
                }
                break;
            
            case 'header':
                const level = b.data?.level || 2;
                const text = b.data?.text || '';
                content = `${'#'.repeat(level)} ${text}`;
                break;
            
            case 'text':
                content = b.data?.content || '';
                break;
            
            case 'quote':
                const quoteText = b.data?.text || b.value || '';
                const author = (b.data?.author || b.author) ? `\n\n— ${b.data?.author || b.author}` : '';
                content = `> ${quoteText}${author}`;
                break;
            
            case 'statistics':
            case 'statistic':
                const statRaw = b.data?.value || b.value || '';
                const [label, stat] = statRaw.includes('|') 
                    ? statRaw.split('|') 
                    : [b.data?.label || 'Metric', statRaw];
                content = `**${label}: ${stat}**`;
                break;
            
            case 'image':
                const imgUrl = b.data?.url || b.value || '';
                const imgAlt = b.data?.caption || b.name || 'Image';
                content = `![${imgAlt}](${imgUrl})`;
                break;
            
            case 'link':
                const linkUrl = b.data?.value || b.value || '';
                content = `[Reference Link](${linkUrl})`;
                break;
            
            case 'highlight':
                content = `***\n${b.data?.value || b.value || ''}\n***`;
                break;
            
            case 'callout':
                content = `> 📢 ${b.data?.value || b.value || ''}`;
                break;
            
            case 'divider':
                content = '---';
                break;
            
            default:
                // Fallback for string-based values
                if (typeof b.value === 'string') {
                    content = b.value;
                } else if (b.data?.content && typeof b.data.content === 'string') {
                    content = b.data.content;
                }
                break;
        }

        return content;
    }).filter(Boolean).join('\n\n');
}

/**
 * MAIN EXECUTION
 */
async function fetchBlogById(id) {
    const client = new MongoClient(MONGODB_URI);
    
    try {
        await client.connect();
        const db = client.db(); // Uses default db from SRI
        const collection = db.collection('blogs');
        
        // console.log(`Searching for blog with ID: ${id}...`);
        
        const blog = await collection.findOne({ _id: new ObjectId(id) });
        
        if (!blog) {
            // console.error(`Blog not found with ID: ${id}`);
            return null;
        }

        // console.log('--- BLOG FOUND ---');
        // console.log(`Title: ${blog.title || 'Untitled'}`);
        // console.log(`Slug: ${blog.slug || 'N/A'}`);
        // console.log(`Author: ${blog.author || 'Editorial'}`);
        // console.log(`Status: ${blog.status || 'draft'}`);
        // console.log('------------------\n');

        // Parse content blocks
        const markdown = parseBlocks(blog.content);

        // Return final markdown string
        return {
          id: id,
          title: blog.title,
          slug: blog.slug,
          author: blog.author,
          markdown: markdown,
          tags: blog.tags || []
        }

    } catch (err) {
        console.error('Database Error:', err.message);
        return null;
    } finally {
        await client.close();
    }
}

async function fetchAllBlogs() {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        const db = client.db();
        const collection = db.collection('blogs');

        const blogs = await collection.find({}).toArray(); // <-- key change

        const parsedBlogs = blogs.map(blog => ({
            id: blog._id.toString(),
            title: blog.title,
            slug: blog.slug,
            author: blog.author,
            markdown: parseBlocks(blog.content),
            tags: blog.tags || []
        }));

        // write locally
        fs.writeFileSync(
            path.resolve(process.cwd(), 'blogs.json'),
            JSON.stringify(parsedBlogs, null, 2)
        );

        console.log(`Saved ${parsedBlogs.length} blogs to blogs.json`);

    } catch (err) {
        console.error('Database Error:', err.message);
    } finally {
        await client.close();
    }
}

fetchAllBlogs();

// // CLI Argument Handling
// const blogId = process.argv[2];

// if (!blogId) {
//     console.log('Usage: node scripts/fetch_mongo.js <MONGODB_ID>');
// } else {
//     fetchBlogById(blogId).then(markdown => {
//         if (markdown) {
//             // console.log('=== MARKDOWN CONTENT ===\n');
//             console.log(JSON.stringify(markdown));
//             // console.log('\n=======================');
//         }
//     });
// }
