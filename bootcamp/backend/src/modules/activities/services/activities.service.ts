import prisma from '../../../shared/database/prisma';
import { CreateActivityDTO } from '../dtos/create-activity.dto';
import { UpdateActivityDTO } from '../dtos/update-activity.dto';
import { ActivityQueryDTO } from '../dtos/activity-query.dto';
import { BusinessException } from '../../../shared/exceptions/business.exception';
import { CodeGenerator } from '../../../shared/utils/code-generator.util';
import { AchievementsService, AchievementType } from '../../users/services/achievements.service';

export class ActivitiesService {
  private achievementsService: AchievementsService;

  constructor() {
    this.achievementsService = new AchievementsService();
  }

  async createActivity(userId: string, data: CreateActivityDTO) {
    const confirmationCode = CodeGenerator.generateConfirmationCode();

    const activity = await prisma.activity.create({
      data: {
        title: data.title,
        description: data.description,
        ...(data.image && { image: data.image }),
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

  async getActivityById(activityId: string, userId?: string) {
    const activity = await prisma.activity.findUnique({
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
      throw BusinessException.userNotFound();
    }

    // Se a atividade for privada e o usuário não for o criador, não permitir acesso
    if (activity.visibility === 'PRIVATE' && activity.creatorId !== userId) {
      throw BusinessException.userNotFound();
    }

    // Apenas o criador pode ver o código de confirmação
    const result: any = { ...activity } as any;
    if (userId !== activity.creatorId) {
      delete result.confirmationCode;
    }

    return result;
  }

  async listActivities(filters: ActivityQueryDTO, userId?: string) {
    const { typeId, visibility, scheduledAfter, scheduledBefore, creatorId, page, limit } = filters;

    const skip = (page - 1) * limit;

    const where: any = {
      isDeleted: false,
      completedAt: null, // Apenas atividades não concluídas
    };

    if (typeId) where.typeId = typeId;
    if (visibility) where.visibility = visibility;
    if (creatorId) where.creatorId = creatorId;

    if (scheduledAfter || scheduledBefore) {
      where.scheduledDate = {};
      if (scheduledAfter) where.scheduledDate.gte = new Date(scheduledAfter);
      if (scheduledBefore) where.scheduledDate.lte = new Date(scheduledBefore);
    }

    // Se não houver filtro por tipo e houver um usuário autenticado, priorizar pelas preferências do usuário
    if (!typeId && userId) {
      // Buscar preferências do usuário
      const userPreferences = await prisma.userPreference.findMany({ where: { userId }, include: { preference: true } });
      const prefIds = userPreferences.map((p) => p.preferenceId);

      const allActivities = await prisma.activity.findMany({
        where,
        include: {
          type: true,
          creator: { select: { id: true, name: true, avatar: true } },
          _count: { select: { participants: { where: { status: 'APPROVED' } } } },
        },
        orderBy: { scheduledDate: 'asc' },
      });

      // Ordenar colocando as atividades cujo typeId esteja nas preferências primeiro
      allActivities.sort((a: any, b: any) => {
        const aPref = prefIds.includes(a.typeId) ? 0 : 1;
        const bPref = prefIds.includes(b.typeId) ? 0 : 1;
        if (aPref !== bPref) return aPref - bPref;
        return new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime();
      });

      const total = allActivities.length;
      const paged = allActivities.slice(skip, skip + limit);

      return {
        data: paged,
        meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
      };
    }

    // Comportamento padrão quando há filtro por tipo ou não há usuário autenticado
    const activities = await prisma.activity.findMany({
      where,
      include: {
        type: true,
        creator: { select: { id: true, name: true, avatar: true } },
        _count: { select: { participants: { where: { status: 'APPROVED' } } } },
      },
      orderBy: { scheduledDate: 'asc' },
      skip,
      take: limit,
    });

    const total = await prisma.activity.count({ where });

    return {
      data: activities,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async updateActivity(activityId: string, userId: string, data: UpdateActivityDTO) {
    const activity = await prisma.activity.findUnique({ where: { id: activityId } });

    if (!activity) {
      throw BusinessException.userNotFound();
    }

    if (activity.creatorId !== userId) {
      throw BusinessException.onlyCreatorCanEdit();
    }

    const updatedActivity = await prisma.activity.update({
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

  async deleteActivity(activityId: string, userId: string) {
    const activity = await prisma.activity.findUnique({ where: { id: activityId } });

    if (!activity) {
      throw BusinessException.userNotFound();
    }

    if (activity.creatorId !== userId) {
      throw BusinessException.onlyCreatorCanDelete();
    }

    await prisma.activity.update({
      where: { id: activityId },
      data: { isDeleted: true },
    });

    return { message: 'Atividade excluída com sucesso.' };
  }

  async completeActivity(activityId: string, userId: string) {
    const activity = await prisma.activity.findUnique({ where: { id: activityId } });

    if (!activity) {
      throw BusinessException.userNotFound();
    }

    if (activity.creatorId !== userId) {
      throw BusinessException.onlyCreatorCanComplete();
    }

    if (activity.completedAt) {
      throw BusinessException.requiredFieldsMissing(['activity']);
    }

    const completedActivity = await prisma.activity.update({
      where: { id: activityId },
      data: { completedAt: new Date() },
    });

    await this.achievementsService.checkFirstActivityCompleted(userId);

    return completedActivity;
  }
}