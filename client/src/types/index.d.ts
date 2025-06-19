
declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

export interface VerifyOTPRequest {
  email: string;
  otp: string;
  token: string;
}

export interface IRefreshToken {
    token: string;
    user: Types.ObjectId;
    expiresAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
