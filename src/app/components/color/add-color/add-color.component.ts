import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.css']
})
export class AddColorComponent implements OnInit {
  colorAddForm: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
     colorName:["",Validators.required]
    })
  }

  add(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value)
      this.colorService.add(colorModel).subscribe(response=>{
        this.toastrService.success(response.message,"Success")
      },responseError=>{
   if(responseError.error.Errors.length>0){
     for (let i = 0; i < responseError.error.Errors.length; i++) {
      this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Error!")
      console.log(responseError)
    }
   }
      
      });
    }
    else{
      this.toastrService.error("your form is missing","Error!")
    }
  
 
  }
}
