# Marina Contábil — site institucional

Next.js 15 (App Router) + Tailwind 3. Hospedagem: **Vercel**. Formulário de contato: **Resend** (e-mail). Sem banco de dados: o e-mail recebido é o registro de cada contato.

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
| `CONTACT_CC_EMAIL` | não | cópia (cc) dos contatos. Hoje: `marina@marinacontabil.com` |
| `CONTACT_FROM_EMAIL` | sim | remetente, ex.: `Site Marina Contábil <site@marinacontabil.com>` — o domínio precisa estar **verificado no Resend** |

Sem as três primeiras, o formulário responde erro e o site mostra o telefone (31) 9545-1993 como alternativa.

## Estado da configuração (13/10/2026)
- **GitHub:** repositório `marinacanedo/site` (branch `main`).
- **Supabase:** não é mais usado (removido em 18/10/2026). O projeto do cliente e as variáveis `SUPABASE_*` na Vercel, se existirem, podem ser apagados.
- **Resend:** domínio de envio `mail.marinacontabil.com` (região São Paulo) **adicionado, aguardando DNS**. Só envio; recebimento desligado. O site apenas envia o aviso do formulário para a equipe — não há disparo de e-mails de marketing.

## O que falta para entrar no ar (checklist)
1. **DNS de `mail.marinacontabil.com`** (Resend → Domains → `mail.marinacontabil.com` → Manual setup). Criar 3 registros, copiando os valores do painel do Resend: `TXT resend._domainkey.mail` (DKIM), `CNAME rsend.mail` e `CNAME send.mail`. Em Cloudflare, deixar como *DNS only*. Depois clicar em *Verify DNS Records*. Por ser um subdomínio, não interfere no e-mail atual (Google Workspace).
2. **API key do Resend:** Resend → API keys → *Create API key* → permissão **Sending access**, restrita ao domínio. Copiar direto para a Vercel (a chave só aparece uma vez).
3. **Vercel:** importar `marinacanedo/site`; variáveis: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_CC_EMAIL`, `CONTACT_FROM_EMAIL` (valores base em `.env.example`).
4. **Teste:** enviar o formulário em produção; conferir o e-mail recebido pela Adriana (com cópia para a Marina).
5. **Domínio:** só depois do teste, apontar `marinacontabil.com` para a Vercel e despublicar o Lovable alguns dias depois.
6. Opcional: Google Search Console (enviar `/sitemap.xml`) e Analytics.

## Segurança (resumo)
- Headers: CSP, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, COOP (`next.config.mjs`).
- Formulário: honeypot, validação no servidor, limite de 5 envios/10 min por IP, aceita só origem `marinacontabil.com`/`www`/`*.vercel.app`; segredos só no servidor.
- Nenhum banco de dados nem chave de banco no projeto. `npm audit` sem vulnerabilidades.

## Estrutura
- `app/page.tsx` — página única (+ JSON-LD `AccountingService`/`WebSite`); `app/layout.tsx` — metadados, OG, fontes; `app/robots.ts`, `app/sitemap.ts`, `app/not-found.tsx`; `app/api/contact/route.ts` — envio do formulário.
- `components/` — seções (Hero, Escritório, Serviços, BPO, Equipe, Contato, Rodapé). Dados de contato/redes em `components/site.ts`.
- `public/` — favicon, OG, `llms.txt`; `public/img/` — imagens já em WebP (versionadas).
- `src-photos/` + `npm run images` — originais e script que regenera `public/img` (`sharp`). Para trocar uma foto: substituir em `src-photos/` (mesmo nome) e rodar `npm run images`.

## Domínio canônico
Definido como `https://marinacontabil.com` (confirmado). Se um dia mudar, alterar em `components/site.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` e `public/llms.txt`.

## Pendências de conteúdo (decisão do cliente)
- Depoimentos reais (seção arquivada), cargos finais da equipe, FAQ, Google Analytics/Search Console.
