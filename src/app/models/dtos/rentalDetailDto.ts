export interface RentalDetailDto{

    id?:number,
    carId:number,
    brandName:string,
    colorName:string,
    firstName?:string;
    lastName?:string,
    companyName?:string,
    modelYear:number,
    dailyPrice:number,
    description:string,
    rentDate:Date,
    returnDate:Date,
    customerId:number,

}