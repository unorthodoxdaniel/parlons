# Films and series

Added on 31 October 2026 through `20261031120000_add_films_series_prompts.sql`.

35 ideas, each in English and French (70 rows), matching the upper end of the usual 32–35 questions per language in existing categories. Canonical source: `prompt-bank-films-series.csv`. The French adaptations use the existing vous register. Topics cover personal favourites, characters, endings, adaptations, storytelling and viewing habits, without requiring knowledge of a particular title.

The category uses the database key `films-series`, with interface labels “Films and series” and “Films et séries”. Practice language remains independent of interface language.

## Verification

- CSV contains exactly 35 pairs, without repeated wording within a language, and matches the migration texts.
- No exact wording overlaps with existing repository CSV banks.
- Confirmed the linked Supabase project matches the application's public URL.
- Isolated the migration from the unrelated pending account-deletion migration; dry run listed only the films addition.
- Migration applied successfully. Public readback verified all 70 new texts, 35 per language, and all 718 existing rows unchanged: 788 total prompts.
- `npm run build` passed.
