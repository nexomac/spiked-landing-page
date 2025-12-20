import { redirect, error } from '@sveltejs/kit';

export function requireAuth(cookies) {
    const session = cookies.get('admin_session');
    if (session !== 'true') {
        throw error(401, 'Unauthorized');
    }
}
