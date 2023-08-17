import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: '',
			polyfill: true
		}),
		alias: {
			$components: 'src/components',
			$assets: 'src/assets',
			$actions: 'src/libs/actions',
			$helpers: 'src/libs/helpers',
			$stores: 'src/libs/stores',
			$types: 'src/app.d.ts',
			$constants: 'src/libs/constants',
			$libs: 'src/libs'
		}
	},
	preprocess: vitePreprocess()
};

export default config;
