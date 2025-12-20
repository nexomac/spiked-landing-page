/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event);
    
    // Security Headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // CSP: Allow scripts from self, unsplash (images), placehold.co (images), and inline styles/scripts needed for Svelte/Tiptap
    // Note: Being permissive with 'unsafe-inline' for styles/scripts due to Svelte/Tailwind/Tiptap nature in dev mode.
    // In strict prod, nonces would be better.
    response.headers.set('Content-Security-Policy', "default-src 'self'; img-src 'self' data: https://images.unsplash.com https://placehold.co; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self';");

	return response;
}
