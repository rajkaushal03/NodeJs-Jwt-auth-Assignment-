import jwt from 'jsonwebtoken'; // JWT library
import dotenv from 'dotenv'; // Loads environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; // secret for access tokens
const REFRESH_SECRET = process.env.REFRESH_SECRET; // secret for refresh tokens

// Create a short-lived access token
export function signAccessToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
}

// Create a long-lived refresh token
export function signRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' });
}

// Check if access token is valid
export function verifyAccessToken(token) {
  return jwt.verify(token, JWT_SECRET);x
}

// Check if refresh token is valid
export function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}
