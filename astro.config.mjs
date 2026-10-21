// @ts-check
import { defineConfig, envField } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	env: {
			schema: {
			PUBLIC_SUGGESTIONS_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public', default: '0x4AAAAAAFd4eiCj90agVd_N' }),
			PUBLIC_TURNSTILE_SITE_KEY: envField.string({ context: 'client', access: 'public', default: '' }),
			PUBLIC_AUTH_GOOGLE: envField.boolean({ context: 'client', access: 'public', default: true }),
			PUBLIC_AUTH_APPLE: envField.boolean({ context: 'client', access: 'public', default: false }),
			PUBLIC_SUPABASE_URL: envField.string({ context: 'client', access: 'public' }),
			PUBLIC_SUPABASE_PUBLISHABLE_KEY: envField.string({ context: 'client', access: 'public' }),
		},
	},
});
