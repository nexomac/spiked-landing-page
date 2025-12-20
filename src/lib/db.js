import { MongoClient } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

if (!MONGODB_URI) {
    throw new Error('Please add MONGODB_URI to your .env file');
}

const client = new MongoClient(MONGODB_URI);
const clientPromise = client.connect();

export default clientPromise;

export async function getDb() {
    const connection = await clientPromise;
    // Use the database name from the connection string or default to 'spiked_cms' if missing
    return connection.db();
}
