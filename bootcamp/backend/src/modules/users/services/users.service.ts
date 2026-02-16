import { PrismaClient } from '@prisma/client';
import { BusinessException } from '../../../shared/exceptions/business.exception';
import { PasswordUtil } from '../../../shared/utils/password.util';
import { AchievementsService } from './achievements.service';

const prisma = new PrismaClient();

export class UsersService {
  private achievementsService: AchievementsService;

  constructor() {
    this.achievementsService = new AchievementsService();
  }

  /**
   * Retorna dados completos do usuário autenticado
   */
  async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        avatar: true,
        xp: true,
        level: true,
        isActive: true,
        createdAt: true,
        achievements: {
          include: {
            achievement: true,
          },
          orderBy: {
            unlockedAt: 'desc',
          },
        },
        preferences: {
          include: {
            preference: true,
          },
        },
      },
    });

    if (!user) {
      throw BusinessException.userNotFound();
    }

    if (!user.isActive) {
      throw BusinessException.accountDeactivated();
    }

    return user;
  }

  /**
   * Retorna preferências do usuário
   */
  async getUserPreferences(userId: string) {
    const preferences = await prisma.userPreference.findMany({
      where: { userId },
      include: {
        preference: true,
      },
    });

    return preferences.map((up) => up.preference);
  }

  /**
   * Define preferências do usuário (substitui as existentes)
   */
  async definePreferences(userId: string, preferenceIds: string[]) {
    // Verificar se preferências existem
    const preferences = await prisma.preference.findMany({
      where: {
        id: { in: preferenceIds },
      },
    });

    if (preferences.length !== preferenceIds.length) {
      throw new Error('Uma ou mais preferências são inválidas');
    }

    // Remover preferências antigas
    await prisma.userPreference.deleteMany({
      where: { userId },
    });

    // Adicionar novas preferências
    await prisma.userPreference.createMany({
      data: preferenceIds.map((preferenceId) => ({
        userId,
        preferenceId,
      })),
    });

    return this.getUserPreferences(userId);
  }

  /**
   * Atualiza dados do usuário
   */
  async updateUser(
    userId: string,
    data: {
      name?: string;
      email?: string;
      password?: string;
    }
  ) {
    // Se mudar email, verificar se não está em uso
    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: userId },
        },
      });

      if (existingUser) {
        throw BusinessException.emailOrCpfAlreadyExists();
      }
    }

    // Se mudar senha, criptografar
    let hashedPassword: string | undefined;
    if (data.password) {
      hashedPassword = await PasswordUtil.hash(data.password);
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(hashedPassword && { password: hashedPassword }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        cpf: true,
        avatar: true,
        xp: true,
        level: true,
      },
    });

    return user;
  }

  /**
   * Atualiza avatar do usuário
   */
  async updateAvatar(userId: string, avatarUrl: string) {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    // Verificar conquista de primeira mudança de avatar
    await this.achievementsService.checkFirstAvatarChange(userId);

    return user;
  }

  /**
   * Desativa conta do usuário (soft delete)
   */
  async deactivateAccount(userId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });

    return { message: 'Conta desativada com sucesso' };
  }
}