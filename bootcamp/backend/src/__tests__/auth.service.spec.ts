jest.mock('@prisma/client', () => {
  const mUser = {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
  const mPrisma = function () {
    // @ts-ignore
    return { user: mUser };
  };
  return { PrismaClient: mPrisma };
});

import { AuthService } from '../modules/auth/services/auth.service';
import { PrismaClient } from '@prisma/client';

const prisma: any = new (PrismaClient as any)();

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('throws when registering with existing email or cpf', async () => {
    prisma.user.findFirst.mockResolvedValue({ id: 'existing-id' });
    const service = new AuthService();

    await expect(
      service.register({ name: 'A', email: 'a@a.com', cpf: '12345678901', password: '123456' } as any)
    ).rejects.toThrow();
  });

  it('throws when logging in with unknown user', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const service = new AuthService();

    await expect(service.login({ email: 'no@one.com', password: '123456' } as any)).rejects.toThrow();
  });
});
