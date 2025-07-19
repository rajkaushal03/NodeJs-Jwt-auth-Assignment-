import { verifyAccessToken } from '../utils/jwt.js';

const authenticate = (req, res, next) => {
  const token = req.cookies['access_token'];
  if (!token) return res.status(401).json({ error: 'Access token missing' });
  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authenticate;
