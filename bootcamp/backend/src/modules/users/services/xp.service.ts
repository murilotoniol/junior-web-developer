import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class XpService {
  // XP necessário para subir de nível (progressivo)
  private static readonly BASE_XP_PER_LEVEL = 100;
  private static readonly XP_MULTIPLIER = 1.25;

  // XP concedido por ações
  static readonly XP_FOR_CHECKIN = 50; // Participante faz check-in
  static readonly XP_FOR_CREATOR = 30; // Criador recebe quando participante faz check-in

  /**
   * Calcula o XP necessário para o próximo nível
   */
  static calculateXpForNextLevel(currentLevel: number): number {
    return Math.floor(
      this.BASE_XP_PER_LEVEL * Math.pow(this.XP_MULTIPLIER, currentLevel - 1)
    );
  }

  /**
   * Adiciona XP ao usuário e verifica se ele subiu de nível
   */
  async addXp(userId: string, xpAmount: number): Promise<{
    newXp: number;
    newLevel: number;
    leveledUp: boolean;
  }> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    let newXp = user.xp + xpAmount;
    let newLevel = user.level;
    let leveledUp = false;

    // Verificar se subiu de nível
    let xpForNextLevel = XpService.calculateXpForNextLevel(newLevel);

    while (newXp >= xpForNextLevel) {
      newXp -= xpForNextLevel;
      newLevel += 1;
      leveledUp = true;
      xpForNextLevel = XpService.calculateXpForNextLevel(newLevel);
    }

    // Atualizar usuário
    await prisma.user.update({
      where: { id: userId },
      data: { xp: newXp, level: newLevel },
    });

    return { newXp, newLevel, leveledUp };
  }

  /**
   * Concede XP para participante e criador após check-in
   */
  async grantXpForCheckin(participantId: string, creatorId: string): Promise<void> {
    // XP para o participante
    await this.addXp(participantId, XpService.XP_FOR_CHECKIN);

    // XP para o criador
    await this.addXp(creatorId, XpService.XP_FOR_CREATOR);
  }
}