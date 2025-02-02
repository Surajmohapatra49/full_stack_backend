import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { promises } from 'readline';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
   async signUp(@Body() signUpDto: SignUpDto):Promise< { token:string}> {
        return await this.authService.signUp(signUpDto);
    }

   
    @Post('login')
    async login(@Body() loginDto: LoginDto) : Promise< { token:string}> {
        return  await this.authService.login(loginDto);
    }
    

}




