import { Component, OnInit } from '@angular/core';
import {Company} from "../../models/company";
import {Employee} from "../../models/employee";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {Toasts} from "../../helpers/toasts";



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  company: Company;
  employee: Employee;
  constructor(
    private router: Router,
    public authService: AuthenticationService
  ) {
    this.company = new Company();
    this.employee = new Employee();
  }

  ngOnInit(): void {

  }

  registerButtonHandler() {
    this.company.employees.push(this.employee);
    this.register();
  }

  register(){
    this.authService.register(this.company).subscribe( (response:any) => {
      if(response && response["success"]) {
        this.router.navigate(['/login']);
      }
    });
  }
}
