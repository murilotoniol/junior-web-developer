"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const register_dto_1 = require("../dtos/register.dto");
const login_dto_1 = require("../dtos/login.dto");
class AuthController {
    constructor() {
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
        this.register = async (req, res) => {
            const data = register_dto_1.registerSchema.parse(req.body);
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
        this.login = async (req, res) => {
            const data = login_dto_1.loginSchema.parse(req.body);
            const result = await this.authService.login(data);
            res.status(200).json(result);
        };
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
