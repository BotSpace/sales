"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { getAuthToken } from "../lib/auth";
import api from "../utils/api";
import { useLanguage } from "../contexts/LanguageContext";

interface Purchase {
  id: number;
  template: number;
  template_name: string;
  template_image?: string;
  category_name: string;
  price: number;
  payment_method: string;
  status: string;
  bot_name?: string;
  bot_username?: string;
  purchased_at: string;
  deployed_at?: string;
}

interface PurchaseStats {
  total_purchases: number;
  deployed_bots: number;
  pending_setup: number;
  total_spent: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [stats, setStats] = useState<PurchaseStats | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "deployed" | "pending">("all");
  const [loadingData, setLoadingData] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Redirect if not authenticated
    if (!loading && !isAuthenticated) {
      router.push('/auth');
      return;
    }

    // Load purchases
    if (isAuthenticated) {
      loadPurchases();
      loadStats();
    }
  }, [isAuthenticated, loading, router]);

  const loadPurchases = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const data = await api.getPurchases(token);
      setPurchases(data.results || data);
    } catch (error) {
      console.error('Failed to load purchases:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const loadStats = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const data = await api.getPurchaseStats(token);
      setStats(data);
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">{t('loading')}</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const filteredPurchases = purchases.filter(p => {
    if (activeTab === "all") return true;
    if (activeTab === "deployed") return p.status === "deployed";
    if (activeTab === "pending") return p.status === "completed";
    return true;
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">{/* Added pt-20 for navbar space */}
        {/* Profile Header */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{t('myProfile')}</h1>
              <p className="text-gray-400 text-lg">+998 {user?.phone}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">{purchases.length}</div>
              <div className="text-gray-400">{t('totalPurchases')}</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">
                {purchases.filter(p => p.status === 'deployed').length}
              </div>
              <div className="text-gray-400">{t('deployedBots')}</div>
            </div>
            <div className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-white mb-1">
                ${purchases.reduce((sum, p) => sum + p.price, 0)}
              </div>
              <div className="text-gray-400">{t('totalSpent')}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === "all" ? "text-white" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {t('allTemplatesTab')}
            {activeTab === "all" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("deployed")}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === "deployed" ? "text-white" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {t('deployedTab')}
            {activeTab === "deployed" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-4 px-2 font-medium transition-colors relative ${
              activeTab === "pending" ? "text-white" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {t('pendingSetup')}
            {activeTab === "pending" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
            )}
          </button>
        </div>

        {/* Purchases Grid */}
        {filteredPurchases.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{t('noTemplatesYet')}</h3>
            <p className="text-gray-400 mb-8">{t('startBuilding')}</p>
            <Link
              href="/templates"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-blue-500/50"
            >
              {t('browseTemplates')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="group bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                {/* Template Image */}
                <div className="aspect-video bg-gradient-to-br from-blue-600/20 to-cyan-600/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-20 h-20 text-blue-400/30" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    {purchase.status === 'deployed' ? (
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-xs font-medium">
                        ✓ {t('deployed')}
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-yellow-400 text-xs font-medium">
                        {t('pendingSetup')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {purchase.template_name}
                    </h3>
                    <p className="text-sm text-gray-400">{purchase.category_name}</p>
                  </div>

                  {purchase.status === 'deployed' && purchase.bot_name && (
                    <div className="mb-4 p-3 bg-white/5 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">{t('botName')}</div>
                      <div className="text-white font-medium">{purchase.bot_name}</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>
                      {new Date(purchase.purchased_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="text-blue-400 font-semibold">${purchase.price}</span>
                  </div>

                  {/* Actions */}
                  {purchase.status === 'deployed' ? (
                    <Link
                      href={`/templates/${purchase.template}`}
                      className="block w-full py-2 bg-white/10 border border-white/10 rounded-lg text-white text-center font-medium hover:bg-white/20 transition-all"
                    >
                      {t('viewDetails')}
                    </Link>
                  ) : (
                    <Link
                      href={`/setup/${purchase.template}`}
                      className="block w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white text-center font-medium hover:from-blue-500 hover:to-cyan-500 transition-all"
                    >
                      {t('setupBot')}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
