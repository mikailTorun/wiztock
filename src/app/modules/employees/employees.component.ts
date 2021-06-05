import { Component, OnInit } from '@angular/core';
import {Employee} from "../../models/employee";
import {EmployeesService} from "../../services/employees.service";
import {Toasts} from "../../helpers/toasts";

declare var $: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employee!: Employee;
  constructor(
    public employeeService: EmployeesService,
  ) { }

  ngOnInit(): void {
    this.employee = new Employee();
    this.employeeService.getAllEmployee();
  }

  newEmployeeButtonHandler() {
    $('#employeeForm').modal('show');
  }

  closeEmployeeButtonHandler() {
    $('#employeeForm').modal('hide');
  }

  saveButtonHandler() {
    if (this.employee.employee_id) {
      this.updateEmployee();
    } else {
      this.saveEmployee();
    }
    $('#employeeForm').modal('hide');

  }

  saveEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("A new employee is added");
        this.employeeService.getAllEmployee();
      }
    });
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employee).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.successToast("The employee is updated.");
        this.employeeService.getAllEmployee();
      }
    });
  }

  editEmployeeButtonHandler(employee: Employee) {
    this.employee = employee;
    $('#employeeForm').modal('show');
  }

  deleteEmployeeButtonHandler(employee: Employee) {
    return this.employeeService.deleteEmployee(employee.employee_id).subscribe((res: any) => {
      if (res["success"]) {
        Toasts.dangerToast( "The category " + employee.name_surname + " was deleted" );
        this.employeeService.getAllEmployee();
      }
    });
  }
}
