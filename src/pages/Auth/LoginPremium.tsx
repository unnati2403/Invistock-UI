import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle2, Package, Shield, Zap, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPremium() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submitAttemptRef = useRef(false);

  const successMessage = (location.state as any)?.message;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    if (submitAttemptRef.current || isSubmitting) {
      return;
    }

    submitAttemptRef.current = true;
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await login(data.email, data.password);

      if (response.mfaRequired) {
        navigate('/mfa', { state: { mfaSessionToken: response.mfaSessionToken } });
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
      setError(errorMessage);
      submitAttemptRef.current = false;
      setIsSubmitting(false);
    }
  };

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
            <p className="text-slate-300 text-lg">Welcome back to your command center</p>
          </div>

          <div className="p-10">
            {successMessage && (
              <div className="mb-6 p-5 bg-blue-500/10 backdrop-blur-xl border border-blue-500/30 rounded-2xl flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-100">{successMessage}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-5 bg-red-500/10 backdrop-blur-xl border border-red-500/30 rounded-2xl flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-100">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`pl-12 pr-4 h-14 bg-white/5 backdrop-blur-xl border-white/20 text-white placeholder:text-slate-400 rounded-xl text-base ${
                      errors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'focus:border-blue-500/50 focus:ring-blue-500/50'
                    }`}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="password" className="block text-sm font-semibold text-white">
                    Password
                  </label>
                  <a
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
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
                    autoComplete="current-password"
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

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 bg-white/10 border-white/30 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-slate-200">
                  Keep me signed in for 30 days
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] hover:bg-[position:100%_0] text-white font-semibold h-14 rounded-xl shadow-2xl shadow-blue-600/50 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Signing you in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Sign In to Dashboard
                    <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-slate-800/50 backdrop-blur-xl text-slate-300 rounded-full">
                  New to Invistock?
                </span>
              </div>
            </div>

            <div className="text-center">
              <a
                href="/contact-sales"
                className="inline-flex items-center justify-center text-base font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Contact Sales to get started
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-xs text-center text-slate-400">
                Protected by enterprise-grade security. Your data is encrypted and secure.
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
              Bank-level encryption, SOC 2 compliance, and multi-factor authentication keep your inventory data secure.
            </p>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-purple-600/50">
              <Zap className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Real-Time Insights</h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Live inventory tracking, instant alerts, and powerful analytics to make data-driven decisions faster.
            </p>
          </div>

          <div className="backdrop-blur-2xl bg-white/10 rounded-3xl border border-white/20 p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-600/50">
              <Users className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Team Collaboration</h3>
            <p className="text-slate-300 text-base leading-relaxed">
              Seamless multi-user access with role-based permissions and activity tracking across all locations.
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
