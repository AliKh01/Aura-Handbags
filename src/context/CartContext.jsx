import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("aura-cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("aura-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product, color, quantity = 1) => {
    const variantImages =
      product.variants?.[color]?.images || product.images;

    const selectedImages =
      variantImages?.length > 0
        ? variantImages
        : [product.image];

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.selectedColor === color
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          image: selectedImages[0],
          images: selectedImages,
          selectedColor: color,
          quantity,
        },
      ];
    });
  };
  // Remove product from cart
  const removeFromCart = (productId, color) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === productId && item.selectedColor === color)
      )
    );
  };

  // Update product quantity
  const updateQuantity = (productId, color, quantity) => {
    if (quantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total number of products
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Cart subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}