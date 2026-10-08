create table if not exists public.investigation_scores (
  id uuid primary key default gen_random_uuid(),
  player_name text not null
    check (char_length(btrim(player_name)) between 1 and 24),
  duration_ms integer not null
    check (duration_ms between 1000 and 86400000),
  completed_at timestamptz not null default now()
);

alter table public.investigation_scores
  add column if not exists player_name_key text
  generated always as (
    lower(regexp_replace(btrim(player_name), '\s+', ' ', 'g'))
  ) stored;

with ranked_scores as (
  select
    id,
    row_number() over (
      partition by player_name_key
      order by duration_ms asc, completed_at asc, id asc
    ) as duplicate_rank
  from public.investigation_scores
)
delete from public.investigation_scores as scores
using ranked_scores
where scores.id = ranked_scores.id
  and ranked_scores.duplicate_rank > 1;

create unique index if not exists investigation_scores_player_name_key_uidx
  on public.investigation_scores (player_name_key);

alter table public.investigation_scores enable row level security;

drop policy if exists "Anyone can read investigation scores"
  on public.investigation_scores;
create policy "Anyone can read investigation scores"
  on public.investigation_scores
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Anyone can submit valid investigation scores"
  on public.investigation_scores;
revoke insert, update, delete, truncate
  on public.investigation_scores
  from anon, authenticated;
grant select on public.investigation_scores to anon, authenticated;

create or replace function public.submit_investigation_score(
  p_player_name text,
  p_duration_ms integer
)
returns table (
  id uuid,
  player_name text,
  duration_ms integer,
  completed_at timestamptz
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_player_name text;
  current_score public.investigation_scores%rowtype;
begin
  normalized_player_name := pg_catalog.regexp_replace(
    pg_catalog.btrim(p_player_name),
    '\s+',
    ' ',
    'g'
  );

  if normalized_player_name is null
    or pg_catalog.char_length(normalized_player_name) not between 2 and 24 then
    raise exception 'Player name must contain between 2 and 24 characters.'
      using errcode = '22023';
  end if;

  if p_duration_ms is null or p_duration_ms not between 1000 and 86400000 then
    raise exception 'Investigation time must be between 1 second and 24 hours.'
      using errcode = '22023';
  end if;

  insert into public.investigation_scores (
    player_name,
    duration_ms
  )
  values (normalized_player_name, p_duration_ms)
  on conflict (player_name_key)
  do nothing;

  if found then
    select *
      into current_score
      from public.investigation_scores
     where player_name_key = pg_catalog.lower(normalized_player_name);
  else
    select *
      into current_score
      from public.investigation_scores
     where player_name_key = pg_catalog.lower(normalized_player_name)
     for update;

    if p_duration_ms < current_score.duration_ms then
      update public.investigation_scores
         set player_name = normalized_player_name,
             duration_ms = p_duration_ms,
             completed_at = pg_catalog.now()
       where id = current_score.id
       returning * into current_score;
    end if;
  end if;

  return query
  select
    current_score.id,
    current_score.player_name,
    current_score.duration_ms,
    current_score.completed_at;
end;
$$;

revoke all on function public.submit_investigation_score(text, integer)
  from public, anon, authenticated;
grant execute on function public.submit_investigation_score(text, integer)
  to anon, authenticated;

notify pgrst, 'reload schema';
