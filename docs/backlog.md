# Parlons backlog

## Implemented: useful accounts (hosted user verification next)

- Show the signed-in email discreetly so users can identify their account.
- Save completed practice sessions: prompt, date and actual speaking duration.
- Let signed-in users hide prompts from future roulette selections and undo hiding.
- Make “Don’t show this prompt again” an optional sign-in entry point for anonymous users: show an inline explanation and “Sign in →”. Preserve the selected prompt and pending hide intent through email or Google authentication, return to it and complete the action with confirmation. Keep the destination internal, scope intent to the initiating browser, and handle cancellation, expired intent and save failures without silently hiding anything.
- Add a quiet completion invitation explaining history and hidden prompts.
- Implement private data through migrations and per-user RLS; verify cross-user isolation before release.

## Later decisions

- Refine the account/history page within the existing editorial visual system.
- Apple sign-in deferred.
- Account deletion implemented; apply the migration and verify with a disposable hosted account. See [account-deletion.md](account-deletion.md). Publish a retention policy before private-history launch.

## Planned: newsletter and community suggestions

- Add a quiet, optional “Join the Niel Parle newsletter” invitation with an unchecked checkbox, independent from account access. Explain what subscribers will receive and link the relevant privacy information.
- Connect explicit newsletter opt-ins to Kit after verified sign-in through a server-side integration. Keep the Kit API key out of browser code; record consent wording/version and timestamp, handle delivery failures without blocking sign-in, and respect existing unsubscribes. Decide which Kit form/tag to use and whether to require email confirmation before implementation.
- Implemented community suggestions on `codex/community-suggestions`: anonymous footer form, feature/prompt choices, tab-local drafts, private Google Sheet review inbox and Cloudflare spam protection. Deploy the Google receiver and configure secrets before live submissions; see [suggestions.md](suggestions.md).
- Review submissions manually before publication. Contributor credit is not included.

## Release

See [before-launch.md](before-launch.md) for deployment and launch checks.

## Completed

- History replay restores prompt and timings, then saves each new attempt separately.
- Anonymous practice flow, roulette, timers, facelift and optional sound.
- Email-code and Google sign-in tested locally with real provider configuration.
- Parlons favicon adapted from the Niel Parle style: italic P, paper background and red square.

- Private practice batch implemented on `feature/practice-history`: account identity, history, prompt hiding/undo and anonymous sign-in continuation. Migration tested with isolated two-user RLS checks.

- Practice language remembers an explicit choice per browser, otherwise uses the first supported browser language. Interface language remains independent.
- Plan an original, reviewed prompt bank across varied topics and speaking tasks, with duplicate checks and a repeatable import process.

- Home now runs the roulette automatically after language/preferences load and after setup changes. Reduced motion skips the shuffle; timers still start only on request.
- Expanded the [20 prompt taste-test drafts](prompt-drafts.md) into a [300-prompt bilingual review bank](prompt-bank-drafts.md), with a structured CSV for eventual import. Imported all 300 into Supabase after exact-duplicate checks; the original six prompts and their IDs were preserved.
