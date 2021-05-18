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



@NgModule({
  declarations: [
    CustomersComponent,
    DashboardComponent,
    LoginComponent,
    PhonePipe,
    CustomerCreateComponent
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
    PhonePipe
  ]
})
export class AllModule { }
