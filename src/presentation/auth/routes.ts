import { Router } from 'express';
import { AuthDataSourceImpl } from '../../infraestructure/data_sources';
import { AuthRepositoryImpl } from '../../infraestructure/repositories';
import { AuthController } from './controller';

export class AuthRoutes {
  static get getRoutes(): Router {
    const router = Router();

    const dataSource = new AuthDataSourceImpl();
    const authRepository = new AuthRepositoryImpl(dataSource);
    const controller = new AuthController(authRepository);

    //   routes
    router.post('/login', controller.loginUser);
    router.post('/signup', controller.signupUser);
    router.patch('/request/recover-password', controller.recoverPassword);
    router.patch('/request/change-password', controller.changePassword);
    router.get('/check/token/:token');
    router.patch('/confirm/user');

    return router;
  }
}
