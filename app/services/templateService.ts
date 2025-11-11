/**
 * Template Service - Fetches data from backend or uses static data as fallback
 */

import { templates as staticTemplates, categories as staticCategories } from '../data/templates';
import api from '../utils/api';

export interface Template {
  id: number;
  name: string;
  slug: string;
  category: number | string;
  category_name?: string;
  price: number;
  original_price?: number;
  discount_percentage?: number;
  image: string;
  description: string;
  short_description?: string;
  features: string[];
  tech_stack?: string[];
  rating: number;
  sales_count: number;
  views_count?: number;
  is_featured?: boolean;
  demo_video_url?: string;
  screenshots?: any[];
  reviews?: any[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  order?: number;
  template_count?: number;
}

class TemplateService {
  private useBackend = true;

  async getCategories(): Promise<Category[]> {
    if (!this.useBackend) {
      return staticCategories.map((name, idx) => ({
        id: idx + 1,
        name,
        slug: name.toLowerCase(),
      }));
    }

    try {
      const response = await api.getCategories();
      return response.results || response;
    } catch (error) {
      console.error('Failed to fetch categories from backend, using static data:', error);
      return staticCategories.map((name, idx) => ({
        id: idx + 1,
        name,
        slug: name.toLowerCase(),
      }));
    }
  }

  async getTemplates(params?: {
    category?: string;
    search?: string;
    ordering?: string;
  }): Promise<Template[]> {
    if (!this.useBackend) {
      return staticTemplates;
    }

    try {
      const response = await api.getTemplates(params as any);
      return response.results || response;
    } catch (error) {
      console.error('Failed to fetch templates from backend, using static data:', error);
      return staticTemplates;
    }
  }

  async getTemplate(id: number): Promise<Template | null> {
    if (!this.useBackend) {
      return staticTemplates.find(t => t.id === id) || null;
    }

    try {
      return await api.getTemplate(id);
    } catch (error) {
      console.error('Failed to fetch template from backend, using static data:', error);
      return staticTemplates.find(t => t.id === id) || null;
    }
  }

  async getFeaturedTemplates(): Promise<Template[]> {
    if (!this.useBackend) {
      return staticTemplates.filter(t => t.is_featured).slice(0, 6);
    }

    try {
      return await api.getFeaturedTemplates();
    } catch (error) {
      console.error('Failed to fetch featured templates, using static data:', error);
      return staticTemplates.slice(0, 6);
    }
  }

  async getPopularTemplates(): Promise<Template[]> {
    if (!this.useBackend) {
      return [...staticTemplates].sort((a, b) => b.sales_count - a.sales_count).slice(0, 6);
    }

    try {
      return await api.getPopularTemplates();
    } catch (error) {
      console.error('Failed to fetch popular templates, using static data:', error);
      return [...staticTemplates].sort((a, b) => b.sales - a.sales).slice(0, 6);
    }
  }
}

export const templateService = new TemplateService();
export default templateService;
