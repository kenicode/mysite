'use client'

import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { createProject } from '@/actions/project'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export function ProjectForm() {
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const summary = formData.get('summary') as string

    const result = await createProject({
      title,
      slug,
      summary,
      status: 'FINISHED',
      is_published: true // auto published for simplicity in this admin panel
    })

    setLoading(false)

    if (!result.success) {
      toast.error('Falha na validação Zod ou Erro de Banco', { description: result.error })
    } else {
      toast.success('Projeto salvo no Banco de Dados com sucesso!')
      formRef.current?.reset()
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-5 bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
      <div>
        <label className="text-sm font-semibold text-zinc-300">Título do Projeto</label>
        <Input name="title" required placeholder="Ex: API de Pagamentos" className="bg-zinc-950 border-zinc-800 mt-1.5" />
      </div>
      <div>
        <label className="text-sm font-semibold text-zinc-300">Slug (URL amigável)</label>
        <Input name="slug" required placeholder="ex: api-pagamentos" className="bg-zinc-950 border-zinc-800 mt-1.5" />
      </div>
      <div>
        <label className="text-sm font-semibold text-zinc-300">Resumo</label>
        <Textarea name="summary" placeholder="Uma breve descrição da arquitetura ou caso de uso..." className="bg-zinc-950 border-zinc-800 mt-1.5 h-24 resize-none" />
      </div>
      <Button disabled={loading} type="submit" className="w-full bg-zinc-50 text-zinc-900 hover:bg-zinc-200">
        {loading ? 'Processando (Server Action)...' : 'Salvar Novo Projeto'}
      </Button>
    </form>
  )
}
