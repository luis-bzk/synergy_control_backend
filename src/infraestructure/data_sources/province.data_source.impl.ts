import { Pool } from 'pg';

import { PostgresDatabase } from '../../data';
import { ProvinceDataSource } from '../../domain/data_sources';
import {
  CreateProvinceDto,
  DeleteProvinceDto,
  GetAllProvincesDto,
  GetProvinceDto,
  UpdateProvinceDto,
} from '../../domain/dtos/province';
import { Province } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { ProvinceMapper } from '../mappers/province.mapper';

export class ProvinceDataSourceImpl implements ProvinceDataSource {
  private pool: Pool;

  constructor() {
    this.pool = PostgresDatabase.getPool();
  }

  async create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    const { name, prefix, code, id_country } = createProvinceDto;

    try {
      // validate that don't exist a province with the same name
      const result = await this.pool.query(
        `select pro_id, pro_name, id_country
        from core.core_province pro
        where lower(pro.pro_name) = $1
          and pro.id_country = $2
          and pro.pro_record_status = $3;`,
        [name.toLowerCase(), id_country, '0'],
      );

      if (result.rows.length > 0) {
        throw CustomError.badRequest(
          'Ya existe una provincia con el mismo nombre',
        );
      }

      // create province
      const provinceCreated = await this.pool.query(
        `insert into core.core_province
        (pro_name,
         pro_code,
         id_country,
         pro_prefix,
         pro_created_date,
         pro_record_status)
        values ($1, $2, $3, $4, $5, $6)
        returning *;`,
        [name, code, id_country, prefix, new Date(), '0'],
      );

      return ProvinceMapper.provinceEntityFromObject(provinceCreated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al crear');
    }
  }

  async update(updateProvinceDto: UpdateProvinceDto): Promise<Province> {
    const { id, name, code, prefix, id_country } = updateProvinceDto;

    try {
      // validate exists province
      const province = await this.pool.query(
        `select pro_id, pro_name, id_country
        from core.core_province pro
        where pro.pro_id = $1
          and pro.pro_record_status = $2;`,
        [id, '0'],
      );
      if (province.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado la provincia a actualizar',
        );
      }

      // validate that don't exist a province with the same name
      const provinceToUpdate = await this.pool.query(
        `select pro_id, pro_name, id_country
        from core.core_province pro
        where lower(pro.pro_name) = $1
          and pro.id_country = $2
          and pro.pro_id <> $3
          and pro.pro_record_status = $4;`,
        [name, id_country, id, '0'],
      );
      if (provinceToUpdate.rows.length > 0) {
        throw CustomError.badRequest(
          'Ya existe una provincia con el nombre ingresado',
        );
      }

      // update
      const updatedRow = await this.pool.query(
        `update core.core_province
        set pro_name   = $1,
            pro_code   = $2,
            id_country = $3,
            pro_prefix = $4
        where pro_id = $5
        returning *;`,
        [name, code, id_country, prefix, id],
      );

      return ProvinceMapper.provinceEntityFromObject(updatedRow.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al actualizar');
    }
  }

  async get(getProvinceDto: GetProvinceDto): Promise<Province> {
    const { id } = getProvinceDto;

    try {
      const result = await this.pool.query(
        `select pro_id, pro_name, pro_code, pro_prefix, id_country, pro_record_status, pro_created_date
        from core.core_province pro
        where pro.pro_id = $1
          and pro.pro_record_status = $2;`,
        [id, '0'],
      );
      if (result.rows.length === 0) {
        throw CustomError.notFound('No se ha encontrado la provincia');
      }

      return ProvinceMapper.provinceEntityFromObject(result.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al obtener');
    }
  }

  async getAll(getAllProvincesDto: GetAllProvincesDto): Promise<Province[]> {
    const { limit, offset } = getAllProvincesDto;

    try {
      const result = await this.pool.query(
        `select pro.pro_id,
               pro.pro_name,
               pro.pro_code,
               pro.id_country,
               pro.pro_prefix,
               pro.pro_created_date,
               pro.pro_record_status
        from core.core_province pro
        where pro.pro_record_status = $1
        order by pro.pro_id desc
        limit $2 offset $3;`,
        ['0', limit, offset],
      );

      return ProvinceMapper.provinceEntityArrayFromObjects(result.rows);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer(
        'Error en el Data Source al obtener todos',
      );
    }
  }

  async delete(deleteProvinceDto: DeleteProvinceDto): Promise<Province> {
    const { id } = deleteProvinceDto;

    try {
      // validate exists province
      const province = await this.pool.query(
        `select pro_id, pro_name, id_country
        from core.core_province pro
        where pro.pro_id = $1
          and pro.pro_record_status = $2;`,
        [id, '0'],
      );
      if (province.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado la provincia a actualizar',
        );
      }

      const deleted = await this.pool.query(
        `delete
        from core.core_province
        where pro_id = $1
          and pro_record_status = $2
        returning *;`,
        [id, '0'],
      );

      return ProvinceMapper.provinceEntityFromObject(deleted.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer('Error en el Data Source al eliminar');
    }
  }
}
