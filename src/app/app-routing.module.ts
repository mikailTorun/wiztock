import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ActionComponent } from "./action/action.component";
import { TestComponent } from "./test/test.component";
import { TableComponent } from "./table/table.component";
import { CustomerComponent } from "./customer/customer.component";
import {DefaultComponent} from "./layouts/default/default.component";
import {CustomersComponent} from "./modules/customers/customers.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {AuthGuard} from "./helpers/auth.guard";

const routes: Routes = [
  {
    path:'',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'customers',
        component: CustomersComponent
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:"**",
    redirectTo: ''
  }
  /*{path : "action" , component : ActionComponent },
  {path : "login"  , component : LoginComponent },
  {path : "test"   , component : TestComponent  },
  {path : "table"   , component : TableComponent  },
  {path : "customer"   , component : CustomerComponent  },
  {path : ""       , redirectTo : "login" , pathMatch: "full"}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
