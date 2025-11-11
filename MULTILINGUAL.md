# 🌍 Multilingual Support - BotMother

## ✅ 3 Ta Til Qo'shildi!

### 🎯 **Qo'llab-quvvatlanadigan Tillar:**

1. **🇺🇿 O'zbek (uz)** - Default
2. **🇷🇺 Русский (ru)**
3. **🇬🇧 English (en)**

---

## 📐 **Arxitektura**

### **File Structure:**
```
app/
├── i18n/
│   └── translations.ts        # Barcha tarjimalar
├── contexts/
│   └── LanguageContext.tsx    # Til state management
├── components/
│   ├── Navbar.tsx             # Til switcher
│   └── TemplateCard.tsx       # Tarjimalangan
└── templates/
    └── page.tsx               # Tarjimalangan
```

---

## 🔧 **Implementatsiya**

### **1. Translations File** (`app/i18n/translations.ts`)

```typescript
export const translations = {
  en: { /* English */ },
  ru: { /* Русский */ },
  uz: { /* O'zbek */ },
};

export type Language = 'en' | 'ru' | 'uz';
export type TranslationKey = keyof typeof translations.en;
```

### **2. Language Context** (`app/contexts/LanguageContext.tsx`)

```typescript
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState<Language>('uz');
  
  // LocalStorage integration
  useEffect(() => {
    const saved = localStorage.getItem('language');
    if (saved) setLanguageState(saved);
  }, []);
  
  const t = (key: TranslationKey) => {
    return translations[language][key];
  };
  
  return <LanguageContext.Provider value={{ language, setLanguage, t }}>
}
```

### **3. Layout Integration** (`app/layout.tsx`)

```typescript
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
```

---

## 🎨 **Language Switcher (Navbar)**

### **Desktop:**
```
┌─────────────────────────────────────┐
│ [UZ] [RU] [EN]  ← Inline buttons   │
└─────────────────────────────────────┘
```

### **Mobile:**
```
┌──────────────┐
│ [UZ] [RU] [EN]│
│  (Buttons)    │
└──────────────┘
```

### **Code:**
```tsx
<div className="flex gap-1 bg-white/5 rounded-lg p-1">
  <button
    onClick={() => setLanguage('uz')}
    className={language === 'uz' ? 'bg-blue-500' : 'text-gray-400'}
  >
    UZ
  </button>
  <button onClick={() => setLanguage('ru')}>RU</button>
  <button onClick={() => setLanguage('en')}>EN</button>
</div>
```

---

## 💬 **Translation Usage**

### **In Components:**
```tsx
import { useLanguage } from '../contexts/LanguageContext';

export default function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <h1>{t('allTemplates')}</h1>
    <button>{t('getStarted')}</button>
  );
}
```

### **Dynamic Translations:**
```tsx
const getCategoryTranslation = (category: string) => {
  const map = {
    'E-Commerce': 'ecommerce',
    'Support': 'support',
  };
  return t(map[category]);
};
```

---

## 📊 **Translated Content**

### **Navbar (100%)**
- ✅ Logo: "BotMother"
- ✅ Templates
- ✅ Features
- ✅ Pricing
- ✅ Profile
- ✅ Logout
- ✅ Get Started

### **Templates Page (100%)**
- ✅ All Templates
- ✅ Browse collection
- ✅ Search placeholder
- ✅ Sort options
- ✅ Categories
- ✅ Results count
- ✅ No results message

### **Template Card (100%)**
- ✅ View Details
- ✅ Sales count

### **Categories (100%)**
- ✅ E-Commerce
- ✅ Support
- ✅ Education
- ✅ Entertainment
- ✅ Business
- ✅ Finance

---

## 🎯 **Translation Keys**

### **Navigation:**
```typescript
home: string;
templates: string;
features: string;
pricing: string;
profile: string;
logout: string;
getStarted: string;
appName: string;
```

### **Templates Page:**
```typescript
allTemplates: string;
browseCollection: string;
searchPlaceholder: string;
mostPopular: string;
highestRated: string;
priceLowToHigh: string;
priceHighToLow: string;
all: string;
found: string;
template: string;
templates_plural: string;
noTemplatesFound: string;
tryAdjusting: string;
sales: string;
viewDetails: string;
```

### **Categories:**
```typescript
ecommerce: string;
support: string;
education: string;
entertainment: string;
business: string;
finance: string;
```

---

## 🔄 **Language Persistence**

### **LocalStorage:**
```typescript
// Save
localStorage.setItem('language', 'uz');

// Load on mount
useEffect(() => {
  const saved = localStorage.getItem('language');
  if (saved) setLanguageState(saved);
}, []);
```

### **User Flow:**
```
1. User visits site → Default: UZ
2. User clicks RU → Switches to Russian
3. Page refresh → Still Russian (persisted)
4. User clicks EN → Switches to English
```

---

## 📱 **Responsive Design**

### **Desktop (md+):**
- Inline language buttons
- Compact switcher in navbar
- All text visible

### **Mobile (<md):**
- Language buttons in menu
- Full-width buttons
- Touch-friendly

---

## 🌐 **Example Translations**

### **O'zbek (uz):**
```
Barcha Shablonlar
Shablonlarni qidirish...
Eng Mashhur
Topildi 12 shablonlar
```

### **Русский (ru):**
```
Все Шаблоны
Поиск шаблонов...
Самые Популярные
Найдено 12 шаблонов
```

### **English (en):**
```
All Templates
Search templates...
Most Popular
Found 12 templates
```

---

## ✅ **Features**

### **1. Real-time Switching**
- ✅ Instant language change
- ✅ No page reload
- ✅ Smooth transition

### **2. Persistent State**
- ✅ LocalStorage integration
- ✅ Survives page refresh
- ✅ User preference saved

### **3. Type Safety**
- ✅ TypeScript support
- ✅ TranslationKey type
- ✅ Language type

### **4. Fallback**
```typescript
translations[language][key] || translations.en[key] || key
```
If translation missing → falls back to English → falls back to key

---

## 🎨 **UI Examples**

### **Before:**
```
Templates | Features | Pricing | Get Started
```

### **After (O'zbek):**
```
Shablonlar | Imkoniyatlar | Narxlar | Boshlash
```

### **After (Русский):**
```
Шаблоны | Возможности | Цены | Начать
```

---

## 🚀 **Adding New Translations**

### **Step 1: Add to translations.ts**
```typescript
export const translations = {
  en: {
    newKey: 'New Text',
  },
  ru: {
    newKey: 'Новый Текст',
  },
  uz: {
    newKey: 'Yangi Matn',
  },
};
```

### **Step 2: Use in component**
```tsx
const { t } = useLanguage();
<div>{t('newKey')}</div>
```

---

## 📈 **Stats**

### **Translations:**
- **Total keys:** 25+
- **Languages:** 3
- **Coverage:** 100%
- **Files translated:** 3+

### **Components:**
- ✅ Navbar
- ✅ Templates Page
- ✅ Template Card
- 🔄 More coming...

---

## 🎯 **Next Steps (Future)**

### **Additional Pages to Translate:**
- [ ] Home Page
- [ ] Template Detail
- [ ] Auth Page
- [ ] Profile Page
- [ ] Checkout Page
- [ ] Setup Page

### **Features to Add:**
- [ ] RTL support (if needed)
- [ ] Date/time localization
- [ ] Number formatting
- [ ] Currency formatting

---

## 💡 **Best Practices**

### **1. Always use t() function:**
```tsx
✅ <h1>{t('title')}</h1>
❌ <h1>Title</h1>
```

### **2. Use descriptive keys:**
```tsx
✅ t('allTemplates')
❌ t('at')
```

### **3. Group related translations:**
```typescript
// Navigation
home, templates, features, pricing

// Actions
getStarted, logout, save, cancel
```

### **4. Provide fallbacks:**
```typescript
t('key') || 'Default Text'
```

---

## 🔍 **Testing**

### **Manual Testing:**
1. Open http://localhost:3000
2. Click UZ → Check O'zbek text
3. Click RU → Check Russian text
4. Click EN → Check English text
5. Refresh page → Language persists

### **Test Cases:**
- ✅ Default language loads (UZ)
- ✅ Language switches instantly
- ✅ LocalStorage saves preference
- ✅ All translations display correctly
- ✅ Mobile menu works
- ✅ Desktop switcher works

---

## 📦 **File Sizes**

```
translations.ts:     ~5 KB (all 3 languages)
LanguageContext.tsx: ~1 KB
Navbar.tsx:          ~8 KB (with switcher)
```

**Total overhead:** ~14 KB for full i18n support

---

**Status:** ✅ Complete  
**Version:** 1.7.0  
**Date:** 2025-01-11  
**Languages:** 3 (uz, ru, en)  
**Coverage:** 100% navbar & templates page
