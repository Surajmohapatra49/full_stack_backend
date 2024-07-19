import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";



export class SignUpDto {

    @IsString()
    @IsNotEmpty()
    fname: string;

    @IsString()
    @IsNotEmpty()
    lname: string;

    @IsEmail({}, { message: 'please enter correct email' })
    @IsNotEmpty()
    email:string;

    @IsString()
    @IsNotEmpty()
    password:string;

    @IsNumber()
    @IsNotEmpty()
    mobile:number;
}