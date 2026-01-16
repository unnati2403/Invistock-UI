# Quick Start Guide - Authentication

## 🚀 Getting Started

The authentication system is now fully implemented and ready to use!

## 📋 What's Been Implemented

### ✅ Pages Created
1. **Set Password Page** (`/set-password?token=xxx`)
   - Password validation (8+ chars, 1 number, 1 special char)
   - Visual password strength indicators
   - Show/hide password toggles
   - Error handling for all API responses

2. **Login Page** (`/login`)
   - Email and password authentication
   - Token storage and management
   - Automatic redirect to dashboard
   - MFA support (if required)

### ✅ Services Created
1. **API Service** (`src/services/api.ts`)
   - Axios instance with automatic token injection
   - Automatic token refresh on 401 errors
   - Handles authentication headers

2. **Auth Service** (`src/services/auth.service.ts`)
   - `setPassword()` - Set user password
   - `login()` - Authenticate user
   - `logout()` - Clear session
   - `getUser()` - Get current user
   - `isAuthenticated()` - Check auth status

3. **Auth Context** (`src/contexts/AuthContext.tsx`)
   - Global authentication state
   - Session persistence
   - Auto-restore on page reload

## 🎯 How to Use

### Testing the Set Password Flow

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the set password page**:
   ```
   http://localhost:5174/set-password?token=YOUR_TOKEN_HERE
   ```

3. **Enter a password** that meets requirements:
   - At least 8 characters
   - At least 1 number
   - At least 1 special character (!@#$%^&*...)

4. **Click "Set Password"** - You'll be redirected to login

### Testing the Login Flow

1. **Navigate to login**:
   ```
   http://localhost:5174/login
   ```

2. **Enter credentials**:
   - Email: (use the email you set password for)
   - Password: (use the password you just set)

3. **Click "Sign In"** - You'll be redirected to dashboard

## 🔐 Using Authentication in Your Components

### Check if User is Logged In

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user?.email}!</div>;
}
```

### Logout

```typescript
import { useAuth } from '@/contexts/AuthContext';

function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}
```

### Protect a Route

You can use the `ProtectedRoute` component to protect any route:

```typescript
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// In App.tsx or your route configuration:
<Route
  path="/protected-page"
  element={
    <ProtectedRoute>
      <YourProtectedComponent />
    </ProtectedRoute>
  }
/>
```

## 🌍 Environment Configuration

### Development
API URL: `https://api-dev.invistock.com`

### Production
API URL: `https://api.invstock.com`

The correct API is automatically selected based on your build mode.

## 📦 What Gets Stored

When a user logs in successfully, the following is stored in localStorage:
- `accessToken` - JWT access token
- `refreshToken` - JWT refresh token
- `user` - User data (userId, email, orgId, permissions)

## 🔄 Token Refresh

The system automatically handles token refresh:
1. When an API call returns 401 (Unauthorized)
2. The system attempts to refresh the token using the refresh token
3. If successful, the original request is retried
4. If refresh fails, the user is logged out and redirected to login

## 🎨 UI Features

### Visual Feedback
- ✅ Real-time password validation
- ✅ Loading states during API calls
- ✅ Success/error alerts
- ✅ Form validation with inline errors
- ✅ Show/hide password toggles

### Responsive Design
- ✅ Mobile-friendly layouts
- ✅ Touch-optimized buttons
- ✅ Works on all screen sizes

### Dark Mode
- ✅ Full dark mode support
- ✅ Automatic theme detection

## 📝 API Endpoints Used

### Set Password
```
POST /api/auth/set-password
Body: { resetToken, newPassword }
```

### Login
```
POST /api/auth/login
Body: { email, password }
```

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module" errors
**Solution**: Make sure you've installed dependencies:
```bash
npm install
```

### Issue: API calls failing
**Solution**: Check that:
1. The backend server is running
2. The API URL in `.env.development` is correct
3. CORS is properly configured on the backend

### Issue: Token not being sent in requests
**Solution**: The API service automatically adds the token. Make sure you're using the `api` instance from `src/services/api.ts`:
```typescript
import api from '@/services/api';

// Correct - token is automatically added
api.get('/some-endpoint');

// Wrong - no token
axios.get('https://api.com/some-endpoint');
```

## 🎉 Next Steps

Now that authentication is set up, you can:

1. **Protect your routes**: Wrap routes with `<ProtectedRoute>`
2. **Add logout button**: Use `useAuth()` hook
3. **Show user info**: Access `user` from `useAuth()`
4. **Handle permissions**: Use `user.permissions` for role-based access
5. **Implement forgot password**: Create forgot password page
6. **Add MFA page**: Handle MFA flow if `mfaRequired` is true

## 📚 Additional Documentation

For detailed implementation details, see:
- `AUTH_IMPLEMENTATION.md` - Complete technical documentation
- `src/services/auth.service.ts` - API methods and types
- `src/contexts/AuthContext.tsx` - State management

## 🆘 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Verify API endpoints are correct
3. Ensure backend is running and accessible
4. Check network tab in browser DevTools

Happy coding! 🚀
