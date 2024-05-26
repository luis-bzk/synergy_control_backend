import { RecoverPasswordDto } from '../../dtos';
import { AuthRepository } from '../../repositories';
import { User } from '../../entities';

interface RecoverPasswordUseCase {
  execute(recoverPasswordDto: RecoverPasswordDto): Promise<User>;
}

export class RecoverPassword implements RecoverPasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(recoverPasswordDto: RecoverPasswordDto): Promise<User> {
    return this.authRepository.recoverPassword(recoverPasswordDto);
  }
}
