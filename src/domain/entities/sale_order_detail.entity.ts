interface Entity {
  id: number;
  id_sale_order: number;
  id_warehouse: number;
  sku_identifier: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_date: Date;
  record_status: string;
}

export class SaleOrderDetail {
  public id: number;
  public id_sale_order: number;
  public id_warehouse: number;
  public sku_identifier: number;
  public quantity: number;
  public unit_price: number;
  public total_price: number;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_sale_order = entity.id_sale_order;
    this.id_warehouse = entity.id_warehouse;
    this.sku_identifier = entity.sku_identifier;
    this.quantity = entity.quantity;
    this.unit_price = entity.unit_price;
    this.total_price = entity.total_price;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
