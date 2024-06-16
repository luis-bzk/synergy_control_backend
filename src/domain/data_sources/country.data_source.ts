import { Country } from '../entities';
import { CreateCountryDto, UpdateCountryDto } from '../dtos/country';

export abstract class CountryDataSource {
  abstract create(createCountryDto: CreateCountryDto): Promise<Country>;

  abstract update(updateCountryDto: UpdateCountryDto): Promise<Country>;
}
