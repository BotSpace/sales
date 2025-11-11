# ✅ OTP 8 Raqamga O'zgartirildi

## 🔢 Yangiliklar

OTP input maydoni **6 raqamdan 8 raqamga** o'zgartirildi.

### O'zgarishlar:

1. **OTP State:** `["", "", "", "", "", "", "", ""]` - 8 ta input
2. **Validation:** `otpCode.length !== 8` - 8 raqam kerak
3. **Auto-focus:** `index < 7` - oxirgi input
4. **Submit button:** Disabled until 8 digits

## 🎯 Ishlatish

### Demo Mode (NEXT_PUBLIC_DEMO_MODE=true)

```
Phone: 901234567
OTP: 12345678 (8 ta raqam, istalgan)
```

### Real Auth Mode (NEXT_PUBLIC_DEMO_MODE=false)

```
Phone: 901234567
OTP: 12345678 (8 ta raqam, haqiqiy parol)
```

## 📱 UI

```
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│  1  │  2  │  3  │  4  │  5  │  6  │  7  │  8  │
└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```

## ✅ Tayyor!

OTP endi 8 raqam qabul qiladi. Test qiling:

```bash
cd templates
npm run dev
```

http://localhost:3000/auth
