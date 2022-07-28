import {NextApiResponse, NextApiRequest} from "next";
import {Stripe} from "stripe";
import {product} from "../types";

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Stripe.Checkout.Session | string>
) {
  if (req.method === "POST") {
    console.log(req.body);
    const lineItems = req.body.map((item: product) => {
      console.log(item);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image.data.attributes.formats.thumbnail.url],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      };
    });
    try {
      const session = await stripe.checkout.sessions.create({
        cancel_url: `${req.headers.origin}/canceled`,
        success_url: `${req.headers.origin}/succeeded`,
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        shipping_address_collection: {allowed_countries: ["US", "CA"]},
        line_items: lineItems,
      });
      console.log(req.body);

      res.status(200).json(session);
    } catch (error) {
      console.log(error);
      if (error instanceof Stripe.errors.StripeAPIError)
        res.status(error.statusCode || 500).json(error.message);
    }
  }
}
