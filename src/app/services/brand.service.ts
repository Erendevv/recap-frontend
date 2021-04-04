import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/entities/brand';
import { ListResponseModel } from '../models/listResponeModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44303/api/brands/";
  constructor(private httpClient:HttpClient) { }
  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl+ "getall"
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"add",brand);
  }


  getBrandById(brandId:number): Observable<SingleResponseModel<Brand>> {
    return this.httpClient.get<SingleResponseModel<Brand>>(this.apiUrl + "getbyid?brandId=" + brandId)
  }


  update(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>( this.apiUrl + 'update',  brand );
  }

  delete(brand: Brand) {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'delete', brand);  }
}
