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

export interface ICategoryResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
  }[];
}

export interface IVerifyOTPResponse {
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
    email: string;
    token: string;
  };
}

export interface ICourse {
  _id: string;
  authorId: string;
  categoryId?: string | ICategory;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished: boolean;
  chapters?: any[];
  outcomes?: string[];
  languages?: string[];
  hours?: string;
  attachments?: any[];
  purchases?: any[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseResponse {
  success: boolean;
  message: string;
  data: ICourse[];
}

export interface CourseByIdResponse {
  success: boolean;
  message: string;
  data: ICourse;
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
