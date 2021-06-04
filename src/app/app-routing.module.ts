import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./modules/login/login.component";
import {DefaultComponent} from "./layouts/default/default.component";
import {CustomersComponent} from "./modules/customers/customers.component";
import {DashboardComponent} from "./modules/dashboard/dashboard.component";
import {AuthGuard} from "./helpers/auth.guard";
import {CustomerCreateComponent} from "./modules/customers/customer-create/customer-create.component";
import {CustomerPreviewComponent} from "./modules/customers/customer-preview/customer-preview.component";
import {UnitsComponent} from "./modules/units/units.component";
import {TaxesComponent} from "./modules/taxes/taxes.component";
import {WarehousesComponent} from "./modules/warehouses/warehouses.component";
import {ProductsComponent} from "./modules/products/products.component";
import {ShipmentsComponent} from "./modules/shipments/shipments.component";
import {CategoriesComponent} from "./modules/categories/categories.component";
import {RegisterComponent} from "./modules/register/register.component";
import {SuppliersComponent} from "./modules/suppliers/suppliers.component";

const routes: Routes = [
  {
    path: '', component: DefaultComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'customers', component: CustomersComponent},
      {path: 'customers/create', component: CustomerCreateComponent},
      {path: 'customers/edit/:id', component: CustomerCreateComponent},
      {path: 'customers/:id', component: CustomerPreviewComponent},
      {path: 'units', component: UnitsComponent},
      {path: 'taxes', component: TaxesComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'warehouses', component: WarehousesComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shipments', component:ShipmentsComponent},
      {path: 'suppliers', component:SuppliersComponent},

    ], canActivate: [AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: "**", redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
