import React from "react";
import Store from "../lib/contex";
import {
  CartContainer,
  CartStyle,
  Card,
  CardInfo,
  EmptyStyle,
  Chceckout,
  Cards,
} from "../styles/CartStyles";
import {FaShoppingCart} from "react-icons/fa";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";
import {Quantity} from "../styles/ProductDetails";
import {animate} from "framer-motion";
import getStripe from "../lib/getStripe";

const card = {
  hidden: {opacity: 0, scale: 0.8},
  show: {opacity: 1, scale: 1},
};

const cards = {
  hidden: {opacity: 0},
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const Cart = () => {
  const {cartItems, setShowCart, onAdd, onRemove, totalPrice} = Store();

  //payment
  const handleCheckout = async () => {
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(cartItems),
    });
    const data = await response.json();
    await stripe?.redirectToCheckout({sessionId: data.id});
  };
  return (
    <CartContainer
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{delay: 0.1}}
      onClick={() => setShowCart(false)}
    >
      <CartStyle
        animate={{x: "0%"}}
        initial={{x: "50%"}}
        exit={{x: "50%"}}
        transition={{type: "tween"}}
        onClick={(e) => e.stopPropagation()}
      >
        {cartItems.length < 1 && (
          <EmptyStyle
            initial={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{delay: 0.3}}
          >
            <h1>You have more shopping to do 😀</h1>
            <FaShoppingCart />
          </EmptyStyle>
        )}

        <Cards layout variants={cards} initial="hidden" animate="show">
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <Card layout variants={card} key={item.slug}>
                  <img
                    src={item.image.data.attributes.formats.thumbnail.url}
                    alt={item.title}
                  />
                  <CardInfo>
                    <h3>{item.title}</h3>
                    <h3>{item.price}$</h3>
                    <Quantity>
                      <span>quantity: </span>

                      <button onClick={() => onRemove(item)}>
                        <AiFillMinusCircle />
                      </button>
                      <p>{item.quantity}</p>
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
        </Cards>
        {cartItems.length >= 1 && (
          <Chceckout layout>
            <h3>Total price: {totalPrice}$</h3>
            <button onClick={() => handleCheckout()}>Buy</button>
          </Chceckout>
        )}
      </CartStyle>
    </CartContainer>
  );
};

export default Cart;
