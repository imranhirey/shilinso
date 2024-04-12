


export interface SignupFields{
    firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  dateOfBirth: Date;
  password: string;
  profileImageUrl?: string;
  gender: 'male' | 'female' | 'other';
  confirmPassword:string
  
}


export interface LoginFields{
email: string;
password: string
}

