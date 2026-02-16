import { z } from 'zod';
import { ActivityVisibility } from './create-activity.dto';

export const activityQuerySchema = z.object({
  typeId: z.string().uuid('ID do tipo de atividade inválido').optional(),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).optional(),
  scheduledAfter: z.string().datetime('Data inicial inválida').optional(),
  scheduledBefore: z.string().datetime('Data final inválida').optional(),
  creatorId: z.string().uuid('ID do criador inválido').optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(10),
});

export type ActivityQueryDTO = z.infer<typeof activityQuerySchema>;