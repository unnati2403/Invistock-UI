import api from './api';

export interface SetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

export interface SetPasswordResponse {
  success: boolean;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Permission {
  enabled: boolean;
  permissions: string[];
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: number;
  email: string;
  orgId: number;
  mfaRequired: boolean;
  mfaSessionToken?: string;
  permissions: Record<string, Permission>;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

class AuthService {
  async setPassword(data: SetPasswordRequest): Promise<SetPasswordResponse> {
    try {
      const response = await api.post<SetPasswordResponse>('/api/auth/set-password', data);
      return response.data;
    } catch (error: any) {
      // throw this.handleError(error);
      return error;
    }
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>('/api/auth/login', data);
      const { accessToken, refreshToken, ...userData } = response.data;

      // Store tokens and user data
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(userData));

      return response.data;
    } catch (error: any) {
      // throw this.handleError(error);
      return error;
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }

  getUser(): Omit<LoginResponse, 'accessToken' | 'refreshToken'> | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  private handleError(error: any): ApiError {
    console.log('here', error)
    if (error.response) {
      const status = error.response.status;
      let message = error.response.data?.message || 'An error occurred';

      switch (status) {
        case 400:
          message = error.response.data?.message || 'Invalid request data or weak password';
          break;
        case 404:
          message = 'Invalid or expired reset token';
          break;
        case 410:
          message = 'Reset token has expired';
          break;
        case 401:
          message = 'Invalid email or password';
          break;
        case 500:
          message = 'Internal server error. Please try again later.';
          break;
      }

      return {
        message,
        statusCode: status,
      };
    }

    return {
      message: 'Network error. Please check your connection.',
      statusCode: 0,
    };
  }
}

export default new AuthService();
