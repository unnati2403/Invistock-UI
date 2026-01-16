# Authentication Implementation

## Overview
This document describes the authentication implementation for the Invistock frontend application, including set password and login functionality.

## Features Implemented

### 1. Set Password Page
- **Route**: `/set-password?token=<reset_token>`
- **Features**:
  - Password strength validation (minimum 8 characters, 1 number, 1 special character)
  - Real-time validation feedback with visual indicators
  - Password mismatch detection
  - Show/hide password toggle
  - Comprehensive error handling for all API responses (400, 404, 410, 500)
  - Success state with auto-redirect to login
  - Beautiful, modern UI with gradient background
  - Dark mode support

### 2. Login Page
- **Route**: `/login`
- **Features**:
  - Email and password validation
  - Show/hide password toggle
  - Remember me checkbox
  - Forgot password link (placeholder)
  - Success message display from set password redirect
  - Comprehensive error handling
  - MFA support (redirects to MFA page if required)
  - Modern, professional UI with gradient background
  - Dark mode support

### 3. API Integration
- **Base API Service** (`src/services/api.ts`):
  - Axios instance with automatic token injection
  - Request interceptor for adding authorization headers
  - Response interceptor for automatic token refresh
  - Handles 401 errors and attempts token refresh
  - Automatically redirects to login on refresh failure

- **Auth Service** (`src/services/auth.service.ts`):
  - `setPassword(data)` - Sets user password with reset token
  - `login(data)` - Authenticates user and stores tokens
  - `logout()` - Clears stored tokens and user data
  - `getUser()` - Retrieves stored user data
  - `isAuthenticated()` - Checks if user has valid token
  - Comprehensive error handling with user-friendly messages

### 4. State Management
- **AuthContext** (`src/contexts/AuthContext.tsx`):
  - Global authentication state management
  - `user` - Current user object
  - `isAuthenticated` - Boolean authentication status
  - `isLoading` - Loading state during initialization
  - `login(email, password)` - Login function
  - `logout()` - Logout function
  - Persists user data to localStorage
  - Automatic session restoration on page reload

### 5. Environment Configuration
- Development API: `https://api-dev.invistock.com`
- Production API: `https://api.invstock.com`
- Environment files:
  - `.env.development` - Development environment
  - `.env.production` - Production environment

## File Structure

```
src/
├── config/
│   └── env.ts                      # Environment configuration
├── contexts/
│   └── AuthContext.tsx             # Authentication context provider
├── pages/
│   └── Auth/
│       ├── Login.tsx               # Login page component
│       └── SetPassword.tsx         # Set password page component
├── services/
│   ├── api.ts                      # Base API service with interceptors
│   └── auth.service.ts             # Authentication service
└── vite-env.d.ts                   # TypeScript environment definitions
```

## API Endpoints

### Set Password
- **Endpoint**: `POST /api/auth/set-password`
- **Request**:
  ```json
  {
    "resetToken": "abc123def456...",
    "newPassword": "NewSecurePassword123!"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "success": true,
    "message": "Password changed successfully"
  }
  ```
- **Error Responses**:
  - 400: Invalid request data or weak password
  - 404: Invalid or expired reset token
  - 410: Reset token has expired
  - 500: Internal server error

### Login
- **Endpoint**: `POST /api/auth/login`
- **Request**:
  ```json
  {
    "email": "user@example.com",
    "password": "SecurePassword123!"
  }
  ```
- **Success Response** (200):
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 123,
    "email": "user@example.com",
    "orgId": 42,
    "mfaRequired": false,
    "permissions": {...}
  }
  ```

## Token Management

### Storage
- **Access Token**: Stored in `localStorage` as `accessToken`
- **Refresh Token**: Stored in `localStorage` as `refreshToken`
- **User Data**: Stored in `localStorage` as `user` (JSON string)

### Automatic Refresh
- When a 401 error occurs, the API service automatically attempts to refresh the token
- If refresh succeeds, the original request is retried with the new token
- If refresh fails, tokens are cleared and user is redirected to login

### Security Considerations
- Tokens are automatically included in all API requests via Authorization header
- LocalStorage is cleared on logout
- Failed refresh attempts trigger automatic logout

## Usage

### Set Password Flow
1. User receives email with invite link containing reset token
2. User clicks "Accept Invite" button in email
3. User is redirected to: `https://invistock.com/set-password?token=...`
4. User enters and confirms password
5. Password is validated against requirements
6. On success, user is redirected to login page

### Login Flow
1. User enters email and password
2. Credentials are validated
3. On success:
   - Tokens are stored in localStorage
   - User data is stored in context
   - If MFA is required, redirect to MFA page
   - Otherwise, redirect to dashboard
4. On failure, error message is displayed

### Using AuthContext in Components

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (isAuthenticated) {
    return <div>Welcome, {user?.email}!</div>;
  }

  return <div>Please log in</div>;
}
```

## Validation Rules

### Password Requirements
- Minimum 8 characters
- At least 1 number
- At least 1 special character (!@#$%^&*(),.?":{}|<>)
- Password and confirm password must match

### Email Requirements
- Valid email format
- Required field

## UI/UX Features

### Visual Feedback
- Real-time password strength indicators
- Clear error messages
- Loading states during API calls
- Success/error alerts with icons
- Form validation with inline error messages

### Accessibility
- Proper labels for all form fields
- ARIA attributes for screen readers
- Keyboard navigation support
- Focus management
- Color contrast compliance

### Responsive Design
- Mobile-first approach
- Responsive layouts for all screen sizes
- Touch-friendly button sizes
- Optimized for both desktop and mobile

### Dark Mode
- Full dark mode support using Tailwind CSS
- Automatic theme detection
- Consistent styling across light and dark themes

## Dependencies Added

```json
{
  "axios": "^1.7.9",
  "react-hook-form": "^7.54.2",
  "@hookform/resolvers": "^3.9.1",
  "zod": "^3.24.1"
}
```

## Development

### Running the Application
```bash
npm run dev
```
The application will be available at `http://localhost:5174`

### Building for Production
```bash
npm run build
```

### Environment Variables
Create `.env.development` and `.env.production` files with:
```
VITE_API_URL=<your_api_url>
```

## Testing the Implementation

### Test Set Password
1. Navigate to: `http://localhost:5174/set-password?token=test123`
2. Enter a password that meets requirements
3. Confirm the password
4. Click "Set Password"
5. Verify redirect to login page with success message

### Test Login
1. Navigate to: `http://localhost:5174/login`
2. Enter email and password
3. Click "Sign In"
4. Verify redirect to dashboard on success

## Future Enhancements
- [ ] Add protected route wrapper component
- [ ] Implement forgot password flow
- [ ] Add MFA page
- [ ] Implement session timeout
- [ ] Add biometric authentication support
- [ ] Enhanced security with CSRF tokens
- [ ] Rate limiting on frontend
- [ ] Password strength meter
- [ ] Social login options

## Notes
- All error responses are handled gracefully with user-friendly messages
- The application supports both development and production API endpoints
- Token refresh is automatic and transparent to the user
- The UI is fully responsive and supports dark mode
