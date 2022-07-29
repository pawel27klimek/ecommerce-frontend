import {useRouter} from "next/router";
import Stripe from "stripe";
import {GetServerSideProps} from "next";
import Image from "next/image";
import success_cat from "../public/success_cat.png";
import styled from "styled-components";
import {motion} from "framer-motion";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!, {
  apiVersion: "2020-08-27",
});

export const getServerSideProps: GetServerSideProps<
  IReturnGetServerSide
> = async (context) => {
  const sessionID = () => {
    if (typeof context.query.session_id === "string")
      return context.query.session_id;
    return "noID";
  };
  const order = await stripe.checkout.sessions.retrieve(sessionID(), {
    expand: ["line_items"],
  });
  return {props: {order}};
};

interface IReturnGetServerSide {
  order: Stripe.Response<Stripe.Checkout.Session>;
}
export default function Success({order}: IReturnGetServerSide) {
  const route = useRouter();
  return (
    <Container>
      <Card
        animate={{opacity: 1, scale: 1}}
        initial={{opacity: 0, scale: 0.8}}
        transition={{duration: 0.6}}
      >
        <h1>Thank you for your order!</h1>
        <h2>A confirmation email has been sent to</h2>
        <h2>{order.customer_details?.email}</h2>
        <InfoContainer>
          <Address>
            <h3>Address</h3>
            {Object.entries(order.customer_details?.address!).map(
              ([key, val]) => (
                <p key={key}>
                  {key}:{val}
                </p>
              )
            )}
          </Address>
          <OrderInfo>
            <h3>Products</h3>
            {order.line_items?.data.map((item) => (
              <div key={item.id}>
                <p>product: {item.description}</p>
                <p>quantity: {item.quantity}</p>
                <p>price: {item.price?.unit_amount}</p>
              </div>
            ))}
          </OrderInfo>
        </InfoContainer>
        <button onClick={() => route.push("/")}>Continue shopping</button>
        <Image src={success_cat} alt="success-cat" />
      </Card>
    </Container>
  );
}

const Container = styled.div`
  margin: 5rem 10rem;
`;

const Card = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 2rem;
  padding: 3rem;
  h2 {
    margin: 1rem 0 rem;
  }
  button {
    color: white;
    background: var(--primary);
    font-size: 1.2rem;
    font-weight: 500;
    padding: 1rem 2rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }
`;

const Address = styled.div`
  font-size: 1rem;
  width: 100%;
`;

const OrderInfo = styled.div`
  font-size: 1rem;
  width: 100%;
  div {
    padding-bottom: 1rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  margin: 2rem 0rem;
`;
