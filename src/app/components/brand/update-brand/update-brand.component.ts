import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/entities/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css']
})
export class UpdateBrandComponent implements OnInit {

  brand: Brand;
  brandUpdateForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandById(params['brandId']);
      }
    });
  }

  createBrandUpdateForm(brand: Brand) {
    this.brandUpdateForm = this.formBuilder.group({
      id: [brand.id, Validators.required],
      brandName: [brand.brandName, Validators.required],
    });
  }

  getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
      this.createBrandUpdateForm(this.brand);
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      console.log(brandModel);
      this.brandService.update(brandModel).subscribe(
        (response) => {
          setTimeout(() => {
            this.router.navigate(['/detail-brand']);
          }, 1000);
          this.toastrService.success(response.message, 'Successful');
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'verification error'
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
    console.log(this.brand);
    this.brandService.delete(this.brand).subscribe(
      (response) => {
        setTimeout(() => {
          this.router.navigate(['/detail-brand']);
        }, 1000);
        this.toastrService.info(response.message, 'Successful');
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(
              responseError.error.Errors[i].ErrorMessage,
              'verification error'
            );
          }
        }
      }
    );
  }
}
