"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import { api } from "../../utils/api";

interface Template {
  id: number;
  name: string;
  description: string;
  short_description: string;
  price: number;
  rating: number;
  sales_count: number;
  views_count: number;
  category: {
    id: number;
    name: string;
  };
  features: string[];
  is_featured: boolean;
  preview_image?: string;
  demo_url?: string;
  video_url?: string;
}

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "demo">("overview");
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    loadTemplate();
  }, [params.id]);

  const loadTemplate = async () => {
    try {
      setLoading(true);
      const data = await api.getTemplate(Number(params.id));
      setTemplate(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load template');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/auth');
      return;
    }

    try {
      setPurchasing(true);
      
      // Purchase template via API
      const response = await fetch(`http://localhost:8000/api/templates/${params.id}/purchase/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ payment_method: 'click' }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Purchase failed');
      }
      
      // Redirect to profile
      router.push('/profile?tab=purchases');
    } catch (err: any) {
      if (err.message.includes('already purchased')) {
        alert(t('alreadyPurchased') || 'You already own this template!');
        router.push('/profile?tab=purchases');
      } else {
        alert(err.message || 'Purchase failed');
      }
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t('templateNotFound')}</h1>
          <Link href="/templates" className="text-blue-400 hover:text-blue-300">
            {t('browseTemplatesLink')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">{/* Added pt-20 for navbar space */}
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('backToTemplates')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Video/Image */}
            <div className="relative h-96 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-2xl overflow-hidden mb-8">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-32 h-32 text-blue-400/50 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-400">{t('demoVideoPreview')}</p>
                </div>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white border border-white/10">
                {template.category.name}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-white mb-4">{template.name}</h1>
            <p className="text-gray-400 text-lg mb-8">{template.description}</p>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-white/10">
              {(["overview", "features", "demo"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium capitalize transition-colors relative ${
                    activeTab === tab ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab === "overview" ? t('overview') : tab === "features" ? t('featuresTab') : t('demo')}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-600" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">{t('aboutTemplate')}</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {template.description}. {t('aboutTemplateDesc')}
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    {t('builtWith')}
                  </p>
                </div>

                {/* Screenshots */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">{t('screenshots')}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="relative h-48 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg overflow-hidden border border-white/10">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:1rem_1rem]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="w-12 h-12 text-blue-400/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">{t('featuresCapabilities')}</h2>
                {template.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mt-1">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{feature}</h3>
                      <p className="text-gray-400 text-sm">
                        {t('professionalImpl')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "demo" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-4">{t('liveDemo')}</h2>
                <div className="relative h-96 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-medium hover:from-blue-500 hover:to-cyan-500 transition-all">
                      {t('watchDemoVideo')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <div className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10">
                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-white">${template.price}</span>
                    <span className="text-gray-400 ml-2">{t('oneTime')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{template.rating.toFixed(1)} • {template.sales_count} {t('sales')}</span>
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={purchasing}
                  className="block w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold text-center hover:from-blue-500 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-blue-500/50 mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {purchasing ? t('processing') : t('buyNow')}
                </button>

                <button className="w-full py-3 bg-white/10 border border-white/10 rounded-lg text-white font-semibold hover:bg-white/20 transition-all">
                  {t('tryDemo')}
                </button>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t('lifetimeUpdates')}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t('moneyBack')}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t('support247')}
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">{t('technologyStack')}</h3>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Telegram API", "Database", "Payments"].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-white/10 rounded-lg text-gray-300 text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
