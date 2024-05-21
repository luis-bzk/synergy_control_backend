interface Entity {
  id: number;
  type: string;
  number: string;
  id_user: number;
}

export class Phone {
  public id: number;
  public type: string;
  public number: string;
  public id_user: number;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.type = entity.type;
    this.number = entity.number;
    this.id_user = entity.id_user;
  }
}
