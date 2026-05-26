import { describe, it, expect, vi } from 'vitest'
import { createProject } from '@/actions/project'

// Mockamos o Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    project: {
      create: vi.fn().mockResolvedValue({ id: '123', title: 'Meu Super Projeto' }),
    },
  },
}))

describe('Project Actions (Server)', () => {
  it('deve retornar erro de validação (Zod) se o título for muito curto', async () => {
    const response = await createProject({
      title: 'A',
      slug: 'valid-slug',
      status: 'FINISHED',
      is_published: false,
    })
    
    expect(response.success).toBe(false)
    expect(response.error).toContain('título deve ter pelo menos 3 caracteres')
  })

  it('deve retornar erro de validação (Zod) se o slug tiver formato incorreto', async () => {
    const response = await createProject({
      title: 'Projeto Valido',
      slug: 'Slug Invalido!!',
      status: 'FINISHED',
      is_published: false,
    })
    
    expect(response.success).toBe(false)
    expect(response.error).toContain('Slug inválido')
  })

  it('deve criar um projeto com sucesso no caminho feliz', async () => {
    const response = await createProject({
      title: 'Meu Super Projeto',
      slug: 'meu-super-projeto',
      status: 'FINISHED',
      is_published: true,
    })
    
    expect(response.success).toBe(true)
    expect(response.data?.id).toBe('123')
  })
})
