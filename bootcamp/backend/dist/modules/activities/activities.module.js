"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesModule = void 0;
const express_1 = require("express");
const activities_controller_1 = require("./controllers/activities.controller");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
class ActivitiesModule {
    static routes() {
        const router = (0, express_1.Router)();
        const controller = new activities_controller_1.ActivitiesController();
        router.use(jwt_auth_guard_1.jwtAuthGuard); // Todas as rotas de atividades requerem autenticação
        router.post('/', controller.createActivity);
        router.get('/', controller.listActivities);
        router.get('/:id', controller.getActivityById);
        router.patch('/:id', controller.updateActivity);
        router.delete('/:id', controller.deleteActivity);
        router.post('/:id/complete', controller.completeActivity);
        router.post('/:id/subscribe', controller.subscribeToActivity);
        router.delete('/:id/unsubscribe', controller.unsubscribe);
        router.get('/:id/participants', controller.listParticipants);
        router.patch('/:id/participants/:participantId/approve', controller.approveParticipant);
        router.patch('/:id/participants/:participantId/reject', controller.rejectParticipant);
        router.post('/:id/check-in', controller.checkIn);
        return router;
    }
}
exports.ActivitiesModule = ActivitiesModule;
