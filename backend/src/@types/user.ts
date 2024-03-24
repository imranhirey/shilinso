export interface Usertype{
    firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  country?: string;
  city?: string;
  dateOfBirth: Date;
  userId:string;
  password: string;
  profileImageUrl?: string;
  gender?: 'male' | 'female' | 'other';
  security:object
}