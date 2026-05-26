import { LoginForm } from './components/LoginForm'
import { Lock } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center -mt-16">
      <div className="max-w-sm w-full glass-card p-8 rounded-2xl animate-fade-in">
        {/* Gradient accent top */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/15 to-teal-500/15 border border-white/10 flex items-center justify-center mb-4 backdrop-blur-sm">
            <Lock className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Acesso Restrito</h1>
          <p className="text-sm text-zinc-500 mt-2 text-center">
            Esta área é exclusiva para a administração do portfólio.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
