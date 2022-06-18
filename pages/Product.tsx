import React from "react";
import {product} from "./types";
import {ProductStyle} from "../styles/ProductStyle";

interface ProductProps {
  product: product;
}

const Product = ({product}: ProductProps) => {
  const {title, image, price} = product;
  return (
    <ProductStyle>
      <h2>{title}</h2>
      <h4>{price}</h4>
      <div>
        <img src={image.data.attributes.formats.small.url} alt="" />
      </div>
    </ProductStyle>
  );
};

export default Product;
