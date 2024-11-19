import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common/base.schema';
import { Matiere } from '../matiere.enum';

@Schema({ timestamps: true, versionKey: false })
export class Teacher extends BaseSchema {
  @Prop({ type: String, required: true, enum: Object.values(Matiere) })
  Matiere?: Matiere;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: String, required: true })
  Phone: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
