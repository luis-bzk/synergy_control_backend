import { AuthRepository } from '../../domain/repositories';
import { AuthDataSource } from '../../domain/data_sources';
import {
  ChangePasswordDto,
  LoginUserDto,
  RecoverPasswordDto,
  SignupUserDto,
} from '../../domain/dtos';
import { User } from '../../domain/entities';

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}

  login(loginUserDto: LoginUserDto): Promise<User> {
    return this.authDataSource.login(loginUserDto);
  }

  signup(signupUserDto: SignupUserDto): Promise<User> {
    return this.authDataSource.signup(signupUserDto);
  }

  recoverPassword(recoverPasswordDto: RecoverPasswordDto): Promise<User> {
    return this.authDataSource.recoverPassword(recoverPasswordDto);
  }

  changePassword(changePasswordDto: ChangePasswordDto): Promise<User> {
    return this.authDataSource.changePassword(changePasswordDto);
  }
}
