# Reviewed prompt expansion: imported

Imported into the linked Supabase project on **21 October 2026** through migration `20261021120000_expand_reviewed_prompt_bank.sql`.

## Content and approval

- Two 100-idea English draft batches were compared with all 306 live prompt rows and with each other.
- Final selection: 170 original drafts plus six approved rewrites; 24 cuts.
- EL05 and RE06 were explicitly retained after the overlap review.
- The user approved the rewrites and authorised importing the final set.
- Each selected idea has a natural French adaptation using the existing bank's “vous” register.
- Canonical import source: [prompt-bank-expansion.csv](prompt-bank-expansion.csv), 352 rows with stable review IDs, theme, language and final text.
- Review decisions: [editorial review](prompt-bank-editorial-review.md) and [disposition CSV](prompt-bank-editorial-decisions.csv). Original draft files are historical references, not the import source.

## Verified live totals

**658 rows: 328 English, 330 French.** This import added 176 in each language. Counts include the two previously identified legacy duplicate pairs, which were preserved.

| Theme | English | French | Total |
|---|---:|---:|---:|
| everyday-life | 33 | 33 | 66 |
| relationships | 35 | 35 | 70 |
| culture | 33 | 33 | 66 |
| society | 32 | 32 | 64 |
| memories | 35 | 35 | 70 |
| learning | 32 | 32 | 64 |
| imagination | 32 | 32 | 64 |
| work | 29 | 31 | 60 |
| travel | 32 | 33 | 65 |
| technology | 35 | 34 | 69 |
| **Total** | **328** | **330** | **658** |

## Import and verification

- Confirmed the linked CLI project matches the application's public Supabase URL.
- Checked all 352 final texts against the live bank: no existing wording conflicts.
- Verified the SQL data matches the CSV exactly, with one row in each language per selected idea and none of the 24 rejected ideas.
- The migration uses one atomic block, validates lookup rows, skips existing wording within a language, and verifies every expected language/theme/text combination before finishing. It changes no grants or RLS policies.
- The CLI preview listed only the prompt expansion. An isolated CLI working directory omitted the unrelated pending `20261020120000_delete_own_account.sql`; that migration was not applied or marked applied by this import.
- The CLI reported successful application. Read back all public prompts through the publishable client and verified every addition, the 658-row total and all 306 pre-import IDs/texts/themes/languages unchanged.
- `npm run build` passed.

Prompt rotation and automatic cycling are separate application work and were not changed by this content import.
