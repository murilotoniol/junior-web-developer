import { Express } from 'express';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { StorageModule } from './modules/storage/storage.module';

export class AppModule {
  static register(app: Express): void {
    // Registrar rotas de cada módulo
    app.use('/auth', AuthModule.routes());
    app.use('/user', UsersModule.routes());
    app.use('/activities', ActivitiesModule.routes());
    app.use('/storage', StorageModule.routes());
    
    // Health check
    app.get('/health', (req, res) => {
      res.json({ status: 'ok', timestamp: new Date().toISOString() });
    });
  }
}