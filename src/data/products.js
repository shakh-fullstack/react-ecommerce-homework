// Kategoriya kalitlari — ekranda t(`category.${key}`) orqali tarjima qilinadi
export const CATEGORIES = ["all", "laptops", "audio", "accessories"];

// Narxlar raqam ko'rinishida. stock — boshlang'ich ombor soni
// (sotilganlari StoreContext'da ayirib hisoblanadi).
export const products = [
  {
    id: 1,
    title: 'MacBook Air M2 13"',
    category: "laptops",
    specs: {
      uz: "8GB RAM • 256GB SSD • Space Gray",
      ru: "8 ГБ ОЗУ • 256 ГБ SSD • Space Gray",
      en: "8GB RAM • 256GB SSD • Space Gray",
    },
    price: 12400000,
    rating: "4.9",
    stock: 5,
    icon: "laptop",
  },
  {
    id: 2,
    title: "Sony WH-1000XM5",
    category: "audio",
    specs: {
      uz: "Active Noise Cancelling • 30 soat batareya",
      ru: "Активное шумоподавление • 30 часов работы",
      en: "Active Noise Cancelling • 30-hour battery",
    },
    price: 4200000,
    rating: "4.8",
    stock: 2,
    icon: "headphones",
  },
  {
    id: 3,
    title: "Keychron K2 Pro",
    category: "accessories",
    specs: {
      uz: "Mexanik klaviatura • Bluetooth / USB-C",
      ru: "Механическая клавиатура • Bluetooth / USB-C",
      en: "Mechanical keyboard • Bluetooth / USB-C",
    },
    price: 1350000,
    rating: "4.7",
    stock: 8,
    icon: "keyboard",
  },
  {
    id: 4,
    title: "Apple Watch Series 9",
    category: "accessories",
    specs: {
      uz: "45mm Aluminium • GPS • Midnight",
      ru: "45 мм, алюминий • GPS • Midnight",
      en: "45mm Aluminium • GPS • Midnight",
    },
    price: 5100000,
    rating: "4.8",
    stock: 4,
    icon: "watch",
  },
  {
    id: 5,
    title: "ASUS Zenbook 14 OLED",
    category: "laptops",
    specs: {
      uz: "16GB RAM • 512GB SSD • Core Ultra 5",
      ru: "16 ГБ ОЗУ • 512 ГБ SSD • Core Ultra 5",
      en: "16GB RAM • 512GB SSD • Core Ultra 5",
    },
    price: 10800000,
    rating: "4.7",
    stock: 0,
    icon: "laptop",
  },
  {
    id: 6,
    title: "Logitech MX Master 3S",
    category: "accessories",
    specs: {
      uz: "8000 DPI • Ovozsiz klik • Simsiz",
      ru: "8000 DPI • Тихий клик • Беспроводная",
      en: "8000 DPI • Silent Click • Wireless",
    },
    price: 1180000,
    rating: "4.9",
    stock: 6,
    icon: "mouse",
  },
];
