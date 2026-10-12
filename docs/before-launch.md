# Before public launch

This is the release checklist for https://parlons.nielparle.com. Checked items
record user-reported local verification, not production verification.

## Confirmed locally

- [x] Email codes arrive through the configured Namecheap SMTP sender.
- [x] Email sign-in, refresh persistence, sign-out and repeat sign-in work.
- [x] Google sign-in returns to the local Parlons app successfully.

## Production authentication

- [ ] Deploy the authentication feature branch after review; do not merge automatically.
- [ ] Set production `PUBLIC_AUTH_GOOGLE=true` and rebuild. Keep Apple disabled.
- [ ] Keep provider secrets and SMTP credentials in Supabase, never public environment variables.
- [ ] Set Supabase Site URL to `https://parlons.nielparle.com`.
- [ ] Keep the exact Supabase redirect allowlist entry
      `https://parlons.nielparle.com/auth/callback/`; avoid production wildcards.
- [ ] Remove `http://localhost:4324/auth/callback/` and any other unused local or
      preview URLs from the production Supabase redirect allowlist at release.
- [ ] Remove `http://localhost:4324` and other unused development origins from
      the production Google OAuth client's authorized JavaScript origins.
- [ ] Keep `https://parlons.nielparle.com` as the Google authorized origin and
      the hosted Supabase `/auth/v1/callback` URL as Google's redirect URI.
      Do not replace Google's redirect URI with the app's `/auth/callback/`.
- [ ] Use a separate development Supabase project and Google OAuth client for
      continued local sign-in testing. Removing local callbacks from production
      will stop the current local Google flow from returning correctly.
- [ ] Confirm Google audience/publishing settings permit intended public users;
      keep scopes limited to openid, email and profile.
- [ ] Configure Google Parlons branding and complete brand verification for the
      intended consent-screen name/logo. A Supabase custom auth domain is an
      optional separate decision; brand verification does not change the actual
      Supabase callback hostname.
- [ ] Configure Cloudflare Turnstile in both the app and Supabase, and test real
      challenges, expiry and server rejection of missing/invalid tokens.
- [ ] Test email and Google sign-in on the production domain, including cancelled
      Google login, invalid/expired codes, sign-out and refresh persistence.

## Email delivery

- [ ] Confirm sender `parlons@nielparle.com` works as an alias authenticated with
      `bonjour@nielparle.com`; keep newsletter and account messages distinct.
- [ ] Verify SPF, DKIM and DMARC for the actual sender configuration; avoid
      adding duplicate SPF records when maintaining newsletter delivery.
- [ ] Confirm both Confirm signup and Magic link templates contain the code,
      with a 10-minute expiry and appropriate server-side rate limits.
- [ ] Check Namecheap plan sending quotas, bounce handling and inbox placement
      across representative recipient providers. Decide whether a dedicated
      transactional sender is needed as volume grows.

## Product, privacy and operations

- [ ] Show users which account is signed in.
- [ ] Publish a privacy notice reflecting actual account data and providers.
- [ ] Provide a workable account/data deletion process before collecting private
      history; decide retention periods for any new personal data.
- [ ] Keep newsletter membership separate from account access and provide an
      explicit subscription choice and unsubscribe handling.
- [ ] For history/hidden prompts, add versioned migrations, per-user RLS and
      tests proving users cannot read or modify each other's records.
- [ ] Review deployed security headers, including a Content Security Policy
      compatible with Supabase and Turnstile; confirm no secrets are bundled.
- [ ] Test EN/FR independently of practice language, mobile layout, keyboard
      navigation, visible focus, reduced motion, timer accuracy and sound mute.
- [ ] Run tests/build for the release and verify production routes, HTTPS and DNS.
- [ ] Establish backup/recovery and a support contact appropriate to stored data.

## References

- [Authentication setup tutorial](authentication.md)
- [Supabase Google setup](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Supabase redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)
- [Google branding](https://support.google.com/cloud/answer/15549049)
