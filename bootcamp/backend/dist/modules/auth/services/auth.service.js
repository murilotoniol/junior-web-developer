"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const password_util_1 = require("../../../shared/utils/password.util");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
const jwt_config_1 = require("../../../config/jwt.config");
const prisma = new client_1.PrismaClient();
class AuthService {
    async register(data) {
        // Verificar se email ou CPF já existem
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: data.email }, { cpf: data.cpf }],
            },
        });
        if (existingUser) {
            throw business_exception_1.BusinessException.emailOrCpfAlreadyExists();
        }
        // Criptografar senha
        const hashedPassword = await password_util_1.PasswordUtil.hash(data.password);
        // Criar usuário
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                cpf: data.cpf,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                cpf: true,
                avatar: true,
                xp: true,
                level: true,
                createdAt: true,
            },
        });
        // Gerar token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwt_config_1.jwtConfig.secret, { expiresIn: jwt_config_1.jwtConfig.expiresIn });
        return { user, token };
    }
    async login(data) {
        // Buscar usuário
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });
        if (!user) {
            throw business_exception_1.BusinessException.userNotFound();
        }
        // Verificar se conta está ativa
        if (!user.isActive) {
            throw business_exception_1.BusinessException.accountDeactivated();
        }
        // Verificar senha
        const isPasswordValid = await password_util_1.PasswordUtil.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw business_exception_1.BusinessException.incorrectPassword();
        }
        // Gerar token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwt_config_1.jwtConfig.secret, { expiresIn: jwt_config_1.jwtConfig.expiresIn });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                avatar: user.avatar,
                xp: user.xp,
                level: user.level,
            },
            token,
        };
    }
}
exports.AuthService = AuthService;
