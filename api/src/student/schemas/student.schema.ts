import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/base.schema';
import { Niveau } from '../niveau.enum';
import { Section } from '../section.enum';

@Schema({ timestamps: true, versionKey: false })
export class Student extends BaseSchema {
  @Prop({ type: String, required: true, enum: Object.values(Niveau) }) 
  niveau: Niveau;

  @Prop({ type: Number, required: true }) 
  classe : number;

  @Prop({ type: Number, required: true })
  groupe: number;

  @Prop({ type: String, required: false, enum: Object.values(Section) })
  section?: Section;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: String, required: true })
  parentEmail: string;

  @Prop({ type: String, required: true })
  parentPhone: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
