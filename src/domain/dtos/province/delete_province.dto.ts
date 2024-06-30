export class DeleteProvinceDto {
  public id: number;

  constructor(id: number) {
    this.id = id;
  }

  static create(id: number): [string?, DeleteProvinceDto?] {
    // make validation
    if (!id) return ['El ID de la provincia es requerido'];
    if (isNaN(id)) return ['El ID de la provincia no es válido'];

    return [undefined, new DeleteProvinceDto(id)];
  }
}
