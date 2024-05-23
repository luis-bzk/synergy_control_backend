interface Entity {
  id: number;
  id_client: number;
  id_agency: number;
  id_transaction: number;
  id_policy: number;
  sale_date: Date;
  id_agent: number;
  created_date: Date;
  record_status: string;
}

export class SaleOrder {
  public id: number;
  public id_client: number;
  public id_agency: number;
  public id_transaction: number;
  public id_policy: number;
  public sale_date: Date;
  public id_agent: number;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_client = entity.id_client;
    this.id_agency = entity.id_agency;
    this.id_transaction = entity.id_transaction;
    this.id_policy = entity.id_policy;
    this.sale_date = entity.sale_date;
    this.id_agent = entity.id_agent;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
