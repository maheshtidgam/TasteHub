export interface loginPayload {
  email: string;
  password: string;
}

export interface registerPayload {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: number;
  password: string;
  role: string;
}
export interface otpVerifyPayload {
  email: string;
  otp: number;
}
