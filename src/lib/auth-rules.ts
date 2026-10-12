/** A fixed callback and home destination avoid user-controlled redirects. */
export function callbackUrl(origin: string) { return new URL('/auth/callback/', origin).href; }
export function validEmail(value: string) { return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
export function validCode(value: string) { return /^\d{6,10}$/.test(value); }
