import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { sveltekitSessionHandle } from 'svelte-kit-sessions';

const checkAuthorizationHandle: Handle = async ({ event, resolve }) => {
	const userId = event.locals.session.data.userId;
    console.log('userId', userId);
    const permitedPaths = ['/auth/login', '/api/auth/login', '/auth/register', '/api/auth/register'];
    if (!userId && !permitedPaths.includes(event.url.pathname)) {
        return new Response(null, {
            status: 303,
            headers: { Location: '/auth/login' }
        });
    }

    return resolve(event);
};


export const handle: Handle = sequence(
    sveltekitSessionHandle({ secret: 'super-secret-key', cookie: { secure:true } }),
	checkAuthorizationHandle
);
