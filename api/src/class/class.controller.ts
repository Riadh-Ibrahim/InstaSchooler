import {Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
  
  @Controller('admin-dashboard/classes')
  export class ClassController {
    constructor(private readonly classService: ClassService) {}
  
    // Create a new class
    @Post('/add-class')
    async create(@Body() createClassDto: CreateClassDto) {
      try {
        return await this.classService.create(createClassDto);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    // Get all classes
    @Get('all-classes')
    async findAll() {
      try {
        return await this.classService.findAll();
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    // Get a specific class by ID
    @Get(':id')
    async findOne(@Param('id') id: string) {
      try {
        return await this.classService.findOne(id);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  
    // Update a specific class by ID
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
      try {
        return await this.classService.update(id, updateClassDto);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
    }
  
    // Delete a specific class by ID
    @Delete(':id')
    async delete(@Param('id') id: string) {
      try {
        await this.classService.delete(id);
        return { message: 'Class deleted successfully' };
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }
  