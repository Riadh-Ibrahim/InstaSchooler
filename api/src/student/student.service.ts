import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { Student } from './schemas/student.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student')
    private readonly studentModel: Model<Student>,
  ) {}

  // Create a student and send an email with credentials
  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    // Automatically generate the password as 'firstname@LASTNAME'
    const generatedPassword = `${createStudentDto.firstname.toLowerCase()}@${createStudentDto.lastName.toUpperCase()}`;

    // Hash the generated password
    const hashedPassword = await this.hashPassword(generatedPassword);

    const student = new this.studentModel({
      ...createStudentDto,
      password: hashedPassword,
    });

    const savedStudent = await student.save();

    // Optionally, send a welcome email with the generated password
    // await this.sendWelcomeEmail(
    //   createStudentDto.email,
    //   createStudentDto.email,
    //   generatedPassword,
    // );

    return savedStudent;
  }

  // Helper method to send the email
  // private async sendWelcomeEmail(
  //   recipient: string,
  //   email: string,
  //   password: string,
  // ): Promise<void> {
  //   const transporter = nodemailer.createTransport({
  //     service: 'Gmail',
  //     auth: {
  //       user: 'instaschooler1@gmail.com',
  //       pass: 'InstaSchooler@2024',
  //     },
  //   });

  //   const mailOptions = {
  //     from: 'instaschooler1@gmail.com',
  //     to: recipient,
  //     subject: 'Welcome to Our Platform',
  //     text: `Welcome to our platform!\n\nYour credentials are as follows:\nEmail: ${email}\nPassword: ${password}\n\nPlease keep your credentials secure.`,
  //   };

  //   try {
  //     await transporter.sendMail(mailOptions);
  //     console.log('Email sent successfully!');
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     throw new Error('Failed to send welcome email.');
  //   }
  // }

  // Hash password using bcrypt
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  // Update a student
  async updateStudent(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    if (updateStudentDto.password) {
      updateStudentDto.password = await this.hashPassword(updateStudentDto.password);
    }

    const student = await this.studentModel.findByIdAndUpdate(id, updateStudentDto, {
      new: true,
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }

    return student;
  }

  // Delete a student
  async deleteStudent(id: string): Promise<void> {
    const result = await this.studentModel.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }
  }

  // Get all students
  async getAllStudents(): Promise<Student[]> {
    return await this.studentModel.find().exec();
  }

  // Get a student by ID
  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found.`);
    }
    return student;
  }
}