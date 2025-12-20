<script>
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition';

    let { data, form } = $props();
    let isSending = $state(false);
    let sendResult = $state(null);
    let showCreate = $state(false);

    async function sendEmails() {
        if (!confirm('Are you sure you want to send the weekly digest to all subscribers?')) return;
        
        isSending = true;
        sendResult = null;
        try {
            const res = await fetch('/admin/api/send-newsletter', { method: 'POST' });
            const json = await res.json();
            sendResult = json;
        } catch (e) {
            sendResult = { error: e.message };
        } finally {
            isSending = false;
        }
    }
</script>

<div class="min-h-screen bg-black text-white pt-24 px-4 pb-20">
    <div class="max-w-4xl mx-auto">
        <div class="flex items-center mb-12">
            <a href="/admin" class="text-gray-400 hover:text-white mr-4">← Dashboard</a>
            <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                Newsletter Control
            </h1>
        </div>

        <!-- Sending Panel -->
        <div class="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-12 shadow-2xl">
            <h2 class="text-2xl font-bold mb-4">Weekly Blast</h2>
            <p class="text-gray-400 mb-6">
                Trigger the system to look for blog posts from the last 7 days and email them to relevant subscribers.
            </p>

            <button 
                onclick={sendEmails}
                disabled={isSending}
                class="bg-white text-black font-bold text-lg px-8 py-3 rounded-full hover:scale-105 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSending ? 'Sending...' : 'Send Weekly Digest Now'}
            </button>

            {#if sendResult}
                <div class="mt-6 p-4 rounded-lg bg-gray-950 border border-gray-800 font-mono text-sm">
                    {#if sendResult.success}
                        <p class="text-green-400">✓ Successfully processed. Sent {sendResult.sent} emails.</p>
                        <p class="text-gray-500 mt-2">Check console for Ethereal URL or assume delivered if Prod.</p>
                    {:else if sendResult.message}
                         <p class="text-yellow-400">! {sendResult.message}</p>
                    {:else}
                        <p class="text-red-400">✗ Error: {sendResult.error}</p>
                    {/if}
                </div>
            {/if}
        </div>

        <!-- Newsletters List -->
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold">Active Newsletters</h2>
                
                <button 
                    class="text-sm border border-gray-700 px-3 py-1 rounded hover:bg-gray-800 text-white font-bold transition" 
                    onclick={() => showCreate = !showCreate}
                >
                    {showCreate ? 'Cancel' : '+ New Newsletter'}
                </button>
            </div>

            {#if showCreate}
                <div in:fade class="bg-gray-900 border border-gray-800 p-6 rounded-xl mb-6">
                    <h3 class="font-bold mb-4">Create New Newsletter</h3>
                    <form action="?/create" method="POST" use:enhance={() => {
                        return async ({ result, update }) => {
                            if (result.type === 'success') {
                                showCreate = false;
                            }
                            update();
                        };
                    }} class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-xs uppercase text-gray-400 mb-1">Title</label>
                                <input type="text" name="title" required placeholder="e.g. AI Weekly" class="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-red-500 outline-none" />
                            </div>
                            <div>
                                <label class="block text-xs uppercase text-gray-400 mb-1">Slug</label>
                                <input type="text" name="slug" required placeholder="e.g. ai-weekly" class="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-red-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label class="block text-xs uppercase text-gray-400 mb-1">Description</label>
                            <textarea name="description" rows="2" placeholder="Brief tagline..." class="w-full bg-black border border-gray-700 rounded px-3 py-2 text-white focus:border-red-500 outline-none"></textarea>
                        </div>
                        <button class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg">Create</button>
                    </form>
                </div>
            {/if}

            {#if data.newsletters.length === 0}
                <p class="text-gray-500 italic">No newsletters defined in database.</p>
            {:else}
                <div class="grid gap-4">
                    {#each data.newsletters as n}
                        <div class="bg-gray-900 border border-gray-800 p-6 rounded-xl flex justify-between items-center group">
                            <div>
                                <h3 class="font-bold text-xl group-hover:text-red-400 transition">{n.title}</h3>
                                <p class="text-gray-500 text-sm">{n.description}</p>
                                <div class="mt-2 flex gap-4 text-xs font-mono text-gray-600">
                                    <span>Slug: <span class="text-gray-400">/newsletters/{n.slug}</span></span>
                                    <span>ID: <span class="text-gray-400">{n._id}</span></span>
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>
