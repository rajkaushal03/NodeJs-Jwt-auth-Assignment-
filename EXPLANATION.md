# Explanation: Cookies, OTP, and Middleware in This Project

## Cookies
Cookies are small pieces of data stored on the client and sent with every HTTP request to the server. In this project, cookies are used to securely store authentication tokens:
- **Access Token Cookie:** After OTP verification, the server sends a JWT access token in an HTTP-only cookie called `access_token`. This cookie is not accessible via JavaScript, making it safer from XSS attacks.
- **Refresh Token Cookie:** The server also sends a refresh token in an HTTP-only cookie called `refresh_token`. This token allows the user to get a new access token when the old one expires, without logging in again.
- When accessing protected routes or refreshing tokens, the server reads these cookies to authenticate the user.

## OTP (One-Time Password)
OTP is a randomly generated code used to verify a user's identity during signup or login:
- When a user signs up or logs in, the server generates a 6-digit OTP and stores it in memory with an expiry time (5 minutes).
- The OTP is sent to the user (mocked by printing to the console).
- The user must submit the OTP to `/verify-otp` to complete authentication.
- If the OTP matches and is not expired, the user is authenticated and receives tokens.
- Used OTPs are deleted from memory to prevent reuse.

## Middleware
Middleware is a function that runs before route handlers to process requests:
- The `authenticate` middleware checks if the request has a valid JWT access token in the cookies.
- If the token is valid, the middleware attaches user info to the request and allows access to protected routes.
- If the token is missing, invalid, or expired, the middleware blocks access and returns an error.
- This ensures only authenticated users can access sensitive endpoints like `/protected/profile`.

---
**Summary:**
- Cookies securely store tokens for authentication.
- OTP adds a layer of security during signup and login.
- Middleware protects routes by verifying tokens before allowing access.

This combination provides a secure, two-factor authentication flow for your application.
