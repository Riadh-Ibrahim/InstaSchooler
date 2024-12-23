import { IsNotEmpty, IsString, IsArray, ValidateNested, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';
import { Matiere } from '../../teacher/matiere.enum';

export class TeacherAssignmentDto {
  @IsNotEmpty()
  @IsString()
  subject: Matiere;

  @IsNotEmpty()
  @IsMongoId()
  teacher: string;
}

export class CreateClassDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  subjects: Matiere[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeacherAssignmentDto)
  teachers: TeacherAssignmentDto[];

  @IsArray()
  @IsMongoId({ each: true })
  students?: string[];
}
