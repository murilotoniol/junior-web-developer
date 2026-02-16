import { Router } from 'express';
import multer from 'multer';
import { ActivitiesController } from './controllers/activities.controller';
import { jwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

export class ActivitiesModule {
  static routes(): Router {
    const router = Router();
    const controller = new ActivitiesController();

    router.use(jwtAuthGuard); // Todas as rotas de atividades requerem autenticação

    router.post('/', upload.single('image'), controller.createActivity as any);
    router.get('/', controller.listActivities as any);
    router.get('/:id', controller.getActivityById as any);
    router.patch('/:id', controller.updateActivity as any);
    router.delete('/:id', controller.deleteActivity as any);
    router.post('/:id/complete', controller.completeActivity as any);

    router.post('/:id/subscribe', controller.subscribeToActivity as any);
    router.delete('/:id/unsubscribe', controller.unsubscribe as any);
    router.get('/:id/participants', controller.listParticipants as any);
    router.patch('/:id/participants/:participantId/approve', controller.approveParticipant as any);
    router.patch('/:id/participants/:participantId/reject', controller.rejectParticipant as any);

    router.post('/:id/check-in', controller.checkIn as any);

    return router;
  }
}