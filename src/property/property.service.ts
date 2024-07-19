import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyDto } from './dto/property.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from './schema/property.schema';
import { Model } from 'mongoose';

@Injectable()
export class PropertyService {
   
   
    constructor(@InjectModel(Property.name) private propertyModel: Model<Property>) {}

    
    async addProperty(PropertyDto: PropertyDto): Promise<Property> {
      try {
        const newProperty = new this.propertyModel(PropertyDto);
        return await newProperty.save();
      } catch (error) {
        console.error('Error adding property:', error);
        throw new Error('Could not add property');
      }
    }
    


    async getAllProperties(): Promise<Property[]> {
      try {
        return await this.propertyModel.find().exec();
      } catch (error) {
        console.error('Error retrieving properties:', error);
        throw new Error('Could not retrieve properties');
      }
    }
    


    async getPropertyById(id: string): Promise<Property> {
      try {
        const property = await this.propertyModel.findById(id).exec();
        if (!property) {
          throw new NotFoundException('Property not found');
        }
        return property;
      } catch (error) {
        console.error('Error retrieving property by ID:', error);
        throw new Error('Could not retrieve property');
      }
    }
    



    async deleteProperty(id: string): Promise<Property> {
      const deletedProperty = await this.propertyModel.findByIdAndDelete(id).exec();
      if (!deletedProperty) {
        throw new NotFoundException('Property not found');
      }
      return deletedProperty;
    }
    

      

    async updateProperty(id: string, PropertyDto: PropertyDto): Promise<Property> {
      try {
        const existingProperty = await this.propertyModel.findByIdAndUpdate(id, PropertyDto, { new: true }).exec();
        if (!existingProperty) {
          throw new NotFoundException('Property not found');
        }
        return existingProperty;
      } catch (error) {
        console.error('Error updating property:', error);
        throw new Error('Could not update property');
      }
    }

    async searchProperties(propertyName: string): Promise<any> {
      const properties = await this.propertyModel.findOne({ property_name: { $regex: propertyName, $options: 'i' } }).exec();
      if (!properties) {
        throw new NotFoundException('No properties found');
      }
      return properties;
    }
  
    

}
