interface Entity {
  id: number;
  id_agency: number;
  name: string;
  description: string;
  base_price: number;
  iva_price: number;
  discount: number;
  stock: number;
  sku_identifier: string;
  created_date: Date;
  record_status: string;
}

export class Product {
  public id: number;
  public id_agency: number;
  public name: string;
  public description: string;
  public base_price: number;
  public iva_price: number;
  public discount: number;
  public stock: number;
  public sku_identifier: string;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_agency = entity.id_agency;
    this.name = entity.name;
    this.description = entity.description;
    this.base_price = entity.base_price;
    this.iva_price = entity.iva_price;
    this.discount = entity.discount;
    this.stock = entity.stock;
    this.sku_identifier = entity.sku_identifier;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
