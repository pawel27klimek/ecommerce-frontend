import React from "react";
import {product} from "./types";

interface ProductProps {
  product: product;
}

const Product = ({product}: ProductProps) => {
  const {title, description, image, price} = product;
  return (
    <div>
      <div>
        <img src={image.data.attributes.formats.small.url} alt="" />
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      <h3>{price}</h3>
    </div>
  );
};

export default Product;
