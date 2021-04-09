import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterModel } from 'src/app/models/registerModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : RegisterModel;

  userForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private userService:UserService,
    private toastrService:ToastrService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.createUserForm();
    this.getUserById();
 
  }

  getUserById(){
    let userId = this.authService.userId
    this.userService.getUserById(userId).subscribe(response=>{
      this.user = response.data
      this.userForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email
      })
    });
  }

  createUserForm(){
    this.userForm = this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
    })
  }

  update() {
    if (this.userForm.valid) {
      let userModel = Object.assign({}, this.userForm.value);
      this.userService.update(userModel,this.authService.userId).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Successful');
          this.router.navigate(['/cars']);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Verification error'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Your form is incomplete', 'Warning');
    }
  }
}
