export class GetCountryDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(id: number): [string?, GetCountryDto?] {
    if (!id) return ['El ID del país es requerido'];
    if (!isNaN(id)) return ['El ID del país no es válido'];

    return [undefined, new GetCountryDto(id)];
  }
}
