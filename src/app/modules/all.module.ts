import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomersComponent} from "./customers/customers.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PhonePipe} from "../helpers/phone.pipe";
import {RouterModule} from "@angular/router";
import { SuppliersComponent } from './suppliers/suppliers.component';
import { ProductsComponent } from './products/products.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { UnitsComponent } from './units/units.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { TaxesComponent } from './taxes/taxes.component';
import { CategoriesComponent } from './categories/categories.component';
import {DatepickerDirective} from "../directives/datepicker.directive";
import {DatatableDirective} from "../directives/datatable.directive";
import { RegisterComponent } from './register/register.component';
import {CompanyComponent} from "./company/company.component";
import {EmployeesComponent} from "./employees/employees.component";

@NgModule({
  declarations: [
    CustomersComponent,
    DashboardComponent,
    LoginComponent,
    PhonePipe,
    SuppliersComponent,
    ProductsComponent,
    WarehousesComponent,
    UnitsComponent,
    ShipmentsComponent,
    TaxesComponent,
    CategoriesComponent,
    DatepickerDirective,
    DatatableDirective,
    RegisterComponent,
    CompanyComponent,
    EmployeesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CustomersComponent,
    DashboardComponent,
    LoginComponent,
    PhonePipe,
    DatepickerDirective,
    DatatableDirective
  ]
})
export class AllModule { }
