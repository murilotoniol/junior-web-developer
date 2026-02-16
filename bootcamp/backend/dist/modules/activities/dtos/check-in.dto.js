"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInSchema = void 0;
const zod_1 = require("zod");
exports.checkInSchema = zod_1.z.object({
    confirmationCode: zod_1.z.string().length(6, 'Código de confirmação deve ter 6 caracteres'),
});
