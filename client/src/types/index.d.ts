
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

export interface VerifyOTPResponse {
  message: string;
}