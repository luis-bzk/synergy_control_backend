interface Entity {
  id: number;
  name: string;
  code: string;
  prefix: string;
  created_date: Date;
  record_status: string;
}

export class Country {
  public id: number;
  public name: string;
  public code: string;
  public prefix: string;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.code = entity.code;
    this.prefix = entity.prefix;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
