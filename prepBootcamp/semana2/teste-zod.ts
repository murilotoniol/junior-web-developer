import { z } from 'zod';

// Schema de validação
const createUserSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  age: z.number().min(18, 'Deve ser maior de 18 anos').optional(),
  role: z.enum(['admin', 'user']),
});

// Inferir tipo do schema
type CreateUserDTO = z.infer<typeof createUserSchema>;

// Validar
try {
  const data = createUserSchema.parse(req.body);
  // data está tipado e validado
} catch (error) {
  if (error instanceof z.ZodError) {
    console.log(error.errors);
  }
}

// Middleware de validação
function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: Function) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Dados inválidos',
          details: error.errors
        });
      }
      next(error);
    }
  };
}

// Usar
router.post('/users', validate(createUserSchema), controller.create);