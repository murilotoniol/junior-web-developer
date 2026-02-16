import { Request, Response } from 'express';
import { AuthRequest } from '../../../modules/auth/guards/jwt-auth.guard';
import { UsersService } from '../services/users.service';
import { StorageService } from '../../storage/services/storage.service';
import { definePreferencesSchema } from '../dtos/define-preferences.dto';
import { updateUserSchema } from '../dtos/update-user.dto';
import { BusinessException } from '../../../shared/exceptions/business.exception';

export class UsersController {
  private usersService: UsersService;
  private storageService: StorageService;

  constructor() {
    this.usersService = new UsersService();
    this.storageService = new StorageService();
  }

  /**
   * @swagger
   * /user/me:
   *   get:
   *     summary: Obter dados do usuário autenticado
   *     tags: [Usuários]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Dados do usuário
   *       401:
   *         description: Não autorizado
   *       404:
   *         description: Usuário não encontrado
   */
  getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
    const user = await this.usersService.getCurrentUser(req.userId);
    res.status(200).json(user);
  };

  /**
   * @swagger
   * /user/me:
   *   patch:
   *     summary: Atualizar dados do usuário autenticado
   *     tags: [Usuários]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserDTO'<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Usuário atualizado com sucesso<br/>
   *       400:<br/>
   *         description: Dados inválidos<br/>
   *       401:<br/>
   *         description: Não autorizado<br/>
   *       409:<br/>
   *         description: E-mail já em uso
   */
  updateUser = async (req: AuthRequest, res: Response): Promise<void> => {
    const data = updateUserSchema.parse(req.body);
    const updatedUser = await this.usersService.updateUser(req.userId, data);
    res.status(200).json(updatedUser);
  };

  /**
   * @swagger
   * /user/me:
   *   delete:
   *     summary: Desativar conta do usuário autenticado (soft delete)
   *     tags: [Usuários]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Conta desativada com sucesso
   *       401:
   *         description: Não autorizado
   *       404:
   *         description: Usuário não encontrado
   */
  deactivateAccount = async (req: AuthRequest, res: Response): Promise<void> => {
    const result = await this.usersService.deactivateAccount(req.userId);
    res.status(200).json(result);
  };

  /**
   * @swagger
   * /user/preferences:
   *   get:
   *     summary: Obter preferências do usuário autenticado
   *     tags: [Usuários]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de preferências
   *       401:
   *         description: Não autorizado
   */
  getUserPreferences = async (req: AuthRequest, res: Response): Promise<void> => {
    const preferences = await this.usersService.getUserPreferences(req.userId);
    res.status(200).json(preferences);
  };

  /**
   * @swagger
   * /user/preferences:
   *   post:
   *     summary: Definir preferências do usuário autenticado
   *     tags: [Usuários]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/DefinePreferencesDTO'<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Preferências definidas com sucesso<br/>
   *       400:<br/>
   *         description: IDs de preferência inválidos<br/>
   *       401:<br/>
   *         description: Não autorizado
   */
  definePreferences = async (req: AuthRequest, res: Response): Promise<void> => {
    const { preferenceIds } = definePreferencesSchema.parse(req.body);
    const preferences = await this.usersService.definePreferences(req.userId, preferenceIds);
    res.status(200).json(preferences);
  };

  /**
   * @swagger
   * /user/avatar:
   *   post:
   *     summary: Fazer upload ou atualizar avatar do usuário
   *     tags: [Usuários]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               avatar:
   *                 type: string
   *                 format: binary
   *                 description: Arquivo de imagem para o avatar (PNG, JPG)<br/>
   *     responses:<br/>
   *       200:<br/>
   *         description: Avatar atualizado com sucesso<br/>
   *       400:<br/>
   *         description: Formato de imagem inválido ou nenhum arquivo enviado
   *       401:
   *         description: Não autorizado
   */
  updateAvatar = async (req: any, res: Response): Promise<void> => {
    if (!req.file) {
      throw BusinessException.requiredFieldsMissing(['avatar']);
    }
    const avatarUrl = await this.storageService.uploadImage(req.file, `avatars/${req.userId}`);
    const updatedUser = await this.usersService.updateAvatar(req.userId, avatarUrl);
    res.status(200).json(updatedUser);
  };

  /**
   * @swagger
   * /user/achievements:
   *   get:
   *     summary: Obter conquistas do usuário autenticado
   *     tags: [Usuários]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de conquistas
   *       401:
   *         description: Não autorizado
   */
  getUserAchievements = async (req: AuthRequest, res: Response): Promise<void> => {
    const achievements = await this.usersService.getCurrentUser(req.userId); // Reutiliza o método que já inclui achievements
    res.status(200).json(achievements.achievements);
  };
}