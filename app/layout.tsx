import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AnimatedBackground } from '@/components/shared/AnimatedBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KeniCode | Software Developer',
  description: 'Portfólio de Renato Chagas (KeniCode). Foco em Engenharia de Software.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} flex flex-col lg:flex-row min-h-screen bg-zinc-950 text-zinc-50 selection:bg-zinc-800`}>
        <AnimatedBackground />
        <Sidebar />
        <main className="relative z-10 flex-1 flex flex-col overflow-y-auto h-[calc(100vh-64px)] lg:h-screen">
          <div className="max-w-5xl mx-auto w-full p-4 lg:p-8">
            {children}
          </div>
        </main>
        <Toaster theme="dark" />
      </body>
    </html>
  )
}
