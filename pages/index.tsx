import type {NextPage} from "next";
import Head from "next/head";
import {useQuery} from "urql";
import {PRODUCT_QUERY} from "../lib/query";
import Product from "../components/Product";
import {data} from "./types";
import {Gallery} from "../styles/Gallery";

const Home: NextPage = () => {
  // fetch products from strapi
  const [results] = useQuery<data>({query: PRODUCT_QUERY});
  const {data, fetching, error} = results;

  const products = data?.products.data;

  if (fetching) return <p>Loading... </p>;
  if (error) return <p>Oh no... {error.message} </p>;
  return (
    <div>
      <Head>
        <title>Style ecommerce</title>
        <meta name="Style ecommerce" content="Fashion ecommerce website" />
      </Head>
      <main>
        <Gallery>
          {products?.map((product) => (
            <Product
              product={product.attributes}
              key={product.attributes.slug}
            />
          ))}
        </Gallery>
      </main>
    </div>
  );
};

export default Home;
