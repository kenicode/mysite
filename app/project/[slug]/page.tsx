import { getProjectBySlug, ProjectStatus } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag, Code2, AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const STATUS_MAP_PT: Record<ProjectStatus, { label: string; color: string }> = {
  FINISHED: { label: 'Concluído', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  IN_PROGRESS: { label: 'Em Andamento', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  FUTURE: { label: 'Futuro', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  STUDY: { label: 'Estudo', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
}

const STATUS_MAP_EN: Record<ProjectStatus, { label: string; color: string }> = {
  FINISHED: { label: 'Completed', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  FUTURE: { label: 'Future', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  STUDY: { label: 'Case Study', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
}

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProjectDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const sParams = await searchParams
  const isEn = sParams?.lang === 'en'

  const project = getProjectBySlug(slug)

  // Se o projeto não existir ou não estiver publicado, retorna 404
  if (!project || !project.is_published) {
    notFound()
  }

  const map = isEn ? STATUS_MAP_EN : STATUS_MAP_PT

  const t = {
    backBtn: isEn ? 'Back to Projects' : 'Voltar para os Projetos',
    aboutProj: isEn ? 'About the Project' : 'Sobre o Projeto',
    noContent: isEn ? 'No additional documentation available for this project yet.' : 'Nenhum detalhe adicional documentado para este projeto ainda.',
    visualDemo: isEn ? 'Visual Demonstration' : 'Demonstração Visual',
    demoTag: isEn ? 'Demo' : 'Demonstração',
    techStack: isEn ? 'Tech Stack' : 'Stack Tecnológica',
    noTech: isEn ? 'No technologies associated.' : 'Nenhuma tecnologia associada.',
    deployStatus: isEn ? 'Deploy Status' : 'Status do Deploy',
    online: isEn ? 'Production Online' : 'Produção Online',
    offline: isEn ? 'Active Development' : 'Desenvolvimento ativo',
    architectureAlert: isEn 
      ? 'All projects present on this list follow rigorous standards of security, TDD, and scalable architecture.'
      : 'Todos os projetos presentes nesta lista seguem rigorosos padrões de segurança, TDD e arquitetura escalável.',
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Botão Voltar */}
      <div>
        <Link 
          href={isEn ? '/projects?lang=en' : '/projects'} 
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t.backBtn}
        </Link>
      </div>

      {/* Header do Projeto */}
      <header className="space-y-4 border-b border-white/[0.06] pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="outline" className={`${map[project.status].color} py-1 px-3 text-xs font-semibold`}>
            {map[project.status].label}
          </Badge>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(project.createdAt).toLocaleDateString(isEn ? 'en-US' : 'pt-BR', { year: 'numeric', month: 'long' })}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-center gap-3">
          <Code2 className="w-10 h-10 text-zinc-400 shrink-0" />
          <span>{project.title}</span>
        </h1>

        {project.summary && (
          <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
            {project.summary}
          </p>
        )}
      </header>

      {/* Grid de Informações */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Conteúdo Markdown / Detalhes */}
        <div className="lg:col-span-2 space-y-6">
          <section className="glass-card rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-zinc-100 border-b border-white/[0.06] pb-2">
              {t.aboutProj}
            </h2>
            {project.content_md ? (
              <div className="text-zinc-300 space-y-4 leading-relaxed whitespace-pre-line text-base">
                {project.content_md}
              </div>
            ) : (
              <p className="text-zinc-500 italic">
                {t.noContent}
              </p>
            )}
          </section>

          {/* Galeria de Mídias (se houver) */}
          {project.media.length > 0 && (
            <section className="space-y-4 pt-4">
              <h2 className="text-xl font-bold text-zinc-100 border-b border-white/[0.06] pb-2">
                {t.visualDemo}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.media.map((item) => (
                  <div key={item.id} className="glass-card rounded-xl overflow-hidden">
                    <div className="relative aspect-video bg-zinc-950/50 flex items-center justify-center p-4">
                      <Tag className="w-8 h-8 text-zinc-600 mb-2" />
                      <span className="text-xs text-zinc-400 absolute bottom-2 left-3 truncate max-w-[90%]">
                        {item.description || t.demoTag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar com Tecnologias */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl space-y-6">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-4">
                {t.techStack}
              </h3>
              {project.technologies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((pt) => (
                    <span
                      key={pt.technology_id}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] text-zinc-300 border border-white/[0.06] font-medium"
                    >
                      {pt.technology.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-600 italic">{t.noTech}</p>
              )}
            </div>

            <div className="pt-6 border-t border-white/[0.06]">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-500 mb-3">
                {t.deployStatus}
              </h3>
              <div className="flex items-center gap-2 text-zinc-300">
                <div className={`w-2.5 h-2.5 rounded-full ${project.status === 'FINISHED' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                <span className="text-sm font-medium">
                  {project.status === 'FINISHED' ? t.online : t.offline}
                </span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.06]">
              <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.05] rounded-lg text-xs text-zinc-400 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  {t.architectureAlert}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
