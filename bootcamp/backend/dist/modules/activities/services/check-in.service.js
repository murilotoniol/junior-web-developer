"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInService = void 0;
const prisma_1 = __importDefault(require("../../../shared/database/prisma"));
const business_exception_1 = require("../../../shared/exceptions/business.exception");
const xp_service_1 = require("../../users/services/xp.service");
const achievements_service_1 = require("../../users/services/achievements.service");
class CheckInService {
    constructor() {
        this.xpService = new xp_service_1.XpService();
        this.achievementsService = new achievements_service_1.AchievementsService();
    }
    async checkIn(activityId, userId, confirmationCode) {
        const activity = await prisma_1.default.activity.findUnique({
            where: { id: activityId, isDeleted: false },
        });
        if (!activity) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        if (activity.completedAt) {
            throw business_exception_1.BusinessException.cannotCheckinCompleted();
        }
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
        if (participant.status !== 'APPROVED') {
            throw business_exception_1.BusinessException.onlyApprovedCanCheckin();
        }
        if (activity.confirmationCode !== confirmationCode) {
            throw business_exception_1.BusinessException.incorrectConfirmationCode();
        }
        if (participant.hasCheckedIn) {
            throw business_exception_1.BusinessException.alreadyCheckedIn();
        }
        await prisma_1.default.activityParticipant.update({
            where: { id: participant.id },
            data: {
                hasCheckedIn: true,
                checkedInAt: new Date(),
            },
        });
        // Conceder XP ao participante e ao criador
        await this.xpService.grantXpForCheckin(userId, activity.creatorId);
        // Verificar conquistas
        await this.achievementsService.checkFirstCheckin(userId);
        return { message: `Check-in realizado com sucesso! Você ganhou ${xp_service_1.XpService.XP_FOR_CHECKIN} XP.` };
    }
}
exports.CheckInService = CheckInService;
