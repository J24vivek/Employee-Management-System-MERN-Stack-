# 🔐 Quick Login Testing Guide

## ⚡ Fastest Way to Test (2 Minutes)

### Step 1: Start Backend
```bash
cd server
npm install
npm run dev
```
Server starts at: `http://localhost:5050`

### Step 2: Start Frontend
```bash
cd client
npm install
npm run dev
```
Frontend starts at: `http://localhost:5173`

### Step 3: Test Demo Login
```
1. Go to http://localhost:5173
2. See login selector
3. Click "Organization Login"
4. Click "⚡ Try Demo" button (yellow)
5. Instant access! 🎉
```

---

## 📧 Demo Credentials

### Organization Admin (Demo)
```
Email: demo@emsp.com
Password: 1234
Role: Admin
```

**What you can do:**
- Manage employees
- View job applications
- Schedule interviews
- Send emails
- Access full dashboard

---

## 🔗 Google Login Setup (Optional)

### If you want Google login too:

#### Get Google Client ID (5 minutes):
1. Visit: https://console.cloud.google.com/
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web app)
5. Add authorized origins: `http://localhost:5173`
6. Copy the Client ID

#### Add to your app:
```bash
# Client .env
VITE_GOOGLE_CLIENT_ID=paste_your_client_id_here
```

```bash
# Server .env
GOOGLE_CLIENT_ID=paste_your_client_id_here
```

#### Test it:
1. Restart both servers
2. Go to Organization Login
3. Click Google button
4. Sign in with your Google account
5. ✅ Auto-logged in!

---

## 🧪 Test Scenarios

### Scenario 1: Demo Login
```
✅ Fastest for testing
⏱️ 1 click
👤 Demo account
🎯 Perfect for demos
```
**Steps:** Organization Login → Try Demo

### Scenario 2: Email & Password
```
✅ Traditional login
⏱️ 30 seconds
👤 Create your own
🎯 Test real flow
```
**Steps:** 
1. Organization Login
2. Enter: `demo@emsp.com` / `1234`
3. Sign In

### Scenario 3: Google OAuth
```
✅ Modern authentication
⏱️ 2 clicks
👤 Your Google account
🎯 Real-world flow
```
**Steps:**
1. Organization Login
2. Click Google button
3. Choose your Google account
4. ✅ Done!

### Scenario 4: Register New Account
```
✅ Create custom account
⏱️ 1 minute
👤 Any email
🎯 Test user system
```
**Steps:**
1. Client Login
2. Click "Create Account"
3. Enter email & password
4. Password must have: 8+ chars, uppercase, number, special char
5. Sign in with new account

### Scenario 5: Job Application (No Login)
```
✅ Public form
⏱️ No account needed
👤 Anonymous
🎯 Test candidate flow
```
**Steps:**
1. Home page → "Apply for a job"
2. Fill form
3. Upload resume
4. ✅ Submitted!

---

## 🚀 All Login URLs

| Page | URL | Purpose |
|------|-----|---------|
| Login Selector | `/` | Choose login type |
| Organization Login | `/org-login` | Admin/Employee |
| Client Login | `/client-login` | Job applicants |
| Job Application | `/apply` | Public form |
| Admin Dashboard | `/admin` | After org login |
| Client Dashboard | `/client-dashboard` | After client login |

---

## ⚙️ Environment Variables

### Client (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5050
VITE_GOOGLE_CLIENT_ID=your_google_client_id (optional)
```

### Server (`.env`)
```env
ATLAS_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id (optional)
NODE_ENV=development
PORT=5050
```

---

## 🎯 Feature Checklist

- [ ] ✅ Demo login works
- [ ] ✅ Email/password login works
- [ ] ✅ Can create new account
- [ ] ✅ Can view dashboard after login
- [ ] ✅ Logout works
- [ ] ✅ Job application form accessible
- [ ] ✅ (Optional) Google login works

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Demo button doesn't appear | Check `NODE_ENV=development` |
| Can't login with demo@emsp.com / 1234 | Restart backend server |
| Google button doesn't appear | Check `VITE_GOOGLE_CLIENT_ID` in `.env` |
| "Invalid token" error | Set `GOOGLE_CLIENT_ID` on server |
| Database connection error | Check MongoDB connection string |
| CORS error | Check server is running on 5050 |

---

## 📊 Login Flow Diagram

```
START
  ↓
Visit http://localhost:5173
  ↓
See Login Selector
  ├→ [Organization Login] 
  │    ├→ Email/Password
  │    ├→ Google OAuth
  │    └→ Demo (⚡ Try Demo)
  │
  ├→ [Client Login]
  │    ├→ Create Account
  │    ├→ Sign In (Email/Password)
  │    └→ Google OAuth
  │
  └→ [Public Application]
       └→ Apply (no login)
```

---

## 🎓 What to Test

### Authentication
- [ ] Login with demo account
- [ ] Login with Google
- [ ] Create and login with email/password
- [ ] Logout functionality
- [ ] Token expiration (wait 24h or fake it)
- [ ] Invalid credentials error

### Authorization
- [ ] Admin can access admin dashboard
- [ ] Employee can access employee dashboard
- [ ] Client can access client dashboard
- [ ] Cannot access other dashboards

### Edge Cases
- [ ] SQL injection attempts (form validation)
- [ ] Empty fields error handling
- [ ] Very long inputs
- [ ] Special characters in passwords
- [ ] Multiple logins same browser
- [ ] Login from different devices

---

## 🚢 When Ready for Production

1. Set `NODE_ENV=production` on server
2. Add real domain to Google OAuth origins
3. Update `FRONTEND_URL` environment variable
4. Use HTTPS (not HTTP)
5. Remove demo credentials or disable
6. Set strong `JWT_SECRET`
7. Use production MongoDB database
8. Enable proper logging

---

## 📞 Need Help?

See detailed guides:
- 📖 [Google Login Setup](./GOOGLE_LOGIN_GUIDE.md)
- 📖 [Login System Overview](./LOGIN_GUIDE.md)
- 📖 [API Documentation](./README.md)

---

**Happy Testing! 🎉**
