export class GetAllCountriesDto {
  public limit: number;
  public offset: number;

  constructor(limit: number, offset: number) {
    this.limit = limit;
    this.offset = offset;
  }

  static create(object: {
    [key: string]: any;
  }): [string?, GetAllCountriesDto?] {
    const { limit, offset } = object;

    if (!Number.isInteger(Number(limit)))
      return ['El limite establecido no es valido'];

    if (!Number.isInteger(Number(offset)))
      return ['El punto de partida no es valido'];

    return [undefined, new GetAllCountriesDto(limit, offset)];
  }
}
