import { Pool } from 'pg';

import { AuthDataSource } from '../../domain/data_sources';
import { LoginUserDto } from '../../domain/dtos';
import { User } from '../../domain/entities';
import { PostgresDatabase } from '../../data';
import { CustomError } from '../../domain/errors';
import { BcryptAdapter } from '../../config';
import { UserDB } from '../../data/interfaces';
import { UserMapper } from '../mappers/user.mapper';

// type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private pool: Pool = PostgresDatabase.getPool(),
    // private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparepassword: CompareFunction = BcryptAdapter.compare,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;

    try {
      const response = await this.pool.query<UserDB>(
        'select * from core.core_user use where use.use_email = $1 and use.use_record_status = $2',
        [email, '0'],
      );
      if ((response.rows.length = 0)) {
        throw CustomError.badRequest('El usuario o contraseña es incorrecto');
      }
      const user_found = response.rows[0];

      const isMatching = this.comparepassword(
        user_found.USE_PASSWORD,
        password,
      );

      if (!isMatching) {
        throw CustomError.badRequest('El usuario o contraseña es incorrecto');
      }
      return UserMapper.userEntityFromObject(user_found);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
