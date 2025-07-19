import otps from '../models/otps.js';
import refreshTokens from '../models/refreshTokens.js';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';
import users from '../models/users.js';

export const verifyOtp = (req, res) => {
  const { emailOrMobile, otp } = req.body;
  const record = otps[emailOrMobile];
  if (!record || record.otp !== otp) {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
  if (Date.now() > record.expiresAt) {
    delete otps[emailOrMobile];
    return res.status(400).json({ error: 'OTP expired' });
  }
  // Issue tokens
  const accessToken = signAccessToken({ emailOrMobile });
  const refreshToken = signRefreshToken({ emailOrMobile });
  refreshTokens[refreshToken] = emailOrMobile;
  res.cookie('access_token', accessToken, { httpOnly: true });
  res.cookie('refresh_token', refreshToken, { httpOnly: true });
  delete otps[emailOrMobile];
  res.json({ message: 'Authenticated' });
};
