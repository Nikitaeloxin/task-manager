import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	define: {
		'process.env.REDIS_URL': JSON.stringify(process.env.REDIS_URL),
	}
});
