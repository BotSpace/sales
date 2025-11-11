"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser, getAndClearRedirectPath } from "../lib/auth";
import { useLanguage } from "../contexts/LanguageContext";

type AuthStep = "phone" | "otp";

export default function AuthPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState<AuthStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear any existing auth data on mount
    // (In real app, check if already authenticated and redirect)
  }, []);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For now, just proceed to OTP step
      // In real implementation, you would call backend to send OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep("otp");
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 7) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length !== 8) return;
    
    setLoading(true);
    
    try {
      const password = otpCode;
      const fullPhone = `998${phone}`;
      
      // Check for demo mode
      const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
      
      if (DEMO_MODE) {
        console.log('🎭 Demo Mode: Using mock authentication');
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockToken = 'demo_jwt_token_' + Date.now();
        const mockUser = {
          id: 1,
          phone: fullPhone,
          first_name: 'Demo',
          last_name: 'User',
          email: 'demo@example.com',
          full_name: 'Demo User'
        };
        
        console.log('✅ Demo login successful:', mockUser);
        
        // Save to localStorage
        const { loginUser: saveUserAuth } = await import('../lib/auth');
        saveUserAuth(mockToken, mockUser);
        
        // Check redirect path
        const { getAndClearRedirectPath } = await import('../lib/auth');
        const redirectPath = getAndClearRedirectPath();
        
        // Redirect
        window.location.href = redirectPath || '/';
        return;
      }
      
      // Real auth flow
      const AUTH_TOKEN_URL = 'https://botlarnionasi.jscorp.uz/auth/token/';
      const AUTH_ME_URL = 'https://botlarnionasi.jscorp.uz/auth/me/';
      
      console.log('🔐 Attempting real login with:', { phone: fullPhone, password: '***' });
      
      const loginResponse = await fetch(AUTH_TOKEN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: fullPhone,
          password: password,
        }),
      });
      
      const responseText = await loginResponse.text();
      console.log('Login response:', { status: loginResponse.status, body: responseText });
      
      if (!loginResponse.ok) {
        let errorMessage = 'Login failed';
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.detail || errorData.error || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = responseText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      const loginData = JSON.parse(responseText);
      const token = loginData.key;
      
      if (!token) {
        throw new Error('No token received from auth service');
      }
      
      console.log('✅ Token received, getting user data...');
      
      const meResponse = await fetch(AUTH_ME_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const meText = await meResponse.text();
      console.log('Me response:', { status: meResponse.status, body: meText });
      
      if (!meResponse.ok) {
        throw new Error('Failed to get user data: ' + meText);
      }
      
      const userData = JSON.parse(meText);
      console.log('✅ User data received:', userData);
      
      const { loginUser: saveUserAuth } = await import('../lib/auth');
      saveUserAuth(token, userData);
      
      console.log('✅ Login successful, redirecting...');
      
      const { getAndClearRedirectPath } = await import('../lib/auth');
      const redirectPath = getAndClearRedirectPath();
      
      window.location.href = redirectPath || '/';
      
    } catch (error: any) {
      console.error('❌ Login error:', error);
      alert(error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    // Show success message
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <span className="text-white font-semibold text-2xl">{t('appName')}</span>
        </Link>

        {/* Auth Card */}
        <div className="p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-xl">
          {step === "phone" ? (
            <>
              <h1 className="text-3xl font-bold text-white mb-2">{t('phoneAuth')}</h1>
              <p className="text-gray-400 mb-8">{t('enterPhone')}</p>

              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('phoneNumber')}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      +998
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="90 123 45 67"
                      maxLength={9}
                      required
                      className="w-full pl-16 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={phone.length !== 9 || loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t('sendOTP') + "..." : t('sendOTP')}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-400">
                {t('termsFooter')} & {t('privacyFooter')}
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("phone")}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                {t('changeNumber')}
              </button>

              <h1 className="text-3xl font-bold text-white mb-2">{t('enterOTP')}</h1>
              <p className="text-gray-400 mb-8">
                {t('otpSentTo')} +998 {phone}
              </p>

              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="flex gap-3 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !digit && index > 0) {
                          const prevInput = document.getElementById(`otp-${index - 1}`);
                          prevInput?.focus();
                        }
                      }}
                      className="w-12 h-14 text-center text-2xl font-bold bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={otp.join("").length !== 8 || loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t('verifyOTP') + "..." : t('verifyOTP')}
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="w-full text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t('resendOTP')}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
            ← {t('home')}
          </Link>
        </div>
      </div>
    </div>
  );
}
