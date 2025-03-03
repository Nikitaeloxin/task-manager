export function load({ locals }) {
	if (!locals.session.data.userId) {
		return { user: null };
	}
	return { user: { id: locals.session.data.userId } };
}
