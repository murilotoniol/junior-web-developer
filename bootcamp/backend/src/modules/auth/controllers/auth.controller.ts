import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { registerSchema } from '../dtos/register.dto';
import { loginSchema } from '../dtos/login.dto';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: Registrar novo usuário
   *     tags: [Autenticação]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - email
   *               - cpf
   *               - password
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               cpf:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *       400:
   *         description: Dados inválidos
   *       409:
   *         description: E-mail ou CPF já cadastrado
   */
  register = async (req: Request, res: Response): Promise<void> => {
    const data = registerSchema.parse(req.body);
    const result = await this.authService.register(data);
    res.status(201).json(result);
  };

  /**
   * @swagger
   * /auth/sign-in:
   *   post:
   *     summary: Fazer login
   *     tags: [Autenticação]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   *       401:
   *         description: Credenciais inválidas
   */
  login = async (req: Request, res: Response): Promise<void> => {
    const data = loginSchema.parse(req.body);
    const result = await this.authService.login(data);
    res.status(200).json(result);
  };
}