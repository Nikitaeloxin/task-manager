import { json } from '@sveltejs/kit';

export async function POST({ locals }) {
	await locals.session.destroy();
	return json({ success: true });
}
