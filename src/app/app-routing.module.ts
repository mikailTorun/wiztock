import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ActionComponent } from "./action/action.component";
import { TestComponent } from "./test/test.component";
import { TableComponent } from "./table/table.component";
import { CustomerComponent } from "./customer/customer.component";

const routes: Routes = [
  {path : "action" , component : ActionComponent },
  {path : "login"  , component : LoginComponent },
  {path : "test"   , component : TestComponent  },
  {path : "table"   , component : TableComponent  },
  {path : "customer"   , component : CustomerComponent  },
  {path : ""       , redirectTo : "login" , pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
