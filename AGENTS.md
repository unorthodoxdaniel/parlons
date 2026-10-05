## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

# Parlons

## Project

Parlons is an app for speaking practice: it serves speaking prompts in a chosen practice language and theme. It is a separate application, not a page of Niel Parle, but it belongs to the same visual system. Do not add prominent Niel Parle branding; the only relationship shown is a subtle footer link to nielparle.com.

## Stack

- Astro (static output) with plain CSS
- `@supabase/supabase-js`, used in the browser with the publishable key and Row Level Security
- Supabase CLI migrations in `supabase/migrations/`
- Cloudflare

Prefer Astro and browser-native functionality over adding dependencies. Do not introduce React, Vue, Svelte, Tailwind, UI libraries, or an i18n library unless explicitly requested.

## Design direction

Parlons shares the Niel Parle visual system. The tokens and primitives in `src/styles/global.css` are carried over from `nielparle-site/src/styles/global.css`; keep them in step rather than inventing new ones. Global foundations belong in `src/styles/global.css`; component presentation stays scoped to the component.

The language is editorial rather than app-like:

- warm off-white background (`--paper`), near-black text (`--ink`)
- restrained red accent (`--accent`), muted grey for secondary text (`--muted`)
- serif (Georgia) for display type, the brand, lead copy, prompt text and numerals; sans (Arial) for body text, controls and metadata
- uppercase, letter-spaced `.eyebrow` / `.meta` text for labels
- thin 1px rules (`--ink` for structure, `--rule` for secondary dividers) instead of boxes
- generous whitespace; `.site-shell` for page width, `--reading-width` for text
- controls are text, not chrome: borderless, with underlines and arrows (`→`)

Application UI (selectors, the roulette control, timers, forms) is built in this language: underlined rows for inputs, text buttons, underline or weight for the selected state, and a 1px rule for progress. Radii stay at 0 for controls; the asymmetric micro-radius is only for media.

### Avoid

Do not introduce generic app or SaaS patterns: card-heavy layouts, rounded rectangles, pills, gradients, drop shadows, glassmorphism, decorative blobs, oversized CTA buttons, unnecessary icons, or unnecessary animation. Any motion must be short and must respect `prefers-reduced-motion`.

### Accessibility

- Every interactive element gets the global `:focus-visible` outline; do not remove it.
- `--accent` is about 3.9:1 on `--paper`, which is enough for large text and non-text marks but not for small text. Do not use accent alone for small-text states such as hover or selected; use ink, underline, or weight.
- Controls need a hit area of at least 44px, even when the visible text is small.
- State must never rely on color alone.

## Interface language and practice language

These are two separate things. Never couple them.

- **Interface language** (`en` or `fr`) is the language of Parlons's own UI text. On first visit it follows the browser's preferred language (`fr` and `fr-*` give French, anything else English). The header's FR / EN switch overrides that and the choice is saved in `localStorage` under `parlons:ui-lang`. `<html lang>` and `html[data-ui-lang]` reflect it.
- **Practice language** is the language of the prompt being practised. It comes from the database and is marked up with its own `lang` attribute on the prompt text. Its *initial value* matches the interface language, and it follows the FR / EN switch until the user picks a practice language themselves; from then on the interface switch never changes it.

UI strings live in `src/i18n/ui.ts`, with the same keys in `en` and `fr`. Render them with `<T k="key" />`, which outputs both languages and lets CSS show the active one, so there is no flash and no client-side string swapping. Do not hard-code UI text in components. This is intentionally minimal; do not grow it into a larger localization system without asking.

## Data

- Environment variables `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_PUBLISHABLE_KEY` are public by design. Never use or expose a secret or service-role key in browser code, and never commit `.env` (use `.env.example`).
- Schema changes go through Supabase migrations committed to Git, not the dashboard. `anon` and `authenticated` have SELECT only on the public-content tables (`prompts`, `languages`, `themes`), and RLS stays enabled.
- Prompts are read through the relational model: `prompts.language_id` references `languages` (`code`, `name`) and `prompts.theme_id` references `themes` (`key`, `name`).

## Analytics

Analytics is not configured. Parlons will get its own Umami site; do not reuse Niel Parle's site ID.

## Verification

After meaningful changes run `npm run build` and report any errors. Never claim a change works if the build or the relevant verification failed.

## Git workflow

`main` represents production. Do feature work on separate branches and do not merge into `main` unless explicitly instructed.
