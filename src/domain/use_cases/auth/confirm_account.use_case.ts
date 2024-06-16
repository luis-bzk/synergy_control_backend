import { User } from '../../entities';
import { ConfirmAccountDto } from '../../dtos';
import { AuthRepository } from '../../repositories';

interface ConfirmAccountUseCase {
  execute(confirmAccountDto: ConfirmAccountDto): Promise<User>;
}

export class ConfirmAccount implements ConfirmAccountUseCase {
  private readonly authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(confirmAccountDto: ConfirmAccountDto): Promise<User> {
    return await this.authRepository.confirmAccount(confirmAccountDto);
  }
}
