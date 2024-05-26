import { SignupUserDto } from '../../dtos';
import { User } from '../../entities';
import { AuthRepository } from '../../repositories';

interface SignupUserUseCase {
  execute(signupUserDto: SignupUserDto): Promise<User>;
}

export class SignUpUser implements SignupUserUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(signupUserDto: SignupUserDto): Promise<User> {
    return await this.authRepository.signup(signupUserDto);
  }
}
