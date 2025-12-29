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
                    <div class="flex items-center">
                        <form action="?/updateFieldType" method="POST" class="mr-4">
                            <input type="hidden" name="fieldSlug" value={field.slug}>
                            <select 
                                name="newType" 
                                class="text-sm bg-gray-800 rounded text-gray-300 border border-transparent hover:border-gray-700 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-500 cursor-pointer" 
                                onchange={(e) => e.target.form.requestSubmit()}
                            >
                                <option value="text" selected={field.type === 'text'}>Short Text</option>
                                <option value="richtext" selected={field.type === 'richtext'}>Rich Text</option>
                                <option value="image" selected={field.type === 'image'}>Image URL</option>
                                <option value="quote" selected={field.type === 'quote'}>Quote</option>
                                <option value="highlight" selected={field.type === 'highlight'}>Highlight</option>
                                <option value="link" selected={field.type === 'link'}>Link</option>
                                <option value="callout" selected={field.type === 'callout'}>Callout</option>
                                <option value="statistic" selected={field.type === 'statistic'}>Statistic</option>
                                <option value="divider" selected={field.type === 'divider'}>Divider</option>
                                <option value="date" selected={field.type === 'date'}>Date</option>
                            </select>
                        </form>
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
                    <label for="fieldName" class="block text-xs text-gray-500 mb-1">Field Name</label>
                    <input id="fieldName" name="fieldName" type="text" required class="w-full bg-black border border-gray-700 rounded px-3 py-2" placeholder="e.g. Body Content" />
                </div>
                <div class="w-40">
                    <label for="fieldType" class="block text-xs text-gray-500 mb-1">Type</label>
                    <select id="fieldType" name="fieldType" class="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white text-xs">
                        <option value="text">Short Text</option>
                        <option value="richtext">Rich Text (Blocks)</option>
                        <option value="image">Image URL</option>
                        <option value="quote">Impact Quote</option>
                        <option value="highlight">Highlight Box</option>
                        <option value="link">External Link</option>
                        <option value="callout">Callout/Notice</option>
                        <option value="statistic">Statistic (Label|Value)</option>
                        <option value="divider">Section Divider</option>
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
