import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenDetail, TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenDetail = new TokenDetail()
  name: string = "";
  roles: any[] = [];
  token: any;
  isLoggedIn: boolean = false;
  userId: number;

  apiUrl="https://localhost:44303/api/auth/";
  constructor(private httpClient:HttpClient,
    private localStorageService:LocalStorageService,
    private jwtHelper:JwtHelperService,
    private toastrService:ToastrService,
    private router:Router) { }

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
    
  }
  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<RegisterModel>>(this.apiUrl + 'register', registerModel)
  }

  getUserId():number{
    return this.userId;
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false
    }
  }
  logout(){
    this.localStorageService.clean();
    this.onRefresh();
    this.router.navigateByUrl('/cars');
    this.toastrService.info("Logged Out");
    this.tokenDetail = new TokenDetail()
  }
  async onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }
  userDetailFromToken() {
    this.token = this.localStorageService.get("token");
    let decodedToken = this.jwtHelper.decodeToken(this.token);
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.name = name.split(' ')[0];
    this.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }
}
