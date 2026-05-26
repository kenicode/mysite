import { Sparkles, Target, Rocket, Lightbulb } from 'lucide-react'

export default async function GoalsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const isEn = params?.lang === 'en'

  const t = {
    title: isEn ? 'Goals' : 'Objetivos',
    subtitle: isEn ? 'Where I want to go and what my next milestones are.' : 'Onde quero chegar e quais são minhas próximas metas.',
    shortTitle: isEn ? 'Short-Term Goals' : 'Metas de Curto Prazo',
    shortItems: isEn ? [
      'Consolidate advanced knowledge in Next.js and React.',
      'Improve database architecture and performance with Prisma/Edge.',
      'Continuously improve UI/UX on personal projects.'
    ] : [
      'Consolidate conhecimentos avançados em Next.js e React.',
      'Aprimorar arquitetura de banco de dados e performance com Prisma/Edge.',
      'Melhorar continuamente a UI/UX dos meus projetos pessoais.'
    ],
    longTitle: isEn ? 'Long-Term Goals' : 'Metas de Longo Prazo',
    longItems: isEn ? [
      'Achieve senior status in frontend/fullstack software engineering.',
      'Contribute to global, high-impact open-source projects.',
      'Lead development teams focused on product and quality.'
    ] : [
      'Alcançar nível sênior em engenharia de software frontend/fullstack.',
      'Contribuir com projetos open-source globais de grande impacto.',
      'Liderar equipes de desenvolvimento focadas em produto e qualidade.'
    ],
    philTitle: isEn ? 'Work Philosophy' : 'Filosofia de Trabalho',
    philText: isEn 
      ? 'I believe that good code is code that is easy to read and maintain. Writing automated tests, ensuring accessibility, and investing in a resilient architecture are not differentiators; they are the foundations of any robust and reliable system.'
      : 'Acredito que o bom código é aquele que pode ser facilmente lido e mantido. Escrever testes automatizados, garantir acessibilidade e investir em uma arquitetura resiliente não são diferenciais, são as bases de qualquer sistema robusto e confiável.',
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="border-b border-white/[0.06] pb-6 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 flex items-center gap-3 text-white">
          <Sparkles className="w-10 h-10 text-zinc-400" />
          <span>{t.title}</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          {t.subtitle}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/15 to-pink-500/15 border border-white/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-rose-400" />
            </div>
            <h2 className="text-lg font-bold text-white">{t.shortTitle}</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
            {t.shortItems.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/15 border border-white/10 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-lg font-bold text-white">{t.longTitle}</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-400">
            {t.longItems.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>

        <div className="glass-card rounded-xl p-6 md:col-span-2">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/15 to-yellow-500/15 border border-white/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-amber-400" />
            </div>
            <h2 className="text-lg font-bold text-white">{t.philTitle}</h2>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {t.philText}
          </p>
        </div>
      </div>
    </div>
  )
}
