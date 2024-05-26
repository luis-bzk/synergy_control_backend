import { User } from '../entities';
import {
  ChangePasswordDto,
  LoginUserDto,
  RecoverPasswordDto,
  SignupUserDto,
} from '../dtos';

export abstract class AuthDataSource {
  abstract login(loginUserDto: LoginUserDto): Promise<User>;

  abstract signup(signupUserDto: SignupUserDto): Promise<User>;

  abstract recoverPassword(
    recoverPasswordDto: RecoverPasswordDto,
  ): Promise<User>;

  abstract changePassword(changePasswordDto: ChangePasswordDto): Promise<User>;
}
