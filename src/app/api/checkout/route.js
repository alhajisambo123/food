import { authOptions } from "@/app/api/authOptions/authOptions";
import { Order } from "@/models/Order";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { URLSearchParams } from "url";

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

  const successUrl = new URL(
    `https://onlineproduct.vercel.app/orders/${orderDoc._id.toString()}`
  );
  const params = new URLSearchParams({ "clear-cart": 1 }); // Create URLSearchParams object
  successUrl.search = params.toString(); // Add query parameters using toString()

  const cancelUrl = "https://onlineproduct.vercel.app/cart?canceled=1";
  return Response.json({ successUrl, cancelUrl });
}
