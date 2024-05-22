interface Entity {
  id: number;
  name: string;
  description: string;
  base_price: number;
  iva_price: number;
  discount: number;
  stock: number;
  sku: string;
  id_agency: number;
  created_date: Date;
  record_status: string;
}

export class Product {
  public id: number;
  public name: string;
  public description: string;
  public base_price: number;
  public iva_price: number;
  public discount: number;
  public stock: number;
  public sku: string;
  public id_agency: number;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.name = entity.name;
    this.description = entity.description;
    this.base_price = entity.base_price;
    this.iva_price = entity.iva_price;
    this.discount = entity.discount;
    this.stock = entity.stock;
    this.sku = entity.sku;
    this.id_agency = entity.id_agency;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
