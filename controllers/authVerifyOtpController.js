// In-memory storage for OTPs, refresh tokens, and users
import otps from '../models/otps.js';
import refreshTokens from '../models/refreshTokens.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';
import users from '../models/users.js';

// Verifies OTP and authenticates user
export const verifyOtp = (req, res) => {
  // Get email/mobile and OTP from request body
  const { emailOrMobile, otp } = req.body;
  // Find OTP record for this user
  const record = otps[emailOrMobile];
  // If no OTP record or OTP does not match, return error
  if (!record || record.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
  // If OTP is expired, delete it and return error
  if (Date.now() > record.expiresAt) {
    delete otps[emailOrMobile];
    return res.status(400).json({ error: 'OTP expired' });
  }
  // OTP is valid, issue JWT access and refresh tokens
  const accessToken = signAccessToken({ emailOrMobile });
  const refreshToken = signRefreshToken({ emailOrMobile });
  // Store refresh token for future validation
  refreshTokens[refreshToken] = emailOrMobile;
  // Set tokens in HTTP-only cookies
  res.cookie('access_token', accessToken, { httpOnly: true });
  res.cookie('refresh_token', refreshToken, { httpOnly: true });
  // Remove used OTP from store
  delete otps[emailOrMobile];
  // Respond with success
  res.json({ message: 'Authenticated' });
};
