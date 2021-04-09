import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/entities/car';
import { CreditCard } from 'src/app/models/entities/creditCard';
import { Customer } from 'src/app/models/entities/customer';
import { Rental } from 'src/app/models/entities/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  nameOnTheCard:string;
  cardNumber:string;
  expirationDate:string;
  cardCvv:string;
  moneyInTheCard:number;
  isChecked:boolean;
  savedName:string;
  savedNumber:string;
  savedDate:string;
  savedCvv:string;
  savedCard:CreditCard

  customer:Customer;
  rental :Rental;
  cars:Car;
  paymentAmount : number = 0;
  creditCard: CreditCard;
  cardExist:boolean =false;
  getCustomerId:number;
  @Input() expirationDateInput: string;


  constructor(
    private activatedRoute:ActivatedRoute,
    private customerService:CustomerService,
    private carService:CarService,
    private router :Router,
    private toastrService:ToastrService,
    private paymentService:PaymentService,
    private rentalService:RentalService,
    private LocalStorageService:LocalStorageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['rental']){
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId =JSON.parse(params['rental']).customerId;
        this.getCustomerDetailById(this.getCustomerId);
        this.getCarDetails();
        this.getCardFromLocaleStorage();
      }
    });
  }

  getCustomerDetailById(customerId:number){
    this.customerService.getCustomerById(customerId).subscribe((response) => {
      this.customer = response.data[0];
    })
  }

  getCarDetails(){
    this.carService.GetCarDetailsById(this.rental.carId).subscribe(response => {
      this.cars = response.data[0];
      this.calculatePayment();
    })
  }

  calculatePayment(){
    if(this.rental.returnDate != null){
      var returnDate = new Date(this.rental.returnDate.toString());
      var rentDate = new Date(this.rental.rentDate.toString());
      var difference = returnDate.getTime() - rentDate.getTime();

      var rentDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.paymentAmount = rentDays * this.cars.dailyPrice;
      if(this.paymentAmount <= 0){
        this.router.navigate(['/cars']);
        this.toastrService.error('You are redirected to the homepage','Error');
      }
    }
  }


  async rentACar(){
    let verifyCreditCard:CreditCard ={
      nameOnTheCard: this.nameOnTheCard,
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cardCvv: this.cardCvv,
      isChecked:this.isChecked
    }
console.log(this.isChecked)
    this.cardExist = await this.isCardExist(verifyCreditCard);
    if(this.cardExist){
      this.creditCard = await this.getCreditCardByCardNumber(this.cardNumber);
      console.log(this.creditCard);
      if(this.creditCard.moneyInTheCard as number >= this.paymentAmount){
        this.creditCard.moneyInTheCard = this.creditCard.moneyInTheCard as number - this.paymentAmount;
        this.updateCard(verifyCreditCard);
        if(this.isChecked==true){
          this.LocalStorageService.add("nameOnTheCard",verifyCreditCard.nameOnTheCard);
          this.LocalStorageService.add("cardCvv",verifyCreditCard.cardCvv);
          this.LocalStorageService.add("cardNumber",verifyCreditCard.cardNumber);
          this.LocalStorageService.add("expirationDate",verifyCreditCard.expirationDate);
          this.toastrService.success("Your card has been saved");
        }
        this.rentalService.addRental(this.rental);
        this.toastrService.success('You rented the car','Successful');
      }else{
        this.toastrService.error('There is not enough price on your card','Hata');
      }
    }else{
      this.toastrService.error('Your bank has not confirmed your information','Hata');
    }
  }

  async isCardExist(creditCard:CreditCard){
    return (await this.paymentService.verifyCard(creditCard).toPromise()).success;
  }

  async getCreditCardByCardNumber(cardNumber:string){
    return (await this.paymentService.getByCardNumber(cardNumber).toPromise()).data[0];
  }

  updateCard(creditCard:CreditCard){
    this.paymentService.updateCard(creditCard);
  }
  getCardFromLocaleStorage(){
 let nameOnTheCard = this.LocalStorageService.get("nameOnTheCard");
 let cardCvv = this.LocalStorageService.get("cardCvv");
 let cardNumber = this.LocalStorageService.get("cardNumber");
 let expirationDate = this.LocalStorageService.get("expirationDate");
    this.savedCard={
  cardCvv:cardCvv,
  cardNumber:cardNumber,
  expirationDate:expirationDate,
  nameOnTheCard:nameOnTheCard,
  isChecked:true
    }

  }
  setCurrentCard(){
    let nameOnTheCard = this.LocalStorageService.get("nameOnTheCard");
    let cardCvv = this.LocalStorageService.get("cardCvv");
    let cardNumber = this.LocalStorageService.get("cardNumber");
    let expirationDate = this.LocalStorageService.get("expirationDate");
    this.cardCvv=cardCvv;
    this.nameOnTheCard=nameOnTheCard;
    this.cardNumber=cardNumber;
    this.expirationDate=expirationDate;
    this.toastrService.success("Successful")
  

  }
}
