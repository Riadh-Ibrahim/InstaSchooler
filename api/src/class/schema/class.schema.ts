import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Matiere } from '../../teacher/matiere.enum';  // Import the Matiere enum

export type ClassDocument = Class & Document;

@Schema()
export class Class {
  @Prop({ required: true })
  name: string;

  // Use the Matiere enum to restrict subjects to valid values
  @Prop({ type: [String], enum: Object.values(Matiere), required: true })
  subjects: string[];

  // Define the structure of teachers with subject specialization
  @Prop({ type: [{ subject: String, teacher: { type: Types.ObjectId, ref: 'Teacher' } }], required: true })
  teachers: { subject: string; teacher: Types.ObjectId }[];

  // Define the structure of students
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Student' }] })
  students: Types.ObjectId[];
}

export const ClassSchema = SchemaFactory.createForClass(Class);
