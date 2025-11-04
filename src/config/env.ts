import dotenv from 'dotenv';

dotenv.config();

export const EMAIL_USER = process.env.EMAIL_USER!;
export const EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD!;

export const SECRET_KEY = process.env.SECRET_KEY!;

export const SERVER_NAME = process.env.SERVER_NAME!;
export const DATABASE_NAME = process.env.DATABASE_NAME!;
export const USERNAME = process.env.USERNAME!;
export const PASSWORD = process.env.PASSWORD!;
