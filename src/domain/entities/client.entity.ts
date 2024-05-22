interface Entity {
  id: number;
  id_person: number;
  id_agency: number;
  created_date: Date;
  record_status: string;
}

export class ClientEntity {
  public id: number;
  public id_person: number;
  public id_agency: number;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_person = entity.id_person;
    this.id_agency = entity.id_agency;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
