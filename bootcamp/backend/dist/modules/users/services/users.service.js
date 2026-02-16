"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const client_1 = require("@prisma/client");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
const password_util_1 = require("../../../shared/utils/password.util");
const achievements_service_1 = require("./achievements.service");
const prisma = new client_1.PrismaClient();
class UsersService {
    constructor() {
        this.achievementsService = new achievements_service_1.AchievementsService();
    }
    /**
     * Retorna dados completos do usuário autenticado
     */
    async getCurrentUser(userId) {
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
            throw business_exception_1.BusinessException.userNotFound();
        }
        if (!user.isActive) {
            throw business_exception_1.BusinessException.accountDeactivated();
        }
        return user;
    }
    /**
     * Retorna preferências do usuário
     */
    async getUserPreferences(userId) {
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
    async definePreferences(userId, preferenceIds) {
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
    async updateUser(userId, data) {
        // Se mudar email, verificar se não está em uso
        if (data.email) {
            const existingUser = await prisma.user.findFirst({
                where: {
                    email: data.email,
                    id: { not: userId },
                },
            });
            if (existingUser) {
                throw business_exception_1.BusinessException.emailOrCpfAlreadyExists();
            }
        }
        // Se mudar senha, criptografar
        let hashedPassword;
        if (data.password) {
            hashedPassword = await password_util_1.PasswordUtil.hash(data.password);
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
    async updateAvatar(userId, avatarUrl) {
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
    async deactivateAccount(userId) {
        await prisma.user.update({
            where: { id: userId },
            data: { isActive: false },
        });
        return { message: 'Conta desativada com sucesso' };
    }
}
exports.UsersService = UsersService;
