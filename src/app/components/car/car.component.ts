import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/entities/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  filterText:"";
  constructor(private carService:CarService,  private activatedRoute:ActivatedRoute,
    ) { }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
    if(params["colorId"] && params["brandId"]){
      this.getCarByFilters(params["brandId"],params["colorId"]);
    }
     else if(params["brandId"]){
       this.getCarsByBrand(params["brandId"])
     }
     else if(params["colorId"]){
       this.getCarsByColor(params["colorId"])
     }
     else{
       this.getCars()
      
     }
   })
  }

  getCars(){
    this.carService.getCars().subscribe(response=>{
      this.cars=response.data;
    })
  }
 
 getCarByFilters(brandId:number, colorId:number){
   this.carService.getCarsByBrandIdandColorId(brandId,colorId).subscribe(response=>{
    this.cars = response.data
   })
 }
  
  getCarsByBrand(brandId:number){
    this.carService.getCarsByBrand(brandId).subscribe(response=>{
      this.cars=response.data;
    })
  }
  getCarsByColor(colorId:number){
    this.carService.getCarsByColor(colorId).subscribe(response=>{
      this.cars=response.data;
    })
  }
}
