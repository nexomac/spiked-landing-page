<script>
    import { Play, Pause, Square, Volume2 } from 'lucide-svelte';
    import { onMount, onDestroy } from 'svelte';

    let speaking = $state(false);
    let paused = $state(false);
    let synth = null;
    let utterance = null;
    let supported = $state(false);

    let { content = {}, blocks = [] } = $props();

    let textToRead = $derived.by(() => {
        let fullText = '';
        
        // 1. Try New Blocks format first
        if (blocks && Array.isArray(blocks) && blocks.length > 0) {
            for (const b of blocks) {
                // Blocks from the page are already processed into { type, value, name }
                if (b.type === 'richtext' && b.value) {
                    fullText += extractFromTiptap(b.value) + '. ';
                } else if (typeof b.value === 'string' && !b.value.startsWith('data:image')) {
                    fullText += b.value + '. ';
                }
            }
            if (fullText) return fullText;
        }

        // 2. Fallback to legacy content object
        if (!content) return '';
        const entries = Object.entries(content);
        for (const [key, value] of entries) {
             if (['title', 'slug', 'status', 'coverImage', 'author', 'publishedDate'].includes(key)) continue;

             if (value && typeof value === 'object' && value.type === 'doc') {
                fullText += extractFromTiptap(value) + '. ';
             } else if (typeof value === 'string' && !value.startsWith('data:image')) {
                fullText += value + '. ';
             }
        }
        return fullText;
    });

    function extractFromTiptap(node) {
        if (!node) return '';
        if (node.type === 'text') return node.text;
        if (node.content && Array.isArray(node.content)) {
            return node.content.map(child => extractFromTiptap(child)).join(' ');
        }
        return '';
    }

    onMount(() => {
        if ('speechSynthesis' in window) {
            supported = true;
            synth = window.speechSynthesis;
        }
    });

    onDestroy(() => {
        if (synth) {
            synth.cancel();
        }
    });

    function togglePlay() {
        if (!supported) return;

        if (speaking) {
            if (paused) {
                synth.resume();
                paused = false;
            } else {
                synth.pause();
                paused = true;
            }
        } else {
            startSpeaking();
        }
    }

    function stop() {
        if (!synth) return;
        synth.cancel();
        speaking = false;
        paused = false;
    }

    function startSpeaking() {
        if (synth.speaking) synth.cancel();

        utterance = new SpeechSynthesisUtterance(textToRead);
        
        utterance.onstart = () => {
            speaking = true;
            paused = false;
        };
        
        utterance.onend = () => {
            speaking = false;
            paused = false;
        };

        utterance.onerror = (e) => {
            console.error('Speech error:', e);
            speaking = false;
            paused = false;
        };

        // Optional: Select a better voice if available (e.g., "Google US English")
        const voices = synth.getVoices();
        // Just use default for now to be safe, logic can be improved later
        
        synth.speak(utterance);
    }
</script>

{#if supported && textToRead.length > 0}
    <div class="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2 w-fit border border-black/10">
        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 border-r border-gray-300 pr-3 mr-1">
            <Volume2 size={14} />
            <span>Listen</span>
        </div>
        
        {#if speaking && !paused}
            <button onclick={togglePlay} class="hover:text-black text-gray-700 transition-colors" aria-label="Pause">
                <Pause size={18} fill="currentColor" />
            </button>
        {:else}
            <button onclick={togglePlay} class="hover:text-black text-gray-700 transition-colors" aria-label="Play">
                <Play size={18} fill="currentColor" />
            </button>
        {/if}

        {#if speaking}
             <button onclick={stop} class="hover:text-red-600 text-gray-400 transition-colors ml-1" aria-label="Stop">
                <Square size={14} fill="currentColor" />
            </button>
        {/if}
    </div>
{/if}
