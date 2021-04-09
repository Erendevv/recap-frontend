import { TokenModel } from "./tokenModel";

export interface RegisterModel  extends TokenModel{
    id:number;
    email:string;
    password:string;
    firstName:string;
    lastName:string;
}