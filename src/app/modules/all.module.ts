import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomersComponent} from "./customers/customers.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    RouterModule
  ],
  exports: [
    CustomersComponent,
    DashboardComponent,
    LoginComponent,
    PhonePipe,
    CustomerPreviewComponent,
  ]
})
export class AllModule { }
