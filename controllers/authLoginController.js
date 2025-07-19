import users from '../models/users.js';
import otps from '../models/otps.js';
import { generateOTP } from '../utils/otp.js';

const OTP_EXPIRY_MS = 5 * 60 * 1000;

export const login = (req, res) => {
  const { emailOrMobile, password } = req.body;
  if (!emailOrMobile || !password) {
    return res.status(400).json({ error: 'Fields required' });
  }
  const user = users[emailOrMobile];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const otp = generateOTP();
  otps[emailOrMobile] = { otp, expiresAt: Date.now() + OTP_EXPIRY_MS };
  console.log(`Login OTP for ${emailOrMobile}: ${otp}`);
  res.json({ message: 'Verify OTP sent to user' });
};
