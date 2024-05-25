import { Router, Request, Response, NextFunction } from 'express';
import { AuthRoutes } from './auth/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // global routes
    router.use('/api/v1/auth', AuthRoutes.getRoutes);

    // security not found route
    router.use((_req: Request, res: Response, _next: NextFunction) => {
      res.status(404).json({ error: 'La ruta solicitada no existe' });
    });

    return router;
  }
}
