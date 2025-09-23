-- Enable required extensions
create extension if not exists pgcrypto;
create extension if not exists uuid-ossp;

-- Messages
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  recipient_email text not null check (position('@' in recipient_email) > 1),
  content_text    text not null,
  content_encrypted boolean not null default false,
  status          text not null check (status in ('draft','queued','sent','failed')) default 'draft',
  mode            text not null check (mode in ('dms','scheduled')),
  delivery_at     timestamptz,
  created_at      timestamptz default now()
);

create index if not exists idx_messages_user_id on public.messages(user_id);
create index if not exists idx_messages_created_at on public.messages(created_at desc);

-- Trigger to enforce delivery_at presence for scheduled
create or replace function ensure_delivery_date()
returns trigger as $$
begin
  if (new.mode = 'scheduled' and new.delivery_at is null) then
    raise exception 'delivery_at required for scheduled mode';
  end if;
  if (new.mode = 'dms') then
    new.delivery_at = null;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_messages_mode on public.messages;
create trigger trg_messages_mode before insert or update on public.messages
for each row execute function ensure_delivery_date();

-- RLS
alter table public.messages enable row level security;

drop policy if exists "Select own messages" on public.messages;
drop policy if exists "Insert own messages" on public.messages;
drop policy if exists "Update own messages" on public.messages;
drop policy if exists "Delete own messages" on public.messages;

create policy "Select own messages"
on public.messages for select
using (auth.uid() = user_id);

create policy "Insert own messages"
on public.messages for insert
with check (auth.uid() = user_id);

create policy "Update own messages"
on public.messages for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Delete own messages"
on public.messages for delete
using (auth.uid() = user_id);

-- Deliveries queue
create table if not exists public.deliveries (
  id uuid primary key default gen_random_uuid(),
  message_id uuid references public.messages(id) on delete cascade,
  planned_at timestamptz not null,
  sent_at timestamptz,
  status text not null check (status in ('pending','processing','sent','failed')) default 'pending',
  error text,
  created_at timestamptz default now()
);
create index if not exists idx_deliveries_planned on public.deliveries(planned_at);

-- Audit log
create table if not exists public.message_events (
  id uuid primary key default gen_random_uuid(),
  message_id uuid references public.messages(id) on delete cascade,
  event text not null check (event in ('created','updated','queued','sent','failed')),
  note text,
  created_at timestamptz default now()
);
create index if not exists idx_message_events_message on public.message_events(message_id);
