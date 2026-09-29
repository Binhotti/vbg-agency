# VBG Agency

Site institucional e painel de projetos da VBG Agency, desenvolvido em Next.js e preparado para deploy contínuo na Vercel.

## Desenvolvimento local

1. Instale as dependências com `pnpm install`.
2. Copie `.env.example` para `.env.local` e defina as variáveis.
3. Execute `pnpm dev` e acesse `http://localhost:3000`.

## Painel administrativo

O painel fica em `/admin`. Em produção, defina `ADMIN_PASSWORD`, `AUTH_SECRET` e conecte um Vercel Blob para obter `BLOB_READ_WRITE_TOKEN`. As imagens e o índice de projetos serão persistidos no Blob; em desenvolvimento local, o cadastro usa `data/projects.json`.

## Convenção de commits

O projeto segue Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:` e `chore:`.

## Infraestrutura

Deploy contínuo via GitHub e armazenamento de projetos com Vercel Blob na região de São Paulo.
