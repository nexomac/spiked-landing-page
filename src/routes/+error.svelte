<script>
    import { page } from '$app/stores';
</script>

<div class="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
    <div class="mb-8">
        <h1 class="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
            {$page.status}
        </h1>
    </div>
    
    <h2 class="text-3xl font-bold mb-4">
        {#if $page.status === 404}
            Page Not Found
        {:else}
            Something Went Wrong
        {/if}
    </h2>
    
    <p class="text-gray-400 max-w-md mb-8">
        {#if $page.status === 404}
            The page you are looking for does not exist or has been moved. 
        {:else}
            {$page.error?.message || 'An unexpected error occurred.'}
        {/if}
    </p>

    <a href={$page.url.pathname.startsWith('/blog') ? '/blog' : '/'} class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition transform hover:scale-105">
        {$page.url.pathname.startsWith('/blog') ? 'Return to Blog' : 'Return Home'}
    </a>
</div>
