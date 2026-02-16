"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./controllers/auth.controller");
class AuthModule {
    static routes() {
        const router = (0, express_1.Router)();
        const controller = new auth_controller_1.AuthController();
        router.post('/register', controller.register);
        router.post('/sign-in', controller.login);
        return router;
    }
}
exports.AuthModule = AuthModule;
