import { Validators } from '../../../config';

export class RecoverPasswordDto {
  constructor(public email: string) {}

  static create(object: {
    [key: string]: any;
  }): [string?, RecoverPasswordDto?] {
    const { email } = object;

    if (!email) return ['El email del usuario es requerido'];
    if (!Validators.email.test(email))
      return ['El email ingresado no es válido'];

    return [undefined, new RecoverPasswordDto(email)];
  }
}
