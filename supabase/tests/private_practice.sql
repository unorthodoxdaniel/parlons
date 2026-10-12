-- Run after migrations in an isolated disposable database; all fixtures roll back.
begin;
insert into auth.users(id) values
 ('00000000-0000-0000-0000-000000000001'),
 ('00000000-0000-0000-0000-000000000002');
insert into public.languages(code,name) values ('test','Test') returning id;
insert into public.prompts(id,text,language_id,theme_id)
values (999999,'RLS test prompt',(select id from public.languages where code='test'),(select id from public.themes limit 1));
set local role authenticated;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000001',true);
insert into public.practice_sessions(id,prompt_id,preparation_seconds,speaking_seconds,spoken_milliseconds)
 values ('10000000-0000-0000-0000-000000000001',999999,0,60,15000);
insert into public.hidden_prompts(prompt_id) values (999999);
do $$begin
 if (select count(*) from public.practice_sessions) <> 1 then raise exception 'Owner cannot read session';end if;
 if (select count(*) from public.hidden_prompts) <> 1 then raise exception 'Owner cannot read hidden prompt';end if;
 begin
  insert into public.hidden_prompts(user_id,prompt_id) values ('00000000-0000-0000-0000-000000000002',999999);
  raise exception 'Cross-user insert allowed';
 exception when insufficient_privilege then null;end;
 begin
  insert into public.practice_sessions(id,user_id,prompt_id,preparation_seconds,speaking_seconds,spoken_milliseconds)
   values ('10000000-0000-0000-0000-000000000002','00000000-0000-0000-0000-000000000002',999999,0,60,0);
  raise exception 'Cross-user session insert allowed';
 exception when insufficient_privilege then null;end;
 begin
  update public.practice_sessions set spoken_milliseconds=0;
  raise exception 'Session update allowed';
 exception when insufficient_privilege then null;end;
 begin
  insert into public.practice_sessions(id,prompt_id,preparation_seconds,speaking_seconds,spoken_milliseconds)
   values ('10000000-0000-0000-0000-000000000003',999999,0,60,60001);
  raise exception 'Invalid duration allowed';
 exception when check_violation then null;end;
end$$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000002',true);
do $$declare affected integer;begin
 if exists(select 1 from public.practice_sessions) or exists(select 1 from public.hidden_prompts) then raise exception 'Cross-user read allowed';end if;
 delete from public.practice_sessions;get diagnostics affected=row_count;
 if affected<>0 then raise exception 'Cross-user session delete allowed';end if;
 delete from public.hidden_prompts;get diagnostics affected=row_count;
 if affected<>0 then raise exception 'Cross-user hidden delete allowed';end if;
end$$;
select set_config('request.jwt.claim.sub','00000000-0000-0000-0000-000000000001',true);
delete from public.hidden_prompts where prompt_id=999999;
delete from public.practice_sessions where id='10000000-0000-0000-0000-000000000001';
do $$begin
 if exists(select 1 from public.practice_sessions) or exists(select 1 from public.hidden_prompts) then raise exception 'Owner delete failed';end if;
end$$;
set local role anon;
do $$begin
 begin perform * from public.practice_sessions;raise exception 'Anonymous session access allowed';exception when insufficient_privilege then null;end;
 begin perform * from public.hidden_prompts;raise exception 'Anonymous hidden access allowed';exception when insufficient_privilege then null;end;
 begin insert into public.hidden_prompts(prompt_id) values (999999);raise exception 'Anonymous write allowed';exception when insufficient_privilege then null;end;
 if not exists(select 1 from public.prompts where id=999999) then raise exception 'Anonymous public read broken';end if;
end$$;
rollback;
