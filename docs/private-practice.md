# Private practice: tutorial batch

## What gets saved

Signed-in speaking sessions save when the speaking phase ends, including early
finish. History contains the existing prompt ID, completion date, selected prep
and speaking durations, and actual speaking milliseconds. Paused time is excluded
by the deadline timer. Background overshoot is capped at the selected duration.
These are self-reported practice records, not independently verified scores.
Preparation-only attempts and anonymous sessions are not stored. Signing in later
does not backfill anonymous practice. There is no recording or audio upload.

The session has a random UUID before completion. Retries reuse it and the original
completion date, avoiding duplicate history if a response was lost. A failed save
shows a retry button; leaving or reloading loses that unsaved in-memory record.
History references the current public prompt text, so editorial changes are
reflected in history too. Prompt deletion is restricted while history references
it; plan archival or cleanup explicitly if retiring content.

## Identity and authorization

The SDK authenticates requests through the shared auth client. Account data uses
`user_id` equal to the authenticated identity. The query filter improves clarity
and performance; the database RLS policy is the actual boundary.

Migration `20261012143000_private_practice.sql` adds two tables:

- `practice_sessions`: SELECT, INSERT and DELETE for authenticated owners only.
  No UPDATE grants. Duration checks constrain the fields to supported options.
- `hidden_prompts`: one row per user/prompt pair. Owners can select, insert and
  delete. Anonymous clients have no table privileges. Hidden prompts do not alter
  public content, other users' choices, or an already-selected practice prompt.

Both tables cascade when an Auth user is deleted. No service-role key enters the
browser, and existing public-content policies and grants stay unchanged.

## Sign-in invitation and continuation

Anonymous users can click “Don't show this prompt again” to see an inline sign-in
invitation. Following it puts only a prompt ID and a 15-minute expiry into
`sessionStorage`, in the initiating tab. Successful email or Google sign-in returns
to the fixed internal home route with `restore=hide`. The app validates the intent,
loads the public prompt, restores it, then hides it for the signed-in account and
shows confirmation. No arbitrary redirect destination is accepted. The intent is
consumed once; a failed hide can be retried from the displayed prompt. Cancelled
sign-in leaves it until expiry or a new hide request replaces it. A new tab does
not reliably share this intent, so use the original tab to complete the action.

## Practise again

History links to the fixed home route with a session UUID. The authenticated
client fetches the record under the existing ownership rules, then restores the
current public prompt, practice language, theme and validated durations. Timers
do not start automatically. Users can adjust timings and start normally.

The next completed attempt gets a new UUID and history entry. The old entry stays.
A hidden prompt can be deliberately retried without restoring it to roulette.
Unavailable records show a message; network errors offer retry. No new migration
is needed for replay.

## Account page

`/account/` shows the verified account email, paginated history, and hidden prompts.
Users can delete a session or restore a prompt. User/database text is rendered
with textContent. Dates follow the interface locale, while prompt language markup
stays independent. Sign-out clears visible private lists.

## Verification and deployment

- Unit tests cover elapsed speaking time and malformed/expired continuation data.
- `supabase/tests/private_practice.sql` checks owner reads/inserts/deletes,
  cross-user read/write denial, no update privileges, invalid duration rejection,
  anonymous denial and continued public prompt access. Run only in an isolated
  database after migrations: fixtures use fixed IDs and roll back.
- Browser checks use mocked private data for hiding, failure/retry, exclusion,
  pause-aware duration, save retries, history, deletion, undo, sign-out, EN/FR,
  mobile layout and anonymous email/Google continuation. They do not prove hosted RLS.
- Apply the migration before deploying this app batch; verify real history/hiding
  with two test accounts on the hosted service before public release.
- Keep account deletion, retention, bot protection and privacy notice on the
  [launch checklist](before-launch.md). Newsletters remain a separate choice.
