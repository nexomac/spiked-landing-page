import { MongoClient, ObjectId } from 'mongodb';
import path from 'path';
import fs from 'fs';

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
    console.error('Please add MONGODB_URI to your .env file. You may need to copy it from your root .env if running from scripts/');
    process.exit(1);
}

async function run() {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        console.log('Usage: node scripts/update-blog-fields.js <blog_id> "<summary>" "<point1>|<point2>|<point3>"');
        console.log('Example: node scripts/update-blog-fields.js 65cd... "This is a summary" "Point 1|Point 2|Point 3"');
        process.exit(1);
    }

    const blogId = args[0];
    const summary = args[1];
    const pointsStr = args[2];
    const points = pointsStr.split('|').map(p => p.trim()).filter(Boolean);

    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        const db = client.db();
        const collection = db.collection('blogs');

        console.log(`Updating blog ${blogId}...`);
        
        const result = await collection.updateOne(
            { _id: new ObjectId(blogId) },
            { 
                $set: { 
                    summary: summary,
                    points: points,
                    updatedAt: new Date()
                } 
            }
        );

        if (result.matchedCount === 0) {
            console.log('❌ No blog found with ID:', blogId);
        } else {
            console.log('✅ Successfully updated blog:', blogId);
            console.log('Summary:', summary);
            console.log('Points:', points);
        }
    } catch (error) {
        console.error('❌ Error updating blog:', error);
    } finally {
        await client.close();
    }
}

run();
