# Skill: Guia de Implantação e Otimização no Cloudflare Pages (Next.js)

Este guia serve como um blueprint e conjunto de instruções técnicas para a implantação impecável de projetos Next.js (App Router) na plataforma **Cloudflare Pages**, detalhando como contornar e erradicar permanentemente os erros mais comuns de compilação, tipos e roteamento no Edge.

---

## 🚀 1. Arquiteturas de Implantação no Cloudflare
Existem duas formas principais de rodar projetos Next.js na Cloudflare:

1. **Static Export (SSG Completo - Recomendado para Performance Máxima)**:
   - O Next.js compila o site inteiro em arquivos HTML, CSS e JS estáticos durante o build (`output: 'export'`).
   - A Cloudflare entrega os arquivos diretamente de sua rede global de cache (CDN), com **zero custo de execução** de funções e velocidade de carregamento instantânea (milissegundos).
2. **Next-on-Pages (Híbrido SSR + Edge Workers)**:
   - Transforma as rotas dinâmicas e Server Actions em Cloudflare Workers (Edge Computing) usando o compilador `@cloudflare/next-on-pages`.

---

## ⚠️ 2. Resolução de Erros Críticos (Como Evitar Falhas no Build)

### 🔴 Erro 1: "useSearchParams() should be wrapped in a suspense boundary"
* **Causa**: Ao utilizar o hook `useSearchParams()` em componentes do cliente, o Next.js tenta pré-renderizar a página de forma estática durante o build. Como a URL de consulta não existe em tempo de compilação, o compilador bails out e falha o build da página `/404` ou `/` com `prerender-error`.
* **Solução Definitiva**: Todo componente que consome `useSearchParams()` deve ser envelopado por uma tag `<Suspense>` no layout global ou no ponto de invocação:
```tsx
// app/layout.tsx
import { Suspense } from 'react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Suspense fallback={<div className="animate-pulse">Carregando...</div>}>
          <Sidebar />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  )
}
```

---

### 🔴 Erro 2: Esgotamento de Conexões do Banco de Dados (Prisma/Postgres) no Edge
* **Causa**: Cloudflare Workers são instâncias serverless executadas sob demanda na borda. Invocações paralelas criam centenas de micro-ambientes isolados que tentam abrir conexões TCP diretas com o banco de dados (ex: Supabase), esgotando o limite de conexões do banco de dados em segundos ("too many connections").
* **Soluções Definitivas**:
  - **Para Sites Estáticos (SSG)**: Remova o Prisma e Supabase Client inteiramente do runtime de produção. Centralize os dados em um repositório estruturado de arquivos estáticos TypeScript (`lib/data.ts`) que é compilado localmente em HTML na build.
  - **Para Funcionalidades Dinâmicas**: Utilize APIs HTTP (como a API nativa REST do Supabase / PostgREST) em vez de adaptadores TCP diretos, ou utilize drivers WebSocket serverless (como o Neon Serverless Driver ou Prisma Accelerate) que multiplexam conexões automaticamente.

---

### 🔴 Erro 3: Rotas Dinâmicas Incompatíveis (`/project/[slug]`) em Exportações Estáticas
* **Causa**: Em exportações estáticas (`output: 'export'`), o Next.js precisa saber de antemão todos os arquivos HTML que deve gerar. Se houver uma rota dinâmica como `/project/[slug]`, o compilador não saberá quais páginas gerar e falhará.
* **Solução Definitiva**: Declare a função `generateStaticParams()` na página da rota dinâmica para mapear todos os caminhos válidos em tempo de build:
```tsx
// app/project/[slug]/page.tsx
import { getAllProjectSlugs } from '@/lib/data'

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs() // Retorna string[] de slugs válidos
  return slugs.map((slug) => ({ slug }))
}
```

---

## 🛠️ 3. Passo a Passo do Setup de Deploy no Cloudflare Pages

### Passo A: Configuração do Código (para Static Export)
Se o projeto puder ser estático (o que garante performance extrema), ajuste o `next.config.ts` (ou `.js`):
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',         // Habilita a exportação de arquivos estáticos HTML/CSS/JS
  images: {
    unoptimized: true,      // Cloudflare Pages CDN servirá as imagens sem necessidade de servidor de otimização Node
  },
}

export default nextConfig
```

### Passo B: Conexão com o GitHub no Painel Cloudflare
1. Acesse o painel da **Cloudflare** > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Selecione o repositório do seu projeto.
3. Configure os **Build settings** exatamente assim:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out` (se utilizar Static Export) ou `.next` (se utilizar next-on-pages)
4. Em **Environment variables**, configure a versão do Node compatível:
   - Chave: `NODE_VERSION` | Valor: `20` ou superior (de acordo com a versão local usada).
5. Clique em **Save and Deploy**. A Cloudflare gerará uma URL automática de desenvolvimento e compilará seu site a cada push no GitHub!

---

## 🚀 4. Check-List de Validação (Antes de Fazer o Push)
Antes de enviar modificações importantes para o repositório, sempre execute os comandos locais para blindar o build contra quebras em produção:
1. **`npm run build`**: Valida todos os tipos TypeScript, imports e pré-renderizações estáticas. Se este comando passar localmente, o build na nuvem da Cloudflare passará sem nenhum contratempo.
2. **`npm run dev`**: Execute localmente e teste o redimensionamento responsivo de layouts móveis e efeitos de tooltip interativos.
