import {useContext, createContext, ReactNode, useState} from "react";
import React from "react";
import {IShopContext, product} from "../pages/types";
import {NavItems} from "../styles/NavStyles";
import Product from "../components/Product";
import {exists} from "fs";

const ShopContext = createContext<IShopContext>({
  quantity: 1,
  increment: () => undefined,
  decrement: () => undefined,
  onAdd: () => undefined,
  cartItems: [],
});

export const StateContext = ({children}: {children: ReactNode}) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<product[]>([]);
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity((value) => value + 1);
  };

  const decrement = () => {
    setQuantity((value) => {
      if (value < 2) {
        return 1;
      } else {
        return value - 1;
      }
    });
    quantity < 2 ? setQuantity(1) : setQuantity((value) => value - 1);
  };

  const onAdd = (product: product, quantity: number) => {
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

  return (
    <ShopContext.Provider
      value={{
        quantity,
        increment,
        decrement,
        onAdd,
        cartItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default function store() {
  return useContext(ShopContext);
}
