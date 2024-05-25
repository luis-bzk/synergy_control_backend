import { Router, Request, Response, NextFunction } from 'express';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // global routes
    router.use('/api/v1/auth');

    // security not found route
    router.use((_req: Request, res: Response, _next: NextFunction) => {
      res.status(404).json({ error: 'La ruta solicitada no existe' });
    });

    return router;
  }
}
