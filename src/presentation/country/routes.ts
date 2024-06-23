import { Router } from 'express';
import { CountryController } from './controller';
import { CountryDataSourceImpl } from '../../infraestructure/data_sources';
import { CountryRepositoryImpl } from '../../infraestructure/repositories';

export class CountryRoutes {
  static getRoutes(): Router {
    const router = Router();

    const dataSource = new CountryDataSourceImpl();
    const repository = new CountryRepositoryImpl(dataSource);
    const controller = new CountryController(repository);

    // routes
    router.post('/create', controller.createCountry);
    router.put('/update/:id', controller.updateCountry);
    router.get('/get/:id', controller.getCountry);
    router.get('/get-all', controller.getAllCountries);
    router.delete('/delete/:id', controller.deleteCountry);

    return router;
  }
}
