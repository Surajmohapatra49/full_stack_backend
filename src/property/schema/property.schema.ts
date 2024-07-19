import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum PropertyStatus {
  SALE = 'sale',
  RENT = 'rent',
}

@Schema()
export class Property extends Document {

  @Prop({ required: true })
  property_name: string;

  @Prop({ required: true, enum: PropertyStatus })
  property_for: PropertyStatus;

  @Prop({required:true})
  bhk:number;

  @Prop( )
  sell_amount: number;

  @Prop()
  rent_amount:number;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  locality: string;

  @Prop({ required: true })
  area: string;

  @Prop({ required: true })
  city: string;

  @Prop( { required:true })
  plot_no:string;

  @Prop({ required: true })
  pincode: string;

  @Prop({required:true})
  furnished:boolean;

}

export const PropertySchema = SchemaFactory.createForClass(Property);
