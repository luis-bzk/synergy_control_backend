interface Entity {
  id: number;
  name: string;
  description: string;
  created_date: Date;
  record_status: string;
}

export class Role {
  public id: number;
  public name: string;
  public description: string;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
