import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, ClassDocument } from './schema/class.schema';
import { Teacher, TeacherDocument } from '../teacher/schema/teacher.schema';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Matiere } from 'src/teacher/matiere.enum';
import { Student } from '../student/schema/student.schema'; // Assuming you have a student schema
import { Types } from 'mongoose'; // Import Types for ObjectId

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<ClassDocument>,
    @InjectModel(Teacher.name) private readonly teacherModel: Model<TeacherDocument>,
    @InjectModel(Student.name) private readonly studentModel: Model<Student>  // Inject Student model
  ) {}

  // Create a class
  async create(createClassDto: CreateClassDto): Promise<Class> {
    const { name, teachers, students } = createClassDto;
  
    const teacherAssignments = [];
    const subjectsSet = new Set<string>();
  
    // Create the new class first to get its _id
    const newClass = new this.classModel({
      name,
      teachers,
      students,
    });
  
    // Save the new class temporarily to get its _id
    await newClass.save();
  
    // Assign teachers to subjects and link the class _id to each teacher
    for (const { teacher } of teachers) {
      const teacherData = await this.teacherModel.findById(teacher).exec();
      if (!teacherData) {
        throw new NotFoundException(`Teacher with ID ${teacher} not found.`);
      }
      
      const subject = teacherData.matiere;
      subjectsSet.add(subject);
  
      if (!Matiere[subject]) {
        throw new BadRequestException(`Teacher ${teacherData._id} specialization is invalid.`);
      }
  
      // Add the class _id (not name) to the teacher's classes array
      teacherData.classes.push(newClass._id as Types.ObjectId); // Use ObjectId here
      await teacherData.save(); // Save the updated teacher
    }
  
    const subjects = Array.from(subjectsSet);
  
    // Add the class subjects to the class document
    newClass.subjects = subjects;
  
    // Save the new class with all necessary data
    await newClass.save();
  
    // Automatically assign students to the class
    for (const studentId of students) {
      const student = await this.studentModel.findById(studentId).exec();
      if (!student) {
        throw new NotFoundException(`Student with ID ${studentId} not found.`);
      }
  
      // If the student doesn't already have a class, assign them to this one
      if (!student.classe) {
        student.classe = newClass._id as Types.ObjectId;  // Use ObjectId here
        await student.save();
      }
    }
  
    return newClass;
  }

  // Find all classes
  async findAll(): Promise<Class[]> {
    return this.classModel.find().populate('teachers.teacher').populate('students').exec();
  }

  // Find one class by ID
  async findOne(id: string): Promise<Class> {
    const classData = await this.classModel
      .findById(id)
      .populate('teachers.teacher')
      .populate('students')
      .exec();
    if (!classData) {
      throw new NotFoundException(`Class with ID ${id} not found.`);
    }
    return classData;
  }

  // Update a class
  async update(id: string, updateClassDto: UpdateClassDto): Promise<Class> {
    const updatedClass = await this.classModel
      .findByIdAndUpdate(id, updateClassDto, { new: true })
      .exec();
    if (!updatedClass) {
      throw new NotFoundException(`Class with ID ${id} not found.`);
    }
    return updatedClass;
  }

  // Delete a class
  async delete(id: string): Promise<void> {
    const deletedClass = await this.classModel.findByIdAndDelete(id).exec();
    if (!deletedClass) {
      throw new NotFoundException(`Class with ID ${id} not found.`);
    }
  }
}
