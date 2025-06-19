import { Request, Response, NextFunction } from 'express';
import logger from '../../utils/logger';
import AuthService from './user.service';
import ApiResponse from '../../utils/apiResponse';

export const signUpUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        logger.info(`Received registration request : ${JSON.stringify(req.body)}`)

        const { fullName, email, password, confirmPassword } = req.body;
        const result = await AuthService.signUp({ fullName, email, password, confirmPassword })

        ApiResponse.success(res, 'OTP sended successfully!', result, 201)
    } catch (error) {
        logger.error('Error in sign-up:', error);
        next(error)
    }
}

export const verify = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, otp, token } = req.body;
        const result = await AuthService.verifyOTP({ email, otp, token });

        res.cookie("refreshToken", result.refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        ApiResponse.success(res, 'User Created successfully!', { user: result.user, token: result.accessToken }, 201)
    } catch (error) {
        logger.error('Error in verify:', error);
        next(error)
    }
}


export const signInUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        logger.info(`Received login request : ${JSON.stringify(req.body)}`)


    } catch (error) {
        logger.error('Error in sign-in:', error);
        next(error)
    }
}

