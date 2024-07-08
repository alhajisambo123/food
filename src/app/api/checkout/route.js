// import { authOptions } from "@/app/api/authOptions/authOptions";
// import { Order } from "@/models/Order";
// import mongoose from "mongoose";
// import { getServerSession } from "next-auth";

// export async function POST(req) {
//   mongoose.connect(process.env.MONGO_URL);

//   const { cartProducts, address } = await req.json();
//   const session = await getServerSession(authOptions);
//   const userEmail = session?.user?.email;

//   const orderDoc = await Order.create({
//     userEmail,
//     ...address,
//     cartProducts,
//     // Remove paid property since it's not relevant without Stripe
//     // paid: false,
//   });

//   const stripeSession = await stripe.checkout.sessions.create({
//     line_items: stripeLineItems,
//     mode: 'payment',
//     customer_email: userEmail,
//     success_url: process.env.NEXTAUTH_URL + 'orders/' + orderDoc._id.toString() + '?clear-cart=1',
//     cancel_url: process.env.NEXTAUTH_URL + 'cart?canceled=1',
//     metadata: {orderId:orderDoc._id.toString()},
//     payment_intent_data: {
//       metadata:{orderId:orderDoc._id.toString()},
//     },
//     shipping_options: [
//       {
//         shipping_rate_data: {
//           display_name: 'Delivery fee',
//           type: 'fixed_amount',
//           fixed_amount: {amount: 500, currency: 'USD'},
//         },
//       }
//     ],
//   });

//   return Response.json(stripeSession.url);

//   // No Stripe integration code here

//   return Response.json({
//     message: "Order created successfully",
//     order: orderDoc,
//   }); // Send order details back
// }

import { authOptions } from "@/app/api/authOptions/authOptions";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { URLSearchParams } from "url"; // Import URLSearchParams

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);

  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const orderDoc = await Order.create({
    userEmail,
    ...address,
    cartProducts,
  });

  // Construct a simplified success URL without Stripe:
  // const successUrl =
  //   `${process.env.NEXTAUTH_URL}/orders/${orderDoc._id.toString()} ` +
  //   "clear-cart=1";
  // (req.query?.clearCart === "1" ? "?clear-cart=1" : "");

  const successUrl = new URL(
    `https://onlineproduct.vercel.app/orders/${orderDoc._id.toString()}`
  );
  const params = new URLSearchParams({ "clear-cart": 1 }); // Create URLSearchParams object
  successUrl.search = params.toString(); // Add query parameters using toString()

  const cancelUrl = "https://onlineproduct.vercel.app/cart?canceled=1";
  // Return the response with the success and cancel URLs:
  return Response.json({ successUrl, cancelUrl });
}
