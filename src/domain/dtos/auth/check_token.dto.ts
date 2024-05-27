export class CheckTokenDto {
  constructor(public token: string) {}

  static create(token: string): [string?, CheckTokenDto?] {
    if (!token) return ['El token de seguridad es requerido.'];

    return [undefined, new CheckTokenDto(token)];
  }
}
