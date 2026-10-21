# Anonymous community suggestions

Review inbox: [Parlons — Suggestions](https://docs.google.com/spreadsheets/d/1nCc_H587Spm9VM9yCCtfXtf7HjVKjNBedMeuWJWUec4/edit).
The private `Suggestions` tab has ID, submitted date (UTC), type, idea, practice
language, theme, status and review notes. No account, email or IP is stored there.

The footer links to `/suggest/`. Visitors can submit a feature idea or a speaking
prompt/topic without signing in. Prompt ideas require a practice language; a theme
is optional. Supabase supplies only the public language/theme catalogue, never
suggestion storage. Interface language remains separate from practice language.
Drafts stay in this tab's session storage until successful submission.

## Connect the receiver

The Sheet and user-deployed receiver exist. The receiver URL is configured in
`wrangler.jsonc`. The app and Worker were deployed live on 2026-10-20 (version
`8cc47713-bd51-44e0-b6e8-e5d0f43aab9a`). Home and suggestion routes return 200.
Runtime secrets were subsequently configured and confirmed as `secret_text`
bindings. At initial deployment, absent secrets returned 503 as designed.
End-to-end delivery was verified on 2026-10-20: the user completed Turnstile and
submitted an anonymous feature suggestion, confirmed in Suggestions!A2:H2 with
Pending status. The production API also rejects missing verification tokens
with HTTP 403. No merge into main was performed. Drive connector
access is separate from the app's runtime access and cannot deploy Apps Script.

1. In the Sheet, choose Extensions → Apps Script. Replace the starter code with
   `integrations/suggestions-sheet.gs`. Its target spreadsheet ID is already set.
2. In Apps Script Project Settings → Script properties, add `SUGGESTIONS_SECRET`
   with a randomly generated secret of at least 32 bytes. Do not put it in code,
   the Sheet, a public build variable or a Git commit.
3. Deploy → New deployment → Web app. Execute as yourself; access Anyone. Complete
   Google's authorization for this receiver. It exposes no read endpoint; every
   write requires the shared secret. Keep the Sheet itself private.
4. Static-assets-only Workers cannot accept runtime secrets. Deploy the Worker
   code first, then refresh its Settings → Variables and Secrets and add the
   secrets there (not Builds → Variables and secrets).
   The deployed `/exec` URL is configured as `SUGGESTIONS_SHEET_URL` in
   `wrangler.jsonc`. Set Cloudflare Worker secrets with `wrangler secret put`:
   `SUGGESTIONS_SHEET_SECRET` (same secret as step 2) and `TURNSTILE_SECRET_KEY`.
5. The suggestions Turnstile public site key is configured in Astro as the
   default for `PUBLIC_SUGGESTIONS_TURNSTILE_SITE_KEY`. It can be overridden in
   the build environment. The widget must allow `parlons.nielparle.com`; store its
   matching secret as the Cloudflare Worker secret `TURNSTILE_SECRET_KEY`.
   Server-side hostname and `suggestion` action must match. Suggestions use a
   separate public setting from Auth (`PUBLIC_TURNSTILE_SITE_KEY`), whose secret
   remains configured separately in Supabase.
6. Deploy the Worker and static assets together using `wrangler.jsonc`. The new
   Worker handles `/api/suggestions`; all other paths use static assets. Do not
   deploy only `dist/`, which would omit the submission endpoint.
7. Send one real suggestion, verify its row and Pending status, then retry a lost
   response with the same ID and confirm no second row. Verify a rejected/expired
   challenge and a Sheets error never show a success message.

For local full-flow verification, build, copy `.dev.vars.example` to ignored
`.dev.vars`, configure secrets, and run Wrangler development against the build.
`astro dev --background` previews the form, but does not run the Cloudflare API.
Without a public Turnstile key the form reports that submission is not connected;
it never pretends an idea was saved. Test keys can be used locally; use real
widget keys on the production hostname.

## Spam protection and review

- Server-verified Turnstile with action and hostname checks on every submission.
- Cloudflare rate limiting: five attempts per IP per minute, enforced at the edge.
  This is an approximate per-location abuse limit, not a global daily quota.
- Honeypot, same-origin checks, bounded request size and server-side validation.
- A server-only shared secret protects the Google receiver.
- Stable submission UUIDs and a Google script lock prevent duplicate retry rows.
- Formula-like suggestion text is escaped before being written to the Sheet.

The IP is used transiently for edge rate limiting and Turnstile verification;
it is not forwarded to Google. No request bodies or credentials are logged by
the application. Review suitability, originality and duplicates manually. Mark
status Reviewed, Accepted or Declined; add accepted prompts through a separate
migration. Nothing publishes automatically. Choose a retention policy and include
Cloudflare/Google and suggestion handling in the privacy notice before launch.

## Verification

`npm test` includes mocked Worker tests for anonymous submission, verification
failure, rate limiting, invalid/oversized requests, missing configuration and
upstream failures. A receiver test checks secret enforcement, formula escaping
and idempotent retries. These are isolated tests; they do not prove a deployed
Google/Cloudflare connection. Run `npm run build` before release.
