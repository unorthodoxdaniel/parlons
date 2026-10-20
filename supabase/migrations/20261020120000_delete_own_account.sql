-- No user ID argument: even a modified client can only delete its own account.
create function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  owner_id uuid := auth.uid();
begin
  if owner_id is null then
    raise exception 'Authentication required' using errcode = '42501';
  end if;
  -- Existing foreign keys cascade to practice sessions, hidden prompts and Auth data.
  -- A failure rolls the entire operation back.
  delete from auth.users where id = owner_id;
end;
$$;
revoke all on function public.delete_own_account() from public, anon, authenticated;
grant execute on function public.delete_own_account() to authenticated;
