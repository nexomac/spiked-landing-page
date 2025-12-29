/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event);
    
    // Security Headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // CSP loosened to permit YouTube embeds, Google Fonts, and Vercel Analytics script.
    response.headers.set(
        'Content-Security-Policy',
        [
            "default-src 'self'",
            "img-src 'self' data: https://images.unsplash.com https://placehold.co",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' data: https://fonts.gstatic.com",
            "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
            "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
            "connect-src 'self' https://va.vercel-scripts.com",
        ].join('; ')
    );

	return response;
}
