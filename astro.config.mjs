// @ts-check
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	env: {
		schema: {
			PUBLIC_SUPABASE_URL: envField.string({ context: 'client', access: 'public' }),
			PUBLIC_SUPABASE_PUBLISHABLE_KEY: envField.string({ context: 'client', access: 'public' }),
		},
	},
});
