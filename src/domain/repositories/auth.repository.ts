import { User } from '../entities';
import { LoginUserDto, RecoverPasswordDto, SignupUserDto } from '../dtos';

export abstract class AuthRepository {
  abstract login(loginUserDto: LoginUserDto): Promise<User>;

  abstract signup(signupUserDto: SignupUserDto): Promise<User>;

  abstract recoverPassword(
    recoverPasswordDto: RecoverPasswordDto,
  ): Promise<User>;
}
