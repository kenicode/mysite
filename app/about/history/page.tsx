import { BookOpen } from 'lucide-react'

export default function HistoryPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="border-b border-white/[0.06] pb-6 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 flex items-center gap-3 text-white">
          <BookOpen className="w-10 h-10 text-zinc-400" />
          <span>Minha História</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Uma breve linha do tempo da minha jornada e experiências.
        </p>
      </header>

      <section className="glass-card rounded-xl p-6">
        <div className="space-y-4 text-zinc-300 leading-relaxed text-base">
          <p>
            Olá! Sou Renato Chagas (KeniCode). Minha jornada no mundo do desenvolvimento de sistemas
            tem sido impulsionada pela paixão em resolver problemas complexos e construir interfaces e arquiteturas
            que façam a diferença.
          </p>
          <p>
            Este espaço foi criado para centralizar e demonstrar meu crescimento profissional, minhas habilidades em
            Engenharia de Software e a evolução dos projetos em que estive envolvido ao longo do tempo.
          </p>
          <p className="text-zinc-500 italic mt-4 text-sm">
            (Você pode editar este texto posteriormente diretamente no arquivo `app/about/history/page.tsx`)
          </p>
        </div>
      </section>
    </div>
  )
}
