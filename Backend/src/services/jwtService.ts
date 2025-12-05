import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || "your_super_secret_key";

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

export const generateToken1 = (payload: object): string => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' });
}

export const verifyToken = (token: string): string | jwt.JwtPayload => {
  return jwt.verify(token, SECRET_KEY);
}
