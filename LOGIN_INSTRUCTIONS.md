# 🔐 Login Ko'rsatmalari

## ⚠️ Muhim Ma'lumot

Hozirda login **haqiqiy external auth service** bilan ishlaydi:
- **URL:** https://botlarnionasi.jscorp.uz/auth/token/
- **Format:** `{"phone": "998...", "password": "..."}`
- **Response:** `{"key": "jwt_token"}`

## 🧪 Test Login

### Variant 1: Haqiqiy Foydalanuvchi

Agar sizda haqiqiy akkaunt bo'lsa:
1. Phone: `901234567` (998 olmay)
2. Password: Haqiqiy parolingiz

### Variant 2: Demo Mode (Development)

Agar test qilmoqchi bo'lsangiz, frontend'da demo mode qo'shish kerak.

## 🛠️ Demo Mode Qo'shish

Keling, development uchun demo mode qo'shamiz:

### 1. Demo Login Option

```typescript
// app/auth/page.tsx
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

// Demo credentials
const DEMO_PHONE = '901234567';
const DEMO_PASSWORD = '123456';

if (DEMO_MODE && phone === DEMO_PHONE && password === DEMO_PASSWORD) {
  // Use mock auth
  const mockToken = 'demo_token_12345';
  const mockUser = {
    id: 1,
    phone: '998901234567',
    first_name: 'Demo',
    last_name: 'User',
    email: 'demo@example.com'
  };
  
  loginUser(mockToken, mockUser);
  window.location.href = '/';
  return;
}
```

### 2. Environment Variable

`.env.local`:
```env
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## 🔍 Debug

Brauzer console'da ko'ring:
```
1. Login attempt with: {phone, password}
2. Login response: {status, body}
3. Token received: ...
4. Me response: {status, body}
5. User data: {...}
```

## 📝 Xatoliklarni Tuzatish

### "Login failed" - 401 Unauthorized
- ✅ Phone format to'g'ri: `998...` (11 raqam)
- ✅ Password to'g'ri
- ✅ External service ishlayapti

### "Failed to get user data" - 401
- ✅ Token noto'g'ri
- ✅ Token expired

### Network Error
- ✅ Internet bor
- ✅ CORS issue (backend CORS sozlamalari)

## 🚀 Production Login

Production'da:
1. Real OTP system kerak
2. External service `/auth/token/` endpoint
3. Valid JWT token
4. User data from `/auth/me/`

---

**Hozircha:** Real external auth service ishlatilmoqda.
**Agar:** Test qilmoqchi bo'lsangiz, demo mode qo'shing.
