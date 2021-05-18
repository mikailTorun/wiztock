export class User {
  employee_id!:number;
  company_id!: number;
  name_surname!: string;
  is_main_user!: number;
  email!: string;
  password!: string;
  authData?: string;
}
