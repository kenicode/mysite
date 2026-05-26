'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { login } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    const result = await login(formData)
    
    // Se a action retornar resultado com erro (já que em sucesso ocorre um redirect nativo no Server)
    if (result?.error) {
      toast.error('Acesso negado', { description: result.error })
      setLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 mt-2">
      <div>
        <label className="text-sm font-semibold text-zinc-300">E-mail</label>
        <Input name="email" type="email" required placeholder="Seu e-mail de acesso" className="bg-zinc-950 border-zinc-800 mt-1.5" />
      </div>
      <div>
        <label className="text-sm font-semibold text-zinc-300">Senha</label>
        <Input name="password" type="password" required className="bg-zinc-950 border-zinc-800 mt-1.5" />
      </div>
      <Button disabled={loading} type="submit" className="w-full bg-zinc-50 text-zinc-900 hover:bg-zinc-200 mt-6">
        {loading ? 'Autenticando...' : 'Entrar'}
      </Button>
    </form>
  )
}
