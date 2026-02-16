import prisma from '../../../shared/database/prisma';
import { BusinessException } from '../../../shared/exceptions/business.exception';
import { XpService } from '../../users/services/xp.service';
import { AchievementsService } from '../../users/services/achievements.service';

export class CheckInService {
  private xpService: XpService;
  private achievementsService: AchievementsService;

  constructor() {
    this.xpService = new XpService();
    this.achievementsService = new AchievementsService();
  }

  async checkIn(activityId: string, userId: string, confirmationCode: string) {
    const activity = await prisma.activity.findUnique({
      where: { id: activityId, isDeleted: false },
    });

    if (!activity) {
      throw BusinessException.userNotFound();
    }

    if (activity.completedAt) {
      throw BusinessException.cannotCheckinCompleted();
    }

    const participant = await prisma.activityParticipant.findUnique({
      where: {
        activityId_userId: {
          activityId,
          userId,
        },
      },
    });

    if (!participant) {
      throw BusinessException.alreadySubscribed();
    }

    if (participant.status !== 'APPROVED') {
      throw BusinessException.onlyApprovedCanCheckin();
    }

    if (activity.confirmationCode !== confirmationCode) {
      throw BusinessException.incorrectConfirmationCode();
    }

    if (participant.hasCheckedIn) {
      throw BusinessException.alreadyCheckedIn();
    }

    await prisma.activityParticipant.update({
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

    return { message: `Check-in realizado com sucesso! Você ganhou ${XpService.XP_FOR_CHECKIN} XP.` };
  }
}