interface Entity {
  id: number;
  id_user: number;
  id_role: number;
  created_date: Date;
  record_status: string;
}

export class UserRole {
  public id: number;
  public id_user: number;
  public id_role: number;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_user = entity.id_user;
    this.id_role = entity.id_role;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
