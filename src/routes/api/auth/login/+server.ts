import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST({ request, locals }) {
	const { email, password } = await request.json();
	const user = await prisma.user.findUnique({ where: { email } });

	if (!user || !(await bcrypt.compare(password, user.password))) {
		return json({ error: 'Invalid credentials' }, { status: 400 });
	}
  console.log(user);
	await locals.session.setData({ userId: user.id });
	await locals.session.save();

	return json({ success: true });
}
