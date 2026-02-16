"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const activities_module_1 = require("./modules/activities/activities.module");
const storage_module_1 = require("./modules/storage/storage.module");
class AppModule {
    static register(app) {
        // Registrar rotas de cada módulo
        app.use('/auth', auth_module_1.AuthModule.routes());
        app.use('/user', users_module_1.UsersModule.routes());
        app.use('/activities', activities_module_1.ActivitiesModule.routes());
        app.use('/storage', storage_module_1.StorageModule.routes());
        // Health check
        app.get('/health', (req, res) => {
            res.json({ status: 'ok', timestamp: new Date().toISOString() });
        });
    }
}
exports.AppModule = AppModule;
