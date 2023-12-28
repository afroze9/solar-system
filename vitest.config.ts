import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'json', 'html']
		},
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['e2e/**/*']
	}
});
