import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { Teacher, TeacherSchema } from './schemas/teacher.schema'; 

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Teacher', schema: TeacherSchema },]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService]
})
export class TeacherModule {}