import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('admin-dashboard/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // Créer un étudiant
  @Post('/add-student')
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  // Récupérer tous les étudiants
  @Get('/all-students')
  getAllStudents() {
    return this.studentService.getAllStudents();
  }

  // Récupérer un étudiant par son ID
  @Get(':id')
  getStudentById(@Param('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  // Mettre à jour un étudiant
  @Patch(':id')
  updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  // Supprimer un étudiant
  @Delete(':id')
  deleteStudent(@Param('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
