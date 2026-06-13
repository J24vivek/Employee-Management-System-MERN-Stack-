# 🚀 Google Login & Demo Credentials Setup Guide

## Overview
Your EMSP now supports **Google OAuth login** for quick authentication and **demo credentials** for testing.

---

## 🎯 Quick Test (Demo Mode)

### Demo Account Credentials:
```
📧 Email: demo@emsp.com
🔐 Password: 1234
```

### How to Use Demo:
1. Go to **Organization Login** 
2. Click **"Try Demo"** button (yellow button at bottom)
3. Instant access to admin dashboard
4. ⚠️ **Development mode only** - won't work in production

---

## 🔐 Google OAuth Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (name: "EMSP" or similar)
3. Enable the **Google+ API** 
4. Go to **Credentials** section

### Step 2: Create OAuth 2.0 Client
1. Click **Create Credentials** → **OAuth 2.0 Client IDs**
2. Choose **Web Application** as application type
3. Under **Authorized JavaScript origins**, add:
   ```
   http://localhost:5173
   http://localhost:3000
   ```
4. Under **Authorized redirect URIs**, add:
   ```
   http://localhost:5173
   http://localhost:3000
   ```
5. Click **Create**
6. Copy your **Client ID**

### Step 3: Add to Environment Files

**Client (.env):**
```env
VITE_GOOGLE_CLIENT_ID=your_client_id_from_step_2
```

**Server (.env):**
```env
GOOGLE_CLIENT_ID=your_client_id_from_step_2
```

### Step 4: Install Dependencies
```bash
# Client
npm install

# Server
npm install
```

### Step 5: Test Google Login
1. Start your app
2. Go to **Organization Login**
3. Click **Google Sign-In button**
4. Select your Google account
5. ✅ Automatically logged in!

---

## 🔄 How It Works

### Client Side Flow:
```
User clicks Google button
    ↓
Google authentication popup
    ↓
Get credential token
    ↓
Send token to backend
    ↓
Backend verifies token
    ↓
User logged in + JWT token
```

### Backend Flow:
```
POST /auth/google-login
{
  token: "google_credential_token"
}
    ↓
Verify token with Google
    ↓
Find or create user
    ↓
Generate JWT token
    ↓
Return token + user role
```

---

## 📝 Login Options Available

### 1. **Email & Password** (Traditional)
- Simple email/password login
- Create account or sign in
- Available for both Organization and Client logins

### 2. **Google OAuth** (Quick)
- One-click authentication
- Auto-creates account if first-time user
- Faster and more secure

### 3. **Demo Account** (Testing - Dev Only)
- Quick test without Google setup
- Email: `demo@emsp.com`
- Password: `1234`
- Organization Login only

---

## 🎨 Login Screens

### 1. Login Selector
```
Welcome to EMSP
How would you like to continue?

[🏢 Organization Login]
[👤 Client Login]

→ Apply for a job
```

### 2. Organization Login
```
Organization Dashboard
Sign in with credentials

[Google Sign-In Button]
    OR
📧 Email
🔐 Password
[Sign In]

⚡ Try Demo (dev@emsp.com / 1234)
← Back to Login Options
```

### 3. Client Login
```
Client Portal
Sign in to view applications

[Google Sign-In Button]
    OR
📧 Email
🔐 Password
[Sign In]

Don't have account? Create Account
← Back to Login Options
```

---

## 🐛 Troubleshooting

### Google Login Not Working?
**Issue:** "Google Client ID not configured"
- **Solution:** Check `VITE_GOOGLE_CLIENT_ID` in `.env`
- Restart dev server after adding .env

**Issue:** "Cross-origin error"
- **Solution:** Add `http://localhost:5173` to Google Cloud authorized origins
- Go to Google Cloud Console → Credentials → OAuth client ID → Edit

**Issue:** "Invalid token"
- **Solution:** Ensure server also has `GOOGLE_CLIENT_ID` in `.env`
- Verify it's the same as client's

### Demo Login Not Working?
**Issue:** "Demo mode not available"
- **Solution:** Demo only works in development
- Check `NODE_ENV=development` in server `.env`

### Can't see Google button?
**Issue:** Google package not installed
- **Solution:** Run `npm install` in client folder
- Restart dev server

---

## 🔒 Security Features

✅ **Google OAuth:**
- Token verified by Google servers
- User data secure
- No password stored for Google users
- Auto-logout on token expiration

✅ **Email/Password:**
- Passwords hashed with bcryptjs
- Minimum 8 characters required
- Uppercase, digit, and special character required
- JWT token expires in 24 hours

✅ **Demo Account:**
- Development mode only
- Different credentials than production
- Password: `1234` (weak, for testing only)
- Removed before production deploy

---

## 🚀 Deployment Notes

### For Production:
1. **Google OAuth:**
   - Add production domain to authorized origins
   - Example: `https://yourdomain.com`

2. **Demo Account:**
   - Set `NODE_ENV=production` on server
   - Demo login will be disabled automatically

3. **Environment Variables:**
   - Use your hosting platform's config
   - Never hardcode secrets in code

4. **HTTPS Required:**
   - Google OAuth requires HTTPS in production
   - Use SSL certificate on your domain

---

## 📚 User Flows

### New User - Google Login:
```
1. Click "Google Sign-In"
2. Authenticate with Google
3. Account auto-created
4. Redirected to dashboard
```

### Existing User - Email/Password:
```
1. Enter email & password
2. Credentials verified
3. JWT token issued
4. Redirected to dashboard
```

### Testing - Demo Mode:
```
1. Click "Try Demo" button
2. Auto-login with demo@emsp.com
3. Full admin access
4. Temporary session
```

---

## 🎯 Next Steps

1. ✅ Get Google Client ID from Google Cloud
2. ✅ Add Client ID to `.env` files
3. ✅ Run `npm install` in client
4. ✅ Test with demo account first
5. ✅ Test with Google login
6. ✅ Create real user account with email/password
7. ✅ Deploy to production

---

## ❓ FAQ

**Q: Can users login without Google or email?**
A: No, they must use one of the three methods.

**Q: Can I remove the demo button?**
A: Yes, it only shows in development. Set `NODE_ENV=production`.

**Q: What happens if I don't add Google Client ID?**
A: Google button won't appear, but email/password login still works.

**Q: How do I allow more Google sign-ins?**
A: Increase `maxPoolSize` in MongoDB connection settings.

**Q: Is demo password hardcoded?**
A: No, it's in the database. You can change it by updating the user.

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set
3. Check browser console for errors
4. Verify backend logs for server errors
5. Ensure MongoDB connection is working
