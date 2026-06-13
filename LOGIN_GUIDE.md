# Simplified Login System Guide

## Overview
The EMSP now has a clean, easy-to-understand two-step login system.

## Login Flow

### Step 1: Choose Your Login Type
When you first visit the app, you see **Login Selector** with two clear options:

```
┌─────────────────────────────────┐
│   Welcome to EMSP               │
│   How would you like to continue? │
│                                 │
│  [🏢 Organization Login]        │
│  [👤 Client Login]              │
└─────────────────────────────────┘
```

---

## Option 1: Organization Login (🏢)

**For:** Admin and Organization Staff

**Access to:**
- Employee Management Dashboard
- Application Review
- Interview Scheduling
- Organization Settings

**Process:**
1. Click "Organization Login"
2. Enter email & password
3. Access to organization dashboard

**URL:** `/org-login`

---

## Option 2: Client Login (👤)

**For:** Job Applicants and Candidates

**Features:**
- Create Account or Sign In
- View submitted applications
- Track application status
- Manage profile

**Process:**
1. Click "Client Login"
2. New users: Click "Create Account" and register
3. Existing users: Sign in with credentials
4. Access to client dashboard

**URL:** `/client-login`

---

## Public Features (No Login Required)

### Job Application Form
- **URL:** `/apply`
- **Access:** Anyone can submit a job application without creating an account
- **Features:**
  - Fill application form
  - Upload resume
  - Submit application
  - No account needed

---

## User Roles & Permissions

| Feature | Organization | Client | Public |
|---------|--------------|--------|--------|
| View Dashboard | ✅ | ✅ | ❌ |
| Manage Employees | ✅ Admin | ❌ | ❌ |
| View Applications | ✅ Admin | Only own | ❌ |
| Apply for Job | ✅ | ✅ | ✅ |
| Schedule Interview | ✅ Admin | ❌ | ❌ |

---

## Backend Roles

- **admin**: Full organization access
- **employee**: Limited organization access
- **client/employee**: Can be used for applicants

---

## Component Structure

```
App.jsx (Main Router)
├── LoginSelector.jsx
│   ├── Organization Login → OrganizationLogin.jsx
│   └── Client Login → ClientLogin.jsx
├── ApplicationForm.jsx (Public - /apply)
├── AdminDashboard.jsx
└── ClientDashboard.jsx
```

---

## Environment Variables

Client Side (`.env`):
```
VITE_API_BASE_URL=http://localhost:5050
```

Server Side (`.env`):
```
JWT_SECRET=your_secret_key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

---

## How to Use

### For Admins:
1. Home → "Organization Login"
2. Enter credentials
3. Access admin dashboard

### For Clients:
1. Home → "Client Login"
2. If new: "Create Account" → register
3. If existing: Sign in
4. Access client dashboard

### For Job Applicants (No Account):
1. Home → "Apply for a job" (or navigate to `/apply`)
2. Fill form and upload resume
3. Submit application
4. Done! (No account needed)

---

## Troubleshooting

**Forgot password?**
- Contact your organization administrator

**Application not received?**
- Check email for confirmation
- Contact support if not received

**Can't log in?**
- Verify email address and password
- Make sure you're using the correct login type
