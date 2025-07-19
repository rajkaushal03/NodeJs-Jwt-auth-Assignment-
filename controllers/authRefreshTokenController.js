import refreshTokens from '../models/refreshTokens.js'; 
import { verifyRefreshToken, signAccessToken } from '../utils/jwt.js';

// Handles refreshing the access token using a valid refresh token
export const refreshToken = (req, res) => {
  // Get refresh token from cookies
  const refreshToken = req.cookies['refresh_token'];
  // If no refresh token or not found in store, user is not authenticated
  if (!refreshToken || !refreshTokens[refreshToken]) {
    return res.status(401).json({ error: 'Refresh token missing or invalid' });
  }
  try {
    // Verify the refresh token
    const payload = verifyRefreshToken(refreshToken);
    const emailOrMobile = payload.emailOrMobile;
    // Create a new access token
    const newAccessToken = signAccessToken({ emailOrMobile });
    // Send new access token in cookie
    res.cookie('access_token', newAccessToken, { httpOnly: true });
    res.json({ message: 'Access token refreshed' });
  } catch (err) {
    // If refresh token is invalid or expired
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
};
