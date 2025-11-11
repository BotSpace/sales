/**
 * API Client for Backend
 * Auth is handled separately via external service
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface RequestOptions extends RequestInit {
  token?: string;
}

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { token, ...fetchOptions } = options;

    const url = `${this.baseURL}${endpoint}`;
    const headers = this.getHeaders(token);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          ...headers,
          ...fetchOptions.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({
          error: response.statusText,
        }));
        throw new Error(error.error || error.detail || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }

  // Categories
  async getCategories() {
    return this.request<any>('/categories/');
  }

  async getCategory(id: number) {
    return this.request<any>(`/categories/${id}/`);
  }

  // Templates
  async getTemplates(params?: {
    category?: number;
    search?: string;
    ordering?: string;
    page?: number;
  }) {
    const queryString = params
      ? '?' + new URLSearchParams(params as any).toString()
      : '';
    return this.request<any>(`/templates/${queryString}`);
  }

  async getTemplate(id: number) {
    return this.request<any>(`/templates/${id}/`);
  }

  async getFeaturedTemplates() {
    return this.request<any>('/templates/featured/');
  }

  async getPopularTemplates() {
    return this.request<any>('/templates/popular/');
  }

  async getTopRatedTemplates() {
    return this.request<any>('/templates/top_rated/');
  }

  async addReview(templateId: number, token: string, data: { rating: number; comment: string }) {
    return this.request<any>(`/templates/${templateId}/review/`, {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    });
  }

  // Purchases
  async getPurchases(token: string, params?: { status?: string }) {
    const queryString = params
      ? '?' + new URLSearchParams(params as any).toString()
      : '';
    return this.request<any>(`/purchases/${queryString}`, { token });
  }

  async createPurchase(token: string, data: { template: number; payment_method: string }) {
    return this.request<any>('/purchases/', {
      method: 'POST',
      token,
      body: JSON.stringify(data),
    });
  }

  async getPurchase(id: number, token: string) {
    return this.request<any>(`/purchases/${id}/`, { token });
  }

  async updateBotInfo(
    purchaseId: number,
    token: string,
    data: { bot_name?: string; bot_token?: string; bot_username?: string }
  ) {
    return this.request<any>(`/purchases/${purchaseId}/update_bot_info/`, {
      method: 'PATCH',
      token,
      body: JSON.stringify(data),
    });
  }

  async completePayment(purchaseId: number, token: string, transactionId?: string) {
    return this.request<any>(`/purchases/${purchaseId}/complete_payment/`, {
      method: 'POST',
      token,
      body: JSON.stringify({ transaction_id: transactionId }),
    });
  }

  async getPurchaseStats(token: string) {
    return this.request<any>('/purchases/stats/', { token });
  }
}

// Export singleton instance
export const api = new APIClient(API_URL);
export const apiClient = api;

export default api;
