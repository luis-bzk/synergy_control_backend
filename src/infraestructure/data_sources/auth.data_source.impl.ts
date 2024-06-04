import { Pool } from 'pg';

import { AuthDataSource } from '../../domain/data_sources';
import {
  ChangePasswordDto,
  CheckTokenDto,
  ConfirmAccountDto,
  LoginUserDto,
  RecoverPasswordDto,
  SignupUserDto,
} from '../../domain/dtos';
import { User } from '../../domain/entities';
import { PostgresDatabase } from '../../data';
import { CustomError } from '../../domain/errors';
import { BcryptAdapter } from '../../config';
import { UserDB } from '../../data/interfaces';
import { UserMapper } from '../mappers/user.mapper';
import { tokenGenerator } from '../../utils';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private pool: Pool = PostgresDatabase.getPool(),
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparepassword: CompareFunction = BcryptAdapter.compare,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;
    try {
      const response = await this.pool.query<UserDB>(
        'SELECT * FROM CORE.CORE_USER USE WHERE USE.USE_EMAIL = $1 AND USE.USE_RECORD_STATUS = $2',
        [email, '0'],
      );

      if (response.rows.length === 0) {
        throw CustomError.badRequest('El usuario o contraseña es incorrecto');
      }

      const user_found = response.rows[0];

      const isMatching = this.comparepassword(
        user_found.use_password,
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

  async signup(signupUserDto: SignupUserDto): Promise<User> {
    const { name, lastName, email, password } = signupUserDto;

    try {
      // validate email
      const response = await this.pool.query<UserDB>(
        'SELECT * FROM CORE.CORE_USER USE WHERE USE.USE_EMAIL = $1 AND USE.USE_RECORD_STATUS = $2',
        [email, '0'],
      );

      if (response.rows.length > 0) {
        throw CustomError.badRequest(
          'El email solicitado ya se encuentra registrado',
        );
      }

      // create user
      const userCreated = await this.pool.query<UserDB>(
        `INSERT INTO CORE.CORE_USER (USE_NAME,
                            USE_LAST_NAME,
                            USE_EMAIL,
                            USE_PASSWORD,
                            USE_TOKEN,
                            USE_CREATED_DATE,
                            USE_RECORD_STATUS)
                          VALUES ($1, $2, $3, $4, $5, $6, $7)
                          RETURNING *;`,
        [
          name,
          lastName,
          email,
          this.hashPassword(password),
          tokenGenerator(),
          '0',
        ],
      );

      // TODO: create role

      return UserMapper.userEntityFromObject(userCreated.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async recoverPassword(recoverPasswordDto: RecoverPasswordDto): Promise<User> {
    const { email } = recoverPasswordDto;

    try {
      const user_found = await this.pool.query<UserDB>(
        `SELECT *
      FROM CORE.CORE_USER USE 
      WHERE USE.USE_EMAIL = $1 
      AND USE.USE_RECORD_STATUS = $2;`,
        [email, '0'],
      );
      if (user_found.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado un usuario asociado a este email',
        );
      }

      const update_user = await this.pool.query<UserDB>(
        `UPDATE CORE.CORE_USER
      SET USE_TOKEN = $1
      WHERE USE_ID = $2
      AND USE_RECORD_STATUS = $3
      RETURNING *;`,
        [tokenGenerator(), user_found.rows[0].use_id, '0'],
      );

      return UserMapper.userEntityFromObject(update_user.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<User> {
    const { password, token } = changePasswordDto;

    try {
      const user_found = await this.pool.query<UserDB>(
        `SELECT *
      FROM CORE.CORE_USER USE
      WHERE USE.USE_TOKEN = $1
        AND USE.USE_RECORD_STATUS = $2;`,
        [token, '0'],
      );

      if (user_found.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado un usuario asociado a este token',
        );
      }

      const updated_user = await this.pool.query<UserDB>(
        `UPDATE CORE.CORE_USER
      SET USE_TOKEN    = $1,
          USE_PASSWORD = $2
      WHERE USE_TOKEN = $3
        AND USE_RECORD_STATUS = $4
      RETURNING *;`,
        [null, this.hashPassword(password), token, '0'],
      );

      return UserMapper.userEntityFromObject(updated_user.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async checkToken(checkTokenDto: CheckTokenDto): Promise<User> {
    const { token } = checkTokenDto;

    try {
      const user_found = await this.pool.query<UserDB>(
        `SELECT *
      FROM CORE.CORE_USER USE
      WHERE USE.USE_TOKEN = $1
        AND USE.USE_RECORD_STATUS = $2;`,
        [token, '0'],
      );

      if (user_found.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado un usuario asociado a este token',
        );
      }

      return UserMapper.userEntityFromObject(user_found.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async confirmAccount(confirmAccountDto: ConfirmAccountDto): Promise<User> {
    const { token } = confirmAccountDto;

    try {
      const user_found = await this.pool.query<UserDB>(
        `SELECT *
      FROM CORE.CORE_USER USE
      WHERE USE.USE_TOKEN = $1
        AND USE.USE_RECORD_STATUS = $2;`,
        [token, '0'],
      );

      if (user_found.rows.length === 0) {
        throw CustomError.notFound(
          'No se ha encontrado un usuario asociado a este token',
        );
      }

      const updated_user = await this.pool.query<UserDB>(
        `UPDATE CORE.CORE_USER
      SET USE_TOKEN    = $1
      WHERE USE_TOKEN = $2
        AND USE_RECORD_STATUS = $3
      RETURNING *;`,
        [null, token, '0'],
      );

      return UserMapper.userEntityFromObject(updated_user.rows[0]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
