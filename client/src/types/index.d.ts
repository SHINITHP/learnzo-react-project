declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

export interface IVerifyOTPRequest {
  email: string;
  otp: string;
  token: string;
}

export interface IVerifyOTPResponse{
  success: boolean;
  message: string;
  data: any;
}

export interface IRefreshToken {
  token: string;
  user: Types.ObjectId;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISignUpResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      email: string;
      userId: string;
    };
    token: string;
  };
}

export interface ISignUpRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignInResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      email: string;
      userId: string;
    };
    token: string;
  };
}

export interface ISignInRequest {
  email: string;
  password: string;
}