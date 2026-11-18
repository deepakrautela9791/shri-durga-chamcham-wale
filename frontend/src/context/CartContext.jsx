import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, weight, qty, price) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.weight === weight);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.weight === weight 
            ? { ...item, qty: item.qty + qty, price: item.price + price } 
            : item
        );
      }
      return [...prev, { ...product, weight, qty, price }];
    });
  };

  const removeFromCart = (id, weight) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.weight === weight)));
  };

  const getCartTotal = () => cart.reduce((total, item) => total + item.price, 0);
  const getCartCount = () => cart.reduce((count, item) => count + item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
