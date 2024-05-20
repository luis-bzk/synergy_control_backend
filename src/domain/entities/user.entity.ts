interface Entity {
  use_id: string;
  use_name: string;
  use_last_name: string;
  use_email: string;
  use_password: string;
  use_token: string;
  use_record_status: string;
}

export class User {
  public use_id: string;
  public use_name: string;
  public use_last_name: string;
  public use_email: string;
  public use_password: string;
  public use_token: string;
  public use_record_status: string;

  constructor(entity: Entity) {
    this.use_id = entity.use_id;
    this.use_name = entity.use_name;
    this.use_last_name = entity.use_last_name;
    this.use_email = entity.use_email;
    this.use_password = entity.use_password;
    this.use_token = entity.use_token;
    this.use_record_status = entity.use_record_status;
  }
}
