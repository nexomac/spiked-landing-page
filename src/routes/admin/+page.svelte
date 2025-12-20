<script>
    let { data } = $props();
</script>

<div class="min-h-screen bg-black text-white pt-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
        <header class="flex justify-between items-center mb-12">
            <h1 class="text-3xl font-bold">Dashboard</h1>
            <div class="flex space-x-4">
                <a href="/admin/models" class="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">
                    Manage Schema
                </a>
                <form action="/admin/login?/logout" method="POST" class="inline">
                    <button class="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg transition">Logout</button>
                </form>
            </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Create New Content Card -->
            <div class="col-span-full mb-8">
                <h2 class="text-xl text-gray-400 mb-4">Content Types</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {#each data.models as model}
                        <a href="/admin/entries/{model.slug}" class="p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-red-500 transition group">
                            <h3 class="font-bold text-lg group-hover:text-red-400 transition">{model.name}</h3>
                            <p class="text-gray-500 text-sm mt-2">Manage entries</p>
                        </a>
                    {/each}
                    
                    <a href="/admin/models" class="p-6 border border-dashed border-gray-800 rounded-xl hover:border-gray-600 transition flex items-center justify-center text-gray-400 hover:text-white">
                        + Create New Model
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
