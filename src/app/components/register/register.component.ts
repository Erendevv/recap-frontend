import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;   
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      passwordConfirmation:['', Validators.required]
    })
  }
 
  register() {
    let password = this.registerForm.get('password').value
    let confirm = this.registerForm.get('passwordConfirmation').value
    if (password === confirm && this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        if (response.success) {
          this.toastrService.success(response.message,'Register Information')
          localStorage.setItem('token', response.data.token)
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {window.location.reload();})
          }, 1000);
     
        }
      },responseError=>{
        this.toastrService.error(responseError.error.message, 'Register Information')
      })
    }else{
      this.toastrService.error('Password Confirmation Failed','Password Match')
    }
  }
}
