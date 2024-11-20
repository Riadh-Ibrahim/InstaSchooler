import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('admin-dashboard/teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  // Créer un prof
  @Post('/add-teacher')
  createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  // Récupérer tous les profs
  @Get('/all-teachers')
  getAllTeacher() {
    return this.teacherService.getAllTeachers();
  }

  // Récupérer un prof par son ID
  @Get(':id')
  getTeacherById(@Param('id') id: string) {
    return this.teacherService.getTeacherById(id);
  }

  // Mettre à jour un prof
  @Patch(':id')
  updateTeacher(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.updateTeacher(id, updateTeacherDto);
  }

  // Supprimer un prof
  @Delete(':id')
  deleteTeacher(@Param('id') id: string) {
    return this.teacherService.deleteTeacher(id);
  }
}
