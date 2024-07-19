import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type UserDocument = User & Document;
@Schema({
    timestamps:true,
})

export class User extends Document {
  static password(password: string) {
    throw new Error('Method not implemented.');
  }
    
    @Prop({ unique: [true, 'duplicate first name entered'] })
    fname: string;

    @Prop({ unique: [true, 'duplicate last name entered'] } )
    lname: string;

    @Prop({ unique: [true, 'duplicate email entered'] })
    email: string;

    @Prop( { unique: [true, 'duplicate password entered'] })
    password: string;

    @Prop( { unique: [true, 'duplicate mobile entered'] })
    mobile: number;
  static _id: any;
}
export const userSchema =  SchemaFactory.createForClass(User);