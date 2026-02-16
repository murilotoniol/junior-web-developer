"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const users_controller_1 = require("./controllers/users.controller");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
// Configuração do Multer para upload de arquivos
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(), // Armazena o arquivo em memória
    limits: {
        fileSize: 5 * 1024 * 1024, // Limite de 5MB
    },
});
class UsersModule {
    static routes() {
        const router = (0, express_1.Router)();
        const controller = new users_controller_1.UsersController();
        router.use(jwt_auth_guard_1.jwtAuthGuard); // Todas as rotas de usuário requerem autenticação
        router.get('/me', controller.getCurrentUser);
        router.patch('/me', controller.updateUser);
        router.delete('/me', controller.deactivateAccount);
        router.get('/preferences', controller.getUserPreferences);
        router.post('/preferences', controller.definePreferences);
        router.post('/avatar', upload.single('avatar'), controller.updateAvatar); // 'avatar' é o nome do campo no formulário
        router.get('/achievements', controller.getUserAchievements);
        return router;
    }
}
exports.UsersModule = UsersModule;
