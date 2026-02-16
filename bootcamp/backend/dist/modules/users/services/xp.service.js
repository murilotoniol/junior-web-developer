"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XpService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class XpService {
    /**
     * Calcula o XP necessário para o próximo nível
     */
    static calculateXpForNextLevel(currentLevel) {
        return Math.floor(this.BASE_XP_PER_LEVEL * Math.pow(this.XP_MULTIPLIER, currentLevel - 1));
    }
    /**
     * Adiciona XP ao usuário e verifica se ele subiu de nível
     */
    async addXp(userId, xpAmount) {
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
    async grantXpForCheckin(participantId, creatorId) {
        // XP para o participante
        await this.addXp(participantId, XpService.XP_FOR_CHECKIN);
        // XP para o criador
        await this.addXp(creatorId, XpService.XP_FOR_CREATOR);
    }
}
exports.XpService = XpService;
// XP necessário para subir de nível (progressivo)
XpService.BASE_XP_PER_LEVEL = 100;
XpService.XP_MULTIPLIER = 1.25;
// XP concedido por ações
XpService.XP_FOR_CHECKIN = 50; // Participante faz check-in
XpService.XP_FOR_CREATOR = 30; // Criador recebe quando participante faz check-in
