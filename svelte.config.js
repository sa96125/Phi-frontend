import adapter from '@sveltejs/adapter-auto';
import autoImport from 'sveltekit-autoimport';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$lib: resolve('./src/lib'),
					$components: resolve('./src/lib/components'),
					$services: resolve('./src/services'),
					$store: resolve('./src/lib/store')
				}
			},
			plugins: [
				autoImport({
					components: ['./src/lib/components'],
					module: {
						svelte: ['onMount']
					}
				})
			],
			server: {
				hmr: {
					clientPort: process.env.HMR_HOST ? 443 : 3000,
					host: process.env.HMR_HOST
						? process.env.HMR_HOST.substring('https://'.length)
						: 'localhost'
				}
			},
			define: {
				'process.env': process.env
			}
		}
	}
};

export default config;
