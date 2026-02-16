import { z } from 'zod';

export const definePreferencesSchema = z.object({
  preferenceIds: z.array(z.string().uuid('ID de preferência inválido')),
});

export type DefinePreferencesDTO = z.infer<typeof definePreferencesSchema>;
