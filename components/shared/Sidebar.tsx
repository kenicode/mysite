'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Folder, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  FileText, 
  Sparkles, 
  Phone, 
  Mail, 
  Globe, 
  Code2, 
  Copy, 
  Check, 
  ExternalLink, 
  Menu, 
  X 
} from 'lucide-react'
import { toast } from 'sonner'

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  const pathname = usePathname()

  // Close sidebar on mobile when navigating
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const contacts = [
    {
      id: 'phone',
      icon: Phone,
      label: 'Telefone',
      value: '+55 81 99609-6125',
      actionUrl: 'tel:+5581996096125',
      color: 'text-teal-400 bg-teal-500/10 border-teal-500/20'
    },
    {
      id: 'email',
      icon: Mail,
      label: 'E-mail',
      value: 'renatochagas.oficial@gmail.com',
      actionUrl: 'mailto:renatochagas.oficial@gmail.com',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
    },
    {
      id: 'linkedin',
      icon: Globe,
      label: 'LinkedIn',
      value: 'renatochagas87',
      actionUrl: 'https://linkedin.com/in/renatochagas87',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    },
    {
      id: 'github',
      icon: Code2,
      label: 'GitHub',
      value: '@kenicode',
      actionUrl: 'https://github.com/kenicode',
      color: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20'
    }
  ]

  const handleCopy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedId(id)
      toast.success('Copiado para a área de transferência!', {
        description: value,
        duration: 2000
      })
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      toast.error('Erro ao copiar!')
    }
  }

  const toggleTooltip = (id: string) => {
    setActiveTooltip(activeTooltip === id ? null : id)
  }

  return (
    <>
      {/* Mobile Sticky Header */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between p-4 bg-zinc-950/80 backdrop-blur-md border-b border-white/[0.06] w-full">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">KeniCode</h1>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-zinc-400 hover:text-white transition-all active:scale-95"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for Mobile Sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-zinc-950/80 backdrop-blur-sm lg:hidden transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Sidebar Panel */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950/95 border-r border-white/[0.06] flex flex-col p-6 transition-transform duration-300 ease-out transform lg:translate-x-0 lg:static lg:w-64 lg:h-screen lg:bg-zinc-950/60 lg:backdrop-blur-xl lg:p-4
        ${isOpen ? 'translate-x-0 shadow-2xl shadow-purple-500/5' : '-translate-x-full'}
      `}>
        {/* Close Button Inside Mobile Sidebar */}
        <div className="flex lg:hidden items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <span className="text-md font-bold text-white">KeniCode</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Brand Header for Desktop */}
        <div className="hidden lg:block mb-6 lg:mb-8 mt-2 lg:mt-4 relative">
          <div className="absolute -top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/40 via-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Sparkles className="w-4 h-4 text-purple-400 relative z-10 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">KeniCode</h1>
              <p className="text-[11px] text-zinc-500 font-semibold tracking-wide uppercase">Software Developer</p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto pr-1 custom-scrollbar">
          <h2 className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-bold mb-3 px-2">Sobre Mim</h2>
          <Link href="/about/history" className="sidebar-link group relative overflow-hidden">
            <div className="sidebar-icon bg-indigo-500/10 border border-indigo-500/10 group-hover:border-indigo-500/30 transition-all duration-300">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <span>História</span>
          </Link>
          <Link href="/about/goals" className="sidebar-link group relative overflow-hidden">
            <div className="sidebar-icon bg-rose-500/10 border border-rose-500/10 group-hover:border-rose-500/30 transition-all duration-300">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <span>Objetivos</span>
          </Link>

          <h2 className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-bold mb-3 mt-8 px-2">Portfólio</h2>
          <Link href="/" className="sidebar-link group">
            <div className="sidebar-icon bg-zinc-500/10 border border-zinc-500/10 group-hover:border-zinc-500/30 transition-all">
              <Folder className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <span>Todos os Projetos</span>
          </Link>
          <Link href="/?status=FINISHED" className="sidebar-link group">
            <div className="sidebar-icon bg-green-500/10 border border-green-500/10 group-hover:border-green-500/30 transition-all">
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            </div>
            <span>Concluídos</span>
          </Link>
          <Link href="/?status=IN_PROGRESS" className="sidebar-link group">
            <div className="sidebar-icon bg-amber-500/10 border border-amber-500/10 group-hover:border-amber-500/30 transition-all">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <span>Em Andamento</span>
          </Link>
          <Link href="/?status=FUTURE" className="sidebar-link group">
            <div className="sidebar-icon bg-blue-500/10 border border-blue-500/10 group-hover:border-blue-500/30 transition-all">
              <Folder className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span>Projetos Futuros</span>
          </Link>

          <h2 className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-bold mb-3 mt-8 px-2">Conhecimento</h2>
          <Link href="/?status=STUDY" className="sidebar-link group">
            <div className="sidebar-icon bg-purple-500/10 border border-purple-500/10 group-hover:border-purple-500/30 transition-all">
              <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <span>Estudos de Caso</span>
          </Link>
          <Link href="/docs" className="sidebar-link group">
            <div className="sidebar-icon bg-zinc-500/10 border border-zinc-500/10 group-hover:border-zinc-500/30 transition-all">
              <FileText className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <span>Documentações</span>
          </Link>
        </nav>

        {/* Compact Tooltip Contacts Section */}
        <div className="mt-auto pt-4 border-t border-white/[0.06] relative">
          <h2 className="text-[10px] uppercase tracking-[0.15em] text-zinc-500 font-bold mb-3 px-2">Contato</h2>
          <div className="flex items-center justify-around gap-2 px-1 py-1 bg-white/[0.02] border border-white/[0.04] rounded-2xl backdrop-blur-md relative">
            {contacts.map((contact) => {
              const Icon = contact.icon
              const isCopied = copiedId === contact.id
              const isTooltipActive = activeTooltip === contact.id

              return (
                <div 
                  key={contact.id} 
                  className="relative"
                  onMouseEnter={() => setActiveTooltip(contact.id)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <button
                    onClick={() => toggleTooltip(contact.id)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 relative border border-white/[0.04]
                      ${isTooltipActive ? 'bg-white/[0.08] border-white/20 text-white scale-105' : 'bg-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-white'}
                    `}
                    aria-label={contact.label}
                  >
                    <Icon className="w-4 h-4" />
                  </button>

                  {/* Tooltip / Popover Panel */}
                  {isTooltipActive && (
                    <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 w-64 p-3 bg-zinc-900/95 border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl animate-in fade-in duration-200 slide-in-from-bottom-2">
                      {/* Little Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-900" />
                      
                      <div className="text-xs font-semibold text-zinc-300 mb-1">{contact.label}</div>
                      <div className="text-xs text-white bg-black/30 px-2 py-1.5 rounded-lg border border-white/[0.04] select-all break-all mb-2.5 font-mono">
                        {contact.value}
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(contact.id, contact.value)}
                          className="flex-1 py-1.5 px-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] text-[11px] text-zinc-300 hover:text-white flex items-center justify-center gap-1 transition-all active:scale-95"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-green-400" />
                              <span className="text-green-400 font-medium">Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                        
                        <a
                          href={contact.actionUrl}
                          target={contact.id !== 'phone' && contact.id !== 'email' ? '_blank' : undefined}
                          rel="noreferrer"
                          className="flex-1 py-1.5 px-2 rounded-lg bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 text-[11px] text-purple-300 hover:text-purple-200 flex items-center justify-center gap-1 transition-all active:scale-95"
                          onClick={() => setActiveTooltip(null)}
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Abrir</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </aside>
    </>
  )
}
