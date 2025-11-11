# ✅ YANGILANGAN AUTH FLOW

## 🔐 Authentication Arxitekturasi

### Frontend → External Auth Service (Direct)

```
┌─────────────────────────────────────────────────────────────┐
│                      AUTHENTICATION                          │
└─────────────────────────────────────────────────────────────┘

Frontend (Next.js)
    │
    │ 1. Login Request
    ├──────────────────────────────────────────────┐
    │                                               │
    ▼                                               ▼
External Auth Service                    Backend (Django)
(botlarnionasi.jscorp.uz)                         │
    │                                               │
    │ 2. POST /auth/token/                         │
    │    {phone, password}                         │
    │                                               │
    ▼                                               │
Returns JWT token                                  │
{                                                  │
  "key": "jwt_token_here"                         │
}                                                  │
    │                                               │
    │ 3. GET /auth/me/                             │
    │    Authorization: Bearer {token}             │
    │                                               │
    ▼                                               │
Returns User Data                                  │
{                                                  │
  "id": 123,                                      │
  "phone": "998901234567",                        │
  "first_name": "John",                           │
  "last_name": "Doe"                              │
}                                                  │
    │                                               │
    └───────────────────────────────────────────────┘
                        │
                        ▼
            Frontend stores:
            - Token in localStorage
            - User data in localStorage
```

### Backend API Requests (With JWT)

```
Frontend
    │
    │ API Request (Templates, Purchases, etc)
    │ Authorization: Bearer {jwt_token}
    │
    ▼
Backend (Django)
    │
    │ 1. Verify token with External Auth Service
    │    GET https://botlarnionasi.jscorp.uz/auth/me/
    │    Authorization: Bearer {token}
    │
    ▼
External Auth returns user data
    │
    ▼
Backend creates/updates local User
    │
    ▼
Backend processes request
    │
    ▼
Returns response to Frontend
```

## 🔑 Login Flow (Updated)

### Frontend Code (`app/auth/page.tsx`)

```typescript
// 1. User enters phone and OTP
const fullPhone = `998${phone}`;
const password = otpCode; // OTP as password

// 2. Call external auth service DIRECTLY
const loginResponse = await fetch('https://botlarnionasi.jscorp.uz/auth/token/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phone: fullPhone, password })
});

const { key } = await loginResponse.json(); // JWT token

// 3. Get user data from external service
const meResponse = await fetch('https://botlarnionasi.jscorp.uz/auth/me/', {
  headers: { 'Authorization': `Bearer ${key}` }
});

const userData = await meResponse.json();

// 4. Save to localStorage
loginUser(key, userData);
```

## 🗄️ Backend Logic

### Authentication (`apps/users/authentication.py`)

Backend faqat tokenni verify qiladi:

```python
def authenticate(self, request):
    # 1. Extract token from header
    token = request.META.get('HTTP_AUTHORIZATION')
    
    # 2. Verify with external service
    response = requests.get(
        'https://botlarnionasi.jscorp.uz/auth/me/',
        headers={'Authorization': f'Bearer {token}'}
    )
    
    # 3. Create/update local user
    user_data = response.json()
    user = User.objects.get_or_create(
        external_id=user_data['id'],
        defaults={'phone': user_data['phone'], ...}
    )
    
    return (user, token)
```

### No Login Endpoint in Backend

Backend'da login endpoint YO'Q chunki:
- ✅ Login tashqi service orqali
- ✅ Backend faqat token verify qiladi
- ✅ Backend faqat business logic (templates, purchases)

## 📡 API Endpoints

### External Auth Service (Direct from Frontend)

- `POST /auth/token/` - Login, returns `{key: "jwt_token"}`
- `GET /auth/me/` - Get user info with Bearer token

### Backend API (Requires JWT)

**Templates:**
- `GET /api/templates/` - List templates
- `GET /api/templates/{id}/` - Template detail
- `GET /api/templates/featured/` - Featured templates
- `POST /api/templates/{id}/review/` - Add review (auth required)

**Purchases:**
- `GET /api/purchases/` - User purchases (auth required)
- `POST /api/purchases/` - Create purchase (auth required)
- `PATCH /api/purchases/{id}/update_bot_info/` - Update bot (auth required)
- `POST /api/purchases/{id}/complete_payment/` - Complete payment (auth required)
- `GET /api/purchases/stats/` - Statistics (auth required)

**Categories:**
- `GET /api/categories/` - List categories

## ✅ O'zgarishlar

### Frontend
- ✅ `app/auth/page.tsx` - To'g'ridan-to'g'ri external API
- ✅ `app/utils/api.ts` - Auth endpoints olib tashlandi
- ✅ Token format: `key` (not `access`)

### Backend
- ✅ `apps/users/urls.py` - Login endpoints o'chirildi
- ✅ `apps/users/authentication.py` - Faqat token verification
- ✅ User auto-creation by external_id

## 🧪 Test

### 1. Login Test

```bash
# External service'ga to'g'ridan-to'g'ri
curl -X POST https://botlarnionasi.jscorp.uz/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"phone": "998901234567", "password": "123456"}'

# Response:
# {"key": "your_jwt_token_here"}
```

### 2. Get User Info

```bash
curl -X GET https://botlarnionasi.jscorp.uz/auth/me/ \
  -H "Authorization: Bearer your_jwt_token_here"

# Response:
# {"id": 123, "phone": "998901234567", "first_name": "John", ...}
```

### 3. Backend API

```bash
# Templates (no auth needed)
curl http://localhost:8000/api/templates/

# Purchases (auth required)
curl http://localhost:8000/api/purchases/ \
  -H "Authorization: Bearer your_jwt_token_here"
```

## 📝 Keyingi Qadamlar

1. ✅ Auth to'g'ridan-to'g'ri external service
2. 🔄 Backend templates integration
3. 🔄 Checkout flow
4. 🔄 Bot setup integration
5. 🔄 Purchase management

---

**Auth endi to'liq tashqi service orqali ishlaydi! ✅**
