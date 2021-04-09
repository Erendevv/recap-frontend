import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarimageComponent } from './components/carimage/carimage.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { RentalComponent } from './components/rental/rental.component';
import { HttpClientModule } from '@angular/common/http';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { FilterComponent } from './components/filter/filter.component';
import {ToastrModule} from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { PaymentComponent } from './components/payment/payment.component';
import { AddBrandComponent } from './components/brand/add-brand/add-brand.component';
import { AddColorComponent } from './components/color/add-color/add-color.component';
import { AddCarComponent } from './components/car/add-car/add-car.component';
import { UpdateColorComponent } from './components/color/update-color/update-color.component';
import { DetailColorComponent } from './components/color/detail-color/detail-color.component';
import { UpdateBrandComponent } from './components/brand/update-brand/update-brand.component';
import { DetailBrandComponent } from './components/brand/detail-brand/detail-brand.component';
import { UpdateCarComponent } from './components/car/update-car/update-car.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ProfileComponent } from './components/profile/profile.component';





@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    CarDetailComponent,
    CarimageComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    RentalComponent,
    BrandFilterPipe,
    ColorFilterPipe,
    FilterComponent,
    PaymentComponent,
    AddBrandComponent,
    AddColorComponent,
    AddCarComponent,
    UpdateColorComponent,
    DetailColorComponent,
    UpdateBrandComponent,
    DetailBrandComponent,
    UpdateCarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
 


  
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
      }
    }),
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem("token");
}