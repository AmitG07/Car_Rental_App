import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FilterPipe } from './filter.pipe';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CarsComponent } from './Admin/cars/cars.component';
import { EditCarComponent } from './Admin/edit-car/edit-car.component';
import { RegisterComponent } from './Admin/register/register.component';
import { AdminCarComponent } from './Admin/admin-car/admin-car.component';
import { AgreementsComponent } from './Admin/agreements/agreements.component';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';

import { CustomerCarComponent } from './Customer/customer-car/customer-car.component';
import { CustomerRentalComponent } from './Customer/customer-rental/customer-rental.component';
import { CustomerViewComponent } from './Customer/customer-view/customer-view.component';
import { CustomerAgreementComponent } from './Customer/customer-agreement/customer-agreement.component';
import { CustomerAgreementEditComponent } from './Customer/customer-agreement-edit/customer-agreement-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    HeaderComponent,
    LoginComponent,
    HomepageComponent,
    FilterPipe,
    EditCarComponent,
    RegisterComponent,
    CustomerCarComponent,
    CustomerRentalComponent,
    AdminCarComponent,
    CustomerViewComponent,
    AgreementsComponent,
    CustomerAgreementComponent,
    CustomerAgreementEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
