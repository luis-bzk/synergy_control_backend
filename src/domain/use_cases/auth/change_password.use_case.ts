import { ChangePasswordDto } from '../../dtos';
import { User } from '../../entities';
import { AuthRepository } from '../../repositories';

interface ChangePasswordUseCase {
  execute(changePasswordDto: ChangePasswordDto): Promise<User>;
}

export class ChangePassword implements ChangePasswordUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(changePasswordDto: ChangePasswordDto): Promise<User> {
    return this.authRepository.changePassword(changePasswordDto);
  }
}
