"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, getAndClearRedirectPath } from "../lib/auth";
import { useLanguage } from "../contexts/LanguageContext";

export default function AuthPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const fullPhone = phone.startsWith('998') ? phone : `998${phone}`;
      
      const AUTH_TOKEN_URL = 'https://botlarnionasi.jscorp.uz/auth/token/';
      const AUTH_ME_URL = 'https://botlarnionasi.jscorp.uz/auth/me/';
      
      console.log('🔐 Logging in with phone:', fullPhone);
      
      // Step 1: Get JWT token
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
      
      if (!loginResponse.ok) {
        const errorData = await loginResponse.json().catch(() => ({ detail: 'Login failed' }));
        throw new Error(errorData.detail || errorData.error || 'Invalid phone or password');
      }
      
      const loginData = await loginResponse.json();
      const accessToken = loginData.access;
      
      if (!accessToken) {
        throw new Error('No access token received');
      }
      
      console.log('✅ Token received, fetching user data...');
      
      // Step 2: Get user data
      const meResponse = await fetch(AUTH_ME_URL, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      
      if (!meResponse.ok) {
        throw new Error('Failed to get user data');
      }
      
      const meData = await meResponse.json();
      
      if (!meData.status || !meData.data) {
        throw new Error('Invalid user data response');
      }
      
      const userData = meData.data;
      console.log('✅ User data received:', userData);
      
      // Save token and user data
      loginUser(accessToken, {
        id: userData.id,
        phone: userData.phone,
        username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        full_name: `${userData.first_name} ${userData.last_name}`.trim() || userData.username,
        role: userData.role,
      });
      
      console.log('✅ Login successful, redirecting...');
      
      const redirectPath = getAndClearRedirectPath();
      
      window.location.href = redirectPath || '/';
      
    } catch (error: any) {
      console.error('❌ Login error:', error);
      alert(error.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            BotMother
          </h2>
          <p className="text-gray-400 mt-2">{t('templateMarketplace')}</p>
        </div>

        {/* Login Form */}
        <div className="p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-white mb-2">{t('welcome')}</h1>
          <p className="text-gray-400 mb-8">{t('loginToContinue')}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Input */}
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

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('enterPassword')}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={phone.length !== 9 || !password || loading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('loggingIn') + "..." : t('login')}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-400">
            {t('termsFooter')} & {t('privacyFooter')}
          </div>
        </div>
      </div>
    </div>
  );
}
