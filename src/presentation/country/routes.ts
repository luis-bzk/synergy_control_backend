import { Router } from 'express';
import { CountryDataSourceImpl } from '../../infraestructure/data_sources/country.data_source.impl';
import { CountryRepositoryImpl } from '../../infraestructure/repositories';
import { CountryController } from './controller';

export class CountryRoutes {
  static getRoutes(): Router {
    const router = Router();

    const dataSource = new CountryDataSourceImpl();
    const repository = new CountryRepositoryImpl(dataSource);
    const controller = new CountryController(repository);

    // routes

    router.post('/create', controller.createCountry);

    return router;
  }
}
