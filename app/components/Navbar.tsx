"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { logoutUser } from "../lib/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    // Check auth on client side only
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
    }
  }, []);

  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
            </div>
            <span className="text-white font-semibold text-xl">{t('appName')}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/templates" className="text-gray-300 hover:text-white transition-colors">
              {t('templates')}
            </Link>
            <Link href="/#features" className="text-gray-300 hover:text-white transition-colors">
              {t('features')}
            </Link>
            <Link href="/#pricing" className="text-gray-300 hover:text-white transition-colors">
              {t('pricing')}
            </Link>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  language === 'uz' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  language === 'ru' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  language === 'en' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
            
            {mounted && isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
                  {t('profile')}
                </Link>
                <span className="text-gray-400 text-sm">
                  {user?.full_name || (user?.phone ? `+998 ${user.phone}` : 'User')}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-white/10 border border-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-all"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link 
                href="/auth"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-medium hover:from-blue-500 hover:to-cyan-500 transition-all"
              >
                {t('signIn')}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            <Link 
              href="/templates" 
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('templates')}
            </Link>
            <Link 
              href="/#features" 
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('features')}
            </Link>
            <Link 
              href="/#pricing" 
              className="block text-gray-300 hover:text-white transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {t('pricing')}
            </Link>

            {/* Language Switcher Mobile */}
            <div className="flex items-center gap-2 py-2">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  language === 'uz' ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-400'
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  language === 'ru' ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-400'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm rounded transition-colors ${
                  language === 'en' ? 'bg-blue-500 text-white' : 'bg-white/5 text-gray-400'
                }`}
              >
                EN
              </button>
            </div>
            
            {isAuthenticated ? (
              <>
                <Link 
                  href="/profile" 
                  className="block text-gray-400 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {t('profile')}
                </Link>
                 <div className="text-gray-400 text-sm py-2">
                   {user?.full_name || (user?.phone ? `+998 ${user.phone}` : 'User')}
                 </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full px-6 py-2 bg-white/10 border border-white/10 rounded-lg text-white font-medium hover:bg-white/20 transition-all"
                >
                  {t('logout')}
                </button>
              </>
            ) : (
              <Link 
                href="/auth"
                className="block px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-medium text-center hover:from-blue-500 hover:to-cyan-500 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {t('signIn')}
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
