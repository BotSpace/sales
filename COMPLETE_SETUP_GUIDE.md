# 🎉 FRONTEND + BACKEND TO'LIQ SETUP QILINDI!

## ✅ Nima Tayyor

### Backend (Django)
- ✅ PostgreSQL + Redis + Django
- ✅ 4 ta app (Users, Categories, Templates, Purchases)
- ✅ 7 ta database model
- ✅ 20+ API endpoints
- ✅ Django Unfold admin panel
- ✅ External JWT authentication
- ✅ Docker containerization

### Frontend (Next.js)
- ✅ Next.js 16 + React 19
- ✅ Tailwind CSS 4
- ✅ 3 til (UZ, RU, EN)
- ✅ Authentication flow
- ✅ Template marketplace
- ✅ Profile management
- ✅ Backend API integration

## 🚀 ISHGA TUSHIRISH

### 1️⃣ Backend'ni Ishga Tushirish

```bash
# Backend papkasiga o'ting
cd templates-backend

# Docker containerlarni ishga tushiring
docker-compose up -d

# Loglarni ko'ring (ixtiyoriy)
docker-compose logs -f web

# Boshlang'ich ma'lumotlarni yuklang
docker-compose exec web python manage.py load_initial_data
```

**Backend manzillari:**
- API: http://localhost:8000/api
- Admin: http://localhost:8000/admin (admin/admin)

### 2️⃣ Frontend'ni Ishga Tushirish

```bash
# Frontend papkasiga o'ting (yangi terminal ochib)
cd templates

# Dependencies'larni install qiling (agar kerak bo'lsa)
npm install

# Development server'ni ishga tushiring
npm run dev
```

**Frontend manzili:**
- Web: http://localhost:3000

## 🧪 TEST QILISH

### 1. Backend API Test

```bash
# Kategoriyalarni olish
curl http://localhost:8000/api/categories/

# Shablonlarni olish
curl http://localhost:8000/api/templates/
```

### 2. Admin Panel

1. Brauzerda oching: http://localhost:8000/admin
2. Login: `admin`
3. Password: `admin`
4. **⚠️ Darhol parolni o'zgartiring!**

### 3. Frontend Test

1. Brauzerda oching: http://localhost:3000
2. Shablonlarni ko'ring
3. Kategoriyalarni filtr qiling
4. Search qiling

### 4. Login Test (Backend orqali)

Backend'da test user yarating:

```bash
docker-compose exec web python manage.py shell
```

Python shell'da:
```python
from apps.users.models import User
user = User.objects.create(
    phone='998901234567',
    first_name='John',
    last_name='Doe',
    email='john@example.com'
)
print(f"User created: {user.phone}")
exit()
```

Keyin frontend'da:
1. http://localhost:3000/auth ga boring
2. Phone: `901234567` (998 olmay)
3. OTP: Istalgan 6 raqam (masalan: `123456`)
4. Login bo'ladi va profile'ga yo'naltiriladi

## 📁 Loyiha Strukturasi

```
botmother/
├── templates/                  # Frontend (Next.js)
│   ├── app/
│   │   ├── components/        # React components
│   │   ├── contexts/          # React contexts
│   │   ├── hooks/             # Custom hooks
│   │   ├── lib/               # Utilities
│   │   ├── utils/             # API client
│   │   ├── services/          # Business logic
│   │   └── auth/              # Auth page
│   ├── .env.local             # Frontend env
│   └── package.json
│
└── templates-backend/         # Backend (Django)
    ├── apps/
    │   ├── users/             # User management
    │   ├── categories/        # Categories
    │   ├── templates/         # Templates
    │   └── purchases/         # Purchases
    ├── config/                # Django settings
    ├── docker-compose.yml     # Docker config
    └── .env                   # Backend env
```

## 🔌 API Integration

### Frontend → Backend

Frontend `.env.local` faylidagi API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### API Client Ishlatish

```typescript
import api from '@/app/utils/api';

// Login
const { access } = await api.login('998901234567', 'password');

// Get templates
const templates = await api.getTemplates();

// Get user info
const user = await api.getMe(token);
```

## 🔐 Authentication Flow

```
1. User frontend'da login qiladi
   ↓
2. Frontend backend'ga request yuboradi
   ↓
3. Backend external auth service'ga yo'naltiradi
   ↓
4. JWT token qaytadi
   ↓
5. Frontend token'ni localStorage'ga saqlaydi
   ↓
6. Har bir API request'da token yuboriladi
   ↓
7. Backend token'ni verify qiladi
   ↓
8. User ma'lumotlari qaytariladi
```

## 📊 Ma'lumotlar Oqimi

### Static → Dynamic (Asta-sekin migratsiya)

**Hozir:**
- Templates: Static data (app/data/templates.ts)
- Categories: Static data
- User auth: Backend API ✅
- Profile: Backend API ✅

**Keyingi bosqich:**
- Templates: Backend'dan olish
- Purchases: Backend CRUD
- Bot setup: Backend integration
- Reviews: Backend API

## 🛠️ Development Commands

### Backend

```bash
# Containerlarni restart qilish
docker-compose restart

# Loglarni ko'rish
docker-compose logs -f web

# Django shell
docker-compose exec web python manage.py shell

# Database reset (⚠️ barcha ma'lumotlarni o'chiradi)
docker-compose down -v
docker-compose up -d
```

### Frontend

```bash
# Dev server
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

## 🐞 Troubleshooting

### Backend ishlamasa

```bash
# Container status
docker-compose ps

# Container loglarni tekshiring
docker-compose logs web
docker-compose logs db
docker-compose logs redis

# Qayta ishga tushiring
docker-compose restart
```

### Frontend backend'ga ulana olmasa

1. Backend ishlab turganini tekshiring: http://localhost:8000/api/
2. `.env.local` faylni tekshiring
3. Browser console'ni tekshiring (F12)
4. CORS xatoligi bo'lsa, backend'da CORS settings'ni tekshiring

### Login ishlamasa

1. Backend'da user mavjudligini tekshiring
2. Phone format to'g'ri ekanini tekshiring (`998` olmay)
3. External auth service ishlayotganini tekshiring
4. Browser console'da xatoliklarni tekshiring

## 📝 Keyingi Bosqichlar

### Must-Do (Zarur)

- [ ] Admin parolini o'zgartirish
- [ ] Production SECRET_KEY yaratish
- [ ] Templates'ni backend'dan olish
- [ ] Checkout flow'ni yakunlash
- [ ] Bot setup'ni tugatish

### Nice-to-Have (Qo'shimcha)

- [ ] Real OTP system
- [ ] Email notifications
- [ ] File upload (template images)
- [ ] Search optimization
- [ ] Caching qo'shish
- [ ] Error boundaries
- [ ] Loading states

## 🎯 Production Checklist

### Backend

- [ ] DEBUG=False
- [ ] Strong SECRET_KEY
- [ ] Allowed hosts to'g'ri
- [ ] PostgreSQL production settings
- [ ] Redis production config
- [ ] Static files collection
- [ ] Media files storage (S3, etc)
- [ ] HTTPS setup
- [ ] Backup strategy

### Frontend

- [ ] Environment variables production
- [ ] API URL production
- [ ] Build optimization
- [ ] Image optimization
- [ ] SEO meta tags
- [ ] Analytics
- [ ] Error tracking
- [ ] CDN setup

## 🎉 Tayyor!

Ikkala loyiha ham to'liq ishlaydigan holatda!

### Tezkor boshlanish:

**Terminal 1 (Backend):**
```bash
cd templates-backend && docker-compose up
```

**Terminal 2 (Frontend):**
```bash
cd templates && npm run dev
```

**Browser:**
- Frontend: http://localhost:3000
- Admin: http://localhost:8000/admin

---

**Muvaffaqiyatlar! 🚀**
