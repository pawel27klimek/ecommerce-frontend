import {useContext, createContext, ReactNode, useState} from "react";
import React from "react";
import {IShopContext, product} from "../pages/types";

const ShopContext = createContext<IShopContext>({
  quantity: 1,
  increment: () => undefined,
  decrement: () => undefined,
  onAdd: () => undefined,
  onRemove: () => undefined,
  cartItems: [],
  showCart: false,
  setShowCart: () => undefined,
  totalQuantities: 0,
  totalPrice: 0,
  setQuantity: () => undefined,
});

export const StateContext = ({children}: {children: ReactNode}) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const increment = () => {
    setQuantity((value) => value + 1);
  };

  const decrement = () => {
    setQuantity((value) => {
      if (value <= 1) {
        return 1;
      } else {
        return value - 1;
      }
    });
  };

  const onAdd = (product: product, quantity: number) => {
    setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
    setTotalQuantities((prevTotal) => prevTotal + quantity);
    const exists = cartItems.find((item) => item.slug === product.slug);
    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? {...exists, quantity: exists.quantity! + quantity}
            : item
        )
      );
    } else {
      setCartItems((value) => [...value, {...product, quantity}]);
    }
  };

  const onRemove = (product: product) => {
    // total price
    setTotalPrice((prevPrice) => prevPrice - product.price);
    // decrease total
    setTotalQuantities((prevTotal) => prevTotal - 1);
    // check if product is present in the cart
    const exists = cartItems.find((item) => item.slug === product.slug);
    if (exists?.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? {...exists!, quantity: exists?.quantity! - 1}
            : item
        )
      );
    }
  };

  return (
    <ShopContext.Provider
      value={{
        quantity,
        increment,
        decrement,
        onAdd,
        cartItems,
        showCart,
        setShowCart,
        onRemove,
        totalQuantities,
        totalPrice,
        setQuantity,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default function store() {
  return useContext(ShopContext);
}
