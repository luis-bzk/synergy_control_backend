interface Entity {
  id: number;
  name: string;
  description: string;
  abbreviation: string;
  id_country: number;
  created_date: Date;
  record_status: string;
}

export class IdentificationType {
  public id: number;
  public name: string;
  public description: string;
  public abbreviation: string;
  public id_country: number;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.abbreviation = entity.abbreviation;
    this.id_country = entity.id_country;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
