import React from "react";
import {product} from "../pages/types";
import {ProductStyle} from "../styles/ProductStyle";
import Link from "next/link";

interface ProductProps {
  product: product;
}

const Product = ({product}: ProductProps) => {
  const {title, image, price, slug} = product;
  return (
    <ProductStyle>
      <h2>{title}</h2>
      <h4>{price}</h4>
      <div>
        <Link href={`/product/${slug}`}>
          <img src={image.data.attributes.formats.small.url} alt="" />
        </Link>
      </div>
    </ProductStyle>
  );
};

export default Product;
