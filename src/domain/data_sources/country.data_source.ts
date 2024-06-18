import { Country } from '../entities';
import {
  CreateCountryDto,
  GetCountryDto,
  UpdateCountryDto,
} from '../dtos/country';

export abstract class CountryDataSource {
  abstract create(createCountryDto: CreateCountryDto): Promise<Country>;

  abstract update(updateCountryDto: UpdateCountryDto): Promise<Country>;

  abstract get(getCountryDto: GetCountryDto): Promise<Country>;
}
