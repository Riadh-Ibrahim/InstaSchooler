import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './schema/class.schema';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Teacher, TeacherSchema } from '../teacher/schema/teacher.schema';
import { Student, StudentSchema } from '../student/schema/student.schema';  // Corrected import

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: Teacher.name, schema: TeacherSchema },
      { name: Student.name, schema: StudentSchema },
    ]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
