  
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { carImage } from '../models/entities/carImage';
import { ListResponseModel } from '../models/listResponeModel';


@Injectable({
  providedIn: 'root'
})
export class CarImagesByIdService {

  apiUrl="https://localhost:44303/api/"
  constructor(private httpClient:HttpClient) { }

  getCarImagesById(id:number):Observable<ListResponseModel<carImage>>{
    let newPath=this.apiUrl+"carImages/getImagesByCarId?id="+id
    return this.httpClient.get<ListResponseModel<carImage>>(newPath)
  }
}