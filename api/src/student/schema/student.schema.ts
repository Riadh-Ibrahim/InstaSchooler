import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/base.schema';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Student extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class' })
  classe: Types.ObjectId;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: String, required: true })
  parentEmail: string;

  @Prop({ type: String, required: true })
  parentPhone: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
