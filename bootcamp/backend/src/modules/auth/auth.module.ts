import { Router } from 'express';
import { AuthController } from './controllers/auth.controller';

export class AuthModule {
  static routes(): Router {
    const router = Router();
    const controller = new AuthController();

    router.post('/register', controller.register);
    router.post('/sign-in', controller.login);

    return router;
  }
}