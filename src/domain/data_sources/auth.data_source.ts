import { User } from '../entities';
import { LoginUserDto } from '../dtos';

export abstract class AuthDataSource {
  abstract login(loginUserDto: LoginUserDto): Promise<User>;
}
