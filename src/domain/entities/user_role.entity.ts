interface Entity {
  id: number;
  id_user: number;
  id_role: number;
  created_date: Date;
}

export class UserRole {
  public id: number;
  public id_user: number;
  public id_role: number;
  public created_date: Date;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_user = entity.id_user;
    this.id_role = entity.id_role;
    this.created_date = entity.created_date;
  }
}
