import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from './schema/user.schema'; 

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>, 
    private readonly jwtService: JwtService,
  ) {}


  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    const { fname, lname, email, password, mobile } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      fname,
      lname,
      email,
      password, 
      mobile
    });

    return { message: 'User successfully registered' };
  }

  async login(loginDto: LoginDto): Promise<{ message: string }> {
    const { email, password } = loginDto;

    console.log('Login DTO:', loginDto); 
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('User found:', user); 

    if (typeof password !== 'string' || typeof user.password !== 'string') {
      throw new Error('Password or user.password is not a string');
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { message: 'Login successful' };
}

}
