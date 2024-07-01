export class GetProvinceDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(id: string): [string?, GetProvinceDto?] {
    // make validation
    if (!id) return ['El ID de la provincia es requerido'];
    if (isNaN(parseInt(id, 10))) return ['El ID de la provincia no es válido'];

    return [undefined, new GetProvinceDto(parseInt(id, 10))];
  }
}
