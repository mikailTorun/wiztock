export class Product {
  product_id: number;
  company_id: number;
  product_category_id:number;
  product_name:string;
  uom_id:number;
  code:string;
  barcode:string;
  is_inventory_tracking:boolean;
  initial_stock_amount:number;
  is_notifying:boolean = false;
  notification_amount:number;
  purchasing_price:number;
  selling_price:number;
  tax_id:number;
  product_in_quantity:number;

  constructor() {
    this.product_id=0;
    this.company_id=0;
    this.product_category_id=0;
    this.product_name="";
    this.uom_id=0;
    this.code="";
    this.barcode = ""
    this.is_inventory_tracking= false;
    this.initial_stock_amount=0;
    this.is_notifying= false;
    this.notification_amount = 0;
    this.purchasing_price = 0;
    this.selling_price =0.0;
    this.tax_id=0;
    this.product_in_quantity=0.0;
  }
}

