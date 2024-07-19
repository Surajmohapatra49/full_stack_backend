import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyDto } from './dto/property.dto';
import { Property } from './schema/property.schema';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }
  
  @Get('search')
  async searchProperties(@Query() payload: any): Promise<any> {
    try {
      const { propertyName} = payload
      console.log(payload)
      if (!propertyName) {
        throw new HttpException('Property name is required for search', HttpStatus.BAD_REQUEST);
      }
      return await this.propertyService.searchProperties(propertyName);
    } catch (error) {
      console.error('Error in controller while searching properties:', error);
      throw new HttpException('Could not search properties', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  
  @Post()
  async addProperty(@Body() PropertyDto: PropertyDto): Promise<Property> {
    try {
      return await this.propertyService.addProperty(PropertyDto);
    } catch (error) {
      console.error('Error in controller while adding property:', error);
      throw new HttpException('Could not add property', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
    

  @Get()
  async getAllProperties(): Promise<Property[]> {
    try {
      return await this.propertyService.getAllProperties();
    } catch (error) {
      console.error('Error in controller while retrieving properties:', error);
      throw new HttpException('Could not retrieve properties', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  @Get(':id')
  async getPropertyById(@Param('id') id: string): Promise<Property> {
    try {
      const property = await this.propertyService.getPropertyById(id);
      if (!property) {
        throw new NotFoundException('Property not found');
      }
      return property;
    } catch (error) {

      console.error('Error in controller while retrieving property by ID:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('Could not retrieve property', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  @Delete(':id')
  async deleteProperty(@Param('id') id: string): Promise<void> {
    try {
      await this.propertyService.deleteProperty(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new HttpException('Could not delete property', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  @Put(':id')
  async updateProperty(@Param('id') id: string, @Body() PropertyDto: PropertyDto): Promise<Property> {
    try {
      const existingProperty = await this.propertyService.updateProperty(id, PropertyDto);
      if (!existingProperty) {
        throw new NotFoundException('Property not found');
      }
      return existingProperty;
    } catch (error) {

      console.error('Error in controller while updating property:', error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException('Could not update property', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



}
