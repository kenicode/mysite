import { getProjectsByStatus, ProjectStatus } from '@/lib/data'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Code2, Layers } from 'lucide-react'
import type { Metadata } from 'next'

// Dicionário para tradução do status e cores do Badge
const STATUS_MAP_PT: Record<ProjectStatus, { label: string; color: string }> = {
  FINISHED: { label: 'Concluído', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  IN_PROGRESS: { label: 'Em Andamento', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  FUTURE: { label: 'Futuro', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  STUDY: { label: 'Estudo de Caso', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
}

const STATUS_MAP_EN: Record<ProjectStatus, { label: string; color: string }> = {
  FINISHED: { label: 'Completed', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  FUTURE: { label: 'Future Project', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  STUDY: { label: 'Case Study', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const isEn = params?.lang === 'en'
  const statusFilter = params?.status as ProjectStatus | undefined

  const map = isEn ? STATUS_MAP_EN : STATUS_MAP_PT
  const statusLabel = statusFilter ? ` - ${map[statusFilter]?.label}` : ''

  return {
    title: isEn 
      ? `Projects Portfolio${statusLabel} | Renato Chagas` 
      : `Portfólio de Projetos${statusLabel} | Renato Chagas`,
    description: isEn
      ? 'Explore case studies, finished platforms, and active software developments built by software engineer Renato Chagas.'
      : 'Explore estudos de caso, plataformas concluídas e desenvolvimentos de software ativos construídos pelo engenheiro de software Renato Chagas.',
    keywords: isEn
      ? ['Next.js Projects', 'React Portfolio', 'TypeScript Engineering', 'Fullstack Systems', 'TDD', 'Clean Architecture']
      : ['Projetos Next.js', 'Portfólio React', 'Engenharia TypeScript', 'Sistemas Fullstack', 'TDD', 'Arquitetura Limpa'],
  }
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const statusFilter = params?.status as ProjectStatus | undefined
  const isEn = params?.lang === 'en'

  // Leitura direta do arquivo local
  const projects = getProjectsByStatus(statusFilter)

  const map = isEn ? STATUS_MAP_EN : STATUS_MAP_PT

  const t = {
    title: isEn ? 'All Works & Projects' : 'Todos os Trabalhos',
    subtitle: isEn 
      ? 'Exploring complex architectures, solving hard problems, and writing clean code.'
      : 'Explorando arquiteturas complexas, resolvendo problemas difíceis e escrevendo código limpo.',
    filterLabel: isEn ? 'Listing projects classified as ' : 'Listando projetos categorizados como ',
    emptyTitle: isEn ? 'No projects found in this category.' : 'Nenhum projeto encontrado nesta categoria.',
    emptyDesc: isEn 
      ? 'Projects will be shown here as soon as they are added to the data file.'
      : 'Os projetos serão exibidos aqui assim que forem adicionados ao arquivo de dados.',
    viewDetails: isEn ? 'View Details' : 'Ver Detalhes',
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section Header */}
      <header className="border-b border-white/[0.06] pb-6 mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight mb-3 flex items-center gap-3">
          <Code2 className="w-8 h-8 text-zinc-400 animate-pulse" />
          <span>{statusFilter ? map[statusFilter]?.label : t.title}</span>
        </h1>
        <p className="text-zinc-400 text-md">
          {statusFilter 
            ? `${t.filterLabel} "${map[statusFilter]?.label.toLowerCase()}".`
            : t.subtitle
          }
        </p>
      </header>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="glass-card text-center py-24 rounded-xl">
          <Layers className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-zinc-300">{t.emptyTitle}</h2>
          <p className="text-zinc-500 mt-2 max-w-md mx-auto">{t.emptyDesc}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/project/${project.slug}${isEn ? '?lang=en' : ''}`}
              className="glass-card rounded-xl flex flex-col group"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Gradient accent top border */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="outline" className={`${map[project.status].color} text-[11px] font-semibold`}>
                    {map[project.status].label}
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
                  <span className="group-hover:text-zinc-300 transition-colors">{t.viewDetails}</span>
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
