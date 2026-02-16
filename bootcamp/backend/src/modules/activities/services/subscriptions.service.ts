import prisma from '../../../shared/database/prisma';
import { BusinessException } from '../../../shared/exceptions/business.exception';

export class SubscriptionsService {
  async subscribeToActivity(activityId: string, userId: string) {
    const activity = await prisma.activity.findUnique({
      where: { id: activityId, isDeleted: false },
    });

    if (!activity) {
      throw BusinessException.userNotFound();
    }

    if (activity.creatorId === userId) {
      throw BusinessException.creatorCannotSubscribe();
    }

    if (activity.completedAt) {
      throw BusinessException.cannotSubscribeCompleted();
    }

    const existingSubscription = await prisma.activityParticipant.findUnique({
      where: {
        activityId_userId: {
          activityId,
          userId,
        },
      },
    });

    if (existingSubscription) {
      throw BusinessException.alreadySubscribed();
    }

    const participant = await prisma.activityParticipant.create({
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

  async unsubscribe(activityId: string, userId: string) {
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

    if (participant.hasCheckedIn) {
      throw BusinessException.cannotUnsubscribeAfterCheckin();
    }

    await prisma.activityParticipant.delete({
      where: {
        activityId_userId: {
          activityId,
          userId,
        },
      },
    });

    return { message: 'Inscrição cancelada com sucesso.' };
  }

  async approveParticipant(activityId: string, participantId: string, userId: string) {
    const activity = await prisma.activity.findUnique({
      where: { id: activityId, isDeleted: false },
    });

    if (!activity) {
      throw BusinessException.userNotFound();
    }

    if (activity.creatorId !== userId) {
      throw BusinessException.onlyCreatorCanApprove();
    }

    const participant = await prisma.activityParticipant.findUnique({
      where: { id: participantId },
    });

    if (!participant || participant.activityId !== activityId) {
      throw BusinessException.userNotFound();
    }

    if (participant.status === 'APPROVED') {
      throw BusinessException.requiredFieldsMissing(['participant']);
    }

    const updatedParticipant = await prisma.activityParticipant.update({
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

  async rejectParticipant(activityId: string, participantId: string, userId: string) {
    const activity = await prisma.activity.findUnique({
      where: { id: activityId, isDeleted: false },
    });

    if (!activity) {
      throw BusinessException.userNotFound();
    }

    if (activity.creatorId !== userId) {
      throw BusinessException.onlyCreatorCanApprove();
    }

    const participant = await prisma.activityParticipant.findUnique({
      where: { id: participantId },
    });

    if (!participant || participant.activityId !== activityId) {
      throw BusinessException.userNotFound();
    }

    if (participant.status === 'REJECTED') {
      throw BusinessException.requiredFieldsMissing(['participant']);
    }

    const updatedParticipant = await prisma.activityParticipant.update({
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

  async listParticipants(activityId: string, userId: string) {
    const activity = await prisma.activity.findUnique({
      where: { id: activityId, isDeleted: false },
    });

    if (!activity) {
      throw BusinessException.userNotFound();
    }

    if (activity.creatorId !== userId) {
      throw BusinessException.userNotFound();
    }

    const participants = await prisma.activityParticipant.findMany({
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
