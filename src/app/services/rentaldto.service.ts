import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailDto } from '../models/dtos/rentalDetailDto';
import { ListResponseModel } from '../models/listResponeModel';


@Injectable({
  providedIn: 'root'
})
export class RentaldtoService {
  apiURL = 'https://localhost:44303/api/';

  constructor(private httpClient: HttpClient) { }
  
  getRentals():Observable<ListResponseModel<RentalDetailDto>> {
    let newPath = this.apiURL + "rentals/getrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDetailDto>>(newPath);
  }
}
