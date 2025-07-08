import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EUserRole } from 'src/core/dto/user.dto';

@Schema({ timestamps: true })
export class UserMongo {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: EUserRole, default: EUserRole.USER })
  role: EUserRole;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type UserDocument = UserMongo & Document;
export const UserSchema = SchemaFactory.createForClass(UserMongo);
