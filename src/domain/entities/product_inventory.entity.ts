interface Entity {
  id: number;
  id_product: number;
  sku_identifier: number;
  id_warehouse: number;
  stock: number;
  sold: number;
  created_date: Date;
  record_status: string;
}

export class ProductInventory {
  public id: number;
  public id_product: number;
  public sku_identifier: number;
  public id_warehouse: number;
  public stock: number;
  public sold: number;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_product = entity.id_product;
    this.sku_identifier = entity.sku_identifier;
    this.id_warehouse = entity.id_warehouse;
    this.stock = entity.stock;
    this.sold = entity.sold;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
