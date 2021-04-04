import { Component, OnInit } from '@angular/core';
import { carImage } from 'src/app/models/entities/carImage';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-carimage',
  templateUrl: './carimage.component.html',
  styleUrls: ['./carimage.component.css']
})
export class CarimageComponent implements OnInit {
  carimages:carImage[] =[];
  constructor(private carImagesService:CarimageService) { }

  ngOnInit(): void {
    this.getCarImages();
  }

  getCarImages(){
    this.carImagesService.getCarImages().subscribe(response=>{
      this.carimages = response.data;
    });
  }

}
