import {Employee} from "./employee";

export class Company {
  company_id: number;
  title: string;
  short_name: string;
  phone: string;
  email: string;
  address: string;
  postal_code: string;
  tax_office: string;
  tax_number: string;
  employees: Array<Employee>;

  constructor() {
    this.company_id = 0
    this.title = "";
    this.short_name = "";
    this.phone = "";
    this.email = "";
    this.address = "";
    this.postal_code = "";
    this.tax_office = "";
    this.tax_number = "";
    this.employees = new Array<Employee>();
  }
}
