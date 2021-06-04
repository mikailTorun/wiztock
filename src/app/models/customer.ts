export class Customer {
  customer_id: number;
  email: string;
  phone: string;
  address: string;
  town: string;
  city: string;
  postal_code: string;
  is_corporate: number;
  is_customer: number;
  is_supplier: number;
  title: string;
  short_name: string;
  tax_office: string;
  tax_number: string;
  name_surname: string;
  ssn: string;

  constructor() {
    this.customer_id = 0;
    this.email = "";
    this.phone = "";
    this.address="";
    this.town="";
    this.city="";
    this.postal_code="";
    this.is_corporate=0;
    this.is_customer=0;
    this.is_supplier=0;
    this.title = "";
    this.short_name = "";
    this.tax_office = "";
    this.tax_number = "";
    this.name_surname = "";
    this.ssn = "";
  }
}
