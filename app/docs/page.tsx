import { BookOpen, ShieldCheck, Terminal, Cpu, FileText, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default async function DocsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const isEn = params?.lang === 'en'

  const t = {
    title: isEn ? 'Technical Documentation' : 'Documentação Técnica',
    subtitle: isEn 
      ? 'Architectural guidelines, engineering methodologies, and code standards adopted across projects.'
      : 'Diretrizes arquiteturais, metodologias de engenharia e padrões de código adotados nos projetos.',
    
    card1Title: isEn ? 'Edge-Ready Architecture' : 'Arquitetura Edge-Ready',
    card1Sub: 'Cloudflare Pages & Next.js',
    card1Desc: isEn
      ? 'All systems are built with a focus on executing close to the user (Edge Computing). This drastically reduces global Time to First Byte (TTFB).'
      : 'Todos os sistemas são desenvolvidos com foco na execução próxima do usuário (Edge Computing). Isto reduz drasticamente o Time to First Byte (TTFB) global.',
    card1Items: isEn ? [
      'Optimized deployment for Cloudflare Pages.',
      'Use of Edge Runtime for critical routes.',
      'Hybrid database connection management (Pooler vs Direct).'
    ] : [
      'Deploy otimizado para Cloudflare Pages.',
      'Utilização de Edge Runtime para rotas críticas.',
      'Gerenciamento de conexões de banco de dados híbrido (Pooler vs Direct).'
    ],

    card2Title: isEn ? 'Aggressive TDD Manifesto' : 'Manifesto TDD Agressivo',
    card2Sub: isEn ? 'Quality Shielded by Testing' : 'Qualidade Blindada por Testes',
    card2Desc: isEn
      ? 'Writing unit and integration tests before writing business logic ensures that every route, API, or server action is resilient.'
      : 'Escrever testes unitários e de integração antes de codificar a lógica de negócios garante que cada rota, API ou ação de servidor seja resiliente.',
    card2Items: isEn ? [
      'Strict validation at the entry funnel with Zod Schemas.',
      'Standardized error handling with Safe Failure.',
      'Automated testing suite using Vitest and JSDOM.'
    ] : [
      'Validação estrita no funil de entrada com Zod Schemas.',
      'Tratamento de erros padronizado com Falha Segura.',
      'Suíte de testes automatizada usando Vitest e JSDOM.'
    ],

    card3Title: isEn ? 'Supabase Security Policies (RLS)' : 'Políticas de Segurança Supabase (RLS)',
    card3Sub: isEn ? 'Row-Level Security & Database Protection' : 'Row-Level Security & Proteção no Nível do Banco',
    
    col1Title: 'Base Auth',
    col1Desc: isEn
      ? 'Administrative access is restricted by email and password registered in Supabase Auth. Public routes never expose tokens.'
      : 'O acesso administrativo é restrito por e-mail e senha cadastrados no Supabase Auth. Rotas públicas nunca expõem tokens.',
    
    col2Title: 'RLS Policies',
    col2Desc: isEn
      ? 'Tables have strict RLS policies that prevent unauthorized edits, even if API credentials leak.'
      : 'As tabelas possuem políticas RLS estritas que impedem edições não-autorizadas, mesmo se as credenciais da API vazarem.',
    
    col3Title: isEn ? 'Hybrid Proxy' : 'Híbrido Proxy',
    col3Desc: isEn
      ? 'Route and session cookie interception occurs transparently in Next.js proxy.ts.'
      : 'A interceptação de rotas e cookies de sessão ocorre no proxy.ts do Next.js de forma transparente.',

    pillarsTitle: isEn ? 'Development Pillars' : 'Pilares de Desenvolvimento',
    pillars: isEn ? [
      'Clean and Self-Explaining Code',
      'Strict Typing with TypeScript',
      'Optimized Performance and Elevated Core Web Vitals',
      'Reusable Shadcn UI Components'
    ] : [
      'Código Limpo e Autoexplicativo',
      'Tipagem estrita com TypeScript',
      'Performance otimizada e Core Web Vitals elevados',
      'Componentes reutilizáveis Shadcn UI'
    ]
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="border-b border-white/[0.06] pb-6 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 flex items-center gap-3 text-white">
          <BookOpen className="w-10 h-10 text-zinc-400" />
          <span>{t.title}</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          {t.subtitle}
        </p>
      </header>

      {/* Grid de Seções */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Arquitetura Edge */}
        <div className="glass-card rounded-xl">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border border-white/10 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{t.card1Title}</h2>
                <p className="text-xs text-zinc-500">{t.card1Sub}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-zinc-400">
              <p>{t.card1Desc}</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {t.card1Items.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Card 2: Manifesto TDD */}
        <div className="glass-card rounded-xl">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/15 to-emerald-500/15 border border-white/10 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{t.card2Title}</h2>
                <p className="text-xs text-zinc-500">{t.card2Sub}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-zinc-400">
              <p>{t.card2Desc}</p>
              <ul className="list-disc pl-5 space-y-1.5">
                {t.card2Items.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3: Segurança e RLS */}
        <div className="glass-card rounded-xl md:col-span-2">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/15 to-pink-500/15 border border-white/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{t.card3Title}</h2>
                <p className="text-xs text-zinc-500">{t.card3Sub}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-white/[0.06] bg-white/[0.03] text-zinc-300 text-[11px]">{t.col1Title}</Badge>
                </div>
                <p>{t.col1Desc}</p>
              </div>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-white/[0.06] bg-white/[0.03] text-zinc-300 text-[11px]">{t.col2Title}</Badge>
                </div>
                <p>{t.col2Desc}</p>
              </div>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-white/[0.06] bg-white/[0.03] text-zinc-300 text-[11px]">{t.col3Title}</Badge>
                </div>
                <p>{t.col3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diretrizes Adicionais */}
      <section className="glass-card p-6 rounded-xl space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-zinc-400" />
          {t.pillarsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-zinc-400">
          {t.pillars.map((pillar, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
              <span>{pillar}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
