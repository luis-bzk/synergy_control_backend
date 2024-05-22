interface Entity {
  id: number;
  type: string;
  number: string;
  id_user: number;
  created_date: Date;
  record_status: string;
}

export class Phone {
  public id: number;
  public type: string;
  public number: string;
  public id_user: number;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.type = entity.type;
    this.number = entity.number;
    this.id_user = entity.id_user;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
