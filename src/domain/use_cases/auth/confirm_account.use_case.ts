import { ConfirmAccountDto } from '../../dtos';
import { User } from '../../entities';
import { AuthRepository } from '../../repositories';

interface ConfirmAccountUseCase {
  execute(confirmAccountDto: ConfirmAccountDto): Promise<User>;
}

export class ConfirmAccount implements ConfirmAccountUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(confirmAccountDto: ConfirmAccountDto): Promise<User> {
    return await this.authRepository.confirmAccount(confirmAccountDto);
  }
}
