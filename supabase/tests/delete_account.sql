-- Run after migrations in a disposable database. Fixtures and deletion roll back.
begin;
insert into auth.users(id) values
 ('00000000-0000-0000-0000-000000000011'),
 ('00000000-0000-0000-0000-000000000012');
insert into public.practice_sessions(id,user_id,prompt_id,preparation_seconds,speaking_seconds,spoken_milliseconds)
select '10000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000011', id,0,60,1000
from public.prompts limit 1;
insert into public.hidden_prompts(user_id,prompt_id)
select '00000000-0000-0000-0000-000000000011',id from public.prompts limit 1;
set local role anon;
do $$begin
 begin
  perform public.delete_own_account();
  raise exception 'Anonymous deletion allowed';
 exception when insufficient_privilege then null; end;
end$$;
set local role authenticated;
select set_config('request.jwt.claim.sub','',true);
do $$begin
 begin
  perform public.delete_own_account();
  raise exception 'Deletion without identity allowed';
 exception when insufficient_privilege then null; end;
end$$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000011',true);
select public.delete_own_account();
reset role;
do $$begin
 if exists(select 1 from auth.users where id='00000000-0000-0000-0000-000000000011') then raise exception 'Account retained'; end if;
 if exists(select 1 from public.practice_sessions where user_id='00000000-0000-0000-0000-000000000011') then raise exception 'History retained'; end if;
 if exists(select 1 from public.hidden_prompts where user_id='00000000-0000-0000-0000-000000000011') then raise exception 'Preferences retained'; end if;
 if not exists(select 1 from auth.users where id='00000000-0000-0000-0000-000000000012') then raise exception 'Other account deleted'; end if;
end$$;
rollback;
