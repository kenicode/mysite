import { z } from 'zod'

export const createProjectSchema = z.object({
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  slug: z.string().min(3, 'O slug deve ter pelo menos 3 caracteres').regex(/^[a-z0-9-]+$/, 'Slug inválido. Use apenas letras minúsculas, números e hífens.'),
  summary: z.string().optional(),
  content_md: z.string().optional(),
  status: z.enum(['FINISHED', 'IN_PROGRESS', 'FUTURE', 'STUDY']).default('FINISHED'),
  is_published: z.boolean().default(false),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>

export type ServerActionResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
}
