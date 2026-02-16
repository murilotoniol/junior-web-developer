"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definePreferencesSchema = void 0;
const zod_1 = require("zod");
exports.definePreferencesSchema = zod_1.z.object({
    preferenceIds: zod_1.z.array(zod_1.z.string().uuid('ID de preferência inválido')),
});
