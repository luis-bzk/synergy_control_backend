interface Entity {
  id: number;
  name: string;
  opening_hour: string;
  closing_hour: string;
  created_date: Date;
  record_status: string;
}

export class Agency {
  public id: number;
  public name: string;
  public opening_hour: string;
  public closing_hour: string;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.opening_hour = entity.opening_hour;
    this.closing_hour = entity.opening_hour;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
