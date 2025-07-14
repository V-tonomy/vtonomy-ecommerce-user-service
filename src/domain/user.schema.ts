import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EUserRole } from 'src/core/dto/user.dto';

@Schema({ timestamps: true })
export class UserMongo {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, default: false })
  isEmailVerified: boolean;

  @Prop({ unique: true, trim: true })
  phone: string;

  @Prop({ required: true, default: false })
  isPhoneVerified: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: EUserRole, default: EUserRole.USER })
  role: EUserRole;

  @Prop({ required: true, default: true })
  isActive: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export type UserDocument = UserMongo & Document;
export const UserSchema = SchemaFactory.createForClass(UserMongo);
