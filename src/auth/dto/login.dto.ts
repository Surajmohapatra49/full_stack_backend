import { IsEmail, IsNotEmpty, IsNumberString, IsString, MinLength, minLength } from "class-validator";



export class LoginDto {

    @IsEmail({},{message:'please enter correct email'})
    @IsNotEmpty()
    readonly email:string;

    @IsNumberString()
    @IsNotEmpty()
    @MinLength(4)
   readonly password:string;
}