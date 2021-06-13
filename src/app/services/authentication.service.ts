import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Employee} from "../models/employee";
import {Company} from "../models/company";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private employeeSubject: BehaviorSubject<Employee>;
  public employee: Observable<Employee>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.employeeSubject = new BehaviorSubject<Employee>(JSON.parse(<string>sessionStorage.getItem('employee')));
    this.employee = this.employeeSubject.asObservable();
  }

  public get userValue(): Employee {
    return this.employeeSubject.value;
  }

  register(company: Company) {
    let formData: FormData = new FormData();
    formData.append("company", JSON.stringify(company));
    formData.append("func", "register");
    return this.http.post(`${environment.apiUrl}`, formData).pipe(
      map( response => {
        return response;
      })
    );
  }


  login(email: string, password: string) {
    let formData: any = new FormData();
    formData.append("username", email);
    formData.append("password", password);
    formData.append("func", "loginFunction");
    return  this.http.post<any>(`${environment.apiUrl}`, formData).pipe(
      tap( data => {
        if(data["success"]) {
            let employee: Employee;
            employee = data["data"]["admin"][0];
            employee.authData = window.btoa(email + ':' + password);
            sessionStorage.setItem('employee', JSON.stringify(employee));
            this.employeeSubject.next(employee);
        } else {
          console.warn("Login işlemi başarısız");
        }
      }),
    );

  }

  logout() {
    sessionStorage.removeItem('employee');
    // @ts-ignore
    this.employeeSubject.next(null);
    this.router.navigate(['/login']);

  }
}
