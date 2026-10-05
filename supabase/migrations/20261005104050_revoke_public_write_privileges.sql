-- Defense in depth for public-content tables: anon and authenticated only need
-- to read them. RLS already blocks writes (no write policies exist), but
-- Supabase's default grants also give these roles INSERT/UPDATE/DELETE/TRUNCATE.
-- Remove everything except SELECT. RLS and the SELECT policies are unchanged.

revoke all on table public.prompts   from anon, authenticated;
revoke all on table public.languages from anon, authenticated;
revoke all on table public.themes    from anon, authenticated;

grant select on table public.prompts   to anon, authenticated;
grant select on table public.languages to anon, authenticated;
grant select on table public.themes    to anon, authenticated;

-- Identity sequences are only used when inserting rows, which these roles no
-- longer do.
revoke all on sequence public.prompts_id_seq   from anon, authenticated;
revoke all on sequence public.languages_id_seq from anon, authenticated;
revoke all on sequence public.themes_id_seq    from anon, authenticated;
