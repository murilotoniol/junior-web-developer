import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../config/jwt.config';
import { BusinessException } from '../../../shared/exceptions/business.exception';

export interface AuthRequest extends Request {
  userId: string;
}

export function jwtAuthGuard(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw BusinessException.authenticationRequired();
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw BusinessException.authenticationRequired();
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as { userId: string };
    (req as AuthRequest).userId = decoded.userId;
    next();
  } catch (error) {
    throw BusinessException.authenticationRequired();
  }
}