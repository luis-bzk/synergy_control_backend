interface Entity {
  id: number;
  identification_type: string;
  identification: string;
  id_user: number;
  first_name: string;
  second_name: string;
  first_last_name: string;
  second_last_name: string;
  occupation: string;
  genre: string;
  created_date: Date;
  record_status: string;
}

export class Person {
  public id: number;
  public identification_type: string;
  public identification: string;
  public id_user: number;
  public first_name: string;
  public second_name: string;
  public first_last_name: string;
  public second_last_name: string;
  public occupation: string;
  public genre: string;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.identification_type = entity.identification_type;
    this.identification = entity.identification;
    this.id_user = entity.id_user;
    this.first_name = entity.first_name;
    this.second_name = entity.second_name;
    this.first_last_name = entity.first_last_name;
    this.second_last_name = entity.second_last_name;
    this.occupation = entity.occupation;
    this.genre = entity.genre;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
