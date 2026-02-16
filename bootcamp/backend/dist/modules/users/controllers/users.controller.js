"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = require("../services/users.service");
const storage_service_1 = require("../../storage/services/storage.service");
const define_preferences_dto_1 = require("../dtos/define-preferences.dto");
const update_user_dto_1 = require("../dtos/update-user.dto");
const business_exception_1 = require("../../../shared/exceptions/business.exception");
class UsersController {
    constructor() {
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
        this.getCurrentUser = async (req, res) => {
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
        this.updateUser = async (req, res) => {
            const data = update_user_dto_1.updateUserSchema.parse(req.body);
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
        this.deactivateAccount = async (req, res) => {
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
        this.getUserPreferences = async (req, res) => {
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
        this.definePreferences = async (req, res) => {
            const { preferenceIds } = define_preferences_dto_1.definePreferencesSchema.parse(req.body);
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
        this.updateAvatar = async (req, res) => {
            if (!req.file) {
                throw business_exception_1.BusinessException.requiredFieldsMissing(['avatar']);
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
        this.getUserAchievements = async (req, res) => {
            const achievements = await this.usersService.getCurrentUser(req.userId); // Reutiliza o método que já inclui achievements
            res.status(200).json(achievements.achievements);
        };
        this.usersService = new users_service_1.UsersService();
        this.storageService = new storage_service_1.StorageService();
    }
}
exports.UsersController = UsersController;
