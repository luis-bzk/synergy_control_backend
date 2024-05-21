interface Entity {
  id: number;
  name: string;
  id_province: number;
  created_date: Date;
}

export class City {
  public id: number;
  public name: string;
  public id_province: number;
  public created_date: Date;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.id_province = entity.id_province;
    this.created_date = entity.created_date;
  }
}
