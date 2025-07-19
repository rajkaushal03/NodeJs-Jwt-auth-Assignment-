
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', authRoutes);
app.use('/protected', protectedRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
