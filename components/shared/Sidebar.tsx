import Link from 'next/link'
import { Folder, CheckCircle, Clock, BookOpen, FileText, Settings, Sparkles } from 'lucide-react'

export function Sidebar() {
  return (
    <aside className="relative z-20 w-64 border-r border-white/[0.06] h-screen sticky top-0 flex flex-col p-4 backdrop-blur-xl bg-zinc-950/60">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <div className="mb-8 mt-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">KeniCode</h1>
            <p className="text-[11px] text-zinc-500 font-medium tracking-wide uppercase">Software Developer</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <h2 className="text-[10px] uppercase tracking-[0.15em] text-zinc-600 font-semibold mb-3 mt-4 px-2">Portfólio</h2>
        <Link href="/" className="sidebar-link group">
          <div className="sidebar-icon bg-zinc-500/10">
            <Folder className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
          </div>
          <span>Todos os Projetos</span>
        </Link>
        <Link href="/?status=FINISHED" className="sidebar-link group">
          <div className="sidebar-icon bg-green-500/10">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
          </div>
          <span>Concluídos</span>
        </Link>
        <Link href="/?status=IN_PROGRESS" className="sidebar-link group">
          <div className="sidebar-icon bg-amber-500/10">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <span>Em Andamento</span>
        </Link>
        <Link href="/?status=FUTURE" className="sidebar-link group">
          <div className="sidebar-icon bg-blue-500/10">
            <Folder className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <span>Projetos Futuros</span>
        </Link>

        <h2 className="text-[10px] uppercase tracking-[0.15em] text-zinc-600 font-semibold mb-3 mt-8 px-2">Sobre Mim</h2>
        <Link href="/about/history" className="sidebar-link group">
          <div className="sidebar-icon bg-indigo-500/10">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <span>História</span>
        </Link>
        <Link href="/about/goals" className="sidebar-link group">
          <div className="sidebar-icon bg-rose-500/10">
            <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <span>Objetivos</span>
        </Link>

        <h2 className="text-[10px] uppercase tracking-[0.15em] text-zinc-600 font-semibold mb-3 mt-8 px-2">Conhecimento</h2>
        <Link href="/?status=STUDY" className="sidebar-link group">
          <div className="sidebar-icon bg-purple-500/10">
            <BookOpen className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <span>Estudos de Caso</span>
        </Link>
        <Link href="/docs" className="sidebar-link group">
          <div className="sidebar-icon bg-zinc-500/10">
            <FileText className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
          </div>
          <span>Documentações</span>
        </Link>
      </nav>

      <div className="mt-auto border-t border-white/[0.06] pt-4">
        <Link href="/admin" className="sidebar-link group text-zinc-500">
          <div className="sidebar-icon bg-zinc-500/10">
            <Settings className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
          </div>
          <span>Área Restrita</span>
        </Link>
      </div>
    </aside>
  )
}
