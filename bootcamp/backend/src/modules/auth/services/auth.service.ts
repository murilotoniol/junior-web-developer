import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { RegisterDTO } from '../dtos/register.dto';
import { LoginDTO } from '../dtos/login.dto';
import { PasswordUtil } from '../../../shared/utils/password.util';
import { BusinessException } from '../../../shared/exceptions/business.exception';
import { jwtConfig } from '../../../config/jwt.config';

const prisma = new PrismaClient();

export class AuthService {
  async register(data: RegisterDTO) {
    // Verificar se email ou CPF já existem
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { cpf: data.cpf }],
      },
    });

    if (existingUser) {
      throw BusinessException.emailOrCpfAlreadyExists();
    }

    // Criptografar senha
    const hashedPassword = await PasswordUtil.hash(data.password);

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
    const token = jwt.sign(
      { userId: user.id },
      jwtConfig.secret as string,
      { expiresIn: jwtConfig.expiresIn } as any,
    );

    return { user, token };
  }

  async login(data: LoginDTO) {
    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw BusinessException.userNotFound();
    }

    // Verificar se conta está ativa
    if (!user.isActive) {
      throw BusinessException.accountDeactivated();
    }

    // Verificar senha
    const isPasswordValid = await PasswordUtil.compare(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw BusinessException.incorrectPassword();
    }

    // Gerar token JWT
    const token = jwt.sign(
      { userId: user.id },
      jwtConfig.secret as string,
      { expiresIn: jwtConfig.expiresIn } as any,
    );

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