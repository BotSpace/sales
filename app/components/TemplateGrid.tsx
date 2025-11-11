"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TemplateCard from "./TemplateCard";
import { useLanguage } from "../contexts/LanguageContext";
import api from "../utils/api";

interface Template {
  id: number;
  name: string;
  slug: string;
  category: number;
  category_name?: string;
  price: number;
  original_price?: number;
  image: string;
  description: string;
  rating: number;
  sales_count: number;
  is_featured?: boolean;
}

export default function TemplateGrid() {
  const { t } = useLanguage();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedTemplates();
  }, []);

  const loadFeaturedTemplates = async () => {
    try {
      setLoading(true);
      const data = await api.getFeaturedTemplates();
      setTemplates(data.slice(0, 6)); // Show only 6 templates
    } catch (error) {
      console.error('Failed to load featured templates:', error);
      // Fallback to static data
      const { templates: staticTemplates } = await import('../data/templates');
      setTemplates((staticTemplates as any).slice(0, 6));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            {t('exploreTemplatesTitle')}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('exploreTemplatesDesc')}
          </p>
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i}
                className="h-96 bg-white/5 rounded-xl border border-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                id={template.id}
                name={template.name}
                category={template.category_name || 'Unknown'}
                price={template.price}
                originalPrice={template.original_price}
                image={template.image}
                rating={template.rating}
                sales={template.sales_count}
              />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-blue-500/50"
          >
            {t('exploreTemplates')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
