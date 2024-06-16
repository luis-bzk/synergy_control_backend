import { Country } from '../../domain/entities';
import { CreateCountryDto } from '../../domain/dtos/country';
import { CountryRepository } from '../../domain/repositories';
import { CountryDataSource } from '../../domain/data_sources';

export class CountryRepositoryImpl implements CountryRepository {
  private readonly countryDataSource: CountryDataSource;

  constructor(countryDataSource: CountryDataSource) {
    this.countryDataSource = countryDataSource;
  }

  create(createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countryDataSource.create(createCountryDto);
  }
}
