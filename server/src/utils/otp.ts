import sendgrid from '@sendgrid/mail';
import jwt from 'jsonwebtoken';
import logger from './logger';


sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

export const generateOTP = (): string => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  logger.info('Generated OTP');
  return otp;
};

export const createOTPToken = (email: string, otp: string): string => {
  const payload = { email, otp };
  const token = jwt.sign(payload, process.env.OTP_JWT_SECRET as string, { expiresIn: '5m' });
  logger.info(`Created OTP token for ${email}`);
  return token;
};

export const verifyOTPToken = (token: string, otp: string): { email: string } => {
  try {
    const decoded = jwt.verify(token, process.env.OTP_JWT_SECRET as string) as { email: string; otp: string };
    if (decoded.otp !== otp) {
      logger.warn(`Invalid OTP for token`);
      throw new Error('Invalid OTP');
    }
    logger.info(`Verified OTP token for ${decoded.email}`);
    return { email: decoded.email };
  } catch (error) {
    logger.error(`Error verifying OTP token:`, error);
    throw new Error('Invalid or expired OTP');
  }
};

export const sendOTP = async (email: string, otp: string, token: string): Promise<void> => {
  try {
    const msg = {
      to: email,
      from: 'learneasy547@gmail.com', // Replace with your verified SendGrid sender
      subject: 'Your LearnEase OTP Code',
      html: `
        <p>Your OTP code is <strong>${otp}</strong>. It expires in 5 minutes.</p>
        <p>Click <a href="http://localhost:5173/verify?token=${token}&email=${email}">here</a> to verify.</p>
      `,
    };
    await sendgrid.send(msg);
    logger.info(`OTP sent to ${email}`);
  } catch (error) {
    logger.error(`Error sending OTP to ${email}:`, error);
    throw new Error('Failed to send OTP');
  }
};