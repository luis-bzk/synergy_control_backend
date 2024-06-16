import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { Country } from '../../domain/entities';
import { CountryDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { CountryMapper } from '../mappers/country.mapper';
import { CreateCountryDto } from '../../domain/dtos/country';
import { CountryDataSource } from '../../domain/data_sources';

export class CountryDataSourceImpl implements CountryDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const { name, prefix, code } = createCountryDto;

    try {
      const response = await this.pool.query<CountryDB>(
        `select *
        from core.core_country cou
        where lower(cou.cou_name) = $1
          and cou.cou_record_status = $2;`,
        [name.toLowerCase(), '0'],
      );

      if (response.rows.length > 0) {
        throw CustomError.badRequest(
          'Ya existe un pais registrado con ese nombre',
        );
      }

      // create country
      const countryCreated = await this.pool.query<CountryDB>(
        `insert into core.core_country(cou_name,
                              cou_code,
                              cou_prefix,
                              cou_created_date,
                              cou_record_status)
        values (:p1, :p2, :p3, :p4, :p5);
        returning *;`,
        [name, code, prefix, new Date(), '0'],
      );

      return CountryMapper.countryEntityFromObject(countryCreated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
