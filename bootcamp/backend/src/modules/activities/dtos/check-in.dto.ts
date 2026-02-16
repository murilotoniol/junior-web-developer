import { z } from 'zod';

export const checkInSchema = z.object({
  confirmationCode: z.string().length(6, 'Código de confirmação deve ter 6 caracteres'),
});

export type CheckInDTO = z.infer<typeof checkInSchema>;