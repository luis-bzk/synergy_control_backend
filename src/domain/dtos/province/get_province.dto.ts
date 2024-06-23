export class GetProvinceDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(id: number): [string?, GetProvinceDto?] {
    // make validation
    if (!id) return ['El ID de la provincia es requerido'];
    if (isNaN(id)) return ['El ID de la provincia no es válido'];

    return [undefined, new GetProvinceDto(id)];
  }
}
