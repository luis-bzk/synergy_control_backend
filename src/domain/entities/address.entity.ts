interface Entity {
  id: number;
  id_city: number;
  id_province: number;
  id_country: number;
  main_street: string;
  secondary_street: string;
  postal_code: string;
  reference: string;
  number: number;
  created_date: Date;
}

export class Address {
  public id: number;
  public id_city: number;
  public id_province: number;
  public id_country: number;
  public main_street: string;
  public secondary_street: string;
  public postal_code: string;
  public reference: string;
  public number: number;
  public created_date: Date;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_city = entity.id_city;
    this.id_province = entity.id_province;
    this.id_country = entity.id_country;
    this.main_street = entity.main_street;
    this.secondary_street = entity.secondary_street;
    this.postal_code = entity.postal_code;
    this.reference = entity.reference;
    this.number = entity.number;
    this.created_date = entity.created_date;
  }
}
