import { createContext, useState ,useContext} from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState({ fullName: "John Doe" });
  const [location, setLocation] = useState({
    country: "USA",
    state: "California",
    postcode: "90001",
  });

  const addToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const deleteItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, type) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, deleteItem, updateQuantity, user, location }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext)
