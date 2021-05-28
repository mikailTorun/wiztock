import {ShipmentItem} from "./shipment-item";


export class Shipment {
  shipment_id: number;
  company_id: number;
  shipment_type_id: number;
  freight_bill_number: string;
  source_warehouse_id: number;
  destination_warehouse_id: number;
  customer_id: number;
  issue_date: Date;
  shipment_date: Date;
  shipment_item: Array<ShipmentItem>;

  constructor() {
    this.shipment_id = 0;
    this.company_id = 0;
    this.shipment_type_id = 0;
    this.freight_bill_number = "";
    this.source_warehouse_id = 0;
    this.destination_warehouse_id = 0;
    this.customer_id=0;
    this.issue_date= new Date();
    this.shipment_date = new Date();
    this.shipment_date.setDate(this.issue_date.getDate() + 7);
    this.shipment_item =Array<ShipmentItem>();
  }
}
