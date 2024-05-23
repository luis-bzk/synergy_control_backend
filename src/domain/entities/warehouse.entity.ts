interface Entity {
  id: number;
  id_agency: number;
  name: string;
  description: string;
  id_address: number;
  created_date: Date;
  record_status: string;
}

export class Warehouse {
  public id: number;
  public id_agency: number;
  public name: string;
  public description: string;
  public id_address: number;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_agency = entity.id_agency;
    this.name = entity.name;
    this.description = entity.description;
    this.id_address = entity.id_address;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
