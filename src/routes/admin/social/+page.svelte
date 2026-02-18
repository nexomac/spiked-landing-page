<script>
	import { enhance } from "$app/forms";
	import {
		Youtube,
		Video,
		Play,
		CheckCircle2,
		AlertCircle,
		Loader2,
		Download,
		ExternalLink,
		RefreshCw,
		Eye,
		Upload,
		Trash2,
	} from "lucide-svelte";
	import { fade, slide } from "svelte/transition";

	import { invalidateAll } from "$app/navigation";

	let { data, form } = $props();

	// Create a reactive copy of blogs for instant UI updates
	let blogs = $state([]);
	$effect(() => {
		blogs = JSON.parse(JSON.stringify(data.blogs));
	});

	let selectedBlog = $state(null);
	let jobStatus = $state(null);
	let isProcessing = $state(false);
	let previewVideoUrl = $state(null);
	let isUploading = $state(false);
	let isUploaded = $state(false);

	const API_BASE = "http://localhost:3000";

	async function triggerAutomation(blog) {
		if (
			!confirm(
				`Start video generation for "${blog.title}"? This will trigger the automation service.`,
			)
		)
			return;

		selectedBlog = blog;
		isProcessing = true;
		jobStatus = { stage: "initializing", progress: 0 };

		try {
			// 1. Submit Job
			const startRes = await fetch(`${API_BASE}/generateVideo`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt: blog.title }),
			});

			if (!startRes.ok) {
				throw new Error(`Failed to start job: ${await startRes.text()}`);
			}

			const { jobId } = await startRes.json();
			jobStatus = { ...jobStatus, jobId, stage: "submitted" };

			// Update UI instantly
			const localBlog = blogs.find((b) => b.slug === blog.slug);
			if (localBlog) {
				localBlog.youtube.status = "processing";
			}

			// Update DB that it's processing
			const formData = new FormData();
			formData.append("slug", blog.slug);
			formData.append("status", "processing");
			formData.append("jobId", jobId);
			await fetch("?/updateYoutubeStatus", { method: "POST", body: formData });

			// 2. Poll Status
			pollJob(jobId, blog.slug);
		} catch (err) {
			console.error(err);
			jobStatus = { stage: "failed", error: err.message };
			isProcessing = false;
		}
	}

	async function pollJob(jobId, slug) {
		let completed = false;
		while (!completed) {
			try {
				const statusRes = await fetch(`${API_BASE}/jobs/${jobId}`);
				if (!statusRes.ok) throw new Error("Job tracking failed");
				const job = await statusRes.json();

				jobStatus = job;

				if (job.stage === "completed") {
					completed = true;
					isProcessing = false;
					// Update DB
					const formData = new FormData();
					formData.append("slug", slug);
					formData.append("status", "created");
					formData.append("videoPath", job.videoPath);
					await fetch("?/updateYoutubeStatus", {
						method: "POST",
						body: formData,
					});

					// Update reactive state instantly
					const blog = blogs.find((b) => b.slug === slug);
					if (blog) {
						blog.youtube.status = "created";
						blog.youtube.videoPath = job.videoPath;
					}

					invalidateAll(); // Ensure data is synced
				} else if (job.stage === "failed") {
					completed = true;
					isProcessing = false;
					const formData = new FormData();
					formData.append("slug", slug);
					formData.append("status", "none");
					formData.append("error", job.error);
					await fetch("?/updateYoutubeStatus", {
						method: "POST",
						body: formData,
					});
					const blog = blogs.find((b) => b.slug === slug);
					if (blog) {
						blog.youtube.status = "none";
						blog.youtube.error = job.error;
					}
					invalidateAll();
				} else {
					await new Promise((resolve) => setTimeout(resolve, 2000));
				}
			} catch (e) {
				console.error("Polling error", e);
				completed = true;
				isProcessing = false;
			}
		}
	}

	function downloadVideo(videoPath) {
		const url = videoPath.startsWith("http")
			? videoPath
			: `${API_BASE}${videoPath}`;
		window.open(url, "_blank");
	}

	function previewForUpload(blog) {
		selectedBlog = blog;
		previewVideoUrl = blog.youtube.videoPath.startsWith("http")
			? blog.youtube.videoPath
			: `${API_BASE}${blog.youtube.videoPath}`;
		isUploaded = false;
	}

	async function dummyUpload() {
		isUploading = true;
		// Simulated upload
		await new Promise((resolve) => setTimeout(resolve, 3000));
		isUploading = false;
		isUploaded = true;

		// Update DB to published
		const formData = new FormData();
		formData.append("slug", selectedBlog.slug);
		formData.append("status", "published");
		formData.append("publishedUrl", "https://youtube.com/watch?v=mock");
		await fetch("?/updateYoutubeStatus", { method: "POST", body: formData });

		const blog = blogs.find((b) => b.slug === selectedBlog.slug);
		if (blog) {
			blog.youtube.status = "published";
			blog.youtube.publishedUrl = "https://youtube.com/watch?v=mock";
		}
		invalidateAll();
	}

	function getStatusColor(status) {
		switch (status) {
			case "published":
				return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
			case "created":
				return "text-blue-400 bg-blue-400/10 border-blue-400/20";
			case "processing":
				return "text-amber-400 bg-amber-400/10 border-amber-400/20";
			default:
				return "text-gray-400 bg-gray-400/10 border-gray-400/20";
		}
	}
</script>

<div class="min-h-screen bg-black text-white pt-24 pb-20 font-sans">
	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<header
			class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
		>
			<div>
				<h1
					class="text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent flex items-center gap-3"
				>
					<Youtube class="w-10 h-10 text-red-500" />
					Social Video Hub
				</h1>
				<p class="text-gray-400 max-w-2xl text-lg">
					Transform your insights into cinematic YouTube content. Manage
					automation, preview renders, and publish to the world.
				</p>
			</div>

			<div class="flex items-center gap-4">
				<div
					class="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full text-sm font-medium text-gray-300 flex items-center gap-2"
				>
					<div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
					Automation Service: Online
				</div>
			</div>
		</header>

		<!-- Main Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Blog List -->
			<div class="lg:col-span-2 space-y-6">
				<div class="flex items-center justify-between mb-2">
					<h2 class="text-xl font-bold flex items-center gap-2">
						<Video class="w-5 h-5 text-indigo-400" />
						Content Queue
					</h2>
					<span class="text-sm text-gray-500"
						>{blogs.length} Blogs Available</span
					>
				</div>

				<div class="space-y-4">
					{#each blogs as blog (blog.slug)}
						<div
							class="group bg-gray-900/40 border border-gray-800 hover:border-red-500/30 rounded-2xl p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/5"
						>
							<div class="flex flex-col md:flex-row justify-between gap-4">
								<div class="flex-1 min-w-0">
									<div class="flex items-center gap-3 mb-2">
										<span
											class={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${getStatusColor(blog.youtube?.status)}`}
										>
											{blog.youtube?.status || "none"}
										</span>
										<span class="text-xs text-gray-500 font-mono"
											>/{blog.slug}</span
										>
									</div>
									<h3
										class="text-xl font-bold mb-1 truncate group-hover:text-white transition-colors"
									>
										{blog.title}
									</h3>
									<p class="text-gray-500 text-sm line-clamp-1 mb-4">
										{blog.summary || "No summary generated yet."}
									</p>

									<div class="flex flex-wrap gap-2">
										{#if blog.youtube?.status === "none" || !blog.youtube?.status}
											<button
												onclick={() => triggerAutomation(blog)}
												class="flex items-center gap-2 bg-white text-black hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg"
											>
												<Play class="w-4 h-4" />
												Generate Video
											</button>
										{:else if blog.youtube?.status === "processing"}
											<div
												class="flex items-center gap-3 px-4 py-2 bg-gray-800 rounded-xl text-sm font-medium text-amber-400 border border-amber-400/20"
											>
												<Loader2 class="w-4 h-4 animate-spin" />
												Render in Progress...
											</div>
										{:else if blog.youtube?.status === "created"}
											<button
												onclick={() => previewForUpload(blog)}
												class="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg"
											>
												<Eye class="w-4 h-4" />
												Preview & Publish
											</button>
											<button
												onclick={() => downloadVideo(blog.youtube.videoPath)}
												class="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all"
											>
												<Download class="w-4 h-4" />
												Download
											</button>
										{:else if blog.youtube?.status === "published"}
											<a
												href={blog.youtube.publishedUrl}
												target="_blank"
												class="flex items-center gap-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:bg-emerald-600/30"
											>
												<ExternalLink class="w-4 h-4" />
												View on YouTube
											</a>
											<button
												onclick={() => triggerAutomation(blog)}
												class="text-gray-500 hover:text-white p-2 transition"
												title="Re-generate"
											>
												<RefreshCw class="w-4 h-4" />
											</button>
										{/if}
									</div>
								</div>

								{#if blog.youtube?.status === "created" || blog.youtube?.status === "published"}
									<div
										class="w-full md:w-32 h-20 bg-gray-950 rounded-lg overflow-hidden border border-gray-800 flex items-center justify-center relative group/thumb"
									>
										<Video
											class="w-8 h-8 text-gray-800 group-hover/thumb:text-red-500/50 transition"
										/>
										<div
											class="absolute inset-0 bg-red-500/10 opacity-0 group-hover/thumb:opacity-100 transition flex items-center justify-center"
										>
											<Eye class="w-5 h-5 text-red-500" />
										</div>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Interaction Column -->
			<div class="space-y-6">
				<!-- Automation Status Panel -->
				<div
					class="bg-gray-900 border border-gray-800 rounded-3xl p-6 sticky top-24"
				>
					<h3 class="text-lg font-bold mb-6 flex items-center gap-2">
						<Loader2
							class={`w-5 h-5 text-red-500 ${isProcessing ? "animate-spin" : ""}`}
						/>
						Active Pipeline
					</h3>

					{#if isProcessing || jobStatus}
						<div class="space-y-6" in:fade>
							<div class="bg-black/40 rounded-2xl p-4 border border-gray-800">
								<div class="flex justify-between items-center mb-2">
									<span
										class="text-xs font-bold uppercase tracking-wider text-gray-500"
										>Submitting to:</span
									>
									<span class="text-xs font-mono text-red-400"
										>RenderCore-X1</span
									>
								</div>
								<h4 class="font-bold text-sm truncate">
									{selectedBlog?.title || "Initialing..."}
								</h4>
							</div>

							<div class="space-y-2">
								<div class="flex justify-between text-xs font-medium px-1">
									<span class="text-gray-400"
										>Stage: {jobStatus?.stage?.toUpperCase() || "WAITING"}</span
									>
									<span class="text-red-400 font-bold"
										>{jobStatus?.progress || 0}%</span
									>
								</div>
								<div
									class="w-full h-2 bg-gray-800 rounded-full overflow-hidden"
								>
									<div
										class="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-500 ease-out"
										style={`width: ${jobStatus?.progress || 0}%`}
									></div>
								</div>
							</div>

							{#if jobStatus?.stage === "completed"}
								<div
									class="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-start gap-3"
									in:slide
								>
									<CheckCircle2 class="w-5 h-5 text-emerald-500 shrink-0" />
									<div>
										<p class="text-emerald-400 text-sm font-bold">
											Render Successful
										</p>
										<p class="text-emerald-500/70 text-xs">
											Video is ready for review.
										</p>
									</div>
								</div>
							{:else if jobStatus?.stage === "failed"}
								<div
									class="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3"
									in:slide
								>
									<AlertCircle class="w-5 h-5 text-red-500 shrink-0" />
									<div>
										<p class="text-red-400 text-sm font-bold">
											Automation Failed
										</p>
										<p class="text-red-500/70 text-xs truncate max-w-[200px]">
											{jobStatus.error}
										</p>
									</div>
								</div>
							{/if}
						</div>
					{:else}
						<div
							class="py-12 text-center text-gray-600 border border-dashed border-gray-800 rounded-2xl"
						>
							<Play class="w-8 h-8 mx-auto mb-3 opacity-20" />
							<p class="text-sm font-medium">No active jobs in pipeline</p>
						</div>
					{/if}

					<div class="mt-8 pt-6 border-t border-gray-800">
						<h4
							class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4"
						>
							Pipeline Stats
						</h4>
						<div class="grid grid-cols-2 gap-4">
							<div
								class="bg-gray-800/40 p-3 rounded-xl border border-gray-800/50"
							>
								<div class="text-2xl font-bold text-white">
									{blogs.filter((b) => b.youtube?.status === "published")
										.length}
								</div>
								<div class="text-[10px] text-gray-500 font-bold uppercase">
									Published
								</div>
							</div>
							<div
								class="bg-gray-800/40 p-3 rounded-xl border border-gray-800/50"
							>
								<div class="text-2xl font-bold text-white">
									{blogs.filter((b) => b.youtube?.status === "created").length}
								</div>
								<div class="text-[10px] text-gray-500 font-bold uppercase">
									Ready
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Upload Preview Modal -->
{#if selectedBlog && previewVideoUrl}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-6 overflow-y-auto"
		transition:fade={{ duration: 200 }}
	>
		<div
			class="bg-gray-900 border border-gray-800 rounded-[3rem] w-full max-w-7xl shadow-[0_0_100px_-20px_rgba(220,38,38,0.3)] relative overflow-hidden"
			in:slide={{ duration: 400 }}
		>
			<div class="flex flex-col xl:flex-row min-h-[700px]">
				<!-- Video Section -->
				<div
					class="w-full xl:w-[65%] bg-black flex items-center justify-center relative shadow-2xl"
				>
					<video
						src={previewVideoUrl}
						controls
						class="w-full h-full max-h-[80vh] object-contain"
						poster="/assets/video-placeholder.jpg"
					>
						<track kind="captions" />
					</video>

					{#if isUploaded}
						<div
							class="absolute inset-0 bg-emerald-950/40 backdrop-blur-md flex items-center justify-center z-10"
							in:fade
						>
							<div class="text-center" in:slide>
								<div
									class="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(16,185,129,0.5)]"
								>
									<CheckCircle2 class="w-14 h-14 text-white" />
								</div>
								<h2 class="text-5xl font-black text-white mb-2">PUBLISHED</h2>
								<p class="text-emerald-100 text-xl font-medium">
									Content is now live on YouTube
								</p>
							</div>
						</div>
					{/if}
				</div>

				<!-- Info Section -->
				<div
					class="w-full xl:w-[35%] p-10 flex flex-col justify-between border-l border-gray-800 bg-gray-900/50 backdrop-blur-sm"
				>
					<div class="space-y-8">
						<div class="flex justify-between items-center">
							<div
								class="bg-red-500/10 text-red-500 px-4 py-1.5 rounded-full text-xs font-black border border-red-500/20 tracking-tighter"
							>
								YOUTUBE STUDIO PREVIEW
							</div>
							<button
								onclick={() => {
									selectedBlog = null;
									previewVideoUrl = null;
								}}
								class="text-gray-500 hover:text-white transition-all hover:rotate-90 p-2"
							>
								<Trash2 class="w-6 h-6" />
							</button>
						</div>

						<h2 class="text-3xl font-black tracking-tight leading-tight">
							{selectedBlog.title}
						</h2>

						<div class="space-y-6">
							<div>
								<label
									class="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3"
									for="title">Video Title</label
								>
								<input
									type="text"
									id="title"
									value={selectedBlog.title}
									class="w-full bg-black/50 border border-gray-800 rounded-2xl px-5 py-4 text-sm font-medium focus:border-red-500 outline-none transition-all ring-0 focus:ring-4 focus:ring-red-500/10"
								/>
							</div>
							<div>
								<label
									class="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3"
									for="desc">Video Description</label
								>
								<textarea
									id="desc"
									rows="8"
									class="w-full bg-black/50 border border-gray-800 rounded-2xl px-5 py-4 text-sm font-medium focus:border-red-500 outline-none transition-all resize-none ring-0 focus:ring-4 focus:ring-red-500/10"
									>{selectedBlog.summary || ""}</textarea
								>
							</div>
						</div>
					</div>

					<div class="space-y-4 pt-10">
						<button
							onclick={dummyUpload}
							disabled={isUploading || isUploaded}
							class="w-full flex items-center justify-center gap-4 bg-red-600 hover:bg-red-500 disabled:bg-gray-800 disabled:text-gray-500 text-white py-5 rounded-[1.5rem] text-xl font-black transition-all shadow-[0_20px_40px_-10px_rgba(220,38,38,0.4)] active:scale-95 disabled:shadow-none"
						>
							{#if isUploading}
								<Loader2 class="w-6 h-6 animate-spin" />
								UPLOADING...
							{:else if isUploaded}
								<CheckCircle2 class="w-6 h-6" />
								VIEW ANALYTICS
							{:else}
								<Upload class="w-6 h-6" />
								PUBLISH NOW
							{/if}
						</button>

						<button
							onclick={() => {
								selectedBlog = null;
								previewVideoUrl = null;
							}}
							class="w-full py-2 text-gray-500 hover:text-white transition-colors text-sm font-bold tracking-tight"
						>
							CLOSE PREVIEW
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Custom scrollbar for better aesthetics */
	:global(::-webkit-scrollbar) {
		width: 8px;
	}
	:global(::-webkit-scrollbar-track) {
		background: #000;
	}
	:global(::-webkit-scrollbar-thumb) {
		background: #1f2937;
		border-radius: 4px;
	}
	:global(::-webkit-scrollbar-thumb:hover) {
		background: #374151;
	}
</style>
