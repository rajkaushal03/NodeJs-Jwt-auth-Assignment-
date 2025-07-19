import refreshTokens from '../models/refreshTokens.js';
import { verifyRefreshToken, signAccessToken } from '../utils/jwt.js';

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies['refresh_token'];
  if (!refreshToken || !refreshTokens[refreshToken]) {
    return res.status(401).json({ error: 'Refresh token missing or invalid' });
  }
  try {
    const payload = verifyRefreshToken(refreshToken);
    const emailOrMobile = payload.emailOrMobile;
    // Optionally rotate refresh token
    const newAccessToken = signAccessToken({ emailOrMobile });
    res.cookie('access_token', newAccessToken, { httpOnly: true });
    res.json({ message: 'Access token refreshed' });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
};
