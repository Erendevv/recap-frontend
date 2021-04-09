import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  apiUrl = "https://localhost:44303/api/users/";

  constructor(private httpClient:HttpClient) { }

  getUserById(userId:number):Observable<SingleResponseModel<RegisterModel>>{
    let newPath= this.apiUrl+"getbyId?userId="+userId
    return this.httpClient.get<SingleResponseModel<RegisterModel>>(newPath)
  }


  update(user:RegisterModel,userId:number):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"update?userId="+userId,user);
  }
}
