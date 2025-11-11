"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { templates } from "../../data/templates";
import { useState, useEffect } from "react";
import { getPurchaseByTemplateId, updatePurchaseBot } from "../../lib/purchases";
import { requireAuth } from "../../lib/auth";
import { useLanguage } from "../../contexts/LanguageContext";

export default function SetupPage() {
  const params = useParams();
  const router = useRouter();
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [botName, setBotName] = useState("");
  const [botToken, setBotToken] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [deploying, setDeploying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [confettiItems] = useState(() => 
    Array.from({ length: 50 }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2,
      emoji: ['🎉', '✨', '🎊', '⭐', '💫', '🌟'][i % 6]
    }))
  );
  
  useEffect(() => {
    // Check authentication on mount
    const checkAuth = () => {
      const authenticated = requireAuth(`/setup/${params.id}`);
      setIsAuthenticated(authenticated);
    };
    checkAuth();
  }, [params.id]);
  
  const template = templates.find(t => t.id === Number(params.id));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{t('templateNotFound')}</h1>
          <Link href="/templates" className="text-blue-400 hover:text-blue-300">
            {t('browseTemplatesLink')}
          </Link>
        </div>
      </div>
    );
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeploy = async () => {
    setDeploying(true);
    
    // Simulate deployment
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update purchase with bot info
    const purchase = getPurchaseByTemplateId(template.id);
    if (purchase) {
      updatePurchaseBot(purchase.id, botName, botToken);
    }
    
    setDeploying(false);
    setShowConfetti(true);
    
    // Wait a bit then redirect to profile
    setTimeout(() => {
      router.push("/profile");
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {confettiItems.map((item, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-confetti-fall"
              style={{
                left: `${item.left}%`,
                top: '-10vh',
                ['--delay' as any]: `${item.delay}s`,
                ['--duration' as any]: `${item.duration}s`,
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>
      )}

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">{/* Added pt-20 for navbar space */}
        {showConfetti ? (
          <div className="text-center py-20">
            <div className="mb-8 animate-bounce">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              {t('setupComplete')}
            </h1>
            <p className="text-2xl text-gray-300 mb-2">
              {t('setupCompleteMsg')}
            </p>
            <p className="text-gray-400">
              {t('loading')}
            </p>
          </div>
        ) : (
          <>
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between max-w-md mx-auto">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step >= s
                        ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white"
                        : "bg-white/10 text-gray-400"
                    }`}>
                      {s}
                    </div>
                    {s < 3 && (
                      <div className={`w-20 h-1 mx-2 transition-all ${
                        step > s ? "bg-gradient-to-r from-blue-600 to-cyan-600" : "bg-white/10"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between max-w-md mx-auto mt-2 text-xs text-gray-400">
                <span>{t('botInfo')}</span>
                <span>{t('tokenStep')}</span>
                <span>{t('deployStep')}</span>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10">
              {/* Step 1: Bot Name & Image */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{t('setupBot')}</h2>
                    <p className="text-gray-400">{t('personalizeYourBot').replace('{templateName}', template.name)}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('botName')}
                    </label>
                    <input
                      type="text"
                      value={botName}
                      onChange={(e) => setBotName(e.target.value)}
                      placeholder={t('enterBotName')}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('botImage')}
                    </label>
                    <div className="flex items-center gap-4">
                      {imagePreview ? (
                        <Image src={imagePreview} alt="Bot preview" width={96} height={96} className="rounded-xl object-cover border-2 border-white/10" />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center border-2 border-white/10">
                          <svg className="w-12 h-12 text-blue-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <label className="cursor-pointer px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white transition-all">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        {t('chooseImage')}
                      </label>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!botName}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('continueBtn')}
                  </button>
                </div>
              )}

              {/* Step 2: Bot Token */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{t('addBotToken')}</h2>
                    <p className="text-gray-400">{t('enterBotToken')}</p>
                  </div>

                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div className="text-sm text-blue-300">
                        <strong>{t('howToGetToken')}</strong><br />
                        {t('howToGetTokenStep1')}<br />
                        {t('howToGetTokenStep2')}<br />
                        {t('howToGetTokenStep3')}<br />
                        {t('howToGetTokenStep4')}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('botToken')}
                    </label>
                    <input
                      type="password"
                      value={botToken}
                      onChange={(e) => setBotToken(e.target.value)}
                      placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-mono text-sm"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 bg-white/10 border border-white/10 rounded-lg text-white font-semibold hover:bg-white/20 transition-all"
                    >
                      {t('backBtn')}
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!botToken}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t('continueBtn')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Deploy */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{t('readyToDeploy')}</h2>
                    <p className="text-gray-400">{t('reviewBotConfig')}</p>
                  </div>

                  <div className="space-y-4 p-6 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-4">
                      {imagePreview ? (
                        <Image src={imagePreview} alt="Bot" width={64} height={64} className="rounded-lg object-cover" />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-lg" />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-white">{botName}</h3>
                        <p className="text-sm text-gray-400">Token: {botToken.slice(0, 20)}...</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="text-sm text-gray-400 mb-2">{t('templateLabel')}</div>
                      <div className="text-white font-semibold">{template.name}</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      disabled={deploying}
                      className="flex-1 py-3 bg-white/10 border border-white/10 rounded-lg text-white font-semibold hover:bg-white/20 transition-all disabled:opacity-50"
                    >
                      {t('backBtn')}
                    </button>
                    <button
                      onClick={handleDeploy}
                      disabled={deploying}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deploying ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {t('deployingBtn')}
                        </span>
                      ) : (
                        t('deployBot') + " 🚀"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
