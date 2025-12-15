<script>
    import { onMount, onDestroy } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import Image from '@tiptap/extension-image';
    import Link from '@tiptap/extension-link';

    let { value = '', onChange } = $props();
    let element;
    let editor = $state(null);

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                StarterKit,
                Image,
                Link.configure({ openOnClick: false })
            ],
            content: value,
            editorProps: {
                attributes: {
                    class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px]'
                }
            },
            onUpdate: ({ editor }) => {
                const json = editor.getJSON(); // Save as JSON for "Block" structure
                onChange(json);
            }
        });
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });
</script>

<div class="border border-gray-700 rounded-lg overflow-hidden bg-gray-950">
    <div class="bg-gray-900 border-b border-gray-800 p-2 flex gap-2 overflow-x-auto">
        {#if editor}
            <button type="button" onclick={() => editor.chain().focus().toggleBold().run()} class="px-2 py-1 rounded hover:bg-gray-800 {editor.isActive('bold') ? 'text-purple-400' : 'text-gray-400'}">B</button>
            <button type="button" onclick={() => editor.chain().focus().toggleItalic().run()} class="px-2 py-1 rounded hover:bg-gray-800 {editor.isActive('italic') ? 'text-purple-400' : 'text-gray-400'}">I</button>
            <div class="w-px h-6 bg-gray-700 mx-1"></div>
            <button type="button" onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} class="px-2 py-1 rounded hover:bg-gray-800 {editor.isActive('heading', { level: 2 }) ? 'text-purple-400' : 'text-gray-400'}">H2</button>
            <button type="button" onclick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} class="px-2 py-1 rounded hover:bg-gray-800 {editor.isActive('heading', { level: 3 }) ? 'text-purple-400' : 'text-gray-400'}">H3</button>
            <div class="w-px h-6 bg-gray-700 mx-1"></div>
            <button type="button" onclick={() => editor.chain().focus().toggleBulletList().run()} class="px-2 py-1 rounded hover:bg-gray-800 {editor.isActive('bulletList') ? 'text-purple-400' : 'text-gray-400'}">List</button>
        {/if}
    </div>
    <div class="p-4" bind:this={element}></div>
</div>
