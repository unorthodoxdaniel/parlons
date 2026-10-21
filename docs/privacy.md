# Privacy notice

`/privacy/` is a public, bilingual page using the existing FR/EN switch and
`src/i18n/ui.ts`. The footer links to it. Operator: Daniel Abudu. Public contact: nielparle@gmail.com.

Reviewed against the current Auth client, private-practice migration, browser
storage, suggestion form, Cloudflare Worker and Apps Script receiver on
2026-10-21. Suggestions are included because docs/suggestions.md records a live
manual deployment even though their working files are not committed yet.

The notice describes current account retention (until account or individual
history deletion) and accurately states that suggestions have no automatic
expiry. It does not invent provider backup or log retention periods.

Before publishing:
- Confirm the operator identity/contact details are sufficient for the regions served.
- Confirm the production deletion migration is applied and test with a disposable account.
- Check the actual Supabase plan, backup/log settings, Cloudflare logging and
  any manual exports; document their retention windows. General provider docs
  cannot establish the configuration of this project.
- Choose an operational retention/review schedule for suggestions and support mail;
  implement it before promising fixed deletion periods.
- After deployment, set Google Auth Platform's privacy URL to
  https://parlons.nielparle.com/privacy/ and verify it is publicly accessible.

Provider references checked:
- https://supabase.com/docs/guides/platform/backups
- https://supabase.com/docs/guides/observability/logs
- https://supabase.com/privacy
- https://www.cloudflare.com/privacypolicy/
- https://policies.google.com/privacy
