export type ProjectStatus = 'FINISHED' | 'IN_PROGRESS' | 'FUTURE' | 'STUDY'

export type MediaType = 'IMAGE' | 'VIDEO'

export interface Technology {
  id: string
  name: string
  icon?: string
}

export interface ProjectMedia {
  id: string
  project_id: string
  media_url: string
  media_type: MediaType
  description?: string
}

export interface ProjectTechnology {
  project_id: string
  technology_id: string
  technology: Technology
}

export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  content_md: string
  status: ProjectStatus
  is_published: boolean
  createdAt: Date
  updatedAt: Date
  technologies: ProjectTechnology[]
  media: ProjectMedia[]
}

const technologies: Record<string, Technology> = {
  react: { id: 'tech-1', name: 'React', icon: 'react' },
  nextjs: { id: 'tech-2', name: 'Next.js', icon: 'nextjs' },
  typescript: { id: 'tech-3', name: 'TypeScript', icon: 'typescript' },
  tailwind: { id: 'tech-4', name: 'Tailwind CSS', icon: 'tailwind' },
  prisma: { id: 'tech-5', name: 'Prisma', icon: 'prisma' },
  nodejs: { id: 'tech-6', name: 'Node.js', icon: 'nodejs' },
  python: { id: 'tech-7', name: 'Python', icon: 'python' },
  cloudflare: { id: 'tech-8', name: 'Cloudflare', icon: 'cloudflare' },
  supabase: { id: 'tech-9', name: 'Supabase', icon: 'supabase' },
  postgreSQL: { id: 'tech-10', name: 'PostgreSQL', icon: 'postgresql' },
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Sistema de Gestão Escolar',
    slug: 'sistema-de-gestao-escolar',
    summary: 'Plataforma completa para gestão de matrículas, notas e faltas com relatórios automatizados.',
    content_md: `## Desafio
A escola precisava de um sistema moderno e rápido para substituir as planilhas manuais e unificar os dados dos alunos e professores.

## Solução
Desenvolvi uma plataforma Fullstack usando **Next.js** e **Node.js**. A interface foi construída com **Tailwind CSS** garantindo responsividade total. O backend foi estruturado com **PostgreSQL** usando **Prisma ORM**, permitindo consultas rápidas e seguras. 

O sistema conta com módulos de secretaria (matrículas), acadêmico (notas e faltas) e financeiro (controle de mensalidades).
    
## Resultados
- Redução de 80% do tempo gasto com tarefas administrativas.
- Interface intuitiva que não demandou treinamento da equipe.
- Acesso seguro e escalável hospedado na Vercel e Supabase.`,
    status: 'FINISHED',
    is_published: true,
    createdAt: new Date('2024-01-10T10:00:00Z'),
    updatedAt: new Date('2024-02-15T14:30:00Z'),
    technologies: [
      { project_id: 'proj-1', technology_id: 'tech-2', technology: technologies.nextjs },
      { project_id: 'proj-1', technology_id: 'tech-3', technology: technologies.typescript },
      { project_id: 'proj-1', technology_id: 'tech-4', technology: technologies.tailwind },
      { project_id: 'proj-1', technology_id: 'tech-5', technology: technologies.prisma },
      { project_id: 'proj-1', technology_id: 'tech-10', technology: technologies.postgreSQL },
    ],
    media: [
      {
        id: 'media-1',
        project_id: 'proj-1',
        media_url: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
        media_type: 'IMAGE',
        description: 'Dashboard principal do sistema',
      }
    ],
  },
  {
    id: 'proj-2',
    title: 'E-commerce Serverless',
    slug: 'ecommerce-serverless',
    summary: 'Arquitetura inovadora focada em alta performance na borda usando Next.js e Cloudflare Pages.',
    content_md: `## Arquitetura Moderna na Borda (Edge)
Este projeto explora o poder da computação na borda (Edge Computing) para entregar uma loja virtual ultrarrápida. Todo o frontend foi construído em Next.js com React 19, servido diretamente pelo **Cloudflare Pages**.

O banco de dados é um Postgres gerenciado conectado via Prisma Accelerate / Edge, garantindo latências baixíssimas independentemente de onde o usuário acesse o site.

O design se aproveita de Glassmorphism moderno e Tailwind CSS para interfaces deslumbrantes.`,
    status: 'IN_PROGRESS',
    is_published: true,
    createdAt: new Date('2024-03-01T09:00:00Z'),
    updatedAt: new Date('2024-05-10T11:00:00Z'),
    technologies: [
      { project_id: 'proj-2', technology_id: 'tech-1', technology: technologies.react },
      { project_id: 'proj-2', technology_id: 'tech-2', technology: technologies.nextjs },
      { project_id: 'proj-2', technology_id: 'tech-8', technology: technologies.cloudflare },
      { project_id: 'proj-2', technology_id: 'tech-9', technology: technologies.supabase },
    ],
    media: [
      {
        id: 'media-2',
        project_id: 'proj-2',
        media_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop',
        media_type: 'IMAGE',
        description: 'Mockup de interface na tela de checkout',
      }
    ],
  },
  {
    id: 'proj-3',
    title: 'Analisador de Logs com IA',
    slug: 'analisador-logs-ia',
    summary: 'Estudo focado na integração de APIs de LLM (Inteligência Artificial) para categorização de logs.',
    content_md: `## Propósito do Estudo
Como parte do meu aprimoramento contínuo, este estudo avalia diferentes estratégias de prompt engineering usando Python e a API da OpenAI. 

O script desenvolvido em **Python** ingere milhares de logs diários de um sistema legado, identifica anomalias, categoriza os erros e gera um relatório diário automático, sugerindo prováveis causas raiz.`,
    status: 'STUDY',
    is_published: true,
    createdAt: new Date('2023-11-20T10:00:00Z'),
    updatedAt: new Date('2024-01-05T08:00:00Z'),
    technologies: [
      { project_id: 'proj-3', technology_id: 'tech-7', technology: technologies.python },
    ],
    media: [],
  },
]

export function getProjectsByStatus(status?: string): Project[] {
  if (!status) return projects.filter(p => p.is_published).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  return projects.filter(p => p.status === status && p.is_published).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
