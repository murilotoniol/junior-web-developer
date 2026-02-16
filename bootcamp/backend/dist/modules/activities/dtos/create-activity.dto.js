"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivitySchema = exports.ActivityVisibility = void 0;
const zod_1 = require("zod");
var ActivityVisibility;
(function (ActivityVisibility) {
    ActivityVisibility["PUBLIC"] = "PUBLIC";
    ActivityVisibility["PRIVATE"] = "PRIVATE";
})(ActivityVisibility || (exports.ActivityVisibility = ActivityVisibility = {}));
exports.createActivitySchema = zod_1.z.object({
    title: zod_1.z.string().min(3, 'Título deve ter no mínimo 3 caracteres'),
    description: zod_1.z.string().min(10, 'Descrição deve ter no mínimo 10 caracteres'),
    typeId: zod_1.z.string().uuid('ID do tipo de atividade inválido'),
    scheduledDate: zod_1.z.string().datetime('Data e hora agendada inválida'),
    visibility: zod_1.z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC'),
    address: zod_1.z.object({
        latitude: zod_1.z.number().min(-90).max(90, 'Latitude inválida'),
        longitude: zod_1.z.number().min(-180).max(180, 'Longitude inválida'),
    }),
});
