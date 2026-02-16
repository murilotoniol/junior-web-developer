"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const business_exception_1 = require("../exceptions/business.exception");
const zod_1 = require("zod");
function errorHandler(error, req, res, next) {
    // Business exceptions (erros esperados da aplicação)
    if (error instanceof business_exception_1.BusinessException) {
        res.status(error.statusCode).json({
            error: true,
            code: error.errorCode,
            message: error.message,
            timestamp: new Date().toISOString(),
        });
        return;
    }
    // Erros de validação do Zod
    if (error instanceof zod_1.ZodError) {
        const zodError = error;
        res.status(400).json({
            error: true,
            code: 'E1',
            message: 'Informe os campos obrigatórios corretamente.',
            details: zodError.issues?.map((err) => ({
                field: err.path?.join('.') || 'unknown',
                message: err.message,
            })) || [],
            timestamp: new Date().toISOString(),
        });
        return;
    }
    // Erros inesperados (500)
    console.error('Unexpected error:', error);
    res.status(500).json({
        error: true,
        code: 'INTERNAL_ERROR',
        message: 'Erro interno do servidor.',
        timestamp: new Date().toISOString(),
    });
}
