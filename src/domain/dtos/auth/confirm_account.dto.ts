export class ConfirmAccountDto {
  constructor(public token: string) {}

  static create(object: { [key: string]: any }): [string?, ConfirmAccountDto?] {
    const { token } = object;
    if (!token) return ['El token de seguridad es requerido.'];
    return [undefined, new ConfirmAccountDto(token)];
  }
}
