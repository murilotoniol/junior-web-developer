"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementsService = exports.AchievementType = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
var AchievementType;
(function (AchievementType) {
    AchievementType["FIRST_CHECKIN"] = "first-checkin";
    AchievementType["FIRST_ACTIVITY_CREATED"] = "first-activity-created";
    AchievementType["FIRST_ACTIVITY_COMPLETED"] = "first-activity-completed";
    AchievementType["FIRST_LEVEL_UP"] = "first-level-up";
    AchievementType["LEVEL_5_REACHED"] = "level-5-reached";
    AchievementType["FIRST_AVATAR_CHANGE"] = "first-avatar-change";
})(AchievementType || (exports.AchievementType = AchievementType = {}));
class AchievementsService {
    /**
     * Verifica e concede conquista ao usuário (se ainda não tiver)
     */
    async grantAchievement(userId, achievementType) {
        // Buscar conquista pelo nome (tipo)
        const achievement = await prisma.achievement.findUnique({
            where: { name: achievementType },
        });
        if (!achievement) {
            console.warn(`Achievement ${achievementType} não encontrado no banco`);
            return false;
        }
        // Verificar se usuário já tem essa conquista
        const existingUserAchievement = await prisma.userAchievement.findUnique({
            where: {
                userId_achievementId: {
                    userId,
                    achievementId: achievement.id,
                },
            },
        });
        if (existingUserAchievement) {
            return false; // Já possui
        }
        // Conceder conquista
        await prisma.userAchievement.create({
            data: {
                userId,
                achievementId: achievement.id,
            },
        });
        return true;
    }
    /**
     * Retorna todas as conquistas do usuário
     */
    async getUserAchievements(userId) {
        return prisma.userAchievement.findMany({
            where: { userId },
            include: {
                achievement: true,
            },
            orderBy: {
                unlockedAt: 'desc',
            },
        });
    }
    /**
     * Verifica conquista de primeiro check-in
     */
    async checkFirstCheckin(userId) {
        const checkinCount = await prisma.activityParticipant.count({
            where: {
                userId,
                hasCheckedIn: true,
            },
        });
        if (checkinCount === 1) {
            await this.grantAchievement(userId, AchievementType.FIRST_CHECKIN);
        }
    }
    /**
     * Verifica conquista de primeira atividade criada
     */
    async checkFirstActivityCreated(userId) {
        const activityCount = await prisma.activity.count({
            where: { creatorId: userId },
        });
        if (activityCount === 1) {
            await this.grantAchievement(userId, AchievementType.FIRST_ACTIVITY_CREATED);
        }
    }
    /**
     * Verifica conquista de primeira atividade concluída
     */
    async checkFirstActivityCompleted(userId) {
        const completedCount = await prisma.activity.count({
            where: {
                creatorId: userId,
                completedAt: { not: null },
            },
        });
        if (completedCount === 1) {
            await this.grantAchievement(userId, AchievementType.FIRST_ACTIVITY_COMPLETED);
        }
    }
    /**
     * Verifica conquista de primeiro level up
     */
    async checkLevelAchievements(userId, newLevel) {
        if (newLevel === 2) {
            await this.grantAchievement(userId, AchievementType.FIRST_LEVEL_UP);
        }
        if (newLevel === 5) {
            await this.grantAchievement(userId, AchievementType.LEVEL_5_REACHED);
        }
    }
    /**
     * Verifica conquista de primeira mudança de avatar
     */
    async checkFirstAvatarChange(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (user && user.avatar && user.avatar !== 'default-avatar.png') {
            await this.grantAchievement(userId, AchievementType.FIRST_AVATAR_CHANGE);
        }
    }
}
exports.AchievementsService = AchievementsService;
