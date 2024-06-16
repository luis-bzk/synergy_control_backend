import { Country } from '../entities';
import { CreateCountryDto } from '../dtos/country';

export abstract class CountryDataSource {
  abstract create(createCountryDto: CreateCountryDto): Promise<Country>;
}
