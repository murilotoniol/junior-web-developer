"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
    email: zod_1.z.string().email('E-mail inválido'),
    cpf: zod_1.z.string().regex(/^\d{11}$/, 'CPF deve conter 11 dígitos'),
    password: zod_1.z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});
