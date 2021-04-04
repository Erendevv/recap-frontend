import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RentalDetailDto } from 'src/app/models/dtos/rentalDetailDto';
import { Car } from 'src/app/models/entities/car';
import { carImage } from 'src/app/models/entities/carImage';
import { CarDetailByIdService } from 'src/app/services/carDetailByIdService';
import { CarImagesByIdService } from 'src/app/services/carImagesByIdService';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {


  rentalControl = false;
  rentalMessage="";
  carDetails:Car;
  carImages:carImage[]=[];
  rentalsByCarId:RentalDetailDto[];
  rentals:RentalDetailDto[];
  
  constructor(
    private carDetailByIdService:CarDetailByIdService,
    private carImagesByIdService:CarImagesByIdService,
    private activatedRoute:ActivatedRoute,
    private rentalService:RentalService
    
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getCarsById(params["id"])
        this.getImagesById(params["id"])
        this.getCarRentalControl(params["id"])
      }
    
  })

}

getCarRentalControl(carId:number) {
  this.rentalService.getRentalById(carId).subscribe((response) => { 
    this.rentalControl=response.success;
    this.rentalMessage=response.message; 
  });
}
  getCarsById(id:number){
    this.carDetailByIdService.getCarDetailById(id).subscribe(response=>{
      this.carDetails=response.data[0];
    })
  }
  getImagesById(id:number){
    this.carImagesByIdService.getCarImagesById(id).subscribe(response=>{
      this.carImages=response.data;
      
    })
  }

 
  check(id:number){
   this.rentals.find(function(element){
     if(element.carId===id && element.returnDate===null){
       return false //arac kiralanamaz
     }
     else{
       return true //kiralanabilir
     }

   })
  }


}
