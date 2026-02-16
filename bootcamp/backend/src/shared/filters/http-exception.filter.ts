import { Request, Response, NextFunction } from 'express';
import { BusinessException } from '../exceptions/business.exception';
import { ZodError } from 'zod';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Business exceptions (erros esperados da aplicação)
  if (error instanceof BusinessException) {
    res.status(error.statusCode).json({
      error: true,
      code: error.errorCode,
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Erros de validação do Zod
  if (error instanceof ZodError) {
    res.status(400).json({
      error: true,
      code: 'E1',
      message: 'Informe os campos obrigatórios corretamente.',
      details: error.errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      })),
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // Erros inesperados (500)
  console.error('Unexpected error:', error);
  res.status(500).json({
    error: true,
    code: 'INTERNAL_ERROR',
    message: 'Erro interno do servidor.',
    timestamp: new Date().toISOString(),
  });
}