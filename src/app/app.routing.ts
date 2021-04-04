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
  {path:"brand/add",component:AddBrandComponent},
  {path:"color/add",component:AddColorComponent},
  {path:"car/add",component:AddCarComponent},
  {path:"brands",component:BrandComponent},
  {path:"colors",component:ColorComponent},
  {path:"color/update/:colorId",component:UpdateColorComponent},
  {path:"detail-color",component:DetailColorComponent},
  {path:"brand/update/:brandId",component:UpdateBrandComponent},
  {path:"detail-brand",component:DetailBrandComponent},
  {path:"car/update/:carId",component:UpdateCarComponent},

  




  
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
