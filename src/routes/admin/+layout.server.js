import { ADMIN_PASSWORD } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

export function load({ cookies, url }) {
    const authCookie = cookies.get('admin_session');
    
    // Allow login page to be viewed without auth
    if (url.pathname === '/admin/login') {
        if (authCookie === 'true') {
            throw redirect(303, '/admin');
        }
        return;
    }

    if (authCookie !== 'true') {
        throw redirect(303, '/admin/login');
    }
}
