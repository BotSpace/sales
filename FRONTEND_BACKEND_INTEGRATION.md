# Frontend-Backend Integration Guide

## ✅ Nima Qilindi

### 1. Environment Variables (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_AUTH_TOKEN_URL=https://botlarnionasi.jscorp.uz/auth/token/
NEXT_PUBLIC_AUTH_ME_URL=https://botlarnionasi.jscorp.uz/auth/me/
```

### 2. API Client (app/utils/api.ts)
- ✅ Barcha backend endpoints uchun client yaratildi
- ✅ Token-based authentication qo'llab-quvvatlaydi
- ✅ Xatoliklarni boshqaradi

### 3. Authentication Yangilandi
- ✅ `app/lib/auth.ts` - Token va user ma'lumotlarini saqlash
- ✅ `app/hooks/useAuth.ts` - Backend bilan ishlash
- ✅ `app/auth/page.tsx` - Backend API orqali login

### 4. Template Service (app/services/templateService.ts)
- ✅ Backend'dan ma'lumot olish
- ✅ Xatolik bo'lsa static data ishlatish
- ✅ Caching va optimization

### 5. Komponentlar Yangilandi
- ✅ Navbar - full_name ko'rsatish
- ✅ Profile - backend API bilan ishlash
- ✅ Auth - real JWT authentication

## 🚀 Ishlatish

### 1. Backend'ni ishga tushiring
```bash
cd templates-backend
docker-compose up -d
```

### 2. Frontend'ni ishga tushiring
```bash
cd templates
npm run dev
```

### 3. Test qiling
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **Admin**: http://localhost:8000/admin

## 🔑 Login Test

Backend'da test user yaratish:
```bash
cd templates-backend
docker-compose exec web python manage.py shell
```

```python
# User yaratish
from apps.users.models import User
user = User.objects.create(
    phone='998901234567',
    first_name='Test',
    last_name='User',
    email='test@example.com'
)
```

Keyin frontendda:
- Phone: `901234567`
- Password: OTP kod (6 raqam, masalan: `123456`)

## 📝 Keyingi Qadamlar

1. Templates page'ni backend bilan ulash
2. Checkout flow'ni to'liq integratsiya qilish
3. Bot setup'ni backend API bilan bog'lash
4. Image upload'ni sozlash
5. Real-time updates qo'shish

## ⚠️ Eslatma

Hozircha OTP kod sifatida password ishlatilmoqda. Real production'da:
1. Backend OTP yuborish kerak
2. Frontend OTP ni verify qilish kerak
3. Keyin JWT token olish kerak
