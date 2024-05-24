interface Entity {
  id: number;
  id_phone_type: number;
  id_user: number;
  number: string;
  created_date: Date;
  record_status: string;
}

export class Phone {
  public id: number;
  public id_phone_type: number;
  public id_user: number;
  public number: string;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_phone_type = entity.id_phone_type;
    this.id_user = entity.id_user;
    this.number = entity.number;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
