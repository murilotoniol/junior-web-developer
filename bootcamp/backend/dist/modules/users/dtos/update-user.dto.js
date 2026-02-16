"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = void 0;
const zod_1 = require("zod");
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').optional(),
    email: zod_1.z.string().email('E-mail inválido').optional(),
    password: zod_1.z.string().min(6, 'Senha deve ter no mínimo 6 caracteres').optional(),
});
