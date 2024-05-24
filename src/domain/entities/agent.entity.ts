interface Entity {
  id: number;
  id_agency: number;
  id_user: number;
  created_date: Date;
  record_status: string;
}

export class Agent {
  public id: number;
  public id_agency: number;
  public id_user: number;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_agency = entity.id_agency;
    this.id_user = entity.id_user;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
