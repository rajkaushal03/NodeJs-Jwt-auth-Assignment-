import { verifyAccessToken } from '../utils/jwt.js';

// Middleware to check if user is logged in
const authenticate = (req, res, next) => {
  // Get the access token from cookies
  const token = req.cookies['access_token'];
  // If no token, user is not logged in
  if (!token) return res.status(401).json({ error: 'Access token missing' });
  try {
    // Try to verify the token
    const payload = verifyAccessToken(token);
    // Attach user info to request
    req.user = payload;
    next(); // User is authenticated, continue
  } catch (err) {
    // Token is invalid or expired
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authenticate;
