import { getContentModels, getEntries } from '$lib/cms';

export async function load() {
    const models = await getContentModels();
    
    // Fetch stats or recent entries for each model?
    // For now, let's just show models and a way to manage them.
    // If there are models, maybe fetch recent entries from the first one?
    
    return {
        models: models.map(m => ({ ...m, _id: m._id.toString() }))
    };
}
