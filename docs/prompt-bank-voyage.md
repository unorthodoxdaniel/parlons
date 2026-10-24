# Voyage expansion: imported

Imported on 24 October 2026 through `20261024120000_add_voyage_prompts.sql`.

The user approved TR21–TR50, including the concrete TR26 revision, and authorised publishing all of them. Canonical source: `prompt-bank-voyage.csv` (30 English and 30 French rows). Review wording and editorial direction: `prompt-bank-voyage-review.md`.

## Editorial direction

Keep all existing questions. Focus upcoming additions on Voyage. Aim for two displayed lines, allowing three for a particularly strong idea; actual wrapping varies by screen width and language. Prefer a short setup and one central tension. Include topical discussion angles that work without knowledge of a specific viral post; verify context before referencing current events. French uses the bank's existing vous register.

## Verification

- Confirmed the linked Supabase project matches the application's public URL.
- Captured all 658 existing rows and checked all 60 proposed texts for exact wording conflicts within each language; none found.
- Isolated the migration from the unrelated pending account-deletion migration. CLI dry run listed only the Voyage addition.
- `npm run build` passed.
- CLI reported successful application. Public readback verified every new language/theme/text combination exactly once and every original row unchanged.
- Live bank: 718 prompts, 358 English and 360 French. Voyage: 125 prompts, 62 English and 63 French.

No frontend deployment is required: the application reads the live prompt database.
