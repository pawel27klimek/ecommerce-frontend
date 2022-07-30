import {NextApiResponse, NextApiRequest} from "next";
import {Stripe} from "stripe";
import {product} from "../types";
import {getSession} from "@auth0/nextjs-auth0";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stripe.Checkout.Session | string>
) {
  const session = getSession(req, res);
  const user = session?.user;
  let stripeId: string | undefined;
  if (user) stripeId = user["http://localhost:3000/stripe_customer_id"];
  if (req.method === "POST") {
    const lineItems = req.body.map((item: product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image.data.attributes.formats.thumbnail.url],
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {enabled: true, minimum: 1},
        quantity: item.quantity,
      };
    });
    try {
      const session = await stripe.checkout.sessions.create({
        cancel_url: `${req.headers.origin}/canceled`,
        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        submit_type: "pay",
        mode: "payment",

        payment_method_types: ["card"],
        shipping_address_collection: {
          allowed_countries: ["US", "CA", "GB", "PL", "RO"],
        },
        allow_promotion_codes: true,

        shipping_options: [
          {shipping_rate: "shr_1LQi2dFesyAz0gmRhZVc07HY"},
          {shipping_rate: "shr_1LQhflFesyAz0gmRpkdZi25v"},
        ],
        line_items: lineItems,
        customer: stripeId,
      });

      res.status(200).json(session);
    } catch (error) {
      if (error instanceof Stripe.errors.StripeAPIError)
        res.status(error.statusCode || 500).json(error.message);
    }
  }
}
