import { createContext, useContext } from "react";

export const StoreContext = createContext(null);

// Har qanday komponentda: const { cart, addToCart } = useStore();
export function useStore() {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("useStore faqat StoreProvider ichida ishlatilishi mumkin");
  }

  return store;
}
