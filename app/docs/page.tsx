import { BookOpen, ShieldCheck, Terminal, Cpu, FileText, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function DocsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="border-b border-white/[0.06] pb-6 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 flex items-center gap-3 text-white">
          <BookOpen className="w-10 h-10 text-zinc-400" />
          <span>Documentação Técnica</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Diretrizes arquiteturais, metodologias de engenharia e padrões de código adotados nos projetos.
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
                <h2 className="text-lg font-bold text-white">Arquitetura Edge-Ready</h2>
                <p className="text-xs text-zinc-500">Cloudflare Pages & Next.js</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-zinc-400">
              <p>
                Todos os sistemas são desenvolvidos com foco na execução próxima do usuário (Edge Computing). Isto reduz drasticamente o Time to First Byte (TTFB) global.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Deploy otimizado para <strong className="text-zinc-300">Cloudflare Pages</strong>.</li>
                <li>Utilização de <strong className="text-zinc-300">Edge Runtime</strong> para rotas críticas.</li>
                <li>Gerenciamento de conexões de banco de dados híbrido (Pooler vs Direct).</li>
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
                <h2 className="text-lg font-bold text-white">Manifesto TDD Agressivo</h2>
                <p className="text-xs text-zinc-500">Qualidade Blindada por Testes</p>
              </div>
            </div>
            <div className="space-y-3 text-sm text-zinc-400">
              <p>
                Escrever testes unitários e de integração antes de codificar a lógica de negócios garante que cada rota, API ou ação de servidor seja resiliente.
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Validação estrita no funil de entrada com <strong className="text-zinc-300">Zod Schemas</strong>.</li>
                <li>Tratamento de erros padronizado com <strong className="text-zinc-300">Falha Segura</strong>.</li>
                <li>Suíte de testes automatizada usando <strong className="text-zinc-300">Vitest</strong> e JSDOM.</li>
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
                <h2 className="text-lg font-bold text-white">Políticas de Segurança Supabase (RLS)</h2>
                <p className="text-xs text-zinc-500">Row-Level Security & Proteção no Nível do Banco</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-white/[0.06] bg-white/[0.03] text-zinc-300 text-[11px]">Base Auth</Badge>
                </div>
                <p>
                  O acesso administrativo é restrito por e-mail e senha cadastrados no Supabase Auth. Rotas públicas nunca expõem tokens.
                </p>
              </div>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-white/[0.06] bg-white/[0.03] text-zinc-300 text-[11px]">RLS Policies</Badge>
                </div>
                <p>
                  As tabelas possuem políticas RLS estritas que impedem edições não-autorizadas, mesmo se as credenciais da API vazarem.
                </p>
              </div>
              <div className="space-y-2 text-sm text-zinc-400">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-white/[0.06] bg-white/[0.03] text-zinc-300 text-[11px]">Híbrido Proxy</Badge>
                </div>
                <p>
                  A interceptação de rotas e cookies de sessão ocorre no <code className="text-zinc-300">proxy.ts</code> do Next.js de forma transparente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diretrizes Adicionais */}
      <section className="glass-card p-6 rounded-xl space-y-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-zinc-400" />
          Pilares de Desenvolvimento
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-zinc-400">
          <div className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
            <span>Código Limpo e Autoexplicativo</span>
          </div>
          <div className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
            <span>Tipagem estrita com TypeScript</span>
          </div>
          <div className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
            <span>Performance otimizada e Core Web Vitals elevados</span>
          </div>
          <div className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 text-zinc-600 shrink-0 mt-0.5" />
            <span>Componentes reutilizáveis Shadcn UI</span>
          </div>
        </div>
      </section>
    </div>
  )
}
