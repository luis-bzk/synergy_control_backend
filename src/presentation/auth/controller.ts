import { Request, Response } from 'express';

import { AuthRepository } from '../../domain/repositories';
import { CustomError } from '../../domain/errors';
import { LoginUserDto } from '../../domain/dtos';
import { LoginUser } from '../../domain/use_cases/auth';

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  };

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error: error });

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((err) => this.handleError(err, res));
  };
}
