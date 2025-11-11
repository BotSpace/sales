# ✅ SHABLONLAR BACKEND API BILAN ISHLAYDI!

## 🔄 Nima Qilindi

Frontend endi shablonlarni **backend API'dan** oladi!

### O'zgarishlar:

#### 1. Templates Page (`app/templates/page.tsx`)
```typescript
// Eski: Static data
import { templates } from '../data/templates';

// Yangi: Backend API
import api from '../utils/api';

useEffect(() => {
  loadTemplates();
}, []);

const loadTemplates = async () => {
  const data = await api.getTemplates();
  setTemplates(data.results || data);
};
```

#### 2. TemplateGrid Component (`app/components/TemplateGrid.tsx`)
```typescript
// Eski: Static 6 ta shablon
const featuredTemplates = templates.slice(0, 6);

// Yangi: Backend'dan featured
const loadFeaturedTemplates = async () => {
  const data = await api.getFeaturedTemplates();
  setTemplates(data.slice(0, 6));
};
```

## 📡 API Endpoints

### Ishlatilayotgan Endpointlar:

1. **`GET /api/templates/`** - Barcha shablonlar
   - Response: `{ results: [...], count: 10 }`

2. **`GET /api/templates/featured/`** - Featured shablonlar
   - Response: `[...]`

3. **`GET /api/templates/{id}/`** - Shablon detail
   - Response: `{ id, name, price, ... }`

## ✨ Xususiyatlar

### Loading States
```typescript
{loading ? (
  <div className="animate-pulse">Loading...</div>
) : (
  <div>Templates...</div>
)}
```

### Error Handling
```typescript
try {
  const data = await api.getTemplates();
  setTemplates(data);
} catch (error) {
  // Fallback to static data
  setTemplates(staticTemplates);
}
```

### Data Format
```typescript
interface Template {
  id: number;
  name: string;
  category_name: string;  // Backend qaytaradi
  price: number;
  original_price?: number;
  sales_count: number;    // Backend field
  rating: number;
  image: string;
}
```

## 🔄 Ma'lumotlar Oqimi

```
1. Component Mount
   ↓
2. useEffect() ishga tushadi
   ↓
3. loadTemplates() chaqiriladi
   ↓
4. API request: GET /api/templates/
   ↓
5. Backend response
   ↓
6. setState(data)
   ↓
7. UI yangilanadi
```

## 🧪 Test Qilish

### 1. Backend Ishga Tushiring

```bash
cd templates-backend
docker-compose up -d
docker-compose exec web python manage.py load_initial_data
```

### 2. Frontend Ishga Tushiring

```bash
cd templates
npm run dev
```

### 3. Tekshiring

- **Bosh Sahifa:** http://localhost:3000
  - 6 ta featured shablon (backend'dan)
  
- **Templates Page:** http://localhost:3000/templates
  - Barcha shablonlar (backend'dan)
  - Filter, search, sort

### 4. Console'da Ko'ring

```
Attempting to load templates from backend...
✅ Templates loaded: 6 items
```

## 🔍 Debug

### Backend API Test

```bash
# Shablonlarni ko'ring
curl http://localhost:8000/api/templates/

# Featured shablonlar
curl http://localhost:8000/api/templates/featured/

# Kategoriyalar
curl http://localhost:8000/api/categories/
```

### Frontend Console

Browser console (F12):
```
Failed to load templates: NetworkError
Falling back to static data
```

## 📊 Data Mapping

### Backend → Frontend

```typescript
// Backend response
{
  id: 1,
  name: "E-Commerce Bot",
  category: 1,
  category_name: "Business",
  price: "49.99",
  sales_count: 150
}

// Frontend ishlatadi
<TemplateCard
  id={template.id}
  name={template.name}
  category={template.category_name}
  price={template.price}
  sales={template.sales_count}
/>
```

## ⚡ Performance

### Loading Skeleton

```tsx
{loading ? (
  <div className="grid grid-cols-3 gap-6">
    {[1,2,3,4,5,6].map(i => (
      <div key={i} className="h-96 bg-white/5 animate-pulse" />
    ))}
  </div>
) : (
  // Actual templates
)}
```

### Caching (Keyingi)

- React Query
- SWR
- Redux

## 🎯 Keyingi Qadamlar

1. ✅ Templates page - Backend API
2. ✅ Home page featured - Backend API
3. 🔄 Template detail page
4. 🔄 Categories'ni backend'dan
5. 🔄 Search optimization
6. 🔄 Pagination

## 🐛 Xatoliklarni Hal Qilish

### "Failed to load templates"

**Sabab:** Backend ishlamayapti
**Hal:** 
```bash
cd templates-backend
docker-compose up -d
```

### "Empty templates list"

**Sabab:** Backend'da ma'lumot yo'q
**Hal:**
```bash
docker-compose exec web python manage.py load_initial_data
```

### "CORS error"

**Sabab:** CORS sozlamalari noto'g'ri
**Hal:** Backend `settings.py` da CORS sozlangan

---

## 🎉 Natija

Frontend endi **to'liq backend bilan** ishlaydi:

- ✅ Real-time ma'lumotlar
- ✅ Loading states
- ✅ Error handling
- ✅ Fallback to static data
- ✅ Production ready!

**Test qiling:** http://localhost:3000 🚀
