import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Lock, CheckCircle2, XCircle, AlertCircle, Package, Shield, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import authService from '@/services/auth.service';

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function SetPasswordPremium() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const submitAttemptRef = useRef(false);

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: 'onChange',
  });

  const password = watch('password');

  const hasMinLength = password?.length >= 8;
  const hasNumber = /[0-9]/.test(password || '');
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password || '');

  const passwordStrength = [hasMinLength, hasNumber, hasSpecialChar].filter(Boolean).length;

  const onSubmit = async (data: PasswordFormData) => {
    if (submitAttemptRef.current || isSubmitting) {
      return;
    }

    if (!token) {
      setError('Invalid or missing reset token. Please check your email link.');
      return;
    }

    submitAttemptRef.current = true;
    setIsSubmitting(true);
    setError(null);

    try {
      await authService.setPassword({
        resetToken: token,
        newPassword: data.password,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/login', { state: { message: 'Password set successfully. Please login.' } });
      }, 2000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to set password. Please try again.';
      setError(errorMessage);
      submitAttemptRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-md w-full relative">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/50">
                <XCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Invalid Link</h2>
              <p className="text-slate-300 mb-8 text-base">
                The password reset link is invalid or missing. Please check your email and try again.
              </p>
              <Button onClick={() => navigate('/login')} className="w-full bg-white/20 backdrop-blur-xl hover:bg-white/30 text-white font-semibold h-12 rounded-xl border border-white/30">
                Go to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="max-w-md w-full relative">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Password Set Successfully!</h2>
              <p className="text-slate-300 text-base">
                Redirecting to login...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl w-full relative grid lg:grid-cols-2 gap-8 items-center">
        <div className="backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 bg-[length:200%_100%] animate-gradient px-10 py-8 border-b border-white/10">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl shadow-blue-600/30">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-white tracking-tight">Invistock</h1>
            </div>
            <p className="text-slate-300 text-lg">Set up your secure admin account</p>
          </div>

          <div className="p-10">
            {error && (
              <div className="mb-6 p-5 bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-100">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-white mb-3">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                    className={`pl-12 pr-12 h-14 bg-white/5 backdrop-blur-xl border-white/20 text-white placeholder:text-slate-400 rounded-xl text-base ${
                      errors.password ? 'border-red-500/50 focus:ring-red-500/50' : 'focus:border-blue-500/50 focus:ring-blue-500/50'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                <p className="text-sm font-semibold text-white mb-4">
                  Password Requirements
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {hasMinLength ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-500"></div>
                    )}
                    <span className={`text-sm ${hasMinLength ? 'text-blue-300 font-medium' : 'text-slate-400'}`}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {hasNumber ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-500"></div>
                    )}
                    <span className={`text-sm ${hasNumber ? 'text-blue-300 font-medium' : 'text-slate-400'}`}>
                      At least one number (0-9)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {hasSpecialChar ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-500"></div>
                    )}
                    <span className={`text-sm ${hasSpecialChar ? 'text-blue-300 font-medium' : 'text-slate-400'}`}>
                      At least one special character (!@#$...)
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">Password Strength</span>
                    <span className={`text-xs font-semibold ${
                      passwordStrength === 3 ? 'text-blue-400' : passwordStrength === 2 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {passwordStrength === 3 ? 'Strong' : passwordStrength === 2 ? 'Medium' : 'Weak'}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          level <= passwordStrength
                            ? passwordStrength === 3
                              ? 'bg-blue-500'
                              : passwordStrength === 2
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                            : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...register('confirmPassword')}
                    className={`pl-12 pr-12 h-14 bg-white/5 backdrop-blur-xl border-white/20 text-white placeholder:text-slate-400 rounded-xl text-base ${
                      errors.confirmPassword ? 'border-red-500/50 focus:ring-red-500/50' : 'focus:border-blue-500/50 focus:ring-blue-500/50'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-400">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-semibold h-14 rounded-xl shadow-2xl shadow-blue-600/50 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Setting password...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Set Password & Continue
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-xs text-center text-slate-400">
                By continuing, you agree to Invistock's Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block space-y-6">
          <div className="backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-600/50">
              <Shield className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Enterprise Security</h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Military-grade encryption, SOC 2 compliance, and advanced authentication protocols protect your inventory data.
            </p>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-purple-600/50">
              <Zap className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Lightning Fast</h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Optimized performance delivering real-time updates and instant response times for mission-critical operations.
            </p>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-600/50">
              <Package className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Trusted Globally</h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Powering operations for Fortune 500 companies and industry leaders across manufacturing, retail, and logistics.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
}
