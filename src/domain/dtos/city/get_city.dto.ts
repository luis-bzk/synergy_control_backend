export class GetCityDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(id: string): [string?, GetCityDto?] {
    // make validation
    if (!id) return ['El ID de la ciudad es requerido'];
    if (isNaN(parseInt(id, 10))) return ['El ID de la ciudad no es válido'];

    return [undefined, new GetCityDto(parseInt(id, 10))];
  }
}
