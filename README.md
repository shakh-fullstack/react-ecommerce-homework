# TexnoBozor

Zamonaviy texnika do‘koni — **React 19 + Vite + React Router v7** da yozilgan o‘quv loyiha.
Backend yo‘q: barcha ma’lumotlar brauzerning `localStorage` xotirasida saqlanadi.

## Ishga tushirish

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build
npm run lint     # ESLint tekshiruvi
```

## Imkoniyatlar

- Mahsulotlar katalogi: kategoriya, real vaqtdagi qidiruv, "Faqat sevimlilar" filtri, narx bo‘yicha saralash
- Sevimlilar (yurakcha) va savat (`−` / `+`, o‘chirish, tozalash, ombor chegarasi)
- Buyurtma rasmiylashtirish: promo kod, yetkazib berish turi, ism va telefon tekshiruvi
- Buyurtma berilganda ombordagi son kamayadi
- Ro‘yxatdan o‘tish, kirish, "Meni eslab qol", chiqish, profil sahifasi (`/profile`)
- 3 ta til: o‘zbekcha, ruscha, inglizcha
- Kunduzgi va tungi rejim (dark mode)
- 404 sahifasi va xatolik sahifasi

## Demo ma’lumotlar

| Nima        | Qiymat                            |
| ----------- | --------------------------------- |
| Demo hisob  | `azizbek@example.com` / `123456`  |
| Promo kod   | `SALE10` — 10% chegirma           |

## Loyiha tuzilishi

```
src/
├── components/      # Header, ProductCard, CartSummary va boshqa UI bo‘laklari
├── context/
│   ├── StoreContext.jsx   # StoreProvider — barcha umumiy holat va mantiq
│   └── store.js           # useStore() hooki
├── data/            # products, orders, demo hisob
├── i18n/            # tarjimalar (uz, ru, en)
├── layouts/         # Layout (Header + Outlet + bildirishnoma)
├── pages/           # Home, Cart, Login, Register, Profile, 404
├── router/          # createBrowserRouter sozlamasi
└── utils/           # formatPrice, validators, hashPassword
```

## Ma’lumotlarni tozalash

Brauzer DevTools → **Application → Local Storage** bo‘limidan `texnobozor:*` kalitlarini o‘chiring.
Shunda savat, buyurtmalar, ombor soni va hisoblar boshlang‘ich holatga qaytadi.

> **Eslatma:** parollar SHA-256 xesh ko‘rinishida saqlanadi, lekin bu faqat demo uchun.
> Haqiqiy loyihada autentifikatsiya serverda bo‘lishi kerak.
