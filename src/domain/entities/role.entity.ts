interface Entity {
  id: number;
  name: string;
  description: string;
  created_date: Date;
}
export class Role {
  public id: number;
  public name: string;
  public description: string;
  public created_date: Date;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.created_date = entity.created_date;
  }
}
