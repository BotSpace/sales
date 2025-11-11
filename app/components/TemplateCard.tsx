"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

interface Template {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  sales: number;
}

interface TemplateCardProps {
  id: number;
  name: string;
  category: string;
  price: number | string;
  originalPrice?: number | string;
  image?: string | null;
  rating: number | string;
  sales: number;
}

export default function TemplateCard({ 
  id, 
  name, 
  category, 
  price, 
  originalPrice, 
  image, 
  rating, 
  sales 
}: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !id) {
    return (
      <div className="h-96 bg-white/5 rounded-xl border border-white/10 animate-pulse" />
    );
  }
  
  const priceNum = typeof price === 'string' ? parseFloat(price) : price;
  const ratingNum = typeof rating === 'string' ? parseFloat(rating) : rating;

  return (
    <Link href={`/templates/${id}`}>
      <div
        className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500" />

      {/* Image Container */}
      <div className="relative h-48 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        
        {/* Placeholder Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`transition-all duration-300 ${isHovered ? "scale-110" : "scale-100"}`}>
            <svg className="w-20 h-20 text-blue-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white border border-white/10">
          {category}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white border border-white/10 flex items-center gap-1">
          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {ratingNum.toFixed(1)}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            {originalPrice && (
              <div className="text-xs text-gray-500 line-through">${typeof originalPrice === 'string' ? parseFloat(originalPrice).toFixed(2) : originalPrice.toFixed(2)}</div>
            )}
            <div className="text-2xl font-bold text-white">${priceNum.toFixed(2)}</div>
            <div className="text-xs text-gray-400">{sales} {t('sales')}</div>
          </div>

          <div className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-white font-medium text-center">
            {t('viewDetails')}
          </div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/50 transition-all duration-300 pointer-events-none" />
      </div>
    </Link>
  );
}
