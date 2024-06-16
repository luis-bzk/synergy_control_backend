import { Request, Response } from 'express';

import { CustomError } from '../../domain/errors';
import { CreateCountryDto } from '../../domain/dtos/country';
import { CountryRepository } from '../../domain/repositories';
import { CreateCountry } from '../../domain/use_cases/country';

export class CountryController {
  private readonly countryRepository: CountryRepository;

  constructor(countryRepository: CountryRepository) {
    this.countryRepository = countryRepository;
  }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    // unknown error
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  createCountry = (req: Request, res: Response) => {
    const [error, createCountryDto] = CreateCountryDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateCountry(this.countryRepository)
      .execute(createCountryDto!)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
