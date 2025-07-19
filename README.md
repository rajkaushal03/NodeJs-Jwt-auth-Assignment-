# Node.js JWT Auth Assignment

A simple Node.js + Express.js backend for login, signup, OTP verification, and JWT-based authentication with refresh tokens. All data is stored in memory for demonstration purposes.

## Features
- User signup with OTP verification
- User login with OTP-based 2-factor authentication
- JWT access token and refresh token issued after OTP verification
- Protected routes using JWT authentication middleware
- Refresh token endpoint to renew access tokens
- All sensitive data (secrets) stored in `.env`

## Folder Structure
```
├── controllers/         # Route handler logic
├── middleware/          # Authentication middleware
├── models/              # In-memory data stores
├── routes/              # Express route definitions
├── utils/               # Utility functions (JWT, OTP)
├── .env                 # Environment variables (secrets)
├── .gitignore           # Files to ignore in git
├── index.js             # Main server file
```

## How It Works
1. **Signup:**
   - User sends name, email, mobile, password to `/signup`.
   - Server generates OTP, stores it, and returns it (mocked via console).
   - User verifies OTP via `/verify-otp` to complete signup and receive tokens.

2. **Login:**
   - User sends email/mobile and password to `/login`.
   - Server checks credentials, generates OTP, and returns instruction to verify OTP.
   - User verifies OTP via `/verify-otp` to receive tokens.

3. **Protected Routes:**
   - Access routes under `/protected/*` only with a valid JWT access token (sent in HTTP-only cookie).

4. **Refresh Token:**
   - Use `/refresh-token` endpoint to get a new access token using the refresh token (sent in HTTP-only cookie).

## Example Postman Requests

### Signup
```
POST http://localhost:3000/signup
Content-Type: application/json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "alicepass",
  "mobile": "9876543210"
}
```

### Login
```
POST http://localhost:3000/login
Content-Type: application/json
{
  "emailOrMobile": "alice@example.com",
  "password": "alicepass"
}
```

### Verify OTP
```
POST http://localhost:3000/verify-otp
Content-Type: application/json
{
  "emailOrMobile": "alice@example.com",
  "otp": "123456" // Use OTP from console
}
```

### Protected Route
```
GET http://localhost:3000/protected/profile
(Send cookies from previous step)
```

### Refresh Token
```
POST http://localhost:3000/refresh-token
(Send cookies from previous step)
```

## Environment Variables
Create a `.env` file in the root:
```
JWT_SECRET=your_jwt_secret_here
REFRESH_SECRET=your_refresh_secret_here
```

## Setup & Run
1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   node index.js
   ```
3. Use Postman or similar tool to test the endpoints.

## Notes
- All data is stored in memory; restarting the server will clear all users and tokens.
- OTPs are mock-sent via console for demo purposes.
- For production, use a database and proper OTP/email delivery.

---
Made with ❤️ for learning and demonstration.
