import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AddBrandComponent } from './components/brand/add-brand/add-brand.component';
import { AddColorComponent } from './components/color/add-color/add-color.component';
import { AddCarComponent } from './components/car/add-car/add-car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { UpdateColorComponent } from './components/color/update-color/update-color.component';
import { DetailColorComponent } from './components/color/detail-color/detail-color.component';
import { UpdateBrandComponent } from './components/brand/update-brand/update-brand.component';
import { DetailBrandComponent } from './components/brand/detail-brand/detail-brand.component';
import { UpdateCarComponent } from './components/car/update-car/update-car.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';






const routes: Routes =[
  {path:"",pathMatch:"full", component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/brands/:brandId", component:CarComponent},
  {path:"cars/colors/:colorId", component:CarComponent},
  {path:"cars/filter/:brandId/:colorId", component:CarComponent},
  {path:"cars/car-detail/:id", component:CarDetailComponent},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"cars/rental/:carId",component:RentalComponent},
  {path:"payment/:rental",component:PaymentComponent},
  {path:"brand/add",component:AddBrandComponent,canActivate:[LoginGuard]},
  {path:"color/add",component:AddColorComponent,canActivate:[LoginGuard]},
  {path:"car/add",component:AddCarComponent,canActivate:[LoginGuard]},
  {path:"brands",component:BrandComponent},
  {path:"colors",component:ColorComponent},
  {path:"color/update/:colorId",component:UpdateColorComponent,canActivate:[LoginGuard]},
  {path:"detail-color",component:DetailColorComponent,canActivate:[LoginGuard]},
  {path:"brand/update/:brandId",component:UpdateBrandComponent,canActivate:[LoginGuard]},
  {path:"detail-brand",component:DetailBrandComponent,canActivate:[LoginGuard]},
  {path:"car/update/:carId",component:UpdateCarComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profile",component:ProfileComponent,canActivate:[LoginGuard]},

  




  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
