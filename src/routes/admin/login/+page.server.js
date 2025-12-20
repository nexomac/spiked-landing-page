import { ADMIN_PASSWORD } from '$env/static/private';
import { fail, redirect } from '@sveltejs/kit';
import sanitize from 'mongo-sanitize';
import { dev } from '$app/environment';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        // Sanitize input to prevent object injection if this were matching against a DB
        // Even though here we checking strict equality string, it's good practice
        const password = sanitize(data.get('password'));

        if (password === ADMIN_PASSWORD) {
            cookies.set('admin_session', 'true', {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: !dev, // Secure in production
                maxAge: 60 * 60 * 24 // 1 day
            });
            throw redirect(303, '/admin');
        }

        return fail(401, { incorrect: true });
    }
};
