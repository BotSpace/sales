"use client";

import { useLanguage } from "../contexts/LanguageContext";

export default function Pricing() {
  const { t } = useLanguage();
  
  const plans = [
    {
      name: t('starter'),
      price: 0,
      description: t('starterDesc'),
      features: [
        t('basicTemplates'),
        t('basicSupport'),
        t('limitedFeatures'),
        t('moneyBack'),
      ],
      cta: t('choose'),
      popular: false,
    },
    {
      name: t('pro'),
      price: 99,
      description: t('proDesc'),
      features: [
        t('allTemplatesFeature'),
        t('prioritySupport'),
        t('advancedFeatures'),
        t('lifetimeUpdates'),
        t('moneyBack'),
        t('analyticsDashboard'),
      ],
      cta: t('choose'),
      popular: true,
    },
    {
      name: t('enterprise'),
      price: 299,
      description: t('enterpriseDesc'),
      features: [
        t('unlimitedBots'),
        t('dedicatedSupport'),
        t('customIntegration'),
        t('whiteLabel'),
        t('lifetimeUpdates'),
        t('analyticsDashboard'),
      ],
      cta: t('contactSales'),
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            {t('pricingTitle')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('pricingDesc')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-8 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? "border-blue-500/50 shadow-2xl shadow-blue-500/20 scale-105"
                  : "border-white/10 hover:border-blue-500/30"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-sm font-semibold text-white">
                  {t('proDesc')}
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  {plan.price > 0 && (
                    <span className="text-gray-400 ml-2">{t('perLifetime')}</span>
                  )}
                </div>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 hover:shadow-lg hover:shadow-blue-500/50"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                }`}
              >
                {plan.cta}
              </button>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            {t('allPlansInclude')}
          </p>
          <p className="text-gray-500 text-sm">
            {t('needCustomPlan')}{" "}
            <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
              {t('contactUs')}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
