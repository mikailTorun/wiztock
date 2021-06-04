import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomersComponent} from "./customers/customers.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PhonePipe} from "../helpers/phone.pipe";
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import {RouterModule} from "@angular/router";
import {CustomerPreviewComponent} from "./customers/customer-preview/customer-preview.component";
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

@NgModule({
  declarations: [
    CustomersComponent,
    DashboardComponent,
    LoginComponent,
    PhonePipe,
    CustomerCreateComponent,
    CustomerPreviewComponent,
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
    CustomerPreviewComponent,
    DatepickerDirective,
    DatatableDirective
  ]
})
export class AllModule { }
