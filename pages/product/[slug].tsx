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

export default function ProductDetails() {
  //Fetch slug
  const {query} = useRouter();
  //Fetch GraphQl data
  const [results] = useQuery<data>({
    query: GET_PRODUCT_QUERY,
    variables: {slug: query.slug},
  });
  const {data, fetching, error} = results;
  // Check for the data coming in
  if (fetching) return <p>Loading... </p>;
  if (error) return <p>Oh no... {error.message} </p>;
  const product = data?.products.data[0].attributes;
  // extract data

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
          <button>
            <AiFillMinusCircle />
          </button>
          <p>0</p>
          <button>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy>Add to cart</Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
