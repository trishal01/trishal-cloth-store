import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      const stock = product.quantity;

      if (existingItem) {
        const currentQty = existingItem.cartQty || 1; // 🔥 fallback

        if (currentQty >= stock) {
          alert("Cannot add more than available stock");
          return prev;
        }

        return prev.map((item) =>
          item.id === product.id ? { ...item, cartQty: currentQty + 1 } : item,
        );
      }

      return [...prev, { ...product, cartQty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
