// userModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import { RegFields } from '../@types/auth';



const userSchema = new Schema({
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
    unique:false
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
  },
  security:{
    hastwoFactorAuth: {
      type: Boolean,
      default: false
    },
   isverified:{
    email:{
      type:Boolean,
      default:false
    },
    phonenumber:{
      type:Boolean,
      default:false
  
    }
  
   }
  }
});

const User = mongoose.model('User', userSchema);

export default User;
