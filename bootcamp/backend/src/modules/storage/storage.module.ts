import { Router } from 'express';
import { StorageService } from './services/storage.service';

export class StorageModule {
  static routes(): Router {
    const router = Router();
    const service = new StorageService();

    // Este módulo pode ser expandido com endpoints de download/acesso de arquivos conforme necessário
    // Por enquanto, o upload é tratado no module de usuários

    return router;
  }
}
