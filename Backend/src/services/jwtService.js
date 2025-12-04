import jwt from 'jsonwebtoken';

export const generateToken = (payload) => {
  return jwt.sign(payload, "your_super_secret_key", { expiresIn: '1h' });
}
export const generateToken1 = (payload) => {
  return jwt.sign(payload, "your_super_secret_key", { expiresIn: '10h' });
}
export const verifyToken = (token) => {
  return jwt.verify(token, "your_super_secret_key")
}

