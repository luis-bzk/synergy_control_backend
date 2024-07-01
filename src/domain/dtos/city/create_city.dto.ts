export class CreateCityDto {
  public name: string;
  public id_province: number;

  constructor(name: string, id_province: number) {
    this.name = name;
    this.id_province = id_province;
  }

  static create(object: { [key: string]: any }): [string?, CreateCityDto?] {
    const { name, id_province } = object;

    // make validation
    if (!name) return ['El nombre de la ciudad es requerido'];
    if (name.length > 100)
      return ['El nombre de la ciudad no puede tener mas de 100 caracteres'];

    if (!id_province) return ['El ID de la provincia es requerido'];
    if (isNaN(id_province)) return ['El ID de la provincia no es válido'];

    return [undefined, new CreateCityDto(name, id_province)];
  }
}
