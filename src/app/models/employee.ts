export class Employee {
  employee_id: number;
  company_id: number;
  name_surname: string;
  email: string;
  password: string;
  is_main_user: boolean;
  authData: string;

  constructor() {
    this.employee_id = 0;
    this.company_id = 0;
    this.name_surname = "";
    this.email = "";
    this.password = "";
    this.is_main_user = false;
    this.authData = "";
  }
}
