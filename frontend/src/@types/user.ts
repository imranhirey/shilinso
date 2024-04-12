export interface User {
    user: {
      security: {
        isverified: {
          email: boolean;
          phonenumber: boolean;
        };
        hastwoFactorAuth: boolean;
        loginststus: 'inactive' | 'active'; // Assuming loginststus can only be 'inactive' or 'active'
        otp: string | null;
      };
      _id: string;
      firstName: string;
      middleName?: string; // Assuming middleName is optional
      lastName: string;
      email: string;
      phoneNumber: string;
      country: string;
      city: string;
      dateOfBirth: string; // Assuming dateOfBirth is a string in ISO format
      userId: string;
      profileImageUrl: string;
      gender: 'male' | 'female'; // Assuming gender can only be 'male' or 'female'
      Walletid: string;
      __v: number;
    };
  }
  