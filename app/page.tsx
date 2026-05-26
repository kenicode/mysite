import { prisma } from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowRight, Code2, Layers } from 'lucide-react'
import { ProjectStatus } from '@prisma/client'

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

  // Leitura direta no RSC — cacheada no Edge
  const projects = await prisma.project.findMany({
    where: {
      is_published: true,
      ...(statusFilter && Object.keys(STATUS_MAP).includes(statusFilter) ? { status: statusFilter } : {}),
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      technologies: {
        include: { technology: true }
      }
    }
  })

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="border-b border-white/[0.06] pb-6 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 flex items-center gap-3">
          <Code2 className="w-10 h-10 text-zinc-400" />
          <span>{statusFilter ? STATUS_MAP[statusFilter]?.label : 'Todos os Trabalhos'}</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Explorando arquiteturas complexas, resolvendo problemas difíceis e escrevendo código limpo.
        </p>
      </header>

      {projects.length === 0 ? (
        <div className="glass-card text-center py-24 rounded-xl">
          <Layers className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-zinc-300">Nenhum projeto encontrado nesta categoria.</h2>
          <p className="text-zinc-500 mt-2 max-w-md mx-auto">Os projetos serão exibidos aqui assim que forem publicados pelo painel administrativo.</p>
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
