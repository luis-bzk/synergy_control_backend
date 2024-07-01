export class DeleteCountryDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(id: string): [string?, DeleteCountryDto?] {
    if (!id) return ['El ID del país es requerido'];
    if (isNaN(parseInt(id, 10))) return ['El ID del país no es válido'];

    return [undefined, new DeleteCountryDto(parseInt(id, 10))];
  }
}
