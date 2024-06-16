import { Country } from '../../domain/entities';
import { CountryRepository } from '../../domain/repositories';
import { CountryDataSource } from '../../domain/data_sources';
import { CreateCountryDto, UpdateCountryDto } from '../../domain/dtos/country';

export class CountryRepositoryImpl implements CountryRepository {
  private readonly countryDataSource: CountryDataSource;

  constructor(countryDataSource: CountryDataSource) {
    this.countryDataSource = countryDataSource;
  }

  create(createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countryDataSource.create(createCountryDto);
  }

  update(updateCountryDto: UpdateCountryDto): Promise<Country> {
    return this.countryDataSource.update(updateCountryDto);
  }
}
