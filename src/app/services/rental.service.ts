import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/entities/rental';
import { ListResponseModel } from '../models/listResponeModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl = "https://localhost:44303/api/rentals/";
  constructor(private httpClient:HttpClient) { }
  
  getRentalDetails():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + "getrentaldetails";
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
  


  add(rental:Rental):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"addrental",rental);
  }

  addRental(rental:Rental){
    let newPath = this.apiUrl+"add";
    return this.httpClient.post(newPath,rental).subscribe();
  }
  
  getRentalById(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl+"getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
}
