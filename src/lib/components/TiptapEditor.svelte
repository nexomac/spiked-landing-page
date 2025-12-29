<script>
    import { onMount, onDestroy } from 'svelte';
    import { Editor } from '@tiptap/core';
    import StarterKit from '@tiptap/starter-kit';
    import Image from '@tiptap/extension-image';
    import Link from '@tiptap/extension-link';

    let { value = '', onChange } = $props();
    let element;
    let editor = $state(null);

    $effect(() => {
        if (editor && value) {
            const currentJSON = editor.getJSON();
            if (JSON.stringify(currentJSON) !== JSON.stringify(value)) {
                 editor.commands.setContent(value);
            }
        }
    });

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                StarterKit.configure({
                    heading: { levels: [2, 3] }
                }),
                Image,
                Link.configure({ 
                    openOnClick: false,
                    HTMLAttributes: {
                        class: 'text-red-500 underline font-bold'
                    }
                })
            ],
            content: value,
            editorProps: {
                attributes: {
                    class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 text-white'
                }
            },
            onUpdate: ({ editor }) => {
                const json = editor.getJSON(); 
                onChange(json);
            }
        });
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });

    function setLink() {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
</script>

<div class="border border-gray-700 rounded-lg overflow-hidden bg-gray-950">
    <div class="bg-gray-900 border-b border-gray-800 p-2 flex gap-1 overflow-x-auto flex-wrap">
        {#if editor}
            <button type="button" onclick={() => editor.chain().focus().toggleBold().run()} 
                class="w-10 h-8 flex items-center justify-center rounded hover:bg-gray-800 {editor.isActive('bold') ? 'bg-red-600 text-white' : 'text-gray-400'}" title="Bold">B</button>
            <button type="button" onclick={() => editor.chain().focus().toggleItalic().run()} 
                class="w-10 h-8 flex items-center justify-center rounded hover:bg-gray-800 {editor.isActive('italic') ? 'bg-red-600 text-white' : 'text-gray-400'}" title="Italic"><i>I</i></button>
            <button type="button" onclick={() => editor.chain().focus().toggleStrike().run()} 
                class="w-10 h-8 flex items-center justify-center rounded hover:bg-gray-800 {editor.isActive('strike') ? 'bg-red-600 text-white' : 'text-gray-400'}" title="Strike">S</button>
            
            <div class="w-px h-6 bg-gray-700 mx-1 self-center"></div>
            
            <button type="button" onclick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
                class="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-800 {editor.isActive('heading', { level: 2 }) ? 'bg-red-600 text-white' : 'text-gray-400'}" title="Heading 2">H2</button>
            <button type="button" onclick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} 
                class="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-800 {editor.isActive('heading', { level: 3 }) ? 'bg-red-600 text-white' : 'text-gray-400'}" title="Heading 3">H3</button>
            
            <div class="w-px h-6 bg-gray-700 mx-1 self-center"></div>

            <button type="button" onclick={() => editor.chain().focus().toggleBulletList().run()} 
                class="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-800 {editor.isActive('bulletList') ? 'bg-red-600 text-white' : 'text-gray-400'}" title="Bullet List">• List</button>
            <button type="button" onclick={() => editor.chain().focus().toggleBlockquote().run()} 
                class="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-800 {editor.isActive('blockquote') ? 'bg-red-600 text-white' : 'text-gray-400'}" title="Blockquote">“”</button>
            <button type="button" onclick={setLink} 
                class="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-800 {editor.isActive('link') ? 'bg-red-600 text-white' : 'text-gray-400'}" title="Link">🔗</button>
            <button type="button" onclick={() => editor.chain().focus().setHorizontalRule().run()} 
                class="px-2 h-8 flex items-center justify-center rounded hover:bg-gray-800 text-gray-400" title="Horizontal Rule">―</button>
            
            <div class="w-px h-6 bg-gray-700 mx-1 self-center"></div>

            <button type="button" onclick={() => editor.chain().focus().undo().run()} 
                class="w-10 h-8 flex items-center justify-center rounded hover:bg-gray-800 text-gray-400" title="Undo">↶</button>
            <button type="button" onclick={() => editor.chain().focus().redo().run()} 
                class="w-10 h-8 flex items-center justify-center rounded hover:bg-gray-800 text-gray-400" title="Redo">↷</button>
        {/if}
    </div>
    <div bind:this={element} class="tiptap-editor-container"></div>
</div>

<style>
    :global(.tiptap-editor-container .ProseMirror) {
        outline: none !important;
    }
    :global(.tiptap-editor-container .ProseMirror blockquote) {
        border-left: 3px solid #dc2626;
        background: rgba(220, 38, 38, 0.1);
        padding: 0.5rem 1rem;
        margin: 1rem 0;
    }
    :global(.tiptap-editor-container .ProseMirror h2) {
        color: #dc2626;
        text-transform: uppercase;
        font-weight: 800;
        border-bottom: 1px solid rgba(220, 38, 38, 0.3);
        margin-top: 1.5rem;
    }
</style>
