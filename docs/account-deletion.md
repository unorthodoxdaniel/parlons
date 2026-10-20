# Account deletion

The account page has an explicit confirmation and cancel step in English and
French. It calls `delete_own_account()` with the user's access token and no user
ID argument. The security-definer function uses an empty search path, fully
qualified relations and `auth.uid()`; execution is restricted to authenticated
users. It deletes the Auth user, cascading to practice history and hidden prompt
preferences in the same transaction. Public prompts are unaffected. No server
secret or service-role key is needed in the browser.

Apply `supabase/migrations/20261020120000_delete_own_account.sql` through the
normal migration workflow before deploying the UI. Run
`supabase/tests/delete_account.sql` in an isolated database after migrations
(with at least one prompt) to check anonymous rejection, missing-identity
rejection, self-deletion, cascade cleanup and preservation of another account.
Never run deletion verification against a real user's account.

After successful deletion the page clears private data and signs out locally.
Supabase access tokens on other devices can survive until expiry, but the deleted
user cannot create new private rows because their foreign key no longer exists.
Other devices must sign in with a new account to save future practice.

This removes active account data; it does not promise immediate removal from
provider backups or operational logs. Define and publish retention periods before
launch. Anonymous community suggestions are not linked to accounts and are not
removed by account deletion.

Hosted verification: use a disposable test account to confirm cancellation,
success, failure/retry, EN/FR and sign-out on the deployed app after migration.

References:
- https://supabase.com/docs/guides/database/functions
- https://supabase.com/docs/guides/auth/managing-user-data
