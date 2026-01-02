<script>
    import { enhance } from '$app/forms';
    import { Pencil, Plus, Trash, FileText, Newspaper } from 'lucide-svelte';

    let { data } = $props();

    let isNewsletterModalOpen = $state(false);
    let editingNewsletter = $state(null);

    function openCreateNewsletterModal() {
        editingNewsletter = null;
        isNewsletterModalOpen = true;
    }

    function openEditNewsletterModal(newsletter) {
        editingNewsletter = { ...newsletter };
        isNewsletterModalOpen = true;
    }

    function closeNewsletterModal() {
        isNewsletterModalOpen = false;
        editingNewsletter = null;
    }
</script>

<div class="min-h-screen bg-black text-white pt-24 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-6xl mx-auto space-y-12">
        <!-- Header -->
        <header class="flex justify-between items-center border-b border-gray-800 pb-6">
            <h1 class="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <form action="/admin/login?/logout" method="POST">
                <button class="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg transition text-sm font-medium">Logout</button>
            </form>
        </header>

        <!-- Section 1: Newsletters -->
        <section>
            <div class="flex justify-between items-center mb-6">
                <div class="flex items-center gap-3">
                    <Newspaper class="w-6 h-6 text-indigo-400" />
                    <h2 class="text-2xl font-semibold">Newsletters</h2>
                </div>
                <button 
                    onclick={openCreateNewsletterModal}
                    class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                >
                    <Plus class="w-4 h-4" />
                    Create Newsletter
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each data.newsletters as newsletter}
                    <div class="group relative bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition duration-300">
                        <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                            <button 
                                onclick={() => openEditNewsletterModal(newsletter)}
                                class="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-full hover:bg-gray-700 transition"
                                aria-label="Edit newsletter"
                            >
                                <Pencil class="w-4 h-4" />
                            </button>
                        </div>
                        <h3 class="text-xl font-bold mb-2 pr-8">{newsletter.title}</h3>
                        <p class="text-gray-400 text-sm mb-4 line-clamp-2">{newsletter.description}</p>
                        <div class="flex items-center gap-2 text-xs text-gray-500 font-mono bg-gray-950/50 p-2 rounded w-fit">
                            <span>/{newsletter.slug}</span>
                        </div>
                    </div>
                {/each}
                
                {#if data.newsletters.length === 0}
                    <div class="col-span-full py-12 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl">
                        No newsletters found. Create one to get started.
                    </div>
                {/if}
            </div>
        </section>

        <!-- Section 2: Blogs -->
        <section>
            <div class="flex justify-between items-center mb-6">
                <div class="flex items-center gap-3">
                    <FileText class="w-6 h-6 text-emerald-400" />
                    <h2 class="text-2xl font-semibold">Blogs</h2>
                </div>
                <form action="?/createBlog" method="POST" use:enhance>
                    <button class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
                        <Plus class="w-4 h-4" />
                        Create Blog
                    </button>
                </form>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each data.blogs as blog}
                    <a href="/admin/editor/{blog.slug}" class="group block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-emerald-500/50 transition duration-300">
                        <div class="flex justify-between items-start mb-4">
                            <span class={`text-xs px-2 py-1 rounded-full ${blog.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                                {blog.status || 'draft'}
                            </span>
                            <span class="text-xs text-gray-500">
                                {new Date(blog.updatedAt || blog.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h3 class="text-lg font-bold mb-2 group-hover:text-emerald-400 transition">{blog.title}</h3>
                        <p class="text-gray-500 text-sm mb-3">By {blog.author}</p>
                        <div class="flex items-center gap-2 text-xs text-gray-600 font-mono">
                            <span>/{blog.slug}</span>
                        </div>
                    </a>
                {/each}

                {#if data.blogs.length === 0}
                    <div class="col-span-full py-12 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl">
                        No blogs found. Create one to start writing.
                    </div>
                {/if}
            </div>
        </section>
    </div>
</div>

<!-- Newsletter Modal -->
{#if isNewsletterModalOpen}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div class="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h2 class="text-xl font-bold mb-6">
                {editingNewsletter ? 'Edit Newsletter' : 'Create Newsletter'}
            </h2>
            
            <form 
                action={editingNewsletter ? '?/updateNewsletter' : '?/createNewsletter'} 
                method="POST" 
                use:enhance={() => {
                    return async ({ result }) => {
                        if (result.type === 'success') {
                            closeNewsletterModal();
                        }
                    };
                }}
                class="space-y-4"
            >
                {#if editingNewsletter}
                    <input type="hidden" name="id" value={editingNewsletter._id} />
                {/if}

                <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1" for="title">Name</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title"
                        value={editingNewsletter?.title || ''}
                        class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition text-white"
                        placeholder="Weekly Digest"
                        required
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1" for="slug">Slug</label>
                    <input 
                        type="text" 
                        name="slug" 
                        id="slug"
                        value={editingNewsletter?.slug || ''}
                        class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition text-white font-mono text-sm"
                        placeholder="weekly-digest"
                        required
                    />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-400 mb-1" for="description">Description</label>
                    <textarea 
                        name="description" 
                        id="description"
                        rows="3"
                        class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition text-white resize-none"
                        placeholder="A brief description of this newsletter..."
                    >{editingNewsletter?.description || ''}</textarea>
                </div>

                <div class="flex justify-end gap-3 mt-6">
                    <button 
                        type="button" 
                        onclick={closeNewsletterModal}
                        class="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition font-medium"
                    >
                        {editingNewsletter ? 'Save Changes' : 'Create Newsletter'}
                    </button>
                </div>
            </form>
        </div>
    </div>
{/if}
