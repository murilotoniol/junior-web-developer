"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = void 0;
const express_1 = require("express");
const storage_service_1 = require("./services/storage.service");
class StorageModule {
    static routes() {
        const router = (0, express_1.Router)();
        const service = new storage_service_1.StorageService();
        // Este módulo pode ser expandido com endpoints de download/acesso de arquivos conforme necessário
        // Por enquanto, o upload é tratado no module de usuários
        return router;
    }
}
exports.StorageModule = StorageModule;
