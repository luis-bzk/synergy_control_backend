import { CheckTokenDto } from '../../dtos';
import { User } from '../../entities';
import { AuthRepository } from '../../repositories';

interface CheckTokenUseCase {
  execute(checkTokenDto: CheckTokenDto): Promise<User>;
}

export class CheckToken implements CheckTokenUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(checkTokenDto: CheckTokenDto): Promise<User> {
    return await this.authRepository.checkToken(checkTokenDto);
  }
}
