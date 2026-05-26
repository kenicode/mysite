import { Sparkles, Target, Rocket, Lightbulb } from 'lucide-react'

export default function GoalsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="border-b border-white/[0.06] pb-6 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 flex items-center gap-3 text-white">
          <Sparkles className="w-10 h-10 text-zinc-400" />
          <span>Objetivos</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Onde quero chegar e quais são minhas próximas metas.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/15 to-pink-500/15 border border-white/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Metas de Curto Prazo</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
            <li>Consolidar conhecimentos avançados em Next.js e React.</li>
            <li>Aprimorar arquitetura de banco de dados e performance com Prisma.</li>
            <li>Melhorar continuamente a UI/UX dos meus projetos pessoais.</li>
          </ul>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border border-white/10 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Metas de Longo Prazo</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
            <li>Alcançar nível sênior em engenharia de software frontend/fullstack.</li>
            <li>Contribuir com projetos open-source globais de grande impacto.</li>
            <li>Liderar equipes de desenvolvimento focadas em produto e qualidade.</li>
          </ul>
        </div>

        <div className="glass-card rounded-xl p-6 md:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/15 to-yellow-500/15 border border-white/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-lg font-bold text-white">Filosofia de Trabalho</h2>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Acredito que o bom código é aquele que pode ser facilmente lido e mantido. 
            Escrever testes automatizados, garantir acessibilidade e investir em uma arquitetura 
            resiliente não são diferenciais, são as bases de qualquer sistema robusto e confiável.
          </p>
        </div>
      </div>
    </div>
  )
}
