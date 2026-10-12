-- Private account data. Public prompts and their existing policies stay unchanged.
create table public.practice_sessions (
  id uuid primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  prompt_id bigint not null references public.prompts(id),
  completed_at timestamptz not null default now(),
  preparation_seconds integer not null check (preparation_seconds in (0,120,300,600)),
  speaking_seconds integer not null check (speaking_seconds in (60,150,300,600)),
  spoken_milliseconds integer not null check (spoken_milliseconds >= 0 and spoken_milliseconds <= speaking_seconds * 1000)
);
create index practice_sessions_user_completed_idx on public.practice_sessions(user_id, completed_at desc, id);
create table public.hidden_prompts (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  prompt_id bigint not null references public.prompts(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id, prompt_id)
);
alter table public.practice_sessions enable row level security;
alter table public.hidden_prompts enable row level security;
revoke all on public.practice_sessions, public.hidden_prompts from public, anon, authenticated;
grant select, insert, delete on public.practice_sessions, public.hidden_prompts to authenticated;
create policy sessions_read on public.practice_sessions for select to authenticated using ((select auth.uid()) = user_id);
create policy sessions_insert on public.practice_sessions for insert to authenticated with check ((select auth.uid()) = user_id);
create policy sessions_delete on public.practice_sessions for delete to authenticated using ((select auth.uid()) = user_id);
create policy hidden_read on public.hidden_prompts for select to authenticated using ((select auth.uid()) = user_id);
create policy hidden_insert on public.hidden_prompts for insert to authenticated with check ((select auth.uid()) = user_id);
create policy hidden_delete on public.hidden_prompts for delete to authenticated using ((select auth.uid()) = user_id);
