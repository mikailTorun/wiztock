import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./modules/login/login.component";
import {DefaultComponent} from "./layouts/default/default.component";
import {CustomersComponent} from "./modules/customers/customers.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {AuthGuard} from "./helpers/auth.guard";
import {CustomerCreateComponent} from "./modules/customers/customer-create/customer-create.component";

const routes: Routes = [
  {
    path: '', component: DefaultComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'customers', component: CustomersComponent},
      {path: 'customers/create', component: CustomerCreateComponent},
      {path: 'customers/edit/:id', component: CustomerCreateComponent}
    ], canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: "**", redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
