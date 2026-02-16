"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityQuerySchema = void 0;
const zod_1 = require("zod");
exports.activityQuerySchema = zod_1.z.object({
    typeId: zod_1.z.string().uuid('ID do tipo de atividade inválido').optional(),
    visibility: zod_1.z.enum(['PUBLIC', 'PRIVATE']).optional(),
    scheduledAfter: zod_1.z.string().datetime('Data inicial inválida').optional(),
    scheduledBefore: zod_1.z.string().datetime('Data final inválida').optional(),
    creatorId: zod_1.z.string().uuid('ID do criador inválido').optional(),
    page: zod_1.z.coerce.number().int().positive().optional().default(1),
    limit: zod_1.z.coerce.number().int().positive().optional().default(10),
});
