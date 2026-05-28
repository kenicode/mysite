import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Play, Video } from 'lucide-react'
import type { Metadata } from 'next'

// CONFIGURAÇÃO DOS VÍDEOS DE APRESENTAÇÃO
// Substitua as strings vazias pelos links de embed correspondentes (ex: https://www.youtube.com/embed/XYZ)
const VIDEO_URL_PT = "" // Link do vídeo em Português
const VIDEO_URL_EN = "" // Link do vídeo em Inglês

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const isEn = params?.lang === 'en'

  return {
    title: isEn
      ? 'Renato Chagas | Software Engineer & Tech Leader Portfolio'
      : 'Renato Chagas | Engenheiro de Software & Liderança Técnica',
    description: isEn
      ? 'Welcome to the software engineering portfolio of Renato Chagas (KeniCode). Explore high-performance web systems, static edge generation, and advanced technical architectures.'
      : 'Bem-vindo ao portfólio de engenharia de software de Renato Chagas (KeniCode). Explore sistemas web de alta performance, geração estática na borda e arquiteturas técnicas avançadas.',
    keywords: isEn
      ? ['Software Engineer', 'Next.js', 'React', 'TypeScript', 'Web Development', 'Cloudflare Pages', 'SSG', 'Glassmorphism', 'Clean Code', 'Portfolio']
      : ['Engenheiro de Software', 'Next.js', 'React', 'TypeScript', 'Desenvolvimento Web', 'Cloudflare Pages', 'SSG', 'Glassmorphism', 'Código Limpo', 'Portfólio', 'Fullstack'],
    openGraph: {
      title: isEn ? 'Renato Chagas | Software Engineer' : 'Renato Chagas | Engenharia de Software',
      description: isEn
        ? 'Explore projects, case studies, and code architectures compiled on Cloudflare Edge.'
        : 'Explore projetos, estudos de caso e arquiteturas de código compiladas na Cloudflare Edge.',
      images: ['/renato_profile.png'],
    }
  }
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams
  const isEn = params?.lang === 'en'

  const activeVideoUrl = isEn ? VIDEO_URL_EN : VIDEO_URL_PT

  // Traduções para a página principal
  const t = {
    badge: isEn ? 'Software Engineering' : 'Engenharia de Software',
    greeting: isEn ? 'Hello, I am Renato Chagas 👋' : 'Olá, eu sou o Renato Chagas 👋',
    objective: isEn
      ? 'This system was developed as a dynamic and high-performance portfolio to centralize and showcase my projects, case studies, and technical goals. The objective is to demonstrate the application of best practices in front-end architecture, ultra-fast static rendering (SSG on Cloudflare Edge), modern glassmorphism effects, and robust code fully typed with TypeScript.'
      : 'Este sistema foi desenvolvido como um portfólio dinâmico e de altíssima performance para centralizar e expor meus projetos, estudos de caso e metas técnicas. O objetivo é demonstrar a aplicação de boas práticas em arquitetura front-end, renderização estática ultra-rápida (SSG na Cloudflare Edge), efeitos modernos de glassmorphism e código robusto totalmente tipado com TypeScript.',
    videoTitle: isEn ? 'Presentation Video' : 'Vídeo de Apresentação',
    videoDesc: isEn
      ? 'Watch the presentation below to learn more about my technical journey, software engineering objectives, and the architectural principles behind this platform.'
      : 'Assista à apresentação abaixo para conhecer mais sobre minha jornada técnica, objetivos em engenharia de software e os conceitos arquiteturais aplicados nesta plataforma.',
    videoPlaceholder: isEn ? 'Interactive Media Player (English Video)' : 'Reprodutor de Mídia Interativo (Vídeo em Português)',
    ctaProjects: isEn ? 'Explore My Projects' : 'Explorar Meus Projetos',
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Objective Hero Header (Welcome Card) */}
      <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center relative overflow-hidden">
        {/* Subtle light reflections */}
        <div className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -top-24 w-80 h-80 rounded-full bg-teal-500/5 blur-3xl pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* Profile Photo Glass Container */}
        <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-purple-500/10 group shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-teal-500/20 z-10 pointer-events-none" />
          <Image
            src="/renato_profile.png"
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
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {t.greeting}
          </h2>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            {t.objective}
          </p>
        </div>
      </div>

      {/* Video Presentation Section */}
      <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />

        <div className="mb-6 space-y-2">
          <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <Video className="w-6 h-6 text-teal-400" />
            <span>{t.videoTitle}</span>
          </h3>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            {t.videoDesc}
          </p>
        </div>

        {/* High-End Glass Video Player Box */}
        <div className="relative aspect-video w-full rounded-xl border border-white/10 overflow-hidden bg-black/40 shadow-2xl flex flex-col items-center justify-center group">
          {activeVideoUrl ? (
            <iframe
              src={activeVideoUrl}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              {/* Subtle scanner lines effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-40" />

              {/* Embed or beautiful interactive player overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-transparent to-zinc-950/40">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/15 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:border-teal-500/40 group-hover:bg-teal-500/10 transition-all duration-500 shadow-xl cursor-pointer">
                  <Play className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-teal-400 transition-colors ml-1 fill-white/10 group-hover:fill-teal-500/20" />
                </div>

                <div className="mt-4 text-center">
                  <span className="text-xs md:text-sm font-semibold tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors uppercase">
                    {t.videoPlaceholder}
                  </span>
                  <p className="text-[10px] md:text-xs text-zinc-500 mt-1 max-w-xs md:max-w-md mx-auto">
                    {isEn
                      ? 'Define VIDEO_URL_EN at the top of app/page.tsx to automatically display your English presentation video.'
                      : 'Defina VIDEO_URL_PT no topo de app/page.tsx para exibir automaticamente o seu vídeo de apresentação em Português.'
                    }
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Link to Projects */}
        <div className="mt-6 pt-6 border-t border-white/[0.05] flex justify-end">
          <Link
            href={`/projects${isEn ? '?lang=en' : ''}`}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-teal-500/10 border border-white/10 hover:border-white/20 text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/5 transition-all flex items-center gap-2 group shrink-0 active:scale-95"
          >
            <span>{t.ctaProjects}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function ArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  )
}
