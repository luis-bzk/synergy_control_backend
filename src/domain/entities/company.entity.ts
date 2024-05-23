interface Entity {
  id: number;
  social_reason: string;
  description: string;
  vision: string;
  mision: string;
  email: string;
  phone: string;
  created_date: Date;
  record_status: string;
}

export class Company {
  public id: number;
  public social_reason: string;
  public description: string;
  public vision: string;
  public mision: string;
  public email: string;
  public phone: string;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.social_reason = entity.social_reason;
    this.description = entity.description;
    this.vision = entity.vision;
    this.mision = entity.mision;
    this.email = entity.email;
    this.phone = entity.phone;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
