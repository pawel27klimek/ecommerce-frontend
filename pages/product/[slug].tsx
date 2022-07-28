import {useQuery} from "urql";
import {GET_PRODUCT_QUERY} from "../../lib/query";
import {useRouter} from "next/router";
import {data} from "../types";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";
import {AiFillPlusCircle, AiFillMinusCircle} from "react-icons/ai";
import store from "../../lib/contex";

export default function ProductDetails() {
  //Fetch slug
  const {query} = useRouter();
  //Fetch GraphQl data
  const [results] = useQuery<data>({
    query: GET_PRODUCT_QUERY,
    variables: {slug: query.slug},
    pause: !query.slug,
  });
  const {quantity, increment, decrement, cartItems, onAdd} = store();

  const {data, fetching, error} = results;
  // Check for the data coming in
  if (fetching) return <p>Loading... </p>;
  if (error) return <p>Oh no... {error.message} </p>;
  const product = data?.products.data[0].attributes;
  // extract data

  // access react context data

  return (
    <DetailsStyle>
      <img
        src={product?.image.data.attributes.formats.medium.url}
        alt={product?.title}
      />
      <ProductInfo>
        <div>
          <h3>{product?.title}</h3>
          <p>{product?.description}</p>
        </div>
        <Quantity>
          <span>Quantity</span>
          <button onClick={decrement}>
            <AiFillMinusCircle />
          </button>
          <p>{quantity}</p>
          <button onClick={increment}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy
          onClick={() => onAdd(data?.products.data[0].attributes!, quantity)}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
