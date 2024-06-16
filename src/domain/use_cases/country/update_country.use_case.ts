import { Country } from '../../entities';
import { UpdateCountryDto } from '../../dtos/country';
import { CountryRepository } from '../../repositories';

interface UpdateCountryUseCase {
  execute(updateCountryDto: UpdateCountryDto): Promise<Country>;
}

export class UpdateCountry implements UpdateCountryUseCase {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepositoy: CountryRepository) {
    this.countryRepository = countryRepositoy;
  }

  async execute(updateCountryDto: UpdateCountryDto): Promise<Country> {
    return await this.countryRepository.update(updateCountryDto);
  }
}
