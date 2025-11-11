"use client";

import { useState, useEffect } from "react";
import TemplateCard from "../components/TemplateCard";
import { categories } from "../data/templates";
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
  discount_percentage?: number;
  image: string;
  description: string;
  short_description?: string;
  features: string[];
  rating: number;
  sales_count: number;
  views_count?: number;
  is_featured?: boolean;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const data = await api.getTemplates();
      setTemplates(data.results || data);
    } catch (error) {
      console.error('Failed to load templates:', error);
      // Fallback to static data if API fails
      const { templates: staticTemplates } = await import('../data/templates');
      setTemplates(staticTemplates as any);
    } finally {
      setLoading(false);
    }
  };

  const filteredTemplates = templates
    .filter(t => {
      if (selectedCategory === "All") return true;
      return t.category_name === selectedCategory || 
             (typeof t.category === 'string' && t.category === selectedCategory);
    })
    .filter(t => 
      searchQuery === "" || 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "popular") return (b.sales_count || 0) - (a.sales_count || 0);
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  const getCategoryTranslation = (category: string) => {
    const categoryMap: Record<string, string> = {
      'Business': 'business',
      'Support': 'supportCat',
      'Education': 'education',
      'Health': 'health',
      'Media': 'media',
    };
    return t(categoryMap[category] as any) || category;
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
            {t('allTemplates')}
          </h1>
          <p className="text-gray-400 text-lg">
            {t('browseCollection')}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Search */}
          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500/50 cursor-pointer transition-colors"
          >
            <option value="popular">{t('mostPopular')}</option>
            <option value="rating">{t('highestRated')}</option>
            <option value="price-low">{t('priceLowToHigh')}</option>
            <option value="price-high">{t('priceHighToLow')}</option>
          </select>
        </div>

        {/* Categories */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedCategory === "All"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50"
                : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
            }`}
          >
            {t('all')}
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50"
                  : "bg-white/5 text-gray-400 hover:text-white border border-white/10"
              }`}
            >
              {getCategoryTranslation(category)}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-gray-400">
          {loading ? (
            <span>{t('loading')}...</span>
          ) : (
            <span>
              {t('found')} <span className="text-white font-semibold">{filteredTemplates.length}</span>{' '}
              {filteredTemplates.length === 1 ? t('template') : t('templates_plural')}
            </span>
          )}
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div 
                key={i}
                className="h-96 bg-white/5 rounded-xl border border-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{t('noTemplatesFound')}</h3>
            <p className="text-gray-400">{t('tryAdjusting')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard
                key={template.id}
                id={template.id}
                name={template.name}
                category={template.category_name || (typeof template.category === 'string' ? template.category : 'Unknown')}
                price={template.price}
                originalPrice={template.original_price}
                image={template.image}
                rating={template.rating}
                sales={template.sales_count}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
