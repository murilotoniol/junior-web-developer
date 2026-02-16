import { z } from 'zod';

export enum ActivityVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

export const createActivitySchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
  typeId: z.string().uuid('ID do tipo de atividade inválido'),
  scheduledDate: z.string().datetime('Data e hora agendada inválida'),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC'),
  address: z.object({
    latitude: z.number().min(-90).max(90, 'Latitude inválida'),
    longitude: z.number().min(-180).max(180, 'Longitude inválida'),
  }),
});

export type CreateActivityDTO = z.infer<typeof createActivitySchema>;