export class DeleteProvinceDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(id: string): [string?, DeleteProvinceDto?] {
    // make validation
    if (!id) return ['El ID de la provincia es requerido'];
    if (isNaN(parseInt(id, 10))) return ['El ID de la provincia no es válido'];

    return [undefined, new DeleteProvinceDto(parseInt(id, 10))];
  }
}
