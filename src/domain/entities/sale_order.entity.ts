interface Entity {
  id: number;
  id_client: number;
  id_agency: number;
  id_transaction_type: number;
  id_policy: number;
  id_agent: number;
  sale_date: Date;
  created_date: Date;
  record_status: string;
}

export class SaleOrder {
  public id: number;
  public id_client: number;
  public id_agency: number;
  public id_transaction_type: number;
  public id_policy: number;
  public id_agent: number;
  public sale_date: Date;
  public created_date: Date;
  public record_status: string;

  constructor(entity: Entity) {
    this.id = entity.id;
    this.id_client = entity.id_client;
    this.id_agency = entity.id_agency;
    this.id_transaction_type = entity.id_transaction_type;
    this.id_policy = entity.id_policy;
    this.id_agent = entity.id_agent;
    this.sale_date = entity.sale_date;
    this.created_date = entity.created_date;
    this.record_status = entity.record_status;
  }
}
