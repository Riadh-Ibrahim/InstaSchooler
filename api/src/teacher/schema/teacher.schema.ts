import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/base.schema';
import { Matiere } from '../matiere.enum';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

export type TeacherDocument = HydratedDocument<Teacher>;

@Schema({ timestamps: true, versionKey: false })
export class Teacher extends BaseSchema {
  @Prop({ type: String, required: true, enum: Object.values(Matiere), message: 'Matiere is required' })
  matiere: Matiere; // Changed to camelCase

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: String, required: true, match: /^([2459])[0-9]{7}$/, unique:true })
  phone: string; // Changed to camelCase

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }], default: [] })
  classes: Types.ObjectId[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
