"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsService = void 0;
const prisma_1 = __importDefault(require("../../../shared/database/prisma"));
const business_exception_1 = require("../../../shared/exceptions/business.exception");
class SubscriptionsService {
    async subscribeToActivity(activityId, userId) {
        const activity = await prisma_1.default.activity.findUnique({
            where: { id: activityId, isDeleted: false },
        });
        if (!activity) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        if (activity.creatorId === userId) {
            throw business_exception_1.BusinessException.creatorCannotSubscribe();
        }
        if (activity.completedAt) {
            throw business_exception_1.BusinessException.cannotSubscribeCompleted();
        }
        const existingSubscription = await prisma_1.default.activityParticipant.findUnique({
            where: {
                activityId_userId: {
                    activityId,
                    userId,
                },
            },
        });
        if (existingSubscription) {
            throw business_exception_1.BusinessException.alreadySubscribed();
        }
        const participant = await prisma_1.default.activityParticipant.create({
            data: {
                activityId,
                userId,
                status: 'PENDING',
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true, avatar: true },
                },
            },
        });
        return participant;
    }
    async unsubscribe(activityId, userId) {
        const participant = await prisma_1.default.activityParticipant.findUnique({
            where: {
                activityId_userId: {
                    activityId,
                    userId,
                },
            },
        });
        if (!participant) {
            throw business_exception_1.BusinessException.alreadySubscribed();
        }
        if (participant.hasCheckedIn) {
            throw business_exception_1.BusinessException.cannotUnsubscribeAfterCheckin();
        }
        await prisma_1.default.activityParticipant.delete({
            where: {
                activityId_userId: {
                    activityId,
                    userId,
                },
            },
        });
        return { message: 'Inscrição cancelada com sucesso.' };
    }
    async approveParticipant(activityId, participantId, userId) {
        const activity = await prisma_1.default.activity.findUnique({
            where: { id: activityId, isDeleted: false },
        });
        if (!activity) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        if (activity.creatorId !== userId) {
            throw business_exception_1.BusinessException.onlyCreatorCanApprove();
        }
        const participant = await prisma_1.default.activityParticipant.findUnique({
            where: { id: participantId },
        });
        if (!participant || participant.activityId !== activityId) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        if (participant.status === 'APPROVED') {
            throw business_exception_1.BusinessException.requiredFieldsMissing(['participant']);
        }
        const updatedParticipant = await prisma_1.default.activityParticipant.update({
            where: { id: participantId },
            data: { status: 'APPROVED' },
            include: {
                user: {
                    select: { id: true, name: true, email: true, avatar: true },
                },
            },
        });
        return updatedParticipant;
    }
    async rejectParticipant(activityId, participantId, userId) {
        const activity = await prisma_1.default.activity.findUnique({
            where: { id: activityId, isDeleted: false },
        });
        if (!activity) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        if (activity.creatorId !== userId) {
            throw business_exception_1.BusinessException.onlyCreatorCanApprove();
        }
        const participant = await prisma_1.default.activityParticipant.findUnique({
            where: { id: participantId },
        });
        if (!participant || participant.activityId !== activityId) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        if (participant.status === 'REJECTED') {
            throw business_exception_1.BusinessException.requiredFieldsMissing(['participant']);
        }
        const updatedParticipant = await prisma_1.default.activityParticipant.update({
            where: { id: participantId },
            data: { status: 'REJECTED' },
            include: {
                user: {
                    select: { id: true, name: true, email: true, avatar: true },
                },
            },
        });
        return updatedParticipant;
    }
    async listParticipants(activityId, userId) {
        const activity = await prisma_1.default.activity.findUnique({
            where: { id: activityId, isDeleted: false },
        });
        if (!activity) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        if (activity.creatorId !== userId) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        const participants = await prisma_1.default.activityParticipant.findMany({
            where: { activityId },
            include: {
                user: {
                    select: { id: true, name: true, email: true, avatar: true, xp: true, level: true },
                },
            },
            orderBy: {
                subscribedAt: 'asc',
            },
        });
        return participants;
    }
}
exports.SubscriptionsService = SubscriptionsService;
