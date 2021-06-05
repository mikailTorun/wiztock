import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Employee} from "../models/employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  employees!: Employee[];
  constructor(
    private http:HttpClient
  ) { }

  addEmployee(employee:Employee) {
    let formData = new FormData();
    formData.append('employee', JSON.stringify(employee));
    formData.append('func', "addEmployee");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));
  }

  updateEmployee(employee: Employee) {
    let formData = new FormData();
    formData.append('employee', JSON.stringify(employee));
    formData.append('func', "updateEmployee");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map((res: any)=> {
        return res;
      }));

  }

  getAllEmployee() {
    let formData: any = new FormData();
    formData.append("func", "getAllEmployee");
    this.http.post(environment.apiUrl, formData)
      .subscribe((res: any) => {
        this.employees = res["data"] ? res["data"] : [] ;
      });
  }

  getEmployeeById(employee_id: number) {
    let formData: any = new FormData();
    formData.append("product_employee_id", employee_id);
    formData.append("func", "getEmployeeById");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res["data"][0];
      }));
  }

  deleteEmployee(employee_id: number) {
    let formData: any = new FormData();
    formData.append("product_employee_id", employee_id);
    formData.append("func", "deleteEmployee");
    return this.http.post(environment.apiUrl, formData)
      .pipe(map ((res: any) => {
        return res;
      }));
  }
}
