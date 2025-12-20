<script>
    let { data } = $props();
</script>

<div class="min-h-screen bg-black text-white pt-24 px-4">
    <div class="max-w-3xl mx-auto">
        <div class="flex items-center mb-8">
            <a href="/admin/models" class="text-gray-400 hover:text-white mr-4">← Models</a>
            <div>
                <h1 class="text-3xl font-bold">{data.model.name}</h1>
                <p class="text-gray-500 font-mono text-sm">{data.model.slug}</p>
            </div>
        </div>

        <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden mb-8">
            <div class="p-4 bg-gray-800/50 border-b border-gray-800 font-semibold flex justify-between">
                <span>Field Name</span>
                <span>Type</span>
                <span>Actions</span>
            </div>
            {#each data.model.fields as field}
                <div class="p-4 border-b border-gray-800 flex justify-between items-center last:border-0 hover:bg-gray-800/30">
                    <div>
                        <div class="font-medium">{field.name}</div>
                        <div class="text-xs text-gray-500 font-mono">{field.slug}</div>
                    </div>
                    <div class="text-sm px-2 py-1 bg-gray-800 rounded text-gray-300">
                        {field.type}
                    </div>
                    <form action="?/removeField" method="POST">
                        <input type="hidden" name="fieldSlug" value={field.slug}>
                        <button class="text-red-500 hover:text-red-400 text-sm">Remove</button>
                    </form>
                </div>
            {/each}
        </div>

        <div class="bg-gray-900/30 p-6 rounded-xl border border-gray-800">
            <h3 class="font-semibold mb-4">Add Field</h3>
            <form action="?/addField" method="POST" class="flex gap-4 items-end">
                <div class="flex-1">
                    <label class="block text-xs text-gray-500 mb-1">Field Name</label>
                    <input name="fieldName" type="text" required class="w-full bg-black border border-gray-700 rounded px-3 py-2" placeholder="e.g. Body Content" />
                </div>
                <div class="w-40">
                    <label class="block text-xs text-gray-500 mb-1">Type</label>
                    <select name="fieldType" class="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white">
                        <option value="text">Short Text</option>
                        <option value="richtext">Rich Text (Blocks)</option> <!-- Important for the Newspaper style -->
                        <option value="image">Image URL</option>
                        <option value="date">Date</option>
                    </select>
                </div>
                <button class="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-semibold">
                    Add
                </button>
            </form>
        </div>
    </div>
</div>
