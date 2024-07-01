export class UpdateProvinceDto {
  public id: number;
  public name: string;
  public code: string;
  public prefix: string;
  public id_country: number;

  constructor(
    id: number,
    name: string,
    code: string,
    prefix: string,
    id_country: number,
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.prefix = prefix;
    this.id_country = id_country;
  }

  static create(
    id: string,
    object: { [key: string]: any },
  ): [string?, UpdateProvinceDto?] {
    const { name, code, prefix, id_country } = object;

    // make validation

    if (!id) return ['El ID de la provincia es requerido'];
    if (isNaN(parseInt(id, 10))) return ['El ID de la provincia no es válido'];

    if (!name) return ['El nombre de la provincia es requerido'];
    if (name.length > 100)
      return ['El nombre de la provincia no puede tener mas de 100 caracteres'];

    if (!code) return ['El código de la provincia es requerido'];
    if (code.length)
      return ['El código de la provincia no puede tener mas de 10 caracteres'];

    if (!prefix) return ['El prefijo de la provincia es requerido'];
    if (prefix.length)
      return ['El prefijo de la provincia no puede tener mas de 10 caracteres'];

    if (!id_country) return ['El ID del país es requerido'];
    if (isNaN(id_country)) return ['El ID del país no es válido'];

    return [
      undefined,
      new UpdateProvinceDto(parseInt(id, 10), name, code, prefix, id_country),
    ];
  }
}
