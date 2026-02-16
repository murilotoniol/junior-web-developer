"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivitiesService = void 0;
const prisma_1 = __importDefault(require("../../../shared/database/prisma"));
const business_exception_1 = require("../../../shared/exceptions/business.exception");
const code_generator_util_1 = require("../../../shared/utils/code-generator.util");
const achievements_service_1 = require("../../users/services/achievements.service");
class ActivitiesService {
    constructor() {
        this.achievementsService = new achievements_service_1.AchievementsService();
    }
    async createActivity(userId, data) {
        const confirmationCode = code_generator_util_1.CodeGenerator.generateConfirmationCode();
        const activity = await prisma_1.default.activity.create({
            data: {
                title: data.title,
                description: data.description,
                typeId: data.typeId,
                scheduledDate: new Date(data.scheduledDate),
                visibility: data.visibility,
                creatorId: userId,
                confirmationCode,
                address: {
                    create: {
                        latitude: data.address.latitude,
                        longitude: data.address.longitude,
                    },
                },
            },
            include: {
                address: true,
                type: true,
            },
        });
        await this.achievementsService.checkFirstActivityCreated(userId);
        return activity;
    }
    async getActivityById(activityId, userId) {
        const activity = await prisma_1.default.activity.findUnique({
            where: { id: activityId, isDeleted: false },
            include: {
                address: true,
                type: true,
                creator: {
                    select: { id: true, name: true, avatar: true, email: true },
                },
                participants: {
                    include: {
                        user: {
                            select: { id: true, name: true, avatar: true, email: true },
                        },
                    },
                },
            },
        });
        if (!activity) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        // Se a atividade for privada e o usuário não for o criador, não permitir acesso
        if (activity.visibility === 'PRIVATE' && activity.creatorId !== userId) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        return activity;
    }
    async listActivities(filters) {
        const { typeId, visibility, scheduledAfter, scheduledBefore, creatorId, page, limit } = filters;
        const skip = (page - 1) * limit;
        const where = {
            isDeleted: false,
            completedAt: null, // Apenas atividades não concluídas
        };
        if (typeId)
            where.typeId = typeId;
        if (visibility)
            where.visibility = visibility;
        if (creatorId)
            where.creatorId = creatorId;
        if (scheduledAfter || scheduledBefore) {
            where.scheduledDate = {};
            if (scheduledAfter)
                where.scheduledDate.gte = new Date(scheduledAfter);
            if (scheduledBefore)
                where.scheduledDate.lte = new Date(scheduledBefore);
        }
        const activities = await prisma_1.default.activity.findMany({
            where,
            include: {
                type: true,
                creator: {
                    select: { id: true, name: true, avatar: true },
                },
                _count: {
                    select: { participants: { where: { status: 'APPROVED' } } },
                },
            },
            orderBy: {
                scheduledDate: 'asc',
            },
            skip,
            take: limit,
        });
        const total = await prisma_1.default.activity.count({ where });
        return {
            data: activities,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async updateActivity(activityId, userId, data) {
        const activity = await prisma_1.default.activity.findUnique({ where: { id: activityId } });
        if (!activity) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        if (activity.creatorId !== userId) {
            throw business_exception_1.BusinessException.onlyCreatorCanEdit();
        }
        const updatedActivity = await prisma_1.default.activity.update({
            where: { id: activityId },
            data: {
                title: data.title,
                description: data.description,
                typeId: data.typeId,
                scheduledDate: data.scheduledDate ? new Date(data.scheduledDate) : undefined,
                visibility: data.visibility,
                address: data.address
                    ? {
                        update: {
                            latitude: data.address.latitude,
                            longitude: data.address.longitude,
                        },
                    }
                    : undefined,
            },
            include: {
                address: true,
                type: true,
            },
        });
        return updatedActivity;
    }
    async deleteActivity(activityId, userId) {
        const activity = await prisma_1.default.activity.findUnique({ where: { id: activityId } });
        if (!activity) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        if (activity.creatorId !== userId) {
            throw business_exception_1.BusinessException.onlyCreatorCanDelete();
        }
        await prisma_1.default.activity.update({
            where: { id: activityId },
            data: { isDeleted: true },
        });
        return { message: 'Atividade excluída com sucesso.' };
    }
    async completeActivity(activityId, userId) {
        const activity = await prisma_1.default.activity.findUnique({ where: { id: activityId } });
        if (!activity) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        if (activity.creatorId !== userId) {
            throw business_exception_1.BusinessException.onlyCreatorCanComplete();
        }
        if (activity.completedAt) {
            throw business_exception_1.BusinessException.requiredFieldsMissing(['activity']);
        }
        const completedActivity = await prisma_1.default.activity.update({
            where: { id: activityId },
            data: { completedAt: new Date() },
        });
        await this.achievementsService.checkFirstActivityCompleted(userId);
        return completedActivity;
    }
}
exports.ActivitiesService = ActivitiesService;
