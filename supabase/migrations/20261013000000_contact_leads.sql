-- Leads do formulário de contato do site. Escrita apenas pelo servidor (service role); RLS ligado e sem policies = sem acesso público.
create table if not exists public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null check (char_length(nome) <= 100),
  email text not null check (char_length(email) <= 255),
  telefone text check (char_length(telefone) <= 30),
  mensagem text not null check (char_length(mensagem) <= 1000),
  email_enviado boolean not null default false
);
alter table public.contact_leads enable row level security;
create index if not exists contact_leads_created_at_idx on public.contact_leads (created_at desc);
