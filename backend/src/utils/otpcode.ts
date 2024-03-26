
export function generateOTP(length: number): string {
    let otp = '';
    for(let i = 0; i < length; i++){
      otp += Math.floor(Math.random() * 10); // generates a random number between 0 and 9
    }
    return otp;
  }