import {useRouter} from "next/router";
import Stripe from "stripe";
import {
  getSession,
  UserProfile,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import styled from "styled-components";
import {PaymentIntent} from "@stripe/stripe-js";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`, {
  apiVersion: "2020-08-27",
});

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const stripeId =
      session!.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return {props: {orders: paymentIntents.data}};
  },
});

export default function Profile({
  user,
  orders,
}: {
  user: UserProfile;
  orders: PaymentIntent[];
}) {
  const route = useRouter();
  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          {orders.map((order) => (
            <Order key={order.id}>
              <h1>Order Number: {order.id}</h1>
              <h2>Amount: {order.amount}</h2>
              <h2>Receipt email: {user.email}</h2>
            </Order>
          ))}
        </div>
        <button onClick={() => route.push("/api/auth/logout")}>Logout</button>
      </div>
    )
  );
}

const Order = styled.div`
  background: white;
  margin: 2rem 0rem;
  padding: 3 rem;
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 1rem;
  }
`;
