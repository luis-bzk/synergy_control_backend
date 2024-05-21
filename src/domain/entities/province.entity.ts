interface Entity {
  id: number;
  name: string;
  code: string;
  id_country: number;
  created_date: Date;
}

export class Province {
  public id: number;
  public name: string;
  public code: string;
  public id_country: number;
  public created_date: Date;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.code = entity.code;
    this.id_country = entity.id_country;
    this.created_date = entity.created_date;
  }
}
