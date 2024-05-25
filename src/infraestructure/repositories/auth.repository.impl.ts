import { AuthRepository } from '../../domain/repositories';
import { AuthDataSource } from '../../domain/data_sources';
import { LoginUserDto } from '../../domain/dtos';
import { User } from '../../domain/entities';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSoure: AuthDataSource) {}

  login(loginUserDto: LoginUserDto): Promise<User> {
    return this.authDataSoure.login(loginUserDto);
  }
}
