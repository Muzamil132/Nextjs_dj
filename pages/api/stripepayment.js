  const PUB_KEY="pk_test_51IEHJVLo4h35O3RcJrf0iWHZRQDRd8HTU00jTQMUK06H8pKBgiN7CsiWSQekwEsFeIlHunIwRyuinODZjU8zSQVI00N3cY15hX"
  const SEC_KEY="sk_test_51IEHJVLo4h35O3RcCPLibz05QblJISf5XtcKrdoSe5NTG3ak9qxpJm5ZqO3nPwNYgxwS5GkidxoR4Lon7JjTvHJd00rM6tq4fu"
  import absoluteUrl from 'next-absolute-url'

import Stripe from "stripe";

const stripe = new Stripe(SEC_KEY ?? "", {
  apiVersion: "2020-08-27",
  typescript: true,
});

export default async (req, res) => {
  if (req.method === "POST") {
      const {amount} =req.body
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
    });

    // const { checkInDate, checkOutDate, daysOfStay } = req.query;

    // Get origin
    const { origin } = absoluteUrl(req);

 
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${origin}/bookings/me`,
        cancel_url: `${origin}/room/700`,
        customer_email: "muzamil073@gmail.com",
        client_reference_id: "7000",
        line_items: [
          {
              name: "40",
            
              amount: 500 * 100,
              currency: 'usd',
              quantity: 1
          }
      ]
       
       
    })

   console.log(session)



    res.status(200).send({ clientSecret: paymentIntent.client_secret,session});
  } else {
    res.status(405).send("Method not allowed");
  }
};
