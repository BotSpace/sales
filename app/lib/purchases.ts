// Purchase management functions

export interface Purchase {
  id: number;
  templateId: number;
  templateName: string;
  templateCategory: string;
  templateImage: string;
  purchaseDate: string;
  price: number;
  status: 'completed' | 'pending' | 'deployed';
  botToken?: string;
  botName?: string;
}

// Get user purchases
export const getUserPurchases = (): Purchase[] => {
  if (typeof window === 'undefined') return [];
  
  const purchasesStr = localStorage.getItem('purchases');
  if (!purchasesStr) return [];
  
  try {
    return JSON.parse(purchasesStr);
  } catch {
    return [];
  }
};

// Add a purchase
export const addPurchase = (templateId: number, templateName: string, templateCategory: string, templateImage: string, price: number): void => {
  const purchases = getUserPurchases();
  
  const newPurchase: Purchase = {
    id: Date.now(),
    templateId,
    templateName,
    templateCategory,
    templateImage,
    purchaseDate: new Date().toISOString(),
    price,
    status: 'completed',
  };
  
  purchases.push(newPurchase);
  localStorage.setItem('purchases', JSON.stringify(purchases));
};

// Update purchase with bot info
export const updatePurchaseBot = (purchaseId: number, botName: string, botToken: string): void => {
  const purchases = getUserPurchases();
  const purchase = purchases.find(p => p.id === purchaseId);
  
  if (purchase) {
    purchase.botName = botName;
    purchase.botToken = botToken;
    purchase.status = 'deployed';
    localStorage.setItem('purchases', JSON.stringify(purchases));
  }
};

// Check if template is purchased
export const isTemplatePurchased = (templateId: number): boolean => {
  const purchases = getUserPurchases();
  return purchases.some(p => p.templateId === templateId);
};

// Get purchase by template ID
export const getPurchaseByTemplateId = (templateId: number): Purchase | undefined => {
  const purchases = getUserPurchases();
  return purchases.find(p => p.templateId === templateId);
};
