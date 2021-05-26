export class Product {
  product_id!: number;
  product_category_id!:number;
  product_name!:string;
  uom_id!:number;
  code!:string;
  barcode!:string;
  is_inventory_tracking:boolean = false;
  initial_stock_amount!:number;
  is_notifying:boolean = false;
  notification_amount!:number;
  purchasing_price!:number;
  selling_price!:number;
  tax_id!:number;
}
