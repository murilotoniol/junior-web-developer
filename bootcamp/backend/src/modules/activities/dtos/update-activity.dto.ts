import { z } from 'zod';
import { ActivityVisibility } from './create-activity.dto';

export const updateActivitySchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres').optional(),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres').optional(),
  typeId: z.string().uuid('ID do tipo de atividade inválido').optional(),
  scheduledDate: z.string().datetime('Data e hora agendada inválida').optional(),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).optional(),
  address: z.object({
    latitude: z.number().min(-90).max(90, 'Latitude inválida').optional(),
    longitude: z.number().min(-180).max(180, 'Longitude inválida').optional(),
  }).optional(),
});

export type UpdateActivityDTO = z.infer<typeof updateActivitySchema>;