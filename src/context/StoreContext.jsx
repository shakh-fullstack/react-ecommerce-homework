import { useCallback, useEffect, useState } from "react";
import { products } from "../data/products";
import { initialOrders } from "../data/orders";
import { DEMO_ACCOUNTS } from "../data/accounts";
import { translations } from "../i18n/translations";
import { formatPrice } from "../utils/formatPrice";
import { hashPassword } from "../utils/hashPassword";
import { StoreContext } from "./store";

const STORAGE_KEYS = {
  cart: "texnobozor:cart",
  wishlist: "texnobozor:wishlist",
  compare: "texnobozor:compare",
  orders: "texnobozor:orders:v2",
  sold: "texnobozor:sold",
  customProducts: "texnobozor:customProducts",
  stockOverrides: "texnobozor:stockOverrides",
  priceOverrides: "texnobozor:priceOverrides",
  reviews: "texnobozor:reviews",
  accounts: "texnobozor:accounts:v2",
  session: "texnobozor:session",
  language: "texnobozor:language",
  theme: "texnobozor:theme",
};

const INITIAL_REVIEWS = {
  1: [
    {
      id: 1,
      author: "Javohir T.",
      rating: 5,
      comment: "Batareyasi kun bo‘yi bemalol yetadi, juda yengil va tez ishlaydi.",
      date: "2026-11-18",
    },
  ],
  2: [
    {
      id: 2,
      author: "Dilnoza M.",
      rating: 5,
      comment: "Shovqinni o‘chirish (ANC) funksiyasi a’lo darajada!",
      date: "2026-11-19",
    },
  ],
};

function readStorage(storage, key) {
  try {
    const saved = storage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

// useState + localStorage: qiymat o'zgarganda avtomatik saqlanadi
function usePersistentState(key, fallback) {
  const [value, setValue] = useState(
    () =>
      readStorage(localStorage, key) ??
      (typeof fallback === "function" ? fallback() : fallback)
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function getSystemTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function toPublicUser({ name, email, phone }) {
  return { name, email, phone };
}

export function StoreProvider({ children }) {
  // ---------- Til va mavzu ----------
  const [language, setLanguage] = usePersistentState(STORAGE_KEYS.language, "uz");
  const [theme, setTheme] = usePersistentState(STORAGE_KEYS.theme, getSystemTheme);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const t = (key, params = {}) => {
    const text = translations[language]?.[key] ?? translations.uz[key] ?? key;
    return text.replace(/\{(\w+)\}/g, (match, name) => params[name] ?? match);
  };

  const formatMoney = (amount) => formatPrice(amount, t("common.currency"));

  // ---------- localStorage'da saqlanadigan holatlar ----------
  const [cart, setCart] = usePersistentState(STORAGE_KEYS.cart, [
    { id: 2, quantity: 1 },
    { id: 3, quantity: 2 },
  ]);
  const [wishlist, setWishlist] = usePersistentState(STORAGE_KEYS.wishlist, [1, 3]);
  const [compareIds, setCompareIds] = usePersistentState(STORAGE_KEYS.compare, [1, 5]);
  const [orders, setOrders] = usePersistentState(STORAGE_KEYS.orders, initialOrders);
  const [sold, setSold] = usePersistentState(STORAGE_KEYS.sold, {});
  const [customProducts, setCustomProducts] = usePersistentState(
    STORAGE_KEYS.customProducts,
    []
  );
  const [stockOverrides, setStockOverrides] = usePersistentState(
    STORAGE_KEYS.stockOverrides,
    {}
  );
  const [priceOverrides, setPriceOverrides] = usePersistentState(
    STORAGE_KEYS.priceOverrides,
    {}
  );
  const [reviews, setReviews] = usePersistentState(STORAGE_KEYS.reviews, INITIAL_REVIEWS);
  const [accounts, setAccounts] = usePersistentState(STORAGE_KEYS.accounts, {});

  // ---------- Tanlangan buyurtma (Chek modal oynasi uchun) ----------
  const [selectedOrder, setSelectedOrder] = useState(null);

  // ---------- Sessiya ----------
  const [session, setSession] = useState(
    () =>
      readStorage(localStorage, STORAGE_KEYS.session) ??
      readStorage(sessionStorage, STORAGE_KEYS.session)
  );

  useEffect(() => {
    localStorage.removeItem(STORAGE_KEYS.session);
    sessionStorage.removeItem(STORAGE_KEYS.session);
    if (!session) return;

    const storage = session.remember ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
  }, [session]);

  const user = session?.user ?? null;

  // ---------- Filtrlar ----------
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [onlyWishlist, setOnlyWishlist] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  const resetFilters = () => {
    setSearchQuery("");
    setCategory("all");
    setOnlyWishlist(false);
    setOnlyInStock(false);
    setSortBy("default");
  };

  // ---------- Bildirishnoma (toast) ----------
  const [notice, setNotice] = useState(null);
  const showNotice = useCallback(
    (key, params) => setNotice({ id: Date.now(), key, params }),
    []
  );
  const hideNotice = useCallback(() => setNotice(null), []);

  // ---------- Katalog (standart + admin qo'shgan mahsulotlar) ----------
  const allProducts = [...products, ...customProducts];

  const catalog = allProducts.map((product) => {
    const baseStock = stockOverrides[product.id] ?? product.stock;
    const currentPrice = priceOverrides[product.id] ?? product.price;
    const specsText =
      typeof product.specs === "object"
        ? product.specs[language] ?? product.specs.uz
        : product.specs;

    return {
      ...product,
      price: currentPrice,
      specs: specsText,
      categoryLabel: t(`category.${product.category}`),
      stock: Math.max(baseStock - (sold[product.id] ?? 0), 0),
    };
  });

  const findProduct = (id) => catalog.find((product) => product.id === Number(id));

  // ---------- Admin / Ombor boshqaruvi ----------
  const adjustStock = (id, delta) => {
    const product = findProduct(id);
    if (!product) return;

    const currentSold = sold[id] ?? 0;
    const nextStock = Math.max(product.stock + delta, 0);
    setStockOverrides((prev) => ({ ...prev, [id]: nextStock + currentSold }));
  };

  const updateProductPrice = (id, newPrice) => {
    const numeric = Math.max(Number(newPrice) || 0, 1000);
    setPriceOverrides((prev) => ({ ...prev, [id]: numeric }));
  };

  const addProduct = ({ title, category: cat, price, stock, specs, icon }) => {
    const maxId = allProducts.reduce((max, p) => Math.max(max, p.id), 0);
    const newProd = {
      id: maxId + 1,
      title: title.trim(),
      category: cat,
      price: Math.max(Number(price) || 0, 1000),
      stock: Math.max(Number(stock) || 0, 0),
      rating: "5.0",
      icon: icon || "laptop",
      specs: {
        uz: specs.trim(),
        ru: specs.trim(),
        en: specs.trim(),
      },
    };
    setCustomProducts((prev) => [...prev, newProd]);
    return newProd;
  };

  const resetInventory = () => {
    setSold({});
    setStockOverrides({});
    setPriceOverrides({});
    setCustomProducts([]);
  };

  // ---------- Sharhlar ----------
  const getProductReviews = (productId) => reviews[productId] ?? [];

  const addReview = (productId, { author, rating, comment }) => {
    const entry = {
      id: Date.now(),
      author: author.trim(),
      rating: Number(rating) || 5,
      comment: comment.trim(),
      date: new Date().toISOString().slice(0, 10),
    };
    setReviews((prev) => ({
      ...prev,
      [productId]: [entry, ...(prev[productId] ?? [])],
    }));
  };

  // ---------- Sevimlilar ----------
  const isInWishlist = (id) => wishlist.includes(id);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // ---------- Taqqoslash (maksimum 4 ta) ----------
  const isInCompare = (id) => compareIds.includes(id);

  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((itemId) => itemId !== id);
      if (prev.length >= 4) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const clearCompare = () => setCompareIds([]);

  const compareItems = compareIds.map(findProduct).filter(Boolean);

  // ---------- Savat ----------
  const cartItems = cart
    .map((entry) => {
      const product = findProduct(entry.id);
      if (!product) return null;

      const quantity = Math.min(entry.quantity, product.stock);
      return { ...product, quantity, subtotal: product.price * quantity };
    })
    .filter((item) => item && item.quantity > 0);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const getCartQuantity = (id) =>
    cartItems.find((item) => item.id === id)?.quantity ?? 0;

  const addToCart = (id) => {
    const product = findProduct(id);
    if (!product || product.stock === 0) return;

    setCart((prev) => {
      const existing = prev.find((entry) => entry.id === id);

      if (!existing) return [...prev, { id, quantity: 1 }];
      if (existing.quantity >= product.stock) return prev;

      return prev.map((entry) =>
        entry.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry
      );
    });
  };

  const decreaseQuantity = (id) => {
    const stock = findProduct(id)?.stock ?? 0;

    setCart((prev) =>
      prev
        .map((entry) =>
          entry.id === id
            ? { ...entry, quantity: Math.min(entry.quantity, stock) - 1 }
            : entry
        )
        .filter((entry) => entry.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((entry) => entry.id !== id));
  };

  const clearCart = () => setCart([]);

  // ---------- Buyurtmalar ----------
  const placeOrder = ({ customer, phone, delivery, total, installmentMonths = 0 }) => {
    const lastNumber = orders.reduce((max, order) => {
      const number = Number(String(order.id).replace("#", ""));
      return Number.isFinite(number) ? Math.max(max, number) : max;
    }, 1000);

    const purchasedItems = cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    }));

    const newOrder = {
      id: `#${lastNumber + 1}`,
      customer,
      phone,
      items: purchasedItems,
      itemsSummary: cartItems.map((item) => `${item.title} (${item.quantity}x)`).join(", "),
      delivery,
      installmentMonths,
      status: "accepted",
      total,
      userEmail: user?.email ?? null,
    };

    setSold((prev) =>
      cartItems.reduce(
        (acc, item) => ({ ...acc, [item.id]: (acc[item.id] ?? 0) + item.quantity }),
        prev
      )
    );
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    return newOrder;
  };

  // Buyurtmani bekor qilish va mahsulotlarni omborga qaytarish
  const cancelOrder = (orderId) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target || target.status === "canceled") return;

    if (Array.isArray(target.items)) {
      setSold((prev) => {
        const next = { ...prev };
        target.items.forEach((item) => {
          next[item.id] = Math.max((next[item.id] ?? 0) - item.quantity, 0);
        });
        return next;
      });
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "canceled" } : order
      )
    );
    setSelectedOrder((prev) =>
      prev && prev.id === orderId ? { ...prev, status: "canceled" } : prev
    );
    showNotice("notice.orderCanceled", { id: orderId });
  };

  // ---------- Foydalanuvchi ----------
  const findAccount = (email) => accounts[email] ?? DEMO_ACCOUNTS[email];

  const login = async ({ email, password, remember }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = findAccount(normalizedEmail);
    if (!account) return { error: "errors.accountNotFound" };

    try {
      const passwordHash = await hashPassword(password);
      if (passwordHash !== account.passwordHash) return { error: "errors.wrongPassword" };
    } catch {
      return { error: "errors.unexpected" };
    }

    const loggedUser = toPublicUser(account);
    setSession({ user: loggedUser, remember });
    return { user: loggedUser };
  };

  const register = async ({ name, email, phone, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (findAccount(normalizedEmail)) return { error: "errors.emailTaken" };

    let passwordHash;
    try {
      passwordHash = await hashPassword(password);
    } catch {
      return { error: "errors.unexpected" };
    }

    const account = {
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      passwordHash,
    };

    setAccounts((prev) => ({ ...prev, [normalizedEmail]: account }));

    const newUser = toPublicUser(account);
    setSession({ user: newUser, remember: true });
    return { user: newUser };
  };

  const logout = () => setSession(null);

  const value = {
    // til va mavzu
    language,
    setLanguage,
    t,
    formatMoney,
    theme,
    toggleTheme,

    // filtrlar
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    onlyWishlist,
    setOnlyWishlist,
    onlyInStock,
    setOnlyInStock,
    sortBy,
    setSortBy,
    resetFilters,

    // katalog, sevimlilar, taqqoslash, sharhlar
    catalog,
    findProduct,
    wishlist,
    isInWishlist,
    toggleWishlist,
    compareIds,
    compareItems,
    isInCompare,
    toggleCompare,
    clearCompare,
    getProductReviews,
    addReview,

    // admin / ombor
    adjustStock,
    updateProductPrice,
    addProduct,
    resetInventory,

    // savat
    cartItems,
    cartCount,
    cartTotal,
    getCartQuantity,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,

    // buyurtmalar
    orders,
    placeOrder,
    cancelOrder,
    selectedOrder,
    setSelectedOrder,

    // foydalanuvchi
    user,
    login,
    register,
    logout,

    // bildirishnoma
    notice,
    showNotice,
    hideNotice,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
