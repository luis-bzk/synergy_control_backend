interface Entity {
  id: number;
  name: string;
  description: string;
  abbreviation: string;
  created_date: Date;
  record_status: string;
}

export class Genre {
  public id: number;
  public name: string;
  public description: string;
  public abbreviation: string;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.abbreviation = entity.abbreviation;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
