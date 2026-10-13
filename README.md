# Marina Contábil — site institucional

Next.js 15 (App Router) + Tailwind 3. Hospedagem: **Vercel**. Formulário de contato: **Resend** (e-mail) + **Supabase** (registro dos contatos, opcional).

## Rodar localmente
```bash
npm install
cp .env.example .env.local   # preencher (veja abaixo)
npm run dev                  # http://localhost:3000
npm run typecheck && npm run build
```

## Publicar na Vercel
1. Vercel → *Add New Project* → importar este repositório (framework detectado: Next.js; sem configuração extra).
2. Em *Settings → Environment Variables* cadastrar as variáveis da próxima seção (Production e Preview).
3. *Settings → Domains*: adicionar `marinacontabil.com` (e `www`, redirecionando para o principal). Ajustar o DNS conforme a Vercel indicar **somente na hora da virada**.

## Variáveis de ambiente
| Variável | Obrigatória | Descrição |
|---|---|---|
| `RESEND_API_KEY` | sim | chave de API do Resend (permissão "Sending access") |
| `CONTACT_TO_EMAIL` | sim | quem recebe os contatos (vários: separados por vírgula). Hoje: `adriana@marinacontabil.com.br` |
| `CONTACT_FROM_EMAIL` | sim | remetente, ex.: `Site Marina Contábil <site@marinacontabil.com>` — o domínio precisa estar **verificado no Resend** |
| `SUPABASE_URL` | não | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | não | chave *service role* (só servidor; nunca com prefixo `NEXT_PUBLIC_`) |

Sem as três primeiras, o formulário responde erro e o site mostra o telefone (31) 9545-1993 como alternativa.

## Resend (e-mail do formulário)
1. Criar conta → *Domains* → adicionar o domínio de envio e publicar no DNS os registros SPF/DKIM que o Resend mostrar (se o domínio já tem SPF, **mesclar** em um único registro).
2. Criar a API key e cadastrar na Vercel.

## Supabase (registro dos contatos — opcional)
1. Criar projeto; no SQL Editor rodar `supabase/migrations/20261013000000_contact_leads.sql` (ou `supabase db push`).
2. A tabela `contact_leads` tem RLS ligado e nenhuma policy: só o servidor (service role) grava/lê. Consultar pelo painel do Supabase.
3. Cadastrar `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` na Vercel.

## Estrutura
- `app/page.tsx` — página única (+ JSON-LD `AccountingService`/`WebSite`); `app/layout.tsx` — metadados, OG, fontes; `app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx`; `app/api/contact/route.ts` — envio do formulário.
- `components/` — seções (Hero, Escritório, Serviços, BPO, Equipe, Contato, Rodapé). Dados de contato/redes em `components/site.ts`.
- `public/` — favicon, OG, `llms.txt`; `public/img/` — imagens já em WebP (versionadas).
- `src-photos/` + `npm run images` — originais e script que regenera `public/img` (`sharp`). Para trocar uma foto: substituir em `src-photos/` (mesmo nome) e rodar `npm run images`.

## Domínio canônico
Definido como `https://marinacontabil.com`. Se o principal for `.com.br`, alterar em `components/site.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` e `public/llms.txt`.

## Pendências de conteúdo (decisão do cliente)
- Depoimentos reais (seção arquivada), cargos finais da equipe, FAQ, Google Analytics/Search Console.
