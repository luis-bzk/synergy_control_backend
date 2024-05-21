interface Entity {
  id: number;
  name: string;
  last_name: string;
  email: string;
  password: string;
  token: string;
  record_status: string;
  created_date: Date;
}

export class User {
  public id: number;
  public name: string;
  public last_name: string;
  public email: string;
  public password: string;
  public token: string;
  public record_status: string;
  public created_date: Date;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.last_name = entity.last_name;
    this.email = entity.email;
    this.password = entity.password;
    this.token = entity.token;
    this.record_status = entity.record_status;
    this.created_date = entity.created_date;
  }
}
