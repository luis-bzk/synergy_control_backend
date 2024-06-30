import { Router } from 'express';
import { ProvinceDataSourceImpl } from '../../infraestructure/data_sources';
import { ProvinceRepositoryImpl } from '../../infraestructure/repositories';
import { ProvinceController } from './controller';

export class ProvinceRoutes {
  static getRoutes(): Router {
    const router = Router();

    const dataSource = new ProvinceDataSourceImpl();
    const repository = new ProvinceRepositoryImpl(dataSource);
    const controller = new ProvinceController(repository);

    // routes
    router.post('/create', controller.createProvince);
    router.put('/update/:id', controller.updateProvince);
    router.get('/get/:id', controller.getProvince);
    router.get('/get-all', controller.getAllProvinces);
    router.delete('/delete/:id', controller.deleteProvince);

    return router;
  }
}
