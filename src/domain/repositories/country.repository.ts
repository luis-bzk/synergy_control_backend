import { Country } from '../entities';
import { CreateCountryDto } from '../dtos/country';

export abstract class CountryRepository {
  abstract create(createCountryDto: CreateCountryDto): Promise<Country>;
}
