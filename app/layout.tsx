import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Suspense } from 'react'
import { Sidebar } from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/sonner'
import { AnimatedBackground } from '@/components/shared/AnimatedBackground'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  ),
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
        <Suspense fallback={<div className="lg:w-64 w-full h-16 lg:h-screen bg-zinc-950/80 border-b lg:border-b-0 lg:border-r border-white/[0.06] backdrop-blur-xl" />}>
          <Sidebar />
        </Suspense>
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
