"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateActivitySchema = void 0;
const zod_1 = require("zod");
exports.updateActivitySchema = zod_1.z.object({
    title: zod_1.z.string().min(3, 'Título deve ter no mínimo 3 caracteres').optional(),
    description: zod_1.z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres').optional(),
    typeId: zod_1.z.string().uuid('ID do tipo de atividade inválido').optional(),
    scheduledDate: zod_1.z.string().datetime('Data e hora agendada inválida').optional(),
    visibility: zod_1.z.enum(['PUBLIC', 'PRIVATE']).optional(),
    address: zod_1.z.object({
        latitude: zod_1.z.number().min(-90).max(90, 'Latitude inválida').optional(),
        longitude: zod_1.z.number().min(-180).max(180, 'Longitude inválida').optional(),
    }).optional(),
});
