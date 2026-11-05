-- Staff onboarding test results
create table if not exists public.onboarding_results (
  id bigint generated always as identity primary key,
  staff_name text not null check (char_length(staff_name) between 2 and 120),
  staff_email text not null check (char_length(staff_email) between 5 and 200 and staff_email like '%@%'),
  lesson text not null check (lesson in ('firm','letters','precedents','sop','conduct','billing')),
  score int not null check (score >= 0),
  total int not null check (total > 0 and score <= total),
  percent numeric(5,2) not null check (percent between 0 and 100),
  passed boolean not null,
  acknowledged boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists onboarding_results_email_idx on public.onboarding_results (lower(staff_email));
alter table public.onboarding_results enable row level security;

-- New staff (not signed in) can submit a result but cannot read anyone's results.
-- A result only counts as passed when the score is MORE than 75%.
create policy "Anyone can submit a test result" on public.onboarding_results
  for insert to anon, authenticated
  with check (passed = (percent > 75));

-- Admins signed in to the Leave Approver can read all results.
create policy "Admins can read results" on public.onboarding_results
  for select to authenticated
  using (exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin'));

-- Handy summary for the Supabase dashboard
create or replace view public.onboarding_progress with (security_invoker = true) as
select lower(staff_email) as staff_email,
       max(staff_name) as staff_name,
       count(distinct lesson) filter (where passed) as lessons_passed,
       max(created_at) as last_activity
from public.onboarding_results
group by lower(staff_email);
