// userModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { RegFields } from '../@types/auth';



const userSchema = new Schema<RegFields>({
  firstName: {
    type: String,
    required: true
  },
  middleName: {
    type: String
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String
  },
  country: {
    type: String
  },
  city: {
    type: String
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  userId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  }
});

const User = mongoose.model<RegFields>('User', userSchema);

export default User;
