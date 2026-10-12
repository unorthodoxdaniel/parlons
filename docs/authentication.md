# Authentication: first tutorial batch

## What this batch does

Anonymous practice remains available. `/auth/` uses one email-code flow for both
new accounts and returning users. Supabase sends and verifies the code. The
header updates after sign-in and supports signing out of this browser. Google
and Apple buttons are hidden until their public availability flags are enabled.
History, saved prompts, hidden prompts and account deletion are separate batches;
this screen does not promise those features yet.

## How identity and access differ

Authentication answers "who is this person?" Supabase Auth owns the identity,
short-lived access tokens and refresh tokens. The app never stores passwords.
The static browser app uses the existing SDK to persist and refresh sessions in
browser storage. `getUser()` verifies a session with Auth before showing sign-in
success. A header state is only a presentation hint, never permission to read data.

Authorization answers "what can this person access?" Public prompts retain their
read-only client, SELECT grants and RLS policies. We have added no private tables.
When adding history, each table will need RLS based on `auth.uid()` and tests
proving that user A cannot read or modify user B's records. A client-side filter
is not a substitute for these database checks.

Browser session storage is accessible to scripts on the same origin. Continue
using textContent or escaped localization helpers for user/database text, avoid
untrusted scripts, and review a deployment Content Security Policy before launch.
A future server-rendered architecture would need a separate cookie/session design.

## Email setup in the hosted Supabase project

Local `supabase/config.toml` changes do not update the hosted project.

1. In Authentication > Sign In / Providers, enable Email sign-up and confirmation.
   Although this UI uses codes, set a strong minimum password length for the
   server-side email provider too; the local config uses 12 characters.
2. Set email code expiration to 10 minutes and send frequency to at least 60 seconds.
   Keep server-side authentication rate limits enabled; our resend cooldown is UX,
   not an abuse-prevention boundary.
3. Set BOTH Confirm signup and Magic Link email templates to the supplied
   `supabase/templates/email-code.html`. The `{{ .Token }}` placeholder produces
   the code. Without this step the default templates send links instead of the
   code expected by this UI. Confirm the configured OTP length matches 6–10 digits.
4. Configure production SMTP and a verified sender. The default Supabase sender
   has restrictions and is not suitable for public launch.
5. Set the Site URL to the actual production origin and allow exact callback URLs
   ending in `/auth/callback/` for production and approved development/preview
   origins. Avoid broad wildcard production redirects. Local preview here uses
   `http://localhost:4324/auth/callback/`.
6. Before a public rollout, create a Cloudflare Turnstile widget for approved
   domains. Put its secret in Supabase Authentication > Bot and Abuse Protection
   and set `PUBLIC_TURNSTILE_SITE_KEY` to the public site key in the app environment.
   Rebuild. The form renders verification only when this key is set, sends the
   resulting token with email requests, and resets the widget after each request.
   Test real challenge success/expiry and refusal without a token. Both the app
   widget and Supabase server enforcement must be configured together.

## Google setup

1. Create a Google Cloud OAuth web client and consent configuration for Parlons.
2. In Google, register the Supabase callback shown in Authentication > Providers >
   Google as the authorized redirect URI (the Supabase `/auth/v1/callback` URL).
3. Enter the client ID and secret in the Supabase provider configuration only.
4. Add the app callback URLs in Supabase's redirect allowlist as above.
5. Test sign-in and cancellation, then set `PUBLIC_AUTH_GOOGLE=true` in the app's
   environment and rebuild. Provider secrets never belong in public variables.

## Apple setup

1. Use an Apple Developer account; configure an App ID supporting Sign in with
   Apple, a web Services ID, the web domain and the Supabase provider callback.
2. Create the signing key and Apple client secret; save them only in the provider
   dashboard or an appropriate secret manager, never this repository or chat.
3. Configure the Apple provider in Supabase. Web OAuth secrets require rotation
   at least every six months; track their expiry as an operational responsibility.
4. Register the email sender with Apple's private email relay if supporting
   users who choose Hide My Email.
5. Test real Apple sign-in and cancellation, then enable `PUBLIC_AUTH_APPLE=true`
   and rebuild. Follow Apple's branding requirements before public launch.

## OAuth callback safety

OAuth uses PKCE: a verifier in the initiating browser is paired with the returned
code. The callback exchanges it for a session and verifies the user. It removes
callback parameters from the address bar and only redirects to `/`; no supplied
`next` parameter or external URL is accepted. Referrer policy is `no-referrer`.
Provider errors are presented as a generic retry message, not rendered from URLs.

## Verification and limitations

`npm test` checks the callback destination and email/code validation alongside
roulette and timer rules. Browser checks with mocked Auth passed for send/verify, invalid code,
resend cooldown, sign-out, session restoration, EN/FR, keyboard focus, narrow
layout, callback success/failure and anonymous practice. Isolated provider/CAPTCHA checks passed for missing-token
refusal, token transmission/reset and Google/Apple PKCE redirect construction.
Mocked Auth responses
validate app behavior, not email delivery or the providers' configurations.
Complete real email, Google and Apple end-to-end checks after hosted setup.

Sources:
- https://supabase.com/docs/guides/auth/auth-email-passwordless
- https://supabase.com/docs/guides/auth/social-login/auth-google
- https://supabase.com/docs/guides/auth/social-login/auth-apple
- https://supabase.com/docs/guides/auth/sessions/pkce-flow
- https://supabase.com/docs/guides/auth/auth-smtp
