interface Entity {
  id: number;
  id_product: number;
  id_category: number;
  created_date: Date;
  record_status: string;
}

export class ProductCategory {
  public id: number;
  public id_product: number;
  public id_category: number;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_product = entity.id_product;
    this.id_category = entity.id_category;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
