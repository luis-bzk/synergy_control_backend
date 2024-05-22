interface Entity {
  id: number;
  id_product: number;
  bar_code: string;
  weight: number;
  brand: string;
  color: string;
  material: string;
  warranty: string;
  image: string;
  created_date: Date;
  record_status: string;
}

export class ProductDetails {
  public id: number;
  public id_product: number;
  public bar_code: string;
  public weight: number;
  public brand: string;
  public color: string;
  public material: string;
  public warranty: string;
  public image: string;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_product = entity.id_product;
    this.bar_code = entity.bar_code;
    this.weight = entity.weight;
    this.brand = entity.brand;
    this.color = entity.color;
    this.material = entity.material;
    this.warranty = entity.warranty;
    this.image = entity.image;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
