import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export enum AchievementType {
  FIRST_CHECKIN = 'first-checkin',
  FIRST_ACTIVITY_CREATED = 'first-activity-created',
  FIRST_ACTIVITY_COMPLETED = 'first-activity-completed',
  FIRST_LEVEL_UP = 'first-level-up',
  LEVEL_5_REACHED = 'level-5-reached',
  FIRST_AVATAR_CHANGE = 'first-avatar-change',
}

export class AchievementsService {
  /**
   * Verifica e concede conquista ao usuário (se ainda não tiver)
   */
  async grantAchievement(userId: string, achievementType: AchievementType): Promise<boolean> {
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
  async getUserAchievements(userId: string) {
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
  async checkFirstCheckin(userId: string): Promise<void> {
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
  async checkFirstActivityCreated(userId: string): Promise<void> {
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
  async checkFirstActivityCompleted(userId: string): Promise<void> {
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
  async checkLevelAchievements(userId: string, newLevel: number): Promise<void> {
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
  async checkFirstAvatarChange(userId: string): Promise<void> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user && user.avatar && user.avatar !== 'default-avatar.png') {
      await this.grantAchievement(userId, AchievementType.FIRST_AVATAR_CHANGE);
    }
  }
}