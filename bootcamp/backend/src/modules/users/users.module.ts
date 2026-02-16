import { Router } from 'express';
import multer from 'multer';
import { UsersController } from './controllers/users.controller';
import { jwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Configuração do Multer para upload de arquivos
const upload = multer({
  storage: multer.memoryStorage(), // Armazena o arquivo em memória
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB
  },
});

export class UsersModule {
  static routes(): Router {
    const router = Router();
    const controller = new UsersController();

    router.use(jwtAuthGuard); // Todas as rotas de usuário requerem autenticação

    router.get('/me', controller.getCurrentUser as any);
    router.patch('/me', controller.updateUser as any);
    router.delete('/me', controller.deactivateAccount as any);

    router.get('/preferences', controller.getUserPreferences as any);
    router.post('/preferences', controller.definePreferences as any);

    router.post('/avatar', upload.single('avatar'), controller.updateAvatar as any); // 'avatar' é o nome do campo no formulário

    router.get('/achievements', controller.getUserAchievements as any);

    return router;
  }
}