import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarsComponent } from './Admin/cars/cars.component';
import { RegisterComponent } from './Admin/register/register.component';
import { EditCarComponent } from './Admin/edit-car/edit-car.component';
import { AdminCarComponent } from './Admin/admin-car/admin-car.component';
import { AgreementsComponent } from './Admin/agreements/agreements.component';

import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';

import { CustomerCarComponent } from './Customer/customer-car/customer-car.component';
import { CustomerRentalComponent } from './Customer/customer-rental/customer-rental.component';
import { CustomerViewComponent } from './Customer/customer-view/customer-view.component';
import { CustomerAgreementComponent } from './Customer/customer-agreement/customer-agreement.component';
import { CustomerAgreementEditComponent } from './Customer/customer-agreement-edit/customer-agreement-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  
  { path: 'homepage', component: HomepageComponent },
  { path: 'admin/cars', component: CarsComponent },
  { path: 'admin/register', component: RegisterComponent },
  { path: 'admin/edit-car/:id', component: EditCarComponent },
  { path: 'admin/admin-car', component: AdminCarComponent },
  { path: 'admin/agreements', component: AgreementsComponent },

  { path: 'homepage/login', component: LoginComponent },

  { path: 'customer/customer-car', component: CustomerCarComponent },
  { path: 'customer/customer-rental', component: CustomerRentalComponent },
  { path: 'customer/customer-view/:id', component: CustomerViewComponent },
  { path: 'customer/customer-agreement/:id', component: CustomerAgreementComponent },
  { path: 'edit/:id', component: CustomerAgreementEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
