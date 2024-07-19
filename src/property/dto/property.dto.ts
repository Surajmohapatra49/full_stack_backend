import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsString, ValidateIf } from "class-validator";


export enum PropertyStatus {
    SELL = 'sell',
    RENT = 'rent',
  }

export class PropertyDto{
  
  @IsString()
  @IsNotEmpty()
  property_name:string;

  @IsString()
  @IsNotEmpty()
  property_address:string;

  @IsString()
  @IsNotEmpty()
  readonly locality: string;

  @IsString()
  @IsNotEmpty()
  readonly state: string;

  @IsString()
  @IsNotEmpty()
  readonly country: string;

  @IsString()
  @IsNotEmpty()
  readonly area: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly pincode: string;

  @IsString()
  @IsNotEmpty()
  property_for:PropertyStatus;

  @IsNumber()
  sale_amount: number;

  @IsNumber()
  rent_amount: number;

  @IsNumberString()
  @IsNotEmpty()
  bhk:string;

  @IsNumberString()
  @IsNotEmpty()
  plot_no:number;

  @IsBoolean()
  @IsNotEmpty()
  furnishing_status:boolean;

    

}