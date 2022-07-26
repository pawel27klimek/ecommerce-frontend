import React from "react";
import store from "../lib/contex";
import {
  CartContainer,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Chceckout,
} from "../styles/CartStyles";
import {FaShoppingCart} from "react-icons/fa";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";
import {Quantity} from "../styles/ProductDetails";

const Cart = () => {
  const {cartItems, setShowCart, onAdd, onRemove, totalPrice} = store();
  return (
    <CartContainer onClick={() => setShowCart(false)}>
      <CartStyle onClick={(e) => e.stopPropagation()}>
        {cartItems.length < 1 && (
          <EmptyStyle>
            <h1>You have more shopping to do 😀</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}
        {cartItems.length >= 1 &&
          cartItems.map((item) => {
            return (
              <Card key={item.slug}>
                <img
                  src={item.image.data.attributes.formats.thumbnail.url}
                  alt={item.title}
                />
                <CardInfo>
                  <h3>{item.title}</h3>
                  <h3>{item.price}</h3>
                  <Quantity>
                    <span>quantity: </span>

                    <button onClick={() => onRemove(item)}>
                      <AiFillMinusCircle />
                    </button>
                    <p>{item.quantity}$</p>
                    <button
                      onClick={() => {
                        onAdd(item, 1);
                      }}
                    >
                      <AiFillPlusCircle />
                    </button>
                  </Quantity>
                </CardInfo>
              </Card>
            );
          })}
        {cartItems.length >= 1 && (
          <Chceckout>
            <h3>Total price: {totalPrice}$</h3>
            <button>Buy</button>
          </Chceckout>
        )}
      </CartStyle>
    </CartContainer>
  );
};

export default Cart;
