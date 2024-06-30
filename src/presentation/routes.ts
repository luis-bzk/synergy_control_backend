import { Router, Request, Response, NextFunction } from 'express';
import { AuthRoutes } from './auth/routes';
import { CountryRoutes } from './country/routes';
import { ProvinceRoutes } from './province/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // global routes
    router.use('/api/v1/auth', AuthRoutes.getRoutes);
    router.use('/api/v1/country', CountryRoutes.getRoutes);
    router.use('/api/v1/province', ProvinceRoutes.getRoutes);

    // security not found route
    router.use((_req: Request, res: Response, _next: NextFunction) => {
      res.status(404).json({ error: 'La ruta solicitada no existe' });
    });

    return router;
  }
}
