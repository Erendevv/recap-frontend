import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private toastrService: ToastrService
  ) {}

  loginForm: FormGroup; 

  ngOnInit(): void {    
    this.isAuth();
    this.createLoginForm();
    console.log(this.authService.name)
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);

      this.authService.login(loginModel).subscribe(
        (response) => {
          this.toastrService.info(response.message);
          localStorage.setItem('token', response.data.token);
          this.isAuth();
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }

  isAuth(){
    if (this.authService.isAuthenticated()) {
      this.authService.userDetailFromToken();
    }
  }


  logOut() {
    this.authService.logout();
  }  
}
