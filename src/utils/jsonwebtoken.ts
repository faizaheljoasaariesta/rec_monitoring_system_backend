import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from '../config/env';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, SECRET_KEY as string, {
    expiresIn: '1d',
  });
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch (error) {
    return null;
  }
};