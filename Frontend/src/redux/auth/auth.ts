export interface loginPayload {
  email: string;
  password: string;
}

export interface registerPayload {
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: number;
  password: string;
}
export interface otpVerifyPayload {
  email: string;
  otp: number;
}
