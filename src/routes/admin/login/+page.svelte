<script>
    let { form } = $props();
</script>

<div class="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[100px]"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]"></div>

    <div class="max-w-md w-full bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 relative z-10 shadow-2xl">
        <div class="text-center mb-8">
            <h1 class="text-3xl font-black tracking-tight mb-2">
                SPIKEDAI<span class="text-red-500">ADMIN</span>
            </h1>
            <p class="text-gray-400 text-sm">Enter your credentials to continue</p>
        </div>
        
        <form method="POST" class="space-y-6">
            <div>
                <label for="password" class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Passcode</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    required
                    class="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder-gray-600"
                    placeholder="••••••••••••"
                />
            </div>
            {#if form?.incorrect}
                <div class="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-3 rounded-lg text-center">
                    Incorrect passcode provided
                </div>
            {/if}
            <button class="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-red-900/20">
                Access Dashboard
            </button>
        </form>
    </div>
</div>
