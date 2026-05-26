'use server'

import { prisma } from '@/lib/prisma'
import { createProjectSchema, CreateProjectInput, ServerActionResponse } from '@/types/schemas'
import { Project } from '@prisma/client'
import { z } from 'zod'

export async function createProject(
  input: CreateProjectInput
): Promise<ServerActionResponse<Project>> {
  try {
    // 1. Validação estrita usando Zod
    const validatedData = createProjectSchema.parse(input)

    // 2. Mutação segura (O middleware protegerá a rota no futuro)
    const project = await prisma.project.create({
      data: validatedData,
    })

    // 3. Retorno padronizado
    return { success: true, data: project }
  } catch (error) {
    // Tratamento de Erros: Falha Segura (Akita's Rule)
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.issues.map((i) => i.message).join(', ') 
      }
    }
    
    return { 
      success: false, 
      error: 'Ocorreu um erro inesperado ao se comunicar com o banco de dados.' 
    }
  }
}
