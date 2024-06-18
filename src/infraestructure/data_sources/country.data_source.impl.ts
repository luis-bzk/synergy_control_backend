import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { Country } from '../../domain/entities';
import { CountryDB } from '../../data/interfaces';
import { CustomError } from '../../domain/errors';
import { CountryMapper } from '../mappers/country.mapper';
import {
  CreateCountryDto,
  GetCountryDto,
  UpdateCountryDto,
} from '../../domain/dtos/country';
import { CountryDataSource } from '../../domain/data_sources';

export class CountryDataSourceImpl implements CountryDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(createCountryDto: CreateCountryDto): Promise<Country> {
    const { name, prefix, code } = createCountryDto;

    try {
      const result = await this.pool.query<CountryDB>(
        `select *
        from core.core_country cou
        where lower(cou.cou_name) = $1
          and cou.cou_record_status = $2;`,
        [name.toLowerCase(), '0'],
      );

      if (result.rows.length > 0) {
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
        values (:p1, :p2, :p3, :p4, :p5)
        returning *;`,
        [name, code, prefix, new Date(), '0'],
      );

      return CountryMapper.countryEntityFromObject(countryCreated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async update(updateCountryDto: UpdateCountryDto): Promise<Country> {
    const { id, name, code, prefix } = updateCountryDto;

    try {
      // verify existence
      const result = await this.pool.query(
        `select *
        from core.core_country cou
        where cou.cou_id = $1
          and cou.cou_record_status = $2;`,
        [id, '0'],
      );
      if (result.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado el pais a actualizar');
      }

      // verify if there's a country with the same name
      const rowSameName = await this.pool.query(
        `select *
        from core.core_country cou
        where lower(cou.cou_name) = $1
          and cou.cou_id <> $2
          and cou.cou_record_status = $3;`,
        [name.toLowerCase(), id, '0'],
      );
      if (rowSameName.rows.length > 0) {
        throw CustomError.badRequest(
          'Ya existe un pais co el nombre ingresado',
        );
      }

      // update
      const updatedRow = await this.pool.query(
        `update core.core_country
        set cou_name   = $1,
            cou_code   = $2,
            cou_prefix = $3
        where cou_id = $4
          and cou_record_status = $5
          returning *;`,
        [name, code, prefix, id, '0'],
      );

      return CountryMapper.countryEntityFromObject(updatedRow.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async get(getCountryDto: GetCountryDto): Promise<Country> {
    const { id } = getCountryDto;

    try {
      const result = await this.pool.query(
        `select *
        from core.core_country cou
        where cou.cou_id = $1
          and cou.cou_record_status = $2;`,
        [id, '0'],
      );

      if (result.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado el país');
      }

      return CountryMapper.countryEntityFromObject(result.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }
}
