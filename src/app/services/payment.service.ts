import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/entities/creditCard';
import { ListResponseModel } from '../models/listResponeModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiUrl = "https://localhost:44303/api/";

  constructor(private httpClient:HttpClient) { }

  verifyCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath = this.apiUrl+"payments/verifycard";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  getByCardNumber(cardNumber:string):Observable<ListResponseModel<CreditCard>>{
    let newPath = this.apiUrl+"payments/getbycardnumber?cardNumber="+cardNumber;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  updateCard(creditCard:CreditCard){
    let newPath = this.apiUrl+"payments/update";
    this.httpClient.put(newPath,creditCard);
  }
}
