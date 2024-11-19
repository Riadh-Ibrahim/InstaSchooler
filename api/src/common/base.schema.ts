import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true, versionKey: false })
export class BaseSchema extends Document {
  @Prop({ type: String, unique: true, required: true, index: true, default: uuidv4 })
  id: string;

  @Prop({ type: String, required: true, maxlength: 255 })
  firstname: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: null })
  deletedAt: Date;
}

export const BaseEntitySchema = SchemaFactory.createForClass(BaseSchema);
