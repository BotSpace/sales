# 🎭 DEMO MODE YOQILDI!

## ✅ Nima Qilindi

Frontend'da **Demo Mode** qo'shildi. Bu sizga haqiqiy auth service'siz test qilish imkonini beradi.

## 🔧 Konfiguratsiya

### `.env.local` faylidagi sozlama:

```env
# Demo mode - development uchun
NEXT_PUBLIC_DEMO_MODE=true
```

### Sozlamalarni o'zgartirish:

**Demo mode'ni yoqish:**
```env
NEXT_PUBLIC_DEMO_MODE=true
```

**Real auth'ni ishlatish:**
```env
NEXT_PUBLIC_DEMO_MODE=false
# yoki bu qatorni o'chiring
```

## 🧪 Demo Login

Demo mode yoqilganda:

1. **Phone:** Istalgan raqam (masalan: `901234567`)
2. **OTP:** Istalgan 6 raqam (masalan: `123456`)
3. **Natija:** Avtomatik login (mock user bilan)

### Mock User Ma'lumotlari:

```json
{
  "id": 1,
  "phone": "998901234567",
  "first_name": "Demo",
  "last_name": "User",
  "email": "demo@example.com",
  "full_name": "Demo User"
}
```

## 📝 Qanday Ishlaydi

### Demo Mode ON (`NEXT_PUBLIC_DEMO_MODE=true`)

```typescript
// 1. User login qiladi
Phone: 901234567
OTP: 123456

// 2. Frontend mock auth ishlatadi
console.log('🎭 Demo Mode: Using mock authentication');

// 3. Mock token yaratadi
const mockToken = 'demo_jwt_token_' + Date.now();

// 4. Mock user data
const mockUser = {
  id: 1,
  phone: '998901234567',
  first_name: 'Demo',
  last_name: 'User',
  ...
};

// 5. Save va redirect
localStorage.setItem('auth_token', mockToken);
window.location.href = '/';
```

### Demo Mode OFF (Real Auth)

```typescript
// 1. User login qiladi
Phone: 901234567
Password: haqiqiy_parol

// 2. External auth service chaqiriladi
const response = await fetch(
  'https://botlarnionasi.jscorp.uz/auth/token/',
  { phone: '998901234567', password: 'haqiqiy_parol' }
);

// 3. Real JWT token
const { key } = await response.json();

// 4. Real user data
const userData = await fetch('/auth/me/');

// 5. Save va redirect
```

## 🎯 Ishlatish

### Development (Demo Mode)

```bash
# .env.local da
NEXT_PUBLIC_DEMO_MODE=true

# Terminal
cd templates
npm run dev

# Browser
http://localhost:3000/auth
Phone: 901234567
OTP: 123456
```

✅ **Natija:** Darhol login bo'lasiz!

### Production (Real Auth)

```bash
# .env.local da
NEXT_PUBLIC_DEMO_MODE=false

# yoki .env.production
NEXT_PUBLIC_DEMO_MODE=false

# Real credentials kerak
Phone: haqiqiy_telefon
Password: haqiqiy_parol
```

## 🔍 Console Loglari

### Demo Mode

```
🎭 Demo Mode: Using mock authentication
✅ Demo login successful: {id: 1, phone: "998901234567", ...}
✅ Login successful, redirecting...
```

### Real Auth

```
🔐 Attempting real login with: {phone: "998...", password: "***"}
Login response: {status: 200, body: "..."}
✅ Token received, getting user data...
Me response: {status: 200, body: "..."}
✅ User data received: {...}
✅ Login successful, redirecting...
```

## ⚙️ Backend Integration

Demo mode faqat **frontend**da ishlaydi:

- ✅ Login: Demo mode
- ✅ Profile: Real backend API
- ✅ Purchases: Real backend API
- ✅ Templates: Real backend API

Backend har doim **real** ma'lumotlar bilan ishlaydi!

## 🚨 Muhim

### Demo Mode Faqat Development Uchun!

**Ishlatish:**
- ✅ Local development
- ✅ Testing
- ✅ Demo presentations

**Ishlatmaslik:**
- ❌ Production
- ❌ Staging
- ❌ Real users

### Production'da:

```env
# Production .env
NEXT_PUBLIC_DEMO_MODE=false  # yoki yo'q

# Yoki .env.production
# Demo mode o'chirish
```

## 📊 Sozlamalar

| Muhit | Demo Mode | Auth Service |
|-------|-----------|--------------|
| Development | `true` | Mock |
| Testing | `true` | Mock |
| Staging | `false` | Real |
| Production | `false` | Real |

## 🎉 Afzalliklari

1. **Tez test qilish** - Haqiqiy credentials kerak emas
2. **Offline ishlash** - Internet kerak emas
3. **Debug qulayligi** - Mock data bilan test
4. **Development speed** - Tezroq development

## ⚠️ Cheklovlar

1. Real user data yo'q
2. Token expire qilmaydi
3. Backend validation yo'q
4. Production uchun emas

---

## 🚀 Qisqacha

**Demo Mode ON:**
```bash
# .env.local
NEXT_PUBLIC_DEMO_MODE=true

# Login
Phone: 901234567
OTP: 123456 (istalgan)
✅ Darhol kiradi!
```

**Demo Mode OFF:**
```bash
# .env.local
NEXT_PUBLIC_DEMO_MODE=false

# Login
Phone: 901234567 (haqiqiy)
Password: haqiqiy_parol
✅ Real auth service
```

---

**Hozir:** Demo mode yoqilgan! Test qiling! 🎭
