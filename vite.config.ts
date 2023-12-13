import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { isoImport } from 'vite-plugin-iso-import';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), purgeCss(), isoImport()],
	optimizeDeps: {
		include: ['pixi.js']
	},
	server: {
		port: 3000
	}
});
