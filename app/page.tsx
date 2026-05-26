import { getProjectsByStatus, ProjectStatus } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Code2, Layers, Sparkles } from 'lucide-react'

// Dicionário para tradução do status e cores do Badge
const STATUS_MAP: Record<ProjectStatus, { label: string; color: string }> = {
  FINISHED: { label: 'Concluído', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  IN_PROGRESS: { label: 'Em Andamento', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  FUTURE: { label: 'Futuro', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  STUDY: { label: 'Estudo', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const statusFilter = params?.status as ProjectStatus | undefined

  // Leitura direta do arquivo local
  const projects = getProjectsByStatus(statusFilter)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Objective Hero Header (Visible only on the main screen, when no filter is active) */}
      {!statusFilter && (
        <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center mb-8 relative overflow-hidden">
          {/* Subtle light reflections */}
          <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
          <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />
          
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

          {/* Profile Photo Glass Container */}
          <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-purple-500/10 group shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-teal-500/20 z-10 pointer-events-none" />
            <Image 
              src="/renato_profile_photo.png" 
              alt="Renato Chagas" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>

          {/* Intro Text & Objective */}
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engenharia de Software</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Olá, eu sou o Renato Chagas 👋
            </h2>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              Este sistema foi desenvolvido como um portfólio dinâmico e de altíssima performance para centralizar e expor meus projetos, estudos de caso e metas técnicas. O objetivo é demonstrar a aplicação de boas práticas em arquitetura front-end, renderização estática ultra-rápida (SSG na Cloudflare Edge), efeitos modernos de <strong>glassmorphism</strong> e código robusto totalmente tipado com TypeScript.
            </p>
          </div>
        </div>
      )}

      {/* Section Header */}
      <header className="border-b border-white/[0.06] pb-6 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-3 flex items-center gap-3">
          <Code2 className="w-8 h-8 text-zinc-400 animate-pulse" />
          <span>{statusFilter ? STATUS_MAP[statusFilter]?.label : 'Todos os Trabalhos'}</span>
        </h1>
        <p className="text-zinc-400 text-md">
          {statusFilter 
            ? `Listando projetos categorizados como ${STATUS_MAP[statusFilter]?.label.toLowerCase()}.`
            : 'Explorando arquiteturas complexas, resolvendo problemas difíceis e escrevendo código limpo.'
          }
        </p>
      </header>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="glass-card text-center py-24 rounded-xl">
          <Layers className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-zinc-300">Nenhum projeto encontrado nesta categoria.</h2>
          <p className="text-zinc-500 mt-2 max-w-md mx-auto">Os projetos serão exibidos aqui assim que forem adicionados ao arquivo de dados.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/project/${project.slug}`}
              className="glass-card rounded-xl flex flex-col group"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Gradient accent top border */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className={`${STATUS_MAP[project.status].color} text-[11px] font-semibold`}>
                    {STATUS_MAP[project.status].label}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                  {project.summary || 'Sem descrição.'}
                </p>

                {/* Technologies */}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map(pt => (
                      <span
                        key={pt.technology_id}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.06] font-medium"
                      >
                        {pt.technology.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-sm text-zinc-500">
                  <span className="group-hover:text-zinc-300 transition-colors">Ver Detalhes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
