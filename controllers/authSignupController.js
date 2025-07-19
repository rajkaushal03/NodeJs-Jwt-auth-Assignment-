import users from '../models/users.js';
import otps from '../models/otps.js';
import { generateOTP } from '../utils/otp.js';

const OTP_EXPIRY_MS = 5 * 60 * 1000;

export const signup = (req, res) => {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const key = email || mobile;
  if (users[key]) {
    return res.status(409).json({ error: 'User already exists' });
  }
  users[key] = { name, email, mobile, password };
  const otp = generateOTP();
  otps[key] = { otp, expiresAt: Date.now() + OTP_EXPIRY_MS };
  console.log(`Signup OTP for ${key}: ${otp}`);
  res.json({ message: 'OTP sent', otp });
};
