import { Request, Response } from 'express';

import { AuthRepository } from '../../domain/repositories';
import { CustomError } from '../../domain/errors';
import {
  ChangePasswordDto,
  CheckTokenDto,
  ConfirmAccountDto,
  LoginUserDto,
  RecoverPasswordDto,
  SignupUserDto,
} from '../../domain/dtos';
import {
  LoginUser,
  RecoverPassword,
  SignUpUser,
  ChangePassword,
  CheckToken,
  ConfirmAccount,
} from '../../domain/use_cases/auth';

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

  signupUser = (req: Request, res: Response) => {
    const [error, signupUserDto] = SignupUserDto.create(req.body);

    if (error) return res.status(400).json({ error: error });

    new SignUpUser(this.authRepository)
      .execute(signupUserDto!)
      .then((data) => res.status(201).json(data))
      .catch((err) => this.handleError(err, res));
  };

  recoverPassword = (req: Request, res: Response) => {
    const [error, recoverPasswordDto] = RecoverPasswordDto.create(req.body);
    if (error) return res.status(400).json({ error: error });

    new RecoverPassword(this.authRepository)
      .execute(recoverPasswordDto!)
      .then((data) => res.status(200).json(data))
      .catch((err) => this.handleError(err, res));
  };

  changePassword = (req: Request, res: Response) => {
    const [error, changePasswordDto] = ChangePasswordDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new ChangePassword(this.authRepository)
      .execute(changePasswordDto!)
      .then((data) => res.status(200).json(data))
      .catch((err) => this.handleError(err, res));
  };

  checkToken = (req: Request, res: Response) => {
    const [error, checkTokenDto] = CheckTokenDto.create(req.params.token);
    if (error) return res.status(400).json({ error });

    new CheckToken(this.authRepository)
      .execute(checkTokenDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  confirmAccount = (req: Request, res: Response) => {
    const [error, confirmAccountDto] = ConfirmAccountDto.create(req.body);
    if (error) return res.status(400).json({ error });

    new ConfirmAccount(this.authRepository)
      .execute(confirmAccountDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };
}
