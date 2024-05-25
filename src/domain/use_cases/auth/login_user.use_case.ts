import { LoginUserDto } from '../../dtos';
import { AuthRepository } from '../../repositories';
import { JwtAdapter } from '../../../config';
import { CustomError } from '../../errors';

interface UserToken {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
  };
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface LoginUserUsease {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUsease {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto);

    //   token
    const token = await this.signToken({ id: user.id }, '2h');
    if (!token) throw CustomError.internalServer('Error al generar el token');

    return {
      token: token,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
