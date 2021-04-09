import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/entities/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-update-color',
  templateUrl: './update-color.component.html',
  styleUrls: ['./update-color.component.css']
})
export class UpdateColorComponent implements OnInit {

  color: Color;
  colorUpdateForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.getColorById(params['colorId']);
      }
    });
  }

  createColorUpdateForm(color: Color) {
    this.colorUpdateForm = this.formBuilder.group({
      id: [color.id, Validators.required],
      colorName: [color.colorName, Validators.required],
    });
  }

  getColorById(id: number) {
    this.colorService.getColorById(id).subscribe((response) => {
      this.color= response.data;
      this.createColorUpdateForm(this.color);
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      console.log(colorModel);
      this.colorService.update(colorModel).subscribe(
        (response) => {
          setTimeout(() => {
            this.router.navigate(['/colors']);
          }, 1000);
          this.toastrService.success(response.message, 'Successful');
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
      this.toastrService.error('All fields are required', 'Warning');
    }
  }

  delete() {
    console.log(this.color);
    this.colorService.delete(this.color).subscribe(
      (response) => {
        setTimeout(() => {
          this.router.navigate(['/colors']);
        }, 1000);
        this.toastrService.info(response.message, 'Successful');
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
  }
}
