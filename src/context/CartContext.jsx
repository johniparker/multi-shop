import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for the cart
const CartContext = createContext();

// Cart provider to manage the cart state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Helper function to calculate the total price
  const calculateTotalPrice = () => {
    const total = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  // Add a product to the cart (or increment quantity if already in cart)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        // Increment quantity if product already in cart
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.product.inventory) }
            : item
        );
      } else {
        // Add new product to the cart
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  // Increase quantity of an item in the cart
  const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(item.quantity + 1, item.product.inventory) }
          : item
      );
    });
  };

  // Decrease quantity of an item in the cart
  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.product.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  // Remove an item from the cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Checkout and reduce inventory
  const checkout = () => {
    // Reduce product inventory based on cart quantities
    cart.forEach((item) => {
      item.product.inventory -= item.quantity;
    });
    setCart([]); // Clear the cart after purchase
    alert("Purchase Successful!");
  };

  // Context provider
  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        checkout,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access the cart context
export const useCart = () => useContext(CartContext);
