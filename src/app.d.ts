declare namespace App {
	interface Locals {
		session: import('svelte-kit-sessions').Session<{ userId?: number }>;
	}
}