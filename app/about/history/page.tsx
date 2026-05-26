import { BookOpen } from 'lucide-react'

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const isEn = params?.lang === 'en'

  const t = {
    title: isEn ? 'My History' : 'Minha História',
    subtitle: isEn ? 'A brief timeline of my journey and experiences.' : 'Uma breve linha do tempo da minha jornada e experiências.',
    p1: isEn 
      ? 'Hello! I am Renato Chagas (KeniCode). My journey in the systems development world has been driven by a passion to solve complex problems and build interfaces and architectures that make a difference.'
      : 'Olá! Sou Renato Chagas (KeniCode). Minha jornada no mundo do desenvolvimento de sistemas tem sido impulsionada pela paixão em resolver problemas complexos e construir interfaces e arquiteturas que façam a diferença.',
    p2: isEn
      ? 'This space was created to centralize and showcase my professional growth, my software engineering skills, and the evolution of projects I have been involved in over time.'
      : 'Este espaço foi criado para centralizar e demonstrar meu crescimento profissional, minhas habilidades em Engenharia de Software e a evolução dos projetos em que estive envolvido ao longo do tempo.',
    footer: isEn
      ? '(You can edit this text later directly in the file app/about/history/page.tsx)'
      : '(Você pode editar este texto posteriormente diretamente no arquivo `app/about/history/page.tsx`)',
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

      <section className="glass-card rounded-xl p-6">
        <div className="space-y-4 text-zinc-300 leading-relaxed text-base">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p className="text-zinc-500 italic mt-4 text-sm">{t.footer}</p>
        </div>
      </section>
    </div>
  )
}
