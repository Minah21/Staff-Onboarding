-- E-signatures given after each lesson's acknowledgment
create table if not exists public.onboarding_signatures (
  id bigint generated always as identity primary key,
  staff_name text not null check (char_length(staff_name) between 2 and 120),
  staff_email text not null check (char_length(staff_email) between 5 and 200 and staff_email like '%@%'),
  lesson text not null check (lesson in ('firm','letters','precedents','sop','conduct','billing')),
  acknowledgement text not null check (char_length(acknowledgement) between 10 and 500),
  signature_png text not null check (signature_png like 'data:image/png;base64,%' and char_length(signature_png) < 300000),
  signed_at timestamptz not null default now()
);
create index if not exists onboarding_signatures_email_idx on public.onboarding_signatures (lower(staff_email));
alter table public.onboarding_signatures enable row level security;

-- Staff can submit a signature but cannot read anyone's
create policy "Anyone can submit an e-signature" on public.onboarding_signatures
  for insert to anon, authenticated with check (true);

-- Admins signed in to the Leave Approver can read them
create policy "Admins can read e-signatures" on public.onboarding_signatures
  for select to authenticated
  using (exists (select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin'));
