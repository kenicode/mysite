import { ProjectForm } from './components/ProjectForm'
import { ShieldAlert } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="space-y-8 max-w-4xl animate-fade-in">
      <header className="border-b border-white/[0.06] pb-6 mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-white">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/15 to-amber-500/15 border border-white/10 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
          </div>
          Área Restrita
        </h1>
        <p className="text-zinc-400 mt-3">
          Gerenciamento interno de projetos. Apenas a função de administrador pode modificar o banco.
        </p>
      </header>

      <section className="glass-card rounded-xl p-6">
        <h2 className="text-lg font-semibold text-zinc-200 mb-5">Adicionar Novo Projeto</h2>
        <ProjectForm />
      </section>
    </div>
  )
}
