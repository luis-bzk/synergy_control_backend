export class UpdateCityDto {
  public id: number;
  public name: string;
  public id_province: number;

  constructor(id: number, name: string, id_province: number) {
    this.id = id;
    this.name = name;
    this.id_province = id_province;
  }

  static create(
    id: string,
    object: { [key: string]: any },
  ): [string?, UpdateCityDto?] {
    const { name, id_province } = object;

    // make validation
    if (!id) return ['El ID de la ciudad es requerido'];
    if (isNaN(parseInt(id, 10))) return ['El ID de la ciudad no es válido'];

    if (!name) return ['El nombre de la ciudad es requerido'];
    if (name.length > 100)
      return ['El nombre de la ciudad no puede tener mas de 100 caracteres'];

    if (!id_province) return ['El ID de la provincia es requerido'];
    if (isNaN(id_province)) return ['El ID de la provincia no es válido'];

    return [undefined, new UpdateCityDto(parseInt(id, 10), name, id_province)];
  }
}
