// userModel.ts
import mongoose, { Document, Schema } from 'mongoose';
import Wallet from './walletModal.js';



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
    otp:{
      type:String

    },
    loginststus:{
      type:String,
      enum:['active','inactive'],
      default:"inactive"
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
  },
// ...
Walletid: {
  type:String
}
// ...
});

const User = mongoose.model('users', userSchema);

export default User;
