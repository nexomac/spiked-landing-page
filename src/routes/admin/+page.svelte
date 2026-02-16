<script>
	import { enhance } from "$app/forms";
	import {
		Pencil,
		Plus,
		Trash,
		FileText,
		Newspaper,
		MessageSquare,
		Layers,
		Send,
		CheckCircle2,
		AlertCircle,
		Sparkles,
		Upload,
		X,
		Loader2,
	} from "lucide-svelte";
	import { fade } from "svelte/transition";

	let { data } = $props();

	let isNewsletterModalOpen = $state(false);
	let editingNewsletter = $state(null);
	let isSending = $state(false);
	let sendResult = $state(null);

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

	async function sendEmails() {
		if (
			!confirm(
				"Are you sure you want to trigger the weekly intelligence dispatch to all relevant subscribers?",
			)
		)
			return;

		isSending = true;
		sendResult = null;
		try {
			const res = await fetch("/admin/api/send-newsletter", { method: "POST" });
			const json = await res.json();
			sendResult = json;
		} catch (e) {
			sendResult = { error: e.message };
		} finally {
			isSending = false;
		}
	}

	// Blog Generation / Import
	let isGeneratingBlog = $state(false);
	let isImportModalOpen = $state(false);
	let jsonImportData = $state("");
	let importError = $state(null);

	async function generateBlog() {
		const prompt = window.prompt("Enter a topic or outline for the blog:");
		if (!prompt) return;

		isGeneratingBlog = true;
		try {
			const res = await fetch("/admin/api/generate", {
				method: "POST",
				body: JSON.stringify({ modelSlug: "blog", prompt }),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();

			if (data.success && data.blocks) {
				// We have the blocks, now we create the blog via a form submit to include it in the DB
				const formData = new FormData();
				const initialTitle =
					prompt.length > 30 ? prompt.substring(0, 30) + "..." : prompt;

				formData.append(
					"json",
					JSON.stringify({
						title: data.title || `AI Generated: ${initialTitle}`,
						content: data.blocks,
						summary: data.summary,
						points: data.points,
					}),
				);

				// Standard form submission via fetch
				const createRes = await fetch("?/createBlog", {
					method: "POST",
					body: formData,
				});

				if (createRes.redirected) {
					window.location.href = createRes.url;
				} else {
					const result = await createRes.json();
					if (result.type === "error" || (result.data && result.data.error)) {
						alert(
							"Generation succeeded but creation failed: " +
								(result.data?.error || "Unknown error"),
						);
					}
				}
			} else {
				alert("Failed to generate: " + (data.error || "Unknown error"));
			}
		} catch (e) {
			alert("Error: " + e.message);
		} finally {
			isGeneratingBlog = false;
		}
	}

	function closeImportModal() {
		isImportModalOpen = false;
		jsonImportData = "";
		importError = null;
	}
</script>

<div
	class="min-h-screen bg-black text-white pt-24 px-4 sm:px-6 lg:px-8 font-sans"
>
	<div class="max-w-6xl mx-auto space-y-12">
		<!-- Header -->
		<header
			class="flex justify-between items-center border-b border-gray-800 pb-6"
		>
			<h1 class="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
			<form action="/admin/login?/logout" method="POST">
				<button
					class="text-red-400 hover:text-red-300 px-4 py-2 rounded-lg transition text-sm font-medium"
					>Logout</button
				>
			</form>
		</header>

		<!-- Section 1: Newsletters -->
		<section>
			<div
				class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
			>
				<div class="flex items-center gap-3">
					<Newspaper class="w-6 h-6 text-indigo-400" />
					<h2 class="text-2xl font-semibold">Intelligence Dispatch</h2>
				</div>
				<div class="flex items-center gap-3">
					<button
						onclick={sendEmails}
						disabled={isSending}
						class="flex items-center gap-2 bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:scale-100 px-4 py-2 rounded-lg transition text-sm font-bold active:scale-95"
					>
						<Send class="w-4 h-4" />
						{isSending ? "Dispatching..." : "Send Weekly Blast"}
					</button>
					<button
						onclick={openCreateNewsletterModal}
						class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
					>
						<Plus class="w-4 h-4" />
						Create Feed
					</button>
				</div>
			</div>

			{#if sendResult}
				<div
					in:fade
					class="mb-8 p-4 rounded-xl bg-gray-950 border border-gray-800 font-mono text-sm relative overflow-hidden"
				>
					<div class="absolute top-0 right-0 p-2">
						<button
							onclick={() => (sendResult = null)}
							class="text-gray-500 hover:text-white">×</button
						>
					</div>
					{#if sendResult.success}
						<div class="flex items-center gap-3 text-emerald-400">
							<CheckCircle2 class="w-4 h-4" />
							<span
								>Alpha Intel Successfully Dispatched. Total Recipients: {sendResult.sent}</span
							>
						</div>
					{:else if sendResult.message}
						<div class="flex items-center gap-3 text-amber-400">
							<AlertCircle class="w-4 h-4" />
							<span>Notice: {sendResult.message}</span>
						</div>
					{:else}
						<div class="flex items-center gap-3 text-red-400">
							<AlertCircle class="w-4 h-4" />
							<span>Error: {sendResult.error}</span>
						</div>
					{/if}
				</div>
			{/if}

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each data.newsletters as newsletter}
					<div
						class="group relative bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 transition duration-300"
					>
						<div
							class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition"
						>
							<button
								onclick={() => openEditNewsletterModal(newsletter)}
								class="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-full hover:bg-gray-700 transition"
								aria-label="Edit newsletter"
							>
								<Pencil class="w-4 h-4" />
							</button>
						</div>
						<h3 class="text-xl font-bold mb-2 pr-8">{newsletter.title}</h3>
						<p class="text-gray-400 text-sm mb-4 line-clamp-2">
							{newsletter.description}
						</p>
						<div
							class="flex items-center gap-2 text-xs text-gray-500 font-mono bg-gray-950/50 p-2 rounded w-fit"
						>
							<span>/{newsletter.slug}</span>
						</div>
					</div>
				{/each}

				{#if data.newsletters.length === 0}
					<div
						class="col-span-full py-12 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl"
					>
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
				<div class="flex items-center gap-3">
					<button
						onclick={generateBlog}
						disabled={isGeneratingBlog}
						class="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-2 rounded-lg transition text-sm font-medium disabled:opacity-50"
					>
						{#if isGeneratingBlog}
							<Loader2 class="w-4 h-4 animate-spin" />
							Generating...
						{:else}
							<Sparkles class="w-4 h-4" />
							Generate with AI
						{/if}
					</button>

					<button
						onclick={() => (isImportModalOpen = true)}
						class="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
					>
						<Upload class="w-4 h-4" />
						Import JSON
					</button>

					<form action="?/createBlog" method="POST" use:enhance>
						<button
							class="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
						>
							<Plus class="w-4 h-4" />
							Create Blog
						</button>
					</form>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each data.blogs as blog}
					<a
						href="/admin/editor/{blog.slug}"
						class="group block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-emerald-500/50 transition duration-300"
					>
						<div class="flex justify-between items-start mb-4">
							<span
								class={`text-xs px-2 py-1 rounded-full ${blog.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-yellow-500/10 text-yellow-400"}`}
							>
								{blog.status || "draft"}
							</span>
							<span class="text-xs text-gray-500">
								{new Date(
									blog.updatedAt || blog.createdAt,
								).toLocaleDateString()}
							</span>
						</div>
						<h3
							class="text-lg font-bold mb-2 group-hover:text-emerald-400 transition"
						>
							{blog.title}
						</h3>
						<p class="text-gray-500 text-sm mb-3">By {blog.author}</p>
						<div
							class="flex items-center gap-2 text-xs text-gray-600 font-mono"
						>
							<span>/{blog.slug}</span>
						</div>
					</a>
				{/each}

				{#if data.blogs.length === 0}
					<div
						class="col-span-full py-12 text-center text-gray-500 border border-dashed border-gray-800 rounded-xl"
					>
						No blogs found. Create one to start writing.
					</div>
				{/if}
			</div>
		</section>

		<!-- Section 3: Social -->
		<section>
			<div class="flex justify-between items-center mb-6">
				<div class="flex items-center gap-3">
					<MessageSquare class="w-6 h-6 text-sky-400" />
					<h2 class="text-2xl font-semibold">Social Media</h2>
				</div>
				<a
					href="/admin/social"
					class="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
				>
					Manage Queue
				</a>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
				<a
					href="/admin/social"
					class="group block bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-sky-500/50 transition duration-300"
				>
					<div class="flex items-center justify-between mb-4">
						<span class="text-sky-400 bg-sky-500/10 p-2 rounded-lg">
							<Layers class="w-6 h-6" />
						</span>
					</div>
					<h3
						class="text-xl font-bold mb-2 group-hover:text-sky-400 transition"
					>
						Social Queue
					</h3>
					<p class="text-gray-400 text-sm">
						Manage auto-publishing, manual threads, and AI content generation.
					</p>
				</a>
			</div>
		</section>
	</div>
</div>

<!-- Newsletter Modal -->
{#if isNewsletterModalOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
	>
		<div
			class="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl p-6"
		>
			<h2 class="text-xl font-bold mb-6">
				{editingNewsletter ? "Edit Newsletter" : "Create Newsletter"}
			</h2>

			<form
				action={editingNewsletter ? "?/updateNewsletter" : "?/createNewsletter"}
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === "success") {
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
					<label
						class="block text-sm font-medium text-gray-400 mb-1"
						for="title">Name</label
					>
					<input
						type="text"
						name="title"
						id="title"
						value={editingNewsletter?.title || ""}
						class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition text-white"
						placeholder="Weekly Digest"
						required
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-400 mb-1" for="slug"
						>Slug</label
					>
					<input
						type="text"
						name="slug"
						id="slug"
						value={editingNewsletter?.slug || ""}
						class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition text-white font-mono text-sm"
						placeholder="weekly-digest"
						required
					/>
				</div>

				<div>
					<label
						class="block text-sm font-medium text-gray-400 mb-1"
						for="description">Description</label
					>
					<textarea
						name="description"
						id="description"
						rows="3"
						class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 transition text-white resize-none"
						placeholder="A brief description of this newsletter..."
						>{editingNewsletter?.description || ""}</textarea
					>
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
						{editingNewsletter ? "Save Changes" : "Create Newsletter"}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}

<!-- JSON Import Modal -->
{#if isImportModalOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
	>
		<div
			class="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl p-6"
		>
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-xl font-bold">Import Blog JSON</h2>
				<button
					onclick={closeImportModal}
					class="text-gray-500 hover:text-white"
				>
					<X class="w-5 h-5" />
				</button>
			</div>

			<form
				action="?/createBlog"
				method="POST"
				use:enhance={() => {
					return async ({ result }) => {
						if (result.type === "redirect") {
							closeImportModal();
						} else if (result.type === "failure") {
							importError = result.data?.error || "Import failed";
						}
					};
				}}
				class="space-y-4"
			>
				<div>
					<label
						class="block text-sm font-medium text-gray-400 mb-2"
						for="json-input"
					>
						Paste Blog JSON structure (must contain title, slug, author, and
						content array)
					</label>
					<textarea
						name="json"
						id="json-input"
						bind:value={jsonImportData}
						rows="12"
						class="w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition text-white font-mono text-xs resize-none"
						placeholder={`// You can paste either a full object or just an array of blocks:
[
  { "type": "header", "data": { "text": "Blog Title", "level": 2 } },
  { "type": "text", "data": { "content": "..." } }
]`}
						required
					></textarea>
				</div>

				{#if importError}
					<div
						class="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-lg flex items-center gap-2"
					>
						<AlertCircle class="w-4 h-4" />
						{importError}
					</div>
				{/if}

				<div class="flex justify-end gap-3 mt-6">
					<button
						type="button"
						onclick={closeImportModal}
						class="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
					>
						Cancel
					</button>
					<button
						type="submit"
						class="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition font-medium flex items-center gap-2"
					>
						<CheckCircle2 class="w-4 h-4" />
						Process Import
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
