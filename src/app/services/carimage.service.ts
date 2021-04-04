import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carImage } from '../models/entities/carImage';
import { ListResponseModel } from '../models/listResponeModel';


@Injectable({
  providedIn: 'root'
})
export class CarimageService {
  apiUrl="https://localhost:44303/api/";

  constructor(private httpClient:HttpClient) { }

  getCarImages():Observable<ListResponseModel<carImage>>{
    let newPath = this.apiUrl + "carimages/getall";
    return this.httpClient.get<ListResponseModel<carImage>>(newPath);
  }

 
  getCarImagesByCarId(carId:number):Observable<ListResponseModel<carImage>>{
    let newPath = this.apiUrl + "carimages/getcarimagesbycarid?carId=" + carId;
    return this.httpClient.get<ListResponseModel<carImage>>(newPath);
  }
}
