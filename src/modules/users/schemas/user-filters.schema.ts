import { z } from 'zod'

export const userFiltersSchema = z.object({
  name: z.string().trim().optional(),
  email: z.string().trim().optional(),
  condominiumId: z.string().trim().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  perPage: z.coerce.number().int().min(1).max(100).default(10),
})

export type UserFiltersFormData = z.infer<typeof userFiltersSchema>
