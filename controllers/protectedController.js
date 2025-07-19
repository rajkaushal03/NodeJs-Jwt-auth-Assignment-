import users from '../models/users.js';

export const profile = (req, res) => {
  const user = users[req.user.emailOrMobile];
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ profile: user });
};
