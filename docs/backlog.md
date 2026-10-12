# Parlons backlog

## Implemented: useful accounts (hosted user verification next)

- Show the signed-in email discreetly so users can identify their account.
- Save completed practice sessions: prompt, date and actual speaking duration.
- Let signed-in users hide prompts from future roulette selections and undo hiding.
- Make “Don’t show this prompt again” an optional sign-in entry point for anonymous users: show an inline explanation and “Sign in →”. Preserve the selected prompt and pending hide intent through email or Google authentication, return to it and complete the action with confirmation. Keep the destination internal, scope intent to the initiating browser, and handle cancellation, expired intent and save failures without silently hiding anything.
- Add a quiet completion invitation explaining history and hidden prompts.
- Implement private data through migrations and per-user RLS; verify cross-user isolation before release.

## Later decisions

- Optional newsletter invitation, independent from account access.
- Apple sign-in deferred.
- Account/data deletion and retention policy before private-history launch.

## Release

See [before-launch.md](before-launch.md) for deployment and launch checks.

## Completed

- Anonymous practice flow, roulette, timers, facelift and optional sound.
- Email-code and Google sign-in tested locally with real provider configuration.
- Parlons favicon adapted from the Niel Parle style: italic P, paper background and red square.

- Private practice batch implemented on `feature/practice-history`: account identity, history, prompt hiding/undo and anonymous sign-in continuation. Migration tested with isolated two-user RLS checks.
